"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence, useInView } from "motion/react";
import {
  CornersOut,
  Check,
  X,
  CircleNotch,
  Lightning,
  TrendUp,
  UsersThree,
  Pulse,
  Stack,
  PaperPlaneTilt,
  CursorClick,
  CurrencyDollar,
  BuildingOffice,
  Globe,
} from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { SPRING, SPRING_BOUNCE } from "./_motion";
import { cn } from "@/lib/utils";

const PROMPTS = [
  "Mira sent 12 emails today · 9 to in-ICP accounts · 3 outside.",
  "Dev logged a call · Atlas Corp · 14 min · tied to Q4 mid-market goal.",
  "Lin moved 4 deals to stage 3 · all inside the named-account list.",
];

/* Detailed signals , 5 rows worth, with source / actor / time so it reads like real intel */
type Signal = {
  co: string;
  event: string;
  detail: string;
  time: string;
  source: string;
  Icon: React.ComponentType<{ className?: string; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }>;
  tone: "hot" | "warm" | "cool";
};

const SIGNALS: Signal[][] = [
  [
 { co: "Mira S.", event: "Sent 9 emails", detail: "All to Q4 mid-market ICP", time: "2m", source: "Outreach", Icon: PaperPlaneTilt, tone: "hot" },
 { co: "Dev P.", event: "Logged a call", detail: "Atlas Corp · 14 min · on-goal", time: "8m", source: "Aircall", Icon: UsersThree, tone: "hot" },
 { co: "Lin H.", event: "Moved 4 deals", detail: "Stage 2 → 3 · named accounts", time: "14m", source: "Salesforce", Icon: TrendUp, tone: "warm" },
 { co: "Tom J.", event: "Worked 6 accounts", detail: "4 outside the Q4 ICP", time: "21m", source: "HubSpot", Icon: Stack, tone: "cool" },
  ],
  [
 { co: "Ana R.", event: "Renewal note added", detail: "Tied to expansion goal", time: "31m", source: "Gong", Icon: CurrencyDollar, tone: "warm" },
 { co: "Kit M.", event: "Replied in thread", detail: "Helix Health · expansion", time: "44m", source: "Slack", Icon: UsersThree, tone: "warm" },
 { co: "Mira S.", event: "Booked a meeting", detail: "In-ICP · Northwind", time: "52m", source: "Calendly", Icon: TrendUp, tone: "hot" },
 { co: "Rae B.", event: "Sent 40 emails", detail: "None on the named list", time: "1h", source: "Apollo", Icon: PaperPlaneTilt, tone: "cool" },
  ],
  [
 { co: "Dev P.", event: "Updated 3 stages", detail: "All on the Q4 segment", time: "1h", source: "Salesforce", Icon: TrendUp, tone: "warm" },
 { co: "Nia F.", event: "Logged handoff", detail: "Full discovery passed to AE", time: "2h", source: "Notion", Icon: UsersThree, tone: "hot" },
 { co: "Sol K.", event: "Pulled an old list", detail: "Last quarter's segment", time: "2h", source: "HubSpot", Icon: Stack, tone: "cool" },
 { co: "Lin H.", event: "Sent a follow-up", detail: "On-strategy · Pylon", time: "3h", source: "Gmail", Icon: PaperPlaneTilt, tone: "warm" },
  ],
  [
 { co: "Kit M.", event: "Flagged churn risk", detail: "Mapped to renewal goal", time: "3h", source: "Gong", Icon: Globe, tone: "hot" },
 { co: "Ana R.", event: "Expansion call", detail: "22 min · revenue-linked", time: "4h", source: "Aircall", Icon: UsersThree, tone: "warm" },
 { co: "Jae P.", event: "No effort logged", detail: "Renewal account at risk", time: "4h", source: "Salesforce", Icon: BuildingOffice, tone: "cool" },
 { co: "Dev P.", event: "Sent a recap", detail: "Atlas Corp · on-goal", time: "5h", source: "Gmail", Icon: PaperPlaneTilt, tone: "warm" },
  ],
  [
 { co: "Mira S.", event: "Researched 5 accounts", detail: "All inside Q4 ICP", time: "5h", source: "LinkedIn", Icon: TrendUp, tone: "warm" },
 { co: "Tom J.", event: "Sent 30 emails", detail: "62% off the named list", time: "6h", source: "Outreach", Icon: PaperPlaneTilt, tone: "cool" },
 { co: "Nia F.", event: "Renewal secured", detail: "Effort tied to the goal", time: "7h", source: "Salesforce", Icon: CurrencyDollar, tone: "hot" },
 { co: "Lin H.", event: "Logged 4 tasks", detail: "On named accounts", time: "8h", source: "Asana", Icon: Stack, tone: "warm" },
  ],
];

