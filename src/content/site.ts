/**
 * The site's copy source of truth.
 *
 * Titles, descriptions, OG lines and the verbatim rules (DESIGN.md §12) live
 * here so a page, its metadata, its OG image, its JSON-LD and its markdown twin
 * can never drift from one another. Nothing here is generated at request time:
 * `lastModified` is a literal, taken from the last commit across everything
 * the page renders from, because `new Date()` would tell crawlers every page
 * changed on every build.
 */

/** www is the served host; the apex redirects to it. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bonggy.com";

export const EMAIL = "founders@bonggy.com";
export const CAL_URL = "https://cal.com/bonggy/30min";

/**
 * Profiles we own, for JSON-LD `sameAs` and the footer.
 * TODO(brand): no X handle is confirmed yet. Until one is, there is no
 * `twitter:creator` and no X entry here — an unowned handle in `sameAs` is a
 * claim we can't back.
 */
export const LINKEDIN_URL = "https://www.linkedin.com/company/bonggy/";
export const SAME_AS = [LINKEDIN_URL];

/* ------------------------------ canonical lines ---------------------------- */

/** What Bonggy is, in one line. The JSON-LD organization description. */
export const CATEGORY =
  "Bonggy is the agent workspace for sales, RevOps and marketing teams.";

/** How it works, in one line. The JSON-LD software description. */
export const EXPLAINER =
  "Teams build bots from a sentence; each bot runs a six-part flow tied to a revenue goal, and a person approves anything customers see.";

export const TAGLINE = "Bots draft. People approve.";

/**
 * The four bright lines, word for word (DESIGN.md §12). The ids are the
 * anchors the rest of the site links to; don't renumber them.
 */
export const BRIGHT_LINES = [
  {
    id: "approval-by-action",
    title: "Approval by action.",
    body: "Anything customer-facing (emails, posts, sequencer pushes, published content) needs a person. Internal output (a brief in chat, a Slack summary) can run without approval if your team chooses.",
  },
  {
    id: "no-volume-blasting",
    title: "No volume blasting.",
    body: "Marketing bots draft and research; they don't mass-send. Campaign sends stay in your own tools, after approval.",
  },
  {
    id: "no-leaderboards",
    title: "No leaderboards.",
    body: "Work is measured against revenue, never person against person.",
  },
  {
    id: "humans-stay-in-charge",
    title: "Humans stay in charge.",
    body: "Bots work only through the tools and permissions you connect.",
  },
] as const;

/** Pricing, word for word (DESIGN.md §12). No prices in structured data. */
export const PRICING_LINE =
  "Pricing is based on active bots plus usage. Flow runs count toward usage. We're setting plans with our first teams, so there are no public numbers yet.";

/** Security, word for word, until engineering confirms more (DESIGN.md §12). */
export const SECURITY_LINE =
  "Built for read-scoped permissions, encryption in transit and at rest, and no training on your data.";

/** Compliance status, word for word. Keep "not attained" until it isn't. */
export const COMPLIANCE_LINE = "SOC 2 Type II: on the path, not attained.";

/** Presets are never "templates" (DESIGN.md §12). */
export const PRESETS_LINE =
  "Start from a preset, or from a sentence. Either way, the flow is yours.";

/* ---------------------------------- pages ---------------------------------- */

export type PageSlug =
  | "home"
  | "bots"
  | "faq"
  | "security"
  | "about"
  | "contact"
  | "careers"
  | "resources"
  | "note"
  | "brand"
  | "privacy"
  | "terms"
  | "not-found";

export type PageEntry = {
  /** The route. `null` for pages that have no URL of their own (404). */
  path: string | null;
  /** Short title; the layout template appends " · Bonggy". */
  title: string;
  /** Set when the title must stand alone, with no " · Bonggy" suffix. */
  absoluteTitle?: string;
  description: string;
  /** The OG image's three lines. */
  og: { kicker: string; ink: string; grey: string };
  /** The markdown twin, or `null` where there is none. */
  md: string | null;
  /**
   * When this page's content last changed: the latest commit date across the
   * page file *and* everything it renders from — its content module and, for
   * the home page, its section components. A page whose copy moved into
   * src/content would otherwise look untouched forever.
   *
   * A literal, not `new Date()`: a rebuild must not re-date the whole sitemap.
   */
  lastModified: string;
};

