"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import { CtaButton } from "./cta-button";
import { SPRING } from "./_motion";

export function Close() {
  // Aurora animates only when the section is in view AND on non-mobile.
  // The 40px-blur, full-section, looping scale/opacity transform was the
  // biggest GPU cost on phones — turning it into a static gradient on
  // mobile removes the wake-up judder when scrolling back into the section.
  const reduce = useReducedMotion();
  const [shouldAnimateAurora, setShouldAnimateAurora] = React.useState(false);
  React.useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setShouldAnimateAurora(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduce]);

  return (
    <section
      id="strategy-session"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden py-28 sm:py-36 lg:py-44"
    >
      {/* Layered background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Aurora — animated only on tablet+ to avoid GPU jank on phones */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0.7, scale: 1 }}
          animate={
            shouldAnimateAurora
              ? { opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }
              : { opacity: 0.85, scale: 1 }
          }
          transition={
            shouldAnimateAurora
              ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0 }
          }
          className="absolute left-1/2 top-1/2 h-[80vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.78 0.13 152 / 28%), oklch(0.42 0.06 200 / 14%) 40%, transparent 75%)",
            filter: "blur(40px)",
          }}
        />
        {/* Subtle grid — line color adapts via --grid-line-fine */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--grid-line-fine) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-fine) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
          }}
        />
      </div>

      {/* Giant background wordmark , stroke only, very subtle.
          overflow-hidden on the wrapper clips the natural-width word so it
          can't push the page wider than the viewport on mobile.
          Sits flush at the bottom edge of the section so it doesn't push
          up into the body text / CTA on small screens. The wrapper itself
          is overflow-hidden so descenders below the section bound get clipped
          cleanly. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 overflow-hidden pb-4 sm:bottom-6 sm:pb-5">
        <div
          aria-hidden
          className="select-none whitespace-nowrap text-center font-medium leading-[0.95] tracking-[-0.06em]"
          style={{
            fontSize: "clamp(56px, 19vw, 380px)",
            color: "transparent",
            WebkitTextStroke: "1px var(--wordmark-stroke)",
            backgroundImage:
              "linear-gradient(180deg, var(--wordmark-fill) 0%, transparent 75%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          bonggy
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-start px-6 lg:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ y: 10 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={SPRING}
          className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur"
          style={{
            boxShadow:
              "inset 0 1px 0 var(--inset-highlight), var(--shadow-card-lift)",
          }}
        >
          <Clock weight="regular" className="size-3 text-signal" />
          Strategy session · 30 min
        </motion.div>

        {/* Headline with metallic gradient + drop shadow */}
        <motion.h2
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="text-display text-display-gradient mt-8 max-w-[18ch] text-balance text-[40px] font-medium leading-[0.96] tracking-tight sm:text-[60px] lg:text-[88px]"
        >
          See what your team could do with your best rep&apos;s judgment.
        </motion.h2>

        <motion.p
          initial={{ y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...SPRING, delay: 0.1 }}
          className="mt-8 max-w-[60ch] text-[16.5px] leading-relaxed text-muted-foreground"
        >
          One call. We calibrate Bonggy on your accounts live, show you
          what&apos;s firing this week, and the drafts it would hand your reps.
          If it&apos;s not obviously useful in the first ten minutes,
          we&apos;ll tell you.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...SPRING, delay: 0.16 }}
          className="mt-10"
        >
          <CtaButton size="lg">Book a strategy session</CtaButton>
        </motion.div>

      </div>
    </section>
  );
}
