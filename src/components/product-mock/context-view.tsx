"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useEntrance } from "@/components/marketing/_motion";
import { COMPANY_CONTEXT, type ContextRow } from "./data";
import { TeamTag } from "./tags";

/**
 * Company context: the defaults every bot starts from, and the team
 * overrides that replace them. Overrides carry a 2px ink bar on the left.
 */
export function ContextView({ rows = COMPANY_CONTEXT, className }: { rows?: ContextRow[]; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  // Rows enter one by one and override bars draw top to bottom, once in view.
  const entrance = useEntrance(ref, 0.3);
  return (
    <div ref={ref} className={cn("reveal rounded-3xl bg-surface-raised p-4 shadow-e2 hairline sm:p-6", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
        <p className="text-ui font-semibold text-foreground">Company context</p>
        <p className="text-caption text-fg-3">read first by every bot</p>
      </div>
      <dl className="flex flex-col divide-y divide-border">
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={cn(
              "grid gap-2 py-4 sm:grid-cols-[120px_1fr] sm:gap-6",
              entrance === "armed" && "opacity-0",
              entrance === "go" && "animate-row-in",
            )}
            style={entrance === "go" ? { animationDelay: `${i * 110}ms` } : undefined}
          >
            <dt className="text-ui-sm font-medium text-fg-3">{r.label}</dt>
            <dd className="flex flex-col gap-2.5">
              <span className="text-ui text-foreground">{r.value}</span>
              {r.override ? (
                <span className="relative flex flex-col gap-1.5 pl-3">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-y-0 left-0 w-0.5 origin-top rounded-full bg-foreground",
                      entrance === "armed" && "scale-y-0",
                      entrance === "go" && "animate-bar-draw",
                    )}
                    style={entrance === "go" ? { animationDelay: `${i * 110 + 250}ms` } : undefined}
                  />
                  <span className="flex flex-wrap items-center gap-2">
                    <TeamTag team={r.override.team} />
                    <span className="text-caption text-fg-3">overrides company default</span>
                  </span>
                  <span className="text-ui text-foreground">{r.override.value}</span>
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
