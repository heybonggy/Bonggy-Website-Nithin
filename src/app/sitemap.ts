import type { MetadataRoute } from "next";

import { ROUTED_PAGES, absolute } from "@/content/site";
import { CATALOG, botPath } from "@/content/bots";
import { PAGES } from "@/content/site";

/**
 * Every page with a URL, plus the eleven bots.
 *
 * No priority and no changeFrequency: Google has said for years that it
 * ignores both, and a made-up 0.7 tells nobody anything. lastModified is the
 * page's own literal, so a rebuild doesn't re-date the whole site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...ROUTED_PAGES.map((page) => ({
      url: absolute(page.path),
      lastModified: page.lastModified,
    })),
    ...CATALOG.map((bot) => ({
      url: absolute(botPath(bot.slug)),
      lastModified: PAGES.bots.lastModified,
    })),
  ];
}
