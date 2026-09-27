import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION_SHORT } from "@/lib/metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bonggy: the agent workspace for GTM teams",
    short_name: "Bonggy",
    description: SITE_DESCRIPTION_SHORT,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    // The planet mark, monochrome (DESIGN.md §7.1). PNGs for launchers that
    // ignore SVG; the maskable one keeps the planet inside the safe zone.
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
    categories: ["business", "productivity", "sales"],
  };
}
