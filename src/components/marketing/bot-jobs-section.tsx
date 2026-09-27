"use client";

import * as React from "react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import {
  BotBubble,
  CURSOR_HOP,
  CURSOR_IDLE,
  ChatComposer,
  DemoFrame,
  LimitChip,
  PendingRow,
  PhoneFrame,
  PillTabs,
  ScriptedCursor,
  SystemLine,
  TEAM_TAKES,
  UserBubble,
  botById,
  composeSteps,
  pendingDuration,
  readDuration,
  useDemoPlayer,
  type CursorState,
  type TeamTake,
  type Timeline,
} from "@/components/product-mock";
import { BotAvatar } from "@/components/ui/mascot";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "./section";
import { useLoopFocus } from "./loop-focus";
import { usePrefersReducedMotion } from "./_motion";
import { REPLAY_HERO_EVENT } from "./hero-demo";
import { CtaButton } from "./cta-button";

/** Wait after a take ends before the next tab, until someone picks one. */
const AUTO_ADVANCE_MS = 4000;

type State = {
  composer: string;
  sent: boolean;
  pending: boolean;
  saved: boolean;
  report: boolean;
  acted: boolean;
  confirmed: boolean;
  cursor: CursorState;
};

const INITIAL: State = {
  composer: "",
  sent: false,
  pending: false,
  saved: false,
  report: false,
  acted: false,
  confirmed: false,
  cursor: CURSOR_IDLE,
};

const patch = (s: State, a: Partial<State>): State => ({ ...s, ...a });

function timelineFor(take: TeamTake): Timeline<Partial<State>> {
  return [
    ...composeSteps<Partial<State>>(take.instruction, (composer) => ({ composer })),
    { action: {}, hold: 350 },
    { action: { composer: "", sent: true }, hold: 500 },
    { action: { pending: true }, hold: 1300 },
    { action: { pending: false, saved: true }, hold: 900 },
    { action: { pending: true }, hold: pendingDuration(take.report) },
    { action: { pending: false, report: true }, hold: readDuration(take.report) },
    { action: { cursor: { target: "human", clicks: 0 } }, hold: CURSOR_HOP },
    { action: { cursor: { target: "human", clicks: 1 }, acted: true }, hold: 500 },
    { action: { cursor: CURSOR_IDLE, pending: true }, hold: 1200 },
    { action: { pending: false, confirmed: true }, hold: 0 },
  ];
}

function summaryFor(take: TeamTake) {
  const bot = botById(take.botId);
  return `Demo: you tell ${bot.name} “${take.instruction}” The flow saves as ${take.flowSaved}, with the hard limit “${take.limit}” The bot reports: ${take.report} You ${take.human}. It confirms: ${take.confirmation}`;
}

