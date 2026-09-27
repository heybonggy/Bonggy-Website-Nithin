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
} from "@/components/product-mock";
import { PushPin } from "@phosphor-icons/react/dist/ssr";
import { GroupAvatar } from "@/components/ui/mascot";
import { Section, SectionHeader } from "./section";
import { useLoopFocus } from "./loop-focus";

const RESEARCH = "top pains from 24 calls: slow onboarding, manual quotes, no forecast view. sharing with deal coach.";
const COACH = "got it. i'll add the matching pain to each stuck deal's next-step note. nothing sent.";

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
  { from: "campaign-researcher", label: "sharing pains with Deal Coach…" },
  { from: "deal-coach", label: "adding pains to 5 next steps…" },
  { from: "inbound-router", label: "routing lead to Deal Coach…" },
];

const SUMMARY =
  "Demo: a group called Marketing → Sales handoff with three bots: Campaign Researcher, Deal Coach and Inbound Router. Campaign Researcher posts the top pains from 24 calls (slow onboarding, manual quotes, no forecast view) and hands them to Deal Coach. Deal Coach adds the matching pain to each stuck deal's next-step note and sends nothing.";

/** Pinned at the top of the group: what this group runs, and its last run. */
function PinnedRun() {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-surface-raised px-3 py-2.5 text-ui-sm shadow-e1 hairline">
      <PushPin weight="fill" className="size-4 shrink-0 text-fg-3" aria-hidden />
      <span className="min-w-0 flex-1 truncate">
        <span className="font-medium text-foreground">weekly handoff</span>
        <span className="text-fg-3"> · fridays 16:00 · pains → next steps</span>
      </span>
      <StatusPill status="done" label="last run · 3 handed off" className="hidden sm:inline-flex" />
    </div>
  );
}

function Take({ s }: { s: State }) {
  return (
    <>
      {s.research ? <BotBubble botId="campaign-researcher" name="campaign researcher" time="fri 15:58" text={RESEARCH} /> : null}
      {s.system ? <SystemLine text="**Campaign Researcher** handed off to **Deal Coach**" /> : null}
      {s.coach ? <BotBubble botId="deal-coach" name="deal coach" time="fri 16:01" text={COACH} /> : null}
      {s.pending ? <PendingRow label="working" botId={s.research ? "deal-coach" : "campaign-researcher"} /> : null}
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
        m.id === "inbound-router" ? (
          <div key={m.id} className="ml-2">
            <RunningBotRow bot={m} labels={["routing 2 leads…", "scoring a demo request…", "briefing #inbound…"]} />
          </div>
        ) : m.id === "deal-coach" ? (
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
        title={<span id="groups-title">Bots hand off work.</span>}
        intro="Put bots from different teams in one group. Marketing's research reaches sales without anyone copying it across."
      />
      <DemoFrame
        ref={frameRef}
        className="reveal mt-10"
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
                  <Take s={player.end} />
                </TakeHistory>
              ) : null}
              <Take s={s} />
            </div>
          </div>
        </AppWindow>
      </DemoFrame>
    </Section>
  );
}
