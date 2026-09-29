#!/usr/bin/env node
/**
 * Mobile acceptance checks (fast scroll, mobile menu, news banner, refresh).
 *
 *   node scripts/mobile-qa.mjs [baseUrl] [--engines=webkit,chromium] [--frames=dir]
 *
 * baseUrl defaults to http://localhost:3000 (run `next build && next start`
 * first), or pass a Vercel preview URL. Chromium uses Playwright's bundled
 * build, or CHROMIUM_PATH if set. Prints one JSON line per check and exits
 * non-zero if any check fails. Emulation doesn't reproduce iOS toolbar
 * behaviour; see the PR's "verify on a real iPhone" list for that.
 */
import { chromium, webkit, devices } from "playwright";
import fs from "node:fs";

const args = process.argv.slice(2);
const BASE = (args.find((a) => !a.startsWith("--")) || "http://localhost:3000").replace(/\/$/, "");
const opt = (k, d) => (args.find((a) => a.startsWith(`--${k}=`)) || `=${d}`).split("=")[1];
const ENGINES = opt("engines", "webkit,chromium").split(",");
const FRAMES = opt("frames", "");
const ONLY = opt("only", ""); // e.g. --only=fast-scroll,menu (for iterating)
const want = (name) => !ONLY || ONLY.split(",").includes(name);
const NOTE = "/resources/a-note-from-us";
const KEY = "bonggy:news-dismissed";

let failed = 0;
const report = (row) => {
  if (!row.pass) failed++;
  console.log(JSON.stringify(row));
};

const launch = (engine) =>
  engine === "webkit" ? webkit.launch() : chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});

function ctxOptions(engine, { width = 390, height = 664, scheme = "light", reduce = false } = {}) {
  const base =
    engine === "webkit" && width === 390 && height === 664
      ? { ...devices["iPhone 14"], viewport: { width: 390, height: 664 } }
      : engine === "webkit"
        ? { ...devices["iPhone 14"], viewport: { width, height } }
        : { viewport: { width, height }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 };
  return { ...base, colorScheme: scheme, reducedMotion: reduce ? "reduce" : "no-preference" };
}

/** Per-frame probe, installed before any page script runs. */
const PROBE = () => {
  const w = window;
  w.__qa = { frames: [], shifts: [], starts: new Map(), doubleStarts: 0, mainAnims: 0, scrollListeners: 0, rec: false };
  const orig = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, fn, options) {
    // React's root event delegation adds one capture listener on the
    // document for "scroll" (it does on main too); only count ours.
    const capture = options === true || (typeof options === "object" && options?.capture);
    const reactRoot = this === document && capture;
    if (type === "scroll" && (this === window || this === document) && !reactRoot) {
      w.__qa.scrollListeners++;
      (w.__qa.scrollStacks = w.__qa.scrollStacks || []).push((new Error().stack || "").split("\n").slice(1, 4).join(" | ").slice(0, 300));
    }
    return orig.call(this, type, fn, options);
  };
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) w.__qa.shifts.push(+e.value.toFixed(4));
    }).observe({ type: "layout-shift", buffered: true });
  } catch {}
  document.addEventListener(
    "animationstart",
    (e) => {
      if (e.animationName === "fade-in") {
        const n = (w.__qa.starts.get(e.target) || 0) + 1;
        w.__qa.starts.set(e.target, n);
        if (n > 1) w.__qa.doubleStarts++;
      }
      // A close must not replay intros or entrances in <main> (demos keep
      // their own ongoing animations, which don't count).
      if (w.__qa.watchMain && e.target.closest?.("main") && ["rise-in", "word-in", "fade-in", "rise-16", "rise-12"].includes(e.animationName)) w.__qa.mainAnims++;
    },
    true,
  );
  const tick = () => {
    if (w.__qa.rec) {
      const vh = innerHeight;
      const banner = document.querySelector(".news-banner");
      const header = document.querySelector("header");
      const bb = banner && getComputedStyle(banner).display !== "none" ? banner.getBoundingClientRect().bottom : null;
      const ht = header ? header.getBoundingClientRect().top : null;
      let blank = 0;
      for (const el of document.querySelectorAll("[data-rise], [data-stagger] > *, [data-stagger-deep] > * > *, .reveal")) {
        const r = el.getBoundingClientRect();
        if (r.height < 1) continue;
        const vis = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0)) / Math.min(r.height, vh);
        if (vis >= 0.6 && +getComputedStyle(el).opacity < 0.35) {
          blank++;
          if ((w.__qa.blankEls = w.__qa.blankEls || new Map()).size < 40) {
            const k = (el.getAttribute("data-rise") !== null ? "rise:" : el.classList.contains("reveal") ? "reveal:" : "stagger:") + (el.id || el.className?.toString?.().slice(0, 50) || el.tagName) + "@" + (el.closest("section[id]")?.id || "");
            w.__qa.blankEls.set(k, { state: el.getAttribute("data-rise") ?? el.parentElement?.getAttribute("data-stagger") ?? el.parentElement?.parentElement?.getAttribute("data-stagger-deep") ?? "", op: getComputedStyle(el).opacity, top: Math.round(r.top), h: Math.round(r.height) });
          }
        }
      }
      w.__qa.frames.push({ y: Math.round(scrollY), ht, bb, blank });
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

