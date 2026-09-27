import { Check } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./section";
import { CtaButton } from "./cta-button";
import { EarlyAccessCta } from "./early-access-cta";

// TODO(pricing): no plans or numbers yet. Replace with real tiers once set
// with early-access teams. Keep JSON-LD free of offers/prices until then.
const INCLUDED = [
  "Bots for sales, RevOps and marketing",
  "Flows with all six parts",
  "Approvals inbox",
  "Analytics",
  "Company context with team overrides",
];

/** #pricing: active bots plus usage; no public numbers yet. */
export function PricingTeaser() {
  return (
    <Section id="pricing" aria-labelledby="pricing-title" card>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHeader
            title={<span id="pricing-title">Pay for the bots you run.</span>}
            muted="Plus what they use."
            intro="Pricing is based on active bots plus usage. Flow runs count toward usage. We're setting plans with early-access teams, so there are no public numbers yet."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton size="lg" variant="primary">
              Book a 30-min call
            </CtaButton>
            <EarlyAccessCta size="lg" variant="soft" />
          </div>
        </div>
        <div className="self-center rounded-2xl bg-background p-5 sm:p-6">
          <h3 className="text-ui font-semibold text-foreground">Included</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ui text-fg-2">
                <Check weight="bold" className="mt-0.5 size-4 shrink-0 text-foreground" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
