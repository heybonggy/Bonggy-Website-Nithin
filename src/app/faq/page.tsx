import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";
import { FaqList, type FaqItem } from "@/components/marketing/faq-list";
import { HOME_FAQ } from "@/components/marketing/home-faq";

export const metadata: Metadata = pageMetadata({
  path: "/faq",
  title: "FAQ",
  description:
    "Common questions about Bonggy, the studio where GTM teams build their own sales agents: what agents do, how approval works, groups and shared memory, the tools it connects to, and pricing.",
});

// The five homepage answers are reused word for word so the two stay
// consistent.
const [isAiSdr, sendsEmail, buildOwn, tools, pricing] = HOME_FAQ;

const QUESTIONS: FaqItem[] = [
  isAiSdr,
  sendsEmail,
  {
    q: "What does it actually do?",
    a: "Your team builds agents that model your market, research your accounts and draft the work: briefs, account plans and messages. Every agent runs on one loop (track, align, nudge, report), so its work ties back to a revenue goal. Agents build shared memory from what they learn, and a person approves anything that goes out.",
  },
  buildOwn,
  {
    q: "What's a group?",
    a: "A group, or pod, is a set of agents that work together toward the same revenue goal and share memory. For example, a Market Modeller, an Account Researcher and a Brief Writer working the same segment.",
  },
  {
    q: "What is shared memory?",
    a: "Agents keep what they learn from conversations, call notes and deals: accounts, people, objections and wins. Every agent in the pod can use it, so the tenth brief is smarter than the first.",
  },
  {
    q: "Is this a leaderboard or a surveillance tool?",
    a: "No. We measure work against revenue, never reps against each other. No leaderboard, no scoreboard, no ranking. The same picture a manager sees, every rep sees too.",
  },
  {
    q: "How is this different from Apollo, Clay, or my CRM?",
    a: "Those give you data, run sequences or store what already happened. Bonggy is where your team builds agents that do the thinking work on top: modelling the market, researching accounts and drafting the work, each tied to a revenue goal. Keep your tools; agents work alongside them.",
  },
  tools,
  {
    q: "Does it work for the whole GTM team, or just sales?",
    a: "The whole motion. SDRs, AEs, account managers and CS: anyone whose work should roll up to revenue. Renewal and expansion agents count the same as new-logo ones.",
  },
  pricing,
  {
    q: "How do we start?",
    a: "A 30-minute call. We map your market with you, sketch the first agents your team would build, and show how their work ties to your revenue goal. If it's not obviously useful in the first ten minutes, we'll tell you.",
  },
];

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: QUESTIONS.map((q) => ({
              "@type": "Question",
              name: q.q,
              acceptedAnswer: { "@type": "Answer", text: q.a },
            })),
          }),
        }}
      />
      <SubPageShell
        eyebrow="FAQ"
        title="The questions"
        titleAccent="every VP asks before booking."
        lede="Straight answers on what Bonggy's agents do, what they don't, and how to get started. If your question isn't here, email founders@bonggy.com and we'll add it."
        narrow
      >
        <FaqList items={QUESTIONS} headingLevel="h2" />

        <div className="mt-20 border-t border-border/60 pt-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <h2 className="text-display text-balance text-[28px] font-normal leading-tight tracking-tight sm:text-[36px]">
              Got a different question?
            </h2>
            <div className="flex items-start lg:justify-end">
              <CtaButton variant="signal">Book a 30-min call</CtaButton>
            </div>
          </div>
        </div>
      </SubPageShell>
    </>
  );
}
