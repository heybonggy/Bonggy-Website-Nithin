"use client";

import { motion } from "motion/react";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import { CtaButton } from "./cta-button";
import { TreeAnimation } from "./tree-animation";
import { SPRING } from "./_motion";

export function Close() {
  return (
    <section
      id="strategy-session"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden py-28 sm:py-36 lg:py-44 [content-visibility:auto] [contain-intrinsic-size:auto_900px]"
    >
      {/* Layered background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
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

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* LEFT — copy + CTA */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ y: 10 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={SPRING}
              className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
              style={{
                boxShadow:
                  "inset 0 1px 0 var(--inset-highlight), var(--shadow-card-lift)",
              }}
            >
              <Clock weight="regular" className="size-3 text-signal" />
              Strategy session · 30 min
            </motion.div>

            <motion.h2
              initial={{ y: 14 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ ...SPRING, delay: 0.05 }}
              className="text-display text-display-gradient mt-8 max-w-[18ch] text-balance text-[36px] font-medium leading-[0.98] tracking-tight sm:text-[52px] lg:text-[72px]"
            >
              See what your team could do with your best rep&apos;s judgment.
            </motion.h2>

            <motion.p
              initial={{ y: 12 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ ...SPRING, delay: 0.1 }}
              className="mt-8 max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground"
            >
              One call. We calibrate Bonggy on your accounts live, show you
              what&apos;s firing this week, and the drafts it would hand your reps.
              If it&apos;s not obviously useful in the first ten minutes,
              we&apos;ll tell you.
            </motion.p>

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

          {/* RIGHT — outbound tree illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto h-[520px] w-full max-w-[520px] sm:h-[600px] lg:h-[640px]"
          >
            <TreeAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
