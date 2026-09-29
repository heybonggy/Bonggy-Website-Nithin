"use client";

import * as React from "react";
import { useReveal } from "./_motion";

/**
 * Fade-and-rise once as it comes into view (y 16 → 0). Uses useReveal: it
 * starts just before the element arrives, shows at once if a fast scroll
 * outran it, and never hides content before hydration, for crawlers, or
 * under reduced motion.
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
  // `amount` is kept for callers; reveals now trigger ahead of the viewport.
  void amount;
  const state = useReveal(ref);
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
 * 40ms apart (capped at 160ms), as it comes into view (useReveal).
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
  const state = useReveal(ref);
  const attr = state === "static" ? undefined : state;
  return (
    <Tag ref={ref} className={className} {...(deep ? { "data-stagger-deep": attr } : { "data-stagger": attr })} {...rest}>
      {children}
    </Tag>
  );
}
