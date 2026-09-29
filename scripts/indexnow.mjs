/**
 * Tells IndexNow (Bing, Yandex and others that share the endpoint) that the
 * site's URLs have changed, so a new page is crawled in hours rather than
 * whenever a bot next wanders past.
 *
 *   INDEXNOW_KEY=<key> node scripts/indexnow.mjs
 *
 * The key is never generated or committed here: it is a secret that also has
 * to be served at https://www.bonggy.com/<key>.txt, and a key in git is a key
 * anyone can use to submit URLs as us.
 */
import "./alias-hook.mjs";

import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Dynamic, not static: ESM hoists static imports above the hook registration
// above, so the alias would still be unresolved when they ran.
const { ROUTED_PAGES, SITE_URL, absolute } = await import("../src/content/site.ts");
const { CATALOG, botPath } = await import("../src/content/bots.ts");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ENDPOINT = "https://api.indexnow.org/indexnow";

const key = process.env.INDEXNOW_KEY;

if (!key) {
  console.error(`indexnow: INDEXNOW_KEY is not set.

To set this up:
  1. Generate a key of 8–128 hex characters, e.g.
       node -e "console.log(crypto.randomUUID().replace(/-/g, ''))"
  2. Save it wherever this project keeps secrets, and put the same value in
     Vercel's environment variables.
  3. Write the key into public/<key>.txt, whose only content is the key
     itself. That file is how the endpoint verifies we own the domain.
  4. Do not commit the key to git.
  5. Run: INDEXNOW_KEY=<key> node scripts/indexnow.mjs
`);
  process.exit(1);
}

const keyFile = join(ROOT, "public", `${key}.txt`);
if (!existsSync(keyFile)) {
  console.error(
    `indexnow: public/${key}.txt is missing.\n` +
      "The endpoint fetches it to check we own the domain, and rejects the\n" +
      "submission if it isn't there. Create it with the key as its only content.",
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
