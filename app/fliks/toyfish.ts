// Full standalone HTML for Toyfish Background
// Interactive 3D fish background animation

const getToyfishHTML = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Toyfish Background</title>
  <meta name="viewport" content="width=device-width,height=device-height,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
  <style>
    body, html, #app {
      margin: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    #app {
      touch-action: pan-up;
      position: relative;
    }

    #app canvas {
      display: block;
      position: fixed;
      z-index: 0;
      top: 0;
      left: 0;
    }
  </style>
</head>
<body>
  <div id="app"></div>
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
  </script>
  <script type="module">
    import { fishesBackground } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'

    const bg = fishesBackground({
      el: document.getElementById('app'),
      eventsEl: document.body,
      gpgpuSize: 96,
      background: 0x031F48,
      fogDensity: 0.025,
      texture: 'https://assets.codepen.io/33787/fishes.png',
      textureCount: 8,
      material: 'phong',
      materialParams: {
        transparent: true,
        alphaTest: 0.5
      },
      fishScale: [1, 1, 1],
      fishWidthSegments: 8,
      fishSpeed: 1.5,
      noiseCoordScale: 0.01,
      noiseTimeCoef: 0.0005,
      noiseIntensity: 0.0005,
      attractionRadius1: 50,
      attractionRadius2: 150,
      maxVelocity: 0.1
    });
  </script>
</body>
</html>`;
};

export default getToyfishHTML();





