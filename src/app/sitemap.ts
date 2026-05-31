import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bonggy.com";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

// Real routes that exist as Next.js pages. Hash-anchor sections of the
// homepage aren't listed separately — search engines treat /#section and /
// as the same URL.
const ROUTES: Entry[] = [
  // Home
  { path: "/",          priority: 1.0, changeFrequency: "weekly" },

  // Marketing
  { path: "/about",     priority: 0.8, changeFrequency: "monthly" },
  { path: "/fix",       priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact",   priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq",       priority: 0.7, changeFrequency: "monthly" },
  { path: "/careers",   priority: 0.7, changeFrequency: "weekly" },

  // Resources index + posts
  { path: "/resources",                       priority: 0.8, changeFrequency: "weekly" },
  { path: "/resources/why-we-built-bonggy",   priority: 0.7, changeFrequency: "monthly" },

  // Legal / trust
  { path: "/privacy",   priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms",     priority: 0.4, changeFrequency: "yearly" },
  { path: "/security",  priority: 0.5, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
