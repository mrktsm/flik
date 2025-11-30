// 3D Dice HTML - Alternative version using CDN script tags instead of ES6 modules
const dice3dHTML = `<!DOCTYPE html>
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
      background: linear-gradient(135deg, #e9e464 0%, #f5f5dc 100%);
    }
    
    #canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    nav {
      display: flex;
      position: absolute;
      justify-content: space-between;
      z-index: 10;
      width: 100%;
      pointer-events: none;
    }
    
    nav h1 {
      padding: 0.75rem;
      line-height: 0.85;
      font-size: 2.25rem;
      color: #3c390f;
      text-shadow: 2px 2px 4px rgba(255,255,255,0.5);
    }
    
    section {
      display: flex;
      position: absolute;
      justify-content: center;
      bottom: 0;
      left: 0;
      z-index: 10;
      width: 100%;
      pointer-events: none;
    }
    
    .panel {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    
    section p {
      margin-bottom: -0.5rem;
      text-align: center;
      color: #3c390f;
      opacity: 0.8;
      font-size: 1.2rem;
    }
    
    section button {
      padding: 0.5rem;
      margin-bottom: 2rem;
      background: rgba(255, 255, 255, 0.3);
      border: 3px solid #3c390f;
      border-radius: 15px;
      line-height: 1;
      font-size: 3rem;
      color: #3c390f;
      cursor: pointer;
      opacity: 0.9;
      transition: 250ms;
      pointer-events: auto;
      font-family: "Cherry Bomb One", system-ui;
      min-width: 80px;
    }
    
    section button:active {
      transform: scale(0.9);
      background: rgba(255, 255, 255, 0.5);
    }
    
    #loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      color: #3c390f;
      text-align: center;
      z-index: 5;
    }
  </style>
</head>
<body>
  <div id="loading">🎲 Loading Dice...</div>
  <div id="canvas"></div>
  
  <nav>
    <h1>DICE<br>3D</h1>
  </nav>
  <section>
    <div class="panel">
      <button id="decrease">−</button>
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
      const message = 'Error: ' + msg + ' at ' + url + ':' + lineNo + ':' + columnNo;
      window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'error', message: message }));
      return false;
    };
    
    console.log('Dice 3D starting...');
  </script>
  
  <!-- Load Three.js and dependencies from CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/oimo@1.0.9/build/oimo.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  
  <script>
    console.log('Three.js version:', THREE.REVISION);
    console.log('Libraries loaded, starting dice app...');
    
    // Hide loading message
    setTimeout(() => {
      document.getElementById('loading').style.display = 'none';
    }, 1000);
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    let diceAmount = 6;
    
    // Setup scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xe9e464, 0.01);
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(-12, 22, 12);
    camera.lookAt(0, 0, 0);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xe9e464);
    renderer.shadowMap.enabled = true;
    document.getElementById('canvas').appendChild(renderer.domElement);
    
    // Plane (ground)
    const planeGeometry = new THREE.PlaneGeometry(200, 200);
    const planeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xe9e464,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    plane.rotation.x = -0.5 * Math.PI;
    plane.receiveShadow = true;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(-30, 50, -30);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    scene.add(directionalLight);
    
    // Create simple dice cubes
    const dices = [];
    
    function createDice(x, y, z) {
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshStandardMaterial({ 
        color: 0xff3333,
        metalness: 0.2,
        roughness: 0.5
      });
      const dice = new THREE.Mesh(geometry, material);
      dice.position.set(x, y, z);
      dice.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      dice.castShadow = true;
      dice.receiveShadow = true;
      
      // Add physics properties
      dice.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        0,
        (Math.random() - 0.5) * 2
      );
      dice.angularVelocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
      );
      
      scene.add(dice);
      return dice;
    }
    
    function removeDices() {
      dices.forEach(dice => scene.remove(dice));
      dices.length = 0;
    }
    
    function addDices() {
      removeDices();
      for (let i = 0; i < diceAmount; i++) {
        const dice = createDice(
          (Math.random() - 0.5) * 8,
          15 + Math.random() * 5,
          (Math.random() - 0.5) * 8
        );
        dices.push(dice);
      }
      console.log('Added', diceAmount, 'dice');
    }
    
    // Physics simulation
    const gravity = -9.8 * 3;
    const damping = 0.98;
    const groundY = 1;
    
    function updatePhysics() {
      dices.forEach(dice => {
        // Apply gravity
        dice.velocity.y += gravity * 0.016;
        
        // Update position
        dice.position.add(dice.velocity.clone().multiplyScalar(0.016));
        
        // Ground collision
        if (dice.position.y < groundY) {
          dice.position.y = groundY;
          dice.velocity.y = -dice.velocity.y * 0.5;
          dice.velocity.x *= 0.9;
          dice.velocity.z *= 0.9;
        }
        
        // Apply damping
        dice.velocity.multiplyScalar(damping);
        
        // Update rotation
        dice.rotation.x += dice.angularVelocity.x;
        dice.rotation.y += dice.angularVelocity.y;
        dice.rotation.z += dice.angularVelocity.z;
        
        // Dampen rotation
        dice.angularVelocity.multiplyScalar(damping);
      });
    }
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      updatePhysics();
      renderer.render(scene, camera);
    }
    
    // Button handlers
    document.getElementById('roll').addEventListener('click', () => {
      console.log('Roll clicked');
      addDices();
    });
    
    document.getElementById('decrease').addEventListener('click', () => {
      diceAmount = Math.max(1, diceAmount - 1);
      document.getElementById('amount').textContent = diceAmount;
    });
    
    document.getElementById('increase').addEventListener('click', () => {
      diceAmount = Math.min(12, diceAmount + 1);
      document.getElementById('amount').textContent = diceAmount;
    });
    
    // Handle resize
    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    
    // Start
    addDices();
    animate();
    console.log('Dice 3D ready!');
  </script>
</body>
</html>`;

export default dice3dHTML;





