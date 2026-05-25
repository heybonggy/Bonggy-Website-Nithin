"use client";

import * as React from "react";
import { useScroll, useTransform, motion, useSpring } from "motion/react";

/**
 * Scroll-driven background line. A single flowing curve fixed to the right
 * edge of the viewport that morphs through 5 phases as the user scrolls:
 *
 *   0–15%  hero          → gentle S-curve
 *   15–35% how-it-works  → branching workflow nodes
 *   35–55% problem→fix   → wider, more dramatic wave
 *   55–80% proof+cases   → two parallel diverging curves
 *   80–100% objection→cta → converging into a bright pulsing point
 *
 * Each phase has a path stack with opacity tied to scrollYProgress, so the
 * line is always present and the transitions cross-fade between shapes.
 */
export function ScrollSpine() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.6 });

  // Opacity ranges per phase
  const o1 = useTransform(smooth, [0, 0.08, 0.18], [1, 1, 0]);
  const o2 = useTransform(smooth, [0.14, 0.22, 0.36, 0.45], [0, 1, 1, 0]);
  const o3 = useTransform(smooth, [0.4, 0.5, 0.6, 0.68], [0, 1, 1, 0]);
  const o4 = useTransform(smooth, [0.62, 0.72, 0.82, 0.88], [0, 1, 1, 0]);
  const o5 = useTransform(smooth, [0.84, 0.92, 1], [0, 1, 1]);

  // Slight horizontal drift through scroll
  const drift = useTransform(smooth, [0, 1], [0, -30]);

  return (
    <motion.div
      aria-hidden
      style={{ x: drift }}
      className="pointer-events-none fixed inset-y-0 right-0 z-0 hidden w-[260px] lg:block xl:w-[320px]"
    >
      <svg
        viewBox="0 0 200 1000"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="spine-stroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.13 152 / 0%)" />
            <stop offset="15%" stopColor="oklch(0.78 0.13 152 / 60%)" />
            <stop offset="50%" stopColor="oklch(0.78 0.13 152 / 90%)" />
            <stop offset="85%" stopColor="oklch(0.78 0.13 152 / 60%)" />
            <stop offset="100%" stopColor="oklch(0.78 0.13 152 / 0%)" />
          </linearGradient>

          <filter id="spine-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Phase 1 · gentle S-curve (hero) */}
        <motion.g style={{ opacity: o1 }} filter="url(#spine-glow)">
          <path
            d="M 110,40 Q 60,180 110,320 T 110,640 T 110,960"
            fill="none"
            stroke="url(#spine-stroke)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <PathParticle d="M 110,40 Q 60,180 110,320 T 110,640 T 110,960" />
        </motion.g>

        {/* Phase 2 · branching workflow */}
        <motion.g style={{ opacity: o2 }} filter="url(#spine-glow)">
          <path
            d="M 110,40 L 110,180 L 60,300 L 110,420 L 160,540 L 110,660 L 110,960"
            fill="none"
            stroke="url(#spine-stroke)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Node markers */}
          {[180, 300, 420, 540, 660].map((y, i) => (
            <circle
              key={i}
              cx={[110, 60, 110, 160, 110][i]}
              cy={y}
              r="3"
              fill="oklch(0.78 0.13 152)"
              opacity="0.9"
            />
          ))}
          <PathParticle d="M 110,40 L 110,180 L 60,300 L 110,420 L 160,540 L 110,660 L 110,960" />
        </motion.g>

        {/* Phase 3 · wider, more dramatic wave (problem → fix) */}
        <motion.g style={{ opacity: o3 }} filter="url(#spine-glow)">
          <path
            d="M 110,40 C 30,160 190,260 110,380 C 30,500 190,600 110,720 C 30,840 110,920 110,960"
            fill="none"
            stroke="url(#spine-stroke)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <PathParticle d="M 110,40 C 30,160 190,260 110,380 C 30,500 190,600 110,720 C 30,840 110,920 110,960" />
        </motion.g>

        {/* Phase 4 · two diverging parallel curves (proof + use cases) */}
        <motion.g style={{ opacity: o4 }} filter="url(#spine-glow)">
          <path
            d="M 110,40 Q 110,180 70,320 Q 30,520 70,720 Q 100,880 110,960"
            fill="none"
            stroke="oklch(0.62 0 0 / 70%)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M 110,40 Q 110,180 150,320 Q 190,520 150,720 Q 120,880 110,960"
            fill="none"
            stroke="url(#spine-stroke)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <PathParticle d="M 110,40 Q 110,180 150,320 Q 190,520 150,720 Q 120,880 110,960" />
        </motion.g>

        {/* Phase 5 · converging to a bright pulse (CTA) */}
        <motion.g style={{ opacity: o5 }}>
          <g filter="url(#spine-glow)">
            <path
              d="M 30,40 C 80,200 140,360 110,500 C 100,540 100,560 110,600"
              fill="none"
              stroke="url(#spine-stroke)"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M 190,40 C 140,200 80,360 110,500 C 120,540 120,560 110,600"
              fill="none"
              stroke="url(#spine-stroke)"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <line
              x1="110"
              y1="600"
              x2="110"
              y2="800"
              stroke="oklch(0.78 0.13 152)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </g>
          {/* Bright convergence point */}
          <motion.circle
            cx="110"
            cy="800"
            r="6"
            fill="oklch(0.85 0.14 152)"
            filter="url(#spine-glow)"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="110"
            cy="800"
            r="14"
            fill="none"
            stroke="oklch(0.78 0.13 152 / 50%)"
            strokeWidth="1"
            animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}

/** A small particle that travels along the path repeatedly */
function PathParticle({ d }: { d: string }) {
  return (
    <motion.circle
      r="2.2"
      fill="oklch(0.85 0.14 152)"
      animate={{ offsetDistance: ["0%", "100%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{ offsetPath: `path('${d}')` }}
    />
  );
}
