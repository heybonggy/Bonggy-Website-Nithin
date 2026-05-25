import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bonggy — The command centre for outbound",
    short_name: "Bonggy",
    description:
      "Installable agents that find the signal, score the account, and draft the outreach. Your best rep's instinct, given to every SDR.",
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