async function newPage(browser, engine, o) {
  const ctx = await browser.newContext(ctxOptions(engine, o));
  await ctx.addInitScript(PROBE);
  if (o?.init) await ctx.addInitScript(o.init.fn, o.init.arg);
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error" || /hydrat/i.test(m.text())) errors.push(m.text().slice(0, 160));
  });
  page.on("pageerror", (e) => errors.push(e.message.slice(0, 160)));
  return { ctx, page, errors };
}

const headerOk = (f) => f.ht === null || Math.abs(f.ht - (f.bb === null ? 0 : Math.max(0, f.bb))) <= 1;

/** Scripted flings, driven per frame (the same on both engines). */
async function flings(page) {
  await page.evaluate(async () => {
    const H = document.documentElement.scrollHeight - innerHeight;
    const run = (to, pxPerSec) =>
      new Promise((res) => {
        const from = scrollY;
        const dist = to - from;
        const dur = Math.max(120, (Math.abs(dist) / pxPerSec) * 1000);
        const t0 = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          scrollTo(0, from + dist * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
          else res();
        };
        requestAnimationFrame(step);
      });
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    await run(H * 0.35, 6000);
    for (let i = 0; i < 6; i++) await run(i % 2 ? H * 0.35 + 900 : H * 0.35 - 700, 7000); // reversals
    await run(H, 9000); // to the bottom
    await run(0, 9000); // fling to top
    await run(H * 0.6, 9000); // and back
    await wait(200);
    await run(0, 12000);
    await run(H, 12000);
    await wait(300);
  });
  // Overscroll at both ends: wheel past the limits where supported (mobile
  // WebKit has no wheel), otherwise ask for positions past them.
  const past = async (dy) => {
    try {
      await page.mouse.wheel(0, dy);
    } catch {
      await page.evaluate((dy) => scrollBy(0, dy), dy);
    }
  };
  await past(1500);
  await page.waitForTimeout(200);
  await page.evaluate(() => scrollTo(0, 0));
  await past(-1500);
  await page.waitForTimeout(400);
}

