import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { graphFor } from "@/lib/jsonld";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { EmailLink } from "@/components/marketing/email-link";

// TODO(legal review): draft wording, not yet reviewed by counsel. Claims on
// AI training, approvals, read-only access and deletion must match /privacy,
// /terms, /security and the FAQ word for word. See docs/legal-drafts.md.
export const metadata: Metadata = pageMetadata({ slug: "terms" });

const SECTIONS: { h: string; body: React.ReactNode }[] = [
  {
    h: "What you get",
    body: "Bonggy is an agent workspace for sales, RevOps and marketing teams. Your team builds bots and designs the flows they run, and every flow ties to a revenue goal. Nothing customer-facing goes out without a person approving it. Bots are built to be read-only by default and write back only where a flow your team sets up allows it. We don't guarantee pipeline, and bots don't replace anyone.",
  },
  {
    h: "Acceptable use",
    body: "Use Bonggy to build and run bots for your own team's work. Connect only the tools and accounts you're authorized to. Don't use it to ingest data you don't have rights to, to send bulk or unsolicited messages, to get around the approval step, or to monitor individuals outside a legitimate business context.",
  },
  {
    h: "Billing",
    body: "Billing terms are set out in your order form or agreement with us.",
  },
  {
    h: "Data ownership",
    body: "Your account data, contacts, activity and the work your bots produce are yours. You design the flows and approve what goes out; we run the workspace. No training on your data: we don't use it to train AI models. You can export your data while your account is active, and you can ask us to delete your data at any time.",
  },
  {
    h: "Limitation of liability",
    body: "Bonggy runs the flows your team designs, and people on your team approve what customers see. We're not responsible for what your team approves or sends, how prospects respond, or whether a deal closes. The service is provided “as is,” to the fullest extent permitted by law.",
  },
  {
    h: "Contact",
    body: (
      <>
        Questions about these terms? <EmailLink />. We read every email.
      </>
    ),
  },
];

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
        {SECTIONS.map((s, i) => (
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
              {s.body}
            </p>
          </section>
        ))}
      </div>
    </SubPageShell>
    </>
  );
}
