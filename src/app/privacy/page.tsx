import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { EmailLink } from "@/components/marketing/email-link";

// TODO(legal review): draft wording, not yet reviewed by counsel. Claims on
// AI training, approvals, read-only access and deletion must match /privacy,
// /terms, /security and the FAQ word for word. See docs/legal-drafts.md.
export const metadata: Metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy Policy",
  description:
    "Bonggy privacy policy. We collect only what we need, we don't sell your data, and there's no training on your data. Bots are built to be read-only by default, and you can ask us to delete your data at any time.",
  robots: { index: true, follow: true },
});

const SECTIONS: { h: string; body: React.ReactNode }[] = [
  {
    h: "What we collect",
    body: "We collect only what we need to make Bonggy work for your team: account information (your email, company name), product usage data to improve the service, and the data your bots read through the tools you connect. We do not sell your data, and there's no training on your data: we don't use it to train AI models.",
  },
  {
    h: "How we use it",
    body: "Your data powers your own bots. Running your flows, mapping work to your revenue goals, and showing your team what each bot did all happen on your data, for your team. We use anonymized, aggregate metrics to improve the product, never your specific account data or contact lists.",
  },
  {
    h: "Cookies and website analytics",
    body: "We use essential cookies to run the site and privacy-respecting analytics to understand how the site is used in aggregate. We do not use third-party services to de-anonymize visitors or associate your browsing with your personal email for marketing. You can control cookies through your browser settings.",
  },
  {
    h: "Data retention",
    body: "We keep your data while you're a customer, and you can ask us to delete your data at any time. You can export it while your account is active. Anything else about retention is set out in your agreement with us. You own your data; we're the layer that makes it useful.",
  },
  {
    h: "Third-party integrations",
    body: "Bonggy connects to the tools your team already uses (CRM, email, calendar, Slack, call notes) through the permissions you grant. Bots are built to be read-only by default and write back only where a flow your team sets up allows it, such as adding a CRM task. Nothing customer-facing goes out without a person approving it.",
  },
  {
    h: "Your choices",
    body: "You can access your data, export it while your account is active, and ask us to delete your data at any time. To opt out of product or marketing emails, use the unsubscribe link in any message or email us.",
  },
  {
    h: "Contact",
    body: (
      <>
        Questions? Reach us at <EmailLink />. We read every email.
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <SubPageShell
      eyebrow="Privacy Policy"
      title="What we collect,"
      titleAccent="and what we don't."
      lede="Last updated: 28 September 2026. Plain language. No tracking surprises. We collect only what we need to make Bonggy work for your team."
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
