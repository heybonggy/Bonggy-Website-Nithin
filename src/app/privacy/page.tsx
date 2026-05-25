import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Bonggy privacy policy. We collect only what we need, we don't sell your data, and we don't train AI models on your proprietary account information.",
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    h: "What we collect",
    body: "We collect only what we need to make Bonggy work for your team: account information (your email, company name), product usage data to improve the service, and the signals you choose to track through your integrations. We do not sell your data. We do not train AI models on your proprietary account information.",
  },
  {
    h: "How we use it",
    body: "Your data powers your outbound intelligence. Signal clustering, narrative generation, and win-pattern matching all happen on your data, for your benefit. We use anonymized, aggregate metrics to improve the product — never your specific account narratives or contact lists.",
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
    body: "Bonggy connects to your CRM, sequencer, and outreach tools to read signals and push approved account data. We request only the permissions necessary, and we never write to your CRM without explicit approval.",
  },
  {
    h: "Your choices",
    body: "You can access, export, or request deletion of your data at any time. To opt out of product or marketing emails, use the unsubscribe link in any message or email us.",
  },
  {
    h: "Contact",
    body: "Questions? Reach us at founders@bonggy.com. We read every email.",
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
      <div className="max-w-[68ch] space-y-12">
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2 className="text-[20px] font-medium tracking-tight text-foreground">
              {s.h}
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </section>
        ))}
      </div>
    </SubPageShell>
  );
}
