"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/components/marketing/_motion";

/**
 * The character engine (DESIGN.md §8.1). Every bot on the page shares one
 * requestAnimationFrame loop. Each character has a set of critically damped
 * springs (rotation, offset, scale, blink, eye size, gaze, spin) whose
 * targets are rewritten every frame by its current state. The loop writes
 * the result to CSS custom properties on the character's element through a
 * ref, so there is no React render per frame. Off-screen characters and
 * hidden pages are skipped. Reduced motion: no loop, static poses only.
 */

export type CharacterState =
  | "idle"
  | "thinking"
  | "working"
  | "waiting"
  | "happy"
  | "excited"
  | "celebrate"
  | "drowsy"
  | "sad";

/** What the eye should draw for a state (the pill, or the happy ✓). */
export const eyeFor = (s: CharacterState) => (s === "happy" || s === "celebrate" ? "happy" : "pill");

type Channel = { x: number; v: number; t: number; w: number; z: number };
const ch = (x: number, w: number, z: number): Channel => ({ x, v: 0, t: x, w, z });

type Char = {
  el: HTMLElement;
  size: number;
  rng: () => number;
  state: CharacterState;
  /** Effective state (transient states hand over to their follow-up). */
  eff: CharacterState;
  since: number;
  /** undefined: not seen yet; a time: waking; null: done waking. */
  woke: number | null | undefined;
  visible: boolean;
  live: boolean;
  c: Record<"rot" | "x" | "y" | "s" | "open" | "eyeS" | "gx" | "gy" | "spin", Channel>;
  gaze: { x: number; y: number; next: number };
  blinkAt: number;
  blinkUntil: number;
  hopAt: number;
  hopStart: number;
  spinAt: number;
  hover: { start: number; px: number; py: number } | null;
  reaction: { kind: number; start: number } | null;
  onEff?: (s: CharacterState) => void;
};

const SUB = 1 / 120;
const registry = new Set<Char>();
let raf = 0;
let last = 0;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

const between = (r: () => number, a: number, b: number) => a + (b - a) * r();

/** Transient states and what follows them, with durations in seconds. */
const FOLLOW: Partial<Record<CharacterState, [CharacterState, number]>> = {
  excited: ["happy", 2.2],
  celebrate: ["happy", 2.2],
  happy: ["idle", 3.2],
};

/** Live-character cap; past it, the smallest fall back to blink-only. */
const MAX_LIVE = 24;

function rebalance() {
  const vis = [...registry].filter((c) => c.visible).sort((a, b) => b.size - a.size);
  vis.forEach((c, i) => (c.live = i < MAX_LIVE));
}

