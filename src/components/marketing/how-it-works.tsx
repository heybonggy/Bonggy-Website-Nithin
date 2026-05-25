"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
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
  "Every Monday, find accounts that hired a VP Sales last week, draft an email referencing the hire, queue for review.",
  "Watch our top 200 accounts. When their stack changes, draft a one-line nudge to the new champion.",
  "If an account closes a Series B, score against closed-won and queue the strongest 10 for outreach.",
];

/* Detailed signals — 5 rows worth, with source / actor / time so it reads like real intel */
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
    { co: "Hawkstone Robotics", event: "VP Sales hired", detail: "Mira Solovey, ex-Notion", time: "2d", source: "LinkedIn", Icon: UsersThree, tone: "hot" },
    { co: "Pylon HQ", event: "Series B closed", detail: "$42M, led by Index Ventures", time: "5d", source: "Crunchbase", Icon: CurrencyDollar, tone: "hot" },
    { co: "Veridian Labs", event: "14 SDR reqs opened", detail: "Up from 4 in Q1", time: "6d", source: "Job board", Icon: UsersThree, tone: "warm" },
    { co: "Cresta Cloud", event: "Stack migration", detail: "HubSpot → Salesforce, in progress", time: "3d", source: "DNS / website", Icon: Stack, tone: "warm" },
  ],
  [
    { co: "Auralis Health", event: "Earnings beat consensus", detail: "Revenue up 38% YoY", time: "4d", source: "SEC 8-K", Icon: TrendUp, tone: "cool" },
    { co: "Northwind Systems", event: "Hired CRO", detail: "Dev Patel, ex-Vercel", time: "1d", source: "Press release", Icon: UsersThree, tone: "hot" },
    { co: "Stratosphere AI", event: "Switched data warehouse", detail: "Snowflake → Databricks", time: "7d", source: "Engineering blog", Icon: Stack, tone: "warm" },
    { co: "Vesta Health", event: "Acquired by Pylon", detail: "Announced today, no terms disclosed", time: "0d", source: "Bloomberg", Icon: TrendUp, tone: "hot" },
  ],
  [
    { co: "Orbital Compliance", event: "SOC 2 Type II passed", detail: "Cleared enterprise unlock", time: "8d", source: "Trust portal", Icon: Globe, tone: "cool" },
    { co: "Helios Labs", event: "Champion left", detail: "Anita Park moved to Stripe", time: "3d", source: "LinkedIn", Icon: UsersThree, tone: "warm" },
    { co: "Quanta Build", event: "Posted RFP for outbound platform", detail: "RFP closes Apr 30", time: "1d", source: "Procurement feed", Icon: BuildingOffice, tone: "hot" },
    { co: "Lattice Forge", event: "Champion promoted", detail: "Now reports into the CRO", time: "11d", source: "LinkedIn", Icon: UsersThree, tone: "warm" },
  ],
  [
    { co: "Solstice Air", event: "Series A → B momentum", detail: "Term sheet rumoured (TechCrunch)", time: "2d", source: "TechCrunch", Icon: CurrencyDollar, tone: "warm" },
    { co: "Ember Robotics", event: "Opened London office", detail: "First non-US HQ", time: "6d", source: "Press release", Icon: BuildingOffice, tone: "cool" },
    { co: "Tidemark", event: "VP Product hired", detail: "Brought in from Linear", time: "4d", source: "LinkedIn", Icon: UsersThree, tone: "warm" },
    { co: "Cinder Pay", event: "FedRAMP authorisation", detail: "Federal pipeline opens", time: "9d", source: "GSA filing", Icon: Globe, tone: "hot" },
  ],
  [
    { co: "Halcyon Cloud", event: "Reduced headcount 8%", detail: "Likely budget pressure", time: "5d", source: "Layoffs.fyi", Icon: TrendUp, tone: "cool" },
    { co: "Magnolia Health", event: "New CISO hired", detail: "Likely procurement reset", time: "3d", source: "LinkedIn", Icon: UsersThree, tone: "warm" },
    { co: "Pinetop Logistics", event: "Renewed Apollo contract", detail: "Annual, 2-year term", time: "10d", source: "Crunchbase deals", Icon: CurrencyDollar, tone: "cool" },
    { co: "Spire Defense", event: "Won DoD pilot", detail: "$3.4M ceiling", time: "2d", source: "USA Spending", Icon: BuildingOffice, tone: "hot" },
  ],
];

