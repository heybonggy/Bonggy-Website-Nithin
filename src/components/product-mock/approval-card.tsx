"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, HandPalm } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { TypedText, typingDuration } from "@/components/ui/typed-text";
import { TypingDots } from "@/components/ui/typing-dots";
import { DUR, EASE } from "@/components/marketing/_motion";
import { GoalTag } from "./tags";

export type ApprovalState = "pending" | "sending" | "approved" | "skipped" | "expired";

/**
 * Something a customer would see, waiting for a person. The inverted strip
 * names who approves and when; the actions are approve, edit and skip.
 */
export function ApprovalCard({
  strip,
  to,
  subject,
  body,
  goal,
  state = "pending",
  approvedAt = "11:12",
  typed = true,
  className,
}: {
  strip: string;
  to?: string;
  subject?: string;
  body: string[];
  goal?: string;
  state?: ApprovalState;
  approvedAt?: string;
  /** Type the draft out (TypedText). Off where the take has no time for it. */
  typed?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-surface-raised",
        state === "skipped" || state === "expired" ? "border border-dashed border-border-strong" : "hairline-strong",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {state === "approved" ? (
          <motion.p
            key="approved"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.base, ease: EASE.settle }}
            className="flex items-center gap-1.5 bg-surface-2 px-3 py-2 text-caption font-medium text-foreground"
          >
            <Check weight="bold" className="size-3 animate-check-in" aria-hidden />
            approved by you · {approvedAt}
          </motion.p>
        ) : state === "skipped" || state === "expired" ? (
          <p key="closed" className="px-3 py-2 text-caption text-fg-3">
            {state === "skipped" ? "skipped by you · nothing sent" : "expired · nothing sent"}
          </p>
        ) : (
          <motion.p key="strip" className="flex items-center gap-1.5 bg-surface-inverse px-3 py-2 text-caption font-medium text-fg-inverse">
            <HandPalm className="size-3.5" aria-hidden />
            {strip}
          </motion.p>
        )}
      </AnimatePresence>

      <div className={cn("p-3", (state === "skipped" || state === "expired") && "opacity-60")}>
        {to || subject ? (
          <dl className="mb-2 text-caption">
            {to ? (
              <div className="flex gap-2 border-b border-border py-1.5">
                <dt className="w-14 shrink-0 text-fg-3">to</dt>
                <dd className="text-foreground">{to}</dd>
              </div>
            ) : null}
            {subject ? (
              <div className="flex gap-2 border-b border-border py-1.5">
                <dt className="w-14 shrink-0 text-fg-3">subject</dt>
                <dd className="text-foreground">{subject}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}
        <div className="flex flex-col gap-1.5 text-ui-sm text-foreground">
          {/* The bot's draft types out one paragraph after another. */}
          {body.map((line, i) => (
            <p key={line}>
              {typed ? <TypedText text={line} delayMs={body.slice(0, i).reduce((ms, l) => ms + typingDuration(l), 0)} /> : line}
            </p>
          ))}
        </div>
        {goal ? <GoalTag goal={goal} className="mt-3" /> : null}
      </div>

      {state === "pending" || state === "sending" ? (
        <div className="flex items-center gap-1.5 border-t border-border p-2">
          <span
            data-cursor-target="approve"
            className="inline-flex h-7 min-w-[84px] items-center justify-center gap-1.5 rounded-full bg-surface-inverse px-3 text-caption font-medium text-fg-inverse"
          >
            {state === "sending" ? (
              <>
                <TypingDots label="Sending" /> sending
              </>
            ) : (
              "approve"
            )}
          </span>
          <span className="inline-flex h-7 items-center rounded-full bg-surface-2 px-3 text-caption font-medium text-foreground">edit</span>
          <span className="inline-flex h-7 items-center rounded-full px-3 text-caption font-medium text-fg-2">skip</span>
        </div>
      ) : null}
    </div>
  );
}
