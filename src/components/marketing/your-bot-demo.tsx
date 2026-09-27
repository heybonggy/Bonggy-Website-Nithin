"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, FileText, HandPalm, Lightning, ListNumbers, Stack, Target } from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  BotBubble,
  CURSOR_HOP,
  CURSOR_IDLE,
  DemoFrame,
  PendingRow,
  PhoneChatHeader,
  PhoneComposer,
  PhoneFrame,
  PhoneTranscript,
  ScriptedCursor,
  SystemLine,
  UserBubble,
  composeSteps,
  pendingDuration,
  useDemoPlayer,
  type CursorState,
  type Timeline,
} from "@/components/product-mock";
import { BotAvatar } from "@/components/ui/mascot";
import { Confetti } from "@/components/ui/sparkle";
import { botColorVars, type BotLook } from "@/components/ui/bot-look";
import { cn } from "@/lib/utils";
import { CAL_LINK } from "./cta-button";
import { EASE, SPRING, usePrefersReducedMotion } from "./_motion";
import { useLoopFocus } from "./loop-focus";

/** Each loop types a different purpose; the bot picks its own name and look. */
export const YOUR_BOT_TAKES: { purpose: string; name: string; look: BotLook; parts: string[] }[] = [
  {
    purpose: "every Friday, find deals with no next step and nudge the owner",
    name: "Nudge",
    look: { color: "violet", shape: "round", eyes: "dots", accessory: "none" },
    parts: ["fridays 16:00", "open deals · crm", "find · draft · nudge", "you · before any message", "a nudge per owner", "q4 new pipeline"],
  },
  {
    purpose: "when a demo gets booked, brief the rep in #sales",
    name: "Herald",
    look: { color: "sky", shape: "capsule", eyes: "visor", accessory: "antenna" },
    parts: ["a demo gets booked", "crm · calendar · call notes", "research · brief", "internal only", "a brief in #sales", "pipeline from inbound"],
  },
  {
    purpose: "turn every lost deal into a win-back list",
    name: "Rewind",
    look: { color: "coral", shape: "blob", eyes: "arcs", accessory: "none" },
    parts: ["a deal is closed-lost", "lost deals · notes", "score · group · list", "you · before any outreach", "a win-back list", "q4 new pipeline"],
  },
];

/** Plays a different purpose each time the tab comes round. */
let takeCounter = 0;

const PARTS: { label: string; icon: PhosphorIcon }[] = [
  { label: "Trigger", icon: Lightning },
  { label: "Context", icon: Stack },
  { label: "Steps", icon: ListNumbers },
  { label: "Approval", icon: HandPalm },
  { label: "Output", icon: FileText },
  { label: "Goal", icon: Target },
];

type State = {
  composer: string;
  sent: boolean;
  pending: boolean;
  woke: boolean;
  chips: number;
  card: boolean;
  cursor: CursorState;
};

const INITIAL: State = { composer: "", sent: false, pending: false, woke: false, chips: 0, card: false, cursor: CURSOR_IDLE };
const patch = (s: State, a: Partial<State>): State => ({ ...s, ...a });

function timelineFor(purpose: string): Timeline<Partial<State>> {
  return [
    { action: {}, hold: 500 },
    ...composeSteps<Partial<State>>(purpose, (composer) => ({ composer })),
    { action: { cursor: { target: "send", clicks: 0 } }, hold: CURSOR_HOP },
    { action: { cursor: { target: "send", clicks: 1 } }, hold: 160 },
    { action: { composer: "", sent: true, cursor: CURSOR_IDLE }, hold: 300 },
    { action: { pending: true }, hold: pendingDuration(purpose, 0.6) },
    { action: { pending: false, woke: true }, hold: 1700 },
    ...PARTS.map((_, i) => ({ action: { chips: i + 1 }, hold: 380 })),
    { action: {}, hold: 500 },
    { action: { card: true }, hold: 0 },
  ];
}

