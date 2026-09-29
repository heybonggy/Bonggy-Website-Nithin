import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { graphFor } from "@/lib/jsonld";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { LinkifyEmail } from "@/components/marketing/linkify-email";
import { PRIVACY_SECTIONS } from "@/content/pages/legal";

// TODO(legal review): draft wording, not yet reviewed by counsel. Claims on
// AI training, approvals, read-only access and deletion must match /privacy,
// /terms, /security and the FAQ word for word. See docs/legal-drafts.md.
export const metadata: Metadata = pageMetadata({ slug: "privacy" });


export default function PrivacyPage() {
  return (
    <>
      <JsonLd graph={graphFor("privacy")} />

    <SubPageShell
      eyebrow="Privacy Policy"
      title="What we collect,"
      titleAccent="and what we don't."
      lede="Last updated: 28 September 2026. Plain language. No tracking surprises. We collect only what we need to make Bonggy work for your team."
      narrow
    >
      <div className="max-w-copy divide-y divide-border">
        {PRIVACY_SECTIONS.map((s, i) => (
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
