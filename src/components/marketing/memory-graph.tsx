"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Pause, Play } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { Section } from "./section";
import { useLoopFocus } from "./loop-focus";
import { EASE_OUT, usePrefersReducedMotion } from "./_motion";

/**
 * Memory graph: a made-up example of what an agent pod learns over eight
 * weeks. Every account, person and event here is fictional.
 */
type Kind = "account" | "person" | "objection" | "win" | "brief";
type Node = { id: string; kind: Kind; x: number; y: number; week: number; label?: string };
type Edge = { from: string; to: string; week: number; learned?: boolean };

const W = 160;
const H = 110;
const WEEKS = 8;

const NODES: Node[] = [
  { id: "N", kind: "account", x: 36, y: 24, week: 1, label: "Northwind Freight" },
  { id: "H", kind: "account", x: 112, y: 20, week: 1, label: "Helix Health" },
  { id: "n1", kind: "person", x: 20, y: 12, week: 1 },
  { id: "h1", kind: "person", x: 130, y: 9, week: 1 },
  { id: "A", kind: "account", x: 72, y: 80, week: 2, label: "Atlas Corp" },
  { id: "a1", kind: "person", x: 58, y: 97, week: 2 },
  { id: "S", kind: "objection", x: 70, y: 44, week: 2, label: "Security review" },
  { id: "P", kind: "account", x: 134, y: 78, week: 3, label: "Pylon" },
  { id: "p1", kind: "person", x: 150, y: 94, week: 3 },
  { id: "B", kind: "objection", x: 110, y: 56, week: 3, label: "Budget timing" },
  { id: "WH", kind: "win", x: 142, y: 40, week: 4, label: "Won · Helix" },
  { id: "C", kind: "account", x: 24, y: 86, week: 5, label: "Corvid Labs" },
  { id: "c1", kind: "person", x: 10, y: 100, week: 5 },
  { id: "WA", kind: "win", x: 96, y: 96, week: 6, label: "Expanded · Atlas" },
  { id: "R", kind: "account", x: 14, y: 50, week: 7, label: "Harbor & Co" },
  { id: "r1", kind: "person", x: 6, y: 66, week: 7 },
  { id: "BR", kind: "brief", x: 44, y: 62, week: 8, label: "Brief #10" },
];

const EDGES: Edge[] = [
  { from: "N", to: "n1", week: 1 },
  { from: "H", to: "h1", week: 1 },
  { from: "A", to: "a1", week: 2 },
  { from: "N", to: "S", week: 2 },
  { from: "A", to: "S", week: 2 },
  { from: "H", to: "S", week: 3 },
  { from: "P", to: "p1", week: 3 },
  { from: "P", to: "B", week: 3 },
  { from: "H", to: "WH", week: 4 },
  { from: "WH", to: "S", week: 4, learned: true },
  { from: "C", to: "c1", week: 5 },
  { from: "C", to: "B", week: 5 },
  { from: "A", to: "WA", week: 6 },
  { from: "WA", to: "B", week: 6, learned: true },
  { from: "R", to: "r1", week: 7 },
  { from: "R", to: "S", week: 7 },
  { from: "BR", to: "R", week: 8, learned: true },
  { from: "BR", to: "S", week: 8, learned: true },
  { from: "BR", to: "WH", week: 8, learned: true },
  { from: "BR", to: "WA", week: 8, learned: true },
];

const LEARNINGS = [
  "Mapped Northwind Freight and Helix Health, and their buyers.",
  "Security review came up on the Northwind call.",
  "Security review again at Helix. Pylon is waiting on budget timing.",
  "Won Helix Health. The security one-pager answered the objection.",
  "Corvid Labs added. Budget timing again.",
  "Atlas Corp expanded after a phased-budget proposal.",
  "Harbor & Co raised security review on the first call.",
  "Brief #10 for Harbor & Co cites the Helix win, the Atlas expansion and the security one-pager.",
];

