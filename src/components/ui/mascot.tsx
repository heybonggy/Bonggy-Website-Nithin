"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { BotCharacter, type CharacterState } from "./bot-character";
import { BotFace, botColorVars, type BotLook } from "./bot-look";
import { useBotLook } from "@/components/product-mock/bot-looks";

/**
 * "Bong", the Bonggy bot face. First pass, pending design review (DESIGN.md §9).
 * A rounded-square pebble in ink with one wide pill-shaped eye just above
 * centre. The same face appears on round team avatars (BotAvatar).
 */

export type MascotState = "idle" | "thinking" | "working" | "needs-you" | "done" | "off";
export type Team = "sales" | "revops" | "marketing";

// Superellipse-like pebble in a 100×100 box.
const PEBBLE = "M50 4 C85 4 96 15 96 50 C96 85 85 96 50 96 C15 96 4 85 4 50 C4 15 15 4 50 4 Z";

/** The eye, drawn in `ink` on a `face` background, centred on (50, 44). */
function Eye({ state, ink, blink }: { state: MascotState; ink: string; blink: boolean }) {
  if (state === "working") {
    return (
      <g fill={ink}>
        {[36, 50, 64].map((cx) => (
          <circle key={cx} cx={cx} cy={46} r={4.6} />
        ))}
      </g>
    );
  }
  if (state === "done") {
    return (
      <path
        d="M33 45 L45 56 L67 34"
        fill="none"
        stroke={ink}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }
  if (state === "off") {
    return <rect x={31} y={45} width={38} height={3} rx={1.5} fill={ink} />;
  }
  const offset = state === "needs-you" ? { x: 2, y: -2 } : { x: 0, y: 0 };
  return (
    <motion.rect
      x={31}
      y={37.5}
      width={38}
      height={13}
      rx={6.5}
      fill={ink}
      style={{ originX: "50px", originY: "44px" }}
      initial={false}
      animate={
        state === "thinking"
          ? { x: [-5, 5, -5], y: 0, scaleY: 1 }
          : blink
            ? { x: offset.x, y: offset.y, scaleY: [1, 1, 0.1, 1] }
            : { x: offset.x, y: offset.y, scaleY: 1 }
      }
      transition={
        state === "thinking"
          ? { duration: 1.2, ease: [0.4, 0, 0.2, 1], repeat: Infinity }
          : blink
            ? { duration: 0.16, times: [0, 0, 0.5, 1] }
            : { duration: 0.28 }
      }
    />
  );
}

/**
 * The brand pebble. `blinkKey`: change it to trigger one blink (used once,
 * e.g. when the footer outline enters view). No idle blink loop by default,
 * so a page full of faces never runs many loops at once.
 */
export function Mascot({
  state = "idle",
  outline = false,
  blinkKey,
  className,
  title,
}: {
  state?: MascotState;
  /** Outline only (the footer brand moment). */
  outline?: boolean;
  blinkKey?: number;
  className?: string;
  title?: string;
}) {
  const [blinking, setBlinking] = React.useState(false);
  const [prevKey, setPrevKey] = React.useState(blinkKey);
  if (blinkKey !== prevKey) {
    setPrevKey(blinkKey);
    if (blinkKey !== undefined) setBlinking(true);
  }
  React.useEffect(() => {
    if (!blinking) return;
    const id = setTimeout(() => setBlinking(false), 220);
    return () => clearTimeout(id);
  }, [blinking]);

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {outline ? (
        <>
          <path d={PEBBLE} fill="none" stroke="currentColor" strokeWidth={1.75} vectorEffect="non-scaling-stroke" />
          <rect
            x={31}
            y={37.5}
            width={38}
            height={13}
            rx={6.5}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            vectorEffect="non-scaling-stroke"
            style={{ transformOrigin: "50px 44px", transform: blinking ? "scaleY(0.1)" : "scaleY(1)", transition: "transform 160ms var(--ease-standard)" }}
          />
        </>
      ) : (
        <>
          <path d={PEBBLE} fill="var(--foreground)" />
          <Eye state={state} ink="var(--background)" blink={blinking} />
        </>
      )}
    </svg>
  );
}

/** Wordmark: "bonggy", lowercase, Geist 600, tight tracking. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-sans text-[1.0625rem] font-semibold leading-none tracking-[-0.03em] text-foreground", className)}>
      bonggy
    </span>
  );
}

/** Legacy face states map onto character states. */
const TO_CHARACTER: Record<MascotState, CharacterState> = {
  idle: "idle",
  thinking: "thinking",
  working: "working",
  "needs-you": "waiting",
  done: "happy",
  off: "drowsy",
};

/**
 * A bot avatar: the bot's own look (colour, shape, eyes, accessory; see
 * bot-look.tsx), alive through the character engine. Pass `botId` so the
 * bot looks the same everywhere and follows the customiser; `look`
 * overrides it (previews). Without either, the default graphite pebble.
 */
export function BotAvatar({
  botId,
  look: lookOverride,
  size = 32,
  state = "idle",
  interactive = false,
  className,
}: {
  botId?: string;
  look?: BotLook;
  /** @deprecated teams no longer change the avatar; kept for call sites in transition. */
  team?: Team;
  size?: number;
  state?: MascotState | CharacterState;
  interactive?: boolean;
  className?: string;
}) {
  const id = React.useId();
  const stored = useBotLook(botId);
  const look = lookOverride ?? stored;
  const cs: CharacterState = state in TO_CHARACTER ? TO_CHARACTER[state as MascotState] : (state as CharacterState);
  return (
    <BotCharacter
      state={cs}
      size={size}
      seed={botId ?? id}
      interactive={interactive}
      className={className}
      style={botColorVars(look.color)}
      render={(eye) => <BotFace look={look} happy={eye === "happy"} size={size} />}
    />
  );
}

/** A human (the viewer): a soft circle with initials. Never uses the face. */
export function HumanAvatar({ initials, size = 32, className }: { initials: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full bg-surface-2 text-caption font-medium text-foreground", className)}
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}

/** 2–3 overlapped bots for a group (24% overlap, 2px separator ring). */
export function GroupAvatar({ botIds, size = 32 }: { botIds: string[]; size?: number }) {
  const overlap = size * 0.24;
  return (
    <span aria-hidden className="inline-flex items-center">
      {botIds.slice(0, 3).map((b, i) => (
        <span key={b} className="rounded-full bg-background ring-2 ring-background" style={{ marginLeft: i === 0 ? 0 : -overlap }}>
          <BotAvatar botId={b} size={size} />
        </span>
      ))}
    </span>
  );
}
