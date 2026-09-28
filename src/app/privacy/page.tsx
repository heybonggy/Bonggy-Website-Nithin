import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { EmailLink } from "@/components/marketing/email-link";

export const metadata: Metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy Policy",
  description:
    "Bonggy privacy policy. We collect only what we need, we don't sell your data, and no training on your data: we don't use it to train AI models. Bots are read-scoped by default and write only when a flow allows it.",
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
    body: "We keep your data as long as you're a customer. If you cancel, we offer a 30-day grace period to export everything before deletion. You own your data — we're just the layer that makes it useful.",
  },
  {
    h: "Third-party integrations",
    body: "Bonggy connects to the tools your team already uses (CRM, email, calendar, Slack, call notes) through the permissions you grant. Bots are read-scoped by default. They write back only when a flow allows it, such as adding a CRM task, and anything a customer would see waits for a person on your team to approve it first.",
  },
  {
    h: "Your choices",
    body: "You can access, export, or request deletion of your data at any time. To opt out of product or marketing emails, use the unsubscribe link in any message or email us.",
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
      lede="Last updated: May 2026. Plain language. No tracking surprises. We collect only what we need to make Bonggy work for your team."
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
