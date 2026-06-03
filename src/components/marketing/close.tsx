"use client";

import { motion } from "motion/react";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import { CtaButton } from "./cta-button";
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

      {/* Giant background wordmark — stroke + faded fill, very subtle.
          overflow-hidden on the wrapper clips natural-width text so it can't
          push the page wider on mobile. bottom-4 / sm:bottom-6 + pb-4/5 keeps
          the descenders inside the section. */}
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
          className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
          style={{
            boxShadow:
              "inset 0 1px 0 var(--inset-highlight), var(--shadow-card-lift)",
          }}
        >
          <Clock weight="regular" className="size-3 text-signal" />
          Thirty minutes · Your real accounts
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="text-display text-display-gradient mt-8 max-w-[22ch] text-balance text-[40px] font-medium leading-[0.96] tracking-tight sm:text-[60px] lg:text-[88px]"
        >
          Your competitors are still doing this by hand.
        </motion.h2>

        <motion.p
          initial={{ y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...SPRING, delay: 0.1 }}
          className="mt-8 max-w-[60ch] text-[16.5px] leading-relaxed text-muted-foreground"
        >
          Somewhere right now, a rep at the company you are competing with
          is spending three hours researching accounts before they write a
          single word. They will get to maybe ten today. They will miss the
          signals that fired overnight. You will have an agency that did
          all of that before breakfast, across every account, tailored to
          exactly how you win. Nothing leaves without a human saying yes.
          Your rep makes the call on every message, every account, every
          move.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...SPRING, delay: 0.16 }}
          className="mt-10 flex flex-col items-start gap-3"
        >
          <CtaButton size="lg">Strategize</CtaButton>
          <p className="text-[13px] text-muted-foreground">
            Thirty minutes. We will run Bonggy on your real accounts, live.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
