import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { graphFor } from "@/lib/jsonld";
import { SubPageSection, SubPageShell } from "@/components/marketing/sub-page-shell";
import { CareersForm } from "@/components/marketing/careers-form";

export const metadata: Metadata = pageMetadata({ slug: "careers" });

const PRINCIPLES = [
  {
    title: "Better prep, not more sends.",
    body: "If a bot we ship doesn't give a team better prep in less time, it doesn't ship.",
  },
  {
    title: "Anti-bloat, anti-vanity-metric.",
    body: "We don't chase feature parity or activity counts. Every flow has to point at revenue.",
  },
  {
    title: "Bots draft. People decide.",
    body: "Nothing customer-facing goes out without a person approving it. The product reflects that.",
  },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd graph={graphFor("careers")} />

    <SubPageShell
      eyebrow="Careers"
      title="Fix GTM."
      titleAccent="Build the agent workspace."
      lede="We're small on purpose. We hire when a problem genuinely needs a person, not when a hiring plan needs a name. Send a note even if there's no listed role; if you have a strong take on what GTM bots should and shouldn't do, we want to talk."
      narrow
    >
      <div className="flex flex-col gap-16">
        <SubPageSection kicker="How we work" title="Small team. Strong taste. No layers.">
          <p>
            Everyone here ships. The person closing a design partner is the same person showing up to a customer call
            the next week. The person shipping the flow runtime is the same person writing the postmortem.
          </p>
          <p>We move quickly because we&apos;ve cut everything that doesn&apos;t compound. Async-first. Written-first. Demo-first.</p>
        </SubPageSection>

        <section>
          <p className="text-ui-sm font-medium text-fg-3">What we care about</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="rounded-2xl bg-surface p-5">
                <h2 className="text-ui font-semibold text-foreground">{p.title}</h2>
                <p className="mt-2 text-ui-sm text-fg-2">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-20 border-t border-border pt-12">
        <CareersForm />
      </div>
    </SubPageShell>
    </>
  );
}
