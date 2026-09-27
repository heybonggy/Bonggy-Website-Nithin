import { CtaComposer } from "./cta-composer";
import { CtaButton } from "./cta-button";

/** Closing call to action, with a read-only composer waiting for a sentence. */
export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="reveal mx-auto flex w-full max-w-wide flex-col items-center rounded-3xl bg-surface px-6 py-16 text-center sm:px-12 sm:py-24">
        <h2 id="final-cta-title" className="max-w-[16ch] text-balance text-display-lg text-foreground">
          Give your first bot a purpose.
        </h2>
        <p className="mt-5 max-w-copy text-body text-fg-2 sm:text-body-lg">
          Start from a preset, or from a sentence. Either way, the flow is yours.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <CtaButton size="lg">Book a strategy call</CtaButton>
        </div>
        <CtaComposer />
      </div>
    </section>
  );
}
