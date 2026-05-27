"use client";

import * as React from "react";
import { motion } from "motion/react";

/**
 * The "outbound tree" — a side-view illustration for the strategy-session
 * Close section. Visual metaphor:
 *
 *   roots draw signal up from the ground  →  energy flows up the trunk  →
 *   branches deliver outputs the rep cares about (signal · email · meeting ·
 *   close). The rep sits at the foot of the tree with a laptop, doing the
 *   one thing only a human can do — review and send.
 *
 * Why an SVG rather than a Lottie / video:
 *   - Crisp at every resolution; respects theme tokens.
 *   - All animation is GPU-friendly: motion.circle + offsetPath flows
 *     particles along precomputed paths, and IntersectionObserver gates
 *     the whole loop so it stops when scrolled off-screen.
 *   - One layer, no per-frame DOM thrash.
 */

const TRUNK = "M 200,548 C 200,460 200,370 200,200";
const BRANCH_TOP_LEFT = "M 200,210 C 175,180 130,140 70,120";
const BRANCH_TOP_RIGHT = "M 200,210 C 230,180 280,140 350,118";
const BRANCH_MID_LEFT = "M 200,290 C 175,265 130,245 70,230";
const BRANCH_MID_RIGHT = "M 200,290 C 230,265 280,245 350,230";

// Output points (branch tips) — order: signal, email, meeting, close
const ENDPOINTS = [
  { x: 70, y: 120, icon: "signal", label: "Signal" },
  { x: 350, y: 118, icon: "email", label: "Email" },
  { x: 70, y: 230, icon: "meeting", label: "Meeting" },
  { x: 350, y: 230, icon: "close", label: "Close" },
] as const;

const ROOTS = [
  "M 200,548 C 200,560 175,575 150,585",
  "M 200,548 C 200,560 165,580 130,592",
  "M 200,548 C 200,562 225,578 250,588",
  "M 200,548 C 200,562 240,582 275,595",
  "M 200,548 C 200,555 195,575 188,595",
  "M 200,548 C 200,555 205,575 212,595",
];

const TREE_COLOR = "currentColor";
const SIGNAL_COLOR = "var(--signal)";

export function TreeAnimation({ className = "" }: { className?: string }) {
  const rootRef = React.useRef<SVGSVGElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={"relative h-full w-full text-foreground/60 " + className}>
      <svg
        ref={rootRef}
        viewBox="0 0 420 640"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        aria-hidden
      >
        <defs>
          {/* Trunk + branches gradient: faint at edges, signal in the middle */}
          <linearGradient id="tree-trunk" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="currentColor" stopOpacity={0.25} />
            <stop offset="40%" stopColor="currentColor" stopOpacity={0.55} />
            <stop offset="100%" stopColor="currentColor" stopOpacity={0.7} />
          </linearGradient>

          {/* Soft halo behind glowing fruit */}
          <radialGradient id="fruit-halo" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="oklch(0.78 0.13 152)"
              stopOpacity={0.6}
            />
            <stop
              offset="60%"
              stopColor="oklch(0.78 0.13 152)"
              stopOpacity={0.15}
            />
            <stop
              offset="100%"
              stopColor="oklch(0.78 0.13 152)"
              stopOpacity={0}
            />
          </radialGradient>

          {/* Ground hairline */}
          <linearGradient id="ground-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity={0} />
            <stop offset="50%" stopColor="currentColor" stopOpacity={0.25} />
            <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* GROUND LINE */}
        <line
          x1={40}
          y1={555}
          x2={380}
          y2={555}
          stroke="url(#ground-grad)"
          strokeWidth={1}
        />

        {/* ROOTS */}
        <g
          fill="none"
          stroke={TREE_COLOR}
          strokeOpacity={0.35}
          strokeWidth={1.1}
          strokeLinecap="round"
        >
          {ROOTS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {/* TRUNK + BRANCHES (drawn underneath particles) */}
        <g
          fill="none"
          stroke="url(#tree-trunk)"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <path d={TRUNK} />
          <path d={BRANCH_MID_LEFT} />
          <path d={BRANCH_MID_RIGHT} />
          <path d={BRANCH_TOP_LEFT} />
          <path d={BRANCH_TOP_RIGHT} />
        </g>

        {/* PARTICLES — energy flowing up the trunk, then up each branch.
            The motion ONLY runs while visible. When off-screen we render
            the static tree without the moving dots. */}
        {visible && (
          <g>
            {/* Trunk stream — three offset dots */}
            {[0, 1.4, 2.8].map((delay) => (
              <motion.circle
                key={`trunk-${delay}`}
                r={2.4}
                fill={SIGNAL_COLOR}
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
                style={{ offsetPath: `path('${TRUNK}')` } as React.CSSProperties}
              />
            ))}

            {/* Branch streams — staggered so each branch lights its endpoint
                on a slightly different beat */}
            {(
              [
                { d: BRANCH_TOP_LEFT, delay: 0.6 },
                { d: BRANCH_TOP_RIGHT, delay: 1.5 },
                { d: BRANCH_MID_LEFT, delay: 2.4 },
                { d: BRANCH_MID_RIGHT, delay: 3.3 },
              ] as const
            ).map((b, i) => (
              <motion.circle
                key={`branch-${i}`}
                r={2.1}
                fill={SIGNAL_COLOR}
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  delay: b.delay,
                  ease: "easeOut",
                }}
                style={{ offsetPath: `path('${b.d}')` } as React.CSSProperties}
              />
            ))}
          </g>
        )}

        {/* ENDPOINTS — halo + glyph */}
        {ENDPOINTS.map((p, i) => (
          <g key={p.label}>
            {/* Halo */}
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={22}
              fill="url(#fruit-halo)"
              animate={
                visible
                  ? { opacity: [0.4, 1, 0.4], scale: [0.9, 1.05, 0.9] }
                  : { opacity: 0.5, scale: 1 }
              }
              transition={
                visible
                  ? {
                      duration: 2.6,
                      repeat: Infinity,
                      delay: i * 0.65,
                      ease: "easeInOut",
                    }
                  : { duration: 0 }
              }
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
            {/* Solid dot at center */}
            <circle
              cx={p.x}
              cy={p.y}
              r={5}
              fill="oklch(0.85 0.15 152)"
            />
            {/* Inline icon glyph rendered above the dot via a translated <g> */}
            <Glyph kind={p.icon} cx={p.x} cy={p.y} />
            {/* Tiny mono label */}
            <text
              x={p.x}
              y={p.y + 38}
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Cascadia Mono, monospace"
              fontSize={9}
              letterSpacing="0.18em"
              fill="currentColor"
              fillOpacity={0.6}
            >
              {p.label.toUpperCase()}
            </text>
          </g>
        ))}

        {/* STICKMAN with a laptop — left of the tree base */}
        <Stickman x={88} y={530} />
      </svg>
    </div>
  );
}

