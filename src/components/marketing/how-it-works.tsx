"use client";

import * as React from "react";
import { LazyNumber } from "@/components/ui/lazy-number";
import { Check, Target } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/ui/mascot";
import { StatusPill } from "@/components/product-mock/status-pill";
import { useAmbientTick } from "@/components/product-mock/ambient";
import type { StatusKind } from "@/components/product-mock/data";
import { Section, SectionHeader } from "./section";
import { usePrefersReducedMotion } from "./_motion";

/**
 * A stage's frame index: steps through `count` frames every `stepMs` while
 * on screen, then loops. Reduced motion shows the last (complete) frame.
 */
function useStage(ref: React.RefObject<Element | null>, count: number, stepMs: number) {
  const reduced = usePrefersReducedMotion();
  const tick = useAmbientTick(ref, stepMs, 600);
  return { frame: reduced ? count - 1 : tick % count, started: tick > 0 };
}

const TRACK_LINES = [
  { src: "crm", text: "18 open deals read" },
  { src: "call notes", text: "24 calls read" },
  { src: "calendar", text: "9 meetings this week" },
];

function TrackStage() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { frame } = useStage(ref, TRACK_LINES.length + 2, 900);
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-2 px-5">
      {TRACK_LINES.map((l, i) => {
        const on = frame > i;
        return (
          <div
            key={l.src}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-ui-sm transition-colors duration-300",
              on ? "bg-surface-raised shadow-e1" : "bg-transparent hairline",
            )}
          >
            <span className={cn("inline-flex size-4 items-center justify-center rounded-full", on ? "bg-surface-inverse text-fg-inverse" : "hairline-strong")}>
              {on ? <Check weight="bold" className="size-2.5 animate-check-in" aria-hidden /> : null}
            </span>
            <span className="text-fg-3">{l.src}</span>
            <span className={on ? "text-foreground" : "text-fg-3"}>{on ? l.text : "waiting…"}</span>
          </div>
        );
      })}
    </div>
  );
}

const ALIGN_ACTIONS = ["brief for northwind", "next step on 5 deals", "note to dana at globex"];

function AlignStage() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { frame } = useStage(ref, ALIGN_ACTIONS.length + 1, 1100);
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-2 px-5">
      {ALIGN_ACTIONS.map((a, i) => {
        const mapped = frame > i;
        return (
          <div key={a} className="flex items-center justify-between gap-3 rounded-lg bg-surface-raised px-3 py-2 text-ui-sm shadow-e1">
            <span className="truncate text-foreground">{a}</span>
            <span
              className={cn(
                "inline-flex h-5 shrink-0 items-center gap-1 rounded-full px-2 text-caption transition-colors duration-300",
                mapped ? "bg-surface-inverse text-fg-inverse" : "border border-dashed border-border-strong bg-surface-2 text-fg-3",
              )}
            >
              <Target className="size-3" aria-hidden />
              {mapped ? (i === 2 ? "q4 new pipeline" : "q4 enterprise logos") : "no goal yet"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const NUDGE_STATES: { status: StatusKind; label?: string; line: string }[] = [
  { status: "off", label: "quiet 14 days", line: "acme renewal · no next step" },
  { status: "running", label: "checking", line: "reading the last 3 calls…" },
  { status: "needs-you", line: "suggest: book a pricing review" },
  { status: "done", label: "you booked it", line: "next step set · nothing sent" },
];

function NudgeStage() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { frame } = useStage(ref, NUDGE_STATES.length, 1400);
  const s = NUDGE_STATES[frame];
  return (
    <div ref={ref} className="flex h-full flex-col items-center justify-center gap-3 px-5 text-center">
      <BotAvatar botId="deal-coach" size={40} state={s.status === "running" ? "working" : s.status === "needs-you" ? "needs-you" : "idle"} />
      <StatusPill status={s.status} label={s.label} size="md" />
      <p key={s.line} className="animate-label-in text-ui-sm text-fg-2">
        {s.line}
      </p>
    </div>
  );
}

const REPORT_ROWS = [
  { who: "q4 new pipeline", value: 72 },
  { who: "q4 enterprise logos", value: 64 },
  { who: "pipeline from inbound", value: 88 },
];

function ReportStage() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { frame, started } = useStage(ref, 2, 2200);
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-3 px-5">
      {REPORT_ROWS.map((r) => {
        const v = frame === 0 ? Math.round(r.value * 0.7) : r.value;
        return (
          <div key={r.who} className="grid grid-cols-[minmax(0,150px)_1fr_44px] items-center gap-3 text-ui-sm">
            <span className="flex min-w-0 items-center gap-1.5 text-foreground">
              <Target className="size-3.5 shrink-0 text-fg-3" aria-hidden />
              <span className="truncate">{r.who}</span>
            </span>
            <span className="h-1.5 overflow-hidden rounded-full bg-status-track">
              <span
                className="block h-full origin-left rounded-full bg-status-ink transition-transform duration-700 ease-out-expo"
                style={{ transform: `scaleX(${v / 100})` }}
              />
            </span>
            <span className="tabular text-right text-foreground">
              <LazyNumber live={started} value={v} suffix="%" />
            </span>
          </div>
        );
      })}
      <p className="text-caption text-fg-3">progress on each goal · demo data</p>
    </div>
  );
}

const CARDS = [
  { title: "Track", lead: "Bots read activity", rest: " across the tools you connect.", Stage: TrackStage },
  { title: "Align", lead: "Every action", rest: " maps to a revenue goal.", Stage: AlignStage },
  { title: "Nudge", lead: "Drift gets flagged with a suggested next step.", rest: " A person decides.", Stage: NudgeStage },
  { title: "Report", lead: "One view of work against goals, from rep to CRO.", rest: " No leaderboards.", Stage: ReportStage },
];

/** #how-it-works: the loop every flow runs on, as four live cards. */
export function HowItWorks() {
  return (
    <Section id="how-it-works" band aria-labelledby="how-title">
      <SectionHeader title={<span id="how-title">Every flow runs on one loop.</span>} />
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {CARDS.map(({ title, lead, rest, Stage }) => (
          <li key={title} className="reveal flex flex-col overflow-hidden rounded-3xl bg-background shadow-e1">
            <div aria-hidden className="h-[230px] border-b border-border bg-surface-sunken">
              <Stage />
            </div>
            <div className="p-6">
              <h3 className="text-title font-medium text-foreground">{title}</h3>
              <p className="mt-1.5 text-body text-foreground">
                {lead}
                <span className="text-fg-3">{rest}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
