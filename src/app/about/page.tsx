import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About",
  description:
    "We're building Bonggy, a studio where GTM teams build their own sales agents. Agents model the market, research accounts and draft the work, people approve what goes out, and every piece of work ties back to a revenue goal.",
});

const PRINCIPLES = [
  {
    label: "01",
    title: "Alignment, not volume",
    body: "We don't help your team send more. Every agent's work ties back to a revenue goal.",
  },
  {
    label: "02",
    title: "Humans approve",
    body: "Agents research and draft. A person on your team approves anything that goes out. The relationship stays human.",
  },
  {
    label: "03",
    title: "Shared, not weaponized",
    body: "We measure work against revenue, never reps against each other. The same picture, rep to CRO. No leaderboard.",
  },
];

export default function AboutPage() {
  return (
    <SubPageShell
      eyebrow="About"
      title="Reps should spend their time"
      titleAccent="in the conversation."
      lede="GTM teams do enormous work before every conversation: mapping the market, researching the account, writing the brief. Most of it is manual, and almost none of it connects to the number. We built Bonggy so teams can build agents for that work, keep people on every decision, and tie it all back to revenue."
      narrow
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/90">
            The bet
          </div>
          <h2 className="mt-3 text-display text-[26px] font-normal leading-tight tracking-tight text-foreground sm:text-[32px]">
            Volume was never the bottleneck. Alignment was.
          </h2>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-muted-foreground">
            <p>
              Every GTM tool over the last decade bet on doing more — more
              sends, more sequencers, more enrichment, more AI SDRs typing
              faster. The result: more activity, and no clearer line to revenue.
            </p>
            <p>
              The teams winning today don&apos;t send more. They do better work
              before the conversation and point it at the goal. That work —
              modelling the market, researching the account, writing the
              brief — is exactly what agents are good at, as long as a person
              stays in charge of what goes out.
            </p>
            <p>
              That&apos;s the bet. Give teams agents for the prep, tie every
              piece of it to revenue, and keep the conversation human.
            </p>
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/90">
            What we&apos;re building
          </div>
          <h2 className="mt-3 text-display text-[26px] font-normal leading-tight tracking-tight text-foreground sm:text-[32px]">
            A studio for your own agents.
          </h2>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-muted-foreground">
            <p>
              Bonggy is where GTM teams build agents and groups of agents.
              Agents model the market, research accounts and draft briefs,
              account plans and messages. They share memory, so what one agent
              learns the rest of the pod can use.
            </p>
            <p>
              Every agent runs on the same loop: track, align, nudge, report.
              Nothing goes out without a person approving it. The prep gets
              done; the conversation stays human.
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
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/90">
                <span className="tabular-nums text-signal/80">{v.label}</span>
                {" · Principle"}
              </div>
              <h3 className="mt-3 text-[17px] font-medium tracking-tight text-foreground">
                {v.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 border-t border-border/60 pt-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <h2 className="text-display text-balance text-[28px] font-normal leading-tight tracking-tight sm:text-[36px]">
            Help us shape it.
          </h2>
          <div className="flex items-start lg:justify-end">
            <CtaButton size="lg">Book a 30-min call</CtaButton>
          </div>
        </div>
      </div>
    </SubPageShell>
  );
}
