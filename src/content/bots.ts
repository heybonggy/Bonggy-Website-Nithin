/**
 * The public bot catalog: the mock's bots, plus what /bots, /bots/<slug>,
 * /bots.json and the OG images need.
 *
 * The bots themselves are imported, never copied, so a name or a job changed in
 * the product mock changes here too. Only the SEO lines and the example flow
 * live here.
 *
 * Every flow below is an example. Teams edit every part, so the pages say so
 * out loud (`EXAMPLE_FLOW_NOTE`) rather than presenting one as fixed.
 */
import {
  BOTS,
  BOOMERANG,
  HANDOFF_GROUP,
  type Bot,
  type Team,
} from "@/components/product-mock/data";
import { DEFAULT_LOOKS } from "@/components/product-mock/data";
import type { BotLook } from "@/components/ui/bot-look";
import { absolute } from "./site";

/** Said wherever an example flow is shown. Never present one as fixed. */
export const EXAMPLE_FLOW_NOTE = "Example flow. Every part is editable.";

/** Bots that work together in the Marketing → Sales handoff group. */
export const HANDOFF_LINE = "Works in the Marketing → Sales handoff group.";

export const TEAM_LABELS: Record<Team, string> = {
  sales: "Sales",
  revops: "RevOps",
  marketing: "Marketing",
};

/** The order the teams are shown in, everywhere. */
export const TEAM_ORDER: Team[] = ["sales", "revops", "marketing"];

export type ExampleFlow = {
  trigger: string;
  context: string[];
  steps: string[];
  approval: string;
  output: string;
  goal: string;
  /** The rule in the team's own words that the bot can't cross. */
  limit: string;
};

export type CatalogBot = Bot & {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  exampleFlow: ExampleFlow;
  look: BotLook;
  /** Set on the three bots that hand work to one another across teams. */
  group?: string;
};

/** Keyed by bot id, so the mock stays the single source for name/job/team. */
const SEO: Record<string, { seoTitle: string; seoDescription: string; exampleFlow: ExampleFlow }> = {
  boomerang: {
    seoTitle: "Boomerang: when a lost champion changes jobs",
    seoDescription:
      "Boomerang watches closed-lost deals and tells you when a champion lands at a new company, then drafts a short note for you to approve.",
    exampleFlow: {
      trigger: "A champion on a closed-lost deal changes jobs (checked daily)",
      context: ["Closed-lost deals from the last 18 months", "CRM contacts", "job-change feed"],
      steps: [
        "Match the new company to your ICP",
        "Pull notes from the lost deal",
        "Draft a short note in your voice",
      ],
      approval: "You, before any note is sent",
      output: "A draft note and a CRM task on the new account",
      goal: "Q4 new pipeline",
      limit: "Never send without my OK",
    },
  },
  dossier: {
    seoTitle: "Dossier: a brief before every first call",
    seoDescription:
      "Dossier reads past calls and your CRM, researches the account and its people, and leaves a brief in your chat before the meeting.",
    exampleFlow: {
      trigger: "Before every first call on your calendar",
      context: ["CRM", "call notes"],
      steps: ["Read past calls", "Research the account and its people", "Write the brief"],
      approval: "Internal only",
      output: "A brief in chat, before the meeting",
      goal: "Q4 enterprise logos",
      limit: "Never contact anyone",
    },
  },
  unstick: {
    seoTitle: "Unstick: stuck deals and next steps, Mondays",
    seoDescription:
      "Every Monday, Unstick reads your open deals, flags ones with no next step or 14+ quiet days, and suggests one next step each, for your approval.",
    exampleFlow: {
      trigger: "Every Monday 08:00",
      context: ["Open deals in the CRM", "calendar", "call notes"],
      steps: [
        "Read every open deal",
        "Flag no next step or 14+ days quiet",
        "Suggest one next step per deal",
      ],
      approval: "You, before any CRM change",
      output: "This chat · a CRM task per deal",
      goal: "Q4 enterprise logos",
      limit: "Never email anyone",
    },
  },
  draftsmith: {
    seoTitle: "Draftsmith: research into a follow-up draft",
    seoDescription:
      "After a meeting, Draftsmith turns call notes and research into a follow-up draft in your company's tone. Nothing is sent until you approve it.",
    exampleFlow: {
      trigger: "After a meeting ends",
      context: ["Call notes", "the brief", "company tone"],
      steps: ["Pull the research", "Draft the follow-up"],
      approval: "You, before any email is sent",
      output: "An email draft for approval",
      goal: "Q4 enterprise logos",
      limit: "Never send without approval",
    },
  },
  compass: {
    seoTitle: "Compass: ICP drift and deals with no next step",
    seoDescription:
      "Compass checks the pipeline against your ICP each morning, flags off-ICP accounts and deals with no next step, and changes no records.",
    exampleFlow: {
      trigger: "Daily 07:00",
      context: ["Pipeline", "ICP"],
      steps: ["Check ICP fit", "Flag off-ICP accounts", "Flag deals with no next step"],
      approval: "Internal only",
      output: "A report in chat",
      goal: "Q4 enterprise logos",
      limit: "Don't change any records",
    },
  },
  tidy: {
    seoTitle: "Tidy: CRM fixes, proposed for approval",
    seoDescription:
      "Tidy finds missing fields and duplicate records in your CRM and proposes fixes. Nothing changes until a person approves the set.",
    exampleFlow: {
      trigger: "Fridays 17:00",
      context: ["CRM records"],
      steps: ["Find missing fields and duplicates", "Propose fixes"],
      approval: "You, before any CRM change",
      output: "A proposed set of fixes",
      goal: "A forecast you can explain",
      limit: "Never delete a record",
    },
  },
  delta: {
    seoTitle: "Delta: what changed in the pipeline, and why",
    seoDescription:
      "Before the weekly call, Delta compares this week's pipeline with last week's and explains what changed. Read-only, posted to your RevOps channel.",
    exampleFlow: {
      trigger: "Thursdays 16:00",
      context: ["Pipeline snapshots"],
      steps: ["Compare this week with last", "Explain what changed"],
      approval: "Internal only",
      output: "A summary in #revops",
      goal: "A forecast you can explain",
      limit: "Read-only",
    },
  },
  "sweet-spot": {
    seoTitle: "Sweet Spot: which segments win",
    seoDescription:
      "Sweet Spot segments your closed-won deals and shows which segments win, so marketing and sales point effort where it pays. Read-only.",
    exampleFlow: {
      trigger: "Monthly",
      context: ["Closed-won deals"],
      steps: ["Segment the wins", "Find which segments win"],
      approval: "Internal only",
      output: "A report",
      goal: "Pipeline from inbound",
      limit: "Read-only",
    },
  },
  echo: {
    seoTitle: "Echo: pains and objections from recent calls",
    seoDescription:
      "Echo pulls the top pains and objections out of recent call notes and can hand them to sales bots. Posts wait for a person to approve them.",
    exampleFlow: {
      trigger: "One-off, or weekly in a group",
      context: ["Last month's call notes"],
      steps: ["Pull the top pains and objections"],
      approval: "You, before posting to #q4-campaign",
      output: "A post in #q4-campaign",
      goal: "Pipeline from inbound",
      limit: "Don't write copy yet",
    },
  },
  quill: {
    seoTitle: "Quill: posts, pages and emails in your voice",
    seoDescription:
      "Quill drafts posts, pages and emails in your company's voice from real customer pains. Nothing is published until a person approves it.",
    exampleFlow: {
      trigger: "Fridays 10:00",
      context: ["Company tone", "pains from Echo"],
      steps: ["Draft posts, pages and emails in your voice"],
      approval: "You, before anything is published",
      output: "Drafts for approval",
      goal: "Pipeline from inbound",
      limit: "Never publish",
    },
  },
  relay: {
    seoTitle: "Relay: score new leads and brief the right rep",
    seoDescription:
      "Relay scores each new lead against your ICP, picks the right rep and briefs them in your inbound channel. It never replies to the lead itself.",
    exampleFlow: {
      trigger: "On a new lead",
      context: ["CRM", "ICP"],
      steps: ["Score against the ICP", "Pick the right rep", "Brief them"],
      approval: "Internal only",
      output: "A brief in #inbound and the owner set in the CRM",
      goal: "Pipeline from inbound",
      limit: "Never reply to the lead",
    },
  },
};

