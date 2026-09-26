/**
 * Example data for the product mocks. Everything here is fictional: agent
 * names are Bonggy templates, and the companies and people are made up.
 */

export type AvatarShape = "circle" | "square" | "squircle" | "pill" | "diamond";

/** Muted avatar tones. Bonggy's accent green is kept for status, not avatars. */
export const TONES = {
  sage: "oklch(0.62 0.05 165)",
  slate: "oklch(0.6 0.035 255)",
  sand: "oklch(0.68 0.045 75)",
  mauve: "oklch(0.6 0.04 320)",
  steel: "oklch(0.64 0.02 220)",
  clay: "oklch(0.62 0.05 40)",
} as const;
export type Tone = keyof typeof TONES;

export type AvatarSpec = { shape: AvatarShape; tone: Tone };

export type Agent = {
  id: string;
  name: string;
  role: string;
  avatar: AvatarSpec;
  preview: string;
  time: string;
  unread?: boolean;
};

export type Group = {
  id: string;
  name: string;
  members: AvatarSpec[];
  /** Members beyond the stacked avatars, shown as "+n". */
  more: number;
  preview: string;
  time: string;
  unread?: boolean;
};

export const AGENTS: Agent[] = [
  {
    id: "researcher",
    name: "Account Researcher",
    role: "Researcher",
    avatar: { shape: "circle", tone: "sage" },
    preview: "Ready for your next account",
    time: "now",
  },
  {
    id: "modeller",
    name: "Market Modeller",
    role: "Modeller",
    avatar: { shape: "squircle", tone: "slate" },
    preview: "Mid-market logistics is 40% of Q3 wins",
    time: "2h",
  },
  {
    id: "writer",
    name: "Brief Writer",
    role: "Value generator",
    avatar: { shape: "square", tone: "sand" },
    preview: "2 drafts waiting for approval",
    time: "3h",
    unread: true,
  },
  {
    id: "coach",
    name: "Deal Coach",
    role: "Value generator",
    avatar: { shape: "pill", tone: "mauve" },
    preview: "Northwind deal has no next step",
    time: "Mon",
  },
  {
    id: "pipeline",
    name: "Pipeline Watch",
    role: "Researcher",
    avatar: { shape: "diamond", tone: "steel" },
    preview: "3 accounts drifting from ICP",
    time: "Mon",
    unread: true,
  },
];

export const GROUPS: Group[] = [
  {
    id: "enterprise",
    name: "Enterprise pod",
    members: [AGENTS[0].avatar, AGENTS[1].avatar, AGENTS[2].avatar],
    more: 3,
    preview: "Weekly plan for 12 target accounts",
    time: "1d",
  },
];

export const ACCOUNT_RESEARCHER = AGENTS[0];
export const DEAL_COACH = AGENTS[3];

export const USER = { initials: "NR", name: "You" };

/** The goal the demo conversation's work maps to. */
export const DEMO_GOAL = "Q4 new enterprise logos";

export const DEMO_PROMPT =
  "Research acme.com before my Thursday call with their VP Sales.";

export const DEMO_SOURCES = ["acme.com", "LinkedIn", "CRM notes"];

export const DEMO_BRIEF = {
  company: "Acme Logistics · freight software · ~600 people · Series C",
  whyNow:
    "Hired a new VP Sales in August and posted four RevOps roles this month. They're rebuilding the sales motion.",
  pains: [
    "Ramp time for the new AE hires",
    "Forecast calls rely on rep gut feel",
    "Outbound volume up, reply rates down",
  ],
  room: [
    { role: "VP Sales", note: "meeting owner, new in seat" },
    { role: "Head of RevOps", note: "likely evaluator" },
    { role: "CFO", note: "signs off above $50k" },
  ],
  angle:
    "Lead with ramp time: show how a researched brief before every first call gets new AEs productive faster.",
};

export const DEMO_DRAFT = {
  to: "VP Sales, Acme Logistics",
  subject: "Thursday: getting your new AEs to first meetings faster",
  body: [
    "Hi Dana,",
    "Congrats on the new role. Ahead of Thursday, I pulled together how teams rebuilding their motion cut ramp time with account briefs before every first call.",
    "Happy to walk through what that looks like for your four new RevOps hires.",
  ],
};

export const COACH_PROMPT =
  "You're my Deal Coach. Review my open deals every Monday and tell me which ones are stuck.";

export const COACH_SETUP = [
  { k: "When", v: "Every Monday, 8:00" },
  { k: "Looks at", v: "Open deals in your CRM" },
  { k: "Flags as stuck", v: "No activity in 14 days, or no next step" },
  { k: "Sends", v: "A short list here, for you" },
];

export type MemoryFact = { date: string; fact: string };

/** What the Account Researcher has learned, oldest first. */
export const MEMORY: MemoryFact[] = [
  { date: "Aug 04", fact: "Freight software buyers ask for a security review before any pilot." },
  { date: "Aug 12", fact: "VP Sales is usually the meeting owner; RevOps does the evaluation." },
  { date: "Aug 21", fact: "Ramp-time angle gets replies twice as often as forecast accuracy." },
  { date: "Sep 02", fact: "Northwind prefers a phased budget; won after splitting into two quarters." },
  { date: "Sep 10", fact: "Accounts hiring RevOps roles convert faster in the next 60 days." },
  { date: "Sep 18", fact: "Acme's new VP Sales came from Helix; Helix was a win in Q2." },
];

export const ACTIVITY = [
  { name: "Account Researcher", tone: "sage" as Tone, value: 46 },
  { name: "Brief Writer", tone: "sand" as Tone, value: 31 },
  { name: "Market Modeller", tone: "slate" as Tone, value: 18 },
  { name: "Pipeline Watch", tone: "steel" as Tone, value: 14 },
  { name: "Deal Coach", tone: "mauve" as Tone, value: 9 },
];

export const GOALS = [
  { goal: "Q4 new enterprise logos", share: 52 },
  { goal: "Mid-market expansion", share: 27 },
  { goal: "Net revenue retention", share: 13 },
  { goal: "Not mapped to a goal", share: 8 },
];

export const CONTEXT = {
  company: "Pylon Software",
  sells: "Freight quoting software for mid-market and enterprise logistics teams.",
  icp: "Logistics and 3PL companies, 200–5,000 people, with a RevOps function and a sales team of 10+.",
  goals: ["Q4 new enterprise logos", "Mid-market expansion", "Net revenue retention"],
  voice: "Plain and specific. Short emails, no hype, one clear ask.",
  tools: ["CRM", "Email", "Calendar", "Slack", "Call notes"],
};
