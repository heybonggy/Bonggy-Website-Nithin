"use client";

import * as React from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import {
  FileText,
  HandPalm,
  Lightning,
  ListNumbers,
  Stack,
  Target,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/ui/mascot";
import { botColorVars } from "@/components/ui/bot-look";
import { useBotLook } from "./bot-looks";
import type { CharacterState } from "@/components/ui/bot-character";
import { DUR, EASE, SPRING } from "@/components/marketing/_motion";
import { FLOW_PARTS, type Bot, type FlowPart, type StatusKind } from "./data";
import { StatusPill } from "./status-pill";
import { GoalTag, LimitChip, TeamTag } from "./tags";
import { OnOffSwitch } from "./switch";

const PART_META: Record<FlowPart, { label: string; icon: PhosphorIcon }> = {
  trigger: { label: "Trigger", icon: Lightning },
  context: { label: "Context", icon: Stack },
  steps: { label: "Steps", icon: ListNumbers },
  approval: { label: "Approval", icon: HandPalm },
  output: { label: "Output", icon: FileText },
  goal: { label: "Goal", icon: Target },
};

function FlowStripe({ botId }: { botId: string }) {
  const look = useBotLook(botId);
  return <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-[var(--bot-disc)]" style={botColorVars(look.color)} />;
}

export type FlowCardState = "draft" | "on" | "off" | "running" | "needs-you" | "failed";

/** An edit the person made: the old value strikes through, the new one types in. */
export type FlowEdit = { from: string; to: string };

function PartValue({ value, edit }: { value: string | string[]; edit?: FlowEdit }) {
  if (edit) {
    return (
      <span className="flex flex-col gap-0.5">
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-fg-3 line-through decoration-1"
        >
          {edit.from}
        </motion.span>
        <motion.span
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.6, ease: EASE.standard, delay: 0.2 }}
          className="text-foreground"
        >
          {edit.to}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="text-caption text-fg-3"
        >
          edited by you
        </motion.span>
      </span>
    );
  }
  if (Array.isArray(value)) {
    return (
      <ol className="flex flex-col gap-0.5">
        {value.map((s, i) => (
          <li key={s} className="flex gap-1.5">
            <span className="tabular text-fg-3">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    );
  }
  return <>{value}</>;
}

/**
 * A bot's flow: the six parts, each on its own row. Empty parts show a
 * placeholder track; a part that just filled sweeps once.
 */
export function FlowCard({
  bot,
  parts,
  limit,
  status = "scheduled",
  statusLabel,
  state = "on",
  fresh,
  edits,
  size = "full",
  lastRun,
  onToggle,
  avatarState,
  className,
}: {
  /** Override the avatar's character state (e.g. "excited" while filling). */
  avatarState?: CharacterState;
  bot: Pick<Bot, "id" | "name" | "team">;
  /** Filled parts. Missing parts render empty. */
  parts: Partial<Record<FlowPart, string | string[]>>;
  limit?: { part: FlowPart; text: string };
  status?: StatusKind;
  statusLabel?: string;
  state?: FlowCardState;
  /** The part that just filled in (sweeps once). */
  fresh?: FlowPart | null;
  edits?: Partial<Record<FlowPart, FlowEdit>>;
  size?: "full" | "compact";
  lastRun?: string;
  onToggle?: (on: boolean) => void;
  className?: string;
}) {
  const compact = size === "compact";
  const goal = typeof parts.goal === "string" ? parts.goal : undefined;
  const shown: FlowPart[] = compact ? ["trigger", "approval", "goal"] : FLOW_PARTS;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border-[0.5px] bg-surface-raised",
        compact ? "p-3" : "p-4 sm:p-5",
        state === "draft" ? "border-dashed border-border-strong" : "border-border-strong shadow-e1",
        state === "off" && "opacity-70",
        state === "failed" && "hatch",
        className,
      )}
    >
      {/* The bot's colour: a 2px stripe along the top. */}
      <FlowStripe botId={bot.id} />
      {state === "running" ? (
        <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 overflow-hidden">
          <span className="block h-full w-full animate-fill-sweep sweep [animation-iteration-count:infinite]" />
        </span>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        <BotAvatar botId={bot.id} size={compact ? 24 : 28} state={avatarState ?? (state === "running" ? "working" : state === "needs-you" ? "waiting" : "idle")} />
        <span className="text-ui font-semibold text-foreground">{bot.name}</span>
        {!compact ? <TeamTag team={bot.team} /> : null}
        {/* Pill and switch move as one layout group, so the pill's width
            change never slides it over the switch label. */}
        <LayoutGroup>
          <motion.span layout transition={{ layout: SPRING.morph }} className="ml-auto flex shrink-0 items-center gap-3">
            <StatusPill status={status} label={statusLabel} className="shrink-0" />
            <AnimatePresence initial={false}>
              {!compact && state !== "draft" ? (
                <motion.span
                  key="switch"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ layout: SPRING.morph, opacity: { duration: 0.2 } }}
                  className="shrink-0"
                >
                  <OnOffSwitch on={state !== "off"} onChange={onToggle} label={`${bot.name} flow`} />
                </motion.span>
              ) : null}
            </AnimatePresence>
          </motion.span>
        </LayoutGroup>
      </div>

      <dl className={cn("flex flex-col", compact ? "mt-2" : "mt-4")}>
        {shown.map((part) => {
          const meta = PART_META[part];
          const value = parts[part];
          const isFresh = fresh === part;
          const Icon = meta.icon;
          return (
            <div
              key={part}
              className={cn(
                "relative grid grid-cols-[88px_1fr] gap-3 border-t border-border py-2.5 text-ui-sm",
                isFresh && "animate-fill-sweep sweep",
              )}
            >
              <dt className="flex items-center gap-1.5 self-start text-fg-3">
                <Icon weight={isFresh ? "fill" : "regular"} className="size-3.5 shrink-0 transition-all duration-[600ms]" aria-hidden />
                {meta.label}
              </dt>
              <dd data-cursor-target={`part-${part}`} className="min-w-0 text-foreground">
                <AnimatePresence mode="popLayout" initial={false}>
                  {value ? (
                    <motion.div
                      key="value"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: DUR.base, ease: EASE.settle }}
                      className="flex flex-col items-start gap-1.5"
                    >
                      {part === "goal" && goal ? <GoalTag goal={goal} /> : <PartValue value={value} edit={edits?.[part]} />}
                      {limit?.part === part ? <LimitChip text={limit.text} readOnly /> : null}
                    </motion.div>
                  ) : (
                    <motion.span key="empty" exit={{ opacity: 0 }} className="flex flex-col gap-1.5 pt-1">
                      <span className="h-2 w-[60%] rounded-full bg-status-track" />
                      {!compact ? <span className="h-2 w-[40%] rounded-full bg-status-track" /> : null}
                    </motion.span>
                  )}
                </AnimatePresence>
              </dd>
            </div>
          );
        })}
      </dl>

      {lastRun && !compact ? (
        <div className="mt-1 flex items-center justify-between border-t border-border pt-2.5 text-caption text-fg-3">
          <span>last run · {lastRun}</span>
          <span className="font-medium text-fg-2">run history</span>
        </div>
      ) : null}
    </div>
  );
}
