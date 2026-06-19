"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CtaButton } from "./cta-button";
import { AsciiField } from "./ascii-field";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      {/* Full-bleed animated ASCII field behind the centered copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <AsciiField />
        <div className="hero-scanlines absolute inset-0" />
        {/* Darken behind the centered text + edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(46% 42% at 50% 48%, oklch(0.085 0.005 280 / 0.78), oklch(0.085 0.005 280 / 0.2) 62%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.085 0.005 280 / 0.55), transparent 22%, transparent 78%, oklch(0.085 0.005 280 / 0.85))",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col items-center justify-center px-6 pt-44 pb-16 text-center lg:px-10">
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
            <span className="text-foreground/70">92%</span> effort on revenue
          </div>
          <div className="font-mono text-[11px] text-muted-foreground">
            <span className="text-foreground/70">7</span> reps drifting, flagged
          </div>
        </motion.div>
      </div>
    </section>
  );
}
