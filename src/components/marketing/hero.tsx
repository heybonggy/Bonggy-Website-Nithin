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

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1400px] flex-col items-stretch justify-center px-6 pt-44 pb-16 lg:px-10 lg:pt-52 lg:pb-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="relative">
            {/* Single confident headline. Gradient text fades white to muted. */}
            <motion.h1
              initial={{ y: 14 }}
              animate={{ y: 0 }}
              transition={{ ...SPRING, delay: 0.1 }}
              className="text-display text-balance text-[44px] font-normal sm:text-[64px] lg:text-[80px]"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, oklch(0.99 0 0) 0%, oklch(0.99 0 0) 40%, oklch(0.68 0 0) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              The command centre for sales teams.
            </motion.h1>

            <motion.p
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ ...SPRING, delay: 0.18 }}
              className="mt-8 max-w-[58ch] text-[16.5px] leading-relaxed text-muted-foreground"
            >
              Find the signal, decide the move. Bonggy runs your whole
              outbound sales motion from one place, with your judgement.
            </motion.p>

            <motion.div
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ ...SPRING, delay: 0.24 }}
              className="mt-10 flex flex-col items-start gap-3"
            >
              <CtaButton size="lg">Book a strategy session</CtaButton>
              <p className="text-[13px] text-muted-foreground">
                30 minutes. We&apos;ll run Bonggy on your real accounts, live.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ ...SPRING, delay: 0.32 }}
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
            initial={{ y: 24 }}
            animate={{ y: 0 }}
            transition={{ ...SPRING, delay: 0.18 }}
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
