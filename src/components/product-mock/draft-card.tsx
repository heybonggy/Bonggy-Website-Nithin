"use client";

import { Check, PencilSimple, Trash } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

export type Draft = { to: string; subject: string; body: string[] };
export type DraftStatus = "pending" | "approved" | "discarded";

/**
 * A draft that needs a person's approval before it goes anywhere.
 * `pulseApprove` gives Approve a soft green pulse (finite, three times).
 */
export function DraftCard({
  draft,
  status = "pending",
  pulseApprove = false,
  onApprove,
  onEdit,
  onDiscard,
}: {
  draft: Draft;
  status?: DraftStatus;
  pulseApprove?: boolean;
  onApprove?: () => void;
  onEdit?: () => void;
  onDiscard?: () => void;
}) {
  const badge =
    status === "approved" ? "Approved" : status === "discarded" ? "Discarded" : "Needs approval";
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <h3 className="min-w-0 truncate text-[13px] font-medium text-foreground">
          Draft email <span className="font-normal text-muted-foreground">· to {draft.to}</span>
        </h3>
        <span
          className={cn(
            "shrink-0 rounded-[4px] px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em]",
            status === "approved"
              ? "bg-signal/15 text-signal"
              : "border border-border text-foreground",
          )}
        >
          {badge}
        </span>
      </div>
      <div className="grid gap-2 px-4 py-3 text-[12.5px] leading-relaxed">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Subject </span>
          <span className="text-foreground">{draft.subject}</span>
        </div>
        {draft.body.map((line, i) => (
          <p key={i} className="m-0 text-muted-foreground">
            {line}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-border px-4 py-2.5">
        <button
          type="button"
          onClick={onApprove}
          disabled={status !== "pending"}
          className={cn(
            "relative inline-flex h-8 items-center gap-1.5 rounded-lg bg-signal px-3 text-[12px] font-medium text-signal-foreground transition-colors hover:bg-signal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:opacity-60",
          )}
        >
          {pulseApprove && status === "pending" ? (
            <span
              aria-hidden
              className="absolute inset-0 rounded-lg ring-2 ring-signal/60 motion-safe:animate-[approve-pulse_1.6s_ease-out_3]"
            />
          ) : null}
          <Check weight="bold" className="size-3.5" aria-hidden />
          Approve
        </button>
        <button
          type="button"
          onClick={onEdit}
          disabled={status !== "pending"}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-[12px] text-foreground transition-colors hover:bg-foreground/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60 disabled:opacity-60"
        >
          <PencilSimple className="size-3.5" aria-hidden />
          Edit
        </button>
        <button
          type="button"
          onClick={onDiscard}
          disabled={status !== "pending"}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[12px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60 disabled:opacity-60"
        >
          <Trash className="size-3.5" aria-hidden />
          Discard
        </button>
        <span className="ml-auto hidden text-[11.5px] text-muted-foreground sm:inline">
          Nothing is sent until you approve.
        </span>
      </div>
    </article>
  );
}
