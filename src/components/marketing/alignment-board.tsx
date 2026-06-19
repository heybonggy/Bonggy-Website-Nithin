"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  TrendUp,
  Warning,
  WarningOctagon,
  ArrowRight,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/**
 * Hero mock — the Head of Sales briefing. Embodies the orchestration
 * positioning: Bonggy watches every rep's effort and hands leadership the
 * three specific calls that matter this morning. Reads like a sharp Head of
 * Sales who actually saw everything overnight — named reps, real plays, real
 * numbers. Not a generic dashboard.
 */

type Kind = "replicate" | "drift" | "risk";

type Insight = {
  kind: Kind;
  observed: React.ReactNode;
  move: string;
};

const META: Record<
  Kind,
  { label: string; Icon: typeof TrendUp; tint: string; chip: string; dot: string }
> = {
  replicate: {
    label: "Working — scale it",
    Icon: TrendUp,
    tint: "border-signal/30 bg-signal/[0.05]",
    chip: "text-signal",
    dot: "bg-signal",
  },
  drift: {
    label: "Drifting",
    Icon: Warning,
    tint: "border-amber-400/30 bg-amber-400/[0.05]",
    chip: "text-amber-400",
    dot: "bg-amber-400",
  },
  risk: {
    label: "At risk",
    Icon: WarningOctagon,
    tint: "border-destructive/30 bg-destructive/[0.05]",
    chip: "text-destructive",
    dot: "bg-destructive",
  },
};

const INSIGHTS: Insight[] = [
  {
    kind: "replicate",
    observed: (
      <>
        <b className="font-medium text-foreground">Sam</b> and{" "}
        <b className="font-medium text-foreground">Jessie</b> are landing
        mid-market by leading with a security-review teardown, not a demo.{" "}
        <span className="text-foreground/90">3 closes in 11 days.</span> Nobody
        else is running it.
      </>
    ),
    move: "Roll the play out to the other 5 reps",
  },
  {
    kind: "drift",
    observed: (
      <>
        <b className="font-medium text-foreground">Tom</b> spent{" "}
        <span className="text-foreground/90">62% of the week</span> on accounts
        outside the Q4 ICP. The 5 that actually fit are sitting untouched.
      </>
    ),
    move: "Reassign his list before Thursday",
  },
  {
    kind: "risk",
    observed: (
      <>
        <b className="font-medium text-foreground">Northwind</b> renewal:{" "}
        <span className="text-foreground/90">zero touches in 18 days</span>,
        $120K up in March. The champion just changed teams.
      </>
    ),
    move: "Hand to Kit today, not at QBR",
  },
];

export function AlignmentBoard() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden rounded-bento border border-border/80 bg-card/70 shadow-diffusion-sm">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-3.5">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
          <Sparkle weight="fill" className="size-3.5 text-signal" />
          This morning&apos;s briefing
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-signal pulse-signal" />
          Live
        </div>
      </div>

      {/* Goal header */}
      <div className="flex items-end justify-between gap-4 border-b border-border/60 px-5 py-4">
        <div>
          <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted-foreground/70">
            Goal · Q4
          </div>
          <div className="mt-1 text-[14px] font-medium tracking-tight text-foreground">
            Win the mid-market segment
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[26px] font-medium leading-none tabular-nums text-signal">
            81%
          </div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/70">
            on-goal
          </div>
        </div>
      </div>

      {/* Briefing — the three calls that matter */}
      <div className="flex flex-col gap-2.5 p-4">
        {INSIGHTS.map((ins, i) => {
          const m = META[ins.kind];
          return (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={cn("rounded-lg border p-3.5", m.tint)}
            >
              <div className="mb-2 flex items-center gap-1.5">
                <m.Icon weight="fill" className={cn("size-3.5", m.chip)} />
                <span
                  className={cn(
                    "font-mono text-[9px] font-medium uppercase tracking-[0.18em]",
                    m.chip,
                  )}
                >
                  {m.label}
                </span>
              </div>

              <p className="text-[12.5px] leading-snug text-muted-foreground">
                {ins.observed}
              </p>

              <div className="mt-2.5 flex items-center gap-1.5 border-t border-border/40 pt-2.5">
                <ArrowRight weight="bold" className={cn("size-3", m.chip)} />
                <span className="text-[11.5px] font-medium text-foreground">
                  {ins.move}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
