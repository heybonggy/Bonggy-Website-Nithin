"use client";

import * as React from "react";
import { MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Wraps a product demo. The mock itself is decorative: aria-hidden and inert,
 * with a screen-reader summary in its place. While the demo plays, a
 * transparent overlay catches a pointer-down anywhere on it and skips to the
 * end state. Off-screen demos pause their CSS animations.
 */
export const DemoFrame = React.forwardRef<
  HTMLDivElement,
  {
    summary: string;
    playing?: boolean;
    offscreen?: boolean;
    onSkip?: () => void;
    className?: string;
    children: React.ReactNode;
  }
>(function DemoFrame({ summary, playing = false, offscreen = false, onSkip, className, children }, ref) {
  return (
    <div ref={ref} className={cn("relative", className)} data-demo-offscreen={offscreen ? "" : undefined}>
      <p className="sr-only">{summary}</p>
      <MotionConfig reducedMotion="user">
        <div aria-hidden inert className="select-none">
          {children}
        </div>
      </MotionConfig>
      {playing && onSkip ? (
        <div
          aria-hidden
          className="absolute inset-0 z-10 cursor-pointer"
          title="Skip to the end"
          onPointerDown={onSkip}
        />
      ) : null}
    </div>
  );
});
