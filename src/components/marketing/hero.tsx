"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CtaButton } from "./cta-button";
import { AsciiField } from "./ascii-field";
import { IntegrationsMarquee } from "./integrations-marquee";
import { useScrollShell } from "./scroll-shell";

export function Hero() {
  // Once the next section scrolls up and covers the sticky hero, pause the
  // ASCII canvas — it's invisible but the rAF would otherwise run the whole
  // time the user reads the rest of the page.
  const shellRef = useScrollShell();
  const [covered, setCovered] = React.useState(false);

  React.useEffect(() => {
    const container = shellRef?.current ?? null;
    const target: HTMLElement | Window = container ?? window;
    const getY = () => (container ? container.scrollTop : window.scrollY);
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setCovered(getY() > window.innerHeight * 0.85);
      });
    };
    onScroll();
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [shellRef]);

  return (
    // Fixed so the next section scrolls up and covers it (see .page-cover).
    <section className="fixed inset-x-0 top-0 z-0 isolate h-[100svh] overflow-hidden">
      {/* Full-bleed animated ASCII field behind the centered copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <AsciiField paused={covered} />
        <div className="hero-scanlines absolute inset-0" />
        {/* Darken behind the centered text + edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(56% 50% at 50% 47%, oklch(0.085 0.005 280 / 0.92), oklch(0.085 0.005 280 / 0.58) 52%, transparent 82%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.085 0.005 280 / 0.55), transparent 22%, transparent 78%, oklch(0.085 0.005 280 / 0.85))",
          }}
        />
        {/* Scroll-driven black wash: the field darkens as the page scrolls and
            the next section rises to cover the hero. */}
        <div className="hero-cover-fade absolute inset-0" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col items-center justify-center px-6 pt-32 pb-40 text-center lg:px-10">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="text-display text-display-gradient mx-auto max-w-[20ch] text-balance text-[44px] font-normal sm:text-[64px] lg:text-[80px]"
        >
          Make every effort count toward revenue.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-[54ch] text-[16.5px] leading-relaxed text-muted-foreground"
        >
          We show you what&apos;s moving revenue, what&apos;s drifting, and
          where to point it back.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex justify-center"
        >
          <CtaButton size="lg">Strategize</CtaButton>
        </motion.div>
      </div>

      {/* Whisper-quiet integrations strip pinned to the hero's bottom edge —
          borderless, low-opacity logos so it reads as faint social proof at
          the fold without competing with the ASCII field above it. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-10 pb-6 sm:pb-8"
      >
        <IntegrationsMarquee compact />
      </motion.div>
    </section>
  );
}
