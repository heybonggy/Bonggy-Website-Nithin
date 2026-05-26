"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/**
 * Hero mock , terminal-style "Mission Control" view of a Bonggy agent run.
 * IMPORTANT: total height is FIXED (640px on lg) so the section doesn't grow
 * when new signals get logged. Every inner panel has its own bounded scroll /
 * overflow handling , nothing pushes the page below.
 */

/**
 * Use cases SDRs actually struggle with , named in plain SDR language,
 * not Bonggy internals. Each rotates as the "Active Agent" with stats.
 */
const USE_CASES = [
  {
    id: "account-research",
    name: "account-research",
    skill: "pre-call-context",
    milestone: "before the call",
    preconditions: [
      "CRM synced , your list, not a marketplace list",
      "Closed-won corpus indexed",
      "Signal feeds connected (hires, raises, stacks)",
    ],
    expected: [
      "Walk into every call with the account's full context",
      "What changed in the last 30 days, summarised",
      "Who actually decides, mapped from public signals",
    ],
    description:
      "Stop spending 45 minutes researching every account before a call. Show up to a decision, not a blank doc.",
    stats: { drafts: 27, confidence: 0.89, accounts: 12, saved: "6.2 hrs/wk" },
  },
  {
    id: "first-line-drafting",
    name: "cold-opener",
    skill: "angle-finding",
    milestone: "the first send",
    preconditions: [
      "Brand voice + tone configured",
      "Signal sources active",
      "Past replies tagged by what worked",
    ],
    expected: [
      "A signal-backed opener per buyer, never recycled",
      "Tone matches your team's voice, not generic AI",
      "Angle tied to what changed at the account this week",
    ],
    description:
      "The first line is 80% of the reply rate. Stop guessing at it. Bonggy writes from a real reason.",
    stats: { drafts: 34, confidence: 0.92, accounts: 9, saved: "4.8 hrs/wk" },
  },
  {
    id: "prioritization",
    name: "account-prioritization",
    skill: "this-week-list",
    milestone: "monday morning",
    preconditions: [
      "Closed-won corpus indexed",
      "ICP fit model trained on your wins",
      "Top-200 account list defined",
    ],
    expected: [
      "Top 5 accounts to work today, ranked by intent",
      "Why each one is firing , not just the score",
      "Drop the wrong ones automatically",
    ],
    description:
      "Working the wrong accounts is the silent quota killer. We rank against what you actually close, not vendor data.",
    stats: { drafts: 21, confidence: 0.86, accounts: 14, saved: "5.4 hrs/wk" },
  },
  {
    id: "buying-window",
    name: "trigger-catcher",
    skill: "window-detection",
    milestone: "the right moment",
    preconditions: [
      "Champion graph built from past deals",
      "Event feeds active across LinkedIn / Crunchbase / SEC",
      "30-day window thresholds set",
    ],
    expected: [
      "Catch the 30-day window when an account opens",
      "Flag champion job-changes within 48h",
      "Surface re-orgs, raises, stack moves on day one",
    ],
    description:
      "Half the deals you lose, you reached too late. Bonggy catches the trigger before it cools.",
    stats: { drafts: 18, confidence: 0.94, accounts: 7, saved: "3.1 hrs/wk" },
  },
] as const;

type FeatureItem = { name: string; done: boolean };
/** Things SDRs struggle with day-to-day , checked off as Bonggy handles them. */
const INITIAL_FEATURES: FeatureItem[] = [
  { name: "account-research", done: true },
  { name: "first-line-drafting", done: true },
  { name: "prioritization", done: true },
  { name: "champion-mapping", done: true },
  { name: "follow-up-timing", done: false },
  { name: "personalization-at-scale", done: true },
  { name: "buying-window-detection", done: true },
];

type LogEntry = { id: number; time: string; worker: string; event: string; status: "started" | "done" };
const SEED_LOG: LogEntry[] = [
  { id: 1, time: "6m ago", worker: "#b3e81f4", event: "vp-sales-transition", status: "done" },
  { id: 2, time: "5m ago", worker: "#c4f92a5", event: "stack-migration", status: "done" },
  { id: 3, time: "4m ago", worker: "#d5a03b6", event: "federal-rfp", status: "done" },
  { id: 4, time: "3m ago", worker: "#e6b14c7", event: "earnings-beat", status: "done" },
  { id: 5, time: "2m ago", worker: "#f7c25d8", event: "series-b-closed", status: "done" },
  { id: 6, time: "1m ago", worker: "#08d36e9", event: "data-warehouse-swap", status: "done" },
  { id: 7, time: "now",   worker: "#19e47fa", event: "vp-product-hired", status: "started" },
];

