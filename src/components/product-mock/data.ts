/**
 * Example data for the product mocks (Paper). All companies, people and
 * numbers are fictional demo data. Tools are generic and lowercase.
 */
import type { Team } from "@/components/ui/mascot";

export type { Team };
import type { BotLook } from "@/components/ui/bot-look";
export type Role = "modeller" | "researcher" | "value generator";
export type StatusKind = "off" | "scheduled" | "running" | "needs-you" | "done" | "held" | "failed";
export type FlowPart = "trigger" | "context" | "steps" | "approval" | "output" | "goal";

export const FLOW_PARTS: FlowPart[] = ["trigger", "context", "steps", "approval", "output", "goal"];

export const TEAM_LIST: { id: Team; label: string }[] = [
  { id: "sales", label: "sales" },
  { id: "revops", label: "revops" },
  { id: "marketing", label: "marketing" },
];

export type Bot = {
  id: string;
  name: string;
  team: Team;
  role: Role;
  /** One line on what the bot does (teams strip). */
  job: string;
  /** What the bot does, in a sentence. The one description used wherever bots appear. */
  description: string;
  status: StatusKind;
  statusLabel?: string;
  preview: string;
  time: string;
  unread?: boolean;
};

export const BOTS: Bot[] = [
  { id: "dossier", name: "Dossier", team: "sales", role: "researcher", job: "A brief before every first call.", description: "Digs into an account and its people so the rep walks in prepared.", status: "done", statusLabel: "done · 1h ago", preview: "brief ready · northwind", time: "1h" },
  { id: "unstick", name: "Unstick", team: "sales", role: "value generator", job: "Mondays: stuck deals and next steps.", description: "Finds stalled deals and suggests the next step that moves them.", status: "scheduled", statusLabel: "mondays 08:00", preview: "5 stuck deals flagged", time: "mon" },
  { id: "draftsmith", name: "Draftsmith", team: "sales", role: "value generator", job: "Research into a follow-up draft, for approval.", description: "Turns research into a brief or message a rep can actually use.", status: "held", statusLabel: "held for you", preview: "1 draft held for you", time: "3h", unread: true },
  { id: "compass", name: "Compass", team: "revops", role: "researcher", job: "Accounts drifting from the ICP, deals with no next step.", description: "Watches the pipeline against the goal and nudges when it drifts.", status: "done", statusLabel: "done · 2h ago", preview: "3 accounts off-icp", time: "2h" },
  { id: "tidy", name: "Tidy", team: "revops", role: "value generator", job: "Missing fields and duplicates; proposes fixes, for approval.", description: "Cleans up CRM records, fills gaps and flags what's off.", status: "needs-you", statusLabel: "needs you", preview: "12 fixes to review", time: "4h" },
  { id: "delta", name: "Delta", team: "revops", role: "modeller", job: "Before the weekly call: what changed and why.", description: "Preps the forecast and explains what changed since last week.", status: "scheduled", statusLabel: "thursdays 16:00", preview: "next run thu 16:00", time: "thu" },
  { id: "sweet-spot", name: "Sweet Spot", team: "marketing", role: "modeller", job: "Segments and which ones win.", description: "Maps the segments most worth your team's time.", status: "done", statusLabel: "done · 1d ago", preview: "mid-market is 40% of wins", time: "1d" },
  { id: "echo", name: "Echo", team: "marketing", role: "researcher", job: "Pains and objections from recent calls.", description: "Pulls themes and pains out of calls and campaigns.", status: "held", statusLabel: "held for you", preview: "post to #q4-campaign held", time: "3h" },
  { id: "quill", name: "Quill", team: "marketing", role: "value generator", job: "Posts, pages and emails in your voice, for approval.", description: "Drafts content in your team's voice, ready for review.", status: "off", statusLabel: "off", preview: "off", time: "5d" },
  { id: "relay", name: "Relay", team: "marketing", role: "researcher", job: "Scores new leads against the ICP and briefs the right rep.", description: "Routes inbound leads to the right owner, fast.", status: "needs-you", statusLabel: "needs you", preview: "2 leads to route", time: "12m" },
];

