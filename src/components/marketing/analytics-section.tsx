"use client";

import * as React from "react";
import { MotionConfig, useMotionValueEvent, useScroll } from "motion/react";
import {
  AppShell,
  TopBar,
  WindowFrame,
  AnalyticsView,
  AGENTS,
  GROUPS,
  MEMORY,
} from "@/components/product-mock";
import { Section } from "./section";
import { useScrollShell } from "./scroll-shell";
import { usePrefersReducedMotion } from "./_motion";

/** Scroll progress through the section at which the memory list is full. */
const START = 0.15;
const STEP = 0.07;

export function AnalyticsSection() {
  const reduce = usePrefersReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const shell = useScrollShell();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    ...(shell ? { container: shell as React.RefObject<HTMLElement> } : {}),
  });

  // Complete at rest (and for reduced motion); scrolling through the section
  // grows the memory list one fact at a time.
  const [count, setCount] = React.useState(MEMORY.length);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduce) return;
    const next = Math.min(MEMORY.length, Math.max(1, 1 + Math.floor((p - START) / STEP)));
    setCount((c) => (c === next ? c : next));
  });
  const shown = reduce ? MEMORY.length : count;

  return (
    <Section id="analytics" eyebrow="Analytics">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <h2 className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]">
          See what every agent is doing{" "}
          <span className="text-muted-foreground/85">and what it has learned.</span>
        </h2>
        <p className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground lg:pt-2">
          Activity for every agent, the work mapped to each revenue goal, a
          drift alert when effort wanders off your ICP, and a dated memory of
          what each agent has learned, so the tenth brief is smarter than the
          first.
        </p>
      </div>

      <div ref={ref} className="mt-14 grid min-w-0 grid-cols-1 gap-3">
        <p className="sr-only">
          Product preview with example data: the Analytics screen shows actions per agent this week,
          the share of agent effort mapped to each revenue goal (52% to Q4 new enterprise logos, 8% not
          mapped to a goal), a drift alert that 60% of this week&apos;s research went to accounts outside
          the ICP, and a dated list of what the Account Researcher has learned.
        </p>
        <MotionConfig reducedMotion="user">
          <div aria-hidden inert className="md:h-[740px]">
            <WindowFrame label="Product preview · example data" path="analytics">
              <AppShell
                sidebar={{ agents: AGENTS, groups: GROUPS, view: "analytics" }}
                header={<TopBar title="Analytics" subtitle="All agents" />}
              >
                <AnalyticsView memoryCount={shown} />
              </AppShell>
            </WindowFrame>
          </div>
        </MotionConfig>
        <p className="m-0 text-[12px] text-muted-foreground">
          Illustrative numbers. Agents, accounts and facts are made up.
        </p>
      </div>
    </Section>
  );
}
