import { Robot, Gauge } from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { CtaButton } from "./cta-button";

// TODO(pricing): no plans or numbers yet. Replace with real tiers once set
// with early-access teams.
const PARTS = [
  {
    Icon: Robot,
    title: "Active agents",
    body: "The agents your team has running.",
  },
  {
    Icon: Gauge,
    title: "Usage",
    body: "The research and drafting they do.",
  },
];

export function PricingTeaser() {
  return (
    <Section id="pricing" eyebrow="Pricing">
      <div className="terminal-corners relative grid grid-cols-1 gap-10 rounded-lg border border-border/80 bg-card/60 p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:p-12">
        <div>
          <h2 className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]">
            Pay for the agents you run.{" "}
            <span className="text-muted-foreground/85">Plus what they use.</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-muted-foreground">
            Pricing is based on active agents plus usage. We&apos;re setting
            plans with our early-access teams, so there are no public numbers
            yet.
          </p>
          <div className="mt-8">
            <CtaButton
              size="lg"
              variant="signal"
              className="h-auto min-h-11 w-full whitespace-normal py-3 text-center sm:w-auto"
            >
              Talk to us about early access
            </CtaButton>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-3 self-center sm:grid-cols-2 lg:grid-cols-1">
          {PARTS.map(({ Icon, title, body }, i) => (
            <li
              key={title}
              className="flex items-start gap-4 rounded-md border border-border/70 bg-background/50 p-5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-signal/10 text-signal">
                <Icon weight="regular" className="size-4.5" aria-hidden />
              </span>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {i === 0 ? "Based on" : "Plus"}
                </div>
                <h3 className="mt-1 text-[17px] font-normal tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
