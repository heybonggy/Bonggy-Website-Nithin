import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about Bonggy , how it differs from AI SDRs, Apollo, and Clay; what it integrates with; how it protects your domain; who it's for.",
};

const QUESTIONS = [
  {
    q: "Is Bonggy an AI SDR?",
    a: "No. AI SDRs automate the typing and skip the thinking , they send more and mean less. Bonggy puts the AI on the judgment: which account, why now, what to say. Your reps still send, still own the relationship. We arm them; we don't replace them.",
  },
  {
    q: "How is this different from Apollo or Clay?",
    a: "Apollo is a database , it tells you who exists. Clay is a workbench , it lets you build the pipeline, if you know how. Bonggy is the layer in between: it decides which accounts to work, what to say, and why it matters right now, then runs it as an agent. Keep your database and your sequencer. We're the thinking between them.",
  },
  {
    q: "Do I need to be technical to use it?",
    a: "No. You describe the motion you want in plain English and Bonggy builds the agent. No pipeline to wire, no formulas, no specialist to hire.",
  },
  {
    q: "Where does the data come from?",
    a: "Bonggy watches public buying signals across your target accounts , job changes, funding, tech-stack moves, hiring, news , and structures them into a scored, account-level view. It connects to the tools you already use to act on them.",
  },
  {
    q: "Does anything send automatically?",
    a: "Not without you. Every draft is queued for human approval before it leaves your domain. The thinking is automated; the sending stays a decision.",
  },
  {
    q: "What does it integrate with?",
    a: "The tools you already run , Instantly, Mailchimp, your CRM, LinkedIn, email, and common sequencers. It pushes approved outreach into your existing workflow rather than replacing it.",
  },
  {
    q: "Will it hurt my domain reputation?",
    a: "The opposite is the point. Bonggy is built to send fewer, sharper, signal-backed messages , the spray-and-pray motion that burns domains is exactly what it replaces.",
  },
  {
    q: "Who is it for?",
    a: "SDR and AE teams first, then the wider GTM motion , managers, RevOps, AMs, marketing, agencies, founders doing their own sales. If pipeline touches your day, it's for you.",
  },
  {
    q: "How do we start?",
    a: "A 30-minute strategy session. We calibrate Bonggy on your real accounts, live, and show you what's firing this week. If it's not obviously useful in the first ten minutes, we'll tell you.",
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
        <div className="divide-y divide-border/60">
          {QUESTIONS.map((item, i) => (
            <details
              key={item.q}
              open={i < 2}
              className="group/q py-7 lg:py-9"
            >
              <summary className="flex cursor-pointer items-baseline justify-between gap-6 list-none [&::-webkit-details-marker]:hidden">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[18px] font-medium tracking-tight text-foreground sm:text-[20px]">
                    {item.q}
                  </h3>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 transition-transform group-open/q:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-[68ch] pl-0 text-[15.5px] leading-relaxed text-muted-foreground lg:pl-[42px]">
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
              <CtaButton variant="signal">Book a strategy session</CtaButton>
            </div>
          </div>
        </div>
      </SubPageShell>
    </>
  );
}
