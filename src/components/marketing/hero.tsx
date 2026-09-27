import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CtaButton, CAL_LINK } from "./cta-button";
import { EarlyAccessCta } from "./early-access-cta";
import { HeroDemo } from "./hero-demo";

const HEADLINE = "Build the bots your GTM team needs.";
const MUTED = "Running the flows you want, pointed at revenue.";

/** Words reveal in CSS (not Motion) so the H1 paints before hydration. */
function Words({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          className="inline-block animate-word-in"
          style={{ animationDelay: `${100 + 55 * (offset + i)}ms` }}
        >
          {w}
          {" "}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const headWords = HEADLINE.split(" ").length;
  return (
    <section id="top" className="px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-28">
      <div className="mx-auto flex w-full max-w-wide flex-col items-center text-center">
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 animate-rise-in items-center"
        >
          <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-surface-2 px-3 text-ui-sm text-fg-2 transition-colors duration-[var(--dur-fast)] hover:bg-surface-3">
            <span className="font-medium text-foreground">Early access</span>
            <span aria-hidden className="text-fg-3">·</span>
            Book a 30-min call
            <ArrowUpRight className="size-3.5" aria-hidden />
          </span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>

        <h1 className="mt-5 max-w-[20ch] text-balance text-display-lg text-foreground [perspective:1200px] sm:text-display-xl lg:max-w-none">
          <Words text={HEADLINE} />
          {/* Two lines at lg: the muted clause starts its own line. */}
          <br aria-hidden className="hidden lg:block" />
          <span className="text-fg-3">
            <Words text={MUTED} offset={headWords} />
          </span>
        </h1>

        <p
          className="mt-5 max-w-copy animate-rise-in text-body text-fg-2 sm:text-body-lg"
          style={{ animationDelay: "500ms" }}
        >
          Bonggy is the agent workspace for sales, RevOps and marketing teams. Describe the work in a sentence; a bot
          turns it into a flow tied to a revenue goal, and you approve what customers see.
        </p>

        <div
          className="mt-7 flex animate-rise-in flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "650ms" }}
        >
          <EarlyAccessCta size="lg" />
          <CtaButton size="lg" variant="soft">
            Book a 30-min call
          </CtaButton>
        </div>
        {/* TODO(social-proof): no customer logos, quotes or counts until
            they're real and approved. */}

        <div
          className="mt-10 w-full max-w-wide animate-rise-in text-left sm:mt-12"
          style={{ animationDelay: "800ms", ["--rise-from" as string]: "-20px" }}
        >
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}
