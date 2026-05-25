/**
 * Capture factory.ai screenshots + extract font-family declarations
 * so we can use their typography as reference.
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "factory-ref");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
});
const page = await ctx.newPage();

try {
  await page.goto("https://factory.ai", { waitUntil: "networkidle", timeout: 45000 });
} catch (e) {
  console.warn("networkidle slow, falling back to load");
  await page.goto("https://factory.ai", { waitUntil: "load", timeout: 45000 });
}
await page.waitForTimeout(2500);

// 1) Above-the-fold screenshot
await page.screenshot({
  path: resolve(outDir, "factory-hero.png"),
  fullPage: false,
});

// 2) Mid-page (scroll to grab another section)
await page.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({
  path: resolve(outDir, "factory-mid.png"),
  fullPage: false,
});

await page.evaluate(() => window.scrollTo({ top: 2400, behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({
  path: resolve(outDir, "factory-mid2.png"),
  fullPage: false,
});

// 3) Extract typography info
const typographyInfo = await page.evaluate(() => {
  const sample = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      selector: sel,
      text: (el.textContent || "").slice(0, 50).trim(),
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      letterSpacing: cs.letterSpacing,
      lineHeight: cs.lineHeight,
    };
  };
  const htmlStyle = getComputedStyle(document.documentElement);
  const bodyStyle = getComputedStyle(document.body);

  // Find unique font-families used on the page
  const families = new Set();
  document.querySelectorAll("*").forEach((el) => {
    const f = getComputedStyle(el).fontFamily;
    if (f) families.add(f);
  });

  // Find all link rel=stylesheet / preconnect / font links
  const fontLinks = Array.from(
    document.querySelectorAll('link[rel="stylesheet"], link[rel="preconnect"], link[rel="preload"]'),
  )
    .map((l) => l.href)
    .filter((h) => /font|gstatic|typekit|otf|woff/i.test(h));

  return {
    html: { fontFamily: htmlStyle.fontFamily, fontSize: htmlStyle.fontSize },
    body: { fontFamily: bodyStyle.fontFamily, fontSize: bodyStyle.fontSize },
    h1: sample("h1"),
    h2: sample("h2"),
    h3: sample("h3"),
    p: sample("p"),
    code: sample("code") || sample("pre"),
    button: sample("button, a[role=button], a.button"),
    families: Array.from(families).slice(0, 20),
    fontLinks,
    pageTitle: document.title,
  };
});

await writeFile(
  resolve(outDir, "factory-typography.json"),
  JSON.stringify(typographyInfo, null, 2),
);

await ctx.close();
await browser.close();

console.log("✓ factory.ai reference written to", outDir);
console.log("\nKey typography:");
console.log("  HTML font-family:", typographyInfo.html.fontFamily);
console.log("  BODY font-family:", typographyInfo.body.fontFamily);
if (typographyInfo.h1) console.log("  H1 font-family:", typographyInfo.h1.fontFamily, "@", typographyInfo.h1.fontSize, "weight", typographyInfo.h1.fontWeight);
console.log("\nFont links found:", typographyInfo.fontLinks.length);
typographyInfo.fontLinks.slice(0, 8).forEach((h) => console.log("  ", h));
