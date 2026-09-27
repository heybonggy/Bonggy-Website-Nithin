import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SubPageCta, SubPageSection, SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About",
  description:
    "We're building Bonggy, the agent workspace for sales, RevOps and marketing teams. Teams build bots from a sentence, every flow maps to a revenue goal, and people approve what customers see.",
});

const PRINCIPLES = [
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

export default function AboutPage() {
  return (
    <SubPageShell
      eyebrow="About"
      title="Reps should spend their time"
      titleAccent="in the conversation."
      lede="Sales, RevOps and marketing teams do enormous work before every conversation: mapping the market, researching the account, cleaning the pipeline, writing the brief. Most of it is manual, and almost none of it connects to the number. We built Bonggy so teams can build bots for that work, keep people on every decision, and tie it all back to revenue."
      narrow
    >
      <div className="flex flex-col gap-16">
        <SubPageSection kicker="The bet" title="Volume was never the bottleneck. Alignment was.">
          <p>
            Every GTM tool over the last decade bet on doing more: more sends, more sequencers, more enrichment, more
            tools sending faster. The result was more activity, and no clearer line to revenue.
          </p>
          <p>
            The teams winning today don&apos;t send more. They do better work before the conversation and point it at
            the goal. That work (modelling the market, researching the account, writing the brief) is exactly what bots
            are good at, as long as a person stays in charge of what customers see.
          </p>
          <p>That&apos;s the bet. Give teams bots for the prep, tie every piece of it to revenue, and keep the conversation human.</p>
        </SubPageSection>

        <SubPageSection kicker="What we're building" title="An agent workspace for GTM teams.">
          <p>
            Bonggy is where sales, RevOps and marketing teams build bots. You describe the work in a sentence, and a
            bot turns it into a flow: a trigger, context, steps, an approval, an output and a revenue goal. Every part
            stays editable, and bots from different teams can hand off work in groups.
          </p>
          <p>
            Every flow runs on the same loop: track, align, nudge, report. Nothing customer-facing goes out without a
            person approving it. The prep gets done; the conversation stays human.
          </p>
        </SubPageSection>

        <ul className="grid gap-3 sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <li key={p.title} className="rounded-2xl bg-surface p-5">
              <h3 className="text-ui font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-ui-sm text-fg-2">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <SubPageCta title="Help us shape it.">
        <CtaButton size="lg">Book a 30-min call</CtaButton>
      </SubPageCta>
    </SubPageShell>
  );
}
