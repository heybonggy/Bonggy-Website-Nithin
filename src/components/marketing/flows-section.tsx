"use client";

import * as React from "react";
import {
  AppWindow,
  CURSOR_HOP,
  CURSOR_IDLE,
  DEAL_COACH_FLOW,
  DEAL_COACH_RECEIPT,
  DEAL_COACH_REMIX,
  DemoFrame,
  FLOW_LIST,
  FlowCard,
  FlowsList,
  RunHistory,
  RunReceipt,
  ScriptedCursor,
  botById,
  useDemoPlayer,
  type CursorState,
  type FlowCardState,
  type FlowEdit,
  type FlowPart,
  type StatusKind,
  type Timeline,
} from "@/components/product-mock";
import { Section, SectionHeader } from "./section";
import { useLoopFocus } from "./loop-focus";

type State = {
  edits: Partial<Record<FlowPart, FlowEdit>>;
  status: StatusKind;
  statusLabel?: string;
  card: FlowCardState;
  receipt: boolean;
  cursor: CursorState;
};

const INITIAL: State = {
  edits: {},
  status: "scheduled",
  statusLabel: "mondays 08:00",
  card: "on",
  receipt: false,
  cursor: CURSOR_IDLE,
};

const patch = (s: State, a: Partial<State>): State => ({ ...s, ...a });

const TIMELINE: Timeline<Partial<State>> = [
  { action: { cursor: { target: "part-trigger", clicks: 0 } }, hold: CURSOR_HOP },
  { action: { cursor: { target: "part-trigger", clicks: 1 } }, hold: 200 },
  { action: { edits: { trigger: DEAL_COACH_REMIX.trigger } }, hold: 2000 },
  { action: { cursor: { target: "part-context", clicks: 1 } }, hold: CURSOR_HOP },
  { action: { cursor: { target: "part-context", clicks: 2 } }, hold: 200 },
  {
    action: {
      edits: { trigger: DEAL_COACH_REMIX.trigger, context: DEAL_COACH_REMIX.context },
      statusLabel: "fridays after forecast",
    },
    hold: 2200,
  },
  { action: { cursor: CURSOR_IDLE, status: "running", statusLabel: "reading open deals…", card: "running" }, hold: 2200 },
  { action: { status: "done", statusLabel: "done · fri 16:05", card: "on", receipt: true }, hold: 0 },
];

const SUMMARY =
  "Demo: the Deal Coach flow, with six parts. Trigger: every Monday at 08:00. Context: open deals in the crm, calendar and call notes. Steps: read every open deal, flag deals with no next step or 14+ days quiet, suggest one next step per deal. Approval: you, before any crm change, with a hard limit: never email anyone. Output: this chat and a crm task per deal. Goal: q4 enterprise logos. You change the trigger to Fridays after forecast and narrow the context to enterprise deals. The run reads 18 open deals, finds 5 stuck, adds 5 next-step tasks, and sends nothing.";

/** #flows: the six parts of a flow, remixed live. */
export function FlowsSection() {
  const frameRef = React.useRef<HTMLDivElement>(null);
  const windowRef = React.useRef<HTMLDivElement>(null);
  const focused = useLoopFocus(frameRef);
  const player = useDemoPlayer({
    timeline: TIMELINE,
    reducer: patch,
    initial: INITIAL,
    ref: frameRef,
    focused,
    loopAfter: 5000,
  });
  const s = player.state;
  const bot = botById(DEAL_COACH_FLOW.botId);

  const parts = {
    ...DEAL_COACH_FLOW.parts,
    ...(s.edits.trigger ? { trigger: s.edits.trigger.to } : {}),
    ...(s.edits.context ? { context: s.edits.context.to } : {}),
  };

  return (
    <Section id="flows" aria-labelledby="flows-title">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <SectionHeader
          title={<span id="flows-title">Every bot runs a flow you design.</span>}
          intro="Six parts: trigger, context, steps, approval, output and goal. Change any of them, any time."
        />
        <p className="max-w-[34ch] text-body font-medium text-foreground lg:text-right">
          Start from a preset, or from a sentence. Either way, the flow is yours.
        </p>
      </div>

      <DemoFrame
        ref={frameRef}
        className="mt-12"
        summary={SUMMARY}
        playing={player.playing}
        offscreen={player.offscreen}
        onSkip={player.skip}
      >
        <div ref={windowRef} className="relative">
          <AppWindow
            screen="flows"
            title="Flows"
            className="max-sm:h-auto"
            sidebar={
              <div className="pt-1">
                <p className="px-2 pb-1 pt-2 text-caption font-medium text-fg-3">flows</p>
                <FlowsList flows={FLOW_LIST} selectedId={DEAL_COACH_FLOW.botId} />
              </div>
            }
          >
            <div className="grid min-h-0 flex-1 auto-rows-max content-start gap-5 overflow-hidden p-4 sm:fade-y sm:p-6 @min-[900px]:grid-cols-[minmax(0,1fr)_300px]">
              <FlowCard
                bot={bot}
                parts={parts}
                limit={DEAL_COACH_FLOW.limit}
                status={s.status}
                statusLabel={s.statusLabel}
                state={s.card}
                edits={s.edits}
                lastRun={DEAL_COACH_FLOW.lastRun}
              />
              <div className="flex flex-col gap-4">
                <div>
                  <p className="mb-2 text-caption font-medium text-fg-3">run history</p>
                  <RunHistory runs={DEAL_COACH_FLOW.runs.slice(1)} />
                </div>
                {/* Always laid out so the page doesn't shift when it appears. */}
                <div key={String(s.receipt)} className={s.receipt ? "animate-entry" : "invisible"}>
                  <RunReceipt
                    title={DEAL_COACH_RECEIPT.title}
                    items={DEAL_COACH_RECEIPT.items}
                    footer={DEAL_COACH_RECEIPT.footer}
                  />
                </div>
              </div>
            </div>
          </AppWindow>
          <ScriptedCursor containerRef={windowRef} cursor={s.cursor} />
        </div>
      </DemoFrame>
    </Section>
  );
}
