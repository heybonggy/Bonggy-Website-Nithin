"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import {
  APPROVALS,
  AppWindow,
  ApprovalCard,
  ApprovalsInbox,
  CHAMPION_NOTE,
  CURSOR_HOP,
  CURSOR_IDLE,
  DemoFrame,
  SENDING_MS,
  ScriptedCursor,
  useDemoPlayer,
  type ApprovalState,
  type CursorState,
  type Timeline,
  PhoneFrame,
  PhoneChatHeader,
  PhoneTranscript,
} from "@/components/product-mock";
import { Section, SectionHeader } from "./section";
import { Stagger } from "./entrances";
import { BotAvatar } from "@/components/ui/mascot";
import { useLoopFocus } from "./loop-focus";
import { typingDuration } from "@/components/ui/typed-text";
import { BRIGHT_LINES } from "@/content/site";


type State = { approval: ApprovalState; cursor: CursorState };

const INITIAL: State = { approval: "pending", cursor: CURSOR_IDLE };

const patch = (s: State, a: Partial<State>): State => ({ ...s, ...a });

const TIMELINE: Timeline<Partial<State>> = [
  // Let the draft type out (TypedText), then a beat to read it.
  { action: {}, hold: CHAMPION_NOTE.body.reduce((ms, l) => ms + typingDuration(l), 0) + 1200 },
  { action: { cursor: { target: "approve", clicks: 0 } }, hold: CURSOR_HOP },
  { action: { cursor: { target: "approve", clicks: 1 }, approval: "sending" }, hold: SENDING_MS },
  { action: { approval: "approved", cursor: CURSOR_IDLE }, hold: 0 },
];

const SUMMARY =
  "Demo: the approvals inbox. Boomerang wants to send a note to Dana at Globex and needs your ok. Unstick wants to add 5 next-step tasks to your crm. Relay briefed 4 reps in #inbound, done and internal only. Echo's post to #q4-campaign is held for you. You open the note to Dana, read it, and approve it.";

/** #approvals: what waits for a person, and the lines Bonggy won't cross. */
export function ApprovalsSection() {
  const frameRef = React.useRef<HTMLDivElement>(null);
  const phoneRef = React.useRef<HTMLDivElement>(null);
  const windowRef = React.useRef<HTMLDivElement>(null);
  const focused = useLoopFocus(frameRef);
  const player = useDemoPlayer({
    timeline: TIMELINE,
    reducer: patch,
    initial: INITIAL,
    ref: frameRef,
    focused,
    loopAfter: 4500,
    startAt: 0.25,
    startDelay: 400,
  });
  const s = player.state;
  const items = APPROVALS.map((a) => (a.id === "a1" && s.approval === "approved" ? { ...a, action: "sent a note to dana at globex", status: "done" as const, age: "now" } : a));

  return (
    <Section id="approvals" card peek={<BotAvatar botId="boomerang" size={48} state="waiting" interactive className="-rotate-12" />} aria-labelledby="approvals-title">
      <SectionHeader
        title={<span id="approvals-title">Bots draft. You decide.</span>}
        intro="Anything a customer would see waits for a person. Everything else can run on its own, if your team says so."
      />

      <div ref={frameRef} className="reveal mt-10">
      <DemoFrame
        className="hidden sm:block"
        summary={SUMMARY}
        playing={player.playing}
        offscreen={player.offscreen}
        onSkip={player.skip}
      >
        <div ref={windowRef} className="relative">
          <AppWindow screen="approvals" title="Approvals" className="max-sm:h-auto sm:h-[460px] lg:h-[460px]">
            <div className="grid min-h-0 flex-1 auto-rows-max content-start gap-4 overflow-hidden p-3 sm:p-5 @min-[860px]:grid-cols-[minmax(0,1fr)_380px] @min-[860px]:auto-rows-auto">
              <div>
                <p className="mb-1 px-3 text-caption font-medium text-fg-3">
                  {items.filter((a) => a.status === "needs-you").length} need you
                </p>
                <ApprovalsInbox items={items} selectedId="a1" />
              </div>
              <ApprovalCard
                strip={CHAMPION_NOTE.strip}
                to={CHAMPION_NOTE.to}
                subject={CHAMPION_NOTE.subject}
                body={CHAMPION_NOTE.body}
                goal={CHAMPION_NOTE.goal}
                state={s.approval}
                className="self-start"
              />
            </div>
          </AppWindow>
          <ScriptedCursor containerRef={windowRef} cursor={s.cursor} />
        </div>
      </DemoFrame>
      {/* Below 640px: the same demo as a phone screen. */}
      <DemoFrame
        className="sm:hidden"
        summary={SUMMARY}
        playing={player.playing}
        offscreen={player.offscreen}
        onSkip={player.skip}
      >
        <div ref={phoneRef} className="relative">
          <PhoneFrame plate={false}>
            <PhoneChatHeader title="Approvals" subtitle={`${items.filter((a) => a.status === "needs-you").length} need you`} />
            <PhoneTranscript deps={s.approval} className="gap-3 px-2 pb-9">
              <ApprovalsInbox items={items.slice(0, 2)} selectedId="a1" />
              <ApprovalCard
                strip={CHAMPION_NOTE.strip}
                to={CHAMPION_NOTE.to}
                subject={CHAMPION_NOTE.subject}
                body={CHAMPION_NOTE.body}
                goal={CHAMPION_NOTE.goal}
                state={s.approval}
              />
            </PhoneTranscript>
          </PhoneFrame>
          <ScriptedCursor containerRef={phoneRef} cursor={s.cursor} variant="touch" />
        </div>
      </DemoFrame>
      </div>

      <Stagger as="ul" className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {BRIGHT_LINES.map((l) => (
          <li key={l.title} className="flex gap-3">
            <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-inverse text-fg-inverse">
              <Check weight="bold" className="size-3.5" aria-hidden />
            </span>
            <p className="text-body text-fg-2">
              <span className="font-medium text-foreground">{l.title}</span> {l.body}
            </p>
          </li>
        ))}
      </Stagger>
      <Link
        href="/security"
        className="mt-10 inline-flex min-h-11 items-center gap-1.5 text-ui font-medium text-foreground underline-offset-4 hover:underline"
      >
        How we handle security
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </Section>
  );
}
