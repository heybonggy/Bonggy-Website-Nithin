"use client";

import * as React from "react";
import { LazyNumber } from "@/components/ui/lazy-number";
import { useEntrance } from "@/components/marketing/_motion";
import { cn } from "@/lib/utils";
import { BotAvatar, type Team } from "@/components/ui/mascot";
import { ANALYTICS_ROWS, MEMORY_SOURCES, TEAM_LIST, botById, type AnalyticsRow } from "./data";
import { GoalTag } from "./tags";

type Filter = "all" | Team;

const FILTER_LABEL: Record<Filter, string> = { all: "All", sales: "Sales", revops: "RevOps", marketing: "Marketing" };

/** A run bar: grows in with a CSS transform transition (compositor only). */
function Bar({ pct, zero, delay }: { pct: number; zero: boolean; delay: number }) {
  return (
    <span
      className="block h-full origin-left rounded-full bg-status-ink transition-transform duration-700 ease-out-expo motion-reduce:transition-none"
      style={{ width: `${pct}%`, transform: zero ? "scaleX(0)" : "scaleX(1)", transitionDelay: `${delay}ms` }}
    />
  );
}

const subscribeWide = (cb: () => void) => {
  const mq = window.matchMedia("(min-width: 640px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
/** The table layout (sm and up) vs the phone cards. False on the server. */
function useWide() {
  return React.useSyncExternalStore(subscribeWide, () => window.matchMedia("(min-width: 640px)").matches, () => false);
}

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
  // Only the totals roll (and only in the layout actually shown): mounting
  // dozens of NumberFlows at once was a 100ms+ long task on phones. Row
  // numbers are plain text with their real values from the start.
  const wide = useWide();
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
        <div
          role="group"
          aria-label="Filter by team"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 py-1.5 [mask-image:linear-gradient(90deg,transparent,#000_16px,#000_calc(100%-24px),transparent)] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:[mask-image:none]"
        >
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
                  "relative inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-ui-sm font-medium transition-colors duration-[var(--dur-quick)]",
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
          <>
          {/* Below 640px: one card per bot, then the totals. */}
          <ul className="mt-4 flex flex-col gap-3 sm:hidden">
            {shown.map((r, i) => (
              <li key={r.botId} className="rounded-2xl bg-surface p-4">
                <div className="flex items-center gap-3">
                  <BotAvatar botId={r.botId} size={32} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-ui font-medium text-foreground">{r.bot.name}</span>
                    <span className="block text-ui-sm text-fg-3">{r.bot.team}</span>
                  </span>
                </div>
                <dl className="mt-3 grid grid-cols-3 gap-2">
                  {([
                    ["runs", r.runs, undefined],
                    ["approved", r.approved, undefined],
                    ["est. hours", r.hours, { maximumFractionDigits: 1 }],
                  ] as const).map(([label, v, fmt]) => (
                    <div key={label} className="min-w-0 rounded-xl bg-surface-raised px-2 py-2">
                      <dt className="whitespace-nowrap text-caption text-fg-3">{label}</dt>
                      <dd className="tabular text-title font-medium text-foreground">
                        <LazyNumber live={false} value={v} format={fmt} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-3 flex flex-col gap-2">
                  <GoalTag goal={r.goal} className="self-start" />
                  <span aria-hidden className="block h-1 overflow-hidden rounded-full bg-status-track">
                    <Bar pct={(r.runs / maxRuns) * 100} zero={zero} delay={entrance === "go" ? i * 60 : 0} />
                  </span>
                </div>
              </li>
            ))}
            <li className="rounded-2xl bg-surface-inverse p-4 text-fg-inverse">
              <p className="text-ui-sm font-medium">Total · {FILTER_LABEL[filter].toLowerCase()}</p>
              <dl className="mt-2 grid grid-cols-3 gap-2">
                {([
                  ["runs", total.runs, undefined],
                  ["approved", total.approved, undefined],
                  ["est. hours", total.hours, { maximumFractionDigits: 1 }],
                ] as const).map(([label, v, fmt]) => (
                  <div key={label}>
                    <dt className="whitespace-nowrap text-caption opacity-70">{label}</dt>
                    <dd className="tabular text-title font-medium">
                      <LazyNumber live={live && !wide} value={n(v)} format={fmt} />
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          </ul>
          <table className="mt-5 hidden w-full table-fixed border-collapse text-left text-ui-sm sm:table">
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
              {/* Filtering remounts the rows with a CSS fade (no layout animation). */}
              {shown.map((r, i) => (
                <tr key={`${filter}:${r.botId}`} className="border-b border-border align-top motion-safe:animate-[mount-fade_250ms_ease-out_both]">
                  <th scope="row" className="py-3 pr-2 font-normal">
                    <span className="flex items-center gap-2">
                      <BotAvatar botId={r.botId} size={24} />
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-foreground">{r.bot.name}</span>
                        <span className="block truncate text-caption text-fg-3 lg:hidden">{r.goal}</span>
                      </span>
                    </span>
                    <span aria-hidden className="mt-2 block h-1 overflow-hidden rounded-full bg-status-track">
                      <Bar pct={(r.runs / maxRuns) * 100} zero={zero} delay={entrance === "go" ? i * 60 : 0} />
                    </span>
                  </th>
                  <td className="hidden py-3 text-fg-2 md:table-cell">{r.bot.team}</td>
                  <td className="tabular py-3 text-right text-foreground">
                    <LazyNumber live={false} value={r.runs} />
                  </td>
                  <td className="tabular py-3 text-right text-foreground">
                    <LazyNumber live={false} value={r.approved} />
                  </td>
                  <td className="tabular py-3 text-right text-foreground">
                    <LazyNumber live={false} value={r.hours} format={{ maximumFractionDigits: 1 }} />
                  </td>
                  <td className="hidden py-3 pl-6 lg:table-cell">
                    <GoalTag goal={r.goal} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="text-foreground">
                <th scope="row" className="py-3 font-medium">Total</th>
                <td className="hidden md:table-cell" />
                <td className="tabular py-3 text-right font-medium">
                  <LazyNumber live={live && wide} value={n(total.runs)} />
                </td>
                <td className="tabular py-3 text-right font-medium">
                  <LazyNumber live={live && wide} value={n(total.approved)} />
                </td>
                <td className="tabular py-3 text-right font-medium">
                  <LazyNumber live={live && wide} value={n(total.hours)} format={{ maximumFractionDigits: 1 }} />
                </td>
                <td className="hidden lg:table-cell" />
              </tr>
            </tfoot>
          </table>
          </>
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
