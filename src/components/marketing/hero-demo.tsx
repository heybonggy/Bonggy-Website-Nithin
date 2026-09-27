"use client";

import * as React from "react";
import {
  AppWindow,
  ApprovalCard,
  BOTS,
  BotBubble,
  BotRow,
  CHAMPION_NOTE,
  CHAMPION_TRACKER,
  CURSOR_HOP,
  CURSOR_IDLE,
  ChatComposer,
  DemoFrame,
  FLOW_PARTS,
  FlowCard,
  PendingRow,
  RunReceipt,
  SENDING_MS,
  ScriptedCursor,
  SidebarTeam,
  SystemLine,
  TEAM_LIST,
  UserBubble,
  composeSteps,
  pendingDuration,
  readDuration,
  useDemoPlayer,
  type ApprovalState,
  type CursorState,
  type FlowPart,
  type StatusKind,
  type Timeline,
} from "@/components/product-mock";
import { Mascot } from "@/components/ui/mascot";

/** Fired by "Start from a sentence" elsewhere on the page to replay the hero. */
export const REPLAY_HERO_EVENT = "bonggy:replay-hero";

const INSTRUCTION = "when a lost deal's champion changes jobs, tell me and draft a note.";
const REPLY = "got it. i'll watch your closed-lost champions and tell you when one moves.";
const FOUND = "found one. dana, a champion on a deal you lost last year, is now at globex. note drafted, not sent.";

const PARTS: Record<FlowPart, string | string[]> = {
  trigger: "a champion on a closed-lost deal changes jobs · checked daily",
  context: "closed-lost deals, last 18 months · crm contacts · job-change feed",
  steps: ["match the new company to your icp", "pull notes from the lost deal", "draft a short note in your voice"],
  approval: "you · before any note is sent",
  output: "draft note + crm task on the new account",
  goal: "q4 new pipeline",
};

type State = {
  composer: string;
  user: boolean;
  pending: "none" | "reply" | "found";
  reply: boolean;
  named: boolean;
  parts: FlowPart[];
  status: StatusKind;
  statusLabel?: string;
  tomorrow: boolean;
  found: boolean;
  approval: ApprovalState;
  receipt: boolean;
  cursor: CursorState;
};

const INITIAL: State = {
  composer: "",
  user: false,
  pending: "none",
  reply: false,
  named: false,
  parts: [],
  status: "off",
  statusLabel: "draft",
  tomorrow: false,
  found: false,
  approval: "pending",
  receipt: false,
  cursor: CURSOR_IDLE,
};

const patch = (s: State, a: Partial<State>): State => ({ ...s, ...a });

const TIMELINE: Timeline<Partial<State>> = [
  ...composeSteps<Partial<State>>(INSTRUCTION, (composer) => ({ composer })),
  { action: { cursor: { target: "send", clicks: 0 } }, hold: CURSOR_HOP },
  { action: { cursor: { target: "send", clicks: 1 } }, hold: 160 },
  { action: { composer: "", user: true, cursor: CURSOR_IDLE }, hold: 350 },
  { action: { pending: "reply" }, hold: pendingDuration(REPLY) },
  { action: { pending: "none", reply: true }, hold: readDuration(REPLY) },
  { action: { named: true }, hold: 900 },
  ...FLOW_PARTS.map((_, i) => ({ action: { parts: FLOW_PARTS.slice(0, i + 1) }, hold: 650 })),
  { action: { status: "scheduled" as const, statusLabel: "daily 07:00" }, hold: 1300 },
  { action: { tomorrow: true, status: "running" as const, statusLabel: "running" }, hold: 700 },
  { action: { pending: "found" }, hold: pendingDuration(FOUND) },
  { action: { pending: "none", found: true, status: "needs-you" as const, statusLabel: undefined }, hold: readDuration(FOUND) + 800 },
  { action: { cursor: { target: "approve", clicks: 0 } }, hold: CURSOR_HOP },
  { action: { cursor: { target: "approve", clicks: 1 }, approval: "sending" }, hold: SENDING_MS },
  { action: { approval: "approved", cursor: CURSOR_IDLE }, hold: 450 },
  { action: { receipt: true, status: "done" as const, statusLabel: "ran 07:02" }, hold: 0 },
];

const SUMMARY =
  "Demo: you type “when a lost deal's champion changes jobs, tell me and draft a note.” The bot names itself Champion Tracker and fills its flow: trigger, context, steps, approval (you, before any note is sent), output and goal (q4 new pipeline). Next morning it finds a champion who moved to a new company, drafts a note, and waits. You approve it. Its receipt: matched 1 champion, drafted 1 note, added 1 crm task; sent after your ok, nothing else sent.";

