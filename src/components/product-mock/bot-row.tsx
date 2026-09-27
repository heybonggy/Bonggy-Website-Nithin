import type * as React from "react";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/ui/mascot";
import type { Bot, StatusKind } from "./data";
import { StatusDot, StatusPill } from "./status-pill";

/** One bot in the sidebar list: avatar with status badge, name, time, preview. */
export function BotRow({
  bot,
  active = false,
  fresh = false,
  status,
  preview,
  time,
  className,
}: {
  bot: Bot;
  active?: boolean;
  /** Newly created: slides in. */
  fresh?: boolean;
  status?: StatusKind;
  preview?: React.ReactNode;
  time?: string;
  className?: string;
}) {
  const s = status ?? bot.status;
  const badge = s === "running" || s === "needs-you" || s === "failed";
  return (
    <div
      className={cn(
        "@container flex items-center gap-2 rounded-md p-2 transition-colors duration-[var(--dur-fast)]",
        active ? "bg-wash-selected" : "hover:bg-wash-hover",
        fresh && "animate-row-in",
        className,
      )}
    >
      <span className="relative shrink-0">
        <BotAvatar team={bot.team} size={32} state={s === "running" ? "working" : s === "needs-you" ? "needs-you" : "idle"} />
        {badge ? (
          <span
            className={cn(
              "absolute -bottom-0.5 -right-0.5 inline-flex size-2.5 items-center justify-center rounded-full ring-2 ring-sidebar",
              s === "needs-you" ? "bg-surface-inverse" : "bg-background",
            )}
          >
            {s === "needs-you" ? <span className="size-1 rounded-full bg-fg-inverse" /> : <StatusDot status={s} className="size-1.5" />}
          </span>
        ) : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className={cn("truncate text-ui-sm font-medium text-foreground", bot.unread && "font-semibold")}>{bot.name}</span>
          {s === "needs-you" ? (
            <StatusPill status="needs-you" className="hidden h-4 px-1.5 text-micro @min-[180px]:inline-flex" />
          ) : (
            <span className="hidden shrink-0 text-caption text-fg-3 @min-[160px]:inline">{time ?? bot.time}</span>
          )}
        </span>
        <span className={cn("block truncate text-caption", s === "needs-you" ? "font-medium text-foreground" : "text-fg-3")}>
          {preview ?? bot.preview}
        </span>
      </span>
    </div>
  );
}
