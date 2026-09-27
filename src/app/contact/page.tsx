import type { Metadata } from "next";
import { ArrowUpRight, Clock, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { pageMetadata } from "@/lib/metadata";
import { SubPageCta, SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton, CAL_LINK } from "@/components/marketing/cta-button";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Get in touch with the Bonggy team. A 30-minute call is the fastest way to map your first flow, and we read every email.",
});

const card =
  "group/card flex flex-col gap-5 rounded-3xl bg-surface p-6 transition-colors duration-[var(--dur-fast)] hover:bg-surface-2 sm:p-7";

export default function ContactPage() {
  return (
    <SubPageShell
      eyebrow="Contact"
      title="We read every email."
      titleAccent="A call is faster."
      lede="The fastest path is a 30-minute call. We'll map your first flow with you on real work and show how it ties to your revenue goal. Or send us an email; we read every one."
      narrow
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className={card}>
          <span className="flex items-center justify-between text-fg-2">
            <Clock className="size-6" aria-hidden />
            <ArrowUpRight className="size-4 transition-transform group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5" aria-hidden />
          </span>
          <span>
            <span className="text-ui-sm font-medium text-fg-3">Call</span>
            <h2 className="mt-1 text-title font-medium text-foreground">Book a 30-minute call</h2>
            <p className="mt-2 text-ui text-fg-2">
              We&apos;ll map your first flow on a real account from your list. If it&apos;s not obviously useful in the
              first ten minutes, we&apos;ll tell you.
            </p>
            <span className="sr-only"> (opens in a new tab)</span>
          </span>
        </a>

        <a href="mailto:founders@bonggy.com" className={card}>
          <span className="flex items-center justify-between text-fg-2">
            <EnvelopeSimple className="size-6" aria-hidden />
            <ArrowUpRight className="size-4 transition-transform group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5" aria-hidden />
          </span>
          <span>
            <span className="text-ui-sm font-medium text-fg-3">Email</span>
            <h2 className="mt-1 text-title font-medium text-foreground">founders@bonggy.com</h2>
            <p className="mt-2 text-ui text-fg-2">
              Long-form questions, partnerships, press, pilots, anything else. We read every one and reply within 48
              hours.
            </p>
          </span>
        </a>
      </div>

      <SubPageCta title="Ready to see it live?">
        <CtaButton size="lg">Book a 30-min call</CtaButton>
      </SubPageCta>
    </SubPageShell>
  );
}
