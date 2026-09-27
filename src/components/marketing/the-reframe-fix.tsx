"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Eye,
  Target,
  Compass,
  ChartBar,
} from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { SPRING } from "./_motion";

const STEPS = [
  {
 n: "01",
 Icon: Eye,
 title: "Track",
 head: "Bots read activity across your tools.",
 body: "Calls, emails, meetings, notes and CRM changes, from your reps and your agents. The real work, not the summary backfilled into the CRM.",
  },
  {
 n: "02",
 Icon: Target,
 title: "Align",
 head: "Map every action to a revenue goal.",
 body: "Every brief, draft and call is tied to the goal it serves: on-goal, off-goal or going nowhere.",
  },
  {
 n: "03",
 Icon: Compass,
 title: "Nudge",
 head: "Flag drift and suggest the next move.",
 body: "When a rep or a pod slides off strategy, Bonggy flags it and proposes what to do instead. A person decides whether to act.",
  },
  {
 n: "04",
 Icon: ChartBar,
 title: "Report",
 head: "One shared picture from rep to CRO.",
 body: "The rep sees what counts, the manager sees what's on-strategy, the CRO sees where effort leaks. No leaderboards, no ranking reps against each other.",
  },
];

export function TheReframeFix() {
  return (
 // Four-step Track / Align / Nudge / Report: the nav's "How it works" target.
 <Section id="how-it-works" eyebrow="How it works · the loop" tint>
 <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
 <motion.h2
 initial={{ opacity: 0, y: 18 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={SPRING.gentle}
 className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]"
 >
 Every bot runs on one loop.{" "}
 <span className="text-muted-foreground/85">
 Track, align, nudge, report.
 </span>
 </motion.h2>

 <motion.p
 initial={{ y: 12 }}
 whileInView={{ y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={{ ...SPRING.gentle, delay: 0.05 }}
 className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground lg:pt-2"
 >
 It&apos;s how every agent&apos;s work ties back to a revenue goal,
 and how your team keeps agents and reps pulling in one direction.
 </motion.p>
 </div>

 {/* Step list — divider-led, NO card boxes */}
 <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[5px] border border-border/60 bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
 {STEPS.map((s, i) => (
 <motion.li
 key={s.n}
 initial={{ y: 16 }}
 whileInView={{ y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={{ ...SPRING.gentle, delay: i * 0.05 }}
 className="terminal-corners relative flex flex-col gap-4 bg-background/60 p-6 lg:p-7"
 >
 <div className="flex items-center justify-between">
 <s.Icon
 weight="regular"
 className="size-5 text-signal"
 />
 <span className="font-mono text-[10px] tabular-nums text-muted-foreground/90 tracking-[0.18em]">
 {s.n}
 </span>
 </div>
 <div>
 <h3 className="text-[16px] font-medium tracking-tight">
 {s.title}
 </h3>
 <p className="mt-2 text-[13.5px] leading-relaxed text-foreground/85">
 {s.head}
 </p>
 <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
 {s.body}
 </p>
 </div>
 </motion.li>
 ))}
 </ol>

 <motion.p
 initial={{ y: 12 }}
 whileInView={{ y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={SPRING.gentle}
 className="mt-14 max-w-3xl text-pretty text-[20px] font-medium leading-snug tracking-tight"
 >
 Alignment, not volume.{" "}
 <span className="text-muted-foreground">
 Agents that answer to the number, and to your team.
 </span>
 </motion.p>
 </Section>
  );
}
