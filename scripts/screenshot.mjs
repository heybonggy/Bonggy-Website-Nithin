import { chromium, devices } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "screenshots");
await mkdir(outDir, { recursive: true });

const url = process.env.URL || "http://localhost:3000/";
const browser = await chromium.launch();

async function captureSection(page, name, viewport, sectionId) {
  await page.setViewportSize(viewport);
  if (sectionId) {
    await page.locator(sectionId).scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
  } else {
    await page.evaluate(() => window.scrollTo(0, 0));
  }
  // Longer wait for canvas-based components (cobe globe needs time to draw frames)
  const wait = name.includes("coverage") ? 2400 : 900;
  await page.waitForTimeout(wait);
  await page.screenshot({
    path: resolve(outDir, `${name}.png`),
    fullPage: false,
  });
}

// Desktop 1440 — section by section
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);

  await captureSection(page, "desktop-hero", { width: 1440, height: 900 }, null);
  await captureSection(page, "desktop-logos", { width: 1440, height: 600 }, "#logo-cloud");
  await captureSection(page, "desktop-how", { width: 1440, height: 900 }, "#how-it-works");
  await captureSection(page, "desktop-coverage", { width: 1440, height: 900 }, "#coverage");
  await captureSection(page, "desktop-problem", { width: 1440, height: 900 }, "#problem");
  await captureSection(page, "desktop-reframe", { width: 1440, height: 900 }, "#reframe");
  await captureSection(page, "desktop-fix", { width: 1440, height: 900 }, "#fix");
  await captureSection(page, "desktop-proof", { width: 1440, height: 900 }, "#proof");
  await captureSection(page, "desktop-usecases", { width: 1440, height: 900 }, "#use-cases");
  await captureSection(page, "desktop-objection", { width: 1440, height: 900 }, "#vs-ai-sdr");
  await captureSection(page, "desktop-close", { width: 1440, height: 900 }, "#strategy-session");

  await ctx.close();
}

// Mobile
{
  const ctx = await browser.newContext({ ...devices["iPhone 14 Pro"] });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);

  await page.screenshot({
    path: resolve(outDir, "mobile-hero.png"),
    fullPage: false,
  });

  await page.locator("#how-it-works").scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({
    path: resolve(outDir, "mobile-how.png"),
    fullPage: false,
  });

  await page.locator("#use-cases").scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({
    path: resolve(outDir, "mobile-usecases.png"),
    fullPage: false,
  });

  await ctx.close();
}

await browser.close();
console.log("✓ Screenshots written to", outDir);
