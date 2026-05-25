import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";

export const metadata: Metadata = {
  title: "About",
  description:
    "We built Bonggy because great reps shouldn't burn out on bad data. The thinking part of outbound is the part that matters. We're putting the AI there.",
};

export default function AboutPage() {
  return (
    <SubPageShell
      eyebrow="About"
      title="The thinking part of outbound"
      titleAccent="is the part that matters."
      lede="We built Bonggy because great reps shouldn't burn out on bad data. The volume motion is a dead end. The judgement motion is the one that scales. We're putting the AI on the judgement, and leaving the sending to a human who has to live with the reply."
      narrow
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
            The bet
          </div>
          <h3 className="mt-3 text-display text-[26px] font-normal leading-tight tracking-tight text-foreground sm:text-[32px]">
            Volume was never the bottleneck. Judgement was.
          </h3>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-muted-foreground">
            <p>
              Every category of outbound tool over the last decade has bet on
              speed. More tools, more sends, more sequencers, more enrichment,
              more AI SDRs typing faster. The result: inboxes that tuned out,
              domains that burned, and reps spending their day in tabs.
            </p>
            <p>
              The teams winning today are doing the opposite. Fewer sends,
              sharper angles, signal-led. The work has shifted from typing to
              thinking , which account, why now, what to say.
            </p>
            <p>
              The thinking part is what we&apos;re automating. Not the
              relationship. Not the send. The research, the prioritization,
              the angle.
            </p>
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
            What we&apos;re building
          </div>
          <h3 className="mt-3 text-display text-[26px] font-normal leading-tight tracking-tight text-foreground sm:text-[32px]">
            A command centre for outbound , installable as agents.
          </h3>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-muted-foreground">
            <p>
              Bonggy is the layer between your database and your sequencer.
              You describe the motion in plain English. We compile it into a
              running agent that watches the right signals, scores the right
              accounts, drafts the right outreach, and queues it for human
              approval.
            </p>
            <p>
              The thinking is automated. The sending is a decision. The
              relationship stays yours.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 border-t border-border/60 pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
          {[
            {
              label: "01",
              title: "Anti-spray",
              body: "Every send earns the right to the next. We optimize for fewer, sharper messages , not throughput.",
            },
            {
              label: "02",
              title: "Anti-autopilot",
              body: "AI on the judgement, humans on the send. The reply lands on someone who has to live with it.",
            },
            {
              label: "03",
              title: "Anti-database-of-everything",
              body: "We don't sell you a bigger list. We help you work the list you already have, better.",
            },
          ].map((v) => (
            <div key={v.label}>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                {v.label} · Principle
              </div>
              <h4 className="mt-2 text-[18px] font-medium tracking-tight text-foreground">
                {v.title}
              </h4>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 border-t border-border/60 pt-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <h3 className="text-display text-balance text-[28px] font-normal leading-tight tracking-tight sm:text-[36px]">
            Help us shape it.
          </h3>
          <div className="flex items-start lg:justify-end">
            <CtaButton variant="signal">Book a strategy session</CtaButton>
          </div>
        </div>
      </div>
    </SubPageShell>
  );
}