function step(c: Char, now: number) {
  const t = (now - c.since) / 1000;
  const u = c.size / 114;
  const small = c.size < 40;
  const amp = small ? 2.2 : 1;
  const tiny = c.size <= 18;
  const k = c.c;

  // Transient states hand over.
  const f = FOLLOW[c.eff];
  if (f && t > f[1]) {
    c.eff = c.eff === "happy" && c.state !== "happy" && c.state !== "excited" && c.state !== "celebrate" ? c.state : f[0];
    if (c.eff === c.state && FOLLOW[c.eff]) c.eff = FOLLOW[c.eff]![0];
    c.since = now;
    c.onEff?.(c.eff);
  }

  let rot = 0, x = 0, y = 0, s = 1, open = 1, eyeS = 1;
  let blinkOk = false;
  const pinGaze = (gx: number, gy: number) => {
    c.gaze.x = gx;
    c.gaze.y = gy;
  };
  const retarget = (min: number, max: number, fx: () => number, fy: () => number) => {
    if (now >= c.gaze.next) {
      c.gaze.x = fx();
      c.gaze.y = fy();
      c.gaze.next = now + between(c.rng, min, max) * 1000;
    }
  };

  switch (c.eff) {
    case "idle":
      rot = 1.5 * Math.sin(0.5 * t) + 0.6 * Math.sin(0.17 * t);
      x = Math.sin(0.27 * t);
      y = 1.2 * Math.sin(0.85 * t);
      s = 1 + 0.007 * Math.sin(0.85 * t);
      retarget(2.5, 5.5, () => between(c.rng, -3, 3), () => between(c.rng, -2, 2));
      blinkOk = true;
      break;
    case "thinking": {
      rot = -9 + 5 * Math.sin(0.35 * t);
      x = 5 * Math.sin(0.3 * t);
      y = 2.5 * Math.sin(0.6 * t);
      retarget(1.5, 2.8, () => (c.rng() < 0.5 ? -1 : 1) * between(c.rng, 0.5, 1) * 15, () => -between(c.rng, 0.4, 1) * 9);
      break;
    }
    case "working": {
      const e = Math.sin(3.2 * Math.PI * t);
      rot = 4 + 2.5 * e;
      x = 3;
      y = 1.5 + 3 * Math.max(0, e);
      s = 1 - 0.02 * Math.max(0, e);
      retarget(1.2, 2.4, () => between(c.rng, -4, 4), () => between(c.rng, 0.4, 1) * 9);
      if (now >= c.spinAt) {
        k.spin.t += 1;
        c.spinAt = now + between(c.rng, 6, 9) * 1000;
      }
      break;
    }
    case "waiting": {
      rot = 8 + 1.5 * Math.sin(0.5 * t);
      x = 2;
      y = -2 + 0.8 * Math.sin(0.8 * t);
      s = 1.015;
      if (now >= c.hopAt) {
        c.hopStart = now;
        c.hopAt = now + between(c.rng, 1.8, 3.2) * 1000;
      }
      const p = (now - c.hopStart) / 380;
      if (p >= 0 && p <= 1) {
        y -= 4.5 * Math.sin(Math.PI * p);
        rot += 2 * Math.sin(Math.PI * p);
      }
      pinGaze(12, -6);
      blinkOk = true;
      break;
    }
    case "happy":
      rot = 3 * Math.sin(1.2 * t);
      x = 2.5 * Math.sin(1.1 * t);
      y = -3 * Math.abs(Math.sin(2.4 * t));
      s = 1 + 0.02 * Math.abs(Math.sin(2.4 * t));
      pinGaze(0, -2);
      blinkOk = true;
      break;
    case "excited": {
      const p = (2.2 * t) % 1;
      y = -10 * Math.sin(Math.PI * p) + 2;
      s = p < 0.1 ? 0.92 : p < 0.3 ? 1.05 : 1;
      rot = 7 * Math.sin(2.2 * Math.PI * t);
      eyeS = 1.06;
      blinkOk = true;
      break;
    }
    case "celebrate":
      y = -2.5 * Math.abs(Math.sin(4.4 * t));
      s = 1 + 0.02 * Math.abs(Math.sin(4.4 * t));
      eyeS = 1.08;
      break;
    case "drowsy":
      open = 0.08;
      y = 8;
      s = 1 + 0.016 * Math.sin(0.55 * t);
      rot = 2 * Math.sin(0.25 * t);
      break;
    case "sad":
      rot = 3;
      y = 7;
      s = 0.97;
      open = 0.7;
      x = 1.5 * Math.sin(0.25 * t);
      break;
  }

  // Waking, once, the first time the character is seen.
  if (typeof c.woke === "number") {
    const w = (now - c.woke) / 1000;
    if (w < 0.5) open = 0.08;
    else if (w < 2.2) {
      eyeS = Math.max(eyeS, 1.12 - 0.12 * ((w - 0.5) / 1.7));
      y -= 5 * (1 - (w - 0.5) / 1.7);
      s *= 1 + 0.04 * (1 - (w - 0.5) / 1.7);
    } else if (w < 3) {
      const p = (w - 2.2) / 0.8;
      rot += 6 * Math.sin(3 * Math.PI * p) * (1 - p);
    } else c.woke = null;
  }

  // Blink: every 4.5–10s in calm states, 20% double.
  if (blinkOk && now >= c.blinkAt) {
    c.blinkUntil = now + (c.rng() < 0.2 ? 420 : 160);
    c.blinkAt = now + between(c.rng, 4.5, 10) * 1000;
  }
  if (now < c.blinkUntil) {
    const phase = (c.blinkUntil - now) % 260;
    if (phase > 100) open = 0.08;
  }

  // Hover: a curious tilt, bigger eye, gaze follows the pointer.
  if (c.hover) {
    const p = Math.min(1, (now - c.hover.start) / 440);
    rot += 5 * Math.sin(Math.PI * p);
    x += 8 * Math.sin(Math.PI * p);
    eyeS = Math.max(eyeS, 1.08);
    pinGaze(c.hover.px * 15, c.hover.py * 9);
  }

  // Click reactions.
  if (c.reaction) {
    const r = c.reaction;
    const p = (now - r.start) / 1000;
    if (r.kind === 2 && p < 0.5) {
      const q = p / 0.5;
      y -= 10 * Math.sin(Math.PI * q);
      s = q < 0.1 || q > 0.9 ? 0.92 : q < 0.3 ? 1.05 : 1;
    }
    if (r.kind === 3) {
      const spinT = 0.55 + 0.16 * 2;
      if (p > spinT && p < spinT + 1.5) {
        const d = p - spinT;
        rot += 17 * Math.sin(10 * d) * Math.max(0, 1 - d / 1.5);
        open = Math.min(open, 0.46);
      }
    }
    if (p > 2.6) c.reaction = null;
  }

  if (tiny) {
    rot = 0;
    x = 0;
    y = 0;
  }

  k.rot.t = rot * amp;
  k.x.t = x * u * amp;
  k.y.t = y * u * amp;
  k.s.t = s;
  k.open.t = open;
  k.eyeS.t = eyeS;
  // Gaze is in the face's viewBox units (100 = the avatar's width).
  k.gx.t = small ? 0 : (c.gaze.x * 100) / 114;
  k.gy.t = small ? 0 : (c.gaze.y * 100) / 114;
}

