"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";
import { Section } from "./section";
import { EASE_OUT, SPRING, usePrefersReducedMotion } from "./_motion";

const ROLES = [
  {
    n: "01",
    title: "Modeller",
    body: "Maps your market, ICP, goals and plays.",
    Art: ModellerArt,
  },
  {
    n: "02",
    title: "Researcher",
    body: "Digs into accounts, signals and people.",
    Art: ResearcherArt,
  },
  {
    n: "03",
    title: "Value generator",
    body: "Turns it into briefs, drafts and nudges your team can use.",
    Art: GeneratorArt,
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
            key={role.n}
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...SPRING, delay: i * 0.08 }}
            className="terminal-corners relative flex flex-col rounded-lg border border-border/80 bg-card/60 p-6 lg:p-7"
          >
            <div className="h-24 text-signal" aria-hidden>
              <role.Art />
            </div>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="tabular-nums text-signal">{role.n}</span> · Role
            </div>
            <h3 className="mt-2 text-[20px] font-normal tracking-tight text-foreground">
              {role.title}
            </h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
              {role.body}
            </p>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}

/* ─────────── micro-illustrations: draw once on view, never loop ─────────── */

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (d: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, delay: d, ease: EASE_OUT },
  }),
};

const pop: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (d: number = 0) => ({
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 16, delay: d },
  }),
};

function ArtSvg({ children }: { children: React.ReactNode }) {
  const reduce = usePrefersReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 160 96"
      className="h-full w-full"
      initial={reduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      {children}
    </motion.svg>
  );
}

/** A dim dot grid; a segment lights up and gets outlined — "mapping a market". */
function ModellerArt() {
  const cols = 10;
  const rows = 5;
  const inSegment = (c: number, r: number) =>
    c >= 3 && c <= 7 && r >= 1 && r <= 3 && !(c === 7 && r === 1) && !(c === 3 && r === 3);
  return (
    <ArtSvg>
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const x = 12 + c * 15;
        const y = 12 + r * 18;
        return inSegment(c, r) ? (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={2.6}
            fill="currentColor"
            variants={pop}
            custom={0.15 + (c - 3) * 0.06 + r * 0.04}
          />
        ) : (
          <circle key={i} cx={x} cy={y} r={1.4} fill="currentColor" opacity={0.22} />
        );
      })}
      <motion.rect
        x={40}
        y={19}
        width={86}
        height={58}
        rx={8}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="3 3"
        variants={draw}
        custom={0.7}
      />
    </ArtSvg>
  );
}

/** A hub linking out to accounts and people, with a lens on one of them. */
function ResearcherArt() {
  const hub = { x: 62, y: 50 };
  const nodes = [
    { x: 22, y: 20 },
    { x: 24, y: 78 },
    { x: 104, y: 16 },
    { x: 116, y: 56 },
    { x: 92, y: 84 },
  ];
  return (
    <ArtSvg>
      {nodes.map((n, i) => (
        <motion.line
          key={`l${i}`}
          x1={hub.x}
          y1={hub.y}
          x2={n.x}
          y2={n.y}
          stroke="currentColor"
          strokeWidth={1}
          strokeOpacity={0.55}
          variants={draw}
          custom={0.1 + i * 0.1}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={`n${i}`}
          cx={n.x}
          cy={n.y}
          r={3.2}
          fill="currentColor"
          variants={pop}
          custom={0.45 + i * 0.1}
        />
      ))}
      <circle cx={hub.x} cy={hub.y} r={5} fill="currentColor" />
      <motion.g variants={pop} custom={1.05} style={{ originX: "116px", originY: "56px" }}>
        <circle cx={116} cy={56} r={13} fill="none" stroke="currentColor" strokeWidth={1.5} />
        <line x1={125} y1={65} x2={138} y2={78} stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      </motion.g>
    </ArtSvg>
  );
}

/** A page writing itself, then a check: research turned into a usable brief. */
function GeneratorArt() {
  return (
    <ArtSvg>
      <motion.path
        d="M 48 8 H 100 L 116 24 V 88 H 48 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinejoin="round"
        variants={draw}
        custom={0}
      />
      {[34, 46, 58, 70].map((y, i) => (
        <motion.line
          key={y}
          x1={58}
          y1={y}
          x2={i === 3 ? 84 : 106}
          y2={y}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeOpacity={0.6}
          variants={draw}
          custom={0.45 + i * 0.12}
        />
      ))}
      <motion.g variants={pop} custom={1.1} style={{ originX: "122px", originY: "78px" }}>
        <circle cx={122} cy={78} r={11} fill="currentColor" />
        <path
          d="M 116.5 78 L 120.5 82 L 127.5 74.5"
          fill="none"
          stroke="var(--background)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </ArtSvg>
  );
}
