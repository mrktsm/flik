// Pipes 3D WebGL visualization
export const pipesJS = `
class Mouse3D {
  constructor() {
    this.mouse = { x: 0, y: 0 };
    this.dragStartMousePosition;
    this.dragStartPhiTheta;

    this.theta = 0;
    this.phi = 0;
    this.eye = [0, 0, 0];

    addEventListener("mousemove", (e) => this.mouseMove(e));
    addEventListener("mouseup", (e) => this.mouseUp(e));
    addEventListener("mousedown", (e) => this.mouseDown(e));
    
    // Add touch support for mobile
    addEventListener("touchmove", (e) => {
      e.preventDefault();
      this.mouseMove(e.touches[0]);
    });
    addEventListener("touchend", (e) => this.mouseUp(e));
    addEventListener("touchstart", (e) => this.mouseDown(e.touches[0]));
  }

  mouseMove(event) {
    this.mouse = { x: event.clientX || event.x, y: event.clientY || event.y };
    this.dragStartMousePosition && this.rotate();
  }

  rotate() {
    var amountX = this.dragStartMousePosition
      ? this.dragStartMousePosition.x - this.mouse.x
      : 0;
    var amountZ = this.mouse.y - this.dragStartMousePosition.y;
    this.theta = this.dragStartPhiTheta[1] + amountX / 360;
    this.phi = this.dragStartPhiTheta[0] + amountZ / 360;
    var limit = Math.PI / 2;
    this.phi = this.phi > limit ? limit : this.phi;
    this.phi = this.phi < -limit ? -limit : this.phi;
    this.updateRotations();
  }

  mouseDown(event) {
    this.dragStartPhiTheta = [this.phi, this.theta];
    this.dragStartMousePosition = { x: event.clientX || event.x, y: event.clientY || event.y };
  }

  mouseUp() {
    this.dragStartMousePosition = null;
    this.dragStartPhiTheta = null;
  }

  updateRotations() {}
}

class FirstPersonControls extends Mouse3D {
  constructor() {
    super();
    this.maxSpeed = 100;
    this.speed = this.directions();
    this.moveDir = this.directions();
    this.forward = [0, 0, 1];
    this.right = [1, 0, 0];
    addEventListener("keydown", this.keyListener(true), false);
    addEventListener("keyup", this.keyListener(false), false);
    setInterval(() => this.updatePositions(), 10);
  }

  directions() {
    return {
      forward: 0,
      backward: 0,
      right: 0,
      left: 0,
    };
  }

  magnitude(p1, p2) {
    var dx = p1[0] - p2[0];
    var dy = p1[1] - p2[1];
    var dz = p1[2] - p2[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  upd(delta, dir, mag, i) {
    var k = 0.01;
    delta = dir * k * mag * delta;
    this.eye[i] += delta;
    this.forward[i] += delta;
    this.right[i] += delta;
  }

  updateRotations() {
    let m = this;
    m.forward[0] = m.eye[0] + Math.cos(m.phi) * Math.sin(m.theta);
    m.forward[1] = m.eye[1] - Math.sin(m.phi);
    m.forward[2] = m.eye[2] + Math.cos(m.phi) * Math.cos(m.theta);
    m.right[0] = m.eye[0] + Math.sin(m.theta + Math.PI / 2);
    m.right[1] = m.eye[1];
    m.right[2] = m.eye[2] + Math.cos(m.theta + Math.PI / 2);
  }

  updatePositions() {
    let speed = this.speed;
    Object.keys(speed).forEach((s) => this.updateSpeed(s));
    var magForward = this.magnitude(this.forward, this.eye);
    var magRight = this.magnitude(this.right, this.eye);
    for (var i = 0; i < 3; i++) {
      let deltaForward = this.forward[i] - this.eye[i];
      this.upd(deltaForward, speed.forward, magForward, i);
      this.upd(deltaForward, speed.backward, -magForward, i);
      let deltaRight = this.right[i] - this.eye[i];
      this.upd(deltaRight, speed.right, -magRight, i);
      this.upd(deltaRight, speed.left, magRight, i);
    }
  }

  updateSpeed(key) {
    let speed = this.speed;
    if (this.moveDir[key]) {
      speed[key] += 0.02;
    } else {
      speed[key] /= 2;
    }
    if (speed[key] < 0.01) {
      speed[key] = 0;
    }
    speed[key] = Math.min(speed[key], this.maxSpeed);
  }

  keyListener(state) {
    return (e) => {
      if (e.key === "w") this.moveDir.forward = state;
      if (e.key === "s") this.moveDir.backward = state;
      if (e.key === "a") this.moveDir.left = state;
      if (e.key === "d") this.moveDir.right = state;
    };
  }
}

class ShaderToy {
  constructor(uniforms, upd, fs) {
    let c = document.createElement("canvas"),
      gl = c.getContext("webgl"),
      pid = gl.createProgram(),
      draw = (t) => {
        upd(t, uniforms);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        requestAnimationFrame(draw);
      },
      resize = (w, h) => {
        let wh = [(c.width = w), (c.height = h)];
        uniforms.resolution(wh);
        gl.viewport(0, 0, ...wh);
      };

    document.body.append(c);
    document.body.style.margin = 0;
    document.body.style.overflow = "hidden";

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, 3, -1, -1, 3, -1]),
      gl.STATIC_DRAW
    );
    [
      \`attribute vec2 vertices;
        void main(void) {
          gl_Position=vec4(vertices, 0., 1.);
        }\`,
      fs,
    ].forEach((src, i) => {
      let id = gl.createShader(i ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER);
      gl.shaderSource(id, src);
      gl.compileShader(id);
      var message = gl.getShaderInfoLog(id);
      gl.attachShader(pid, id);
      if (message.length > 0) {
        console.log(
          src
            .split("\\n")
            .map((str, i) => ("" + (1 + i)).padStart(4, "0") + ": " + str)
            .join("\\n")
        );
        throw message;
      }
    });
    gl.linkProgram(pid);
    gl.useProgram(pid);

    Object.keys(uniforms).forEach((uf) => {
      let loc = gl.getUniformLocation(pid, uf),
        f = gl[\`uniform\${uniforms[uf]}\`];
      uniforms[uf] = (v) => f.call(gl, loc, ...v);
    });

    let vertices = gl.getAttribLocation(pid, "vertices");
    gl.vertexAttribPointer(vertices, 2, gl.FLOAT, 0, 0, 0);
    gl.enableVertexAttribArray(vertices);

    addEventListener("resize", () => resize(innerWidth, innerHeight));
    resize(innerWidth, innerHeight);
    requestAnimationFrame(draw);
  }
}

let fpc = new FirstPersonControls();

new ShaderToy(
  {
    resolution: "2f",
    eye: "3f",
    forward: "3f",
    time: "1f",
  },
  function (t, uniforms) {
    uniforms.time([t / 1000]);
    uniforms.eye(fpc.eye);
    uniforms.forward(fpc.forward);
  },
  \`precision highp float;
    uniform vec2 resolution;
    uniform vec3 eye;
    uniform vec3 forward;
    uniform float time;

    vec3 tiles(in vec3 p){

        float rnd = fract(sin(dot(floor(p) + 41., vec3(7.63, 157.31, 113.97)))*43758.5453);

        if (rnd>.75) 
            p = 1. - p;
        else if(rnd>.5) 
            p = p.yzx;
        else if(rnd>.25) 
            p = p.zxy;
        return fract(p);
    }

    float pipe(in vec3 p, float size){

        float d;

        vec3 q = p; 
        q.xy = vec2(length(q.xy), q.z) - .5; 
        d = dot(q.xy, q.xy);

        q = p.yzx - vec3(1, 1, 0); 
        q.xy = vec2(length(q.xy), q.z) - .5;
        d = min(d, dot(q.xy, q.xy)); 

        q = p.zxy - vec3(0, 1, 0);
        q.xy = vec2(length(q.xy), q.z) - .5;
        d = min(d, dot(q.xy, q.xy));

        return sqrt(d) - size + sin(time)*0.002;
    }

    vec2 map(in vec3 p) {

        p = tiles(p);
        float d = pipe(p, 0.04);

        vec2 result = vec2(d, .1);  

        d = length(p-vec3(.5,.57,.75)) - 0.06;
        if (d < result.x) result = vec2(d, .2);

        d = length(p-vec3(.3,.4,.5)) - 0.06;
        if (d < result.x) result = vec2(d, .3);

        return result; 
    }

    vec3 normal( in vec3 p ){
        vec2 e = vec2(0.005, -0.005); 
        return normalize(e.xyy * map(p + e.xyy).x + 
                         e.yyx * map(p + e.yyx).x + 
                         e.yxy * map(p + e.yxy).x + 
                         e.xxx * map(p + e.xxx).x);
    }

    mat4 viewMatrix(vec3 eye, vec3 center) {
        vec3 up = vec3(0.0, 1.0, 0.0);
        vec3 f = normalize(center - eye);
        vec3 s = normalize(cross(f, up));
        return mat4(
            vec4(s, 0.0),
            vec4(cross(s, f), 0.0),
            vec4(-f, 0.0),
            vec4(0.0, 0.0, 0.0, 1)
        );
    }

    vec3 rayDirection(float fieldOfView, vec2 size) {
        vec2 xy = gl_FragCoord.xy - size / 2.0;
        float z = size.y / tan(radians(fieldOfView) / 2.0);
        return normalize(vec3(xy, -z));
    }

    vec3 worldDir(float fov, vec2 resolution, vec3 eye, vec3 lookAt) {
        vec3 direction = rayDirection(fov, resolution);
        mat4 viewToWorld = viewMatrix(eye, lookAt);
        return (viewToWorld * vec4(direction, 0.0)).xyz;
    }

    vec3 hsl2rgb( in vec3 c ){
        vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
        return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
    }

    void main( void){
        vec3 ro = eye;
        vec3 rd = worldDir(90., resolution, ro, forward);
        vec3 lp = ro + vec3(0.2, 0.5, -0.5); 
        float t = 0.;
        vec2 result;
        for(int i = 0; i<128; i++){
            result = map(ro + rd*t);
            if (result.x<.001*(t*.25 + 1.) || t>40.) 
                break;
            t += result.x*.65;
        } 
        vec3 sp = ro + rd*t; 
        vec3 sn = normal(sp);
        vec3 ld = lp - sp;
        float lDist = max(length(ld), 0.001); 
        ld /= lDist; 
        float diff = max(dot(ld, sn), 0.);

        vec3 col = vec3(result.y*33.,0.6,0.7);
        col = hsl2rgb(col);
        col *= (sin(sp)/2.+1.);
        gl_FragColor = vec4(vec3(diff)*col, 1.0);
    }\`
);
`;

export default pipesJS;





