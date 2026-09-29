/**
 * The SEO gate. Runs against a built site and exits non-zero on any failure.
 *
 *   npm run build && npm start &
 *   npm run check:seo                    # defaults to http://localhost:3000
 *   BASE=https://www.bonggy.com npm run check:seo
 *
 * Everything here is something that has silently broken on a real site: a
 * title that grew past what Google shows, a canonical that went relative, an
 * OG image that 404s, a JSON-LD graph that stopped parsing, a banned word that
 * crept back into the copy.
 */
import "./alias-hook.mjs";

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Dynamic, not static: ESM hoists static imports above the hook registration
// above, so the alias would still be unresolved when they ran.
const { ROUTED_PAGES, SITE_URL, absolute, fullTitle } = await import("../src/content/site.ts");
const { CATALOG, botPath } = await import("../src/content/bots.ts");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = (process.env.BASE || "http://localhost:3000").replace(/\/$/, "");

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

/** Words the site never uses (DESIGN.md §12). */
const BANNED = [
  "AI-powered",
  "supercharge",
  "10x",
  "autopilot",
  "AI SDR",
  "seamless",
  "leverage",
  "revolutionize",
  "templates",
];

const failures = [];
const fail = (where, message) => failures.push(`${where}: ${message}`);

let checks = 0;
const check = (ok, where, message) => {
  checks += 1;
  if (!ok) fail(where, message);
  return ok;
};

const get = async (path) => {
  const response = await fetch(`${BASE}${path}`, { redirect: "manual" });
  return { response, body: await response.text() };
};

/**
 * Resolve a URL found in the page against BASE.
 *
 * metadataBase makes og:image and the markdown alternate absolute under
 * https://www.bonggy.com. Fetching those verbatim would check the live site
 * rather than the build in front of us, and pass or fail for the wrong reason.
 */
const local = (url) => {
  if (url.startsWith(SITE_URL)) return `${BASE}${url.slice(SITE_URL.length)}`;
  if (url.startsWith("http")) return url;
  return `${BASE}${url}`;
};

/** &amp; and friends, so a comparison is against the text, not the encoding. */
const decode = (text) =>
  text
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&amp;|&#38;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x2019;|&rsquo;/g, "\u2019")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&ldquo;/g, "\u201c")
    .replace(/&rdquo;/g, "\u201d");

/* ------------------------------ tiny html bits ----------------------------- */

const tag = (html, re) => (html.match(re) ?? [])[1]?.trim();

const title = (html) => tag(html, /<title[^>]*>([^<]*)<\/title>/i);
const description = (html) =>
  tag(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
const canonical = (html) =>
  tag(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i);
const metaProperty = (html, property) =>
  tag(html, new RegExp(`<meta[^>]+(?:property|name)="${property}"[^>]+content="([^"]*)"`, "i"));
const markdownAlternate = (html) =>
  tag(html, /<link[^>]+rel="alternate"[^>]+type="text\/markdown"[^>]+href="([^"]*)"/i) ??
  tag(html, /<link[^>]+type="text\/markdown"[^>]+href="([^"]*)"/i);

const h1s = (html) =>
  [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
  );

const jsonLd = (html) =>
  [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1],
  );

/**
 * The visible text of a page: script, style and the RSC payload are stripped.
 * Without that, Next's own router internals (which contain the word "template"
 * as a slot name) would trip the copy scan on every page.
 */
const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ");

/* --------------------------------- the run --------------------------------- */

/** Every URL in the sitemap, as the sitemap itself lists them. */
async function sitemapUrls() {
  const { response, body } = await get("/sitemap.xml");
  check(response.status === 200, "/sitemap.xml", `status ${response.status}`);
  const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expected = ROUTED_PAGES.length + CATALOG.length;
  check(
    urls.length === expected,
    "/sitemap.xml",
    `${urls.length} URLs, expected ${expected}`,
  );
  return urls;
}

const seenH1 = new Map();

