/**
 * /faq's questions: the ten the homepage answers, word for word, then the
 * longer ones. One array, so the page, the FAQPage graph and the markdown twin
 * can't disagree about what we said.
 */
import { HOME_FAQ } from "@/components/marketing/home-faq";
import type { FaqItem } from "@/components/marketing/faq-list";

export const FAQ_QUESTIONS: FaqItem[] = [
  ...HOME_FAQ,
  {
    q: "Can bots work together across teams?",
    a: "Yes. Put bots from different teams in one group and they hand off work. Marketing's research on what customers say reaches the sales bots working those deals, without anyone copying it across.",
  },
  {
    q: "How does memory work?",
    a: "Bots read your company context first, then the sources you connect, like CRM notes, call notes and docs. Every fact a bot uses links back to where it came from, so you can check it.",
  },
  {
    q: "Is this a leaderboard?",
    a: "No. Work is measured against revenue, never person against person. The picture a manager sees is the one every rep sees too.",
  },
  {
    q: "How is this different from general AI agent tools?",
    a: "General agent tools make you bring the context, invent the process and remember the guardrails. Bonggy starts from your company context, runs each bot on a flow your team designs, and makes approval part of every flow.",
  },
];
