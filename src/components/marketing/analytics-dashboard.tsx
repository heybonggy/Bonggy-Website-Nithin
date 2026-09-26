"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Warning } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { Section } from "./section";
import { EASE_OUT, usePrefersReducedMotion } from "./_motion";

/* All numbers on this dashboard are illustrative, not customer data. */

const KPIS = [
  { label: "Briefs drafted", value: "22", seed: 1 },
  { label: "Approved by reps", value: "17", seed: 2 },
  { label: "Work mapped to a goal", value: "92%", seed: 3 },
];

const BOTS = [
  { name: "Market Modeller", knows: "3 segments · 12 plays", goal: "New logo · mid-market", seed: 4 },
  { name: "Account Researcher", knows: "48 accounts · 131 people", goal: "New logo · mid-market", seed: 5 },
  { name: "Brief Writer", knows: "22 briefs · 17 approved", goal: "New logo · mid-market", seed: 6 },
  { name: "Renewal Scout", knows: "19 renewals · 4 at risk", goal: "Net revenue retention", seed: 7 },
];

const GOALS = [
  { label: "New logo", share: 54, tone: "bg-signal" },
  { label: "Expansion", share: 21, tone: "bg-signal/65" },
  { label: "Renewal", share: 17, tone: "bg-signal/35" },
  { label: "Off-goal", share: 8, tone: "bg-foreground/25" },
];

export function AnalyticsDashboard() {
  const reduce = usePrefersReducedMotion();

  return (
    <Section id="analytics" eyebrow="Analytics">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <h2 className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]">
          See what every bot is doing{" "}
          <span className="text-muted-foreground/85">and which goal it serves.</span>
        </h2>
        <p className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground lg:pt-2">
          One view of agent activity: what each bot knows, the revenue goal
          its work maps to, and where effort is drifting before the quarter
          notices.
        </p>
      </div>

      <figure
        aria-label="Example analytics dashboard with illustrative numbers"
        className="terminal-corners relative mt-14 rounded-lg border border-border/80 bg-card/60"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-5 py-3.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Enterprise pod · this week
          </span>
          <span className="rounded-[3px] border border-border/80 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
            Illustrative numbers · example data
          </span>
        </div>

        {/* KPIs */}
        <dl className="grid grid-cols-1 gap-px border-b border-border/60 bg-border/40 sm:grid-cols-3">
          {KPIS.map((k) => (
            <div key={k.label} className="bg-card px-5 py-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {k.label}
              </dt>
              <dd className="mt-1.5 flex items-end justify-between gap-4">
                <span className="font-mono text-[30px] leading-none tabular-nums text-foreground">
                  {k.value}
                </span>
                <Sparkline seed={k.seed} reduce={reduce} className="-mt-3 h-9 w-24" />
              </dd>
            </div>
          ))}
        </dl>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {/* Bots */}
          <div className="border-b border-border/60 lg:border-b-0 lg:border-r">
            <h3 className="px-5 pt-4 font-mono text-[10px] font-normal uppercase tracking-[0.22em] text-muted-foreground">
              Bots · what they know · their goal
            </h3>
            <ul className="divide-y divide-border/50 px-5 pb-2">
              {BOTS.map((b) => (
                <li
                  key={b.name}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-3.5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)_minmax(0,1.1fr)_auto]"
                >
                  <span className="text-[14px] text-foreground">{b.name}</span>
                  <Sparkline seed={b.seed} reduce={reduce} className="h-7 w-20 sm:order-last" />
                  <span className="text-[12.5px] text-muted-foreground">{b.knows}</span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-signal">
                    {b.goal}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Effort by goal + drift */}
          <div className="flex flex-col gap-5 p-5">
            <div>
              <h3 className="font-mono text-[10px] font-normal uppercase tracking-[0.22em] text-muted-foreground">
                Effort by revenue goal
              </h3>
              <motion.div
                className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-foreground/[0.06]"
                role="img"
                aria-label={GOALS.map((g) => `${g.label} ${g.share}%`).join(", ")}
                initial={reduce ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                {GOALS.map((g, i) => (
                  <motion.span
                    key={g.label}
                    className={cn("block h-full origin-left", g.tone)}
                    style={{ width: `${g.share}%` }}
                    variants={{
                      hidden: { scaleX: 0 },
                      visible: {
                        scaleX: 1,
                        transition: { duration: 0.7, delay: i * 0.12, ease: EASE_OUT },
                      },
                    }}
                  />
                ))}
              </motion.div>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
                {GOALS.map((g) => (
                  <li key={g.label} className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
                    <span aria-hidden className={cn("size-2 rounded-full", g.tone)} />
                    {g.label}
                    <span className="ml-auto font-mono tabular-nums text-foreground">{g.share}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-signal/35 bg-signal/[0.05] p-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                <Warning weight="fill" className="size-3.5" aria-hidden />
                Drift alert
              </div>
              <p className="mt-2 text-[14px] leading-snug text-foreground">
                Pod B is spending 60% of effort on accounts outside ICP.
              </p>
              <p className="mt-1.5 text-[12.5px] leading-snug text-muted-foreground">
                Suggested next move: point research at the five in-ICP accounts
                with open renewals. A person on your team decides.
              </p>
            </div>
          </div>
        </div>
      </figure>
    </Section>
  );
}

/** Deterministic sparkline (same on server and client); draws once on view. */
function Sparkline({
  seed,
  reduce,
  className,
}: {
  seed: number;
  reduce: boolean;
  className?: string;
}) {
  const d = React.useMemo(() => {
    const pts = Array.from({ length: 18 }, (_, i) => {
      const y =
        55 -
        i * 1.6 +
        Math.sin(i / 1.9 + seed) * 14 +
        Math.sin(i * 5.3 + seed * 2.1) * 5;
      return `${i === 0 ? "M" : "L"}${((i / 17) * 100).toFixed(1)},${y.toFixed(1)}`;
    });
    return pts.join(" ");
  }, [seed]);
  const gradId = `spark-${seed}`;
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className={cn("shrink-0", className)}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.13 152 / 30%)" />
          <stop offset="100%" stopColor="oklch(0.78 0.13 152 / 0%)" />
        </linearGradient>
      </defs>
      <path d={`${d} L100,100 L0,100 Z`} fill={`url(#${gradId})`} />
      <motion.path
        d={d}
        fill="none"
        stroke="oklch(0.78 0.13 152)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, ease: EASE_OUT }}
      />
    </svg>
  );
}
