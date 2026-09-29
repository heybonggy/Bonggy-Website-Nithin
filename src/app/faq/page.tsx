import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SubPageCta, SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";
import { EmailLink } from "@/components/marketing/email-link";
import { FaqJsonLd, FaqList, type FaqItem } from "@/components/marketing/faq-list";
import { HOME_FAQ } from "@/components/marketing/home-faq";

export const metadata: Metadata = pageMetadata({ slug: "faq" });

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
        lede={
          <>
            Straight answers on what Bonggy&apos;s bots do, what they don&apos;t, and how to get started. If your
            question isn&apos;t here, email <EmailLink /> and we&apos;ll add it.
          </>
        }
        narrow
      >
        <FaqList items={QUESTIONS} headingLevel={2} />

        <SubPageCta title="Got a different question?">
          <CtaButton size="lg">Book a strategy call</CtaButton>
        </SubPageCta>
      </SubPageShell>
    </>
  );
}
