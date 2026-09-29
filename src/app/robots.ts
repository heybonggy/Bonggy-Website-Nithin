import type { MetadataRoute } from "next";

import { SITE_URL } from "@/content/site";

/**
 * Crawlers we name explicitly, so each one reads a group addressed to it
 * rather than inferring from `*`.
 *
 * The list covers search engines, answer engines and the training crawlers
 * (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended). All of them
 * are allowed: that is the site's current state made explicit, not a change.
 * Naming a crawler here is the one place site copy may carry a product name.
 */
const CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "Applebot",
  "DuckDuckBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Meta-ExternalAgent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  const rule = { allow: "/", disallow: ["/api/"] };
  return {
    rules: [
      { userAgent: "*", ...rule },
      { userAgent: CRAWLERS, ...rule },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    // No `host`: Google dropped it years ago, and the canonical says it better.
    // No /admin/ either: there is no such route, and listing one invents a
    // target for anyone reading robots.txt for a map.
  };
}
