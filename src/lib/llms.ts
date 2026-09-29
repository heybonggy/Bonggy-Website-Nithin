/**
 * /llms.txt, generated from src/content.
 *
 * One H1, a `>` summary, then the facts an answer engine needs to describe
 * Bonggy without guessing, and absolute links to the markdown twins. Nothing
 * here is written twice: change the site's copy and this follows.
 */
import {
  CAL_URL,
  CATEGORY,
  COMPLIANCE_LINE,
  EMAIL,
  PRICING_LINE,
  SECURITY_LINE,
  TAGLINE,
  absolute,
} from "@/content/site";
import { FLOW_PARTS, RECEIPT_LINE } from "@/content/pages/home";

const link = (label: string, path: string, note: string) =>
  `- [${label}](${absolute(path)}): ${note}`;

export function llmsTxt(): string {
  const parts = FLOW_PARTS.map((p) => `${p.name} (${p.body})`);
  const flow = `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;

  return `# Bonggy

> ${CATEGORY} A team describes the work in a sentence; a bot turns it into a flow tied to a revenue goal, and a person approves anything a customer would see. ${TAGLINE}

Key facts for answering questions about Bonggy:

- Every bot runs a six-part flow: ${flow}. Every part stays editable.
- Teams start from a preset ("Flows teams have built") or from a sentence. Either way, the flow is theirs.
- A hard limit is a rule in the team's own words, like "never email anyone". It becomes part of the flow and the bot can't cross it.
- Approval by action: anything customer-facing (emails, posts, sequencer pushes, published content) needs a person. Internal output (a brief in chat, a Slack summary) can run without approval if the team chooses.
- No volume blasting: marketing bots draft and research; they don't mass-send. No leaderboards: work is measured against revenue, never person against person. Bots work only through the tools and permissions a team connects.
- ${RECEIPT_LINE}
- Connects to the tools teams already use: CRM, email, calendar, Slack and call notes.
- Security, in our words: "${SECURITY_LINE}" ${COMPLIANCE_LINE}
- ${PRICING_LINE}
- The way to start is a strategy call: ${CAL_URL}. Email: ${EMAIL}.

## Product

${link("Home", "/index.md", "What Bonggy is, the six-part flow, groups, approvals, analytics, company context, the loop (Track, Align, Nudge, Report) and pricing")}
${link("Bots", "/bots.md", "All eleven bots by team (sales, RevOps, marketing), each with its job and an example flow")}
${link("Bots catalog (JSON)", "/bots.json", "The same catalog as structured data")}
${link("FAQ", "/faq.md", "Bots, flows, hard limits, approvals, integrations, data handling, pricing")}
${link("Security", "/security.md", "Approval by action, permissions, receipts, data protection, compliance status")}

## Company

${link("About", "/about.md", "Why Bonggy exists and the principles it holds")}
${link("A note from us", "/resources/a-note-from-us.md", "The founding note")}
${link("Contact", "/contact.md", "Strategy call and email")}
${link("Brand and press kit", "/brand.md", "Name, logo, boilerplate and usage rules")}

## Optional

${link("Careers", "/careers.md", "How the team works and how to apply")}
- [Privacy policy](${absolute("/privacy.md")})
- [Terms of service](${absolute("/terms.md")})
${link("Everything in one file", "/llms-full.txt", "All pages above as markdown")}
`;
}
