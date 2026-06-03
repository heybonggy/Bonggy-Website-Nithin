"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CtaButton } from "./cta-button";
import { CommandCenterMock } from "./command-center-mock";
import { SPRING } from "./_motion";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Hero-only grid background , masked so it fades at edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-grid-mask opacity-90"
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col items-stretch justify-center px-6 pt-44 pb-16 lg:px-10 lg:pt-52 lg:pb-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="relative">
            {/* Single confident headline. Gradient text fades white to muted. */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-display text-display-gradient text-balance text-[44px] font-normal sm:text-[64px] lg:text-[80px]"
            >
              Your own full-stack sales agency.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-[58ch] text-[16.5px] leading-relaxed text-muted-foreground"
            >
              Bonggy works the way your best people work. It reads the
              world, finds the signal, writes the outreach. Tailored to how
              you sell. Ten times the output. You stay in control.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col items-start gap-3"
            >
              <CtaButton size="lg">Strategize</CtaButton>
              <p className="text-[13px] text-muted-foreground">
                Thirty minutes. Your real accounts, not a demo.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-signal pulse-signal" />
                <span>3 agents running</span>
              </div>
              <div className="font-mono text-[11px] text-muted-foreground">
                <span className="text-foreground/70">1,247</span> events read this week
              </div>
              <div className="font-mono text-[11px] text-muted-foreground">
                <span className="text-foreground/70">12</span> accounts firing today
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="pointer-events-none absolute -inset-x-16 -inset-y-20 -z-10"
              style={{
                background:
                  "radial-gradient(closest-side, oklch(0.78 0.13 152 / 18%), transparent 70%)",
              }}
            />
            <CommandCenterMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
