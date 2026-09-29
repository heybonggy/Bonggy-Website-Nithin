/**
 * The markdown twin of every page.
 *
 * Built from the same content the pages render, so a twin can't fall behind
 * the page it mirrors. An answer engine that would rather read markdown than
 * un-pick a React tree gets exactly what a visitor sees, in the right order.
 */
import {
  BRIGHT_LINES,
  CATEGORY,
  CAL_URL,
  COMPLIANCE_LINE,
  EMAIL,
  EXPLAINER,
  LINKEDIN_URL,
  PAGES,
  PRESETS_LINE,
  PRICING_LINE,
  SECURITY_LINE,
  TAGLINE,
  absolute,
  type PageSlug,
} from "@/content/site";
import {
  CATALOG,
  EXAMPLE_FLOW_NOTE,
  FLOW_PART_LABELS,
  TEAM_LABELS,
  TEAM_ORDER,
  botPath,
  botsForTeam,
  flowPartText,
  type CatalogBot,
} from "@/content/bots";
import { HOME_FAQ } from "@/components/marketing/home-faq";
import { FAQ_QUESTIONS } from "@/content/pages/faq";
import { ABOUT_LEDE, ABOUT_PRINCIPLES } from "@/content/pages/about";
import { CAREERS_HOW_WE_WORK, CAREERS_LEDE, CAREERS_PRINCIPLES } from "@/content/pages/careers";
import { CONTACT_CARDS, CONTACT_LEDE } from "@/content/pages/contact";
import { SECURITY_COMMITMENTS, SECURITY_LEDE } from "@/content/pages/security";
import {
  ANALYTICS_SECTION,
  CONTEXT_SECTION,
  FLOWS_SECTION,
  FLOW_PARTS,
  GROUPS_SECTION,
  HERO_LEDE,
  HERO_MUTED,
  HERO_TITLE,
  HOW_TO_START,
  INTEGRATIONS_LINE,
  LOOP,
  RECEIPT_LINE,
  TEAMS_SECTION,
} from "@/content/pages/home";
import { NOTE_PARAGRAPHS, NOTE_SUBTITLE } from "@/content/pages/note";
import { PRIVACY_SECTIONS, TERMS_SECTIONS } from "@/content/pages/legal";
import { RESOURCES_LEDE, RESOURCE_POSTS } from "@/content/pages/resources";

const lines = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join("\n");

const isList = (line: string) => line.startsWith("- ");
const isHeading = (line: string) => line.startsWith("#");

/**
 * Markdown needs a blank line between a paragraph and whatever follows it, or
 * the two run together when rendered. Building the twins by concatenation is
 * clearer than threading blank lines through every branch, so the spacing is
 * put right once, here.
 */
