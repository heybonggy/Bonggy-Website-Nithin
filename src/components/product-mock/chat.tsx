"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { BotAvatar, Mascot, type Team } from "@/components/ui/mascot";
import { TypingDots } from "@/components/ui/typing-dots";
import { DUR, EASE } from "@/components/marketing/_motion";
import { LimitChip } from "./tags";

const bubbleIn = {
  initial: { opacity: 0, y: 8, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: DUR.base, ease: EASE.pop },
};

/** Renders **bold** and `code` inside bot copy. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") ? (
          <strong key={i} className="font-semibold">
            {p.slice(2, -2)}
          </strong>
        ) : p.startsWith("`") ? (
          <code key={i} className="rounded-xs bg-surface-2 px-1 font-mono text-[0.92em]">
            {p.slice(1, -1)}
          </code>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        ),
      )}
    </>
  );
}

/** The person's message. A hard-limit clause is underlined and echoed as a chip. */
export function UserBubble({ text, limit, className }: { text: string; limit?: string; className?: string }) {
  const at = limit ? text.indexOf(limit) : -1;
  return (
    <motion.div {...bubbleIn} className={cn("flex flex-col items-end gap-1.5", className)}>
      <p className="max-w-[78%] rounded-xl bg-bubble-user px-3 py-2.5 text-ui text-bubble-user-ink">
        {at >= 0 && limit ? (
          <>
            {text.slice(0, at)}
            <span className="underline decoration-dotted decoration-1 underline-offset-[3px]">{limit}</span>
            {text.slice(at + limit.length)}
          </>
        ) : (
          text
        )}
      </p>
      {limit ? <LimitChip text={`hard limit: ${limit.replace(/\.$/, "").toLowerCase()}`} /> : null}
    </motion.div>
  );
}

/** A bot's reply, lowercase and terse. `children` renders cards under the text. */
export function BotBubble({
  team,
  text,
  children,
  className,
}: {
  team: Team;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div {...bubbleIn} className={cn("flex items-start gap-2", className)}>
      <BotAvatar team={team} size={24} className="mt-0.5" />
      <div className={cn("flex min-w-0 max-w-[86%] flex-col gap-2", children && "flex-1")}>
        {text ? (
          <p className="w-fit rounded-xl bg-bubble-bot px-3 py-2.5 text-ui text-bubble-bot-ink">
            <RichText text={text} />
          </p>
        ) : null}
        {children}
      </div>
    </motion.div>
  );
}

/** Centred system line, e.g. "named itself **champion tracker**". */
export function SystemLine({ text, timestamp = false, className }: { text: string; timestamp?: boolean; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DUR.base }}
      className={cn(
        "text-center text-caption text-fg-3",
        timestamp && "flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border",
        className,
      )}
    >
      <RichText text={text} />
    </motion.p>
  );
}

/** A bot working: the mascot, typing dots and a short label. */
export function PendingRow({ label = "thinking", className }: { label?: string; className?: string }) {
  return (
    <motion.div {...bubbleIn} className={cn("flex items-center gap-2 text-caption text-fg-3", className)}>
      <Mascot state="working" className="size-10" />
      <TypingDots label={label} />
      <span>{label}</span>
    </motion.div>
  );
}
