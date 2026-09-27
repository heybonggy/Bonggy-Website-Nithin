// Screenshots of the homepage (full page and each section) and every
// sub-page at 375, 768, 1280 and 1440px, in light and dark, plus a
// reduced-motion pass that shows each demo's end state.
//
//   URL=http://localhost:3000 node scripts/screenshot.mjs
//   CHROME_PATH="/path/to/chrome" node scripts/screenshot.mjs   # optional
//
// Output: screenshots/<theme>-<width>[-reduced]/<name>.png. Logs horizontal overflow.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outRoot = resolve(__dirname, "..", "screenshots");
const base = (process.env.URL || "http://localhost:3000").replace(/\/$/, "");
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
);

const WIDTHS = [375, 768, 1280, 1440];
const SECTIONS = [
  "top", "what-we-do", "flows", "agents", "make-it-yours", "groups", "approvals",
  "analytics", "context", "how-it-works", "pricing", "faq",
];
const PAGES = [
  "about", "contact", "careers", "security", "faq", "resources",
  "resources/a-note-from-us", "privacy", "terms",
];

async function shoot(width, reduce, theme) {
  const dir = resolve(outRoot, `${theme}-${width}${reduce ? "-reduced" : ""}`);
  await mkdir(dir, { recursive: true });
  const page = await browser.newPage({
    viewport: { width, height: width < 600 ? 812 : 900 },
    reducedMotion: reduce ? "reduce" : "no-preference",
    colorScheme: theme,
  });
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: resolve(dir, "home-full.png"), fullPage: true });
  for (const id of SECTIONS) {
    const el = page.locator(`#${id}`).first();
    await el.evaluate((n) => n.scrollIntoView({ block: "start", behavior: "instant" }));
    await page.waitForTimeout(reduce ? 300 : 900);
    await el.screenshot({ path: resolve(dir, `home-${id}.png`) });
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`${theme} ${width}${reduce ? " reduced" : ""} /: overflow ${overflow}px`);
  if (!reduce) {
    for (const p of PAGES) {
      await page.goto(`${base}/${p}`, { waitUntil: "networkidle" });
      await page.screenshot({ path: resolve(dir, `${p.replace(/\//g, "-")}.png`), fullPage: true });
      const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      console.log(`${theme} ${width} /${p}: overflow ${o}px`);
    }
  }
  await page.close();
}

for (const theme of ["light", "dark"]) {
  for (const w of WIDTHS) await shoot(w, false, theme);
  for (const w of WIDTHS) await shoot(w, true, theme);
}
await browser.close();
