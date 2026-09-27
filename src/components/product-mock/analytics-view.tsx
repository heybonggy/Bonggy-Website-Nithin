"use client";

import * as React from "react";
import { LazyNumber } from "@/components/ui/lazy-number";
import { AnimatePresence, motion } from "motion/react";
import { EASE, SPRING, useEntrance } from "@/components/marketing/_motion";
import { cn } from "@/lib/utils";
import { BotAvatar, type Team } from "@/components/ui/mascot";
import { ANALYTICS_ROWS, MEMORY_SOURCES, TEAM_LIST, botById, type AnalyticsRow } from "./data";
import { GoalTag } from "./tags";

type Filter = "all" | Team;

const FILTER_LABEL: Record<Filter, string> = { all: "All", sales: "Sales", revops: "RevOps", marketing: "Marketing" };

/**
 * Analytics: runs, approvals and estimated hours per bot, with the revenue
 * goal behind each. A real table with working team filters, on demo data.
 */
export function AnalyticsView({ rows = ANALYTICS_ROWS, className }: { rows?: AnalyticsRow[]; className?: string }) {
  const [filter, setFilter] = React.useState<Filter>("all");
  const tableRef = React.useRef<HTMLDivElement>(null);
  // Numbers start at 0 and bars at nothing while armed (off screen), then
  // roll up when the table is 35% in view. The server render keeps the
  // real values, so crawlers and no-JS readers never see zeros.
  const entrance = useEntrance(tableRef, 0.35);
  // NumberFlow mounts on scroll-in (showing 0 for one frame so it rolls up)
  // or on the first filter change; before that the numbers are plain text.
  const [rolled, setRolled] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  React.useEffect(() => {
    if (entrance !== "go") return;
    const id = requestAnimationFrame(() => setRolled(true));
    return () => cancelAnimationFrame(id);
  }, [entrance]);
  const live = entrance === "go" || touched;
  const zero = entrance === "armed" || (entrance === "go" && !rolled);
  const n = (v: number) => (zero ? 0 : v);
  const withBots = rows.map((r) => ({ ...r, bot: botById(r.botId) }));
  const count = (f: Filter) => (f === "all" ? withBots.length : withBots.filter((r) => r.bot.team === f).length);
  const shown = filter === "all" ? withBots : withBots.filter((r) => r.bot.team === filter);
  const maxRuns = Math.max(1, ...withBots.map((r) => r.runs));
  const total = shown.reduce(
    (t, r) => ({ runs: t.runs + r.runs, approved: t.approved + r.approved, hours: t.hours + r.hours }),
    { runs: 0, approved: 0, hours: 0 },
  );
  const filters: Filter[] = ["all", ...TEAM_LIST.map((t) => t.id)];

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]", className)}>
      <div ref={tableRef} className="reveal min-w-0 rounded-3xl bg-surface-raised p-4 shadow-e2 hairline sm:p-6">
        <div role="group" aria-label="Filter by team" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setTouched(true);
                  setFilter(f);
                }}
                className={cn(
                  "relative inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-ui-sm font-medium transition-colors duration-[var(--dur-quick)]",
                  "after:absolute after:-inset-y-1.5 after:inset-x-0 after:content-['']",
                  active ? "bg-surface-inverse text-fg-inverse" : "bg-surface-2 text-foreground hover:bg-surface-3",
                )}
              >
                {FILTER_LABEL[f]}
                <span className={cn("tabular text-caption", active ? "text-fg-inverse/70" : "text-fg-3")}>{count(f)}</span>
              </button>
            );
          })}
        </div>

        {shown.length === 0 ? (
          <p className="mt-10 pb-6 text-center text-ui-sm text-fg-3">
            no runs yet for {filter}. start from a sentence.
          </p>
        ) : (
          <table className="mt-5 w-full table-fixed border-collapse text-left text-ui-sm">
            <caption className="sr-only">Runs, approvals and estimated hours per bot, demo data</caption>
            <thead>
              <tr className="border-b border-border text-caption text-fg-3">
                <th scope="col" className="w-[44%] py-2 font-normal sm:w-[30%]">Bot</th>
                <th scope="col" className="hidden py-2 font-normal md:table-cell">Team</th>
                <th scope="col" className="py-2 text-right font-normal">Runs</th>
                <th scope="col" className="py-2 text-right font-normal">Approved</th>
                <th scope="col" className="py-2 text-right font-normal">est. hours</th>
                <th scope="col" className="hidden w-[26%] py-2 pl-6 font-normal lg:table-cell">Goal</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false} mode="popLayout">
              {shown.map((r, i) => (
                <motion.tr
                  key={r.botId}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ layout: SPRING.layout, opacity: { duration: 0.2 } }}
                  className="border-b border-border align-top"
                >
                  <th scope="row" className="py-3 pr-2 font-normal">
                    <span className="flex items-center gap-2">
                      <BotAvatar botId={r.botId} size={24} />
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-foreground">{r.bot.name}</span>
                        <span className="block truncate text-caption text-fg-3 lg:hidden">{r.goal}</span>
                      </span>
                    </span>
                    <span aria-hidden className="mt-2 block h-1 overflow-hidden rounded-full bg-status-track">
                      <motion.span
                        className="block h-full origin-left rounded-full bg-status-ink"
                        style={{ width: `${(r.runs / maxRuns) * 100}%` }}
                        initial={false}
                        animate={{ scaleX: zero ? 0 : 1 }}
                        transition={{ duration: 0.7, ease: EASE.outExpo, delay: entrance === "go" ? i * 0.06 : 0 }}
                      />
                    </span>
                  </th>
                  <td className="hidden py-3 text-fg-2 md:table-cell">{r.bot.team}</td>
                  <td className="tabular py-3 text-right text-foreground">
                    <LazyNumber live={live} value={n(r.runs)} />
                  </td>
                  <td className="tabular py-3 text-right text-foreground">
                    <LazyNumber live={live} value={n(r.approved)} />
                  </td>
                  <td className="tabular py-3 text-right text-foreground">
                    <LazyNumber live={live} value={n(r.hours)} format={{ maximumFractionDigits: 1 }} />
                  </td>
                  <td className="hidden py-3 pl-6 lg:table-cell">
                    <GoalTag goal={r.goal} />
                  </td>
                </motion.tr>
              ))}
              </AnimatePresence>
            </tbody>
            <tfoot>
              <tr className="text-foreground">
                <th scope="row" className="py-3 font-medium">Total</th>
                <td className="hidden md:table-cell" />
                <td className="tabular py-3 text-right font-medium">
                  <LazyNumber live={live} value={n(total.runs)} />
                </td>
                <td className="tabular py-3 text-right font-medium">
                  <LazyNumber live={live} value={n(total.approved)} />
                </td>
                <td className="tabular py-3 text-right font-medium">
                  <LazyNumber live={live} value={n(total.hours)} format={{ maximumFractionDigits: 1 }} />
                </td>
                <td className="hidden lg:table-cell" />
              </tr>
            </tfoot>
          </table>
        )}
        <p className="mt-3 text-caption text-fg-3">demo data</p>
      </div>

      <div className="reveal self-start rounded-3xl bg-surface p-5 sm:p-6">
        <h3 className="text-ui font-semibold text-foreground">What bots read</h3>
        <p className="mt-1 text-ui-sm text-fg-2">Each fact a bot uses links back to where it came from. Read-only unless a flow says otherwise.</p>
        <ul className="mt-4 flex flex-col divide-y divide-border">
          {MEMORY_SOURCES.map((m) => (
            <li key={m.source} className="flex items-baseline justify-between gap-3 py-2.5 text-ui-sm">
              <span className="text-foreground">{m.source}</span>
              <span className="text-caption text-fg-3">
                <span className="tabular text-fg-2">{m.count}</span> · {m.updated}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