/** Any bot by id, including the one the hero creates (Boomerang). */
export const botById = (id: string): Bot => {
  const bot = [...BOTS, BOOMERANG].find((b) => b.id === id);
  if (!bot) throw new Error(`unknown bot: ${id}`);
  return bot;
};

/** The bot the hero builds from a sentence. */
export const BOOMERANG: Bot = {
  id: "boomerang",
  name: "Boomerang",
  team: "sales",
  role: "researcher",
  job: "Tells you when a lost deal's champion changes jobs.",
  description: "Spots when a past champion lands at a new company and drafts the reopen.",
  status: "scheduled",
  statusLabel: "daily 07:00",
  preview: "watching closed-lost champions",
  time: "now",
};

export const HANDOFF_GROUP = {
  id: "handoff-pod",
  name: "Marketing → Sales handoff",
  members: ["echo", "unstick", "relay"],
};

const VIEWER_NAME = "Nithin";
/** The person using the mock. Initials always come from the name. */
export const VIEWER = {
  name: VIEWER_NAME,
  initials: VIEWER_NAME.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
};

/* ---------------------------------- flows --------------------------------- */

export type Run = { id: string; when: string; status: StatusKind; label: string };

export type Flow = {
  id: string;
  botId: string;
  on: boolean;
  schedule: string;
  lastRun: string;
  nextRun: string;
  parts: Record<FlowPart, string | string[]>;
  /** A hard limit shown as a chip, and the part it sits in. */
  limit?: { part: FlowPart; text: string };
  runs: Run[];
};

export const UNSTICK_FLOW: Flow = {
  id: "unstick-weekly",
  botId: "unstick",
  on: true,
  schedule: "every monday 08:00",
  lastRun: "mon 08:00 · 5 found",
  nextRun: "mon 08:00",
  parts: {
    trigger: "every monday 08:00",
    context: "open deals in crm · calendar · call notes",
    steps: ["read every open deal", "flag no next step or 14+ days quiet", "suggest one next step per deal"],
    approval: "you · before any crm change",
    output: "this chat · a crm task per deal",
    goal: "q4 enterprise logos",
  },
  limit: { part: "approval", text: "never email anyone" },
  runs: [
    { id: "r4", when: "mon 08:00", status: "running", label: "reading open deals…" },
    { id: "r3", when: "fri 16:05", status: "needs-you", label: "5 tasks to add" },
    { id: "r2", when: "mon 08:00", status: "done", label: "5 found · nothing sent" },
    { id: "r1", when: "next mon 08:00", status: "scheduled", label: "queued" },
  ],
};

/** The remix: the user edits Unstick and the card follows. */
export const UNSTICK_REMIX = {
  trigger: { from: "every monday 08:00", to: "fridays after forecast" },
  context: { from: "open deals in crm · calendar · call notes", to: "open enterprise deals only · crm · calendar · call notes" },
};

/** Other flows in the Flows screen list. */
export const FLOW_LIST: { botId: string; on: boolean; schedule: string; lastRun: string }[] = [
  { botId: "unstick", on: true, schedule: "mondays 08:00", lastRun: "mon 08:00" },
  { botId: "compass", on: true, schedule: "daily 07:00", lastRun: "today 07:00" },
  { botId: "relay", on: true, schedule: "on new lead", lastRun: "12m ago" },
  { botId: "echo", on: false, schedule: "one-off", lastRun: "wed 11:20" },
  { botId: "tidy", on: false, schedule: "fridays 17:00", lastRun: "fri 17:00" },
];

export const UNSTICK_RECEIPT = {
  title: "run receipt · fri 16:05",
  items: [
    { verb: "read", text: "18 open deals" },
    { verb: "found", text: "5 stuck: 3 no next step, 2 quiet 14+ days" },
    { verb: "added", text: "5 next-step tasks" },
  ],
  footer: "nothing sent.",
};

