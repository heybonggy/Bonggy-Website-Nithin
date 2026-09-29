/**
 * The home page's section copy, so the page and its markdown twin render from
 * one source. The sections that are pure prose import their title and intro
 * from here; the ones that are live mocks keep their drawing and take their
 * words from here.
 */

export const HERO_TITLE = "Build the bots your GTM team needs.";
export const HERO_MUTED = "Running the flows you want, pointed at revenue.";
export const HERO_LEDE =
  "Bonggy is the agent workspace for sales, RevOps and marketing teams. Describe the work in a sentence; a bot turns it into a flow tied to a revenue goal, and you approve what customers see.";

export type HomeSection = { id: string; title: string; intro: string };

export const TEAMS_SECTION: HomeSection = {
  id: "teams",
  title: "One workspace. Three teams.",
  intro:
    "Sales, RevOps and marketing teams each build bots for their own work. Every bot answers to a revenue goal.",
};

export const FLOWS_SECTION: HomeSection = {
  id: "flows",
  title: "Every bot runs a flow you design.",
  intro: "Six parts: trigger, context, steps, approval, output and goal. Change any of them, any time.",
};

export const AGENTS_SECTION: HomeSection = {
  id: "agents",
  title: "A bot for every job.",
  intro:
    "Say what you want in plain words, and what it must never do. The limit becomes part of the flow.",
};

export const GROUPS_SECTION: HomeSection = {
  id: "groups",
  title: "Bots hand off work.",
  intro:
    "Put bots from different teams in one group. Marketing's research reaches sales without anyone copying it across.",
};

export const ANALYTICS_SECTION: HomeSection = {
  id: "analytics",
  title: "See what every bot did, and why.",
  intro: "Runs, approvals and the revenue goal behind each one. Filter by team.",
};

export const CONTEXT_SECTION: HomeSection = {
  id: "context",
  title: "Your context, read first.",
  intro: "Company defaults every bot starts from, with overrides where a team works differently.",
};

export const PRICING_SECTION = {
  id: "pricing",
  title: "Pay for the bots you run.",
  muted: "Plus what they use.",
};

/** The six parts of a flow, in order, with what each one answers. */
export const FLOW_PARTS = [
  { name: "Trigger", body: "when it runs" },
  { name: "Context", body: "what it reads" },
  { name: "Steps", body: "what it does, in order" },
  { name: "Approval", body: "who approves what, before which action" },
  { name: "Output", body: "where the work lands" },
  { name: "Goal", body: "the revenue goal it answers to" },
];

/** The loop every flow runs on (#how-it-works). */
export const LOOP = [
  { title: "Track", body: "Bots read activity across the tools you connect." },
  { title: "Align", body: "Every action maps to a revenue goal." },
  { title: "Nudge", body: "Drift gets flagged with a suggested next step. A person decides." },
  { title: "Report", body: "One view of work against goals, from rep to CRO. No leaderboards." },
];

/** What a flow run leaves behind. */
export const RECEIPT_LINE =
  "Every run leaves a receipt: what the bot read, what it did, who approved it, and what it didn't send.";

/** The tools bots reach, generically. No vendor is named anywhere on the site. */
export const INTEGRATIONS_LINE =
  "Bots connect to the tools your team already uses: CRM, email, calendar, Slack and call notes, through the permissions you connect.";

export const HOW_TO_START =
  "Book a strategy call and we'll map your first flow with you on real work.";
