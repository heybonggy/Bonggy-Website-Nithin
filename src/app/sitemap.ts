import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bonggy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections = [
    "",
    "#how-it-works",
    "#problem",
    "#reframe",
    "#fix",
    "#proof",
    "#coverage",
    "#use-cases",
    "#vs-ai-sdr",
    "#strategy-session",
  ];

  return sections.map((hash) => ({
    url: `${SITE_URL}/${hash}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: hash === "" ? 1 : 0.7,
  }));
}