/* Approval queue , much larger pool, each marked approve | reject */
type Approval = {
  id: string;
  company: string;
  subject: string;
  decision: "approve" | "reject";
};

const QUEUE_POOL: Approval[] = [
  { id: "q1", company: "Mira S. · SDR", subject: "94% on Q4 ICP", decision: "approve" },
  { id: "q2", company: "Dev P. · AE", subject: "88% on named accounts", decision: "approve" },
  { id: "q3", company: "Ana R. · AM", subject: "Renewal effort tied to goal", decision: "approve" },
  { id: "q4", company: "Tom J. · SDR", subject: "62% on out-of-ICP accounts", decision: "reject" },
  { id: "q5", company: "Kit M. · CS", subject: "Expansion mapped to revenue", decision: "approve" },
  { id: "q6", company: "Rae B. · AE", subject: "Stalled on dead accounts", decision: "reject" },
  { id: "q7", company: "Lin H. · AE", subject: "71% on-strategy", decision: "approve" },
  { id: "q8", company: "Sol K. · SDR", subject: "Working last quarter's list", decision: "reject" },
  { id: "q9", company: "Nia F. · AM", subject: "Full handoff context", decision: "approve" },
  { id: "q10", company: "Jae P. · CS", subject: "Renewal at risk, no effort", decision: "reject" },
];