const BY_ID = Object.fromEntries(NODES.map((n) => [n.id, n]));
const pct = (n: Node) => ({ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%` });

const STEP_MS = 1600;

export function MemoryGraph() {
  const reduce = usePrefersReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const focused = useLoopFocus(ref);
  // Arm slightly before the section is visible, so the reset to week 1
  // happens off-screen.
  const armed = useInView(ref, { once: true, margin: "0px 0px 400px 0px" });

  const [week, setWeek] = React.useState(WEEKS);
  const [playing, setPlaying] = React.useState(false);
  const [started, setStarted] = React.useState(false);

  if (armed && !started && !reduce) {
    setStarted(true);
    setWeek(1);
    setPlaying(true);
  }

  React.useEffect(() => {
    if (!playing || !focused || reduce) return;
    const id = setTimeout(() => {
      const next = Math.min(week + 1, WEEKS);
      setWeek(next);
      if (next >= WEEKS) setPlaying(false);
    }, STEP_MS);
    return () => clearTimeout(id);
  }, [playing, focused, reduce, week]);

  const shownWeek = reduce && !started ? WEEKS : week;
  const nodes = NODES.filter((n) => n.week <= shownWeek);
  const edges = EDGES.filter((e) => e.week <= shownWeek);
  const count = (k: Kind) => nodes.filter((n) => n.kind === k).length;
  const recent = LEARNINGS.slice(0, shownWeek).map((t, i) => ({ t, w: i + 1 })).reverse().slice(0, 3);

  function togglePlay() {
    if (playing) {
      setPlaying(false);
      return;
    }
    setStarted(true);
    if (week >= WEEKS) setWeek(1);
    setPlaying(true);
  }

  return (
    <Section id="memory" eyebrow="Memory">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <h2 className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]">
          Bots that remember{" "}
          <span className="text-muted-foreground/85">what your team learns.</span>
        </h2>
        <p className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground lg:pt-2">
          Agents build shared, dynamic memory from every conversation, call
          note and deal. What one agent learns, the rest of the pod can use,
          so the tenth brief is smarter than the first.
        </p>
      </div>

      <div
        ref={ref}
        className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]"
      >
        {/* Graph */}
        <figure
          aria-label="Example memory graph for an agent pod, growing week by week"
          className="terminal-corners relative flex flex-col rounded-lg border border-border/80 bg-card/60"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-3.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Shared memory · Enterprise pod
            </span>
            <span className="shrink-0 rounded-[3px] border border-border/80 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
              Example data
            </span>
          </div>

          <div className="relative m-4 aspect-[16/11] overflow-hidden rounded-md border border-border/60 bg-background/50 sm:m-5">
            <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-25" />
            <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full">
              <AnimatePresence initial={false}>
                {edges.map((e) => {
                  const a = BY_ID[e.from];
                  const b = BY_ID[e.to];
                  return (
                    <motion.line
                      key={`${e.from}-${e.to}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke={e.learned ? "oklch(0.78 0.13 152 / 75%)" : "oklch(1 0 0 / 22%)"}
                      strokeWidth={e.learned ? 0.6 : 0.45}
                      strokeDasharray={e.learned ? "1.4 1" : undefined}
                      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.7, ease: EASE_OUT, delay: reduce ? 0 : 0.25 }}
                    />
                  );
                })}
                {nodes.map((n) => (
                  <motion.g
                    key={n.id}
                    initial={reduce ? false : { scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 18 }}
                    style={{ originX: `${n.x}px`, originY: `${n.y}px` }}
                  >
                    <NodeMark n={n} />
                  </motion.g>
                ))}
              </AnimatePresence>
            </svg>

            {/* Labels in HTML so they stay a readable size at any width. On
                small screens only the objections, wins and the brief keep
                their labels. */}
            {nodes
              .filter((n) => n.label)
              .map((n) => (
                <motion.span
                  key={`label-${n.id}`}
                  aria-hidden
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: reduce ? 0 : 0.2 }}
                  className={cn(
                    "pointer-events-none absolute -translate-x-1/2 translate-y-[8px] whitespace-nowrap rounded-[3px] bg-background/85 px-1 font-mono text-[9.5px] tracking-[0.04em] sm:translate-y-[11px] sm:text-[10.5px]",
                    n.kind === "account" && "hidden text-foreground/90 sm:block",
                    n.kind === "objection" && "text-foreground/90",
                    (n.kind === "win" || n.kind === "brief") && "text-signal",
                  )}
                  style={pct(n)}
                >
                  {n.label}
                </motion.span>
              ))}
          </div>

          {/* Timeline */}
          <div className="mt-auto flex items-center gap-3 border-t border-border/60 px-5 py-3.5">
            <button
              type="button"
              onClick={togglePlay}
              disabled={reduce}
              aria-label={playing ? "Pause memory timeline" : "Play memory timeline"}
              className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border/80 text-foreground transition-colors hover:border-signal/50 hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal disabled:opacity-40"
            >
              {playing ? (
                <Pause weight="fill" className="size-3.5" aria-hidden />
              ) : (
                <Play weight="fill" className="size-3.5" aria-hidden />
              )}
            </button>
            <label htmlFor="memory-week" className="sr-only">
              Week
            </label>
            <input
              id="memory-week"
              type="range"
              min={1}
              max={WEEKS}
              step={1}
              value={shownWeek}
              aria-valuetext={`Week ${shownWeek} of ${WEEKS}`}
              onChange={(e) => {
                setStarted(true);
                setPlaying(false);
                setWeek(Number(e.target.value));
              }}
              className="h-1 min-w-0 flex-1 cursor-pointer accent-[oklch(0.78_0.13_152)]"
            />
            <span className="w-[82px] shrink-0 text-right font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground tabular-nums">
              Week {shownWeek}/{WEEKS}
            </span>
          </div>
        </figure>

        {/* What the pod knows */}
        <div className="terminal-corners relative flex flex-col rounded-lg border border-border/80 bg-card/60">
          <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-3.5">
            <h3 className="font-mono text-[10px] font-normal uppercase tracking-[0.22em] text-muted-foreground">
              What the pod knows · week {shownWeek}
            </h3>
            <span className="shrink-0 rounded-[3px] border border-border/80 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
              Example data
            </span>
          </div>

          <dl className="grid grid-cols-2 gap-px border-b border-border/60 bg-border/40">
            {(
              [
                ["Accounts", count("account"), "account"],
                ["People", count("person"), "person"],
                ["Objections", count("objection"), "objection"],
                ["Wins", count("win"), "win"],
              ] as const
            ).map(([label, value, kind]) => (
              <div key={label} className="flex items-center justify-between bg-card px-5 py-3.5">
                <dt className="flex items-center gap-2 text-[13px] text-muted-foreground">
                  <LegendMark kind={kind} />
                  {label}
                </dt>
                <dd className="font-mono text-[18px] tabular-nums text-foreground">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex-1 p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Latest learnings
            </div>
            <ol className="mt-3 min-h-[200px] space-y-3" aria-live="polite">
              {recent.map(({ t, w }) => (
                <li key={w} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 font-mono text-[10px] tabular-nums text-signal">
                    W{w}
                  </span>
                  <p
                    className={cn(
                      "text-[13.5px] leading-relaxed",
                      w === shownWeek ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {t}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <p className="border-t border-border/60 px-5 py-3 text-[12px] leading-snug text-muted-foreground">
            Eight weeks of a fictional pod. Every account, person and event
            here is made up.
          </p>
        </div>
      </div>
    </Section>
  );
}

function NodeMark({ n }: { n: Node }) {
  switch (n.kind) {
    case "account":
      return (
        <rect
          x={n.x - 2.6}
          y={n.y - 2.6}
          width={5.2}
          height={5.2}
          rx={1}
          fill="var(--card)"
          stroke="oklch(0.98 0 0 / 85%)"
          strokeWidth={0.6}
        />
      );
    case "person":
      return <circle cx={n.x} cy={n.y} r={1.5} fill="oklch(0.62 0.005 280)" />;
    case "objection":
      return (
        <rect
          x={n.x - 2.3}
          y={n.y - 2.3}
          width={4.6}
          height={4.6}
          transform={`rotate(45 ${n.x} ${n.y})`}
          fill="var(--card)"
          stroke="oklch(0.98 0 0 / 70%)"
          strokeWidth={0.6}
        />
      );
    case "win":
      return (
        <>
          <circle cx={n.x} cy={n.y} r={4.2} fill="oklch(0.78 0.13 152 / 18%)" />
          <circle cx={n.x} cy={n.y} r={2.5} fill="oklch(0.78 0.13 152)" />
        </>
      );
    case "brief":
      return (
        <>
          <rect
            x={n.x - 3.2}
            y={n.y - 4}
            width={6.4}
            height={8}
            rx={0.8}
            fill="var(--card)"
            stroke="oklch(0.78 0.13 152)"
            strokeWidth={0.7}
          />
          <line x1={n.x - 1.8} y1={n.y - 1.5} x2={n.x + 1.8} y2={n.y - 1.5} stroke="oklch(0.78 0.13 152)" strokeWidth={0.5} />
          <line x1={n.x - 1.8} y1={n.y + 0.5} x2={n.x + 1.8} y2={n.y + 0.5} stroke="oklch(0.78 0.13 152)" strokeWidth={0.5} />
          <line x1={n.x - 1.8} y1={n.y + 2.5} x2={n.x + 0.6} y2={n.y + 2.5} stroke="oklch(0.78 0.13 152)" strokeWidth={0.5} />
        </>
      );
  }
}

function LegendMark({ kind }: { kind: Kind }) {
  return (
    <svg aria-hidden viewBox="0 0 10 10" className="size-2.5 shrink-0">
      {kind === "account" && <rect x={1.5} y={1.5} width={7} height={7} rx={1} fill="none" stroke="currentColor" strokeWidth={1.2} className="text-foreground" />}
      {kind === "person" && <circle cx={5} cy={5} r={3} fill="oklch(0.62 0.005 280)" />}
      {kind === "objection" && <rect x={2.2} y={2.2} width={5.6} height={5.6} transform="rotate(45 5 5)" fill="none" stroke="currentColor" strokeWidth={1.2} className="text-foreground" />}
      {kind === "win" && <circle cx={5} cy={5} r={3.5} fill="oklch(0.78 0.13 152)" />}
    </svg>
  );
}
