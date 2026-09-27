"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

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

/**
 * A bot avatar: a round disc with the Bong face. The team is encoded by
 * pattern, never colour: sales = solid ink, revops = white with an ink ring,
 * marketing = light gray with a diagonal hatch.
 */
export function BotAvatar({
  team,
  size = 32,
  state = "idle",
  className,
}: {
  team: Team;
  size?: number;
  state?: MascotState;
  className?: string;
}) {
  const ink = team === "sales" ? "var(--foreground-inverse)" : "var(--foreground)";
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        team === "sales" && "bg-surface-inverse",
        team === "revops" && "bg-background shadow-[inset_0_0_0_1.5px_var(--foreground)]",
        team === "marketing" && "hatch bg-status-track",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="size-full">
        {/* Interim CSS blink; staggered per team so rows don't blink in sync. */}
        <g
          className={state === "idle" || state === "needs-you" ? "animate-blink" : undefined}
          style={{ transformOrigin: "50px 44px", animationDelay: `${{ sales: 0, revops: 1.7, marketing: 3.1 }[team]}s` }}
        >
          <Eye state={state} ink={ink} blink={false} />
        </g>
      </svg>
    </span>
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

/** 2–3 overlapped bot discs for a group (24% overlap, 2px separator ring). */
export function GroupAvatar({ teams, size = 32 }: { teams: Team[]; size?: number }) {
  const overlap = size * 0.24;
  return (
    <span aria-hidden className="inline-flex items-center">
      {teams.slice(0, 3).map((t, i) => (
        <span key={i} className="rounded-full ring-2 ring-background" style={{ marginLeft: i === 0 ? 0 : -overlap }}>
          <BotAvatar team={t} size={size} />
        </span>
      ))}
    </span>
  );
}