/** The fifth tab's take: your sentence becomes a bot with a name, a face and a flow. */
export function YourBotDemo({ onDone }: { onDone: () => void }) {
  const frameRef = React.useRef<HTMLDivElement>(null);
  const phoneRef = React.useRef<HTMLDivElement>(null);
  const [take] = React.useState(() => YOUR_BOT_TAKES[takeCounter++ % YOUR_BOT_TAKES.length]);
  const timeline = React.useMemo(() => timelineFor(take.purpose), [take]);
  const focused = useLoopFocus(frameRef);
  const reduced = usePrefersReducedMotion();
  const player = useDemoPlayer({
    timeline,
    reducer: patch,
    initial: INITIAL,
    ref: frameRef,
    focused,
    startAt: 0.25,
    startDelay: 400,
  });
  const s = player.state;

  const { done, playing } = player;
  const wasPlaying = React.useRef(false);
  React.useEffect(() => {
    if (playing) wasPlaying.current = true;
    if (!done || !wasPlaying.current) return;
    const t = setTimeout(onDone, 5000);
    return () => clearTimeout(t);
  }, [done, playing, onDone]);

  const blank: BotLook = { color: "graphite", shape: "pebble", eyes: "pill", accessory: "none" };
  const name = take.name.toLowerCase();

  return (
    <div className="relative">
      <DemoFrame
        ref={frameRef}
        className="reveal"
        summary={`Demo: you type “${take.purpose}”. The blank bot wakes up, picks a colour and a face, and names itself ${take.name}. Its flow snaps in: trigger, context, steps, approval, output and goal. Then: this one's yours, build it on a strategy call.`}
        playing={player.playing}
        offscreen={player.offscreen}
        onSkip={player.skip}
      >
        <div ref={phoneRef} className="relative">
          <PhoneFrame>
            <PhoneChatHeader
              title={s.woke ? take.name : "new bot"}
              subtitle={s.woke ? "yours · just named" : "no purpose yet"}
              avatar={
                s.woke ? (
                  <span className="relative inline-flex">
                    <BotAvatar look={take.look} size={30} state={s.card ? "happy" : "celebrate"} />
                    {!reduced ? <Confetti key="wake" /> : null}
                  </span>
                ) : (
                  <span className="inline-flex grayscale" style={{ opacity: 0.45 }}>
                    <BotAvatar look={blank} size={30} state="drowsy" />
                  </span>
                )
              }
            />
            <PhoneTranscript deps={s}>
              {!s.sent ? (
                <p className="pt-8 text-center text-ui-sm text-fg-3">a blank bot. tell it what it&apos;s for.</p>
              ) : null}
              {s.sent ? <UserBubble text={take.purpose} /> : null}
              {s.pending ? <PendingRow label="waking up" /> : null}
              {s.woke ? <SystemLine text={`named itself **${name}**`} /> : null}
              {s.woke ? (
                <div className="flex justify-center py-1">
                  <BotAvatar look={take.look} size={64} state={s.chips < PARTS.length ? "excited" : "happy"} />
                </div>
              ) : null}
              {s.chips > 0 ? (
                <BotBubble look={take.look} state="happy" text={`got it. here's my flow.`} name={name} time="now">
                  <div className="flex flex-wrap gap-1.5" style={botColorVars(take.look.color)}>
                    {PARTS.slice(0, s.chips).map(({ label, icon: Icon }, i) => (
                      <motion.span
                        key={label}
                        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={reduced ? { duration: 0.2 } : SPRING.morph}
                        className="inline-flex items-center gap-1 rounded-full bg-[var(--bot-tint)] px-2 py-1 text-caption font-medium text-[var(--bot-ink)]"
                      >
                        <Icon className="size-3" aria-hidden />
                        {label}
                        <span className="font-normal opacity-80">· {take.parts[i]}</span>
                      </motion.span>
                    ))}
                  </div>
                </BotBubble>
              ) : null}
              {/* Room for the call card that lands over the bottom of the screen. */}
              {s.card ? <div aria-hidden className="h-24 shrink-0" /> : null}
            </PhoneTranscript>
            <PhoneComposer
              value={player.phase === "poster" ? "" : s.composer}
              caret={!s.sent}
              keyboard={!!s.composer && !s.sent}
              placeholder="give your bot a purpose…"
            />
          </PhoneFrame>
          <ScriptedCursor containerRef={phoneRef} cursor={s.cursor} variant="touch" />
        </div>
      </DemoFrame>
      {/* The end card is a real link (the demo itself is inert). */}
      {s.card ? (
        <motion.a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE.outExpo }}
          className={cn(
            "absolute inset-x-6 bottom-24 z-20 mx-auto flex max-w-[296px] items-center justify-between gap-3 rounded-2xl bg-surface-inverse px-4 py-3.5 text-fg-inverse shadow-e3",
          )}
        >
          <span className="text-ui font-medium leading-snug">
            This one&apos;s yours.
            <span className="block font-normal opacity-80">Build it on a strategy call</span>
          </span>
          <ArrowUpRight className="size-5 shrink-0" aria-hidden />
          <span className="sr-only"> (opens in a new tab)</span>
        </motion.a>
      ) : null}
    </div>
  );
}
