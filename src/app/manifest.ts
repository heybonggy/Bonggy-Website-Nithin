import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bonggy: align every rep's effort to revenue",
    short_name: "Bonggy",
    description:
      "The orchestration layer between rep effort and company goals. Tracks every rep's effort across every tool, aligns it to the goal, nudges the drift, and proves what's working.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#0a0a0c",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
    categories: ["business", "productivity", "sales"],
  };
}
