/** /security's copy, so the page and its markdown twin render from one source. */
import { SECURITY_LINE } from "../site";

export const SECURITY_LEDE =
  "A VP doing diligence on a vendor whose bots work with their team's data should walk away comfortable. Here's how we approach it.";

export const SECURITY_TITLE = "Built for the rep,";
export const SECURITY_TITLE_ACCENT = "ready for the VP doing diligence.";

export type Commitment = { title: string; body: string };

/**
 * TODO(security): none of these claims can be verified from this repo (it's
 * the marketing site only). Confirm each with engineering before launch, and
 * don't name specific protocols or ciphers until they're confirmed.
 */
export const SECURITY_COMMITMENTS: Commitment[] = [
  { title: "Approval by action", body: "Nothing customer-facing (emails, posts, sequencer pushes, published content) goes out without a person approving it. Internal output (a brief in chat, a Slack summary) can run without approval if your team chooses." },
  { title: "Bots only use the permissions you connect", body: "You choose which tools each bot can reach. Bots are built to be read-only by default and write back only where a flow your team sets up allows it. Nothing beyond what you connect." },
  { title: "Every run leaves a receipt", body: "What the bot read, what it did, who approved it, and what it didn't send." },
  {
    title: "Built to protect your data",
    body: `${SECURITY_LINE} We don't use it to train AI models, and you can ask us to delete your data at any time.`,
  },
];
