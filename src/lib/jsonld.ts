/**
 * The structured-data graph (schema.org), one `@graph` per page.
 *
 * Everything is built from src/content, so what a crawler reads and what a
 * visitor reads are the same strings. Ids are absolute and stable
 * (`https://www.bonggy.com/#organization`), so nodes reference each other
 * instead of being repeated on every page.
 *
 * Deliberately absent: `offers`, `aggregateRating` and `Product`. There are no
 * public prices and no ratings, and inventing either to win a rich result is
 * the kind of thing that earns a manual action.
 */
import {
  CATEGORY,
  EMAIL,
  EXPLAINER,
  PAGES,
  SAME_AS,
  SITE_URL,
  absolute,
  fullTitle,
  type PageSlug,
} from "@/content/site";
import { CATALOG, botUrl } from "@/content/bots";
import { LOGO_URL, ogPath } from "@/lib/metadata";

type Node = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const SOFTWARE_ID = `${SITE_URL}/#software`;

const ref = (id: string) => ({ "@id": id });
/**
 * `absolute("/")` drops the trailing slash, so the home page's id would be
 * `https://www.bonggy.com#webpage` while every other id carries a slash.
 * Same page either way, but an id that doesn't match its siblings is the kind
 * of thing that trips a parser comparing strings.
 */
const pageId = (path: string) =>
  path === "/" ? `${SITE_URL}/#webpage` : `${absolute(path)}#webpage`;

/** What the product does, in the words the site uses for each. */
const FEATURES = [
  "Six-part flows: trigger, context, steps, approval, output and goal",
  "Hard limits written in the team's own words",
  "An approvals inbox for anything customer-facing",
  "A receipt for every run",
  "Groups and handoffs between teams",
  "Company context every bot reads first",
  "Analytics against a revenue goal",
];

const organization: Node = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Bonggy",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 512,
    height: 512,
  },
  description: CATEGORY,
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  // Only profiles we own. An unowned handle here is a claim we can't back.
  sameAs: SAME_AS,
};

const website: Node = {
  "@type": "WebSite",
  "@id": SITE_ID,
  name: "Bonggy",
  alternateName: "bonggy.com",
  url: SITE_URL,
  publisher: ref(ORG_ID),
  inLanguage: "en",
};

const software: Node = {
  "@type": "SoftwareApplication",
  "@id": SOFTWARE_ID,
  name: "Bonggy",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Agent workspace for sales, RevOps and marketing teams",
  operatingSystem: "Web",
  description: EXPLAINER,
  url: SITE_URL,
  image: LOGO_URL,
  publisher: ref(ORG_ID),
  featureList: FEATURES,
  // No offers and no aggregateRating: there are no public prices or ratings.
};

/** Home › Page, or Home › Bots › Name. */
function breadcrumbs(trail: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absolute(trail[trail.length - 1].path)}#breadcrumbs`,
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

/** The WebPage node every page carries, typed by what the page is. */
function webPage(slug: PageSlug, type = "WebPage", extra: Node = {}): Node {
  const page = PAGES[slug];
  const path = page.path as string;
  return {
    "@type": type,
    "@id": pageId(path),
    url: absolute(path),
    name: fullTitle(slug),
    description: page.description,
    isPartOf: ref(SITE_ID),
    inLanguage: "en",
    ...extra,
  };
}

export type FaqEntry = { q: string; a: string };

/**
 * The graph for one page.
 *
 * Every page carries the organization and website nodes, and the pages that
 * reference the software carry that too — the same objects, under the same
 * @ids, repeated per page.
 *
 * Repeating them is the point. A parser reads one page at a time, so a
 * reference to `#organization` from a page that doesn't define it resolves to
 * nothing: the note's BlogPosting had an author and a publisher with no name.
 * The shared @ids are what let a crawler reconcile them across pages.
 */
export function graphFor(
  slug: PageSlug,
  options: { faq?: FaqEntry[] } = {},
): Node {
  const page = PAGES[slug];
  const nodes: Node[] = [];

  if (slug === "home") {
    nodes.push(organization, website, software);
    nodes.push(webPage("home", "WebPage", { about: ref(SOFTWARE_ID) }));
    return { "@context": "https://schema.org", "@graph": nodes };
  }

  // Everything below references these, so every page defines them.
  nodes.push(organization, website);
  if (slug === "bots") nodes.push(software);

  switch (slug) {
    case "faq": {
      nodes.push(
        webPage("faq", "FAQPage", {
          mainEntity: (options.faq ?? []).map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      );
      break;
    }
    case "about":
      nodes.push(webPage("about", "AboutPage", { about: ref(ORG_ID) }));
      break;
    case "contact":
      nodes.push(webPage("contact", "ContactPage", { about: ref(ORG_ID) }));
      break;
    case "bots":
      nodes.push(
        webPage("bots", "CollectionPage", { about: ref(SOFTWARE_ID) }),
        {
          "@type": "ItemList",
          "@id": `${absolute("/bots")}#bots`,
          numberOfItems: CATALOG.length,
          itemListElement: CATALOG.map((bot, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: bot.name,
            url: botUrl(bot.slug),
            description: bot.description,
          })),
        },
      );
      break;
    case "resources":
      nodes.push(webPage("resources", "CollectionPage"));
      break;
    case "note":
      nodes.push({
        "@type": "BlogPosting",
        "@id": pageId(page.path as string),
        headline: page.absoluteTitle ?? page.title,
        description: page.description,
        author: ref(ORG_ID),
        publisher: ref(ORG_ID),
        mainEntityOfPage: absolute(page.path as string),
        isPartOf: ref(SITE_ID),
        inLanguage: "en",
        /**
         * When the page last changed, which we do know: it is the same literal
         * the sitemap advertises, so the two can't disagree.
         *
         * Still no `datePublished`. Google's Article guidance asks for it and
         * answer engines weigh freshness by it, but we don't have a date for
         * when the note went live that anyone can stand behind, and inventing
         * one to fill the field is worse than leaving it out.
         */
        dateModified: page.lastModified,
        image: {
          "@type": "ImageObject",
          url: absolute(ogPath("note")),
          width: 1200,
          height: 630,
        },
      });
      break;
    default:
      nodes.push(webPage(slug));
  }

  nodes.push(breadcrumbs([{ name: page.title, path: page.path as string }]));
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** The graph for one bot's page. */
export function graphForBot(slug: string): Node {
  const bot = CATALOG.find((b) => b.slug === slug);
  if (!bot) throw new Error(`jsonld: unknown bot ${slug}`);
  const path = `/bots/${bot.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // A bot page references all three, so it defines all three.
      organization,
      website,
      software,
      {
        "@type": "WebPage",
        "@id": pageId(path),
        url: absolute(path),
        name: `${bot.seoTitle} · Bonggy`,
        description: bot.seoDescription,
        isPartOf: ref(SITE_ID),
        about: ref(SOFTWARE_ID),
        inLanguage: "en",
      },
      breadcrumbs([
        { name: "Bots", path: "/bots" },
        { name: bot.name, path },
      ]),
    ],
  };
}
