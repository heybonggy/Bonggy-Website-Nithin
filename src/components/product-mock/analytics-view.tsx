"use client";

import { AnimatePresence, motion } from "motion/react";
import { Warning } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { AgentAvatar } from "./avatar";
import { ACTIVITY, GOALS, MEMORY, TONES, ACCOUNT_RESEARCHER } from "./data";

/**
 * Analytics: per-agent activity, what an agent has learned, work mapped to
 * revenue goals, and a drift alert. All figures are example data.
 * `memoryCount` controls how many memory facts are shown (newest last).
 */
export function AnalyticsView({ memoryCount = MEMORY.length }: { memoryCount?: number }) {
  const max = Math.max(...ACTIVITY.map((a) => a.value));
  const facts = MEMORY.slice(0, memoryCount);

  return (
    <div className="h-full overflow-hidden p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="m-0 text-[12.5px] text-muted-foreground">Last 7 days · all agents</p>
        <span className="rounded-[4px] border border-border px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
          Example data
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Agent activity" note="Actions this week">
          <ul className="grid gap-2.5">
            {ACTIVITY.map((a) => (
              <li key={a.name} className="grid grid-cols-[minmax(0,128px)_minmax(0,1fr)_32px] items-center gap-3 text-[12.5px] sm:grid-cols-[minmax(0,140px)_minmax(0,1fr)_32px]">
                <span className="truncate text-foreground">{a.name}</span>
                <span className="h-2 overflow-hidden rounded-full bg-foreground/[0.06]">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${(a.value / max) * 100}%`, background: TONES[a.tone] }}
                  />
                </span>
                <span className="text-right font-mono tabular-nums text-muted-foreground">{a.value}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Work mapped to revenue goals" note="Share of agent effort">
          <ul className="grid gap-2.5">
            {GOALS.map((g) => {
              const unmapped = g.goal.startsWith("Not mapped");
              return (
                <li key={g.goal} className="grid grid-cols-[minmax(0,1fr)_56px_36px] items-center gap-3 text-[12.5px] sm:grid-cols-[minmax(0,1fr)_110px_36px]">
                  <span className={cn("truncate", unmapped ? "text-muted-foreground" : "text-foreground")}>{g.goal}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-foreground/[0.06]">
                    <span
                      className={cn("block h-full rounded-full", unmapped ? "bg-foreground/25" : "bg-signal")}
                      style={{ width: `${g.share}%` }}
                    />
                  </span>
                  <span className="text-right font-mono tabular-nums text-muted-foreground">{g.share}%</span>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel
          title="What this agent has learned"
          note={ACCOUNT_RESEARCHER.name}
          leading={<AgentAvatar avatar={ACCOUNT_RESEARCHER.avatar} size={18} />}
        >
          {/* Space for every fact is reserved, so the list can grow without
              moving anything around it. */}
          <ol className="grid content-start gap-2" style={{ minHeight: `${MEMORY.length * 2.2}rem` }}>
            <AnimatePresence initial={false}>
              {facts.map((f) => (
                <motion.li
                  key={f.date}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-[52px_minmax(0,1fr)] gap-3 text-[12.5px] leading-snug"
                >
                  <span className="pt-px font-mono text-[10.5px] tabular-nums text-muted-foreground">{f.date}</span>
                  <span className="text-foreground">{f.fact}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
        </Panel>

        <div className="grid content-start gap-3">
          <section className="rounded-lg border border-signal/35 bg-signal/[0.05] p-4">
            <h3 className="flex items-center gap-2 font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-signal">
              <Warning weight="fill" className="size-3.5" aria-hidden />
              Drift alert · Pipeline Watch
            </h3>
            <p className="mb-0 mt-2 text-[13px] leading-snug text-foreground">
              60% of this week&apos;s research went to accounts outside your ICP.
            </p>
            <p className="mb-0 mt-1.5 text-[12px] leading-snug text-muted-foreground">
              Suggested next move: point the Enterprise pod at the five in-ICP accounts with
              open renewals. You decide.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

function Panel({
  title,
  note,
  leading,
  children,
}: {
  title: string;
  note?: string;
  leading?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <h3 className="m-0 text-[13px] font-medium text-foreground">{title}</h3>
        {note ? (
          <span className="flex min-w-0 items-center gap-1.5 text-[11.5px] text-muted-foreground">
            {leading}
            {note}
          </span>
        ) : null}
      </div>
      {children}
    </section>
  );
}