export function HowItWorks() {
  // Single in-view gate for the whole demo grid. Every JS-driven loop below
  // (typing, ticking counters, the approval queue, the workflow particles)
  // only runs while the grid is near the viewport, so the section stops
  // burning CPU when the user is elsewhere on the page.
  const gridRef = React.useRef<HTMLDivElement>(null);
  const active = useInView(gridRef, { margin: "300px 0px 300px 0px" });

  return (
 <Section id="how-it-works" eyebrow="Every seat, made legible">
 <motion.h2
 initial={{ y: 14 }}
 whileInView={{ y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={SPRING}
 className="text-display max-w-[24ch] text-balance text-[36px] font-medium leading-none tracking-tight sm:text-[44px] lg:text-[56px]"
 >
 One layer.{" "}
 <span className="text-muted-foreground/85">
 Every role finally sees the same picture.
 </span>
 </motion.h2>

 <div ref={gridRef} className="mt-14 grid auto-rows-[300px] grid-cols-1 gap-3 sm:auto-rows-[320px] lg:auto-rows-[340px] lg:grid-cols-10 lg:gap-4">
 <BentoCard className="lg:col-span-4" step="01" title="Observe" sub="Effort in, from every tool.">
 <CommandInputDemo active={active} />
 </BentoCard>

 <BentoCard className="lg:col-span-3" step="02" title="Align" sub="Mapped to the goal.">
 <WorkflowDemo active={active} />
 </BentoCard>

 <BentoCard className="lg:col-span-3" step="03" title="Surface the drift" sub="Reps off-strategy, flagged.">
 <ApprovalDemo active={active} />
 </BentoCard>

 <BentoCard
 className="lg:col-span-7 lg:row-span-2"
 step=""
 title="Effort feed"
 sub="Every action across the team, live."
 tallContent
 >
 <SignalStreamDemo />
 </BentoCard>

 <BentoCard className="lg:col-span-3" step="" title="Reps on-goal" sub="Right now.">
 <AgentStatusDemo />
 </BentoCard>

 <BentoCard className="lg:col-span-3" step="" title="Revenue coverage" sub="Effort that points at revenue.">
 <ThroughputDemo active={active} />
 </BentoCard>
 </div>
 </Section>
  );
}

function BentoCard({
  step,
  title,
  sub,
  className,
  children,
  tallContent,
}: {
  step: string;
  title: string;
  sub: string;
  className?: string;
  children: React.ReactNode;
  tallContent?: boolean;
}) {
  return (
 <motion.article
 initial={{ y: 16 }}
 whileInView={{ y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={SPRING}
 className={cn(
 "terminal-corners group relative flex flex-col overflow-hidden rounded-bento border border-border/80 bg-card/60 shadow-diffusion-sm",
 className,
 )}
 >
 <div className={cn("relative flex-1 overflow-hidden", tallContent && "min-h-0")}>
 {children}
 </div>
 <div className="border-t border-border/60 px-5 py-4">
 <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
 {step ? <span className="tabular-nums text-signal/80">{step}</span> : null}
 <span className="ascii-rule h-px flex-1" />
 <span>{sub}</span>
 </div>
 <h3 className="text-[15.5px] font-medium tracking-tight text-foreground">
 {title}
 </h3>
 </div>
 </motion.article>
  );
}

/* ───────────────── Card 01 · Command Input archetype ───────────────── */

function CommandInputDemo({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = React.useState(0);
  const [typed, setTyped] = React.useState(reduce ? PROMPTS[0] : "");
  const [phase, setPhase] = React.useState<"typing" | "compiling">("typing");

  React.useEffect(() => {
 if (reduce || !active) return;
 let i = 0;
 let timer: ReturnType<typeof setTimeout>;
 const current = PROMPTS[idx];
 setPhase("typing");
 setTyped("");

 const tick = () => {
 i += 1;
 setTyped(current.slice(0, i));
 if (i < current.length) {
 timer = setTimeout(tick, 28 + Math.random() * 32);
 } else {
 timer = setTimeout(() => setPhase("compiling"), 1200);
 timer = setTimeout(() => setIdx((p) => (p + 1) % PROMPTS.length), 4800);
 }
 };
 timer = setTimeout(tick, 500);
 return () => clearTimeout(timer);
  }, [idx, reduce, active]);

  return (
 <div className="flex h-full flex-col gap-3 p-5">
 <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
 <CursorClick weight="regular" className="size-3.5" />
 Reading effort
 </div>

 <div className="relative flex-1 rounded-xl border border-border/60 bg-background/60 p-4">
 <div className="text-[13px] leading-relaxed text-foreground">
 {typed}
 <span className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 bg-signal" />
 </div>
 </div>

 <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-[11px] text-muted-foreground">
 <div className="flex items-center gap-2">
 <AnimatePresence mode="wait">
 {phase === "compiling" ? (
 <motion.div
 key="compiling"
 initial={{ y: -4 }}
 animate={{ y: 0 }}
 exit={{ y: 4 }}
 transition={SPRING_BOUNCE}
 className="flex items-center gap-1.5"
 >
 <CircleNotch
 weight="bold"
 className="size-3 animate-spin text-signal"
 />
 <span>Mapping to goal</span>
 </motion.div>
 ) : (
 <motion.div
 key="ready"
 initial={{ y: -4 }}
 animate={{ y: 0 }}
 exit={{ y: 4 }}
 transition={SPRING_BOUNCE}
 className="flex items-center gap-1.5"
 >
 <span className="size-1.5 rounded-full bg-signal pulse-signal" />
 <span>Reading live</span>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
 14 tools
 </kbd>
 </div>
 </div>
  );
}

/* ───────────────── Card 02 · Workflow with LIVE counters + flowing particles ───────────────── */

function useTickingCounter(target: number, increment = 1, intervalMs = 1960, active = true) {
  const [val, setVal] = React.useState(target);
  const reduce = useReducedMotion();
  React.useEffect(() => {
 if (reduce || !active) return;
 const id = setInterval(() => {
 setVal((v) => v + Math.random() < 0.65 ? v + increment + Math.floor(Math.random() * 2) : v);
 }, intervalMs + Math.random() * 800);
 return () => clearInterval(id);
  }, [reduce, increment, intervalMs, active]);
  return val;
}

function WorkflowDemo({ active }: { active: boolean }) {
  const eventsCount = useTickingCounter(847, 2, 1540, active);
  const accountsCount = useTickingCounter(94, 1, 3360, active);
  const draftsCount = useTickingCounter(31, 1, 4480, active);

  const NODES = [
 { label: "Action", Icon: Pulse, x: 22, y: 28, count: eventsCount, unit: "actions" },
 { label: "Account", Icon: CornersOut, x: 50, y: 28, count: accountsCount, unit: "accts" },
 { label: "Goal", Icon: Lightning, x: 50, y: 78, count: accountsCount, unit: "mapped" },
 { label: "On-goal", Icon: PaperPlaneTilt, x: 78, y: 78, count: draftsCount, unit: "accts" },
  ];

  return (
 <div className="relative flex h-full flex-col overflow-hidden p-5">
 <div className="absolute inset-0 bg-grid-fine opacity-30" />

 {/* Concentric pulse around the Watch node — only mounted while in view */}
 {active && (
 <div
 className="pointer-events-none absolute"
 style={{ left: `${NODES[0].x}%`, top: `${NODES[0].y}%`, transform: "translate(-50%, -50%)" }}
 >
 {[0, 1].map((i) => (
 <motion.span
 key={i}
 className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/40"
 animate={{ scale: [0.4, 2.2], opacity: [0.6, 0] }}
 transition={{
 duration: 3.8,
 repeat: Infinity,
 delay: i * 1.4,
 ease: "easeOut",
 }}
 />
 ))}
 </div>
 )}

 <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="text-foreground absolute inset-0 size-full">
 <defs>
 <linearGradient id="wf-stroke" x1="0" x2="1">
 {/* Start/end stops use currentColor so they invert per theme;
 middle stop stays signal mint */}
 <stop offset="0%" stopColor="currentColor" stopOpacity={0.18} />
 <stop offset="50%" stopColor="oklch(0.78 0.13 152 / 45%)" />
 <stop offset="100%" stopColor="currentColor" stopOpacity={0.18} />
 </linearGradient>
 </defs>

 {/* Path: Watch → Cluster → Score → Draft (turns at Cluster going down) */}
 <path
 d="M 14,28 L 50,28 L 50,78 L 86,78"
 fill="none"
 stroke="url(#wf-stroke)"
 strokeWidth="0.5"
 strokeDasharray="0.6 1.2"
 />

 {/* Flowing particles — only mounted while in view */}
 {active &&
 [0, 2.2].map((delay, i) => (
 <motion.circle
 key={i}
 r="0.7"
 fill="oklch(0.85 0.14 152)"
 animate={{ offsetDistance: ["0%", "100%"] }}
 transition={{
 duration: 4.5,
 repeat: Infinity,
 delay,
 ease: "linear",
 }}
 style={{
 offsetPath: "path('M 14,28 L 50,28 L 50,78 L 86,78')",
 }}
 />
 ))}
 </svg>

 {NODES.map((n, i) => (
 <motion.div
 key={n.label}
 initial={{ y: 6 }}
 animate={{ y: 0 }}
 transition={{ ...SPRING_BOUNCE, delay: 0.2 + i * 0.1 }}
 className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
 style={{ left: `${n.x}%`, top: `${n.y}%` }}
 >
 <div
 className="flex items-center gap-1 whitespace-nowrap rounded-md border border-border/80 bg-background/95 px-1.5 py-1 font-mono text-[9.5px] uppercase tracking-wider "
 style={{
 boxShadow:
 "var(--shadow-button-base), inset 0 1px 0 var(--inset-highlight)",
 }}
 >
 <n.Icon weight="fill" className="size-3 text-signal" />
 <span className="text-foreground">{n.label}</span>
 <span className="tabular-nums text-foreground/90">
 {n.count.toLocaleString()}
 </span>
 </div>
 </motion.div>
 ))}
 </div>
  );
}

/* ───────────────── Card 03 · Approval queue with ✓ and ✗, continuous flow ───────────────── */

type QueueItem = Approval & { status: "pending" | "approved" | "rejected"; key: number };

function ApprovalDemo({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const [items, setItems] = React.useState<QueueItem[]>(() =>
 QUEUE_POOL.slice(0, 4).map((a, i) => ({ ...a, status: "pending", key: i })),
  );
  const counter = React.useRef(4);

  React.useEffect(() => {
 if (reduce || !active) return;
 const tick = () => {
 setItems((prev) => {
 if (!prev.length) return prev;

 const next = [...prev];
 const pendingIdx = next.findIndex((i) => i.status === "pending");

 if (pendingIdx === -1) {
 // none pending , pop the oldest decided + add a new pending
 next.shift();
 const fresh = QUEUE_POOL[counter.current % QUEUE_POOL.length];
 counter.current += 1;
 next.push({ ...fresh, status: "pending", key: counter.current });
 return next;
 }

 // Decide the oldest pending
 const decided = { ...next[pendingIdx], status: next[pendingIdx].decision === "approve" ? "approved" : "rejected" } as QueueItem;
 next[pendingIdx] = decided;
 return next;
 });
 };
 const id = setInterval(tick, 2100);
 return () => clearInterval(id);
  }, [reduce, active]);

  return (
 <div className="flex h-full flex-col gap-2.5 p-5">
 <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
 <div className="flex items-center gap-1.5">
 <PaperPlaneTilt weight="regular" className="size-3.5" />
 Drift check
 </div>
 <div className="flex items-center gap-3">
 <span className="flex items-center gap-1">
 <Check weight="bold" className="size-2.5 text-signal" />
 <span className="tabular-nums">{items.filter((i) => i.status === "approved").length}</span>
 </span>
 <span className="flex items-center gap-1">
 <X weight="bold" className="size-2.5 text-muted-foreground/60" />
 <span className="tabular-nums">{items.filter((i) => i.status === "rejected").length}</span>
 </span>
 </div>
 </div>

 <div className="relative flex-1 overflow-hidden">
 <AnimatePresence initial={false}>
 {items.map((item, idx) => (
 <motion.div
 key={item.key}
 layout
 initial={{ y: 28, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 exit={{ y: -28, opacity: 0 }}
 transition={{ ...SPRING_BOUNCE, layout: SPRING }}
 className={cn(
 "mb-1.5 flex items-center gap-2 rounded-lg border border-border/60 bg-background/50 px-2.5 py-2 text-[11.5px] transition-colors",
 item.status === "approved" && "border-signal/30 bg-signal/[0.05]",
 item.status === "rejected" && "border-destructive/30 bg-destructive/[0.05]",
 )}
 >
 <div
 className={cn(
 "flex size-4 flex-none items-center justify-center rounded-full border transition-colors",
 item.status === "approved" && "border-signal bg-signal text-signal-foreground",
 item.status === "rejected" && "border-destructive/50 bg-background text-destructive",
 item.status === "pending" && "border-border bg-background text-muted-foreground/60",
 )}
 >
 {item.status === "approved" && (
 <motion.span
 initial={{ scale: 0 }}
 animate={{ scale: 1 }}
 transition={SPRING_BOUNCE}
 >
 <Check weight="bold" className="size-2.5" />
 </motion.span>
 )}
 {item.status === "rejected" && (
 <motion.span
 initial={{ scale: 0 }}
 animate={{ scale: 1 }}
 transition={SPRING_BOUNCE}
 >
 <X weight="bold" className="size-2.5" />
 </motion.span>
 )}
 {item.status === "pending" && (
 <span className="size-1 rounded-full bg-muted-foreground/50" />
 )}
 </div>
 <div className="min-w-0 flex-1">
 <div className={cn("truncate font-medium", item.status === "rejected" ? "text-destructive" : "text-foreground")}>
 {item.company}
 </div>
 <div className="truncate text-[10.5px] text-muted-foreground">
 {item.subject}
 </div>
 </div>
 </motion.div>
 ))}
 </AnimatePresence>
 </div>
 </div>
  );
}

/* ───────────────── Live signal feed · 5 rows, slow, detail-rich ───────────────── */

function SignalStreamDemo() {
  return (
 <div className="relative flex h-full flex-col gap-3 overflow-hidden p-5 sm:p-6">
 <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
 <div className="flex items-center gap-1.5">
 <Pulse weight="fill" className="size-3.5 text-signal" />
 <span>Reading 14 tools</span>
 </div>
 <div className="flex items-center gap-3">
 <span>
 <span className="text-foreground/70 tabular-nums">1,247</span> actions this week
 </span>
 <span className="size-1 rounded-full bg-signal pulse-signal" />
 </div>
 </div>

 <div className="relative flex flex-1 flex-col justify-center gap-2.5 overflow-hidden">
 <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-card/95 to-transparent" />
 <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-card/95 to-transparent" />

 {SIGNALS.map((row, ri) => (
 <SignalRow key={ri} row={row} direction={ri % 2 === 0 ? "left" : "right"} speedSec={70 + ri * 8} />
 ))}
 </div>
 </div>
  );
}

function SignalRow({
  row,
  direction,
  speedSec,
}: {
  row: Signal[];
  direction: "left" | "right";
  speedSec: number;
}) {
  const tripled = [...row, ...row, ...row];
  return (
 <div className="flex w-max items-center gap-3 whitespace-nowrap">
 <div
 className={cn(
 "signal-marquee flex w-max items-center gap-3",
 direction === "left" ? "signal-marquee--left" : "signal-marquee--right",
 )}
 style={{ animationDuration: `${speedSec}s` }}
 >
 {tripled.map((s, i) => (
 <SignalPill key={`${s.co}-${i}`} signal={s} />
 ))}
 </div>
 </div>
  );
}

function SignalPill({ signal: s }: { signal: Signal }) {
  return (
 <div className="flex items-center gap-2.5 rounded-full border border-border/80 bg-background/60 py-1.5 pl-2 pr-3 ">
 <span
 className={cn(
 "flex size-6 items-center justify-center rounded-full",
 s.tone === "hot"
 ? "bg-signal/15 text-signal"
 : s.tone === "warm"
 ? "bg-foreground/[0.08] text-foreground"
 : "bg-foreground/[0.04] text-muted-foreground",
 )}
 >
 <s.Icon weight="regular" className="size-3" />
 </span>
 <span className="text-[12px] font-medium tracking-tight text-foreground">
 {s.co}
 </span>
 <span className="font-mono text-[10px] text-muted-foreground">{s.event}</span>
 <span className="font-mono text-[10px] text-muted-foreground/60">·</span>
 <span className="text-[11px] text-muted-foreground/85">{s.detail}</span>
 <span className="font-mono text-[10px] text-muted-foreground/50">{s.source} · {s.time}</span>
 </div>
  );
}

/* ───────────────── Agent status , Live counter card ───────────────── */

function AgentStatusDemo() {
  return (
 <div className="relative flex h-full flex-col justify-between p-5">
 <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
 <Lightning weight="fill" className="size-3.5 text-signal" />
 On-strategy
 </div>

 <div>
 <div className="font-mono text-[64px] font-medium leading-none text-foreground tabular-nums">
 18<span className="text-[28px] text-muted-foreground/60">/21</span>
 </div>
 <div className="mt-1 text-[12px] text-muted-foreground">
 reps on-goal right now
 </div>
 </div>

 <div className="space-y-1.5">
 {[
 { label: "SDR team", count: "6/7" },
 { label: "AE team", count: "8/9" },
 { label: "CS team", count: "4/5" },
 ].map((a) => (
 <div
 key={a.label}
 className="flex items-center justify-between text-[11px] text-muted-foreground"
 >
 <span>{a.label}</span>
 <div className="flex items-center gap-2">
 <span className="font-mono text-[10px] tabular-nums text-foreground/60">
 {a.count}
 </span>
 <span className="size-1.5 rounded-full bg-signal pulse-signal" />
 </div>
 </div>
 ))}
 </div>
 </div>
  );
}

/* ───────────────── Throughput tile , sparkline + counter ───────────────── */

function ThroughputDemo({ active }: { active: boolean }) {
  const actionsToday = useTickingCounter(214, 3, 900, active);

  return (
 <div className="relative flex h-full flex-col justify-between p-5">
 <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
 <Pulse weight="regular" className="size-3.5" />
 Revenue coverage · 24h
 </div>

 <div>
 <div className="font-mono text-[40px] font-medium leading-none text-foreground tabular-nums">
 81<span className="text-[22px] text-muted-foreground/60">%</span>
 </div>
 <div className="mt-1 text-[12px] text-muted-foreground">of effort points at revenue</div>
 </div>

 <Sparkline />

 <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
 <span>Actions: <span className="text-foreground/70 tabular-nums">{actionsToday}</span></span>
 <span>On-goal: <span className="text-foreground/70 tabular-nums">174</span></span>
 <span>Drift: <span className="text-foreground/70 tabular-nums">40</span></span>
 </div>
 </div>
  );
}

function Sparkline() {
  // Deterministic sparkline so SSR and client render identically (no hydration mismatch)
  const pts = React.useMemo(
 () =>
 Array.from({ length: 28 }, (_, i) => ({
 x: (i / 27) * 100,
 y: 50 + Math.sin(i / 2.4) * 18 + Math.sin(i * 7.31) * 4,
 })),
 [],
  );
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  return (
 <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-16 w-full">
 <defs>
 <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="oklch(0.78 0.13 152 / 35%)" />
 <stop offset="100%" stopColor="oklch(0.78 0.13 152 / 0%)" />
 </linearGradient>
 </defs>
 <path d={`${d} L100,100 L0,100 Z`} fill="url(#spark-fill)" />
 <path d={d} fill="none" stroke="oklch(0.78 0.13 152)" strokeWidth="1.2" />
 </svg>
  );
}
