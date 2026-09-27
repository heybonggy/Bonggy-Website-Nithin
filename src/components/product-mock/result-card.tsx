import { ArrowRight, Hash } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import type { DealRisk } from "./data";

const shell = "overflow-hidden rounded-xl bg-surface-raised hairline";

/** Five-segment risk bar, ink only. */
function RiskBar({ risk }: { risk: number }) {
  return (
    <span aria-label={`risk ${risk} of 5`} className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={cn("h-1.5 w-2.5 rounded-2xs", n <= risk ? "bg-status-ink" : "bg-status-track")} />
      ))}
    </span>
  );
}

export function DealRiskCard({ deals, action = "add next steps", className }: { deals: DealRisk[]; action?: string; className?: string }) {
  return (
    <div className={cn(shell, className)}>
      <ul className="divide-y divide-border">
        {deals.map((d) => (
          <li key={d.name} className="flex items-center gap-3 px-3 py-2">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-ui-sm font-medium text-foreground">{d.name}</span>
              <span className="block truncate text-caption text-fg-3">
                {d.stage} · {d.reason}
              </span>
            </span>
            <RiskBar risk={d.risk} />
          </li>
        ))}
      </ul>
      <div className="flex justify-end border-t border-border p-2">
        <span data-cursor-target="result-action" className="inline-flex h-7 items-center rounded-full bg-surface-inverse px-3 text-caption font-medium text-fg-inverse">
          {action}
        </span>
      </div>
    </div>
  );
}

export function BriefCard({ title, lines, className }: { title: string; lines: string[]; className?: string }) {
  return (
    <div className={cn(shell, "p-3", className)}>
      <p className="text-ui-sm font-semibold text-foreground">{title}</p>
      <ul className="mt-1.5 flex flex-col gap-1 text-ui-sm text-fg-2">
        {lines.map((l) => (
          <li key={l} className="flex gap-2">
            <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-fg-3" />
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ChannelPostCard({ channel, lines, className }: { channel: string; lines: string[]; className?: string }) {
  return (
    <div className={cn(shell, className)}>
      <p className="flex items-center gap-1 border-b border-border px-3 py-2 text-caption font-medium text-fg-2">
        <Hash className="size-3" aria-hidden />
        {channel.replace(/^#\s*/, "")}
      </p>
      <ul className="flex flex-col gap-1 p-3 text-ui-sm text-foreground">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

export type CrmChange = { record: string; field: string; from: string; to: string };

export function CrmDiffCard({ changes, action = `apply ${changes.length} changes`, className }: { changes: CrmChange[]; action?: string; className?: string }) {
  return (
    <div className={cn(shell, className)}>
      <ul className="divide-y divide-border">
        {changes.map((c) => (
          <li key={c.record + c.field} className="px-3 py-2 text-caption">
            <span className="font-medium text-foreground">{c.record}</span> <span className="text-fg-3">· {c.field}</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-fg-2">
              <span className="text-fg-3 line-through">{c.from}</span>
              <ArrowRight className="size-3 text-fg-3" aria-hidden />
              <span className="font-medium text-foreground">{c.to}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="flex justify-end border-t border-border p-2">
        <span data-cursor-target="result-action" className="inline-flex h-7 items-center rounded-full bg-surface-inverse px-3 text-caption font-medium text-fg-inverse">
          {action}
        </span>
      </div>
    </div>
  );
}