async function checkFastScroll(browser, engine, scheme) {
  const { ctx, page, errors } = await newPage(browser, engine, { scheme });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.evaluate(() => (window.__qa.rec = true));
  await flings(page);
  const r = await page.evaluate(() => {
    const q = window.__qa;
    q.rec = false;
    const backdrop = [...document.querySelectorAll("*")].filter((e) => {
      const s = getComputedStyle(e);
      return (s.backdropFilter && s.backdropFilter !== "none") || (s.webkitBackdropFilter && s.webkitBackdropFilter !== "none");
    }).length;
    return { frames: q.frames, cls: q.shifts.reduce((a, b) => a + b, 0), doubleStarts: q.doubleStarts, scrollListeners: q.scrollListeners, scrollStacks: q.scrollStacks || [], blankEls: [...(q.blankEls || new Map()).entries()].slice(0, 12), backdrop };
  });
  const misaligned = r.frames.filter((f) => !headerOk(f)).length;
  const blankFrames = r.frames.filter((f) => f.blank > 0).length;
  report({
    check: "fast-scroll",
    engine,
    scheme,
    frames: r.frames.length,
    headerMisaligned: misaligned,
    blankFrames,
    cls: +r.cls.toFixed(4),
    doubleStarts: r.doubleStarts,
    scrollListeners: r.scrollListeners,
    backdropFilterElements: r.backdrop,
    ...(blankFrames ? { blankSamples: r.blankEls } : {}),
    ...(r.scrollListeners ? { scrollListenerSources: r.scrollStacks } : {}),
    errors,
    pass: misaligned === 0 && blankFrames === 0 && r.cls === 0 && r.doubleStarts === 0 && r.scrollListeners === 0 && r.backdrop === 0 && errors.length === 0,
  });
  await ctx.close();
}

async function checkMenu(browser, engine, scheme, reduce = false) {
  for (const y of [0, 1500]) {
    for (const how of ["x", "escape", "link", "backdrop"]) {
      const { ctx, page, errors } = await newPage(browser, engine, { scheme, reduce });
      await page.goto(BASE + "/", { waitUntil: "networkidle" });
      await page.evaluate((y) => scrollTo(0, y), y);
      await page.waitForTimeout(500);
      await page.evaluate(() => {
        const s = document.getElementById("mobile-menu");
        window.__runs = 0;
        s.addEventListener("transitionrun", () => window.__runs++);
      });
      const toggle = page.locator('button[aria-controls="mobile-menu"]');
      await toggle.click();
      await page.waitForTimeout(450);
      const open = await page.evaluate(() => {
        const cta = [...document.querySelectorAll("#mobile-menu a")].find((a) => /strategy call/i.test(a.textContent));
        const r = cta.getBoundingClientRect();
        return { ctaInView: r.top >= 0 && r.bottom <= innerHeight, display: getComputedStyle(document.getElementById("mobile-menu")).display };
      });
      const y0 = await page.evaluate(() => scrollY);
      await page.evaluate(() => (window.__qa.watchMain = true));
      if (how === "x") await toggle.click();
      if (how === "escape") await page.keyboard.press("Escape");
      if (how === "link") await page.locator("#mobile-menu nav a", { hasText: "Pricing" }).click();
      if (how === "backdrop") {
        const box = await page.evaluate(() => {
          const s = document.getElementById("mobile-menu");
          const r = s.getBoundingClientRect();
          // Empty sheet area: the strip between the header's bottom and the links.
          return { x: 200, y: Math.round(parseFloat(s.style.paddingTop) - 8), h: r.height };
        });
        await page.mouse.click(box.x, box.y);
      }
      const t0 = Date.now();
      let hiddenAt = null;
      while (Date.now() - t0 < 800) {
        const d = await page.evaluate(() => getComputedStyle(document.getElementById("mobile-menu")).display);
        if (d === "none") {
          hiddenAt = Date.now() - t0;
          break;
        }
        await page.waitForTimeout(20);
      }
      await page.waitForTimeout(300);
      const after = await page.evaluate(() => {
        let hits = 0;
        for (let yy = 0; yy <= 120; yy += 4) for (const xx of [20, 195, 370]) if (document.elementFromPoint(xx, yy)?.closest("#mobile-menu")) hits++;
        const pricing = document.getElementById("pricing").getBoundingClientRect().top;
        return { hits, y: scrollY, pricingTop: Math.round(pricing), mainAnims: window.__qa.mainAnims, runs: window.__runs, focusToggle: document.activeElement?.getAttribute("aria-controls") === "mobile-menu", locked: document.documentElement.style.overflow === "hidden" || document.body.style.overflow === "hidden" };
      });
      const animated = reduce ? after.runs === 0 : after.runs > 0;
      const scrollKept = how === "link" ? Math.abs(after.pricingTop) < 120 : after.y === y0;
      const focusOk = how === "x" || how === "escape" ? after.focusToggle : true;
      report({
        check: "menu",
        engine,
        scheme,
        reduce,
        startY: y,
        close: how,
        ctaInView: open.ctaInView,
        hiddenWithinMs: hiddenAt,
        hitsAfterClose: after.hits,
        scrollOk: scrollKept,
        focusOk,
        mainAnimationsFromClose: after.mainAnims,
        transitioned: animated,
        stillLocked: after.locked,
        errors,
        pass: open.display !== "none" && open.ctaInView && hiddenAt !== null && hiddenAt <= 500 && after.hits === 0 && scrollKept && focusOk && after.mainAnims === 0 && animated && !after.locked && errors.length === 0,
      });
      await ctx.close();
    }
  }
}

