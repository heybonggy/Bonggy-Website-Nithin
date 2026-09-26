import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION_SHORT } from "@/lib/metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bonggy: a studio for sales agents",
    short_name: "Bonggy",
    description: SITE_DESCRIPTION_SHORT,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#0a0a0c",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
    categories: ["business", "productivity", "sales"],
  };
}
