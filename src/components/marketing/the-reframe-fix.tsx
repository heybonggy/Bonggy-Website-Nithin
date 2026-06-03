"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Eye,
  StackPlus,
  PencilLine,
  PaperPlaneTilt,
} from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { SPRING } from "./_motion";

const STEPS = [
  {
 n: "01",
 Icon: Eye,
 title: "Signals it watches",
 head: "Shaped around your buyer, not a generic feed.",
 body: "The triggers a med-device team cares about are not the triggers a cybersecurity team cares about. Bonggy reads what matters for your motion.",
  },
  {
 n: "02",
 Icon: StackPlus,
 title: "Sources it reads",
 head: "The places your buyers actually leave a trail.",
 body: "Your industry has its own surface area. Press releases, procurement feeds, niche communities, public filings. Tuned per customer.",
  },
  {
 n: "03",
 Icon: PencilLine,
 title: "Language it drafts in",
 head: "Your team&apos;s voice, not generic AI.",
 body: "The drafts read in the register your buyers expect, learned from your closed-won messages and the way your reps already write.",
  },
  {
 n: "04",
 Icon: PaperPlaneTilt,
 title: "Timing it chooses",
 head: "When the signal is fresh and the window is open.",
 body: "It surfaces what to act on now and what can wait, so your team is always working the highest-value move.",
  },
];

export function TheReframeFix() {
  return (
 <Section id="fix" eyebrow="Tailored, not generic">
 <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
 <motion.h2
 initial={{ y: 14 }}
 whileInView={{ y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={SPRING}
 className="text-display text-balance text-[36px] font-medium leading-none tracking-tight sm:text-[44px] lg:text-[56px]"
 >
 It learns how you sell.{" "}
 <span className="text-muted-foreground/85">
 Not how everyone sells.
 </span>
 </motion.h2>

 <motion.p
 initial={{ y: 12 }}
 whileInView={{ y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={{ ...SPRING, delay: 0.05 }}
 className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground lg:pt-2"
 >
 A cybersecurity team and a medical device team do not sell the
 same way. A founder closing their first ten customers does not
 sell like an enterprise rep working a committee of nine. Most
 tools ignore this. Bonggy does the opposite.
 </motion.p>
 </div>

 {/* Step list — divider-led, NO card boxes */}
 <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-bento-sm border border-border/60 bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
 {STEPS.map((s, i) => (
 <motion.li
 key={s.n}
 initial={{ y: 16 }}
 whileInView={{ y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={{ ...SPRING, delay: i * 0.05 }}
 className="relative flex flex-col gap-4 bg-background/60 p-6  lg:p-7"
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
 The result does not feel like software.{" "}
 <span className="text-muted-foreground">
 It feels like an agency that has worked your accounts for years
 and knows them better than you remember them.
 </span>
 </motion.p>
 </Section>
  );
}