function integrate(c: Char, dt: number) {
  for (const key in c.c) {
    const q = c.c[key as keyof Char["c"]];
    q.v += (-2 * q.z * q.w * q.v - q.w * q.w * (q.x - q.t)) * dt;
    q.x += q.v * dt;
  }
}

function write(c: Char) {
  const k = c.c;
  const st = c.el.style;
  st.setProperty("--bot-rot", `${(k.rot.x + k.spin.x * 360).toFixed(2)}deg`);
  st.setProperty("--bot-x", `${k.x.x.toFixed(2)}px`);
  st.setProperty("--bot-y", `${k.y.x.toFixed(2)}px`);
  st.setProperty("--bot-s", k.s.x.toFixed(4));
  st.setProperty("--eye-open", Math.max(0.05, k.open.x).toFixed(3));
  st.setProperty("--eye-s", k.eyeS.x.toFixed(3));
  st.setProperty("--gaze-x", `${k.gx.x.toFixed(2)}px`);
  st.setProperty("--gaze-y", `${k.gy.x.toFixed(2)}px`);
  // (px inside the SVG are viewBox units.)
}

/** Dev instrumentation for the reduced-motion gate: frames run so far. */
export const engineStats = { frames: 0 };

function loop(now: number) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  let any = false;
  if (document.visibilityState === "visible") {
    for (const c of registry) {
      if (!c.visible) continue;
      any = true;
      if (!c.live) {
        // Blink-only fallback past the cap.
        c.c.open.t = now < c.blinkUntil ? 0.08 : 1;
        if (now >= c.blinkAt) {
          c.blinkUntil = now + 160;
          c.blinkAt = now + between(c.rng, 4.5, 10) * 1000;
        }
        for (let d = dt; d > 0; d -= SUB) {
          const q = c.c.open;
          q.v += (-2 * q.z * q.w * q.v - q.w * q.w * (q.x - q.t)) * Math.min(SUB, d);
          q.x += q.v * Math.min(SUB, d);
        }
        c.el.style.setProperty("--eye-open", Math.max(0.05, c.c.open.x).toFixed(3));
        continue;
      }
      step(c, now);
      for (let d = dt; d > 0; d -= SUB) integrate(c, Math.min(SUB, d));
      write(c);
    }
  }
  engineStats.frames += 1;
  // Stop when nothing is on screen; the observer restarts it.
  raf = any ? requestAnimationFrame(loop) : 0;
}

