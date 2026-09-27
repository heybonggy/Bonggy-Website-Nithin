"use client";

import * as React from "react";
import { usePrefersReducedMotion } from "@/components/marketing/_motion";
import { TypingDots } from "@/components/ui/typing-dots";
import type { Bot } from "./data";
import { BotRow } from "./bot-row";

/**
 * A counter that ticks every `periodMs` while `ref` is on screen and the page
 * is visible. Ambient motion (running rows, the handoff pill) runs on this,
 * independent of scripted takes and of loop focus. Reduced motion: stays 0.
 */
export function useAmbientTick(ref: React.RefObject<Element | null>, periodMs: number, firstMs = periodMs) {
  const reduced = usePrefersReducedMotion();
  const [tick, setTick] = React.useState(0);
  const [inView, setInView] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  React.useEffect(() => {
    const on = () => setVisible(document.visibilityState === "visible");
    on();
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);

  const active = inView && visible && !reduced;
  React.useEffect(() => {
    if (!active) return;
    let t = setTimeout(function next() {
      setTick((n) => n + 1);
      t = setTimeout(next, periodMs);
    }, tick === 0 ? firstMs : periodMs);
    return () => clearTimeout(t);
    // Restart the cadence only when activity changes, not on every tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, periodMs, firstMs]);

  return tick;
}

/** A label that swaps with label-in, with typing dots in front. */
export function CyclingLabel({ labels, tick }: { labels: string[]; tick: number }) {
  const label = labels[tick % labels.length];
  return (
    <span key={label} className="inline-flex max-w-full animate-label-in items-center gap-1.5">
      <TypingDots label="Working" className="shrink-0" />
      <span className="truncate">{label}</span>
    </span>
  );
}

/** A sidebar row that is always working: live dot, cycling preview. */
export function RunningBotRow({ bot, labels, periodMs = 1800 }: { bot: Bot; labels: string[]; periodMs?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const tick = useAmbientTick(ref, periodMs);
  return (
    <div ref={ref}>
      <BotRow bot={bot} status="running" preview={<CyclingLabel labels={labels} tick={tick} />} time="now" />
    </div>
  );
}