/* Approval queue — much larger pool, each marked approve | reject */
type Approval = {
  id: string;
  company: string;
  subject: string;
  decision: "approve" | "reject";
};

const QUEUE_POOL: Approval[] = [
  { id: "q1", company: "Hawkstone Robotics", subject: "Week after the VP hire", decision: "approve" },
  { id: "q2", company: "Pylon HQ", subject: "Series B → SDR build-out", decision: "approve" },
  { id: "q3", company: "Veridian Labs", subject: "About the 14 new SDR reqs", decision: "approve" },
  { id: "q4", company: "Halcyon Cloud", subject: "Re: budget cuts", decision: "reject" },
  { id: "q5", company: "Cresta Cloud", subject: "Stack migration nudge", decision: "approve" },
  { id: "q6", company: "Auralis Health", subject: "Cold quarter recap", decision: "reject" },
  { id: "q7", company: "Northwind Systems", subject: "Dev Patel intro thread", decision: "approve" },
  { id: "q8", company: "Stratosphere AI", subject: "Snowflake-to-Databricks", decision: "approve" },
  { id: "q9", company: "Orbital Compliance", subject: "Enterprise unlock", decision: "approve" },
  { id: "q10", company: "Pinetop Logistics", subject: "Renewal heads-up", decision: "reject" },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" eyebrow="How it works">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <motion.h2
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={SPRING}
          className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]"
        >
          You don&apos;t operate Bonggy.
          <br />
          <span className="text-muted-foreground/85">You install it.</span>
        </motion.h2>

        <motion.div
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="space-y-5 lg:pt-2"
        >
          <p className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground">
            Apollo is a database. It tells you who exists. Clay is a workbench.
            It lets you build the pipeline, if you know how. Bonggy is neither.
            You describe the motion in plain English, and Bonggy turns it into
            an agent that runs on its own.
          </p>
          <p className="max-w-[58ch] text-[16px] font-medium leading-relaxed text-foreground">
            No pipeline to assemble. You install the motion and review the
            output.
          </p>
        </motion.div>
      </div>

      <div className="mt-16 grid auto-rows-[300px] grid-cols-1 gap-3 sm:auto-rows-[320px] lg:auto-rows-[340px] lg:grid-cols-10 lg:gap-4">
        <BentoCard className="lg:col-span-4" step="01" title="Describe it" sub="Plain English in.">
          <CommandInputDemo />
        </BentoCard>

        <BentoCard className="lg:col-span-3" step="02" title="Bonggy builds the agent" sub="Workflow out.">
          <WorkflowDemo />
        </BentoCard>

        <BentoCard className="lg:col-span-3" step="03" title="You stay in control" sub="Approval queue.">
          <ApprovalDemo />
        </BentoCard>

        <BentoCard
          className="lg:col-span-7 lg:row-span-2"
          step="—"
          title="Live signal feed"
          sub="Always on, always reading."
          tallContent
        >
          <SignalStreamDemo />
        </BentoCard>

        <BentoCard className="lg:col-span-3" step="—" title="Agents running" sub="Right now.">
          <AgentStatusDemo />
        </BentoCard>

        <BentoCard className="lg:col-span-3" step="—" title="Throughput today" sub="Reading and acting.">
          <ThroughputDemo />
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
      viewport={{ once: true, amount: 0 }}
      transition={SPRING}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-bento border border-border/80 bg-card/60 backdrop-blur shadow-diffusion-sm",
        className,
      )}
    >
      <div className={cn("relative flex-1 overflow-hidden", tallContent && "min-h-0")}>
        {children}
      </div>
      <div className="border-t border-border/60 px-5 py-4">
        <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
          <span>{step}</span>
          <span className="h-px flex-1 bg-border" />
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

