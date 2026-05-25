import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton, CAL_LINK } from "@/components/marketing/cta-button";
import { EnvelopeSimple, Clock, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Bonggy team. We read every email. A 30-minute call is the fastest way to see Bonggy on your accounts.",
};

export default function ContactPage() {
  return (
    <SubPageShell
      eyebrow="Contact"
      title="We read every email."
      titleAccent="A call is faster."
      lede="The fastest path is a 30-minute strategy session. We calibrate Bonggy on your real accounts, live, and show you what's firing this week. Or send us an email , we read every one."
      narrow
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group/card relative flex flex-col gap-5 rounded-xl border border-border/80 bg-card/60 p-7 transition-colors hover:border-signal/40 hover:bg-card/80"
        >
          <div className="flex items-center justify-between">
            <Clock weight="regular" className="size-6 text-signal" />
            <ArrowUpRight
              weight="bold"
              className="size-4 text-muted-foreground/50 transition-all group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-foreground"
            />
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
              Strategy session
            </div>
            <h3 className="mt-2 text-display text-[24px] font-normal leading-tight tracking-tight text-foreground sm:text-[28px]">
              Book a 30-minute call
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
              We&apos;ll run Bonggy on your real accounts during the call. If
              it&apos;s not obviously useful in the first ten minutes,
              we&apos;ll tell you.
            </p>
          </div>
        </a>

        <a
          href="mailto:founders@bonggy.com"
          className="group/card relative flex flex-col gap-5 rounded-xl border border-border/80 bg-card/60 p-7 transition-colors hover:border-signal/40 hover:bg-card/80"
        >
          <div className="flex items-center justify-between">
            <EnvelopeSimple weight="regular" className="size-6 text-foreground/80" />
            <ArrowUpRight
              weight="bold"
              className="size-4 text-muted-foreground/50 transition-all group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-foreground"
            />
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
              Email
            </div>
            <h3 className="mt-2 text-display text-[24px] font-normal leading-tight tracking-tight text-foreground sm:text-[28px]">
              founders@bonggy.com
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
              Long-form questions, partnerships, press, pilots, anything else.
              We read every one and we reply within 48 hours.
            </p>
          </div>
        </a>
      </div>

      <div className="mt-20 border-t border-border/60 pt-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <h3 className="text-display text-balance text-[28px] font-normal leading-tight tracking-tight sm:text-[36px]">
            Ready to see it live?
          </h3>
          <div className="flex items-start lg:justify-end">
            <CtaButton variant="signal">Book a strategy session</CtaButton>
          </div>
        </div>
      </div>
    </SubPageShell>
  );
}
