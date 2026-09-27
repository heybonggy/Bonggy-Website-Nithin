"use client";

import { motion } from "motion/react";
import { AgentAvatar, AGENTS } from "@/components/product-mock";
import { Section } from "./section";
import { SPRING } from "./_motion";

const byId = (id: string) => AGENTS.find((a) => a.id === id)!;

const ROLES = [
  {
    title: "Modeller",
    body: "Maps your market, ICP, goals and plays.",
    agent: byId("modeller"),
    line: "Mid-market logistics is 40% of Q3 wins, with the shortest cycles. Start there.",
  },
  {
    title: "Researcher",
    body: "Digs into accounts, signals and people.",
    agent: byId("researcher"),
    line: "Acme hired a new VP Sales in August and four RevOps roles since. Brief's ready.",
  },
  {
    title: "Value generator",
    body: "Turns it into briefs, drafts and nudges your team can use.",
    agent: byId("writer"),
    line: "Drafted the follow-up for Thursday's call. It's waiting for your approval.",
  },
];

export function RolesStrip() {
  return (
    <Section id="what-we-do" eyebrow="What Bonggy does">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <h2 className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]">
          Three jobs your agents do.{" "}
          <span className="text-muted-foreground/85">
            Model, research, generate value.
          </span>
        </h2>
        <p className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground lg:pt-2">
          Bonggy isn&apos;t an AI SDR and it doesn&apos;t blast outreach.
          It&apos;s where your team builds the agents that do the thinking
          work before the conversation, and every piece of that work ties back
          to a revenue goal.
        </p>
      </div>

      <ul className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {ROLES.map((role, i) => (
          <motion.li
            key={role.title}
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...SPRING.gentle, delay: i * 0.08 }}
            className="terminal-corners relative flex flex-col rounded-lg border border-border/80 bg-card/60 p-6 lg:p-7"
          >
            <h3 className="text-[20px] font-normal tracking-tight text-foreground">{role.title}</h3>
            <p className="mb-6 mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{role.body}</p>

            {/* One line from that role at work, in the product's chat style. */}
            <figure className="mt-auto flex gap-3 rounded-lg border border-border bg-background/70 p-3.5">
              <AgentAvatar avatar={role.agent.avatar} size={24} className="mt-0.5" />
              <div className="min-w-0">
                <div className="text-[12.5px] font-medium text-foreground">{role.agent.name}</div>
                <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{role.line}</p>
              </div>
            </figure>
          </motion.li>
        ))}
      </ul>
      <p className="mt-4 text-[12px] text-muted-foreground">Example messages. Companies and figures are made up.</p>
    </Section>
  );
}
