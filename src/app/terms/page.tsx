import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { graphFor } from "@/lib/jsonld";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { LinkifyEmail } from "@/components/marketing/linkify-email";
import { TERMS_SECTIONS } from "@/content/pages/legal";

// TODO(legal review): draft wording, not yet reviewed by counsel. Claims on
// AI training, approvals, read-only access and deletion must match /privacy,
// /terms, /security and the FAQ word for word. See docs/legal-drafts.md.
export const metadata: Metadata = pageMetadata({ slug: "terms" });


export default function TermsPage() {
  return (
    <>
      <JsonLd graph={graphFor("terms")} />

    <SubPageShell
      eyebrow="Terms of Service"
      title="Plain English."
      titleAccent="No legalese tricks."
      lede="Last updated: 28 September 2026. Teams build bots in Bonggy, every flow ties to a revenue goal, and nothing customer-facing goes out without a person approving it. Here's what you get, what you can do, and what's on you."
      narrow
    >
      <div className="max-w-copy divide-y divide-border">
        {TERMS_SECTIONS.map((s, i) => (
          <section key={s.h} className="py-8 first:pt-0">
            <div className="flex items-baseline gap-3">
              <span className="tabular text-ui-sm text-fg-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-title font-medium text-foreground">
                {s.h}
              </h2>
            </div>
            <p className="mt-3 text-body text-fg-2 sm:pl-[26px]">
              <LinkifyEmail text={s.body} />
            </p>
          </section>
        ))}
      </div>
    </SubPageShell>
    </>
  );
}
