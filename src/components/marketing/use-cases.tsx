"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  Briefcase,
  Crown,
  Handshake,
  ShieldCheck,
  UsersThree,
  Headphones,
  Compass,
} from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { SPRING } from "./_motion";
import { cn } from "@/lib/utils";

const ROLES = [
  {
    Icon: Briefcase,
    role: "Account Executives",
    body: "Walk into every call with the account's full context: what changed, who's involved, what to lead with.",
    span: "lg:col-span-5",
  },
  {
    Icon: Handshake,
    role: "Account Managers",
    body: "Catch renewal risk, expansion signals, and champion job-changes before they become a problem.",
    span: "lg:col-span-7",
  },
  {
    Icon: ShieldCheck,
    role: "Sales Managers",
    body: "Coach on strategy, not on “did you research this account.” The research is done.",
    span: "lg:col-span-7",
  },
  {
    Icon: UsersThree,
    role: "RevOps",
    body: "One sync replaces the export-clean-upload waterfall. Every data point reviewable before the CRM.",
    span: "lg:col-span-5",
  },
  {
    Icon: Headphones,
    role: "Agencies",
    body: "Run signal-led outbound across every client from per-client workspaces. Same headcount, more accounts.",
    span: "lg:col-span-5",
  },
  {
    Icon: Crown,
    role: "Founders doing their own sales",
    body: "Your instinct, systematized. Run the motion an SDR would, without hiring one yet.",
    span: "lg:col-span-7",
  },
];

export function UseCases() {
  return (
    <Section id="use-cases" eyebrow="Built for SDRs first · Built for the whole GTM motion">
      <motion.h2
        initial={{ y: 14 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={SPRING}
        className="text-display max-w-[20ch] text-balance text-[36px] font-medium leading-none tracking-tight sm:text-[44px] lg:text-[56px]"
      >
        One command centre.{" "}
        <span className="text-muted-foreground/85">
          Every outbound role.
        </span>
      </motion.h2>

      {/* Hero: SDR beachhead — full-width, large */}
      <motion.div
        initial={{ y: 16 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={SPRING}
        className="relative mt-14 overflow-hidden rounded-bento border border-border/80 bg-card/60 backdrop-blur shadow-diffusion-sm"
      >

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-6 p-8 lg:p-12">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
              <Compass weight="fill" className="size-3" />
              The beachhead
            </div>
            <h3 className="text-display text-balance text-[28px] font-medium leading-none tracking-tight sm:text-[36px] lg:text-[42px]">
              SDR / BDR
            </h3>
            <p className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground">
              Spend your day in conversations, not in tabs. Walk into every
              account already knowing the angle. The research and the first
              draft are done; you review and send.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 border-t border-border/60 p-8 lg:border-l lg:border-t-0 lg:p-12">
            {[
              "Research — done before the rep opens the tab",
              "First draft — signal-backed, ready to review",
              "Prioritization — top 5 accounts for today, surfaced",
            ].map((line, i) => (
              <motion.div
                key={line}
                initial={{ y: 10 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ ...SPRING, delay: 0.1 + i * 0.06 }}
                className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/50 px-4 py-3 text-[13.5px]"
              >
                <span className="size-1.5 flex-none rounded-full bg-signal pulse-signal" />
                <span className="text-foreground/90">{line}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Supporting roles — asymmetric 2-col zig-zag (5/7, 7/5, 5/7) on a 12-col grid */}
      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-4">
        {ROLES.map((r, i) => (
          <motion.div
            key={r.role}
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ ...SPRING, delay: i * 0.05 }}
            className={cn(
              "group relative flex flex-col gap-4 rounded-bento-sm border border-border/80 bg-card/60 p-7 backdrop-blur transition-colors hover:bg-card/80",
              r.span,
            )}
          >
            <div className="flex items-center justify-between">
              <r.Icon
                weight="regular"
                className="size-5 text-foreground/70 transition-colors group-hover:text-signal"
              />
              <ArrowUpRight
                weight="bold"
                className="size-4 text-muted-foreground/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
              />
            </div>
            <h4 className="text-[16px] font-medium tracking-tight">
              {r.role}
            </h4>
            <p className="text-[14px] leading-relaxed text-muted-foreground">
              {r.body}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