function ensureLoop() {
  if (!raf) {
    last = performance.now();
    raf = requestAnimationFrame(loop);
  }
}

let io: IntersectionObserver | null = null;
const byEl = new WeakMap<Element, Char>();
function observer() {
  if (!io) {
    io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const c = byEl.get(e.target);
        if (!c) continue;
        const was = c.visible;
        c.visible = e.isIntersecting;
        if (c.visible && !was && c.woke === undefined) c.woke = performance.now();
      }
      rebalance();
      if ([...registry].some((c) => c.visible)) ensureLoop();
    });
  }
  return io;
}

/** Static poses for reduced motion. */
const POSE: Record<CharacterState, { rot: number; y: number; gx: number; gy: number; open: number }> = {
  idle: { rot: 0, y: 0, gx: 0, gy: 0, open: 1 },
  thinking: { rot: -9, y: 0, gx: -10, gy: -6, open: 1 },
  working: { rot: 4, y: 1.5, gx: 0, gy: 6, open: 1 },
  waiting: { rot: 8, y: -2, gx: 10, gy: -6, open: 1 },
  happy: { rot: 0, y: 0, gx: 0, gy: 0, open: 1 },
  excited: { rot: 0, y: 0, gx: 0, gy: 0, open: 1 },
  celebrate: { rot: 0, y: 0, gx: 0, gy: 0, open: 1 },
  drowsy: { rot: 0, y: 4, gx: 0, gy: 0, open: 0.08 },
  sad: { rot: 3, y: 4, gx: 0, gy: 0, open: 0.7 },
};

const REACTIONS = 5;

/**
 * Wraps a bot's drawing and drives it. The drawing reads the CSS variables:
 * the body uses the wrapper transform; the eye group uses `.bot-eye`.
 * `render(eye)` draws the face for the current eye style.
 */
