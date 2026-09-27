"use client";

import * as React from "react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import {
  BotBubble,
  CURSOR_HOP,
  CURSOR_IDLE,
  DemoFrame,
  LimitChip,
  PendingRow,
  PhoneFrame,
  PhoneChatHeader,
  PhoneTranscript,
  PhoneComposer,
  PillTabs,
  ScriptedCursor,
  SystemLine,
  TakeHistory,
  TEAM_TAKES,
  UserBubble,
  botById,
  composeSteps,
  pendingDuration,
  readDuration,
  useDemoPlayer,
  type CursorState,
  type PillTab,
  type TeamTake,
  type Timeline,
} from "@/components/product-mock";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "./section";
import { useLoopFocus } from "./loop-focus";
import { EASE, usePrefersReducedMotion } from "./_motion";
import { AnimatePresence, motion } from "motion/react";
import { REPLAY_HERO_EVENT } from "./hero-demo";
import { CtaButton } from "./cta-button";
import { YourBotDemo } from "./your-bot-demo";
import { Confetti } from "@/components/ui/sparkle";

/** The "build your own" tab id, and the tab order (presets, then yours). */
const YOURS = "yours";
const TAB_ORDER = [...TEAM_TAKES.map((t) => t.botId), YOURS];

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

/** One take's bubbles. `history` drops the cursor target so the scripted
    cursor only ever clicks the live take. */
function TakeBubbles({ take, s, history = false }: { take: TeamTake; s: State; history?: boolean }) {
  return (
    <>
      {s.sent ? <UserBubble text={take.instruction} limit={take.limit} /> : null}
      {s.saved ? <SystemLine text={`flow saved · **${take.flowSaved}**`} /> : null}
      {s.report ? <SystemLine timestamp text="mon 08:00" /> : null}
      {s.report ? (
        <BotBubble botId={take.botId} name={botById(take.botId).name.toLowerCase()} time="08:00" text={take.report.toLowerCase()}>
          <span
            data-cursor-target={history ? undefined : "human"}
            className={cn(
              "inline-flex h-8 w-fit items-center gap-1 rounded-full px-3.5 text-ui-sm font-medium",
              s.acted ? "bg-surface-2 text-foreground" : "bg-surface-inverse text-fg-inverse",
            )}
          >
            {s.acted ? <Check weight="bold" className="size-3 animate-check-in" aria-hidden /> : null}
            {take.human}
          </span>
        </BotBubble>
      ) : null}
      {s.confirmed ? <BotBubble botId={take.botId} name={botById(take.botId).name.toLowerCase()} time="08:01" text={take.confirmation} state="celebrate" /> : null}
      {s.pending ? <PendingRow label="working" botId={take.botId} /> : null}
    </>
  );
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
    startAt: 0.25,
    startDelay: 400,
    poster: "end",
  });
  const s = player.state;
  const bot = botById(take.botId);
  // The bot reacts when its tab takes over.
  const [arrived, setArrived] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setArrived(true), 1200);
    return () => clearTimeout(t);
  }, []);

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
      className="reveal"
      summary={summaryFor(take)}
      playing={player.playing}
      offscreen={player.offscreen}
      onSkip={player.skip}
    >
      <div ref={phoneRef} className="relative">
        <PhoneFrame>
          <PhoneChatHeader
            botId={bot.id}
            title={bot.name}
            status={s.confirmed ? "done" : s.pending ? "running" : s.report && !s.acted ? "needs-you" : s.saved ? "scheduled" : undefined}
            statusLabel={s.saved && !s.report && !s.pending ? take.flowSaved.split(" · ")[0] : undefined}
            subtitle={bot.team}
            character={
              !arrived ? "excited" : s.confirmed ? "celebrate" : s.pending ? "thinking" : s.report && !s.acted ? "waiting" : s.saved && !s.report ? "excited" : "idle"
            }
          />
          <PhoneTranscript deps={s}>
            {player.phase === "live" ? (
              <TakeHistory label="this week">
                <TakeBubbles take={take} s={player.end} history />
              </TakeHistory>
            ) : null}
            <TakeBubbles take={take} s={s} />
          </PhoneTranscript>
          <PhoneComposer
            value={player.phase === "poster" ? "" : s.composer}
            caret={!s.sent || player.phase === "poster"}
            keyboard={player.phase !== "poster" && !!s.composer && !s.sent}
          />
        </PhoneFrame>
        <ScriptedCursor containerRef={phoneRef} cursor={s.cursor} variant="touch" />
      </div>
    </DemoFrame>
  );
}

