"use client";

import { motion } from "motion/react";
import {
  Crown,
  ChartBar,
  Gauge,
  Megaphone,
  Handshake,
  Lifebuoy,
} from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { SPRING } from "./_motion";
import { cn } from "@/lib/utils";

const ROLES = [
  {
    Icon: Crown,
    role: "CRO / VP",
    body: "Whether the company's effort actually points where you said it should. The leaks, by team and by segment, in one view.",
    span: "lg:col-span-7",
  },
  {
    Icon: Gauge,
    role: "Sales Manager",
    body: "Which reps run the strategy and which improvised. Coaching on alignment, not on activity counts.",
    span: "lg:col-span-5",
  },
  {
    Icon: ChartBar,
    role: "RevOps",
    body: "Every rep's effort across every tool, connected to goals, without building another dashboard nobody opens.",
    span: "lg:col-span-5",
  },
  {
    Icon: Megaphone,
    role: "SDR / AE",
    body: "Proof your work counts toward something bigger than an activity quota. The accounts that actually matter today.",
    span: "lg:col-span-7",
  },
  {
    Icon: Handshake,
    role: "Account Manager",
    body: "The full context the SDR and AE built, so you never inherit an account cold.",
    span: "lg:col-span-7",
  },
  {
    Icon: Lifebuoy,
    role: "Customer Success",
    body: "Expansion and renewal effort tied to the revenue goal, not run as a side-quest off to the side.",
    span: "lg:col-span-5",
  },
];

export function ForEveryRole() {
  return (
    <Section id="roles" eyebrow="Every seat, made legible">
      <motion.h2
        initial={{ y: 14 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={SPRING}
        className="text-display max-w-[24ch] text-balance text-[36px] font-medium leading-none tracking-tight sm:text-[44px] lg:text-[56px]"
      >
        One layer.{" "}
        <span className="text-muted-foreground/85">
          Every role finally sees the same picture.
        </span>
      </motion.h2>

      <div className="mt-14 grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-4">
        {ROLES.map((r, i) => (
          <motion.div
            key={r.role}
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ ...SPRING, delay: i * 0.05 }}
            className={cn(
              "group relative flex flex-col gap-4 rounded-bento-sm border border-border/80 bg-card/60 p-7 transition-colors hover:bg-card/80",
              r.span,
            )}
          >
            <r.Icon
              weight="regular"
              className="size-5 text-foreground/70 transition-colors group-hover:text-signal"
            />
            <h3 className="text-[16px] font-medium tracking-tight">{r.role}</h3>
            <p className="text-[14px] leading-relaxed text-muted-foreground">
              {r.body}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
