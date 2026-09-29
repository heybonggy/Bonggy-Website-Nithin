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

/**
 * Entrance state for content that animates in when scrolled into view,
 * without ever hiding it from the server render, crawlers or no-JS:
 * - "static": server render, reduced motion, or already on screen at mount.
 * - "armed": hydrated and still off screen, so its pre-animation state
 *   (zeros, hidden rows) can't be seen.
 * - "go": scrolled into view; play the entrance.
 */
export function useEntrance(ref: React.RefObject<Element | null>, amount = 0.35): "static" | "armed" | "go" {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = React.useState<"static" | "armed" | "go">("static");
  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // on screen at mount: leave static
    setPhase("armed");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= amount) {
          setPhase("go");
          io.disconnect();
        }
      },
      { threshold: [0, amount] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, amount, reduced]);
  return reduced ? "static" : phase;
}

/**
 * Entrance state for headings, ledes and card stacks (Rise, Stagger), tuned
 * for fast flings: content must never sit on screen invisible.
 * - Triggers early: once the element is within 15% of a viewport below the
 *   fold (IntersectionObserver, threshold 0), so it's already animating as
 *   it arrives.
 * - If it's already well inside the viewport when the observer reports (a
 *   fast scroll outran it), it's shown at once ("static"), no animation.
 * - Plays once; never replays on scroll-back. Same server/reduced-motion
 *   rules as useEntrance.
 */
export function useReveal(ref: React.RefObject<Element | null>): "static" | "armed" | "go" {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = React.useState<"static" | "armed" | "go">("static");
  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // on screen at mount
    if (r.bottom <= 0) return; // above the fold (e.g. a restored scroll): never hide it
    setPhase("armed");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        // rootBounds includes the 15% margin.
        const vh = e.rootBounds ? e.rootBounds.height / 1.15 : window.innerHeight;
        setPhase(e.boundingClientRect.top < vh * 0.85 ? "static" : "go");
      },
      { threshold: 0, rootMargin: "0px 0px 15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, reduced]);
  return reduced ? "static" : phase;
}
