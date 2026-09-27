"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { BotAvatar, type Team } from "@/components/ui/mascot";
import { SPRING } from "@/components/marketing/_motion";
import { botColorVars } from "@/components/ui/bot-look";
import { useBotLook } from "./bot-looks";

export type HandoffMember = { id: string; team: Team };

/**
 * A group's members as overlapped discs. The active member expands into a
 * pill that says what it's handing off, e.g. "sharing pains with Unstick…".
 */
export function HandoffPill({
  members,
  activeId,
  label,
  className,
}: {
  members: HandoffMember[];
  activeId?: string | null;
  label?: string;
  className?: string;
}) {
  // A group shows up to three members (fixed hook calls).
  const colors = [useBotLook(members[0]?.id).color, useBotLook(members[1]?.id).color, useBotLook(members[2]?.id).color];
  return (
    <div className={cn("flex items-center", className)}>
      {members.map((m, i) => {
        const active = m.id === activeId && !!label;
        return (
          <motion.span
            key={m.id}
            layout
            transition={SPRING.morph}
            style={active ? botColorVars(colors[i]) : undefined}
            className={cn(
              "relative inline-flex h-8 items-center rounded-full ring-2 ring-background",
              active ? "z-10 bg-[var(--bot-tint)] pr-3 text-[var(--bot-ink)]" : "bg-background",
              i > 0 && "-ml-2",
            )}
          >
            <motion.span
              animate={active ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex p-0.5"
            >
              <BotAvatar botId={m.id} size={28} />
            </motion.span>
            <AnimatePresence mode="popLayout">
              {active ? (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, delay: 0.12 }}
                  className="whitespace-nowrap pl-1.5 text-caption font-medium"
                >
                  {label}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </motion.span>
        );
      })}
    </div>
  );
}
