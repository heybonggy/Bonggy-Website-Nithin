import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Bonggy terms of service. What you get, how you can use it, who owns the data, and what we're not liable for.",
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    h: "What you get",
    body: "Bonggy is an outbound intelligence platform. We watch for buying signals, cluster them into account narratives, and generate account-specific outreach. What we don't do: guarantee pipeline, promise specific reply rates, or replace skilled salespeople. We arm them.",
  },
  {
    h: "Acceptable use",
    body: "Use Bonggy to reach accounts that should want to hear from you. Don't use it to spam, to scrape in violation of any site's terms, or to break anti-spam laws. If your sequences get reported as spam at a rate that damages sender reputation, we may pause your account and work with you to fix it.",
  },
  {
    h: "Billing",
    body: "Flexible billing — monthly, quarterly, or annual. Cancel anytime. No implementation fees, no surprise charges. If your team needs a different structure, talk to us.",
  },
  {
    h: "Data ownership",
    body: "Your account data, contacts, and sequences are yours. We provide the intelligence layer; you provide the strategy. Export anytime, leave anytime, no lock-in.",
  },
  {
    h: "Limitation of liability",
    body: "Bonggy helps you find the right accounts and say the right things. We're not responsible for what your reps actually send, how prospects respond, or whether a deal closes. Sales is still a human skill — we make the research part less painful. The service is provided “as is,” to the fullest extent permitted by law.",
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
      lede="Last updated: May 2026. We make the research part of outbound less painful. Sales is still a human skill. Here's what you get, what you can do, and what's on you."
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
