// Flik data structure
export interface Flik {
  id: number;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  backgroundColor: string;
  html?: string;
  css?: string;
  js?: string;
}

// Import the pipes JavaScript code
import pipesJS from "./pipes";

export const fliks: Flik[] = [
  {
    id: 1,
    username: "test",
    description: "Simple test to verify WebView is working ✨",
    likes: 1000,
    comments: 50,
    shares: 25,
    backgroundColor: "#000000",
    html: `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(45deg, #ff0066, #00ffaa);
      ">
        <div style="text-align: center; color: white;">
          <h1 style="font-size: 60px; margin: 0;">Hello Flik! 🎨</h1>
          <p style="font-size: 30px; margin-top: 20px;">WebView is working!</p>
        </div>
      </div>
    `,
    css: ``,
    js: `
      console.log('Flik JavaScript is running!');
    `,
  },
  {
    id: 2,
    username: "codewizard",
    description: "3D Pipes visualization 🎨 Drag to rotate, WASD to move!",
    likes: 125000,
    comments: 3420,
    shares: 8900,
    backgroundColor: "#000000",
    html: "",
    css: `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body, html {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #000;
        touch-action: none;
      }
      canvas {
        width: 100% !important;
        height: 100% !important;
        display: block;
      }
    `,
    js: pipesJS,
  },
  {
    id: 3,
    username: "creativecoder",
    description: "Made a playable mini-game in the browser 🎮 Swipe to try it!",
    likes: 89000,
    comments: 2100,
    shares: 4500,
    backgroundColor: "#2d1b3d",
    html: '<div class="placeholder"><p>🎮 Game Coming Soon!</p></div>',
    css: `
      body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(45deg, #2d1b3d, #1a1a2e);
      }
      .placeholder {
        text-align: center;
        color: white;
        font-size: 24px;
      }
    `,
    js: "",
  },
  {
    id: 4,
    username: "webartist",
    description: "3D animation using Three.js 🌟 What do you think?",
    likes: 210000,
    comments: 5600,
    shares: 12000,
    backgroundColor: "#1e3a2e",
    html: '<div class="placeholder"><p>🌟 Animation Loading...</p></div>',
    css: `
      body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(45deg, #1e3a2e, #0a1f1a);
      }
      .placeholder {
        text-align: center;
        color: white;
        font-size: 24px;
      }
    `,
    js: "",
  },
];

export default fliks;
