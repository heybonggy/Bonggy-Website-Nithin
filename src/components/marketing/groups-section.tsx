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
  botById,
  pendingDuration,
  readDuration,
  useDemoPlayer,
  type Timeline,
} from "@/components/product-mock";
import { GroupAvatar } from "@/components/ui/mascot";
import { Section, SectionHeader } from "./section";
import { useLoopFocus } from "./loop-focus";

const RESEARCH = "top pains from 24 calls: slow onboarding, manual quotes, no forecast view. sharing with deal coach.";
const COACH = "got it. i'll add the matching pain to each stuck deal's next-step note. nothing sent.";

type Handoff = { from: string; label: string };

type State = {
  research: boolean;
  handoff: Handoff | null;
  pending: boolean;
  coach: boolean;
  system: boolean;
};

const INITIAL: State = { research: false, handoff: null, pending: false, coach: false, system: false };

const patch = (s: State, a: Partial<State>): State => ({ ...s, ...a });

const TIMELINE: Timeline<Partial<State>> = [
  { action: { pending: true }, hold: pendingDuration(RESEARCH) },
  { action: { pending: false, research: true }, hold: readDuration(RESEARCH) },
  { action: { handoff: { from: "campaign-researcher", label: "sharing pains with Deal Coach…" } }, hold: 2300 },
  { action: { system: true, pending: true }, hold: pendingDuration(COACH) },
  { action: { pending: false, coach: true, handoff: { from: "deal-coach", label: "adding pains to 5 next steps…" } }, hold: 2300 },
  { action: { handoff: { from: "inbound-router", label: "routing lead to Deal Coach…" } }, hold: 2300 },
  { action: { handoff: { from: "campaign-researcher", label: "sharing pains with Deal Coach…" } }, hold: 0 },
];

const SUMMARY =
  "Demo: a group called Marketing → Sales handoff with three bots: Campaign Researcher, Deal Coach and Inbound Router. Campaign Researcher posts the top pains from 24 calls (slow onboarding, manual quotes, no forecast view) and hands them to Deal Coach. Deal Coach adds the matching pain to each stuck deal's next-step note and sends nothing.";

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
  });
  const s = player.state;
  const members = HANDOFF_GROUP.members.map(botById);
  const researcher = botById("campaign-researcher");

  const sidebar = (
    <SidebarTeam team="marketing">
      <div className="flex items-center gap-2 rounded-md bg-wash-selected p-2">
        <GroupAvatar teams={members.map((m) => m.team)} size={24} />
        <span className="min-w-0">
          <span className="block truncate text-ui-sm font-medium text-foreground">{HANDOFF_GROUP.name}</span>
          <span className="block truncate text-caption text-fg-3">{members.length} bots · 2 teams</span>
        </span>
      </div>
      {members.map((m) => (
        <BotRow key={m.id} bot={m} className="ml-2" />
      ))}
    </SidebarTeam>
  );

  return (
    <Section id="groups" aria-labelledby="groups-title">
      <SectionHeader
        title={<span id="groups-title">Bots hand off work.</span>}
        intro="Put bots from different teams in one group. Marketing's research reaches sales without anyone copying it across."
      />
      <DemoFrame
        ref={frameRef}
        className="mt-12"
        summary={SUMMARY}
        playing={player.playing}
        offscreen={player.offscreen}
        onSkip={player.skip}
      >
        <AppWindow screen="bots" title={HANDOFF_GROUP.name} sidebar={sidebar} className="lg:h-[560px]">
          <div className="flex items-center justify-end gap-3 border-b sm:justify-between-[0.5px] border-border-strong px-4 py-2.5 sm:px-6">
            <span className="hidden text-caption text-fg-3 sm:inline">group · marketing and sales</span>
            <HandoffPill
              members={members.map((m) => ({ id: m.id, team: m.team }))}
              activeId={s.handoff?.from}
              label={s.handoff?.label}
            />
          </div>
          <div className="fade-t flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-4 pb-6 pt-8 sm:px-6">
            <div className="mx-auto flex w-full max-w-[600px] flex-col gap-4">
              {s.research ? <BotBubble team={researcher.team} text={RESEARCH} /> : null}
              {s.system ? <SystemLine text="**Campaign Researcher** handed off to **Deal Coach**" /> : null}
              {s.coach ? <BotBubble team="sales" text={COACH} /> : null}
              {s.pending ? <PendingRow label="working" /> : null}
            </div>
          </div>
        </AppWindow>
      </DemoFrame>
    </Section>
  );
}
