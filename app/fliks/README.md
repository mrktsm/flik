# Fliks - Interactive Content

This directory contains your interactive "fliks" - CodePen-style HTML/CSS/JS content that renders in the app.

## Structure

Each flik has:
- `username`: The creator's username
- `description`: Description of the interactive content
- `likes`, `comments`, `shares`: Engagement metrics
- `backgroundColor`: Background color for the flik
- `html`: HTML code (optional)
- `css`: CSS code (optional)
- `js`: JavaScript code (optional)

## How to Add a New Flik

### Option 1: Simple HTML/CSS/JS

Edit `fliks/index.ts` and add a new flik object:

```typescript
{
  id: 4,
  username: "yourname",
  description: "My cool interactive thing! ✨",
  likes: 1000,
  comments: 50,
  shares: 25,
  backgroundColor: "#1a1a2e",
  html: '<div id="myapp"><h1>Hello World</h1></div>',
  css: `
    body { 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      height: 100vh; 
      background: #1a1a2e; 
    }
    #myapp { 
      color: white; 
      font-size: 32px; 
    }
  `,
  js: `
    const app = document.getElementById('myapp');
    setInterval(() => {
      app.style.color = '#' + Math.floor(Math.random()*16777215).toString(16);
    }, 1000);
  `,
}
```

### Option 2: Complex JavaScript (like pipes.js)

1. Create a new `.ts` file in the `fliks` directory (e.g., `myvis.ts`)
2. Export your JavaScript code as a string:

```typescript
export const myVisJS = \`
  // Your JavaScript code here
  console.log('Hello from my visualization!');
  
  // Create canvas, run animations, etc.
\`;

export default myVisJS;
```

3. Import it in `index.ts`:

```typescript
import myVisJS from './myvis';
```

4. Use it in a flik:

```typescript
{
  id: 5,
  username: "visualizer",
  description: "My custom visualization",
  likes: 5000,
  comments: 200,
  shares: 100,
  backgroundColor: "#000000",
  html: '<canvas id="canvas"></canvas>',
  css: `/* your styles */`,
  js: myVisJS,
}
```

## Tips

- **Mobile Touch**: Add touch event listeners for mobile interaction
- **Canvas**: Use `<canvas>` elements for WebGL/2D graphics
- **Responsive**: The WebView fills the entire screen
- **Libraries**: You can include libraries via CDN in the HTML
- **Performance**: Keep animations smooth (use requestAnimationFrame)

## Example: Using a Library

```typescript
{
  id: 6,
  username: "threejs_fan",
  description: "Three.js rotating cube",
  likes: 10000,
  comments: 500,
  shares: 250,
  backgroundColor: "#000000",
  html: '<div id="container"></div>',
  css: `
    body { margin: 0; overflow: hidden; }
    #container { width: 100vw; height: 100vh; }
  `,
  js: `
    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.min.js';
    script.onload = () => {
      // Your Three.js code here
      const scene = new THREE.Scene();
      // ... etc
    };
    document.head.appendChild(script);
  `,
}
```

## Current Fliks

1. **Pipes** - 3D WebGL pipes visualization with first-person controls
2. **Game** - Placeholder for future game
3. **Animation** - Placeholder for Three.js animation

Happy creating! 🎨✨