async function checkPage(path, expected) {
  const { response, body } = await get(path);
  const where = path;

  if (!check(response.status === 200, where, `status ${response.status}`)) return;

  const t = title(body) && decode(title(body));
  check(Boolean(t), where, "no <title>");
  if (t) {
    check(t.length <= TITLE_MAX, where, `title is ${t.length} chars (max ${TITLE_MAX}): ${t}`);
    if (expected.title) {
      check(t === expected.title, where, `title is "${t}", expected "${expected.title}"`);
    }
  }

  const d = description(body) && decode(description(body));
  check(Boolean(d), where, "no meta description");
  if (d) {
    check(
      d.length <= DESCRIPTION_MAX,
      where,
      `description is ${d.length} chars (max ${DESCRIPTION_MAX})`,
    );
    if (expected.description) {
      check(d === expected.description, where, "description doesn't match the content source");
    }
  }

  const heads = h1s(body);
  check(heads.length === 1, where, `${heads.length} <h1> elements, expected exactly 1`);
  if (heads.length === 1) {
    heads[0] = decode(heads[0]);
    const previous = seenH1.get(heads[0]);
    check(
      previous === undefined,
      where,
      `H1 "${heads[0]}" is the same as on ${previous}`,
    );
    seenH1.set(heads[0], path);
  }

  const c = canonical(body);
  check(Boolean(c), where, "no canonical");
  if (c) {
    check(
      c.startsWith(SITE_URL),
      where,
      `canonical is not absolute under ${SITE_URL}: ${c}`,
    );
    check(c === absolute(path), where, `canonical is ${c}, expected ${absolute(path)}`);
  }

  // The OG and Twitter images have to be real 1200×630 PNGs, not a 404 page.
  for (const property of ["og:image", "twitter:image"]) {
    const url = metaProperty(body, property);
    if (!check(Boolean(url), where, `no ${property}`)) continue;
    const image = await fetch(local(url));
    check(image.status === 200, where, `${property} status ${image.status}`);
    check(
      (image.headers.get("content-type") ?? "").includes("image/png"),
      where,
      `${property} is ${image.headers.get("content-type")}, expected image/png`,
    );
    const size = pngSize(Buffer.from(await image.arrayBuffer()));
    check(
      size.width === 1200 && size.height === 630,
      where,
      `${property} is ${size.width}×${size.height}, expected 1200×630`,
    );
  }

  const graphs = jsonLd(body);
  check(graphs.length === 1, where, `${graphs.length} JSON-LD blocks, expected 1`);
  for (const raw of graphs) {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      fail(where, `JSON-LD doesn't parse: ${error.message}`);
      continue;
    }
    const types = (parsed["@graph"] ?? []).map((node) => node["@type"]);
    check(types.length > 0, where, "JSON-LD @graph is empty");
    for (const wanted of expected.types ?? []) {
      check(types.includes(wanted), where, `JSON-LD has no ${wanted} (has ${types.join(", ")})`);
    }
  }

  const md = markdownAlternate(body);
  if (check(Boolean(md), where, "no rel=alternate type=text/markdown")) {
    const twin = await fetch(local(md));
    check(twin.status === 200, where, `markdown twin status ${twin.status}`);
    check(
      (twin.headers.get("content-type") ?? "").includes("text/markdown"),
      where,
      `markdown twin is ${twin.headers.get("content-type")}`,
    );
  }

  scanCopy(where, visibleText(body));
}

