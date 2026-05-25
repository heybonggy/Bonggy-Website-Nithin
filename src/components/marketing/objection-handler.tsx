"use client";

import { motion } from "motion/react";
import {
  Robot,
  Scales,
} from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { SPRING } from "./_motion";

export function ObjectionHandler() {
  return (
    <Section id="vs-ai-sdr" eyebrow="The contrast">
      <motion.div
        initial={{ y: 16 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={SPRING}
        className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
      >
        <div className="flex flex-col gap-7">
          <div className="inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <Scales weight="regular" className="size-3.5 text-signal" />
            How is this different from an AI SDR?
          </div>

          <h2 className="text-display text-balance text-[32px] font-medium leading-none tracking-tight sm:text-[40px] lg:text-[48px]">
            AI SDRs automated the typing{" "}
            <span className="text-muted-foreground/85">
              and skipped the thinking.
            </span>
          </h2>

          <p className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground">
            So they sent more and meant less. Bonggy is the opposite bet: we
            put the AI on the judgment. Which account, why now, what to say.
            And leave the sending to a human who has to live with the reply.
            You&apos;re not buying another autopilot.{" "}
            <span className="text-foreground">
              You&apos;re buying the part the autopilot never had.
            </span>
          </p>
        </div>

        {/* Side-by-side compare , no card-on-card, just inner border */}
        <div className="grid grid-cols-1 overflow-hidden rounded-bento-sm border border-border/80 bg-card/40 backdrop-blur sm:grid-cols-2">
          <div className="flex flex-col gap-3 p-6 sm:p-7 border-b border-border/60 sm:border-b-0 sm:border-r">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <Robot weight="regular" className="size-3.5" />
              AI SDR
            </div>
            <div className="text-[13px] leading-relaxed text-muted-foreground">
              AI does the sending.
              <br />
              Volume up, meaning down.
              <br />
              Your domain absorbs the cost.
            </div>
          </div>
          <div className="relative flex flex-col gap-3 p-6 sm:p-7">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
              <Scales weight="fill" className="size-3.5" />
              Bonggy
            </div>
            <div className="text-[13px] leading-relaxed text-foreground/90">
              AI does the judgment.
              <br />
              Humans send.
              <br />
              The reply lands on someone who has to live with it.
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
