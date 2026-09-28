"use client";

import * as React from "react";
import { animate, scroll } from "motion";
import { usePrefersReducedMotion } from "./_motion";

/**
 * Scroll-linked motion for browsers without CSS scroll-driven animations
 * (`animation-timeline: view()`). Mirrors the CSS in globals.css with
 * Motion's scroll(): mock/card entry, plate parallax, the band's background
 * and the hero window's exit. Does nothing where CSS handles it, or under
 * reduced motion. Transforms and opacity only.
 */
export function ScrollMotionFallback() {
  const reduced = usePrefersReducedMotion();
  React.useEffect(() => {
    if (reduced || CSS.supports("animation-timeline: view()")) return;
    const stops: (() => void)[] = [];
    const each = (sel: string, fn: (el: HTMLElement) => void) => document.querySelectorAll<HTMLElement>(sel).forEach(fn);

    // Phones: a shorter rise that completes by 75% down the viewport (as in CSS).
    const phone = window.matchMedia("(max-width: 767px)").matches;
    each(".reveal", (el) => {
      stops.push(
        scroll(animate(el, { opacity: [0.001, 1], transform: [`translateY(${phone ? 16 : 24}px) scale(0.98)`, "none"] }, { ease: "linear" }), {
          target: el,
          offset: ["start end", "start 75%"],
        }),
      );
    });
    each(".parallax", (el) => {
      stops.push(scroll(animate(el, { y: [12, -12] }, { ease: "linear" }), { target: el, offset: ["start end", "end start"] }));
    });
    each(".band-fade", (el) => {
      const to = getComputedStyle(el).backgroundColor;
      stops.push(
        scroll(animate(el, { backgroundColor: ["rgba(0,0,0,0)", to] }, { ease: "linear" }), {
          target: el,
          offset: ["start end", "start 85%"],
        }),
      );
    });
    each(".hero-leave", (el) => {
      stops.push(
        scroll(animate(el, { scale: [1, 0.98], opacity: [1, 0.9] }, { ease: "linear" }), { target: el, offset: ["end end", "end start"] }),
      );
    });
    return () => stops.forEach((s) => s());
  }, [reduced]);
  return null;
}
