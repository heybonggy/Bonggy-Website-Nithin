"use client";

import * as React from "react";
import {
  AppWindow,
  BotBubble,
  BotRow,
  DemoFrame,
  HANDOFF_GROUP,
  HandoffPill,
  PendingRow,
  SidebarTeam,
  SystemLine,
  TakeHistory,
  StatusPill,
  RunningBotRow,
  useAmbientTick,
  botById,
  pendingDuration,
  readDuration,
  useDemoPlayer,
  type Timeline,
  PhoneFrame,
  PhoneChatHeader,
  PhoneTranscript,
  PhoneComposer,
} from "@/components/product-mock";
import { PushPin } from "@phosphor-icons/react/dist/ssr";
import { GroupAvatar } from "@/components/ui/mascot";
import { Section, SectionHeader } from "./section";
import { useLoopFocus } from "./loop-focus";
import { GROUPS_SECTION } from "@/content/pages/home";

const RESEARCH = "top pains from 24 calls: slow onboarding, manual quotes, no forecast view. sharing with unstick. no copy drafted.";
const COACH = "got it. i'll add the matching pain to each stuck deal's next-step note. nothing sent.";

// Last week's handoff, shown faded above today's once the demo has played.
const EARLIER_RESEARCH = "top pains from 19 calls: pricing confusion, slow security review, no admin seats. sharing with unstick.";
const EARLIER_COACH = "added the matching pain to 3 stuck deals' next steps. nothing sent.";

type State = {
  research: boolean;
  pending: boolean;
  coach: boolean;
  system: boolean;
};

const INITIAL: State = { research: false, pending: false, coach: false, system: false };

const patch = (s: State, a: Partial<State>): State => ({ ...s, ...a });

const TIMELINE: Timeline<Partial<State>> = [
  { action: { pending: true }, hold: pendingDuration(RESEARCH) },
  { action: { pending: false, research: true }, hold: readDuration(RESEARCH) },
  { action: { system: true, pending: true }, hold: pendingDuration(COACH) },
  { action: { pending: false, coach: true }, hold: 0 },
];

const HANDOFFS = [
  // Short enough to fit the pill inside a 360px phone.
  { from: "echo", label: "pains to Unstick…" },
  { from: "unstick", label: "adding pains to 5 deals…" },
  { from: "relay", label: "routing a lead…" },
];

const SUMMARY =
  "Demo: a group called Marketing → Sales handoff with three bots: Echo, Unstick and Relay. Echo posts the top pains from 24 calls (slow onboarding, manual quotes, no forecast view) and hands them to Unstick. Unstick adds the matching pain to each stuck deal's next-step note and sends nothing.";