export function BotCharacter({
  state,
  size,
  seed,
  interactive = false,
  className,
  render,
}: {
  state: CharacterState;
  size: number;
  seed: string;
  interactive?: boolean;
  className?: string;
  render: (eye: "pill" | "happy") => React.ReactNode;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const charRef = React.useRef<Char | null>(null);
  const reduced = usePrefersReducedMotion();
  const [eff, setEff] = React.useState<CharacterState>(state);
  const [sparks, setSparks] = React.useState(0);
  const clicks = React.useRef(0);

  // Register with the shared loop.
  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const rng = mulberry32(hash(seed));
    const now = performance.now();
    const c: Char = {
      el,
      size,
      rng,
      state,
      eff: state,
      since: now,
      woke: undefined,
      visible: false,
      live: true,
      c: {
        rot: ch(0, 5, 0.9),
        x: ch(0, 3.5, 1),
        y: ch(0, 4, 1),
        s: ch(1, 10, 0.8),
        open: ch(1, 26, 1),
        eyeS: ch(1, 9, 0.85),
        gx: ch(0, 13, 1),
        gy: ch(0, 13, 1),
        spin: ch(0, 6.2, 1),
      },
      gaze: { x: 0, y: 0, next: now + rng() * 3000 },
      blinkAt: now + between(rng, 1.5, 8) * 1000,
      blinkUntil: 0,
      hopAt: now + between(rng, 1, 3) * 1000,
      hopStart: -1e9,
      spinAt: now + between(rng, 6, 9) * 1000,
      hover: null,
      reaction: null,
      onEff: (s) => setEff(s),
    };
    charRef.current = c;
    registry.add(c);
    byEl.set(el, c);
    observer().observe(el);
    ensureLoop();
    return () => {
      registry.delete(c);
      observer().unobserve(el);
      charRef.current = null;
    };
    // Size and seed are fixed for a mounted character; state flows in below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // State changes restart the state clock.
  React.useEffect(() => {
    const c = charRef.current;
    if (c) {
      c.state = state;
      c.eff = state;
      c.since = performance.now();
      if (state === "celebrate") c.c.spin.t += 1;
    }
  }, [state]);

  // Mirror the state for rendering (eye style, sparks) during render.
  const [prevState, setPrevState] = React.useState(state);
  if (state !== prevState) {
    setPrevState(state);
    setEff(state);
    if (state === "celebrate" && !reduced) setSparks((n) => n + 1);
  }

  const onEnter = (e: React.PointerEvent) => {
    const c = charRef.current;
    if (!c || e.pointerType !== "mouse") return;
    c.hover = { start: performance.now(), px: 0, py: 0 };
  };
  const onMove = (e: React.PointerEvent) => {
    const c = charRef.current;
    if (!c?.hover) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    c.hover.px = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    c.hover.py = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
  };
  const onLeave = () => {
    const c = charRef.current;
    if (c) c.hover = null;
  };
  const onClick = () => {
    const c = charRef.current;
    if (!c) return;
    const kind = clicks.current % REACTIONS;
    clicks.current += 1;
    const turns = kind === 1 ? 2 : 1;
    c.c.spin.t += turns;
    c.reaction = { kind, start: performance.now() };
    if (kind === 4) setSparks((n) => n + 1);
  };

  const pose = POSE[state];
  const staticVars = reduced
    ? ({
        "--bot-rot": `${pose.rot}deg`,
        "--bot-x": "0px",
        "--bot-y": `${(pose.y * size) / 114}px`,
        "--bot-s": "1",
        "--eye-open": String(pose.open),
        "--eye-s": "1",
        "--gaze-x": `${size < 40 ? 0 : (pose.gx * 100) / 114}px`,
        "--gaze-y": `${size < 40 ? 0 : (pose.gy * 100) / 114}px`,
      } as React.CSSProperties)
    : undefined;

  const shownEye = eyeFor(reduced ? state : eff);
  const Wrapper = interactive ? "button" : "span";

  return (
    <Wrapper
      {...(interactive
        ? {
            type: "button" as const,
            onClick,
            onPointerEnter: onEnter,
            onPointerMove: onMove,
            onPointerLeave: onLeave,
            "aria-label": "Make the bot react",
          }
        : { "aria-hidden": true })}
      ref={ref as React.Ref<HTMLButtonElement & HTMLSpanElement>}
      className={cn("bot-character relative inline-flex shrink-0", interactive && "cursor-pointer rounded-full", className)}
      style={{ width: size, height: size, ...staticVars }}
    >
      <span
        key={reduced ? state : undefined}
        className={cn("bot-body inline-flex size-full", reduced && "animate-[mount-fade_150ms_ease-out_both]")}
      >
        {render(shownEye)}
      </span>
      {sparks > 0 ? <Sparks key={sparks} /> : null}
    </Wrapper>
  );
}

/** 16 sparks bursting out once. Decorative. */
function Sparks() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {Array.from({ length: 16 }, (_, i) => (
        <span
          key={i}
          className="bot-spark absolute left-1/2 top-1/2 size-1 rounded-full bg-[var(--bot-ink,var(--foreground))]"
          style={{ ["--a" as string]: `${(i / 16) * 360}deg`, ["--d" as string]: `${0.9 + (i % 3) * 0.25}` }}
        />
      ))}
    </span>
  );
}
