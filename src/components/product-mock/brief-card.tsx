"use client";

import { motion } from "motion/react";

export type Brief = {
  company: string;
  whyNow: string;
  pains: string[];
  room: { role: string; note: string }[];
  angle: string;
};

/**
 * Account brief: company, why now, likely pains, who's in the room and one
 * suggested angle. With `build`, rows reveal one after another.
 */
export function BriefCard({
  title,
  brief,
  build = false,
}: {
  title: string;
  brief: Brief;
  build?: boolean;
}) {
  const rows: [string, React.ReactNode][] = [
    ["Company", brief.company],
    ["Why now", brief.whyNow],
    [
      "Likely pains",
      <ul key="p" className="grid gap-1">
        {brief.pains.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="mt-[7px] size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
            {p}
          </li>
        ))}
      </ul>,
    ],
    [
      "Who's in the room",
      <ul key="r" className="grid gap-1">
        {brief.room.map((r) => (
          <li key={r.role}>
            <span className="text-foreground">{r.role}</span>
            <span className="text-muted-foreground"> · {r.note}</span>
          </li>
        ))}
      </ul>,
    ],
    ["Suggested angle", <span key="a" className="text-foreground">{brief.angle}</span>],
  ];

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <h3 className="truncate text-[13px] font-medium text-foreground">{title}</h3>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Brief
        </span>
      </div>
      <dl className="grid grid-cols-1">
        {rows.map(([label, value], i) => (
          <motion.div
            key={label}
            initial={build ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: build ? i * 0.28 : 0, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-1 border-t border-border px-4 py-2.5 first:border-t-0 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-4"
          >
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:pt-0.5">
              {label}
            </dt>
            <dd className="text-[12.5px] leading-relaxed text-muted-foreground">{value}</dd>
          </motion.div>
        ))}
      </dl>
    </article>
  );
}
