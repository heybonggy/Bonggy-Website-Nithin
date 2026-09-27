import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SubPageShell } from "@/components/marketing/sub-page-shell";

export const metadata: Metadata = pageMetadata({
  path: "/terms",
  title: "Terms of Service",
  description:
    "Bonggy terms of service. What you get, how you can use it, who owns the data, and what we're not liable for.",
  robots: { index: true, follow: true },
});

const SECTIONS = [
  {
    h: "What you get",
    body: "Bonggy is an agent workspace for sales, RevOps and marketing teams. Your team builds bots and designs the flows they run; every flow ties to a revenue goal, and a person on your team approves anything a customer would see. What we don't do: send customer-facing messages without that approval, guarantee pipeline, or replace anyone."
  },
  {
    h: "Acceptable use",
    body: "Use Bonggy to build and run bots for your own team's work. Connect only the tools and accounts you're authorized to. Don't use it to ingest data you don't have rights to, to send bulk or unsolicited messages, to get around the approval step, or to monitor individuals outside a legitimate business context.",
  },
  {
    h: "Billing",
    body: "Flexible billing: monthly, quarterly, or annual. Cancel anytime. No implementation fees, no surprise charges. If your team needs a different structure, talk to us.",
  },
  {
    h: "Data ownership",
    body: "Your account data, contacts, activity and the work your bots produce are yours. You design the flows and approve what goes out; we run the workspace. Export anytime, leave anytime, no lock-in.",
  },
  {
    h: "Limitation of liability",
    body: "Bonggy runs the flows your team designs, and people on your team approve what customers see. We're not responsible for what your team approves or sends, how prospects respond, or whether a deal closes. The service is provided “as is,” to the fullest extent permitted by law.",
  },
  {
    h: "Contact",
    body: "Questions about these terms? founders@bonggy.com. We read every email.",
  },
];

export default function TermsPage() {
  return (
    <SubPageShell
      eyebrow="Terms of Service"
      title="Plain English."
      titleAccent="No legalese tricks."
      lede="Last updated: May 2026. Teams build bots in Bonggy, every flow ties to a revenue goal, and people approve what customers see. Here's what you get, what you can do, and what's on you."
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
  );
}
