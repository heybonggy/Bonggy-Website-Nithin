"use client";

import { useEffect, useMemo, useRef } from "react";

type BackgroundPathsProps = {
  className?: string;
  /** Stroke color (defaults to brand emerald) */
  color?: string;
  /** Number of paths per direction (default 28). Two directions rendered. */
  density?: number;
};

/**
 * BackgroundPaths
 *
 * Two layers of long sweeping SOLID SVG curves drawn across the section.
 *
 * Motion is **scroll-driven**:
 *  - The whole SVG group translates diagonally as `window.scrollY` changes.
 *    Scrolling down shifts the curves toward bottom-left; scrolling up reverses.
 *  - Scroll velocity drives a soft emerald drop-shadow glow on the curves —
 *    faster scroll = brighter, idle = subtle.
 */
export function BackgroundPaths({
  className,
  color = "rgba(95, 191, 143, 0.9)",
  density = 28,
}: BackgroundPathsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const paths = useMemo(() => {
    const make = (position: number) =>
      Array.from({ length: density }, (_, i) => {
        const offset = i * 5 * position;
        const verticalShift = i * 6;
        return {
          id: `${position}-${i}`,
          d:
            `M-${380 - offset} -${189 + verticalShift}` +
            `C-${380 - offset} -${189 + verticalShift} -${312 - offset} ${216 - verticalShift} ${152 - offset} ${343 - verticalShift}` +
            `C${616 - offset} ${470 - verticalShift} ${684 - offset} ${875 - verticalShift} ${684 - offset} ${875 - verticalShift}`,
          width: 0.5 + i * 0.03,
          opacity: 0.08 + i * 0.018,
        };
      });
    return [...make(1), ...make(-1)];
  }, [density]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      container.style.setProperty("--bg-paths-scroll", "0px");
      container.style.setProperty("--bg-paths-glow", "0.2");
      return;
    }

    let lastY = window.scrollY;
    let smoothedVelocity = 0;
    let ticking = false;
    let glowDecayId = 0;

    const update = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      lastY = currentY;

      // Smooth the velocity with a low-pass filter so the glow doesn't twitch.
      smoothedVelocity = smoothedVelocity * 0.6 + delta * 0.4;

      // Glow strength: 0..1, only counts scroll-down velocity (negative scroll = scrolling up still glows softly).
      const target = Math.max(0, Math.min(1, Math.abs(smoothedVelocity) / 28));

      container.style.setProperty("--bg-paths-scroll", `${currentY}px`);
      container.style.setProperty("--bg-paths-glow", target.toFixed(3));

      ticking = false;
    };

    const decay = () => {
      // Ease the glow back toward 0 when the user stops scrolling.
      smoothedVelocity *= 0.85;
      const cur = parseFloat(container.style.getPropertyValue("--bg-paths-glow") || "0");
      const next = cur * 0.9;
      container.style.setProperty("--bg-paths-glow", next.toFixed(3));
      if (next > 0.005) {
        glowDecayId = requestAnimationFrame(decay);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      cancelAnimationFrame(glowDecayId);
      requestAnimationFrame(() => {
        update();
        glowDecayId = requestAnimationFrame(decay);
      });
    };

    container.style.setProperty("--bg-paths-scroll", `${window.scrollY}px`);
    container.style.setProperty("--bg-paths-glow", "0");
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(glowDecayId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        // The drop-shadow filter is keyed off the velocity-driven glow var.
        filter:
          "drop-shadow(0 0 calc(var(--bg-paths-glow, 0) * 8px) rgba(95, 191, 143, calc(var(--bg-paths-glow, 0) * 0.85)))",
        transition: "filter 200ms linear",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -260 696 600"
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          // scaleY(-1) flips the bundle vertically so curves rise FROM bottom-left UP toward
          // the right, instead of sweeping down-right. Translate is scroll-driven; Y sign
          // is flipped because we're operating in the post-scaleY(-1) coordinate space.
          transform:
            "scaleY(-1) translate(calc(var(--bg-paths-scroll, 0px) * -0.12), calc(var(--bg-paths-scroll, 0px) * -0.03))",
          transformOrigin: "center",
          transition: "transform 90ms linear",
        }}
      >
        {paths.map((p) => (
          <path
            key={p.id}
            d={p.d}
            fill="none"
            stroke={color}
            strokeWidth={p.width}
            strokeOpacity={p.opacity}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}

export default BackgroundPaths;
