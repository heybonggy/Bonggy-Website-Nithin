"use client";

import * as React from "react";

/* Motion tokens (DESIGN.md §6). Durations are in seconds for Motion; the
   same values exist as CSS vars (--dur-*) in globals.css. */

export const DUR = {
  instant: 0.12,
  fast: 0.14,
  quick: 0.2,
  base: 0.28,
  moderate: 0.42,
  slow: 0.65,
  slower: 1,
  title: 1.1,
} as const;

export const EASE = {
  outExpo: [0.22, 1, 0.36, 1],
  standard: [0.4, 0, 0.2, 1],
  pop: [0.2, 0.9, 0.3, 1.15],
  settle: [0.2, 0.8, 0.3, 1],
  cursor: [0.3, 0.1, 0.25, 1],
  snap: [0.16, 1, 0.3, 1],
  exit: [0.4, 0, 0.6, 1],
} as const;

export const SPRING = {
  switch: { type: "spring", stiffness: 520, damping: 34 },
  morph: { type: "spring", stiffness: 340, damping: 32, mass: 0.9 },
  layout: { type: "spring", stiffness: 380, damping: 36 },
  gentle: { type: "spring", stiffness: 120, damping: 20, mass: 0.9 },
} as const;

export const entry = {
  initial: { opacity: 0, y: 8, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: DUR.base, ease: EASE.pop },
};

export const wordReveal = (i: number, base = 0.1) => ({
  initial: { opacity: 0, rotateX: -40, y: "45%" },
  animate: { opacity: 1, rotateX: 0, y: 0 },
  transition: { duration: DUR.slow, ease: EASE.outExpo, delay: base + 0.055 * i },
});

export const blurIn = (delay: number) => ({
  initial: { opacity: 0, filter: "blur(12px)", y: -10 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  transition: { duration: DUR.slower, ease: EASE.outExpo, delay },
});

export const inViewOnce = { once: true, amount: 0.35 } as const;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Hydration-safe prefers-reduced-motion. Motion's useReducedMotion reads the
 * media query on the first client render, so markup that branches on it
 * mismatches the server HTML. This renders the server (motion-on) version
 * during hydration, then switches.
 */
export function usePrefersReducedMotion(): boolean {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}
