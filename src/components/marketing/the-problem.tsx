"use client";

import { motion } from "motion/react";
import { Section } from "./section";
import { SPRING } from "./_motion";

const PAINS = [
  {
    n: "01",
    tag: "The hiring approach",
    title: "Hiring your way out",
    body: "A new SDR takes the better part of a year to get genuinely good. To know which signals matter, who to call, what actually opens a conversation. You pay full ramp cost for half-ramp output, every hire, every time.",
    outcome: "9 to 12 months to genuinely ramp",
  },
  {
    n: "02",
    tag: "The AI SDR approach",
    title: "The AI SDR that flopped",
    body: "You tried one. It automated the wrong half of the job. AI SDRs got very good at typing and never learned the thinking. So they sprayed faster, burned your domain, and made every inbox tune you out. Volume was never the bottleneck. Judgment was.",
    outcome: "Volume up, meaning down",
  },
  {
    n: "03",
    tag: "The team approach",
    title: "The reps who never quite get there",
    body: "Most reps aren't the problem. The instinct your top rep spent two years building was never written down. So everyone else recycles the same three angles and works accounts in the wrong order, missing the buying window that was sitting right there.",
    outcome: "Your top rep's instinct, never written down",
  },
];

export function TheProblem() {
  return (
    <Section id="problem" eyebrow="Why your team isn't ramping">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <motion.h2
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={SPRING}
          className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]"
        >
          Three ways you&apos;ve tried.{" "}
          <span className="text-muted-foreground/85">
            Three reasons each one stalls.
          </span>
        </motion.h2>

        <motion.p
          initial={{ y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="max-w-[56ch] text-[16px] leading-relaxed text-muted-foreground lg:pt-2"
        >
          Every team rebuilds outbound from one of these three starting points.
          Each one fails in a different way. The pattern is the same.
        </motion.p>
      </div>

      {/* Editorial pain blocks — generous vertical rhythm, clean hierarchy */}
      <ol className="mt-20 divide-y divide-border/60">
        {PAINS.map((p, i) => (
          <motion.li
            key={p.n}
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ ...SPRING, delay: i * 0.04 }}
            className="grid grid-cols-1 gap-x-12 gap-y-6 py-14 lg:grid-cols-[180px_1fr] lg:py-20"
          >
            {/* LEFT — index + tag */}
            <div className="flex flex-col gap-3">
              <div className="font-mono text-[48px] font-normal leading-none tabular-nums text-foreground/30">
                {p.n}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
                {p.tag}
              </div>
            </div>

            {/* RIGHT — title + body + outcome callout */}
            <div className="max-w-[64ch]">
              <h3 className="text-display text-[26px] font-normal leading-tight tracking-tight text-foreground sm:text-[32px]">
                {p.title}
              </h3>
              <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">
                {p.body}
              </p>
              <div className="mt-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80">
                <span className="h-px w-6 bg-border/80" />
                <span>The outcome</span>
                <span className="text-foreground/85">{p.outcome}</span>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>

      <motion.div
        initial={{ y: 12 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={SPRING}
        className="mt-16 max-w-3xl"
      >
        <div className="border-l-2 border-signal/70 pl-6">
          <p className="text-balance text-[20px] font-medium leading-snug tracking-tight sm:text-[24px]">
            What separates a great SDR from an average one isn&apos;t a
            personality trait.{" "}
            <span className="text-signal">It&apos;s judgment.</span> And
            judgment can be given.
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
