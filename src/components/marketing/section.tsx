"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SPRING } from "./_motion";

type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  eyebrow?: string;
  containerClassName?: string;
  bleed?: boolean;
  /** Faint translucent card wash for alternating section rhythm. The
   *  dot-grid behind still reads through, so tinted bands sit a half-step
   *  above the page surface rather than fully occluding it. */
  tint?: boolean;
};

export function Section({
  eyebrow,
  containerClassName,
  bleed,
  tint,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      {...rest}
      className={cn(
        "relative w-full py-24 sm:py-28 lg:py-36",
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
      <div
        className={cn(
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
            <div className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="size-1 rounded-full bg-signal" />
              {eyebrow}
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
