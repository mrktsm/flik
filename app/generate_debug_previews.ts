import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { fliks, Flik } from "./fliks/index";

const PREVIEWS_DIR = path.join(__dirname, "assets/previews");

// Create directory if it doesn't exist
if (!fs.existsSync(PREVIEWS_DIR)) {
  fs.mkdirSync(PREVIEWS_DIR, { recursive: true });
}

const getPreviewHTML = (flik: Flik): string => {
  if (flik.fullHtml) {
    return flik.fullHtml;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: ${flik.backgroundColor || "#000"};
    }
    ${flik.css || ""}
  </style>
</head>
<body>
  ${flik.html || ""}
  <script>
    try {
      ${flik.js || ""}
    } catch (e) {
      console.error('Preview error:', e.message || e);
    }
  </script>
</body>
</html>
  `;
};

(async () => {
  // IDs of broken previews:
  // Helmet Reveal: 24
  // The Cube (Rubik's): 3
  // Tearable Cloth: 4
  // Grape Soda: 14
  // 2048: 9
  // Tunnel: 11
  // Slide Puzzle (avocado): 33
  // Chano Music: 8
  // Flappy Dino: 34
  // Tower Block: 10
  // Snake: 28
  
  const targetIds = [3, 4, 8, 9, 10, 11, 14, 24, 28, 33, 34];
  
  console.log(`Starting debug preview generation for IDs: ${targetIds.join(', ')}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--use-gl=swiftshader",
      "--enable-webgl",
      "--hide-scrollbars",
      "--mute-audio",
    ],
  });

  const page = await browser.newPage();
  
  // Inject mock ReactNativeWebView object before page loads
  await page.evaluateOnNewDocument(() => {
    (window as any).ReactNativeWebView = {
      postMessage: (msg: any) => console.log(`[WebView Message] ${msg}`)
    };
  });
  
  page.on('console', msg => {
    const type = msg.type();
    if (type === 'error' || type === 'warn') {
      console.log(`[PAGE ${type.toUpperCase()}] ${msg.text()}`);
    }
  });

  page.on('pageerror', (err: Error) => {
    console.log(`[PAGE ERROR] ${err.toString()}`);
    console.log(`[PAGE ERROR STACK] ${err.stack}`);
  });

  page.on('requestfailed', request => {
    if (!request.url().startsWith('data:')) {
       console.log(`[REQUEST FAILED] ${request.url()} ${request.failure()?.errorText}`);
    }
  });

  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });

  for (const id of targetIds) {
    const flik = fliks.find(f => f.id === id);
    if (!flik) {
        console.log(`Flik ID ${id} not found, skipping.`);
        continue;
    }

    console.log(`Generating preview for ${flik.username} (ID: ${flik.id})...`);
    const html = getPreviewHTML(flik);

    try {
      await page.setContent(html, {
        waitUntil: "networkidle0",
        timeout: 90000,
      });

      // Wait extra long for these problematic ones
      console.log('Waiting 20s for assets/simulation...');
      await new Promise((r) => setTimeout(r, 20000));

      const screenshotPath = path.join(PREVIEWS_DIR, `${flik.id}.png`);
      await page.screenshot({ path: screenshotPath, type: "png" });
      console.log(`Saved to ${screenshotPath}`);
    } catch (error) {
      console.error(`Failed to generate preview for ID ${flik.id}:`, error);
    }
  }

  await browser.close();
  console.log("Debug generation complete!");
})();
