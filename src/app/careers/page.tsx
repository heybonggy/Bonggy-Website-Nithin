import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { graphFor } from "@/lib/jsonld";
import { SubPageSection, SubPageShell } from "@/components/marketing/sub-page-shell";
import { CareersForm } from "@/components/marketing/careers-form";
import { CAREERS_LEDE, CAREERS_PRINCIPLES, CAREERS_TITLE, CAREERS_TITLE_ACCENT } from "@/content/pages/careers";

export const metadata: Metadata = pageMetadata({ slug: "careers" });


export default function CareersPage() {
  return (
    <>
      <JsonLd graph={graphFor("careers")} />

    <SubPageShell
      eyebrow="Careers"
      title={CAREERS_TITLE}
      titleAccent={CAREERS_TITLE_ACCENT}
      lede={CAREERS_LEDE}
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
            {CAREERS_PRINCIPLES.map((p) => (
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
