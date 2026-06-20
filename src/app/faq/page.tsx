import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about Bonggy — the layer between rep effort and revenue. How it differs from your CRM, sequencer, and AI SDRs; what it reads, what it integrates with, and who it's for.",
};

const QUESTIONS = [
  {
    q: "Is Bonggy an AI SDR?",
    a: "No — and it isn't an AI anything that sends for your reps. AI SDRs automate the typing and skip the thinking: they send more and mean less. Bonggy doesn't send, doesn't act, doesn't replace anyone. It reads the effort your team already makes across every tool, aligns it to revenue, and shows you what's working. The reps stay; the guesswork goes.",
  },
  {
    q: "How is this different from Apollo, Clay, or my CRM?",
    a: "Those tell you who exists, help you build pipeline, or store what already happened. None of them tell you whether the effort actually points at revenue. Bonggy is the layer above your stack: it ties every action your team takes to the goal it serves, flags the work that's drifting, and proves what's moving the number. Keep your tools — Bonggy makes them make sense together.",
  },
  {
    q: "Is this a leaderboard or a surveillance tool?",
    a: "No. We measure effort against revenue, never reps against each other. No leaderboard, no scoreboard, no ranking. The same picture a manager sees, every rep sees too. Bonggy exists so a rep's work finally counts — not so anyone gets a new stick.",
  },
  {
    q: "What does it actually do?",
    a: "Four things. It tracks what every rep does across every tool, maps each action to the revenue goal it serves, nudges the work that's drifting back on-strategy, and reports one connected picture from rep to CRO. Observe, align, surface the drift, prove it.",
  },
  {
    q: "Where does the data come from?",
    a: "From the work your team already does. Bonggy reads effort across the tools you already run — CRM, sequencer, email, calendar, Slack, call recordings, notes — and structures it into one account-level, revenue-aligned view. No new data to buy, no new workflow to adopt.",
  },
  {
    q: "Does it do the work for my reps?",
    a: "No. Bonggy doesn't send, sequence, or act on your reps' behalf. It reads what they do and points it at revenue. The thinking is surfaced; the doing stays with your team.",
  },
  {
    q: "What does it integrate with?",
    a: "The tools you already run — your CRM, sequencer, email, calendar, Slack, call recording, and more. It sits above them and connects the effort, rather than replacing anything in your stack.",
  },
  {
    q: "Does it work for the whole GTM team, or just sales?",
    a: "The whole motion. SDRs, AEs, and CS — anyone whose effort should roll up to revenue. Expansion and retention count the same as new logos. If the work touches the number, Bonggy reads it.",
  },
  {
    q: "How do we start?",
    a: "A 30-minute strategy session. We calibrate Bonggy on your real team and your real goal, live, and show you what's on-revenue and what's drifting this week. If it's not obviously useful in the first ten minutes, we'll tell you.",
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
        lede="Tight, conversion-aware answers. If a question isn't here and you think it should be, email founders@bonggy.com and we'll add it."
        narrow
      >
        {/* Terminal-styled accordion — signal numerals, dotted rules, and a
            bordered +/× toggle that turns signal-green on open. */}
        <div className="border-y border-border/50">
          {QUESTIONS.map((item, i) => (
            <details
              key={item.q}
              open={i < 1}
              className={cn(
                "group/q border-border/40 px-1",
                i > 0 && "border-t",
              )}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 list-none [&::-webkit-details-marker]:hidden lg:py-7">
                <div className="flex items-baseline gap-4 sm:gap-5">
                  <span className="font-mono text-[11px] tabular-nums text-signal/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[17px] font-medium tracking-tight text-foreground transition-colors group-hover/q:text-foreground sm:text-[19px]">
                    {item.q}
                  </h3>
                </div>
                <span
                  aria-hidden
                  className="flex size-7 shrink-0 items-center justify-center rounded-[5px] border border-border/70 font-mono text-[14px] leading-none text-muted-foreground transition-all duration-200 group-open/q:rotate-45 group-open/q:border-signal/50 group-open/q:text-signal"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[70ch] pb-7 text-[15px] leading-relaxed text-muted-foreground sm:pl-[42px]">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-20 border-t border-border/60 pt-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <h3 className="text-display text-balance text-[28px] font-normal leading-tight tracking-tight sm:text-[36px]">
              Got a different question?
            </h3>
            <div className="flex items-start lg:justify-end">
              <CtaButton variant="signal">Strategize</CtaButton>
            </div>
          </div>
        </div>
      </SubPageShell>
    </>
  );
}
