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
 title: "Track the effort",
 head: "Every action, across every tool.",
 body: "Sends, calls, meetings, notes, the Slack thread. The real work, not the summary they backfill into the CRM.",
  },
  {
 n: "02",
 Icon: Target,
 title: "Align it to the goal",
 head: "Each action mapped to what it serves.",
 body: "Every action tied to the goal it points at. On-goal, off-goal, and going nowhere.",
  },
  {
 n: "03",
 Icon: Compass,
 title: "Nudge the drift",
 head: "Reps pointed back before the quarter is lost.",
 body: "A rep slides off strategy, Bonggy flags it and points back. Sixty percent of your week is off-ICP. Here are five that fit.",
  },
  {
 n: "04",
 Icon: ChartBar,
 title: "Report to everyone",
 head: "The same truth at every altitude.",
 body: "Rep to CRO, one connected picture. The rep sees what counts. The manager sees who is on-strategy. The CRO sees where the effort leaks.",
  },
];

export function TheReframeFix() {
  return (
 <Section id="what-we-do" eyebrow="One layer above your stack" tint>
 <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
 <motion.h2
 initial={{ y: 14 }}
 whileInView={{ y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={SPRING}
 className="text-display text-balance text-[36px] font-medium leading-none tracking-tight sm:text-[44px] lg:text-[56px]"
 >
 Bonggy reads the effort,{" "}
 <span className="text-muted-foreground/85">
 and points it at the goal.
 </span>
 </motion.h2>

 <motion.p
 initial={{ y: 12 }}
 whileInView={{ y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={{ ...SPRING, delay: 0.05 }}
 className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground lg:pt-2"
 >
 It sits above every tool your team uses, connects every action to
 the goal, and keeps the whole team pulling one direction.
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
 transition={{ ...SPRING, delay: i * 0.05 }}
 className="terminal-corners relative flex flex-col gap-4 bg-background/60 p-6 lg:p-7"
 >
 <div className="flex items-center justify-between">
 <s.Icon
 weight="regular"
 className="size-5 text-signal"
 />
 <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60 tracking-[0.18em]">
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
 transition={SPRING}
 className="mt-14 max-w-3xl text-pretty text-[20px] font-medium leading-snug tracking-tight"
 >
 Not another tool in the stack.{" "}
 <span className="text-muted-foreground">
 The layer that makes the stack make sense.
 </span>
 </motion.p>
 </Section>
  );
}
