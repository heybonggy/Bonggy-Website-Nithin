import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bonggy.com";

export const HOME_TITLE = "Bonggy: agents for the work before the conversation";

/** Site-wide description (layout default, manifest, structured data). */
export const SITE_DESCRIPTION =
  "Bonggy is a studio where GTM teams build their own sales agents. Agents model your market, research your accounts and draft the work. Nothing goes out without human approval, and every agent's work ties back to a revenue goal.";

/** Shorter version for link previews. */
export const SITE_DESCRIPTION_SHORT =
  "A studio where GTM teams build sales agents that model the market, research accounts and draft the work, with a person approving anything that goes out.";

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: HOME_TITLE,
};

/**
 * Per-page SEO: canonical, og:url, title and description all point at the
 * page itself. Paths are relative; Next resolves them against metadataBase.
 * Page-level openGraph/twitter replace the layout's objects wholesale, so the
 * shared fields are repeated here. That includes the image: a child segment
 * with its own openGraph no longer inherits src/app/opengraph-image.tsx.
 */
export function pageMetadata({
  path,
  title,
  description,
  ...rest
}: {
  path: string;
  /** Short page title; the layout template appends " · Bonggy". Omit for home. */
  title?: string;
  description: string;
} & Omit<Metadata, "title" | "description">): Metadata {
  const fullTitle = title ? `${title} · Bonggy` : HOME_TITLE;
  return {
    title: title ?? { absolute: HOME_TITLE },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Bonggy",
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@bonggy",
      images: [OG_IMAGE],
    },
    ...rest,
  };
}
