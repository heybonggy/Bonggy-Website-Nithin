"use client";

import * as React from "react";

/**
 * Only one looping animation on the page runs at a time. Each looping
 * section registers its element here; the one covering the largest share of
 * the viewport (at least MIN_SHARE) is "focused" and may animate. Everything
 * else pauses, including sections that are merely peeking into view.
 */
const MIN_SHARE = 0.2;
const shares = new Map<string, number>();
const listeners = new Set<() => void>();
let focused: string | null = null;

function recompute() {
  let best: string | null = null;
  let bestShare = MIN_SHARE;
  shares.forEach((share, id) => {
    if (share > bestShare) {
      best = id;
      bestShare = share;
    }
  });
  if (best !== focused) {
    focused = best;
    listeners.forEach((l) => l());
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

export function useLoopFocus(ref: React.RefObject<Element | null>): boolean {
  const id = React.useId();
  const isFocused = React.useSyncExternalStore(
    subscribe,
    () => focused === id,
    () => false,
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const viewport = entry.rootBounds?.height || window.innerHeight;
        shares.set(id, entry.intersectionRect.height / viewport);
        recompute();
      },
      { threshold: THRESHOLDS },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      shares.delete(id);
      recompute();
    };
  }, [ref, id]);

  return isFocused;
}