function CommandInputDemo() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = React.useState(0);
  const [typed, setTyped] = React.useState(reduce ? PROMPTS[0] : "");
  const [phase, setPhase] = React.useState<"typing" | "compiling">("typing");

  React.useEffect(() => {
    if (reduce) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const current = PROMPTS[idx];
    setPhase("typing");
    setTyped("");

    const tick = () => {
      i += 1;
      setTyped(current.slice(0, i));
      if (i < current.length) {
        timer = setTimeout(tick, 18 + Math.random() * 22);
      } else {
        timer = setTimeout(() => setPhase("compiling"), 800);
        timer = setTimeout(() => setIdx((p) => (p + 1) % PROMPTS.length), 3400);
      }
    };
    timer = setTimeout(tick, 350);
    return () => clearTimeout(timer);
  }, [idx, reduce]);

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
        <CursorClick weight="regular" className="size-3.5" />
        Type the motion
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
                <span>Compiling to workflow</span>
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
                <span>Ready to compile</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
          ⏎ Build
        </kbd>
      </div>
    </div>
  );
}

/* ───────────────── Card 02 · Workflow with LIVE counters + flowing particles ───────────────── */

function useTickingCounter(target: number, increment = 1, intervalMs = 1400) {
  const [val, setVal] = React.useState(target);
  const reduce = useReducedMotion();
  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setVal((v) => v + Math.random() < 0.65 ? v + increment + Math.floor(Math.random() * 2) : v);
    }, intervalMs + Math.random() * 600);
    return () => clearInterval(id);
  }, [reduce, increment, intervalMs]);
  return val;
}