/**
 * Boomerang first: it is the bot the hero builds, so it is the one a reader
 * has already met. Then the rest in the mock's own order.
 */
const SOURCE: Bot[] = [BOOMERANG, ...BOTS];

function toCatalogBot(bot: Bot): CatalogBot {
  const seo = SEO[bot.id];
  if (!seo) throw new Error(`bots.ts: no catalog entry for ${bot.id}`);
  const look = DEFAULT_LOOKS[bot.id];
  if (!look) throw new Error(`bots.ts: no default look for ${bot.id}`);
  return {
    ...bot,
    slug: bot.id,
    look,
    ...seo,
    group: HANDOFF_GROUP.members.includes(bot.id) ? HANDOFF_LINE : undefined,
  };
}

/** Every bot with a public page, Boomerang first, then the mock's order. */
export const CATALOG: CatalogBot[] = SOURCE.map(toCatalogBot);

export const BOT_SLUGS = CATALOG.map((b) => b.slug);

export function botBySlug(slug: string): CatalogBot | undefined {
  return CATALOG.find((b) => b.slug === slug);
}

/** The bots on one team, in catalog order. */
export function botsForTeam(team: Team): CatalogBot[] {
  return CATALOG.filter((b) => b.team === team);
}

export const botPath = (slug: string) => `/bots/${slug}`;
export const botUrl = (slug: string) => absolute(botPath(slug));
export const botMdPath = (slug: string) => `/bots/${slug}.md`;

/** The six parts, in the order every flow shows them. */
export const FLOW_PART_LABELS: { key: keyof Omit<ExampleFlow, "limit">; label: string }[] = [
  { key: "trigger", label: "Trigger" },
  { key: "context", label: "Context" },
  { key: "steps", label: "Steps" },
  { key: "approval", label: "Approval" },
  { key: "output", label: "Output" },
  { key: "goal", label: "Goal" },
];

/** One flow part as a readable string (context and steps are lists). */
export function flowPartText(flow: ExampleFlow, key: keyof Omit<ExampleFlow, "limit">): string {
  const value = flow[key];
  return Array.isArray(value) ? value.join(" · ") : value;
}
