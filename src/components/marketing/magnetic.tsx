"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

type MagneticProps = {
  children?: React.ReactNode;
  className?: string;
  pull?: number;
  range?: number;
};

/**
 * Magnetic micro-physics wrapper. Per taste-skill: button pulls toward cursor.
 * Uses useMotionValue + useTransform OUTSIDE the React render cycle so we
 * don't trigger setState on every mouse move (would collapse on mobile).
 */
export function Magnetic({
  children,
  pull = 0.35,
  range = 120,
  className,
}: MagneticProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(useTransform(mx, (v) => v * pull), {
    stiffness: 220,
    damping: 18,
    mass: 0.6,
  });
  const y = useSpring(useTransform(my, (v) => v * pull), {
    stiffness: 220,
    damping: 18,
    mass: 0.6,
  });

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.min(range, Math.hypot(dx, dy)) / range;
    mx.set(dx * dist);
    my.set(dy * dist);
  }

  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
