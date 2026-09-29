/**
 * Tells IndexNow (Bing, Yandex and others that share the endpoint) that the
 * site's URLs have changed, so a new page is crawled in hours rather than
 * whenever a bot next wanders past.
 *
 *   npm run indexnow                    # uses the committed key
 *   INDEXNOW_KEY=<key> npm run indexnow # override, e.g. while rotating
 *
 * The key lives in src/content/indexnow.ts and is served from public/. It is
 * not a secret: the protocol requires it to be publicly readable at
 * /<key>.txt, which is how the endpoint proves we control the domain. All it
 * grants is submitting URLs on this domain for recrawl.
 */
import "./alias-hook.mjs";

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Dynamic, not static: ESM hoists static imports above the hook registration
// above, so the alias would still be unresolved when they ran.
const { ROUTED_PAGES, SITE_URL, absolute } = await import("../src/content/site.ts");
const { CATALOG, botPath } = await import("../src/content/bots.ts");
const { INDEXNOW_KEY } = await import("../src/content/indexnow.ts");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ENDPOINT = "https://api.indexnow.org/indexnow";

/** The committed key, unless one is passed in (rotation, or a staging host). */
const key = process.env.INDEXNOW_KEY || INDEXNOW_KEY;

const keyFile = join(ROOT, "public", `${key}.txt`);
if (!existsSync(keyFile)) {
  console.error(
    `indexnow: public/${key}.txt is missing.\n\n` +
      "The endpoint fetches that file to check we control the domain, and\n" +
      "rejects the submission if it isn't there. To rotate the key:\n" +
      "  1. node -e \"console.log(require('crypto').randomBytes(16).toString('hex'))\"\n" +
      "  2. write it to public/<key>.txt as the file's only content\n" +
      "  3. update INDEXNOW_KEY in src/content/indexnow.ts\n" +
      "  4. delete the old public/<old key>.txt and deploy before submitting",
  );
  process.exit(1);
}

const contents = readFileSync(keyFile, "utf8").trim();
if (contents !== key) {
  console.error(
    `indexnow: public/${key}.txt contains "${contents}", not the key.\n` +
      "The file's only content must be the key itself.",
  );
  process.exit(1);
}

const urlList = [
  ...ROUTED_PAGES.map((page) => absolute(page.path)),
  ...CATALOG.map((bot) => absolute(botPath(bot.slug))),
];

const host = new URL(SITE_URL).host;

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${SITE_URL}/${key}.txt`, urlList }),
});

if (!response.ok) {
  console.error(`indexnow: ${response.status} ${response.statusText}`);
  console.error(await response.text());
  process.exit(1);
}

console.log(`indexnow: submitted ${urlList.length} URLs for ${host} (${response.status})`);