/* ------------------------------ result cards ------------------------------ */

export type DealRisk = { name: string; stage: string; daysQuiet: number; reason: string; risk: number };

export const STUCK_DEALS: DealRisk[] = [
  { name: "northwind freight", stage: "proposal", daysQuiet: 16, reason: "quiet 14+ days", risk: 4 },
  { name: "helix health", stage: "evaluation", daysQuiet: 9, reason: "no next step", risk: 3 },
  { name: "atlas corp", stage: "discovery", daysQuiet: 21, reason: "quiet 14+ days", risk: 5 },
  { name: "pylon", stage: "proposal", daysQuiet: 6, reason: "no next step", risk: 2 },
  { name: "corvid labs", stage: "evaluation", daysQuiet: 11, reason: "no next step", risk: 3 },
];

/* -------------------------------- approvals ------------------------------- */

export type Approval = {
  id: string;
  botId: string;
  /** Two-tone line: bot name, then the action. */
  action: string;
  kind: "customer-facing" | "internal";
  goal: string;
  age: string;
  status: StatusKind;
};

export const APPROVALS: Approval[] = [
  { id: "a1", botId: "boomerang", action: "wants to send a note to dana at globex", kind: "customer-facing", goal: "q4 new pipeline", age: "2m", status: "needs-you" },
  { id: "a2", botId: "unstick", action: "wants to add 5 next-step tasks to your crm", kind: "internal", goal: "q4 enterprise logos", age: "14m", status: "needs-you" },
  { id: "a3", botId: "relay", action: "briefed 4 reps in #inbound", kind: "internal", goal: "pipeline from inbound", age: "1h", status: "done" },
  { id: "a4", botId: "echo", action: "post to #q4-campaign", kind: "customer-facing", goal: "pipeline from inbound", age: "3h", status: "held" },
];

export const CHAMPION_NOTE = {
  strip: "needs your ok · you · before any note is sent",
  to: "dana, now at globex",
  subject: "congrats on the move to globex",
  body: [
    "hi dana,",
    "congrats on the new role. when we spoke last year, onboarding time was the blocker at your old team.",
    "if it's on your list at globex, happy to share what we've learned since. 20 minutes next week?",
  ],
  goal: "q4 new pipeline",
};

/* -------------------------------- analytics ------------------------------- */

export type AnalyticsRow = { botId: string; runs: number; approved: number; hours: number; goal: string };

export const ANALYTICS_ROWS: AnalyticsRow[] = [
  { botId: "boomerang", runs: 14, approved: 1, hours: 0.5, goal: "q4 new pipeline" },
  { botId: "unstick", runs: 4, approved: 4, hours: 3, goal: "q4 enterprise logos" },
  { botId: "compass", runs: 30, approved: 2, hours: 4.5, goal: "q4 enterprise logos" },
  { botId: "echo", runs: 3, approved: 1, hours: 2, goal: "pipeline from inbound" },
  { botId: "relay", runs: 21, approved: 19, hours: 3.5, goal: "pipeline from inbound" },
];

export const MEMORY_SOURCES = [
  { source: "crm notes", count: 212, updated: "2h ago" },
  { source: "call notes", count: 64, updated: "1h ago" },
  { source: "docs", count: 9, updated: "3d ago" },
];

/* ----------------------------- company context ---------------------------- */

export type ContextRow = {
  label: string;
  value: string;
  override?: { team: Team; value: string };
};

export const COMPANY_CONTEXT: ContextRow[] = [
  { label: "ICP", value: "b2b saas, 50–500 employees", override: { team: "revops", value: "enterprise plan: 1000+" } },
  { label: "Tone", value: "plain, specific, one clear ask", override: { team: "marketing", value: "warmer, story-first, still no hype" } },
  { label: "Deal stages", value: "discovery → evaluation → proposal → closed" },
  { label: "Never", value: "never contact current customers' champions without the AE" },
];

/* -------------------------------- team takes ------------------------------ */

