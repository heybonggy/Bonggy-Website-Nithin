"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Clock, FileText, HandPalm, X } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { EASE, SPRING } from "@/components/marketing/_motion";
import type { StatusKind } from "./data";

/**
 * Status without hue (DESIGN.md §6.3): every status is told apart by fill,
 * outline, dot glyph, icon and word, never by colour.
 */
const DEFAULT_LABEL: Record<StatusKind, string> = {
  off: "off",
  scheduled: "scheduled",
  running: "running",
  "needs-you": "needs you",
  done: "done",
  held: "held for you",
  failed: "failed",
};

export function StatusDot({ status, className }: { status: StatusKind; className?: string }) {
  return (
    <span aria-hidden className={cn("relative inline-flex size-2 shrink-0", className)}>
      {status === "running" ? (
        <span className="absolute inset-0 animate-live-ring rounded-full bg-status-ink" />
      ) : null}
      <span
        className={cn(
          "relative inline-flex size-2 items-center justify-center rounded-full",
          status === "off" && "shadow-[inset_0_0_0_1.5px_var(--foreground-disabled)]",
          status === "scheduled" && "shadow-[inset_0_0_0_1.5px_var(--status-ink)]",
          (status === "running" || status === "done") && "bg-status-ink",
          status === "needs-you" && "bg-fg-inverse",
          status === "held" && "shadow-[inset_0_0_0_1.5px_var(--status-ink)] [background:linear-gradient(90deg,var(--status-ink)_50%,transparent_50%)]",
          status === "failed" && "text-[8px] leading-none",
        )}
      >
        {status === "failed" ? "✕" : null}
      </span>
    </span>
  );
}

export function StatusPill({
  status,
  label,
  size = "sm",
  className,
}: {
  status: StatusKind;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const text = label ?? DEFAULT_LABEL[status];
  const Icon =
    status === "scheduled" ? Clock
      : status === "needs-you" ? HandPalm
        : status === "done" ? Check
          : status === "held" ? FileText
            : status === "failed" ? X
              : null;
  return (
    <motion.span
      layout
      transition={{ layout: SPRING.morph }}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full font-medium",
        size === "sm" ? "h-5 px-2 text-caption" : "h-6 px-2.5 text-ui-sm",
        status === "off" && "border border-dashed border-border-strong text-fg-3",
        status === "scheduled" && "border border-border-strong text-foreground",
        (status === "running" || status === "done") && "bg-surface-2 text-foreground",
        status === "needs-you" && "bg-surface-inverse text-fg-inverse",
        status === "held" && "border border-dotted border-foreground text-foreground",
        status === "failed" && "hatch border border-foreground bg-surface-2 text-foreground",
        className,
      )}
    >
      {Icon ? (
        <Icon
          aria-hidden
          weight={status === "done" ? "bold" : "regular"}
          className={cn("size-3 shrink-0", status === "done" && "animate-check-in")}
        />
      ) : (
        <StatusDot status={status} />
      )}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.35, ease: EASE.settle }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