async function checkCtaSizes(browser, engine) {
  for (const [w, h] of [
    [390, 664],
    [375, 548],
    [360, 640],
  ]) {
    const { ctx, page } = await newPage(browser, engine, { width: w, height: h });
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.locator('button[aria-controls="mobile-menu"]').click();
    await page.waitForTimeout(450);
    const r = await page.evaluate(() => {
      const cta = [...document.querySelectorAll("#mobile-menu a")].find((a) => /strategy call/i.test(a.textContent)).getBoundingClientRect();
      return { top: Math.round(cta.top), bottom: Math.round(cta.bottom), vh: innerHeight };
    });
    report({ check: "menu-cta-in-view", engine, size: `${w}x${h}`, ...r, pass: r.top >= 0 && r.bottom <= r.vh });
    if (FRAMES) await page.screenshot({ path: `${FRAMES}/${engine}-menu-open-${w}x${h}.png` });
    await ctx.close();
  }
}

async function checkBanner(browser, engine) {
  for (const w of [360, 375, 390, 402, 430]) {
    const { ctx, page, errors } = await newPage(browser, engine, { width: w, height: 800 });
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    const b = await page.evaluate(() => {
      const r = document.querySelector(".news-banner").getBoundingClientRect();
      const read = [...document.querySelectorAll(".news-banner a span")].find((s) => /Read/.test(s.textContent) && s.getBoundingClientRect().width > 0).getBoundingClientRect();
      const x = document.querySelector("[data-news-dismiss]").getBoundingClientRect();
      return { top: r.top, h: r.height, tap: { x: read.right + 4, y: read.top + read.height / 2 }, gap: Math.round(x.left - read.right), xSize: [Math.round(x.width), Math.round(x.height)] };
    });
    await page.mouse.click(b.tap.x, b.tap.y);
    await page.waitForTimeout(600);
    const afterTap = await page.evaluate((k) => ({ stored: localStorage.getItem(k), path: location.pathname }), KEY);
    report({ check: "banner-tap", engine, width: w, top: b.top, height: b.h, gapReadToX: b.gap, xTarget: b.xSize, landedOn: afterTap.path, dismissed: !!afterTap.stored, errors, pass: b.top === 0 && b.h === 56 && !afterTap.stored && b.xSize[0] >= 44 && b.xSize[1] >= 44 && errors.length === 0 });
    await ctx.close();
  }
  // Dismissal expiry.
  for (const [label, days, expectShown] of [
    ["dismissed 15 days ago", 15, true],
    ["dismissed 1 day ago", 1, false],
    ["legacy string value", null, false],
  ]) {
    const init = {
      fn: ([k, d]) => {
        if (sessionStorage.getItem("qa-set")) return;
        sessionStorage.setItem("qa-set", "1");
        localStorage.setItem(k, d === null ? "note-2026-09" : JSON.stringify({ id: "note-2026-09", at: Date.now() - d * 864e5 }));
      },
      arg: [KEY, days],
    };
    const { ctx, page } = await newPage(browser, engine, { init });
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    const shown = await page.evaluate(() => getComputedStyle(document.querySelector(".news-banner")).display !== "none");
    report({ check: "banner-expiry", engine, case: label, shown, pass: shown === expectShown });
    await ctx.close();
  }
  // The note page, and the sheet link to it.
  {
    const { ctx, page, errors } = await newPage(browser, engine, {});
    await page.goto(BASE + NOTE, { waitUntil: "networkidle" });
    const note = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth - innerWidth, banner: getComputedStyle(document.querySelector(".news-banner")).display }));
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.locator('button[aria-controls="mobile-menu"]').click();
    await page.waitForTimeout(450);
    await page.locator("#mobile-menu nav a", { hasText: "A note from us" }).click();
    await page.waitForURL("**" + NOTE);
    report({ check: "note-page", engine, horizontalOverflow: note.overflow, bannerDisplay: note.banner, sheetLinkWorks: true, errors, pass: note.overflow <= 0 && note.banner === "none" && errors.length === 0 });
    await ctx.close();
  }
}

