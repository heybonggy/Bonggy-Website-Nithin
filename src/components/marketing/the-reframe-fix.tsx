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
    title: "Watch",
    head: "The research a rep never has time for.",
    body: "Job changes, funding, tech-stack moves, org changes across your accounts. Continuously.",
  },
  {
    n: "02",
    Icon: StackPlus,
    title: "Cluster & score",
    head: "The prioritization a junior rep gets wrong.",
    body: "Several events at one company become one scored account view, ranked against your closed-won.",
  },
  {
    n: "03",
    Icon: PencilLine,
    title: "Draft",
    head: "The angle your best rep would've found , for the rep who wouldn't have.",
    body: "A signal-backed message per buyer, in a tone that fits.",
  },
  {
    n: "04",
    Icon: PaperPlaneTilt,
    title: "Review & send",
    head: "The rep stays in control; the thinking is just done.",
    body: "Every draft queued for approval, then pushed to Instantly, Mailchimp, your CRM, LinkedIn, email.",
  },
];

export function TheReframeFix() {
  return (
    <>
      {/* THE REFRAME , large statement, two-column asymmetric */}
      <Section id="reframe" eyebrow="The reframe" className="pb-14 sm:pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <motion.h2
            initial={{ y: 14 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={SPRING}
            className="text-display text-balance text-[36px] font-medium leading-none tracking-tight sm:text-[44px] lg:text-[56px]"
          >
            You don&apos;t have an SDR problem.{" "}
            <span className="text-signal">You have a thinking problem.</span>
          </motion.h2>

          <motion.p
            initial={{ y: 12 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ ...SPRING, delay: 0.05 }}
            className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground lg:pt-2"
          >
            Your reps already have more signal than they can read , funding
            rounds, new hires, stack changes. What they&apos;re missing is the
            layer that turns that noise into a decision: this account, this
            week, this reason, this opening line. That layer is exactly what
            your best rep does in their head and no one else on the team can.
          </motion.p>
        </div>
      </Section>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="section-rule" />
      </div>

      {/* THE FIX */}
      <Section id="fix" eyebrow="The fix" className="pt-18 sm:pt-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <motion.h2
            initial={{ y: 14 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={SPRING}
            className="text-display text-balance text-[36px] font-medium leading-none tracking-tight sm:text-[44px] lg:text-[56px]"
          >
            Your best rep&apos;s instinct,{" "}
            <span className="text-muted-foreground/85">
              given to every SDR.
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 12 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ ...SPRING, delay: 0.05 }}
            className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground lg:pt-2"
          >
            Bonggy watches your accounts, catches the moments that open a
            buying window, scores them against what you actually close, and
            drafts the outreach grounded in what changed. The rep reviews a
            signal-backed draft and sends. The hard-won judgment is already
            in the box.
          </motion.p>
        </div>

        {/* Step list , divider-led, NO card boxes */}
        <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-bento-sm border border-border/60 bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ y: 16 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ ...SPRING, delay: i * 0.05 }}
              className="relative flex flex-col gap-4 bg-background/60 p-6 backdrop-blur lg:p-7"
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
          viewport={{ once: true, amount: 0 }}
          transition={SPRING}
          className="mt-14 max-w-3xl text-pretty text-[20px] font-medium leading-snug tracking-tight"
        >
          We&apos;re not an AI SDR and we&apos;re not a sequencer.{" "}
          <span className="text-muted-foreground">
            We don&apos;t replace your reps , we make the average one work like
            the one you wish you could clone.
          </span>
        </motion.p>
      </Section>
    </>
  );
}
