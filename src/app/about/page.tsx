import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { graphFor } from "@/lib/jsonld";
import { SubPageCta, SubPageSection, SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";
import { ABOUT_LEDE, ABOUT_PRINCIPLES, ABOUT_TITLE, ABOUT_TITLE_ACCENT } from "@/content/pages/about";

export const metadata: Metadata = pageMetadata({ slug: "about" });


export default function AboutPage() {
  return (
    <>
      <JsonLd graph={graphFor("about")} />

    <SubPageShell
      eyebrow="About"
      title={ABOUT_TITLE}
      titleAccent={ABOUT_TITLE_ACCENT}
      lede={ABOUT_LEDE}
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
          {ABOUT_PRINCIPLES.map((p) => (
            <li key={p.title} className="rounded-2xl bg-surface p-5">
              <h3 className="text-ui font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-ui-sm text-fg-2">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <SubPageCta title="Help us shape it.">
        <CtaButton size="lg">Book a strategy call</CtaButton>
      </SubPageCta>
    </SubPageShell>
    </>
  );
}
