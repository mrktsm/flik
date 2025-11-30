// 3D Dice HTML with Three.js - Using CDN with embedded model as data URL
import diceModelBase64 from "./dice_model";

const getDice3dHTML = () => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>3D Dice</title>
  <link href="https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: "Cherry Bomb One", system-ui;
      font-weight: 400;
      overflow: hidden;
      width: 100%;
      height: 100vh;
    }
    
    canvas {
      position: absolute;
      top: 0;
      left: 0;
    }
    
    section {
      display: flex;
      position: absolute;
      justify-content: center;
      top: 60px;
      left: 0;
      right: 0;
      z-index: 10;
      pointer-events: none;
    }
    
    .panel {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    
    section button {
      padding: 0.5rem;
      margin-bottom: 2rem;
      background: none;
      border: none;
      line-height: 1;
      font-size: 4rem;
      color: #3c390f;
      cursor: pointer;
      opacity: 0.75;
      transition: 250ms;
      pointer-events: auto;
      font-family: "Cherry Bomb One", system-ui;
    }
    
    section p {
      margin-bottom: -0.5rem;
      text-align: center;
      color: #3c390f;
      opacity: 0.5;
    }
    
    section button:active {
      transform: scale(0.75);
    }
  </style>
</head>
<body>
  <section>
    <div class="panel">
      <button id="decrease">-</button>
      <div>
        <p>AMOUNT: <span id="amount">6</span></p>
        <button id="roll">ROLL</button>
      </div>
      <button id="increase">+</button>
    </div>
  </section>
  
  <script>
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
    
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      const message = 'Error: ' + msg;
      window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'error', message: message }));
      return false;
    };
    
    console.log('Dice 3D script starting...');
  </script>
  
  <!-- Three.js from CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.rawgit.com/mrdoob/three.js/r128/examples/js/loaders/GLTFLoader.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/oimo@1.0.9/build/oimo.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  
  <script>
    console.log('Three.js loaded, version:', THREE.REVISION);
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    let diceAmount = 6;
    let dices = [];
    let world;
    let diceModel = null;
    
    // Setup Physics
    world = new OIMO.World({ 
      timestep: 1 / 60, 
      iterations: 8, 
      broadphase: 2, 
      worldscale: 1, 
      random: true, 
      info: false,
      gravity: [0, -9.8 * 3, 0]
    });
    
    // Setup Three.js
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xe9e464, 0.01);
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(-12, 22, 12);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xe9e464);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;  // Better shadow quality
    document.body.appendChild(renderer.domElement);
    
    // Ground plane (orange floor)
    const planeGeometry = new THREE.PlaneGeometry(200, 200);
    const planeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFF8C00,  // Orange
      emissive: 0xFF6600,  // Orange emissive glow - reduced to preserve shadows
      emissiveIntensity: 0.2,
      side: THREE.DoubleSide,
      metalness: 0,
      roughness: 0.8
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    plane.rotation.x = -0.5 * Math.PI;
    plane.receiveShadow = true;
    
    // Ground physics body
    world.add({
      type: 'box',
      size: [100, 1, 100],
      pos: [0, -0.5, 0],
      rot: [0, 0, 0],
      move: false,
      density: 1
    });
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfaf9eb, 1);  // Reduced ambient light to preserve shadows
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xfaf9eb, 1.5);  // Directional light for shadows
    directionalLight.position.set(-30, 50, -30);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.bias = -0.0001;  // Adjust shadow bias for better visibility
    directionalLight.shadow.normalBias = 0.02;  // Adjust normal bias
    scene.add(directionalLight);
    
    // Load the GLTF dice model from embedded base64 data
    const loader = new THREE.GLTFLoader();
    
    // Use embedded base64 data URL
    const modelUrl = 'data:model/gltf-binary;base64,${diceModelBase64}';
    
    console.log('Loading dice model from embedded data...');
    
    loader.load(
      modelUrl,
      function(gltf) {
        console.log('GLTF dice model loaded successfully!');
        diceModel = gltf.scene;
        
        // Scale the model if needed
        diceModel.scale.set(1, 1, 1);
        
        addDices();
      },
      function(progress) {
        if (progress.total > 0) {
          const percent = (progress.loaded / progress.total * 100).toFixed(0);
          console.log('Loading model:', percent + '%');
        }
      },
      function(error) {
        console.error('Failed to load GLTF model:', error);
        console.log('Using fallback cube dice');
        addDices();
      }
    );
    
    // Create dice
    function createDice(x, y, z) {
      let diceObj;
      
      if (diceModel) {
        // Use the loaded GLTF model
        diceObj = diceModel.clone();
        diceObj.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        console.log('Created dice from GLTF model');
      } else {
        // Fallback: create a textured cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        const materials = [];
        for (let i = 1; i <= 6; i++) {
          ctx.fillStyle = '#cc0000';
          ctx.fillRect(0, 0, 256, 256);
          ctx.fillStyle = '#ffffff';
          
          const dotPositions = {
            1: [[128, 128]],
            2: [[64, 64], [192, 192]],
            3: [[64, 64], [128, 128], [192, 192]],
            4: [[64, 64], [192, 64], [64, 192], [192, 192]],
            5: [[64, 64], [192, 64], [128, 128], [64, 192], [192, 192]],
            6: [[64, 64], [192, 64], [64, 128], [192, 128], [64, 192], [192, 192]]
          };
          
          dotPositions[i].forEach(pos => {
            ctx.beginPath();
            ctx.arc(pos[0], pos[1], 20, 0, Math.PI * 2);
            ctx.fill();
          });
          
          const texture = new THREE.CanvasTexture(canvas);
          materials.push(new THREE.MeshStandardMaterial({ 
            map: texture,
            metalness: 0.3,
            roughness: 0.4
          }));
        }
        
        diceObj = new THREE.Mesh(geometry, materials);
        diceObj.castShadow = true;
        diceObj.receiveShadow = true;
        console.log('Created fallback cube dice');
      }
      
      diceObj.position.set(x, y, z);
      scene.add(diceObj);
      
      // Physics body
      const body = world.add({
        type: 'box',
        size: [2, 2, 2],
        pos: [x, y, z],
        rot: [Math.random() * 360, Math.random() * 360, Math.random() * 360],
        move: true,
        density: 2,
        friction: 0.5,
        restitution: 0.75,
        belongsTo: 1,
        collidesWith: 0xffffffff
      });
      
      return { model: diceObj, body: body };
    }
    
    function removeDices() {
      dices.forEach(dice => {
        scene.remove(dice.model);
      });
      world.clear();
      world.add({
        type: 'box',
        size: [100, 1, 100],
        pos: [0, -0.5, 0],
        rot: [0, 0, 0],
        move: false,
        density: 1
      });
      dices = [];
    }
    
    function addDices() {
      removeDices();
      for (let i = 0; i < diceAmount; i++) {
        const x = (Math.random() - 0.5) * 4;
        const y = 15 + Math.random() * 5;
        const z = (Math.random() - 0.5) * 4;
        dices.push(createDice(x, y, z));
      }
      console.log('Added', diceAmount, 'dice');
    }
    
    // Animation
    let lastTime = 0;
    let accumulator = 0;
    const fixedTimeStep = 1 / 120;
    
    function animate(time) {
      requestAnimationFrame(animate);
      
      if (lastTime) {
        const deltaTime = (time - lastTime) / 1000;
        accumulator += deltaTime;
        
        while (accumulator >= fixedTimeStep) {
          world.step();
          accumulator -= fixedTimeStep;
        }
        
        dices.forEach(dice => {
          const pos = dice.body.getPosition();
          const quat = dice.body.getQuaternion();
          dice.model.position.set(pos.x, pos.y, pos.z);
          dice.model.quaternion.set(quat.x, quat.y, quat.z, quat.w);
        });
      }
      
      lastTime = time;
      
      // Slow camera orbit
      const t = time * 0.0001;
      camera.position.x = Math.cos(t) * -12;
      camera.position.z = Math.sin(t) * 12;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    }
    
    // Button handlers
    document.getElementById('roll').addEventListener('click', addDices);
    document.getElementById('decrease').addEventListener('click', () => {
      diceAmount = Math.max(1, diceAmount - 1);
      document.getElementById('amount').textContent = diceAmount;
    });
    document.getElementById('increase').addEventListener('click', () => {
      diceAmount = Math.min(12, diceAmount + 1);
      document.getElementById('amount').textContent = diceAmount;
    });
    
    // Resize handler
    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    
    // Start animation
    animate(0);
    console.log('Dice 3D ready!');
  </script>
</body>
</html>`;

const dice3dHTML = getDice3dHTML();
export default dice3dHTML;