function tidy(markdown: string): string {
  const out: string[] = [];
  for (const line of markdown.split("\n")) {
    const previous = out[out.length - 1];
    const needsGap =
      previous !== undefined &&
      previous.trim() !== "" &&
      line.trim() !== "" &&
      !isHeading(previous) &&
      // Consecutive bullets stay tight; anything else gets air.
      !(isList(previous) && isList(line));
    if (needsGap) out.push("");
    out.push(line);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

const h1 = (text: string) => `# ${text}\n`;
const h2 = (text: string) => `\n## ${text}\n`;
const h3 = (text: string) => `\n### ${text}\n`;
const bullet = (text: string) => `- ${text}`;

/** The header every twin opens with: title, description, canonical. */
function header(slug: PageSlug) {
  const page = PAGES[slug];
  return lines(
    h1(page.absoluteTitle ?? `${page.title} · Bonggy`),
    `> ${page.description}`,
    "",
    `Source: ${absolute(page.path as string)}`,
  );
}

const brightLines = () =>
  BRIGHT_LINES.map((l) => bullet(`**${l.title}** ${l.body}`)).join("\n");

function flowOf(bot: CatalogBot) {
  return lines(
    ...FLOW_PART_LABELS.map((part) =>
      bullet(`**${part.label}:** ${flowPartText(bot.exampleFlow, part.key)}`),
    ),
    bullet(`**Hard limit:** ${bot.exampleFlow.limit.toLowerCase()}`),
    "",
    `_${EXAMPLE_FLOW_NOTE}_`,
  );
}

/* ---------------------------------- pages ---------------------------------- */

function home() {
  return lines(
    header("home"),
    h2("What Bonggy is"),
    CATEGORY,
    "",
    EXPLAINER,
    "",
    `**${HERO_TITLE}** ${HERO_MUTED}`,
    "",
    HERO_LEDE,

    h2(TEAMS_SECTION.title),
    TEAMS_SECTION.intro,
    "",
    ...TEAM_ORDER.map((team) =>
      lines(
        `**${TEAM_LABELS[team]}**`,
        ...botsForTeam(team).map((b) => bullet(`**${b.name}** — ${b.job} ${b.description}`)),
        "",
      ),
    ),

    h2(FLOWS_SECTION.title),
    FLOWS_SECTION.intro,
    "",
    ...FLOW_PARTS.map((p) => bullet(`**${p.name}** — ${p.body}`)),
    "",
    PRESETS_LINE,

    h2(GROUPS_SECTION.title),
    GROUPS_SECTION.intro,

    h2("Approvals"),
    brightLines(),
    "",
    RECEIPT_LINE,

    h2(ANALYTICS_SECTION.title),
    ANALYTICS_SECTION.intro,

    h2(CONTEXT_SECTION.title),
    CONTEXT_SECTION.intro,
    "",
    INTEGRATIONS_LINE,

    h2("The loop"),
    ...LOOP.map((l) => bullet(`**${l.title}** — ${l.body}`)),

    h2("Pricing"),
    PRICING_LINE,

    h2("FAQ"),
    ...HOME_FAQ.map((q) => lines(`**${q.q}**`, "", q.a, "")),

    h2("How to start"),
    HOW_TO_START,
    "",
    bullet(`Strategy call: ${CAL_URL}`),
    bullet(`Email: ${EMAIL}`),
    "",
    TAGLINE,
  );
}

function botsIndex() {
  return lines(
    header("bots"),
    ...TEAM_ORDER.map((team) =>
      lines(
        h2(TEAM_LABELS[team]),
        ...botsForTeam(team).map((bot) =>
          lines(
            h3(bot.name),
            bot.description,
            "",
            bullet(`Job: ${bot.job}`),
            bullet(`Role: ${bot.role}`),
            bullet(`Page: ${absolute(botPath(bot.slug))}`),
            "",
            flowOf(bot),
            bot.group ? `\n${bot.group}` : "",
          ),
        ),
      ),
    ),
    h2("How to start"),
    PRESETS_LINE,
  );
}

function botPage(bot: CatalogBot) {
  const approval = BRIGHT_LINES.find((l) => l.id === "approval-by-action")!;
  return lines(
    h1(`${bot.seoTitle} · Bonggy`),
    `> ${bot.seoDescription}`,
    "",
    `Source: ${absolute(botPath(bot.slug))}`,
    h2("What it does"),
    `${TEAM_LABELS[bot.team]} bot · ${bot.role}`,
    "",
    bot.job,
    "",
    bot.description,
    h2("Example flow"),
    flowOf(bot),
    h2("What needs a person"),
    `${bot.exampleFlow.approval}.`,
    "",
    `**${approval.title}** ${approval.body}`,
    bot.group ? `\n${bot.group}` : "",
    h2(`More ${TEAM_LABELS[bot.team]} bots`),
    ...botsForTeam(bot.team)
      .filter((b) => b.slug !== bot.slug)
      .map((b) => bullet(`[${b.name}](${absolute(botPath(b.slug))}) — ${b.job}`)),
  );
}

const sectionList = (items: { title?: string; h?: string; body: string }[]) =>
  items.map((s) => lines(h3(s.title ?? s.h ?? ""), s.body)).join("\n");

function about() {
  return lines(
    header("about"),
    h2("Why we're building it"),
    ABOUT_LEDE,
    h2("What we hold"),
    sectionList(ABOUT_PRINCIPLES),
  );
}

function careers() {
  return lines(
    header("careers"),
    h2("How we hire"),
    CAREERS_LEDE,
    h2("How we work"),
    CAREERS_HOW_WE_WORK,
    "",
    sectionList(CAREERS_PRINCIPLES),
    h2("Get in touch"),
    `Email ${EMAIL}.`,
  );
}

function contact() {
  return lines(
    header("contact"),
    CONTACT_LEDE,
    ...CONTACT_CARDS.map((c) => lines(h3(`${c.kind}: ${c.title}`), c.body)),
    "",
    bullet(`Strategy call: ${CAL_URL}`),
    bullet(`Email: ${EMAIL}`),
  );
}

function security() {
  return lines(
    header("security"),
    SECURITY_LEDE,
    ...SECURITY_COMMITMENTS.map((c) => lines(h3(c.title), c.body)),
    h2("Data protection"),
    SECURITY_LINE,
    h2("Compliance"),
    COMPLIANCE_LINE,
    "",
    `For documentation ahead of a pilot, email ${EMAIL}.`,
  );
}

function faq() {
  return lines(
    header("faq"),
    ...FAQ_QUESTIONS.map((q) => lines(h3(q.q), q.a)),
  );
}

function resources() {
  return lines(
    header("resources"),
    RESOURCES_LEDE,
    h2("Writing"),
    ...RESOURCE_POSTS.map((p) =>
      bullet(`[${p.title}](${absolute(`/resources/${p.slug}`)}) — ${p.excerpt}`),
    ),
  );
}

function note() {
  return lines(
    header("note"),
    NOTE_SUBTITLE,
    "",
    ...NOTE_PARAGRAPHS.map((p) => `${p}\n`),
  );
}

function legal(slug: "privacy" | "terms") {
  const sections = slug === "privacy" ? PRIVACY_SECTIONS : TERMS_SECTIONS;
  return lines(header(slug), sectionList(sections));
}

function brand() {
  return lines(
    header("brand"),
    h2("Name"),
    "Bonggy, capital B, one word. Lowercase only in URLs and handles.",
    h2("Boilerplate"),
    h3("25 words"),
    BOILERPLATE[25],
    h3("50 words"),
    BOILERPLATE[50],
    h3("100 words"),
    BOILERPLATE[100],
    h2("Logo"),
    bullet(`Mark: ${absolute("/brand/logo/bonggy-mark-black.svg")}`),
    bullet(`Lockup: ${absolute("/brand/logo/bonggy-lockup-black.svg")}`),
    "",
    "Monochrome, always. Keep clear space of half the mark's width on every side. At 24px and under, use the heavier ring. Don't recolour it, add effects, or put a bot in its place.",
    h2("Bots"),
    ...CATALOG.map((b) =>
      bullet(`${b.name}: ${absolute(`/brand/bots/${b.slug}.svg`)}`),
    ),
    h2("Press"),
    `Email ${EMAIL}.`,
    "",
    bullet(`LinkedIn: ${LINKEDIN_URL}`),
  );
}

/** The three approved descriptions of Bonggy, at three lengths. */
export const BOILERPLATE: Record<25 | 50 | 100, string> = {
  25: "Bonggy is the agent workspace for sales, RevOps and marketing teams. Teams build bots from a sentence, every flow ties to a revenue goal, and people approve what customers see.",
  50: "",
  100: "",
};
BOILERPLATE[50] = `${BOILERPLATE[25]} Each bot runs a six-part flow (Trigger, Context, Steps, Approval, Output, Goal) that the team can edit, with hard limits written in its own words. Every run leaves a receipt.`;
BOILERPLATE[100] = `${BOILERPLATE[50]} Bots hand work to one another across teams, read the company's context first, and work only through the tools and permissions a team connects. Bonggy doesn't send at volume and has no leaderboards: work is measured against revenue, never person against person. Bots draft. People approve.`;

/* --------------------------------- routing --------------------------------- */

/** Every markdown twin, keyed by the path it is served at (no `.md`). */
export function markdownFor(path: string): string | null {
  const body = build(path);
  return body === null ? null : tidy(body);
}

function build(path: string): string | null {
  const bot = CATALOG.find((b) => botPath(b.slug) === path);
  if (bot) return botPage(bot);

  switch (path) {
    case "/":
      return home();
    case "/bots":
      return botsIndex();
    case "/about":
      return about();
    case "/careers":
      return careers();
    case "/contact":
      return contact();
    case "/security":
      return security();
    case "/faq":
      return faq();
    case "/resources":
      return resources();
    case "/resources/a-note-from-us":
      return note();
    case "/privacy":
      return legal("privacy");
    case "/terms":
      return legal("terms");
    case "/brand":
      return brand();
    default:
      return null;
  }
}

/** Every path that has a twin, for llms-full.txt and the sitemap checks. */
export const MARKDOWN_PATHS: string[] = [
  "/",
  "/bots",
  ...CATALOG.map((b) => botPath(b.slug)),
  "/faq",
  "/security",
  "/about",
  "/contact",
  "/careers",
  "/resources",
  "/resources/a-note-from-us",
  "/brand",
  "/privacy",
  "/terms",
];
