"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "@/components/marketing/_motion";

export type CursorState = { target: string | null; clicks: number };
export const CURSOR_IDLE: CursorState = { target: null, clicks: 0 };

/**
 * The scripted "you" cursor. It travels to the element marked
 * `data-cursor-target={target}` inside `containerRef`, and ripples each time
 * `clicks` goes up. Travel time scales with distance (320–850ms).
 */
export function ScriptedCursor({
  containerRef,
  cursor,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  cursor: CursorState;
}) {
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);
  const prev = React.useRef<{ x: number; y: number } | null>(null);
  const [duration, setDuration] = React.useState(0.5);

  React.useLayoutEffect(() => {
    const box = containerRef.current;
    if (!box || !cursor.target) {
      setPos(null);
      return;
    }
    const el = box.querySelector<HTMLElement>(`[data-cursor-target="${cursor.target}"]`);
    if (!el) return;
    const b = box.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const next = { x: r.left - b.left + r.width * 0.55, y: r.top - b.top + r.height * 0.6 };
    const from = prev.current ?? { x: next.x - 120, y: next.y + 90 };
    const dist = Math.hypot(next.x - from.x, next.y - from.y);
    setDuration(Math.min(850, Math.max(320, 1.05 * dist)) / 1000);
    prev.current = next;
    setPos(next);
  }, [containerRef, cursor.target]);

  return (
    <AnimatePresence>
      {pos ? (
        <motion.div
          key="cursor"
          className="pointer-events-none absolute left-0 top-0 z-20"
          initial={{ opacity: 0, x: pos.x - 120, y: pos.y + 90 }}
          animate={{ opacity: 1, x: pos.x, y: pos.y }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease: EASE.cursor, opacity: { duration: 0.2 } }}
        >
          <AnimatePresence>
            {cursor.clicks > 0 ? (
              <motion.span
                key={cursor.clicks}
                className="absolute -left-[13px] -top-[13px] size-[26px] rounded-full bg-foreground/55"
                initial={{ scale: 12 / 26, opacity: 1 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE.outExpo }}
              />
            ) : null}
          </AnimatePresence>
          <svg width="18" height="20" viewBox="0 0 18 20" className="relative drop-shadow-sm">
            <path d="M1 1 L1 16 L5.5 12 L8.5 19 L11 18 L8 11 L14 11 Z" fill="var(--foreground)" stroke="var(--background)" strokeWidth="1.25" strokeLinejoin="round" />
          </svg>
          <span className="absolute left-4 top-4 rounded-full bg-surface-inverse px-1.5 py-0.5 text-micro font-medium text-fg-inverse">
            you
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