/* ----------------------------------------------------------------------------
   Branch-tip glyphs. Tiny inline icons drawn relative to (cx, cy).
   ----------------------------------------------------------------------------*/

function Glyph({
  kind,
  cx,
  cy,
}: {
  kind: "signal" | "email" | "meeting" | "close";
  cx: number;
  cy: number;
}) {
  const stroke = "oklch(0.08 0.04 152)";
  const strokeWidth = 1.2;
  switch (kind) {
    case "signal":
      // Lightning bolt
      return (
        <path
          d={`M ${cx - 1.5},${cy - 3.5} L ${cx + 1},${cy - 0.5} L ${cx - 0.5},${cy - 0.5} L ${cx + 1.5},${cy + 3.5}`}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "email":
      // Envelope
      return (
        <g>
          <rect
            x={cx - 3}
            y={cy - 2}
            width={6}
            height={4}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            rx={0.5}
          />
          <path
            d={`M ${cx - 3},${cy - 2} L ${cx},${cy + 0.5} L ${cx + 3},${cy - 2}`}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </g>
      );
    case "meeting":
      // Calendar
      return (
        <g>
          <rect
            x={cx - 3}
            y={cy - 2.5}
            width={6}
            height={5}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            rx={0.5}
          />
          <line
            x1={cx - 3}
            y1={cy - 1}
            x2={cx + 3}
            y2={cy - 1}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <line
            x1={cx - 1.5}
            y1={cy - 3.2}
            x2={cx - 1.5}
            y2={cy - 1.8}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <line
            x1={cx + 1.5}
            y1={cy - 3.2}
            x2={cx + 1.5}
            y2={cy - 1.8}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </g>
      );
    case "close":
      // Checkmark
      return (
        <path
          d={`M ${cx - 2.5},${cy} L ${cx - 0.5},${cy + 2} L ${cx + 2.8},${cy - 2}`}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth + 0.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
  }
}

/* ----------------------------------------------------------------------------
   Stickman holding a laptop — minimal SVG silhouette.
   ----------------------------------------------------------------------------*/

function Stickman({ x, y }: { x: number; y: number }) {
  // Coordinate system: (x, y) is the figure's center-bottom (feet line)
  const head = { cx: x, cy: y - 36, r: 5 };
  return (
    <g stroke="currentColor" strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Head */}
      <circle cx={head.cx} cy={head.cy} r={head.r} strokeOpacity={0.55} />
      {/* Neck + body */}
      <path
        d={`M ${head.cx},${head.cy + head.r} L ${head.cx},${y - 16}`}
        strokeOpacity={0.55}
      />
      {/* Arms forward (holding laptop) */}
      <path
        d={`M ${head.cx},${y - 26}
            L ${head.cx + 8},${y - 22}
            M ${head.cx},${y - 26}
            L ${head.cx - 8},${y - 22}`}
        strokeOpacity={0.55}
      />
      {/* Laptop base in front */}
      <rect
        x={head.cx - 8}
        y={y - 22}
        width={16}
        height={2.5}
        rx={0.6}
        fill="currentColor"
        fillOpacity={0.35}
        stroke="none"
      />
      {/* Laptop screen */}
      <motion.rect
        x={head.cx - 7}
        y={y - 30}
        width={14}
        height={8}
        rx={0.6}
        fill="oklch(0.78 0.13 152)"
        fillOpacity={0.5}
        stroke="oklch(0.78 0.13 152)"
        strokeOpacity={0.7}
        animate={{ fillOpacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Legs (seated) */}
      <path
        d={`M ${head.cx},${y - 16}
            L ${head.cx - 8},${y}
            M ${head.cx},${y - 16}
            L ${head.cx + 8},${y}`}
        strokeOpacity={0.55}
      />
    </g>
  );
}
