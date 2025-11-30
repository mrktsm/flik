import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { fliks } from "./fliks/index";

const PREVIEWS_DIR = path.join(__dirname, "assets/previews");

// Cube (3) and Chano (8) - give them LOTS of time
const problematicIds = [3, 8];
const selectedFliks = fliks.filter(f => problematicIds.includes(f.id));

(async () => {
  console.log("Final attempt with maximum wait times...");
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
      "--enable-webgl",
      "--use-gl=swiftshader"
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });

  for (const flik of selectedFliks) {
    console.log(`\n==================== ID ${flik.id} ====================`);
    console.log(`${flik.username}: ${flik.description}`);
    
    const html = flik.fullHtml || `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: ${flik.backgroundColor || "#000"}; }
    ${flik.css || ""}
  </style>
</head>
<body>
  ${flik.html || ""}
  <script>
    try { ${flik.js || ""} } catch (e) { console.error('Error:', e); }
  </script>
</body>
</html>`;

    try {
      console.log(`Loading content...`);
      await page.setContent(html, { waitUntil: "domcontentloaded", timeout: 90000 });
      
      // Wait for canvas
      try {
        await page.waitForSelector('canvas', { timeout: 8000 });
        console.log(`✓ Canvas found`);
      } catch (e) {
        console.log(`- No canvas element`);
      }
      
      // Initial load wait
      console.log(`Waiting 5s for initial load...`);
      await new Promise(r => setTimeout(r, 5000));
      
      // Trigger interaction
      console.log(`Triggering interactions...`);
      const centerX = 390 / 2;
      const centerY = 844 / 2;
      
      // Multiple clicks/taps
      await page.mouse.click(centerX, centerY);
      await new Promise(r => setTimeout(r, 300));
      await page.mouse.click(centerX, centerY);
      await new Promise(r => setTimeout(r, 300));
      
      // Try various keyboard triggers
      try {
        await page.keyboard.press('Space');
        await new Promise(r => setTimeout(r, 200));
        await page.keyboard.press('Enter');
      } catch (e) {}
      
      // LONG wait for WebGL/3D to fully render - 20 seconds
      console.log(`Waiting 20s for full render...`);
      await new Promise(r => setTimeout(r, 20000));

      const screenshotPath = path.join(PREVIEWS_DIR, `${flik.id}.png`);
      await page.screenshot({ path: screenshotPath, type: "png" });
      console.log(`✓✓✓ SAVED: ${screenshotPath}`);
    } catch (error) {
      console.error(`✗✗✗ FAILED:`, error.message);
    }
  }

  await browser.close();
  console.log("\n========================================");
  console.log("Final attempt complete!");
})();





