"use client";

import { MotionConfig } from "motion/react";
import {
  AppShell,
  TopBar,
  WindowFrame,
  ContextView,
  AGENTS,
  GROUPS,
  CONTEXT,
} from "@/components/product-mock";
import { Section } from "./section";

export function ContextSection() {
  return (
    <Section id="context" eyebrow="Your context">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.75fr)] lg:gap-14">
        <div>
          <h2 className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]">
            Tell it once.{" "}
            <span className="text-muted-foreground/85">Every agent reads this first.</span>
          </h2>
          <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-muted-foreground">
            Your company, what you sell, your ideal customer, your revenue
            goals and your voice. Every agent starts from the same context,
            so the work sounds like your team and points at your goals.
          </p>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-3">
          <p className="sr-only">
            Product preview with example data: the Company context screen lists the company
            ({CONTEXT.company}), what it sells, its ideal customer, three revenue goals, its voice
            and connected tools ({CONTEXT.tools.join(", ")}), under the caption &ldquo;Every agent
            reads this first.&rdquo;
          </p>
          <MotionConfig reducedMotion="user">
            <div aria-hidden inert className="md:h-[680px]">
              <WindowFrame label="Product preview · example data" path="company-context">
                <AppShell
                  sidebar={{ agents: AGENTS, groups: GROUPS, view: "context" }}
                  header={<TopBar title="Company context" subtitle="Shared by every agent" />}
                >
                  <ContextView />
                </AppShell>
              </WindowFrame>
            </div>
          </MotionConfig>
          <p className="m-0 text-[12px] text-muted-foreground">
            Example company. Tools are shown as generic types.
          </p>
        </div>
      </div>
    </Section>
  );
}
