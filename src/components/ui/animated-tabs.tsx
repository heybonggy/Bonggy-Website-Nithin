"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * AnimatedTabs — adapted from the 21st.dev `animated-tabs` recipe for the
 * Bonggy design system. Uses motion's `layoutId` to slide the active-pill
 * indicator between tabs; content blurs in on switch.
 *
 * Bonggy adaptations vs the upstream component:
 *   - Replaces the neon dark backdrop with bg-card / border-border tokens
 *   - Tab labels use font-mono with 0.18em tracking (matches the site)
 *   - Active pill uses bg-background + signal-coloured label
 *   - Content panel uses the same card register as other surfaces
 */

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  /** Optional unique key for layoutId so multiple AnimatedTabs on one page
   *  don't share the same animated indicator. */
  layoutGroupId?: string;
}

export function AnimatedTabs({
  tabs,
  defaultTab,
  className,
  layoutGroupId = "animated-tabs",
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = React.useState<string>(
    defaultTab ?? tabs[0]?.id,
  );

  if (!tabs?.length) return null;

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      {/* Tab strip */}
      <div className="flex flex-wrap gap-1 rounded-xl border border-border/60 bg-card/40 p-1.5 backdrop-blur-sm">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative rounded-lg px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] outline-none transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId={`${layoutGroupId}-pill`}
                  className="absolute inset-0 rounded-lg border border-border/80 bg-background shadow-diffusion-sm"
                  transition={{ type: "spring", duration: 0.5, bounce: 0.18 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div className="relative min-h-[420px] rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8 md:p-10">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {tab.content}
              </motion.div>
            ),
        )}
      </div>
    </div>
  );
}
