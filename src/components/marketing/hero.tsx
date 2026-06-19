"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CtaButton } from "./cta-button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Hero-only grid background , masked so it fades at edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-grid-mask opacity-90"
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col items-center justify-center px-6 pt-44 pb-16 text-center lg:px-10 lg:pt-52 lg:pb-20">
        {/* Single confident headline. Gradient text fades white to muted. */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="text-display text-display-gradient mx-auto max-w-[20ch] text-balance text-[44px] font-normal sm:text-[64px] lg:text-[80px]"
        >
          You changed the strategy. Did the team?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-[54ch] text-[16.5px] leading-relaxed text-muted-foreground"
        >
          Bonggy shows whether your reps&apos; effort actually points at the
          goal, before the quarter&apos;s gone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex justify-center"
        >
          <CtaButton size="lg">Strategize</CtaButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-signal pulse-signal" />
            <span>4 roles aligned</span>
          </div>
          <div className="font-mono text-[11px] text-muted-foreground">
            <span className="text-foreground/70">92%</span> effort on-goal
          </div>
          <div className="font-mono text-[11px] text-muted-foreground">
            <span className="text-foreground/70">7</span> reps drifting, flagged
          </div>
        </motion.div>
      </div>
    </section>
  );
}
