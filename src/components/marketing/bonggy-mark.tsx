import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Bonggy mark — green planet with a glowing tilted ring. Inline SVG so it
 * renders crisply at any size and adapts to dark/light contexts.
 */
export function BonggyMark({
  className,
  ...rest
}: React.SVGProps<SVGSVGElement>) {
  // Unique IDs per render to avoid collisions when multiple marks are mounted
  const uid = React.useId();
  const gradId = `bonggy-planet-${uid}`;
  const glowId = `bonggy-glow-${uid}`;

  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Bonggy"
      className={cn("shrink-0", className)}
      {...rest}
    >
      <defs>
        <radialGradient id={gradId} cx="38%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="35%" stopColor="#10b981" />
          <stop offset="75%" stopColor="#064e3b" />
          <stop offset="100%" stopColor="#022c22" />
        </radialGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* BACK arc of the ring */}
      <path
        d="M 220.7 90.5 A 100 32 -22 0 0 35.3 165.5"
        fill="none"
        stroke="#5eead4"
        strokeWidth="4"
        strokeLinecap="round"
        filter={`url(#${glowId})`}
      />

      {/* Planet */}
      <circle cx="128" cy="128" r="75" fill={`url(#${gradId})`} />

      {/* Highlight */}
      <ellipse
        cx="106"
        cy="96"
        rx="22"
        ry="9"
        fill="white"
        opacity="0.45"
        transform="rotate(-18 106 96)"
      />

      {/* FRONT arc of the ring */}
      <path
        d="M 220.7 90.5 A 100 32 -22 0 1 35.3 165.5"
        fill="none"
        stroke="#5eead4"
        strokeWidth="4"
        strokeLinecap="round"
        filter={`url(#${glowId})`}
      />
    </svg>
  );
}
