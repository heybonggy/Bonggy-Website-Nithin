/** /about's copy, so the page and its markdown twin render from one source. */

export const ABOUT_LEDE =
  "Sales, RevOps and marketing teams do enormous work before every conversation: mapping the market, researching the account, cleaning the pipeline, writing the brief. Most of it is manual, and almost none of it connects to the number. We built Bonggy so teams can build bots for that work, keep people on every decision, and tie it all back to revenue.";

export const ABOUT_TITLE = "Reps should spend their time";
export const ABOUT_TITLE_ACCENT = "in the conversation.";

export type Principle = { title: string; body: string };

export const ABOUT_PRINCIPLES: Principle[] = [
  {
    title: "Alignment, not volume",
    body: "We don't help your team send more. Every bot's work ties back to a revenue goal.",
  },
  {
    title: "Humans approve",
    body: "Bots research and draft. A person on your team approves anything a customer would see. The relationship stays human.",
  },
  {
    title: "Shared, not weaponized",
    body: "We measure work against revenue, never person against person. The same picture, rep to CRO. No leaderboard.",
  },
];
