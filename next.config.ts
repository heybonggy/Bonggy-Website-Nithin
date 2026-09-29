import type { NextConfig } from "next";

/**
 * Every markdown twin is served from one route; these rewrites are what put it
 * at `<path>.md` without a `.md` directory for every page.
 *
 * `:path*` is Next's own segment matcher, so `/resources/a-note-from-us.md`
 * reaches `/md/resources/a-note-from-us`. The index is spelled out separately,
 * because `/index.md` has no path to carry.
 */
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/index.md", destination: "/md" },
      { source: "/:path*.md", destination: "/md/:path*" },
    ];
  },

  async redirects() {
    return [
      // /fix was removed (it described outbound drafting Bonggy doesn't do).
      // `permanent: true` issues a 308.
      { source: "/fix", destination: "/", permanent: true },
      // Both were linked from outside before the sections were named; they are
      // sections of the homepage, not pages.
      { source: "/pricing", destination: "/#pricing", permanent: true },
      { source: "/use-cases", destination: "/#teams", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        /**
         * Tell anything reading a page where the machine-readable summary is.
         *
         * HTML routes only: a markdown twin sets its own Link header naming the
         * page it mirrors, and a second Link here replaces it.
         */
        source: "/((?!.*\\.md$).*)",
        headers: [{ key: "Link", value: '</llms.txt>; rel="describedby"' }],
      },
    ];
  },
};

export default nextConfig;
