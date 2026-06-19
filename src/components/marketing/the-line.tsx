"use client";

import { motion } from "motion/react";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { CtaButton } from "./cta-button";
import { SPRING } from "./_motion";

export function TheLine() {
  return (
    <Section id="the-line" eyebrow="Where we draw the line">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ y: 10 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={SPRING}
          className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-signal"
        >
          <ShieldCheck weight="fill" className="size-3.5" />
          Alignment, not surveillance
        </motion.div>

        <motion.h2
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="text-display mt-6 text-balance text-[30px] font-medium leading-tight tracking-tight sm:text-[40px] lg:text-[48px]"
        >
          We measure effort against the goal.{" "}
          <span className="text-muted-foreground/85">
            Never reps against each other.
          </span>
        </motion.h2>

        <motion.p
          initial={{ y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...SPRING, delay: 0.1 }}
          className="mt-7 text-[16px] leading-relaxed text-muted-foreground"
        >
          No leaderboard. No scoreboard. No ranking reps against each other.
          Bonggy exists so a rep&apos;s work finally counts, not so a manager
          has a new stick. The picture is shared, not weaponized. Every rep
          sees the same view their manager does.
        </motion.p>

        <motion.div
          initial={{ y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...SPRING, delay: 0.15 }}
          className="mt-10 flex flex-col items-start gap-3"
        >
          <CtaButton size="lg">Strategize</CtaButton>
          <p className="text-[13px] text-muted-foreground">
            Thirty minutes. Your real team, your real goal.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
