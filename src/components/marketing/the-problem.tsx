"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Clock,
  TrendDown,
  NotePencil,
  Stack,
} from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { SPRING } from "./_motion";

type PainIcon = React.ComponentType<{
  className?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}>;

type Pain = {
  n: string;
  tag: string;
  title: string;
  body: string;
  outcome: string;
  Icon: PainIcon;
};

const PAINS: Pain[] = [
  {
    n: "01",
    tag: "The hiring approach",
    title: "Hiring your way out",
    body: "A new SDR takes the better part of a year to get genuinely good. To know which signals matter, who to call, what actually opens a conversation. You pay full ramp cost for half-ramp output, every hire, every time.",
    outcome: "9 to 12 months to genuinely ramp",
    Icon: Clock,
  },
  {
    n: "02",
    tag: "The AI SDR approach",
    title: "The AI SDR that flopped",
    body: "You tried one. It automated the wrong half of the job. AI SDRs got very good at typing and never learned the thinking. So they sprayed faster, burned your domain, and made every inbox tune you out. Volume was never the bottleneck. Judgment was.",
    outcome: "Volume up, meaning down",
    Icon: TrendDown,
  },
  {
    n: "03",
    tag: "The team approach",
    title: "The reps who never quite get there",
    body: "Most reps aren't the problem. The instinct your top rep spent two years building was never written down. So everyone else recycles the same three angles and works accounts in the wrong order, missing the buying window that was sitting right there.",
    outcome: "Your top rep's instinct, never written down",
    Icon: NotePencil,
  },
  {
    n: "04",
    tag: "The tooling approach",
    title: "More tools, same gap",
    body: "Every quarter brings new platforms, new signal feeds, new dashboards. Reps end up stitching context across eight tabs instead of having one place to think from. Senior reps lose hours assembling a coherent picture; new SDRs walk in and find a stack nobody fully understands. The toolkit grew. The judgment problem didn't.",
    outcome: "Eight tools. No command centre.",
    Icon: Stack,
  },
];

export function TheProblem() {
  return (
    <Section id="problem" eyebrow="Why your team isn't ramping">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <motion.h2
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={SPRING}
          className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]"
        >
          Four ways you&apos;ve tried.{" "}
          <span className="text-muted-foreground/85">
            Four reasons each one stalls.
          </span>
        </motion.h2>

        <motion.p
          initial={{ y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="max-w-[56ch] text-[16px] leading-relaxed text-muted-foreground lg:pt-2"
        >
          Every team rebuilds outbound from one of these four starting points.
          Each one fails in a different way. The pattern is the same.
        </motion.p>
      </div>

      {/* Editorial pain blocks — 3-column on lg+ so the outcome lives as a
          sidecar callout on the right instead of trailing the body in a
          half-empty row. Index/tag on the far left, narrative in the middle,
          outcome card on the right. Stacks cleanly on mobile. */}
      <ol className="mt-20 divide-y divide-border/60">
        {PAINS.map((p, i) => (
          <motion.li
            key={p.n}
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ ...SPRING, delay: i * 0.04 }}
            className="grid grid-cols-1 gap-x-12 gap-y-6 py-14 lg:grid-cols-[150px_minmax(0,1fr)_280px] lg:py-20"
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

            {/* MIDDLE — title + body */}
            <div className="max-w-[58ch]">
              <h3 className="text-display text-[26px] font-normal leading-tight tracking-tight text-foreground sm:text-[32px]">
                {p.title}
              </h3>
              <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>

            {/* RIGHT — outcome sidecar */}
            <div
              className="relative flex flex-col gap-3 rounded-bento-sm border border-border/70 bg-card/40 p-5 sm:p-6"
              style={{
                boxShadow:
                  "inset 0 1px 0 var(--inset-highlight), var(--shadow-card-lift)",
              }}
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                <span>The outcome</span>
                <p.Icon weight="regular" className="size-3.5 text-signal" />
              </div>
              <div className="text-[16.5px] font-medium leading-snug tracking-tight text-foreground sm:text-[18px]">
                {p.outcome}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>

      <motion.div
        initial={{ y: 12 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={SPRING}
        className="mt-16 max-w-3xl"
      >
        <div className="border-l-2 border-signal/70 pl-6">
          <p className="text-balance text-[20px] font-medium leading-snug tracking-tight sm:text-[24px]">
            The difference isn&apos;t a personality trait.{" "}
            <span className="text-signal">
              It&apos;s the judgment to find the signal, and the meaning a rep
              builds around it.
            </span>{" "}
            Both can be given.
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