/** #agents: flows teams have built, one instruction and hard limit each. */
export function BotJobsSection() {
  const [active, setActive] = React.useState(TEAM_TAKES[0].botId);
  const [picked, setPicked] = React.useState(false);
  const reduced = usePrefersReducedMotion();
  const isYours = active === YOURS;
  const take = TEAM_TAKES.find((t) => t.botId === active) ?? TEAM_TAKES[0];

  // The "Your bot" tab bursts confetti on hover / focus, and once the first
  // time the section comes into view.
  const [burst, setBurst] = React.useState(0);
  const sectionRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setBurst((n) => n + 1);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const tabs: PillTab[] = [
    ...TEAM_TAKES.map((t) => {
      const bot = botById(t.botId);
      return { id: t.botId, label: bot.name, team: bot.team };
    }),
    {
      id: YOURS,
      label: "Your bot",
      team: "sales" as const,
      special: true,
      ariaLabel: "Build your own bot",
      onAttention: () => {
        if (!reduced) setBurst((n) => n + 1);
      },
      decoration: burst > 0 && !reduced ? <Confetti key={burst} /> : null,
    },
  ];

  // Presets play in order; "Your bot" comes after the four presets, then the
  // loop starts again.
  const advance = React.useCallback(() => {
    if (picked || reduced) return;
    setActive((id) => TAB_ORDER[(TAB_ORDER.indexOf(id) + 1) % TAB_ORDER.length]);
  }, [picked, reduced]);

  const startFromSentence = () => {
    document.getElementById("top")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    window.dispatchEvent(new Event(REPLAY_HERO_EVENT));
  };

  return (
    <Section id="agents" aria-labelledby="agents-title">
      <div ref={sectionRef}>
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
            {isYours ? (
              <>
                <p className="max-w-copy text-title text-foreground">
                  Your bot. <span className="text-fg-3">Start from a sentence; it names itself, picks a face and builds its flow.</span>
                </p>
                <dl className="grid max-w-copy gap-3 text-ui-sm">
                  <div className="grid grid-cols-[96px_1fr] items-start gap-3 border-t border-border pt-3">
                    <dt className="text-fg-3">You say</dt>
                    <dd className="text-foreground">what it&apos;s for, in plain words</dd>
                  </div>
                  <div className="grid grid-cols-[96px_1fr] items-start gap-3 border-t border-border pt-3">
                    <dt className="text-fg-3">It picks</dt>
                    <dd className="text-foreground">a name, a colour and a face</dd>
                  </div>
                  <div className="grid grid-cols-[96px_1fr] items-start gap-3 border-y border-border py-3">
                    <dt className="text-fg-3">You get</dt>
                    <dd className="text-foreground">a flow with all six parts, yours to change</dd>
                  </div>
                </dl>
              </>
            ) : (
            <>
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
            </>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <p className="text-title font-medium text-foreground">Your process, not ours.</p>
            <CtaButton asButton variant="soft" size="lg" onClick={startFromSentence}>
              Start from a sentence
            </CtaButton>
          </div>
        </div>

        <div className="relative min-w-0">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={isYours ? YOURS : take.botId}
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: EASE.outExpo }}
            >
              {isYours ? <YourBotDemo onDone={advance} /> : <TakeDemo take={take} onDone={advance} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </div>
    </Section>
  );
}
