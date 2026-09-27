"use client";

import * as React from "react";
import { useInView } from "motion/react";
import { Mascot } from "@/components/ui/mascot";

/** Footer brand moment: a large outlined Bong that blinks once in view. */
export function FooterMark() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none mx-auto mt-16 aspect-[2/1] w-full max-w-4xl overflow-hidden text-foreground/18"
      style={{ maskImage: "linear-gradient(#000 0 70%, transparent)", WebkitMaskImage: "linear-gradient(#000 0 70%, transparent)" }}
    >
      <Mascot outline blinkKey={inView ? 1 : undefined} className="block h-auto w-full" />
    </div>
  );
}
