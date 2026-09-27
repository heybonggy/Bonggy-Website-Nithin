"use client";

import * as React from "react";
import { usePrefersReducedMotion } from "@/components/marketing/_motion";
import type { Timeline } from "./types";

const THRESHOLDS = Array.from({ length: 41 }, (_, i) => i / 40);

type Options<S, A> = {
  timeline: Timeline<A>;
  reducer: (state: S, action: A) => S;
  initial: S;
  /** The element whose visibility drives the clock. */
  ref: React.RefObject<HTMLElement | null>;
  /** Share of the element in view before the demo starts (once). */
  startAt?: number;
  /** Start once this many pixels of the element are visible instead (hero). */
  startWhenVisiblePx?: number;
  /** Never start earlier than this many ms after mount (e.g. after an intro). */
  notBeforeMs?: number;
  /** Delay after first reaching `startAt`, in ms. */
  startDelay?: number;
  /** Extra gate, e.g. loop focus for looping sections. Defaults to true. */
  focused?: boolean;
  /** Restart from the top after this many ms at the end. Off by default. */
  loopAfter?: number;
};

export type DemoPlayer<S> = {
  state: S;
  /** The demo has started and not yet reached its end. */
  playing: boolean;
  done: boolean;
  /** Element is out of view: pause CSS animations via data-demo-offscreen. */
  offscreen: boolean;
  skip: () => void;
  replay: () => void;
};

/**
 * Plays a timeline on a virtual clock. The clock only advances while the
 * element is in view, the page is visible and `focused` is true, so a demo
 * never runs ahead while nobody is watching. Reduced motion jumps straight
 * to the end state. Escape skips while the demo is playing.
 */
export function useDemoPlayer<S, A>({
  timeline,
  reducer,
  initial,
  ref,
  startAt = 0.35,
  startWhenVisiblePx,
  notBeforeMs = 0,
  startDelay = 1000,
  focused = true,
  loopAfter,
}: Options<S, A>): DemoPlayer<S> {
  const reduced = usePrefersReducedMotion();
  const total = timeline.length;
  const [index, setIndex] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [skipped, setSkipped] = React.useState(false);

  const effectiveIndex = reduced || skipped ? total : index;
  const done = effectiveIndex >= total;

  const state = React.useMemo(
    () => timeline.slice(0, effectiveIndex).reduce<S>((s, step) => reducer(s, step.action), initial),
    [timeline, reducer, initial, effectiveIndex],
  );

  // Visibility of the element: start once past `startAt` (or past
  // `startWhenVisiblePx`), pause when out.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mountedAt = performance.now();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        const ready =
          startWhenVisiblePx !== undefined
            ? entry.intersectionRect.height >= Math.min(startWhenVisiblePx, entry.boundingClientRect.height)
            : entry.intersectionRatio >= startAt;
        if (ready && !timer) {
          const wait = Math.max(startDelay, notBeforeMs - (performance.now() - mountedAt));
          timer = setTimeout(() => setStarted(true), wait);
        }
      },
      { threshold: THRESHOLDS },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [ref, startAt, startWhenVisiblePx, notBeforeMs, startDelay]);

  React.useEffect(() => {
    const onVis = () => setVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const active = started && inView && visible && focused && !reduced && !skipped;

  // The clock: spend the current step's hold in real frames while active.
  const spent = React.useRef(0);
  React.useEffect(() => {
    if (!active) return;
    const hold = index < total ? timeline[index].hold : loopAfter;
    if (hold === undefined) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      spent.current += now - last;
      last = now;
      if (spent.current >= hold) {
        spent.current = 0;
        setIndex((i) => (i < total ? i + 1 : 0));
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, index, total, timeline, loopAfter]);

  const playing = started && !done && !reduced && !skipped;

  const skip = React.useCallback(() => {
    spent.current = 0;
    setSkipped(true);
  }, []);

  const replay = React.useCallback(() => {
    spent.current = 0;
    setSkipped(false);
    setIndex(0);
    setStarted(true);
  }, []);

  React.useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, skip]);

  return { state, playing, done, offscreen: started && !inView, skip, replay };
}