async function checkRefresh(browser, engine, scheme, reduce) {
  const { ctx, page, errors } = await newPage(browser, engine, { scheme, reduce });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const rows = [];
  const reloadAt = async (label, y, dismiss = false) => {
    await page.evaluate((y) => scrollTo(0, y), y);
    await page.waitForTimeout(300);
    if (dismiss) {
      await page.evaluate(() => scrollTo(0, 0));
      await page.locator("[data-news-dismiss]").click();
    }
    await page.reload({ waitUntil: "commit" });
    await page.evaluate(() => (window.__qa.rec = true)).catch(() => {});
    await page.waitForTimeout(2500);
    const r = await page.evaluate(() => {
      const intro = [...document.querySelectorAll(".animate-word-in, .animate-rise-in")].filter((e) => (e.checkVisibility ? e.checkVisibility() : true));
      return { frames: window.__qa.frames, cls: window.__qa.shifts.reduce((a, b) => a + b, 0), noIntro: document.documentElement.classList.contains("no-intro"), minIntro: Math.min(1, ...intro.map((e) => +getComputedStyle(e).opacity)) };
    });
    rows.push({ label, misaligned: r.frames.filter((f) => !headerOk(f)).length, cls: +r.cls.toFixed(4), noIntro: r.noIntro, minIntroOpacity: r.minIntro, blank: r.frames.filter((f) => f.blank > 0).length });
  };
  for (const y of [0, 30, 300, 900]) await reloadAt(`reload@${y}`, y);
  await reloadAt("reload-dismissed", 0, true);
  const ok = rows.every((r) => r.misaligned === 0 && r.cls === 0 && r.noIntro && r.minIntroOpacity === 1) && errors.length === 0;
  report({ check: "refresh", engine, scheme, reduce, rows, errors, pass: ok });
  await ctx.close();
}

/** Before/after evidence: frames right after closing the menu. */
async function menuFrames(browser, engine) {
  const { ctx, page } = await newPage(browser, engine, {});
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.locator('button[aria-controls="mobile-menu"]').click();
  await page.waitForTimeout(600);
  await page.locator('button[aria-controls="mobile-menu"]').click();
  for (const ms of [0, 60, 120, 200, 320, 460]) {
    await page.screenshot({ path: `${FRAMES}/${engine}-menu-close-${String(ms).padStart(3, "0")}ms.png`, clip: { x: 0, y: 0, width: 390, height: 240 } });
    await page.waitForTimeout(ms === 0 ? 60 : ms === 60 ? 60 : ms === 120 ? 80 : ms === 200 ? 120 : 140);
  }
  await ctx.close();
}

if (FRAMES) fs.mkdirSync(FRAMES, { recursive: true });
for (const engine of ENGINES) {
  const browser = await launch(engine);
  for (const scheme of ["light", "dark"]) {
    if (want("fast-scroll")) await checkFastScroll(browser, engine, scheme);
    if (want("menu")) await checkMenu(browser, engine, scheme);
    if (want("refresh")) {
      await checkRefresh(browser, engine, scheme, false);
      await checkRefresh(browser, engine, scheme, true);
    }
  }
  if (want("menu")) await checkMenu(browser, engine, "light", true);
  if (want("menu")) await checkCtaSizes(browser, engine);
  if (want("banner")) await checkBanner(browser, engine);
  if (FRAMES) await menuFrames(browser, engine);
  await browser.close();
}
console.log(JSON.stringify({ summary: failed ? `${failed} check(s) failed` : "all checks passed", base: BASE }));
process.exit(failed ? 1 : 0);
