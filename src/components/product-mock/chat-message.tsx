"use client";

import {
  ArrowBendUpLeft,
  CircleNotch,
  DotsThree,
  Smiley,
  Target,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { AgentAvatar } from "./avatar";
import type { Agent } from "./legacy-data";

/** The user's message: a small right-aligned bubble. */
export function UserMessage({ children, time }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="flex flex-col items-end gap-1">
      <div className="max-w-[80%] rounded-lg rounded-br-[3px] border border-border bg-foreground/[0.07] px-3.5 py-2.5 text-[13.5px] leading-relaxed text-foreground">
        {children}
      </div>
      {time ? <span className="font-mono text-[10px] text-muted-foreground">{time}</span> : null}
    </div>
  );
}

/**
 * An agent's message: avatar and name, then wide left-aligned content.
 * Hover actions (react, reply, more) appear beside it; `showActions` pins
 * them visible, e.g. in a static preview.
 */
export function AgentMessage({
  agent,
  time,
  showActions = false,
  children,
}: {
  agent: Pick<Agent, "name" | "avatar">;
  time?: string;
  showActions?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="group/msg relative flex gap-3">
      <AgentAvatar avatar={agent.avatar} size={28} className="mt-0.5" />
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-baseline gap-2">
          <span className="text-[13px] font-medium text-foreground">{agent.name}</span>
          {time ? <span className="font-mono text-[10px] text-muted-foreground">{time}</span> : null}
        </div>
        <div className="grid grid-cols-1 gap-2.5">{children}</div>
      </div>
      <MessageActions visible={showActions} />
    </div>
  );
}

function MessageActions({ visible }: { visible: boolean }) {
  const btn =
    "flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60";
  return (
    <div
      className={cn(
        "absolute -top-3 right-0 hidden items-center rounded-lg border border-border bg-card p-0.5 shadow-lg transition-opacity sm:flex",
        visible ? "opacity-100" : "opacity-0 group-hover/msg:opacity-100 group-focus-within/msg:opacity-100",
      )}
    >
      <button type="button" aria-label="React" className={btn}>
        <Smiley className="size-3.5" aria-hidden />
      </button>
      <button type="button" aria-label="Reply" className={btn}>
        <ArrowBendUpLeft className="size-3.5" aria-hidden />
      </button>
      <button type="button" aria-label="More actions" className={btn}>
        <DotsThree weight="bold" className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}

/** One line of what the agent is doing, in mono. */
export function StatusLine({ children, working = false }: { children: React.ReactNode; working?: boolean }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11.5px] text-muted-foreground">
      {working ? (
        <CircleNotch className="size-3.5 animate-spin text-signal" aria-hidden />
      ) : (
        <span className="size-1.5 rounded-full bg-signal" aria-hidden />
      )}
      <span className="min-w-0 truncate">{children}</span>
    </div>
  );
}

/** Which revenue goal a piece of work maps to. */
export function GoalChip({ goal }: { goal: string }) {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-signal/35 bg-signal/[0.08] px-2.5 py-1 text-[11.5px] text-signal">
      <Target className="size-3.5" aria-hidden />
      Mapped to goal: {goal}
    </span>
  );
}
