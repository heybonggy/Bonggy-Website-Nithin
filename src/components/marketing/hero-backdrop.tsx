"use client";

import * as React from "react";
import { motion } from "motion/react";

/**
 * Hero backdrop , pure SVG / CSS, no raster image.
 * A minimal artifact: an off-center signal source emanating concentric pulse
 * rings, with a faint constellation of nodes connected by hairline edges ,
 * the "we read the world and pull out the signal" idea in geometry.
 */

// Stable seeded RNG so SSR & client match
function seeded(seed: number) {
  let t = seed;
  return () => {
    t |= 0;
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const NODES = (() => {
  const rng = seeded(7);
  return Array.from({ length: 42 }, (_, i) => ({
    x: rng() * 100,
    y: rng() * 100,
    r: 0.35 + rng() * 0.55,
    bright: rng() > 0.86,
    delay: (i % 7) * 0.7,
  }));
})();

// Pre-compute edges between nodes that are reasonably close.
const EDGES = (() => {
  const list: { a: number; b: number }[] = [];
  for (let i = 0; i < NODES.length; i++) {
    for (let j = i + 1; j < NODES.length; j++) {
      const dx = NODES[i].x - NODES[j].x;
      const dy = NODES[i].y - NODES[j].y;
      const d = Math.hypot(dx, dy);
      if (d < 16) list.push({ a: i, b: j });
    }
  }
  return list;
})();

const ORIGIN = { x: 72, y: 38 };
const PULSES = [0, 1, 2, 3, 4];

export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base near-black canvas with a very subtle radial fade from the signal source */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${ORIGIN.x}% ${ORIGIN.y}%, oklch(0.13 0.012 200) 0%, oklch(0.085 0.005 280) 55%, oklch(0.075 0.005 280) 100%)`,
        }}
      />

      {/* Fine grid, masked to fade at the edges */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 3.5%) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 3.5%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 85%)",
        }}
      />

      {/* The artifact: signal pulses + constellation network */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="ring-grad" cx="50%" cy="50%" r="50%">
            <stop offset="50%" stopColor="oklch(0.78 0.13 152 / 0%)" />
            <stop offset="92%" stopColor="oklch(0.78 0.13 152 / 60%)" />
            <stop offset="100%" stopColor="oklch(0.78 0.13 152 / 0%)" />
          </radialGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.15" />
          </filter>
        </defs>

        {/* Concentric pulse rings emanating from ORIGIN */}
        {PULSES.map((p) => (
          <motion.circle
            key={p}
            cx={ORIGIN.x}
            cy={ORIGIN.y}
            r="6"
            fill="none"
            stroke="oklch(0.78 0.13 152)"
            strokeWidth="0.18"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.65, 0],
              scale: [0.5, 6.5, 9],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: p * 1.4,
              ease: "easeOut",
            }}
            style={{
              transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px`,
              transformBox: "fill-box",
            }}
          />
        ))}

        {/* Hairline edges of the constellation */}
        {EDGES.map((e, i) => {
          const a = NODES[e.a];
          const b = NODES[e.b];
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="oklch(1 0 0 / 6%)"
              strokeWidth="0.08"
            />
          );
        })}

        {/* Network nodes */}
        {NODES.map((n, i) => (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r * 0.18}
              fill={n.bright ? "oklch(0.85 0.13 152)" : "oklch(1 0 0 / 60%)"}
              filter={n.bright ? "url(#soft)" : undefined}
            />
            {n.bright && (
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={n.r * 0.18}
                fill="none"
                stroke="oklch(0.78 0.13 152 / 60%)"
                strokeWidth="0.12"
                animate={{
                  r: [n.r * 0.18, n.r * 1.4],
                  opacity: [0.7, 0],
                }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  delay: n.delay,
                  ease: "easeOut",
                }}
              />
            )}
          </g>
        ))}

        {/* The signal source itself , bright, pulsing */}
        <motion.circle
          cx={ORIGIN.x}
          cy={ORIGIN.y}
          r="0.55"
          fill="oklch(0.92 0.13 152)"
          animate={{
            opacity: [0.85, 1, 0.85],
            r: [0.55, 0.8, 0.55],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Subtle vignette to keep the headline area readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 75% at 28% 50%, oklch(0.085 0.005 280 / 60%) 0%, transparent 70%)",
        }}
      />

      {/* Bottom fade to seam with the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.085 0.005 280) 95%)",
        }}
      />
    </div>
  );
}