export const PAGES: Record<PageSlug, PageEntry> = {
  home: {
    path: "/",
    title: "Bonggy: the agent workspace for sales, RevOps and marketing",
    absoluteTitle: "Bonggy: the agent workspace for sales, RevOps and marketing",
    description:
      "Sales, RevOps and marketing teams build bots from a sentence. Each bot runs a flow tied to a revenue goal. Bots draft; people approve what customers see.",
    og: {
      kicker: "The agent workspace for sales, RevOps and marketing",
      ink: "Build the bots your GTM team needs.",
      grey: "Bots draft. People approve.",
    },
    md: "/index.md",
    lastModified: "2026-09-29T23:40:36+05:30",
  },
  bots: {
    path: "/bots",
    title: "Bots for sales, RevOps and marketing teams",
    description:
      "Eleven bots teams run in Bonggy, from Boomerang to Relay. Each one does one job, runs a six-part flow you can edit, and answers to a revenue goal.",
    og: {
      kicker: "Flows teams have built",
      ink: "Eleven bots. Three teams.",
      grey: "Each one answers to a revenue goal.",
    },
    md: "/bots.md",
    lastModified: "2026-09-29T22:16:01+05:30",
  },
  faq: {
    path: "/faq",
    title: "FAQ: bots, flows, approvals, data and pricing",
    description:
      "How Bonggy works: what a bot and a flow are, hard limits, what needs approval, which tools it connects to, how data is handled and how pricing works.",
    og: {
      kicker: "FAQ",
      ink: "Questions, answered.",
      grey: "Bots, flows, approvals, data and pricing.",
    },
    md: "/faq.md",
    lastModified: "2026-09-29T22:33:38+05:30",
  },
  security: {
    path: "/security",
    title: "Security: approval by action and run receipts",
    description:
      "Bots use only the permissions you connect, nothing customer-facing goes out without a person, every run leaves a receipt, and no training on your data.",
    og: {
      kicker: "Security",
      ink: "Approval by action.",
      grey: "Every run leaves a receipt.",
    },
    md: "/security.md",
    lastModified: "2026-09-29T22:33:38+05:30",
  },
  about: {
    path: "/about",
    title: "About: alignment, not volume",
    description:
      "Why we're building Bonggy: bots do the prep before the conversation, every flow points at a revenue goal, and people approve what customers see.",
    og: {
      kicker: "About",
      ink: "Volume was never the bottleneck.",
      grey: "Alignment was.",
    },
    md: "/about.md",
    lastModified: "2026-09-29T22:24:58+05:30",
  },
  contact: {
    path: "/contact",
    title: "Contact: book a strategy call",
    description:
      "Book a 30-minute strategy call to map your first Bonggy flow on real work from your team, or email founders@bonggy.com. We read every email.",
    og: {
      kicker: "Contact",
      ink: "We read every email.",
      grey: "A call is faster.",
    },
    md: "/contact.md",
    lastModified: "2026-09-29T22:24:58+05:30",
  },
  careers: {
    path: "/careers",
    title: "Careers: build the agent workspace for GTM",
    description:
      "Join a small team in Bengaluru building the agent workspace for sales, RevOps and marketing. Engineering, design and GTM roles open in waves.",
    og: {
      kicker: "Careers",
      ink: "Fix GTM.",
      grey: "Build the agent workspace.",
    },
    md: "/careers.md",
    lastModified: "2026-09-29T22:33:38+05:30",
  },
  resources: {
    path: "/resources",
    title: "Resources: notes on GTM bots",
    description:
      "Long-form writing from the Bonggy team on GTM bots, the work before the conversation, and keeping people in charge of what customers see.",
    og: {
      kicker: "Resources",
      ink: "What we've been writing.",
      grey: "Notes on GTM bots.",
    },
    md: "/resources.md",
    lastModified: "2026-09-29T22:33:38+05:30",
  },
  note: {
    path: "/resources/a-note-from-us",
    title: "A note from us: why we built Bonggy",
    absoluteTitle: "A note from us: why we built Bonggy",
    description:
      "Why we built Bonggy, and the few lines we hold: a person approves anything customer-facing, nothing is sent at volume, and there are no leaderboards.",
    og: {
      kicker: "A note from us",
      ink: "The effort was always there.",
      grey: "Now it has somewhere to go.",
    },
    md: "/resources/a-note-from-us.md",
    lastModified: "2026-09-29T22:24:58+05:30",
  },
  brand: {
    path: "/brand",
    title: "Brand and press kit",
    description:
      "The Bonggy planet mark, wordmark, bot avatars, colours, type and boilerplate, with rules for using them. Download SVG and PNG files.",
    og: {
      kicker: "Brand and press kit",
      ink: "The planet, the bots, the rules.",
      grey: "Everything you need to write about Bonggy.",
    },
    md: "/brand.md",
    lastModified: "2026-09-29T22:43:22+05:30",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy policy",
    description:
      "What Bonggy collects and what it doesn't. We don't sell your data, there's no training on your data, and you can ask us to delete it at any time.",
    og: {
      kicker: "Privacy",
      ink: "What we collect,",
      grey: "and what we don't.",
    },
    md: "/privacy.md",
    lastModified: "2026-09-29T23:33:51+05:30",
  },
  terms: {
    path: "/terms",
    title: "Terms of service",
    description:
      "Bonggy's terms in plain English: what you get, acceptable use, billing, who owns the data, and the limits of our liability.",
    og: {
      kicker: "Terms",
      ink: "Plain English.",
      grey: "No legalese tricks.",
    },
    md: "/terms.md",
    lastModified: "2026-09-29T23:33:51+05:30",
  },
  "not-found": {
    path: null,
    title: "Page not found",
    description:
      "This page drifted. Head back to Bonggy, the agent workspace where sales, RevOps and marketing teams build bots and people approve what customers see.",
    og: {
      kicker: "The agent workspace for sales, RevOps and marketing",
      ink: "Build the bots your GTM team needs.",
      grey: "Bots draft. People approve.",
    },
    md: null,
    lastModified: "2026-09-29T22:01:16+05:30",
  },
};

/** Every page that has a URL, in sitemap order. */
export const ROUTED_PAGES = (Object.entries(PAGES) as [PageSlug, PageEntry][])
  .filter(([, page]) => page.path !== null)
  .map(([slug, page]) => ({ slug, ...page, path: page.path as string }));

/** The full title a page shows, with the layout's suffix applied. */
export function fullTitle(slug: PageSlug): string {
  const page = PAGES[slug];
  return page.absoluteTitle ?? `${page.title} · Bonggy`;
}

/** An absolute URL for a path (`/faq` → `https://www.bonggy.com/faq`). */
export function absolute(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}
