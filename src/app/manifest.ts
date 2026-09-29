import type { MetadataRoute } from "next";
import { THEME_COLORS } from "@/lib/metadata";
import { PAGES } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bonggy: the agent workspace for GTM teams",
    short_name: "Bonggy",
    description: PAGES.home.description,
    start_url: "/",
    display: "standalone",
    // Same colours the site paints its browser chrome with (light theme).
    background_color: THEME_COLORS.light,
    theme_color: THEME_COLORS.light,
    // The planet mark, monochrome (DESIGN.md §7.1). PNGs for launchers that
    // ignore SVG; the maskable one keeps the planet inside the safe zone.
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    categories: ["business", "productivity", "sales"],
  };
}
