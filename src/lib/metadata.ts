import type { Metadata } from "next";

import { PAGES, SITE_URL, fullTitle, type PageSlug } from "@/content/site";

export { SITE_URL };

/** Browser chrome colour per theme: the page background (see globals.css). */
export const THEME_COLORS = { light: "#ffffff", dark: "#1b1b1b" } as const;

/** The planet mark on a paper tile, for structured data (512×512). */
export const LOGO_URL = `${SITE_URL}/brand/logo/bonggy-logo-512.png`;

export const HOME_TITLE = fullTitle("home");

/** Site-wide description (layout default, manifest, structured data). */
export const SITE_DESCRIPTION = PAGES.home.description;

/**
 * Link previews use the same description as the page. Kept as a separate export
 * because the layout and manifest both import it by name.
 */
export const SITE_DESCRIPTION_SHORT = PAGES.home.description;

/** Where a page's OG image lives. One route, one image per page. */
export const ogPath = (slug: string) => `/og/${slug}`;

/**
 * Per-page SEO, read from PAGES: canonical, og:url, title, description, the
 * page's own OG image and the markdown twin.
 *
 * Page-level openGraph/twitter replace the layout's objects wholesale, so the
 * shared fields are repeated here rather than inherited.
 *
 * No `twitter.creator`: no X handle is confirmed, and an unowned one is a claim
 * we can't back. See TODO(brand) in src/content/site.ts.
 */
export function pageMetadata({ slug }: { slug: PageSlug }): Metadata {
  const page = PAGES[slug];
  const title = fullTitle(slug);
  const { description, og, md, path } = page;
  // The 404 borrows the home image rather than having one of its own: it says
  // the same thing, and a 404 is not a page anyone shares deliberately.
  const image = {
    url: ogPath(slug === "not-found" ? "home" : slug),
    width: 1200,
    height: 630,
    alt: `${og.ink} ${og.grey}`,
  };

  return {
    title: page.absoluteTitle ? { absolute: page.absoluteTitle } : page.title,
    description,
    ...(path ? { alternates: { canonical: path, ...(md ? { types: { "text/markdown": md } } : {}) } } : {}),
    openGraph: {
      // The note is an article; everything else is a page of the site.
      type: slug === "note" ? "article" : "website",
      locale: "en_US",
      siteName: "Bonggy",
      ...(path ? { url: path } : {}),
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