const NEW_EVENTS = [
  "champion-promoted",
  "soc2-passed",
  "cro-hired",
  "earnings-beat",
  "stack-migration",
  "series-b-closed",
  "vp-sales-transition",
  "rfp-posted",
];

export function CommandCenterMock({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [progress, setProgress] = React.useState(7);
  const [features, setFeatures] = React.useState(INITIAL_FEATURES);
  const [log, setLog] = React.useState<LogEntry[]>(SEED_LOG);
  const [workerLine, setWorkerLine] = React.useState(0);
  const [agentIdx, setAgentIdx] = React.useState(0);
  const counter = React.useRef(100);

  // Visibility gate: all the rotating-state intervals below depend on this,
  // so the mock stops doing work the moment it's scrolled off-screen.
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Progress bar 7→13 then resets
  React.useEffect(() => {
    if (reduce || !visible) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 12 ? 7 : p + 1));
    }, 2520);
    return () => clearInterval(id);
  }, [reduce, visible]);

  React.useEffect(() => {
    if (reduce || !visible) return;
    const id = setInterval(() => {
      setFeatures((prev) => {
        const allDone = prev.every((f) => f.done);
        if (allDone) return prev.map((f) => (f.name === "follow-up-timing" ? { ...f, done: false } : f));
        return prev.map((f) => (!f.done ? { ...f, done: true } : f));
      });
    }, 4480);
    return () => clearInterval(id);
  }, [reduce, visible]);

  // Signal Log , new entries push in, oldest drops off; ALWAYS 7 items
  React.useEffect(() => {
    if (reduce || !visible) return;
    const id = setInterval(() => {
      setLog((prev) => {
        counter.current += 1;
        const c = counter.current;
        const fresh: LogEntry = {
          id: c,
          time: "now",
          worker: `#${c.toString(16).padStart(2, "0").slice(0, 3)}${(c * 7).toString(16).slice(0, 4)}`,
          event: NEW_EVENTS[c % NEW_EVENTS.length],
          status: "started",
        };
        const aged: LogEntry[] = prev.map((e, i) => ({
          ...e,
          status: i === 0 ? ("done" as const) : e.status,
          time:
            i === 0 ? "1m ago" :
            i < 4 ? `${i + 1}m ago` :
            `${i + 2}m ago`,
        }));
        return [fresh, ...aged].slice(0, 7);
      });
    }, 3360);
    return () => clearInterval(id);
  }, [reduce, visible]);

  // Active Worker line cycles
  React.useEffect(() => {
    if (reduce || !visible) return;
    const id = setInterval(() => {
      setWorkerLine((l) => (l + 1) % 4);
    }, 3080);
    return () => clearInterval(id);
  }, [reduce, visible]);

  // Active Agent cycles
  React.useEffect(() => {
    if (reduce || !visible) return;
    const id = setInterval(() => {
      setAgentIdx((i) => (i + 1) % USE_CASES.length);
    }, 9100);
    return () => clearInterval(id);
  }, [reduce]);

  const agent = USE_CASES[agentIdx];

  return (
    <div
      ref={rootRef}
      className={cn(
        // Forced dark scope: the terminal mock is meant to look like a real
        // terminal, which is always dark on any theme. All `bg-card`/`text-*`
        // tokens inside resolve to dark values regardless of site theme.
        "dark",
        "relative flex w-full max-w-full flex-col overflow-hidden rounded-bento border border-border/80 bg-card/95 font-mono text-foreground shadow-diffusion",
        // Responsive fixed heights , shorter on mobile so the section doesn't dominate phones
        "h-[552px] sm:h-[632px] lg:h-[672px]",
        className,
      )}
    >
      {/* Window chrome */}
      <div className="relative flex h-9 items-center justify-center border-b border-border/60 bg-background/60 px-4 text-[11px]">
        <div className="absolute left-4 flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-muted-foreground truncate">
          bonggy -- Command Centre -- 140x46
        </span>
      </div>

      {/* Header row */}
      <div className="flex h-10 items-center justify-between border-b border-border/60 px-4 text-[11px]">
        <div className="flex items-center gap-3 truncate">
          <span className="text-signal whitespace-nowrap">★ Command Centre</span>
          <span className="hidden truncate text-muted-foreground/80 sm:inline">
            ~/outbound/{agent.id}
          </span>
        </div>
        <div className="hidden whitespace-nowrap items-center gap-3 text-muted-foreground/80 sm:flex">
          <span>Credits <span className="text-foreground/85">2.6M</span></span>
          <span>·</span>
          <span>TIME <span className="text-foreground/85">29m 46s</span></span>
        </div>
      </div>

      {/* RUNNING progress bar */}
      <div className="flex h-10 items-center gap-3 border-b border-border/60 px-4 text-[11px]">
        <span className="inline-flex items-center gap-1.5 text-signal">
          <motion.span
            className="size-1.5 rounded-full bg-signal"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          RUNNING
        </span>
        <div className="relative h-2 flex-1 overflow-hidden rounded-sm border border-border/60 bg-background/60">
          <motion.div
            initial={false}
            animate={{ width: `${(progress / 13) * 100}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 24 }}
            className="h-full bg-signal"
            style={{ boxShadow: "0 0 12px oklch(0.78 0.13 152 / 50%)" }}
          />
        </div>
        <span className="whitespace-nowrap text-muted-foreground/90 tabular-nums">
          <span className="text-foreground/85">{progress}</span>/13
        </span>
      </div>

      {/* Body , two-column. Each column has fixed height and own overflow handling. */}
      <div className="grid h-[280px] grid-cols-1 sm:h-[340px] sm:grid-cols-[1.05fr_1fr] lg:h-[380px]">
        {/* LEFT , Rotating Active Agent */}
        <div className="relative overflow-hidden border-b border-border/60 px-4 py-3 text-[11px] leading-relaxed sm:border-b-0 sm:border-r">
          <AnimatePresence mode="wait">
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-hidden px-4 py-3"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-foreground/90">Active Agent</span>
                <span className="truncate text-muted-foreground/80">{agent.name}</span>
              </div>
              <div className="space-y-0.5 text-muted-foreground/85">
                <div>
                  <span className="text-muted-foreground/60">skill   </span>
                  {agent.skill}
                </div>
                <div>
                  <span className="text-muted-foreground/60">milestone</span> {agent.milestone}
                </div>
              </div>

              <div className="mt-2.5 space-y-0.5">
                <div className="text-foreground/90">Preconditions</div>
                <ul className="space-y-0.5 text-muted-foreground/85">
                  {agent.preconditions.map((p) => (
                    <li key={p} className="truncate">• {p}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-2.5 space-y-0.5">
                <div className="text-foreground/90">Expected Behavior</div>
                <ul className="space-y-0.5 text-muted-foreground/85">
                  {agent.expected.map((p) => (
                    <li key={p} className="truncate">• {p}</li>
                  ))}
                </ul>
              </div>

              {/* Stats , confidence, drafts, accounts, hours saved */}
              <div className="mt-3 grid grid-cols-2 gap-2 rounded-md border border-border/60 bg-background/40 p-2.5">
                <Stat label="Drafts generated" value={`${agent.stats.drafts}+`} />
                <Stat label="Confidence" value={`${Math.round(agent.stats.confidence * 100)}%`} highlight />
                <Stat label="Accounts surfaced" value={String(agent.stats.accounts)} />
                <Stat label="Saved" value={agent.stats.saved} />
              </div>

              <p className="mt-2.5 line-clamp-2 text-muted-foreground/85">
                {agent.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT , Features + Signal Log (constrained scroll) */}
        <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden">
          {/* Agents checklist (top) */}
          <div className="border-b border-border/60 px-4 py-3 text-[11px] leading-relaxed">
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-foreground/90">Agents</span>
              <span className="tabular-nums text-muted-foreground/70">
                {features.filter((f) => f.done).length}/{features.length}
              </span>
            </div>
            <ul className="space-y-0.5">
              {features.slice(0, 5).map((f) => (
                <li key={f.name} className="flex items-center gap-2 text-muted-foreground/85">
                  <span className="flex size-3 items-center justify-center">
                    {f.done ? (
                      <Check weight="bold" className="size-3 text-signal" />
                    ) : (
                      <span className="text-muted-foreground/40">◌</span>
                    )}
                  </span>
                  <span className="truncate">{f.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Signal Log , fixed-height container, items slide within it */}
          <div className="flex min-h-0 flex-col overflow-hidden px-4 pb-3 pt-2.5 text-[10.5px] leading-relaxed">
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-foreground/90 text-[11px]">Signal Log</span>
              <span className="text-muted-foreground/60">live</span>
            </div>
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false}>
                {log.map((e) => (
                  <motion.div
                    key={e.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    className="grid grid-cols-[44px_1fr_14px] items-baseline gap-2 py-[2px] text-muted-foreground/85"
                  >
                    <span className="tabular-nums text-muted-foreground/60">
                      {e.time}
                    </span>
                    <span className="truncate">
                      {e.status === "started" ? "started " : "completed "}
                      [<span className="text-signal">{e.event}</span>]
                    </span>
                    <span className="text-right text-signal">
                      {e.status === "done" ? "✓" : ""}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {/* Bottom fade so out-of-view items soften */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card/95 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Worker panel , fixed height */}
      <div className="h-[120px] border-t border-border/60 px-4 py-2.5 text-[11px] leading-relaxed">
        <div className="mb-1.5 flex items-baseline justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="text-foreground/90">Active Worker</span>
            <span className="text-muted-foreground/70">#7</span>
            <span className="truncate text-muted-foreground/80">
              {agent.id}
            </span>
          </div>
          <span className="whitespace-nowrap tabular-nums text-muted-foreground/70">
            Duration 6m 02s
          </span>
        </div>
        <div className="space-y-0.5 text-muted-foreground/85">
          <WorkerRow verb="Read" value="accounts.json (312 lines)" active={workerLine === 0} />
          <WorkerRow verb="Score" value="closed-won corpus · 94 ranked" active={workerLine === 1} />
          <WorkerRow verb="Draft" value={`outreach.tsx · ${agent.stats.drafts} queued`} active={workerLine === 2} />
          <WorkerRow verb="Queue" value="awaiting human approval" highlight active={workerLine === 3} />
        </div>
      </div>

      {/* Hotkey footer , single-line, never wraps. Less-essential keys
          (Pause, Models) hide below sm so 'M Models' doesn't spill onto a
          second row and get half-clipped by the fixed-height bar. */}
      <div className="mt-auto flex h-8 w-full items-center gap-x-3 overflow-hidden whitespace-nowrap border-t border-border/60 bg-background/40 px-3 text-[10px] text-muted-foreground/80 sm:gap-x-4 sm:px-4">
        <Hotkey k="A" label="Accounts" />
        <Hotkey k="S" label="Signals" />
        <Hotkey k="D" label="Drafts" />
        <Hotkey k="P" label="Pause" className="hidden sm:inline-flex" />
        <Hotkey k="M" label="Models" className="hidden sm:inline-flex" />
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[9.5px] uppercase tracking-wider text-muted-foreground/65">
        {label}
      </span>
      <span
        className={cn(
          "text-[14px] tabular-nums",
          highlight ? "text-signal" : "text-foreground/90",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function WorkerRow({
  verb,
  value,
  active,
  highlight,
}: {
  verb: string;
  value: string;
  active?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="grid grid-cols-[55px_1fr] items-baseline gap-3">
      <span
        className={cn(
          "tabular-nums",
          active ? "text-signal" : "text-muted-foreground/70",
        )}
      >
        {verb}
      </span>
      <span
        className={cn(
          "truncate",
          highlight ? "text-foreground/90" : "text-muted-foreground/85",
        )}
      >
        {value}
        {active && (
          <motion.span
            className="ml-1 inline-block h-3 w-px translate-y-0.5 bg-signal"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </span>
    </div>
  );
}

function Hotkey({
  k,
  label,
  className,
}: {
  k: string;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap",
        className,
      )}
    >
      <kbd className="rounded border border-border/60 bg-background/60 px-1 text-[9px] text-foreground/80">
        {k}
      </kbd>
      <span>{label}</span>
    </span>
  );
}