export type TeamTake = {
  botId: string;
  instruction: string;
  /** The hard-limit clause inside the instruction. */
  limit: string;
  flowSaved: string;
  report: string;
  human: string;
  confirmation: string;
  /** Two-tone description on the left: lead, rest. */
  description: [string, string];
};

export const TEAM_TAKES: TeamTake[] = [
  {
    botId: "unstick",
    instruction: "Every Monday, flag my stuck deals. Never email anyone.",
    limit: "Never email anyone.",
    flowSaved: "mondays 08:00 · internal only",
    report: "5 of 18 open deals are stuck: 3 have no next step, 2 went quiet 14+ days.",
    human: "approve",
    confirmation: "added 5 next-step tasks to your crm. nothing sent.",
    description: ["Unstick.", "Flags stuck deals every Monday. Never emails anyone."],
  },
  {
    botId: "compass",
    instruction: "Check pipeline daily for accounts drifting off ICP. Don't change any records.",
    limit: "Don't change any records.",
    flowSaved: "daily 07:00 · read-only",
    report: "3 accounts in the enterprise plan sit outside your icp.",
    human: "reassign",
    confirmation: "moved research to 3 in-icp accounts. no crm records changed.",
    description: ["Compass.", "Checks pipeline every morning. Never changes a record."],
  },
  {
    botId: "echo",
    instruction: "Pull the top pains and objections from last month's calls. Don't write copy yet.",
    limit: "Don't write copy yet.",
    flowSaved: "one-off · internal",
    report: "read 24 call notes; 4 pains came up 3+ times.",
    human: "share",
    confirmation: "posted to #q4-campaign. no copy drafted.",
    description: ["Echo.", "Turns last month's calls into a list of pains. Writes no copy."],
  },
  {
    botId: "relay",
    instruction: "Score new demo requests against our ICP and brief the right rep. Never reply to the lead.",
    limit: "Never reply to the lead.",
    flowSaved: "on new lead · internal only",
    report: "7 new leads today; 4 fit the icp, 2 are enterprise.",
    human: "route",
    confirmation: "briefed 4 reps in slack, owners set in crm. no reply sent to leads.",
    description: ["Relay.", "Scores demo requests and briefs reps. Never replies to a lead."],
  },
];

/* ---------------------------------- looks --------------------------------- */

/** Each bot's default look: distinct, used everywhere the bot appears. */
export const DEFAULT_LOOKS: Record<string, BotLook> = {
  "boomerang": { color: "coral", shape: "pebble", eyes: "pill", accessory: "none" },
  "unstick": { color: "graphite", shape: "squircle", eyes: "visor", accessory: "none" },
  "compass": { color: "sky", shape: "round", eyes: "dots", accessory: "none" },
  "echo": { color: "violet", shape: "blob", eyes: "pill", accessory: "glasses" },
  "relay": { color: "teal", shape: "capsule", eyes: "dots", accessory: "headset" },
  "dossier": { color: "amber", shape: "round", eyes: "round", accessory: "antenna" },
  "draftsmith": { color: "pink", shape: "pebble", eyes: "arcs", accessory: "none" },
  "tidy": { color: "lime", shape: "squircle", eyes: "pill", accessory: "beanie" },
  "delta": { color: "amber", shape: "capsule", eyes: "visor", accessory: "none" },
  "sweet-spot": { color: "lime", shape: "blob", eyes: "visor", accessory: "antenna" },
  "quill": { color: "pink", shape: "capsule", eyes: "arcs", accessory: "beanie" },
  // The visitor's own bot (Make it yours → Your bot, and the fifth agents
  // tab): starts blank, like the bot the fifth tab wakes up.
  "your-bot": { color: "graphite", shape: "pebble", eyes: "pill", accessory: "none" },
};

export const YOUR_BOT_ID = "your-bot";

/** The bots the customiser offers. */
export const CUSTOMISABLE_BOTS = ["boomerang", "unstick", "compass", "echo", "relay"];
