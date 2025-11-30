// Full standalone HTML for Tunnel Game
const getTunnelHTML = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tunnel</title>
  <meta name="viewport" content="width=device-width,user-scalable=no">
  <style>
    body {
      background: black;
      margin: 0;
      padding: 0;
      overflow: hidden;
      width: 100vw;
      height: 100vh;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.83/build/three.module.js"
      }
    }
  </script>

  <script type="module">
    import * as THREE from 'three';

    // Console forwarding
    const originalLog = console.log;
    const originalError = console.error;
    console.log = function(...args) {
      window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'log', message: args.join(' ') }));
      originalLog.apply(console, args);
    };
    console.error = function(...args) {
      window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'error', message: args.join(' ') }));
      originalError.apply(console, args);
    };

    var con = console;

    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;

    var cameraTarget = new THREE.Vector3(0,0,100)

    var camera = new THREE.PerspectiveCamera(70, stageWidth/stageHeight, 1, 20000);
    camera.lookAt(cameraTarget);

    var scene = new THREE.Scene();

    var lightWhite =  new THREE.PointLight(0xffffff, 1, 2000);
    scene.add(lightWhite);

    var lightGreen =  new THREE.PointLight(0x00ff00, 2, 2000);
    scene.add(lightGreen);

    var lightRed =  new THREE.PointLight(0xff0000, 1, 1000);
    scene.add(lightRed);

    var group = new THREE.Object3D();
    scene.add( group );

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(stageWidth, stageHeight);
    document.body.appendChild( renderer.domElement );

    function getSeed() { return 0.01 + Math.random() * 0.05; }

    var zGap = 30;
    var xMods = [getSeed(), getSeed(), getSeed()];
    var yMods = [getSeed(), getSeed(), getSeed()];
    var xCurve = 0;
    var positions = [];
    var gap = false;
    var shape = 3;
    var rotation = 0;
    var red = 0xff, green = 0x80, blue = 0x60

    function addLine(index) {
      var i0 = index, i1 = index + 1;
      function getOscillation(seed, offset) {
        return (Math.sin(seed[0] * offset) + Math.cos(seed[1] * offset) + Math.sin(seed[2] * offset)) * 200;
      }

      var x0 = getOscillation(xMods, i0);
      var x1 = getOscillation(xMods, i1);
      var y0 = getOscillation(yMods, i0);
      var y1 = getOscillation(yMods, i1);
      var z0 = i0 * zGap;
      var z1 = i1 * zGap;

      if (gap === false && Math.random() > 0.99) { 
        gap = 1 + ~~(Math.random() * 5);
        shape = 3 + ~~(Math.random() * 5);
        rotation = Math.random() * 0.1;
        red = ~~(0x40 + Math.random() * 0xd0);
        green = ~~(0x20 + Math.random() * 0x80);
        blue = ~~(0x10 + Math.random() * 0x60);
      } else if ( gap > 0 ) {
        gap--;
        if (gap === 0) gap = false;
      }

      if (gap === false) {
        var colour = red << 16 | (index / lines * green) << 8 | blue;
        function createHole(x,y,z) {
          var g = new THREE.TorusGeometry( 20, 2, 4, shape );
          var m = new THREE.MeshPhongMaterial( { color: colour } );
          var torus = new THREE.Mesh(g, m);
          torus.position.x = x;
          torus.position.y = y;
          torus.position.z = z;
          torus.rotation.z = index * rotation;
          return torus;
        }

        group.add(createHole(x0,y0,z0));

        if (Math.random() > 0.9) {
          var angle = Math.random() * Math.PI * 2;
          var distance = 40 + Math.random() * 300
          var weirdo = createHole(x0 + Math.sin(angle) * distance, y0 + Math.cos(angle) * distance, z0 );  
          group.add(weirdo);
          weirdo.rotation.x = Math.random() * Math.PI * 2;
          weirdo.rotation.z = Math.random() * Math.PI * 2;
        }
      }

      positions[index] = {x:x0,y:y0,z:z0};
    }

    for ( var i = 0, lines = 1000; i < lines; i++) {
      addLine(i)
    }

    var g = new THREE.TorusGeometry( 15, 5, 5, 20 );
    var m = new THREE.MeshPhongMaterial( { color: 0x309000 } );
    var tracker = new THREE.Mesh( g, m );
    tracker.rotation.x = 0;
    tracker.rotation.y = Math.PI;

    var zPos = 0;
    var dx1 = 0; 
    var dy1 = 0;

    function render(t) {
      requestAnimationFrame( render );

      mouseActual.x -= (mouseActual.x - mouse.x) * 0.1;
      mouseActual.y -= (mouseActual.y - mouse.y) * 0.1;

      var dx = 0;
      var dy = 0;
      var dz = 4;
      zPos += dz;

      var zFloat = zPos / zGap;
      var i0 = Math.floor(zFloat);
      var i1 = i0 + 1;
      var perc = zFloat - i0;
      var tPos = positions[i0], nPos = positions[i1];

      if (tPos != undefined && nPos != undefined) {
        dx = nPos.x - tPos.x;
        dy = nPos.y - tPos.y;
        tracker.position.x = tPos.x + dx * perc;
        tracker.position.y = tPos.y + dy * perc;
      }

      tracker.position.z = zPos;
      dx1 -= (dx1 - dx) * 0.1;
      dy1 -= (dy1 - dy) * 0.1;
      var angleX = -Math.atan(dy1 / dz) / 2;
      var angleY = Math.PI + Math.atan(dx1 / dz) / 2;
      tracker.rotation.x -= (tracker.rotation.x - angleX) * 0.05;
      tracker.rotation.y -= (tracker.rotation.y - angleY) * 0.05;

      camera.position.x = tracker.position.x + mouseActual.x;
      camera.position.y = tracker.position.y + mouseActual.y;
      camera.position.z = tracker.position.z;
      camera.rotation.x = tracker.rotation.x;
      camera.rotation.y = tracker.rotation.y;

      lightWhite.position.z = tracker.position.z - 100;
      lightGreen.position.x = tracker.position.x;
      lightGreen.position.y = tracker.position.y - 200;
      lightGreen.position.z = tracker.position.z;
      lightRed.position.x = tracker.position.x - 200;
      lightRed.position.y = tracker.position.y + 200;
      lightRed.position.z = tracker.position.z;

      renderer.render( scene, camera );
    }

    var interaction = false;
    var mouse = {x:0,y:0};
    var mouseActual = {x:0,y:0};

    // Mouse events
    window.addEventListener("mousemove", function(e) {
      if (interaction){
        mouse.x = (e.clientX - stageWidth / 2) / 4;
        mouse.y = (e.clientY - stageHeight / 2) / 4;
      }
    });

    window.addEventListener("mousedown", function(e) {
      e.preventDefault();
      interaction = !interaction;
      if (interaction == false) mouse.x = mouse.y = 0;
    });

    // Touch events - always active when touching
    window.addEventListener("touchmove", function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.touches.length > 0){
        var touch = e.touches[0];
        mouse.x = (touch.clientX - stageWidth / 2) / 4;
        mouse.y = (touch.clientY - stageHeight / 2) / 4;
        interaction = true;
      }
    });

    window.addEventListener("touchstart", function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.touches.length > 0) {
        var touch = e.touches[0];
        mouse.x = (touch.clientX - stageWidth / 2) / 4;
        mouse.y = (touch.clientY - stageHeight / 2) / 4;
        interaction = true;
      }
    });

    window.addEventListener("touchend", function(e) {
      e.preventDefault();
      e.stopPropagation();
      interaction = false;
      mouse.x = mouse.y = 0;
    });

    // Pointer events - always active for touch pointers
    window.addEventListener("pointermove", function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.pointerType === 'touch' || interaction){
        mouse.x = (e.clientX - stageWidth / 2) / 4;
        mouse.y = (e.clientY - stageHeight / 2) / 4;
        if (e.pointerType === 'touch') interaction = true;
      }
    });

    window.addEventListener("pointerdown", function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.pointerType === 'touch') {
        mouse.x = (e.clientX - stageWidth / 2) / 4;
        mouse.y = (e.clientY - stageHeight / 2) / 4;
        interaction = true;
      } else {
        interaction = !interaction;
        if (interaction == false) {
          mouse.x = mouse.y = 0;
        } else {
          mouse.x = (e.clientX - stageWidth / 2) / 4;
          mouse.y = (e.clientY - stageHeight / 2) / 4;
        }
      }
    });

    window.addEventListener("pointerup", function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.pointerType === 'touch') {
        interaction = false;
        mouse.x = mouse.y = 0;
      }
    });

    // Handle window resize
    window.addEventListener("resize", function() {
      stageWidth = window.innerWidth;
      stageHeight = window.innerHeight;
      camera.aspect = stageWidth / stageHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(stageWidth, stageHeight);
    });

    render(0);
  </script>
</body>
</html>`;
};

export default getTunnelHTML();