function TakeDemo({ take, onDone }: { take: TeamTake; onDone: () => void }) {
  const frameRef = React.useRef<HTMLDivElement>(null);
  const phoneRef = React.useRef<HTMLDivElement>(null);
  const focused = useLoopFocus(frameRef);
  const timeline = React.useMemo(() => timelineFor(take), [take]);
  const player = useDemoPlayer({
    timeline,
    reducer: patch,
    initial: INITIAL,
    ref: frameRef,
    focused,
    startDelay: 600,
  });
  const s = player.state;
  const bot = botById(take.botId);

  const { done, playing } = player;
  const wasPlaying = React.useRef(false);
  React.useEffect(() => {
    if (playing) wasPlaying.current = true;
    if (!done || !wasPlaying.current) return;
    const t = setTimeout(onDone, AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [done, playing, onDone]);

  return (
    <DemoFrame
      ref={frameRef}
      summary={summaryFor(take)}
      playing={player.playing}
      offscreen={player.offscreen}
      onSkip={player.skip}
    >
      <div ref={phoneRef} className="relative">
        <PhoneFrame>
          <div className="flex items-center gap-2 border-b border-border px-4 pb-3 pt-10">
            <BotAvatar team={bot.team} size={28} />
            <span className="min-w-0">
              <span className="block truncate text-ui-sm font-semibold text-foreground">{bot.name}</span>
              <span className="block text-caption text-fg-3">{bot.team}</span>
            </span>
          </div>
          <div className="fade-t flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-3 pb-2 pt-6">
            {s.sent ? <UserBubble text={take.instruction} limit={take.limit} /> : null}
            {s.saved ? <SystemLine text={`flow saved · **${take.flowSaved}**`} /> : null}
            {s.report ? (
              <BotBubble team={bot.team} text={take.report.toLowerCase()}>
                <span
                  data-cursor-target="human"
                  className={cn(
                    "inline-flex h-7 w-fit items-center gap-1 rounded-full px-3 text-caption font-medium",
                    s.acted ? "bg-surface-2 text-foreground" : "bg-surface-inverse text-fg-inverse",
                  )}
                >
                  {s.acted ? <Check weight="bold" className="size-3 animate-check-in" aria-hidden /> : null}
                  {take.human}
                </span>
              </BotBubble>
            ) : null}
            {s.confirmed ? <BotBubble team={bot.team} text={take.confirmation} /> : null}
            {s.pending ? <PendingRow label="working" /> : null}
          </div>
          <div className="px-2.5 pb-3">
            <ChatComposer value={s.composer} caret={!s.sent} className="shadow-e1" />
          </div>
        </PhoneFrame>
        <ScriptedCursor containerRef={phoneRef} cursor={s.cursor} />
      </div>
    </DemoFrame>
  );
}

/** #agents: flows teams have built, one instruction and hard limit each. */
export function BotJobsSection() {
  const [active, setActive] = React.useState(TEAM_TAKES[0].botId);
  const [picked, setPicked] = React.useState(false);
  const reduced = usePrefersReducedMotion();
  const take = TEAM_TAKES.find((t) => t.botId === active) ?? TEAM_TAKES[0];
  const tabs = TEAM_TAKES.map((t) => {
    const bot = botById(t.botId);
    return { id: t.botId, label: bot.name, team: bot.team };
  });

  const advance = React.useCallback(() => {
    if (picked || reduced) return;
    setActive((id) => {
      const i = TEAM_TAKES.findIndex((t) => t.botId === id);
      return TEAM_TAKES[(i + 1) % TEAM_TAKES.length].botId;
    });
  }, [picked, reduced]);

  const startFromSentence = () => {
    document.getElementById("top")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    window.dispatchEvent(new Event(REPLAY_HERO_EVENT));
  };

  return (
    <Section id="agents" aria-labelledby="agents-title">
      <SectionHeader
        kicker="Flows teams have built"
        title={<span id="agents-title">A bot for every job.</span>}
        intro="Say what you want in plain words, and what it must never do. The limit becomes part of the flow."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <div className="flex min-w-0 flex-col">
          <PillTabs
            tabs={tabs}
            value={active}
            onChange={(id) => {
              setPicked(true);
              setActive(id);
            }}
            idPrefix="bot-jobs"
            label="Flows teams have built"
          />
          <div
            role="tabpanel"
            id="bot-jobs-panel"
            aria-labelledby={`bot-jobs-tab-${active}`}
            className="mt-8 flex flex-col gap-6"
          >
            <p className="max-w-copy text-title text-foreground">
              {take.description[0]} <span className="text-fg-3">{take.description[1]}</span>
            </p>
            <dl className="grid max-w-copy gap-3 text-ui-sm">
              <div className="grid grid-cols-[96px_1fr] items-start gap-3 border-t border-border pt-3">
                <dt className="text-fg-3">You said</dt>
                <dd className="text-foreground">“{take.instruction}”</dd>
              </div>
              <div className="grid grid-cols-[96px_1fr] items-start gap-3 border-t border-border pt-3">
                <dt className="text-fg-3">Hard limit</dt>
                <dd>
                  <LimitChip text={take.limit.replace(/\.$/, "").toLowerCase()} />
                </dd>
              </div>
              <div className="grid grid-cols-[96px_1fr] items-start gap-3 border-y border-border py-3">
                <dt className="text-fg-3">Flow</dt>
                <dd className="text-foreground">{take.flowSaved}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <p className="text-title font-medium text-foreground">Your process, not ours.</p>
            <CtaButton asButton variant="soft" size="lg" onClick={startFromSentence}>
              Start from a sentence
            </CtaButton>
          </div>
        </div>

        <TakeDemo key={take.botId} take={take} onDone={advance} />
      </div>
    </Section>
  );
}
