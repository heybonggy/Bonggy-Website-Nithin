"use client";

import { useMemo } from "react";

type HeroBackgroundPathsProps = {
  className?: string;
  color?: string;
  density?: number;
};

/**
 * HeroBackgroundPaths
 *
 * Two layers of long sweeping SVG curves. Each path runs a CSS keyframe
 * (`hero-bg-path-flow`) that animates stroke-dashoffset + opacity in a slow
 * 20-30s loop, with per-path duration jitter so the bundle never looks
 * synchronized. Pure CSS — no framer-motion / no JS animation cost.
 */
export function HeroBackgroundPaths({
  className,
  color = "rgba(95, 191, 143, 0.95)",
  density = 32,
}: HeroBackgroundPathsProps) {
  const paths = useMemo(() => {
    const make = (position: number) =>
      Array.from({ length: density }, (_, i) => {
        const offset = i * 5 * position;
        const verticalShift = i * 6;
        return {
          id: `${position}-${i}`,
          d:
            `M-${380 - offset} -${189 + verticalShift}` +
            `C-${380 - offset} -${189 + verticalShift} -${312 - offset} ${216 - verticalShift} ${152 - offset} ${343 - verticalShift}` +
            `C${616 - offset} ${470 - verticalShift} ${684 - offset} ${875 - verticalShift} ${684 - offset} ${875 - verticalShift}`,
          width: 0.5 + i * 0.03,
          opacity: 0.1 + i * 0.025,
          // Different per-path duration so the field doesn't pulse in lockstep.
          duration: 20 + ((i + (position > 0 ? 0 : 3)) % 8) * 1.6,
          // Negative delay so each path starts at a different phase of the loop.
          delay: -((i * 0.7) % 18),
        };
      });
    return [...make(1), ...make(-1)];
  }, [density]);

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 696 316"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        {paths.map((p) => (
          <path
            key={p.id}
            className="hero-bg-path"
            d={p.d}
            fill="none"
            stroke={color}
            strokeWidth={p.width}
            strokeOpacity={p.opacity}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default HeroBackgroundPaths;