/** Pinned at the top of the group: what this group runs, and its last run. */
function PinnedRun() {
  return (
    <div className="relative z-10">
      <div className="flex gap-3 rounded-xl bg-surface-raised px-3 py-2.5 text-ui-sm shadow-e1 hairline">
        <PushPin weight="fill" className="mt-0.5 size-4 shrink-0 text-fg-3" aria-hidden />
        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span>
            <span className="font-medium text-foreground">weekly handoff</span>
            <span className="text-fg-3"> · fridays 16:00 · call pains → deal next steps</span>
          </span>
          <StatusPill status="done" label="last run · 3 pains handed off" className="self-start" />
        </span>
      </div>
      {/* Messages scroll up under the pinned card through a soft 16px fade. */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-full h-4 bg-gradient-to-b from-surface-raised to-transparent" />
    </div>
  );
}

function Take({ s }: { s: State }) {
  return (
    <>
      {s.research ? <BotBubble botId="echo" name="echo" time="fri 15:58" text={RESEARCH} /> : null}
      {s.system ? <SystemLine text="**Echo** handed off to **Unstick**" /> : null}
      {s.coach ? <BotBubble botId="unstick" name="unstick" time="fri 16:01" text={COACH} /> : null}
      {s.pending ? <PendingRow label="working" botId={s.research ? "unstick" : "echo"} /> : null}
    </>
  );
}

/** The previous weekly run: different messages, a week earlier. */
function EarlierTake() {
  return (
    <>
      <BotBubble botId="echo" name="echo" time="last fri 15:57" text={EARLIER_RESEARCH} />
      <SystemLine text="**Echo** handed off to **Unstick**" />
      <BotBubble botId="unstick" name="unstick" time="last fri 16:02" text={EARLIER_COACH} />
    </>
  );
}

/** #groups: bots from different teams in one group, handing off work. */
export function GroupsSection() {
  const frameRef = React.useRef<HTMLDivElement>(null);
  const focused = useLoopFocus(frameRef);
  const player = useDemoPlayer({
    timeline: TIMELINE,
    reducer: patch,
    initial: INITIAL,
    ref: frameRef,
    focused,
    loopAfter: 4000,
    poster: "end",
    startAt: 0.25,
    startDelay: 400,
  });
  // The handoff pill cycles on its own while the window is on screen.
  const tick = useAmbientTick(frameRef, 2300, 900);
  const handoff = HANDOFFS[tick % HANDOFFS.length];
  const s = player.state;
  const members = HANDOFF_GROUP.members.map(botById);

  const sidebar = (
    <SidebarTeam team="marketing">
      <div className="flex items-center gap-2 rounded-md bg-wash-selected p-2">
        <GroupAvatar botIds={members.map((m) => m.id)} size={24} />
        <span className="min-w-0">
          <span className="block truncate text-ui-sm font-medium text-foreground">{HANDOFF_GROUP.name}</span>
          <span className="block truncate text-caption text-fg-3">{members.length} bots · 2 teams</span>
        </span>
      </div>
      {members.map((m) =>
        m.id === "relay" ? (
          <div key={m.id} className="ml-2">
            <RunningBotRow bot={m} labels={["routing 2 leads…", "scoring a demo request…", "briefing #inbound…"]} />
          </div>
        ) : m.id === "unstick" ? (
          <BotRow key={m.id} bot={m} status="needs-you" preview="5 tasks to add" className="ml-2" />
        ) : (
          <BotRow key={m.id} bot={m} className="ml-2" />
        ),
      )}
    </SidebarTeam>
  );

  return (
    <Section id="groups" card aria-labelledby="groups-title">
      <SectionHeader
        align="right"
        title={<span id="groups-title">{GROUPS_SECTION.title}</span>}
        intro={GROUPS_SECTION.intro}
      />
      <div ref={frameRef} className="reveal mt-10">
      <DemoFrame
        className="hidden sm:block"
        summary={SUMMARY}
        playing={player.playing}
        offscreen={player.offscreen}
        onSkip={player.skip}
      >
        <AppWindow screen="bots" title={HANDOFF_GROUP.name} sidebar={sidebar} className="sm:h-[520px] lg:h-[520px]">
          <div className="flex items-center justify-end gap-3 border-b-[0.5px] border-border-strong px-4 py-2.5 sm:justify-between sm:px-6">
            <span className="hidden text-caption text-fg-3 sm:inline">group · marketing and sales</span>
            <HandoffPill
              members={members.map((m) => ({ id: m.id, team: m.team }))}
              activeId={handoff.from}
              label={handoff.label}
            />
          </div>
          <div className="px-4 pt-3 sm:px-6">
            <div className="mx-auto max-w-[600px]">
              <PinnedRun />
            </div>
          </div>
          <div className="fade-t flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-4 pb-6 pt-6 sm:px-6">
            <div className="mx-auto flex w-full max-w-[600px] flex-col gap-4">
              {player.phase === "live" ? (
                <TakeHistory label="today">
                  <EarlierTake />
                </TakeHistory>
              ) : null}
              <Take s={s} />
            </div>
          </div>
        </AppWindow>
      </DemoFrame>
      {/* Below 640px: the same demo as a phone screen. */}
      <DemoFrame
        className="sm:hidden"
        summary={SUMMARY}
        playing={player.playing}
        offscreen={player.offscreen}
        onSkip={player.skip}
      >
        <div className="relative">
          <PhoneFrame plate={false}>
            <PhoneChatHeader title={HANDOFF_GROUP.name} subtitle="3 bots · marketing and sales" />
            <div className="flex shrink-0 justify-center border-b-[0.5px] border-border py-2">
              <HandoffPill members={members.map((m) => ({ id: m.id, team: m.team }))} activeId={handoff.from} label={handoff.label} />
            </div>
            <div className="shrink-0 px-3 pt-3">
              <PinnedRun />
            </div>
            <PhoneTranscript deps={s}>
              {player.phase === "live" ? (
                <TakeHistory label="today">
                  <EarlierTake />
                </TakeHistory>
              ) : null}
              <Take s={s} />
            </PhoneTranscript>
            <PhoneComposer caret />
          </PhoneFrame>
        </div>
      </DemoFrame>
      </div>
    </Section>
  );
}
