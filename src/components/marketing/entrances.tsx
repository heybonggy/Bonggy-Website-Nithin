"use client";

import * as React from "react";
import { useEntrance } from "./_motion";

/**
 * Fade-and-rise once when scrolled into view (y 16 → 0, 0.6s outExpo).
 * Uses useEntrance, so content is never hidden before hydration, for
 * crawlers, or under reduced motion.
 */
export function Rise({
  as: Tag = "div",
  delay = 0,
  amount = 0.3,
  className,
  children,
  ...rest
}: {
  as?: React.ElementType;
  delay?: number;
  amount?: number;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">) {
  const ref = React.useRef<HTMLElement>(null);
  const state = useEntrance(ref, amount);
  return (
    <Tag
      ref={ref}
      data-rise={state === "static" ? undefined : state}
      className={className}
      style={state === "go" && delay ? { animationDelay: `${delay}s` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * A container whose children (or grandchildren with `deep`) rise in once,
 * 60ms apart (y 12 → 0, 0.45s), when 25% of it is in view.
 */
export function Stagger({
  as: Tag = "div",
  deep = false,
  className,
  children,
  ...rest
}: {
  as?: React.ElementType;
  deep?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">) {
  const ref = React.useRef<HTMLElement>(null);
  const state = useEntrance(ref, 0.25);
  const attr = state === "static" ? undefined : state;
  return (
    <Tag ref={ref} className={className} {...(deep ? { "data-stagger-deep": attr } : { "data-stagger": attr })} {...rest}>
      {children}
    </Tag>
  );
}