export function HeroDemo() {
  const frameRef = React.useRef<HTMLDivElement>(null);
  const windowRef = React.useRef<HTMLDivElement>(null);
  const player = useDemoPlayer({
    timeline: TIMELINE,
    reducer: patch,
    initial: INITIAL,
    ref: frameRef,
    startAt: 0.35,
    startDelay: 1000,
  });
  const s = player.state;
  const { replay } = player;

  React.useEffect(() => {
    const onReplay = () => replay();
    window.addEventListener(REPLAY_HERO_EVENT, onReplay);
    return () => window.removeEventListener(REPLAY_HERO_EVENT, onReplay);
  }, [replay]);

  const parts = Object.fromEntries(s.parts.map((p) => [p, PARTS[p]])) as Partial<Record<FlowPart, string | string[]>>;
  const fresh = s.status === "off" ? (s.parts.at(-1) ?? null) : null;
  const trackerStatus: StatusKind = s.named ? s.status : "off";

  const sidebar = (
    <>
      {TEAM_LIST.map((t) => (
        <SidebarTeam key={t.id} team={t.id}>
          {t.id === "sales" && s.named ? (
            <BotRow
              bot={CHAMPION_TRACKER}
              active
              fresh
              status={trackerStatus}
              preview={s.found && !s.receipt ? "needs you: note to dana" : s.receipt ? "sent after your ok" : CHAMPION_TRACKER.preview}
            />
          ) : null}
          {BOTS.filter((b) => b.team === t.id)
            .slice(0, t.id === "sales" && s.named ? 1 : 2)
            .map((b) => (
              <BotRow key={b.id} bot={b} />
            ))}
        </SidebarTeam>
      ))}
    </>
  );

  return (
    <DemoFrame
      ref={frameRef}
      summary={SUMMARY}
      playing={player.playing}
      offscreen={player.offscreen}
      onSkip={player.skip}
    >
      <div ref={windowRef} className="relative">
        <AppWindow screen="bots" title={s.named ? "Champion Tracker" : "new bot"} sidebar={sidebar}>
          <div className="fade-t flex min-h-0 flex-1 flex-col justify-end gap-4 overflow-hidden px-4 pb-2 pt-8 sm:px-6">
            <div className="mx-auto flex w-full max-w-[600px] flex-col gap-4">
              {!s.user ? (
                <div className="flex flex-col items-center gap-3 pb-6 text-center">
                  <Mascot state="idle" className="size-12" />
                  <p className="max-w-[28ch] text-ui-sm text-fg-3">describe the work in a sentence. i&apos;ll turn it into a flow.</p>
                </div>
              ) : null}
              {s.user ? <UserBubble text={INSTRUCTION} /> : null}
              {s.pending === "reply" ? <PendingRow label="thinking" /> : null}
              {s.reply ? <BotBubble team="sales" text={REPLY} /> : null}
              {s.named ? <SystemLine text="named itself **champion tracker**" /> : null}
              {s.named ? (
                <BotBubble team="sales">
                  <FlowCard
                    bot={CHAMPION_TRACKER}
                    parts={parts}
                    status={trackerStatus}
                    statusLabel={s.statusLabel}
                    state={s.parts.length < FLOW_PARTS.length ? "draft" : s.status === "running" ? "running" : "on"}
                    fresh={fresh}
                  />
                </BotBubble>
              ) : null}
              {s.tomorrow ? <SystemLine timestamp text="tomorrow 07:02" /> : null}
              {s.pending === "found" ? <PendingRow label="checking the job-change feed" /> : null}
              {s.found ? (
                <BotBubble team="sales" text={FOUND}>
                  <ApprovalCard
                    strip={CHAMPION_NOTE.strip}
                    to={CHAMPION_NOTE.to}
                    subject={CHAMPION_NOTE.subject}
                    body={CHAMPION_NOTE.body}
                    goal={CHAMPION_NOTE.goal}
                    state={s.approval}
                  />
                </BotBubble>
              ) : null}
              {s.receipt ? (
                <BotBubble team="sales">
                  <RunReceipt
                    className="w-fit"
                    title="run receipt · tue 07:02"
                    items={[
                      { verb: "matched", text: "1 champion" },
                      { verb: "drafted", text: "1 note" },
                      { verb: "added", text: "1 crm task" },
                    ]}
                    footer="sent after your ok. nothing else sent."
                  />
                </BotBubble>
              ) : null}
            </div>
          </div>
          <div className="mx-auto w-full max-w-[640px] px-3 pb-3 sm:px-5 sm:pb-4">
            <ChatComposer value={s.composer} caret={!s.user} />
          </div>
        </AppWindow>
        <ScriptedCursor containerRef={windowRef} cursor={s.cursor} />
      </div>
    </DemoFrame>
  );
}
