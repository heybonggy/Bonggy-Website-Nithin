import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";
import { FaqJsonLd, FaqList, type FaqItem } from "@/components/marketing/faq-list";
import { HOME_FAQ } from "@/components/marketing/home-faq";

export const metadata: Metadata = pageMetadata({
  path: "/faq",
  title: "FAQ",
  description:
    "Common questions about Bonggy, the agent workspace for sales, RevOps and marketing teams: bots, flows, hard limits, approvals, groups, data handling and pricing.",
});

// The ten homepage answers are reused word for word so the two stay
// consistent, with the longer questions after them.
const QUESTIONS: FaqItem[] = [
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

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={QUESTIONS} />
      <SubPageShell
        eyebrow="FAQ"
        title="The questions"
        titleAccent="every VP asks before booking."
        lede="Straight answers on what Bonggy's bots do, what they don't, and how to get started. If your question isn't here, email founders@bonggy.com and we'll add it."
        narrow
      >
        <FaqList items={QUESTIONS} headingLevel={2} />

        <div className="mt-20 border-t border-border/60 pt-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <h2 className="text-display text-balance text-[28px] font-normal leading-tight tracking-tight sm:text-[36px]">
              Got a different question?
            </h2>
            <div className="flex items-start lg:justify-end">
              <CtaButton size="lg">Book a 30-min call</CtaButton>
            </div>
          </div>
        </div>
      </SubPageShell>
    </>
  );
}
