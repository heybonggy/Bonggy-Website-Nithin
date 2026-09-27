import type * as React from "react";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/ui/mascot";
import { botById, type Run } from "./data";
import { OnOffSwitch } from "./switch";
import { StatusPill } from "./status-pill";

type FlowListItem = { botId: string; on: boolean; schedule: string; lastRun: string };

/** The Flows screen list: every flow with its switch and last run. */
export function FlowsList({
  flows,
  selectedId,
  running,
  className,
}: {
  flows: FlowListItem[];
  selectedId?: string;
  /** One flow shown mid-run, with its own (e.g. cycling) status line. */
  running?: { botId: string; line: React.ReactNode };
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-0.5", className)}>
      {flows.map((f) => {
        const bot = botById(f.botId);
        return (
          <li
            key={f.botId}
            className={cn(
              "flex items-center gap-2.5 rounded-md p-2",
              f.botId === selectedId ? "bg-wash-selected" : "hover:bg-wash-hover",
            )}
          >
            <BotAvatar botId={f.botId} size={28} state={running?.botId === f.botId ? "working" : "idle"} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-ui-sm font-medium text-foreground">{bot.name}</span>
              <span className="block truncate text-ui-sm text-fg-3">
                {running?.botId === f.botId ? running.line : `${f.schedule} · last ${f.lastRun}`}
              </span>
            </span>
            <OnOffSwitch on={f.on} />
          </li>
        );
      })}
    </ul>
  );
}

/** A flow's recent runs as status pills. */
export function RunHistory({ runs, className }: { runs: Run[]; className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-1.5", className)}>
      {runs.map((r) => (
        <li key={r.id} className="flex items-center gap-2 text-ui-sm">
          <span className="w-24 shrink-0 text-fg-3 tabular">{r.when}</span>
          <StatusPill status={r.status} />
          <span className="truncate text-fg-2">{r.label}</span>
        </li>
      ))}
    </ul>
  );
}
