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

      /**
       * URLs the old static site served, which Google still has on record and
       * which currently 404 (Search Console, "Not found (404)").
       *
       * The note is the same piece under a new path: the site's own banner
       * calls /resources/a-note-from-us "A note from us: why we built Bonggy".
       * /pages/ reaches /pages through Next's trailing-slash redirect and is
       * caught here.
       */
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/terms.html", destination: "/terms", permanent: true },
      {
        source: "/resources/why-we-built-bonggy",
        destination: "/resources/a-note-from-us",
        permanent: true,
      },
      { source: "/pages", destination: "/", permanent: true },
    ];
  },

  async headers() {
    /**
     * `Link: rel="describedby"` points the reader of a *page* at the
     * machine-readable summary. On the summary itself, on the sitemap, on an
     * image or on the IndexNow key file it is noise, and on a markdown twin it
     * replaces that twin's own canonical Link.
     *
     * Every non-HTML route either ends in a file extension (.txt, .json, .xml,
     * .md, .png, .svg, .ico, .webmanifest) or sits under /og/, which is the
     * only one without one. No page route has a dot in it.
     */
    return [
      {
        source: "/((?!og/|.*\\.[a-zA-Z0-9]+$).*)",
        headers: [{ key: "Link", value: '</llms.txt>; rel="describedby"' }],
      },
      {
        /**
         * Not SEO. The site has a /security page, and the first thing anyone
         * doing diligence on a vendor does is look at its headers.
         *
         * No `preload` on HSTS: that submits the domain to a list baked into
         * browsers, removal takes months, and every subdomain must then be
         * HTTPS forever. Two years of max-age is the commitment; preload is a
         * separate decision for when someone actually wants it.
         *
         * No Content-Security-Policy yet either. The theme script is inline
         * and runs before first paint to avoid a flash, so a CSP needs nonces
         * or hashes and a preview deploy to test against.
         */
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
