import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CtaButton, CAL_LINK } from "./cta-button";
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
    <section id="top" className="px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28">
      <div className="mx-auto flex w-full max-w-wide flex-col items-center text-center">
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 animate-rise-in items-center"
        >
          <span className="inline-flex min-h-7 flex-wrap items-center justify-center gap-x-1.5 rounded-full bg-surface-2 px-3 py-1 text-ui-sm text-fg-2 transition-colors duration-[var(--dur-fast)] hover:bg-surface-3">
            {/* Two unbreakable halves: on narrow phones it wraps at the dot,
                never leaving the arrow on a line of its own. */}
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-medium text-foreground">Book a strategy call</span>
              <span aria-hidden className="text-fg-3">·</span>
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              map your first flow with us
              <ArrowUpRight className="size-3.5" aria-hidden />
            </span>
          </span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>

        <h1 className="mt-4 max-w-[20ch] text-balance text-[2.125rem] font-medium leading-[1.08] tracking-[-0.02em] text-foreground [perspective:1200px] sm:mt-5 sm:text-display-xl lg:max-w-none">
          {/* Phones: the first line is one plain, fully opaque text run from the
              first frame, so the H1 itself is the LCP element; the muted
              clause still animates. From sm up, word by word. */}
          <span className="sm:hidden">{HEADLINE} </span>
          <span className="hidden sm:inline">
            <Words text={HEADLINE} />
          </span>
          {/* Two lines at lg: the muted clause starts its own line. */}
          <br aria-hidden className="hidden lg:block" />
          <span className="text-fg-3">
            <Words text={MUTED} offset={headWords} />
          </span>
        </h1>

        <p
          className="mt-4 max-w-copy animate-rise-in text-body text-fg-2 sm:mt-5 sm:text-body-lg"
          style={{ animationDelay: "500ms" }}
        >
          Bonggy is the agent workspace for sales, RevOps and marketing teams. Describe the work in a sentence; a bot
          turns it into a flow tied to a revenue goal, and you approve what customers see.
        </p>

        <div
          className="mt-6 flex animate-rise-in flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:mt-7"
          style={{ animationDelay: "650ms" }}
        >
          <CtaButton size="lg">Book a strategy call</CtaButton>
          <a
            href="#how-it-works"
            className="inline-flex min-h-11 items-center gap-1 whitespace-nowrap rounded-full px-3 text-ui font-medium text-fg-2 transition-colors duration-150 hover:text-foreground"
          >
            see how it works
            <span aria-hidden>↓</span>
          </a>
        </div>
        {/* TODO(social-proof): no customer logos, quotes or counts until
            they're real and approved. */}

        <div
          className="relative mt-8 w-full max-w-wide animate-rise-in text-left sm:mt-12"
          style={{ animationDelay: "800ms", ["--rise-from" as string]: "-20px" }}
        >
          {/* Depth without hue: a faint hatched plate the window floats on. */}
          <div
            aria-hidden
            className="hatch-faint absolute -inset-x-2 -top-4 bottom-[-48px] rounded-[32px] bg-surface sm:-inset-x-6 sm:-top-6"
            style={{
              maskImage: "linear-gradient(#000 55%, transparent)",
              WebkitMaskImage: "linear-gradient(#000 55%, transparent)",
            }}
          />
          <div className="relative">
            <HeroDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
