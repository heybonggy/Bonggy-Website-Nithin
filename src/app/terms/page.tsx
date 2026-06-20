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
    body: "Bonggy is an orchestration layer for GTM. It reads the effort your team already makes across your tools, ties each action to the revenue goal it serves, flags what's drifting, and reports one shared picture from rep to CRO. What we don't do: send, sequence, or act on your reps' behalf, guarantee pipeline, or replace anyone. We make the work legible.",
  },
  {
    h: "Acceptable use",
    body: "Use Bonggy to read and align your own team's effort. Connect only the tools and accounts you're authorized to. Don't use it to ingest data you don't have rights to, or to monitor individuals outside a legitimate GTM context. Bonggy is read-only — it doesn't send, so the rules are about what you connect, not what goes out.",
  },
  {
    h: "Billing",
    body: "Flexible billing , monthly, quarterly, or annual. Cancel anytime. No implementation fees, no surprise charges. If your team needs a different structure, talk to us.",
  },
  {
    h: "Data ownership",
    body: "Your account data, contacts, and activity are yours. We provide the alignment layer; you provide the work and the strategy. Export anytime, leave anytime, no lock-in.",
  },
  {
    h: "Limitation of liability",
    body: "Bonggy reads and aligns your team's effort; it doesn't send, act, or close deals. We're not responsible for what your reps actually do, how prospects respond, or whether a deal closes. The work stays human. The service is provided “as is,” to the fullest extent permitted by law.",
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
      lede="Last updated: May 2026. Bonggy reads your team's effort and points it at revenue. The work stays human. Here's what you get, what you can do, and what's on you."
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