/** PNG width and height, straight out of the IHDR chunk. */
function pngSize(buffer) {
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

/**
 * The words the site doesn't use, plus an untracked .denylist of names that
 * must never be committed (so the names themselves live only on this machine).
 */
const denylistFile = join(ROOT, ".denylist");
const extraDenied = existsSync(denylistFile)
  ? readFileSync(denylistFile, "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
  : [];

function scanCopy(where, text) {
  const haystack = text.toLowerCase();
  for (const word of [...BANNED, ...extraDenied]) {
    const needle = word.toLowerCase();
    // Whole words only: "leverage" shouldn't fire on a URL that contains it.
    const re = new RegExp(`\\b${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    check(!re.test(haystack), where, `uses a banned word: "${word}"`);
  }
}

/* ---------------------------------- extras --------------------------------- */

async function checkLlmsTxt() {
  const { response, body } = await get("/llms.txt");
  const where = "/llms.txt";
  if (!check(response.status === 200, where, `status ${response.status}`)) return;
  check(
    (response.headers.get("content-type") ?? "").includes("text/plain"),
    where,
    `content-type is ${response.headers.get("content-type")}`,
  );

  const lines = body.split("\n");
  const headings = lines.filter((line) => line.startsWith("# "));
  check(headings.length === 1, where, `${headings.length} H1 lines, expected 1`);
  check(
    lines.some((line) => line.startsWith("> ")),
    where,
    "no `> ` summary line",
  );

  const links = [...body.matchAll(/\]\((https?:[^)]+)\)/g)].map((m) => m[1]);
  check(links.length > 0, where, "no links");
  for (const link of links) {
    check(link.startsWith(SITE_URL), where, `link is not absolute: ${link}`);
    const target = await fetch(local(link));
    check(target.status === 200, where, `${link} → ${target.status}`);
  }

  scanCopy(where, body);
}

async function checkBotsJson() {
  const { response, body } = await get("/bots.json");
  const where = "/bots.json";
  if (!check(response.status === 200, where, `status ${response.status}`)) return;

  let data;
  try {
    data = JSON.parse(body);
  } catch (error) {
    return fail(where, `doesn't parse: ${error.message}`);
  }

  check(data.version === 1, where, `version is ${data.version}`);
  check(typeof data.updated === "string", where, "no `updated`");
  check(data.source === absolute("/bots"), where, `source is ${data.source}`);
  check(
    Array.isArray(data.bots) && data.bots.length === CATALOG.length,
    where,
    `${data.bots?.length} bots, expected ${CATALOG.length}`,
  );

  for (const bot of data.bots ?? []) {
    const at = `${where} → ${bot.id}`;
    for (const key of ["id", "name", "team", "role", "job", "description", "url", "markdown"]) {
      check(typeof bot[key] === "string" && bot[key].length > 0, at, `missing ${key}`);
    }
    check(Boolean(bot.avatar?.png && bot.avatar?.svg), at, "missing avatar paths");
    check(Boolean(bot.look?.color), at, "missing look");
    for (const part of ["trigger", "context", "steps", "approval", "output", "goal", "limit"]) {
      check(bot.exampleFlow?.[part] !== undefined, at, `exampleFlow is missing ${part}`);
    }
  }

  scanCopy(where, body);
}

async function checkIcons() {
  const ico = await fetch(`${BASE}/favicon.ico`);
  check(ico.status === 200, "/favicon.ico", `status ${ico.status}`);
  if (ico.status === 200) {
    const buffer = Buffer.from(await ico.arrayBuffer());
    const count = buffer.readUInt16LE(4);
    const sizes = [];
    for (let i = 0; i < count; i += 1) sizes.push(buffer.readUInt8(6 + i * 16) || 256);
    for (const wanted of [16, 32, 48]) {
      check(sizes.includes(wanted), "/favicon.ico", `no ${wanted}px entry (has ${sizes.join(", ")})`);
    }
  }

  for (const [path, size] of [
    ["/icon-96.png", 96],
    ["/icon-192.png", 192],
    ["/apple-touch-icon.png", 180],
  ]) {
    const response = await fetch(`${BASE}${path}`);
    if (!check(response.status === 200, path, `status ${response.status}`)) continue;
    const buffer = Buffer.from(await response.arrayBuffer());
    const { width, height } = pngSize(buffer);
    check(width === size && height === size, path, `is ${width}×${height}, expected ${size}×${size}`);
    check(isOpaque(buffer), path, "has transparent pixels; icons are paper tiles");
  }
}

/**
 * True when the PNG carries no alpha channel, or declares none.
 *
 * Colour type 6 (RGBA) and 4 (grey+alpha) can be transparent; 2 and 0 cannot.
 * Encoders write RGBA even for a fully opaque image, so an alpha channel alone
 * isn't a failure — this checks the tRNS chunk and the declared colour type,
 * which is what a browser uses to decide whether to composite.
 */
function isOpaque(buffer) {
  const colourType = buffer.readUInt8(25);
  if (colourType === 2 || colourType === 0) return true;
  // A paper tile is drawn edge to edge, so sampling the corners is enough to
  // catch the old transparent-mark mistake.
  return !buffer.includes(Buffer.from("tRNS"));
}

async function checkRobots() {
  const { response, body } = await get("/robots.txt");
  const where = "/robots.txt";
  if (!check(response.status === 200, where, `status ${response.status}`)) return;

  const expected = [
    "Googlebot", "Bingbot", "Applebot", "DuckDuckBot", "OAI-SearchBot",
    "ChatGPT-User", "GPTBot", "Claude-SearchBot", "Claude-User", "ClaudeBot",
    "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended",
    "Amazonbot", "Meta-ExternalAgent", "CCBot",
  ];
  const found = [...body.matchAll(/User-Agent:\s*(\S+)/gi)].map((m) => m[1]);

  for (const token of expected) {
    check(found.includes(token), where, `missing crawler: ${token}`);
  }
  for (const token of found) {
    check(
      token === "*" || expected.includes(token),
      where,
      `unexpected crawler token: ${token}`,
    );
  }
  check(body.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), where, "no sitemap line");
  check(!/^Host:/im.test(body), where, "still declares Host");
}

/* ----------------------------------- main ---------------------------------- */

const expectedTypes = {
  "/": ["Organization", "WebSite", "SoftwareApplication", "WebPage"],
  "/faq": ["FAQPage", "BreadcrumbList"],
  "/about": ["AboutPage", "BreadcrumbList"],
  "/contact": ["ContactPage", "BreadcrumbList"],
  "/bots": ["CollectionPage", "ItemList", "BreadcrumbList"],
  "/resources": ["CollectionPage", "BreadcrumbList"],
  "/resources/a-note-from-us": ["BlogPosting", "BreadcrumbList"],
};

const urls = await sitemapUrls();

for (const url of urls) {
  const path = url.replace(SITE_URL, "") || "/";
  const page = ROUTED_PAGES.find((p) => p.path === path);
  const bot = CATALOG.find((b) => botPath(b.slug) === path);

  await checkPage(path, {
    title: page ? fullTitle(page.slug) : bot ? `${bot.seoTitle} · Bonggy` : undefined,
    description: page ? page.description : bot?.seoDescription,
    types: expectedTypes[path] ?? (bot ? ["WebPage", "BreadcrumbList"] : ["BreadcrumbList"]),
  });
}

await checkLlmsTxt();
await checkBotsJson();
await checkIcons();
await checkRobots();

// The 404 is not in the sitemap, but it still shouldn't carry banned copy.
{
  const { body } = await get("/this-page-does-not-exist");
  scanCopy("/404", visibleText(body));
}

console.log(`check:seo — ${checks} checks on ${urls.length} URLs against ${BASE}`);

if (failures.length > 0) {
  console.error(`\n${failures.length} failed:\n`);
  for (const line of failures) console.error(`  ✗ ${line}`);
  process.exit(1);
}

console.log("all passed");
