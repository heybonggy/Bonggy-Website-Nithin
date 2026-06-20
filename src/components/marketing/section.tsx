"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  eyebrow?: string;
  containerClassName?: string;
  bleed?: boolean;
  /** Faint translucent card wash for alternating section rhythm. The
   *  dot-grid behind still reads through, so tinted bands sit a half-step
   *  above the page surface rather than fully occluding it. */
  tint?: boolean;
  /** Soft light-pool at the section's top edge. Off by default — the static
   *  version banded badly; depth is being reworked as a scroll-driven effect. */
  glow?: boolean;
};

export function Section({
  eyebrow,
  containerClassName,
  bleed,
  tint,
  glow = false,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      {...rest}
      className={cn(
        "relative w-full py-20 sm:py-24 lg:py-28",
        tint && "bg-card/30",
        // content-visibility: auto skips paint/layout for the section when
        // it's off-screen. contain-intrinsic-size tells the browser to
        // reserve ~700px height for the unrendered section so the scrollbar
        // stays stable. Huge win on long pages, especially under power-
        // throttling on battery.
        "[content-visibility:auto] [contain-intrinsic-size:auto_700px]",
        className,
      )}
    >
      {glow ? (
        <div aria-hidden className="section-glow pointer-events-none absolute inset-x-0 top-0 z-0 h-[460px]" />
      ) : null}
      <div
        className={cn(
          "relative z-10",
          !bleed && "mx-auto w-full max-w-[1400px] px-6 lg:px-10",
          containerClassName,
        )}
      >
        {eyebrow ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 sm:mb-12"
          >
            {/* Terminal section-header: signal tick + mono label + a dotted
                rule running to the edge, echoing the hero's instrument feel. */}
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-3 w-[3px] shrink-0 bg-signal" />
              <span className="shrink-0 whitespace-nowrap">{eyebrow}</span>
              <span aria-hidden className="ascii-rule h-px flex-1" />
            </div>
          </motion.div>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function SectionRule() {
  return <div aria-hidden className="section-rule mx-auto max-w-[1400px]" />;
}
