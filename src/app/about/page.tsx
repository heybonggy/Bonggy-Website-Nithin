import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";

export const metadata: Metadata = {
  title: "About",
  description:
    "We built Bonggy because GTM teams generate enormous effort every day and almost none of it is connected to the revenue it's supposed to serve. Bonggy is the layer that reads that effort across every tool, aligns it to revenue, and shows everyone the same picture.",
};

const PRINCIPLES = [
  {
    label: "01",
    title: "Alignment, not volume",
    body: "We don't help your team do more. We make sure the effort they already make points at revenue.",
  },
  {
    label: "02",
    title: "Read, don't act",
    body: "Bonggy reads what your team does and aligns it. It never sends or acts in their place. The work stays human.",
  },
  {
    label: "03",
    title: "Shared, not weaponized",
    body: "We measure effort against revenue, never reps against each other. The same picture, rep to CRO. No leaderboard.",
  },
];

export default function AboutPage() {
  return (
    <SubPageShell
      eyebrow="About"
      title="The effort was always there."
      titleAccent="Nothing connected it to revenue."
      lede="We built Bonggy because GTM teams generate enormous effort every day — calls, emails, notes, deals moved — and almost none of it is connected to the number it's supposed to serve. Bonggy is the layer that reads that effort across every tool, aligns it to revenue, and shows everyone the same picture."
      narrow
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
            The bet
          </div>
          <h3 className="mt-3 text-display text-[26px] font-normal leading-tight tracking-tight text-foreground sm:text-[32px]">
            Volume was never the bottleneck. Alignment was.
          </h3>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-muted-foreground">
            <p>
              Every GTM tool over the last decade bet on doing more — more
              sends, more sequencers, more enrichment, more AI SDRs typing
              faster. The result: more activity, and no clearer line to revenue.
            </p>
            <p>
              The teams winning today aren&apos;t doing more. They make sure the
              effort they already have points at the goal. The bottleneck was
              never volume. It was knowing whether the work was aimed at the
              right thing.
            </p>
            <p>
              That&apos;s the bet. The effort is already there. Connect it to
              revenue and you don&apos;t need more of it — you need it aligned.
            </p>
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
            What we&apos;re building
          </div>
          <h3 className="mt-3 text-display text-[26px] font-normal leading-tight tracking-tight text-foreground sm:text-[32px]">
            One layer above your stack.
          </h3>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-muted-foreground">
            <p>
              Bonggy sits above every tool your team uses. It reads what every
              rep does — across CRM, sequencer, email, calendar, Slack, calls —
              ties each action to the revenue goal it serves, nudges the work
              that&apos;s drifting, and reports one connected picture from rep to
              CRO.
            </p>
            <p>
              It doesn&apos;t send. It doesn&apos;t act for your reps. It reads,
              aligns, and proves. The work stays human; the guesswork goes.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 border-t border-border/60 pt-16">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {PRINCIPLES.map((v) => (
            <div
              key={v.label}
              className="terminal-corners relative rounded-[5px] border border-border/70 bg-card/40 p-5 lg:p-6"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                <span className="tabular-nums text-signal/80">{v.label}</span>
                {" · Principle"}
              </div>
              <h4 className="mt-3 text-[17px] font-medium tracking-tight text-foreground">
                {v.title}
              </h4>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
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
            <CtaButton variant="signal">Strategize</CtaButton>
          </div>
        </div>
      </div>
    </SubPageShell>
  );
}