function WorkflowDemo() {
  const eventsCount = useTickingCounter(847, 2, 1100);
  const accountsCount = useTickingCounter(94, 1, 2400);
  const draftsCount = useTickingCounter(31, 1, 3200);

  const NODES = [
    { label: "Watch", Icon: Pulse, x: 22, y: 28, count: eventsCount, unit: "events" },
    { label: "Cluster", Icon: CornersOut, x: 50, y: 28, count: accountsCount, unit: "accts" },
    { label: "Score", Icon: Lightning, x: 50, y: 78, count: accountsCount, unit: "ranked" },
    { label: "Draft", Icon: PaperPlaneTilt, x: 78, y: 78, count: draftsCount, unit: "drafts" },
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden p-5">
      <div className="absolute inset-0 bg-grid-fine opacity-30" />

      {/* Concentric pulse around the Watch node */}
      <div
        className="pointer-events-none absolute"
        style={{ left: `${NODES[0].x}%`, top: `${NODES[0].y}%`, transform: "translate(-50%, -50%)" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/40"
            animate={{ scale: [0.4, 2.2], opacity: [0.6, 0] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              delay: i * 0.9,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="wf-stroke" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(1 0 0 / 6%)" />
            <stop offset="50%" stopColor="oklch(0.78 0.13 152 / 45%)" />
            <stop offset="100%" stopColor="oklch(1 0 0 / 6%)" />
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

        {/* Multiple flowing particles */}
        {[0, 0.8, 1.6, 2.4].map((delay, i) => (
          <motion.circle
            key={i}
            r="0.7"
            fill="oklch(0.85 0.14 152)"
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{
              duration: 3.2,
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
            className="flex items-center gap-1 whitespace-nowrap rounded-md border border-border/80 bg-background/95 px-1.5 py-1 font-mono text-[9.5px] uppercase tracking-wider backdrop-blur"
            style={{
              boxShadow:
                "0 6px 18px -6px oklch(0 0 0 / 60%), inset 0 1px 0 oklch(1 0 0 / 8%)",
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

function ApprovalDemo() {
  const reduce = useReducedMotion();
  const [items, setItems] = React.useState<QueueItem[]>(() =>
    QUEUE_POOL.slice(0, 4).map((a, i) => ({ ...a, status: "pending", key: i })),
  );
  const counter = React.useRef(4);

  React.useEffect(() => {
    if (reduce) return;
    const tick = () => {
      setItems((prev) => {
        if (!prev.length) return prev;

        const next = [...prev];
        const pendingIdx = next.findIndex((i) => i.status === "pending");

        if (pendingIdx === -1) {
          // none pending — pop the oldest decided + add a new pending
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
    const id = setInterval(tick, 1500);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="flex h-full flex-col gap-2.5 p-5">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
        <div className="flex items-center gap-1.5">
          <PaperPlaneTilt weight="regular" className="size-3.5" />
          Pending approval
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
                item.status === "rejected" && "border-border/30 bg-card/30 opacity-60",
              )}
            >
              <div
                className={cn(
                  "flex size-4 flex-none items-center justify-center rounded-full border transition-colors",
                  item.status === "approved" && "border-signal bg-signal text-signal-foreground",
                  item.status === "rejected" && "border-muted-foreground/50 bg-background text-muted-foreground/70",
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
                <div className={cn("truncate font-medium", item.status === "rejected" ? "text-muted-foreground line-through" : "text-foreground")}>
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
          <span>Reading 14 sources</span>
        </div>
        <div className="flex items-center gap-3">
          <span>
            <span className="text-foreground/70 tabular-nums">1,247</span> events this week
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
  const doubled = [...row, ...row, ...row];
  return (
    <div className="flex w-max items-center gap-3 whitespace-nowrap">
      <motion.div
        className="flex w-max items-center gap-3"
        animate={{
          x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"],
        }}
        transition={{
          duration: speedSec,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {doubled.map((s, i) => (
          <SignalPill key={`${s.co}-${i}`} signal={s} />
        ))}
      </motion.div>
    </div>
  );
}

function SignalPill({ signal: s }: { signal: Signal }) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-border/80 bg-background/60 py-1.5 pl-2 pr-3 backdrop-blur">
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

/* ───────────────── Agent status — Live counter card ───────────────── */

function AgentStatusDemo() {
  return (
    <div className="relative flex h-full flex-col justify-between p-5">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
        <Lightning weight="fill" className="size-3.5 text-signal" />
        Operational
      </div>

      <div>
        <div className="font-mono text-[64px] font-medium leading-none text-foreground tabular-nums">
          3
        </div>
        <div className="mt-1 text-[12px] text-muted-foreground">
          agents running right now
        </div>
      </div>

      <div className="space-y-1.5">
        {[
          { label: "Hiring trigger", count: 847 },
          { label: "Stack change", count: 412 },
          { label: "Champion move", count: 219 },
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

/* ───────────────── Throughput tile — sparkline + counter ───────────────── */

function ThroughputDemo() {
  const eventsToday = useTickingCounter(214, 3, 900);

  return (
    <div className="relative flex h-full flex-col justify-between p-5">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
        <Pulse weight="regular" className="size-3.5" />
        Throughput · 24h
      </div>

      <div>
        <div className="font-mono text-[40px] font-medium leading-none text-foreground tabular-nums">
          {eventsToday}
        </div>
        <div className="mt-1 text-[12px] text-muted-foreground">events processed</div>
      </div>

      <Sparkline />

      <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
        <span>Drafted: <span className="text-foreground/70 tabular-nums">42</span></span>
        <span>Acted on: <span className="text-foreground/70 tabular-nums">31</span></span>
        <span>Rejected: <span className="text-foreground/70 tabular-nums">11</span></span>
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
