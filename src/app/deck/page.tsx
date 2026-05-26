"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  ArrowLineUpRight,
  Radar,
  Brain,
  PencilLine,
  PaperPlaneTilt,
  ShieldX,
  Robot,
  Clock,
  Sparkle,
  TrendUp,
  Users,
  Path,
  Target,
  Eye,
  Lightning,
  Database,
} from "@phosphor-icons/react/dist/ssr";
import { BonggyMark } from "@/components/marketing/bonggy-mark";
import { cn } from "@/lib/utils";

/* ============================================================================
   Bonggy deck — `/deck` route.

   12 slides, each 100svh, scrollable + keyboard-navigable (←/→/↑/↓/space).
   Uses the site's tokens (signal, foreground, card, border) so light/dark
   themes adapt automatically. No Nav, no Footer — this is a deck.
   ============================================================================*/

const TOTAL = 12;

export default function DeckPage() {
  const [active, setActive] = React.useState(1);

  // Track which slide is most-visible
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const n = parseInt(
            (visible[0].target as HTMLElement).dataset.slide || "1",
            10,
          );
          if (!isNaN(n)) setActive(n);
        }
      },
      { threshold: [0.3, 0.6] },
    );
    document.querySelectorAll("[data-slide]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Keyboard nav
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const fwd = ["ArrowDown", "ArrowRight", " ", "PageDown"].includes(e.key);
      const back = ["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key);
      if (!fwd && !back) return;
      // Don't hijack when typing in a field
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      const next = Math.max(1, Math.min(TOTAL, active + (fwd ? 1 : -1)));
      const el = document.querySelector<HTMLElement>(
        `[data-slide="${next}"]`,
      );
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <main className="relative">
      {/* Top progress + counter — fixed to viewport */}
      <DeckChrome active={active} />

      {/* Slides */}
      <Slide1 />
      <Slide2 />
      <Slide3 />
      <Slide4 />
      <Slide5 />
      <Slide6 />
      <Slide7 />
      <Slide8 />
      <Slide9 />
      <Slide10 />
      <Slide11 />
      <Slide12 />
    </main>
  );
}

/* ----------------------------------------------------------------------------
   Deck chrome — sticky top strip with progress bar and slide counter.
   ----------------------------------------------------------------------------*/

function DeckChrome({ active }: { active: number }) {
  const pct = (active / TOTAL) * 100;
  return (
    <>
      {/* Progress bar — hairline at very top of viewport */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[2px]"
      >
        <motion.div
          className="h-full bg-signal"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
          style={{
            boxShadow: "0 0 12px color-mix(in oklab, var(--signal) 60%, transparent)",
          }}
        />
      </div>

      {/* Top-right counter + brand. Position fixed so it sits on every slide. */}
      <div className="pointer-events-none fixed top-5 right-5 z-40 sm:top-6 sm:right-8">
        <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-border/70 bg-card/75 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
          <span className="size-1.5 rounded-full bg-signal pulse-signal" />
          <span className="tabular-nums text-foreground/85">
            {String(active).padStart(2, "0")}
          </span>
          <span className="opacity-50">/</span>
          <span className="tabular-nums opacity-70">
            {String(TOTAL).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Top-left brand */}
      <div className="pointer-events-none fixed top-5 left-5 z-40 sm:top-6 sm:left-8">
        <Link
          href="/"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/75 py-1.5 pl-2 pr-3 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground backdrop-blur"
        >
          <BonggyMark className="size-5" />
          <span>Bonggy</span>
        </Link>
      </div>
    </>
  );
}

/* ----------------------------------------------------------------------------
   Slide shell — consistent layout, IDs for nav, in-view entrance.
   ----------------------------------------------------------------------------*/

type SlideProps = {
  n: number;
  eyebrow?: string;
  children: React.ReactNode;
  bgClassName?: string;
  className?: string;
};

function Slide({ n, eyebrow, children, bgClassName, className }: SlideProps) {
  return (
    <section
      data-slide={n}
      className={cn(
        "relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden",
        className,
      )}
    >
      {/* Per-slide background hooks. Default: nothing.
          Overrides can add grids / mesh / signal glow. */}
      {bgClassName ? (
        <div
          aria-hidden
          className={cn("pointer-events-none absolute inset-0 -z-10", bgClassName)}
        />
      ) : null}

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 pt-24 pb-16 sm:px-12 sm:pt-28 lg:px-20 lg:pt-32">
        {eyebrow ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-signal sm:mb-10"
          >
            <span className="size-1 rounded-full bg-signal" />
            {eyebrow}
          </motion.div>
        ) : null}
        {children}
      </div>
    </section>
  );
}

/* ============================================================================
   SLIDE 1 — Title
   ============================================================================*/

function Slide1() {
  return (
    <Slide
      n={1}
      bgClassName="bg-grid bg-grid-mask opacity-90"
      className="justify-center"
    >
      {/* Subtle signal source glow on the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-20%] top-1/3 -z-10 h-[60vw] w-[60vw] rounded-full glow-signal-strong opacity-80"
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
      >
        Bonggy · Investor brief
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="text-display text-display-gradient mt-10 max-w-[20ch] text-balance text-[44px] font-medium leading-[0.96] tracking-tight sm:text-[72px] lg:text-[104px]"
      >
        The command centre for sales teams.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 max-w-[58ch] text-[17px] leading-relaxed text-muted-foreground sm:text-[18px]"
      >
        Find the signal, decide the move, run. The thinking part of outbound,
        automated — your reps stay on the send.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
      >
        <span>Intro</span>
        <span className="text-foreground/40">·</span>
        <span>Pre-seed</span>
        <span className="text-foreground/40">·</span>
        <span>Bengaluru, 2026</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="mt-20 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70"
      >
        <ArrowDown weight="bold" className="size-3" />
        Scroll, or press the arrow keys
      </motion.div>
    </Slide>
  );
}

/* ============================================================================
   SLIDE 2 — The Problem
   ============================================================================*/

function Slide2() {
  return (
    <Slide n={2} eyebrow="The problem">
      <Headline>
        Reps are paid to book meetings.{" "}
        <span className="text-muted-foreground/85">
          Most of the week never reaches a buyer.
        </span>
      </Headline>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-5">
          <Body>
            Before a single reply comes back, a rep has to decide which account
            to work, why it matters right now, and what to actually say. That
            research eats the day — and none of it shows up on quota.
          </Body>
          <Body>
            <span className="text-foreground/90">
              Then the industry doubled down on volume.
            </span>{" "}
            More tools, more sends, more AI typing faster. Buyers tuned out,
            domains burned, and &ldquo;I saw you raised a round&rdquo; became
            the new spam.
          </Body>
        </div>

        <div className="flex flex-col gap-4">
          <StatCard
            icon={Clock}
            title="The day disappears"
            body="Into research, list-building and tab-hopping before outreach even starts."
          />
          <StatCard
            icon={TrendUp}
            title="Volume backfired"
            body="Reply rates fell as AI sends rose — more noise, fewer conversations."
          />
          <StatCard
            icon={Brain}
            title="The hard part stayed manual"
            body="Which account, why now, what to say — still on the rep."
          />
        </div>
      </div>
    </Slide>
  );
}

/* ============================================================================
   SLIDE 3 — The Insight
   ============================================================================*/

function Slide3() {
  return (
    <Slide n={3} eyebrow="The insight" className="justify-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in oklab, var(--signal) 12%, transparent), transparent 70%)",
        }}
      />
      <Headline>
        Volume was never the bottleneck.{" "}
        <span className="text-signal">Judgement was.</span>
      </Headline>

      <Body className="mt-10 max-w-[68ch]">
        The teams winning now do the opposite of the volume playbook: fewer
        sends, sharper angles, every touch led by a real signal. The work has
        moved from typing to thinking — which account, why now, what to say.
        That thinking is the expensive part, and no tool has owned it.
      </Body>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 max-w-[80ch] rounded-bento-sm border border-border/70 bg-card/40 p-7 backdrop-blur"
        style={{
          boxShadow:
            "inset 0 1px 0 var(--inset-highlight), var(--shadow-card-lift)",
        }}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
          Our bet
        </div>
        <p className="mt-3 text-[18px] leading-relaxed text-foreground/95 sm:text-[20px]">
          Put the AI on the judgement, and leave the sending to a human who has
          to live with the reply.
        </p>
      </motion.div>
    </Slide>
  );
}

/* ============================================================================
   SLIDE 4 — What Bonggy Is
   ============================================================================*/

const PIPELINE = [
  {
    step: "01",
    title: "Watch",
    body: "Funding, hires, stack moves, org changes — across your accounts, continuously.",
    Icon: Radar,
  },
  {
    step: "02",
    title: "Score",
    body: "Scattered events become one account story, ranked against what you actually win.",
    Icon: Target,
  },
  {
    step: "03",
    title: "Draft",
    body: "A signal-backed message per buyer, in a tone that fits. The angle your best rep would find.",
    Icon: PencilLine,
  },
  {
    step: "04",
    title: "You send",
    body: "Every draft waits for approval, then goes out through the tools you already run.",
    Icon: PaperPlaneTilt,
  },
];

function Slide4() {
  return (
    <Slide n={4} eyebrow="What Bonggy is">
      <Headline>
        Your best rep&apos;s instinct,{" "}
        <span className="text-muted-foreground/85">given to every rep.</span>
      </Headline>

      <Body className="mt-8 max-w-[68ch]">
        Bonggy is the command centre that sits between your database and your
        sequencer — the thinking layer. It watches your accounts for the moment
        a buying window opens, ranks it against what you actually close, and
        writes the outreach grounded in what changed. The rep reviews and sends.
      </Body>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {PIPELINE.map((p, i) => (
          <motion.div
            key={p.step}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col gap-3 rounded-bento-sm border border-border/70 bg-card/40 p-5 backdrop-blur"
            style={{
              boxShadow:
                "inset 0 1px 0 var(--inset-highlight), var(--shadow-card-lift)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground/70">
                {p.step}
              </span>
              <p.Icon weight="regular" className="size-4 text-signal" />
            </div>
            <div className="text-[18px] font-medium tracking-tight text-foreground">
              {p.title}
            </div>
            <div className="text-[13px] leading-relaxed text-muted-foreground">
              {p.body}
            </div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

/* ============================================================================
   SLIDE 5 — How It Works
   ============================================================================*/

function Slide5() {
  return (
    <Slide n={5} eyebrow="How it works">
      <Headline>
        You don&apos;t operate Bonggy.{" "}
        <span className="text-muted-foreground/85">You install it.</span>
      </Headline>

      <Body className="mt-8 max-w-[68ch]">
        Describe the motion you want in plain English. Bonggy turns it into an
        agent that runs on its own — no pipeline to wire, no formulas, no
        specialist to hire.
      </Body>

      {/* Terminal-style prompt */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="dark mt-10 max-w-[80ch] overflow-hidden rounded-bento-sm border border-border/80 bg-card/95"
      >
        <div className="flex items-center gap-2 border-b border-border/60 bg-background/60 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
            bonggy -- describe-motion
          </span>
        </div>
        <div className="px-5 py-5 font-mono text-[13px] leading-relaxed text-foreground/95 sm:text-[14px]">
          <div className="flex gap-3">
            <span className="text-signal">$</span>
            <span>you type</span>
          </div>
          <div className="mt-2 pl-5 text-foreground/90">
            &ldquo;Every Monday, find accounts that just hired a VP of Sales,
            draft a personal note about the hire, and queue it for me to
            review.&rdquo;
          </div>
          <div className="mt-5 flex gap-3 text-muted-foreground">
            <span className="text-signal">→</span>
            <span>bonggy installs the agent · scheduled · running</span>
          </div>
        </div>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {[
          {
            n: "01",
            t: "Describe the motion",
            b: "One sentence, the way you'd say it out loud.",
          },
          {
            n: "02",
            t: "Bonggy installs the agent",
            b: "It wires the watching, scoring and drafting, and runs on schedule.",
          },
          {
            n: "03",
            t: "It sharpens every week",
            b: "Bonggy learns what you actually close — next week beats this week.",
          },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col gap-2 rounded-bento-sm border border-border/60 bg-card/30 p-5 backdrop-blur"
          >
            <span className="font-mono text-[10px] tabular-nums text-signal">
              {s.n}
            </span>
            <div className="text-[15px] font-medium text-foreground">{s.t}</div>
            <div className="text-[13px] leading-relaxed text-muted-foreground">
              {s.b}
            </div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

/* ============================================================================
   SLIDE 6 — Where We Draw The Line
   ============================================================================*/

const LINES = [
  {
    Icon: ShieldX,
    title: "Anti-spray",
    body: "Every send earns the next. We optimise for fewer, sharper messages — not throughput.",
    line: "We won't show 100 leads when 10 are real.",
  },
  {
    Icon: Robot,
    title: "Anti-autopilot",
    body: "AI on the judgement, humans on the send. The reply lands on someone who lives with it.",
    line: "We won't auto-send filler in your name.",
  },
  {
    Icon: Database,
    title: "Anti-list-of-everything",
    body: "We don't sell a bigger database. We help you work the list you have, better.",
    line: "We won't pad the score to look smart.",
  },
];

function Slide6() {
  return (
    <Slide n={6} eyebrow="Where we draw the line">
      <Headline>
        Three things we won&apos;t{" "}
        <span className="text-muted-foreground/85">compromise on.</span>
      </Headline>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {LINES.map((l, i) => (
          <motion.div
            key={l.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 rounded-bento-sm border border-border/70 bg-card/40 p-6 backdrop-blur sm:p-7"
            style={{
              boxShadow:
                "inset 0 1px 0 var(--inset-highlight), var(--shadow-card-lift)",
            }}
          >
            <l.Icon weight="regular" className="size-5 text-signal" />
            <div className="text-[20px] font-medium tracking-tight text-foreground">
              {l.title}
            </div>
            <div className="text-[14px] leading-relaxed text-muted-foreground">
              {l.body}
            </div>
            <div className="mt-auto border-t border-border/60 pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/70">
              {l.line}
            </div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

/* ============================================================================
   SLIDE 7 — Use Cases
   ============================================================================*/

const PLAYS = [
  "VP of Sales hired in the last 30 days",
  "Series B raised within the ICP",
  "Migrating off a competitor's stack",
  "Hiring 5+ SDRs in one quarter",
  "Champion just changed jobs",
  "SOC 2 / enterprise-unlock signals",
];

function Slide7() {
  return (
    <Slide n={7} eyebrow="Use cases">
      <Headline>
        One pattern.{" "}
        <span className="text-muted-foreground/85">Every sales motion.</span>
      </Headline>

      <Body className="mt-8 max-w-[68ch]">
        Every play is the same move: something changes at a company, and instead
        of a rep noticing, researching and writing it — Bonggy does that part.
        We start where the pain is sharpest, then the same engine runs the rest
        of the team.
      </Body>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
        {/* Wedge card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col gap-5 rounded-bento-sm border border-signal/40 bg-card/40 p-7 backdrop-blur"
          style={{
            boxShadow:
              "0 0 0 1px color-mix(in oklab, var(--signal) 20%, transparent), inset 0 1px 0 var(--inset-highlight), 0 0 40px -10px color-mix(in oklab, var(--signal) 18%, transparent)",
          }}
        >
          <div className="inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
            <Sparkle weight="fill" className="size-3" />
            Start here
          </div>
          <div className="text-[28px] font-medium leading-tight tracking-tight text-foreground sm:text-[34px]">
            SDR &amp; AE teams
          </div>
          <div className="text-[14.5px] leading-relaxed text-muted-foreground">
            The reps measured on meetings, who lose the most time to research.
            Sharpest pain, fastest payoff — our wedge.
          </div>
        </motion.div>

        {/* Plays grid */}
        <div className="flex flex-col gap-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
            Plays Bonggy runs, out of the box
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {PLAYS.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.32, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 rounded-md border border-border/60 bg-card/30 px-3.5 py-3 text-[12.5px] text-foreground/85 backdrop-blur"
              >
                <span className="size-1.5 rounded-full bg-signal" />
                <span>{p}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-[80ch] text-[13px] italic text-muted-foreground">
        Same engine extends to AEs, RevOps, AMs, CS, marketing, partnerships and
        founder-led sales.
      </div>
    </Slide>
  );
}

/* ============================================================================
   SLIDE 8 — Why Now
   ============================================================================*/

const WHY_NOW = [
  {
    Icon: Brain,
    title: "AI got good at judgement",
    body: "Models now read a messy signal and write the right angle — the work that used to need a human's instinct.",
  },
  {
    Icon: ShieldX,
    title: "Volume stopped working",
    body: "Inbox providers and buyers punish spray-and-pray. Sending more is now actively harmful.",
  },
  {
    Icon: Eye,
    title: "Signals are public",
    body: "Hiring, funding, stack and org changes sit in the open. The raw material for sharp outreach is free.",
  },
];

function Slide8() {
  return (
    <Slide n={8} eyebrow="Why now">
      <Headline>
        The volume playbook is breaking —{" "}
        <span className="text-muted-foreground/85">
          right as AI can finally do the thinking.
        </span>
      </Headline>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {WHY_NOW.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            <w.Icon weight="regular" className="size-7 text-signal" />
            <div className="text-[22px] font-medium leading-tight tracking-tight text-foreground sm:text-[26px]">
              {w.title}
            </div>
            <div className="text-[14.5px] leading-relaxed text-muted-foreground">
              {w.body}
            </div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

/* ============================================================================
   SLIDE 9 — Where We Are
   ============================================================================*/

const TRACTION = [
  {
    n: "MVP",
    label: "live & onboarding-ready",
    body: "Production stack. First cohort can start this week.",
  },
  {
    n: "15+",
    label: "SDR advocates",
    body: "Across different orgs, asked to be first in line.",
  },
  {
    n: "3",
    label: "pilots in conversation",
    body: "Warm intros, no cold outreach.",
  },
  {
    n: "0",
    label: "cold calls needed",
    body: "The network is the waitlist.",
  },
];

function Slide9() {
  return (
    <Slide n={9} eyebrow="Where we are">
      <Headline>
        Pre-revenue. MVP live.{" "}
        <span className="text-muted-foreground/85">
          The network is the waitlist.
        </span>
      </Headline>

      <Body className="mt-8 max-w-[70ch]">
        We&apos;re not building a product and then hunting for distribution.
        Three salespeople built this for the job they did every day — our
        network is the go-to-market.
      </Body>

      <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {TRACTION.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 rounded-bento-sm border border-border/70 bg-card/40 p-5 backdrop-blur sm:p-6"
            style={{
              boxShadow:
                "inset 0 1px 0 var(--inset-highlight), var(--shadow-card-lift)",
            }}
          >
            <div className="text-display text-display-gradient text-[44px] font-medium leading-none tracking-tight sm:text-[60px]">
              {t.n}
            </div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-signal">
              {t.label}
            </div>
            <div className="text-[12.5px] leading-relaxed text-muted-foreground">
              {t.body}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 max-w-[80ch] border-l-2 border-signal/50 pl-4 text-[13px] italic text-muted-foreground">
        Honest framing: these are commitments and live pilots, not revenue.
      </div>
    </Slide>
  );
}

/* ============================================================================
   SLIDE 10 — Why This Team
   ============================================================================*/

const TEAM = [
  {
    name: "Nithin Nair",
    role: "CEO · The operator",
    body: "Five years selling B2B SaaS at SpotDraft, Zycus and ContraVault. Hit quota, wrote the cold emails, ran the demos, built the pipelines.",
    Icon: Users,
  },
  {
    name: "Rishabh Shukla",
    role: "CTO · The builder",
    body: "Three years shipping production engineering at Infoblox. Deep in the Claude Agent SDK, MCP and the agent tooling Bonggy runs on.",
    Icon: Lightning,
  },
  {
    name: "Rahul Bagur",
    role: "COO · The systems brain",
    body: "Scaled wealth products zero to $8M+ AUC at CoinDCX. Builds outbound engines from scratch — segmentation, automation, dashboards.",
    Icon: Path,
  },
];

function Slide10() {
  return (
    <Slide n={10} eyebrow="Why this team">
      <Headline>
        The founders{" "}
        <span className="text-muted-foreground/85">are the ICP.</span>
      </Headline>

      <Body className="mt-8 max-w-[70ch]">
        Bonggy isn&apos;t built by people guessing at outbound. We&apos;ve sat
        in every seat that uses it — and built in Bengaluru for the teams
        who&apos;d rather think than spray.
      </Body>

      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {TEAM.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 rounded-bento-sm border border-border/70 bg-card/40 p-6 backdrop-blur sm:p-7"
            style={{
              boxShadow:
                "inset 0 1px 0 var(--inset-highlight), var(--shadow-card-lift)",
            }}
          >
            <m.Icon weight="regular" className="size-6 text-signal" />
            <div>
              <div className="text-[20px] font-medium tracking-tight text-foreground sm:text-[22px]">
                {m.name}
              </div>
              <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-signal">
                {m.role}
              </div>
            </div>
            <div className="text-[13.5px] leading-relaxed text-muted-foreground">
              {m.body}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 max-w-[80ch] text-[13.5px] italic text-foreground/80">
        Builder, operator, systems brain — three views of the same problem, in
        one room.
      </div>
    </Slide>
  );
}

/* ============================================================================
   SLIDE 11 — The Vision
   ============================================================================*/

const VISION = [
  {
    tag: "Now",
    body: "One motion, installed as an agent, live on real accounts.",
  },
  {
    tag: "Next",
    body: "A library of motions a whole team can run, share and reuse.",
  },
  {
    tag: "Later",
    body: "The default command centre for signal-led outbound — the industry standard.",
  },
];

function Slide11() {
  return (
    <Slide n={11} eyebrow="The vision">
      <Headline>
        The place every sales team{" "}
        <span className="text-muted-foreground/85">
          runs its outbound from.
        </span>
      </Headline>

      <Body className="mt-8 max-w-[70ch]">
        Today Bonggy installs one motion as an agent. The bigger idea: one
        command centre where a team builds, runs and improves every outbound
        motion as installable agents — the way teams already run their code in
        one shared place.
      </Body>

      <div className="mt-16 relative">
        {/* Horizontal connecting line */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-[18px] hidden h-[1px] lg:block"
          style={{
            background:
              "linear-gradient(to right, transparent, color-mix(in oklab, var(--signal) 45%, transparent), color-mix(in oklab, var(--signal) 90%, transparent), color-mix(in oklab, var(--signal) 45%, transparent), transparent)",
          }}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          {VISION.map((v, i) => (
            <motion.div
              key={v.tag}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col gap-5"
            >
              <div className="relative inline-flex w-fit items-center gap-2">
                <span className="relative z-10 inline-flex size-9 items-center justify-center rounded-full border border-signal/60 bg-background font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-foreground/80">
                  {v.tag}
                </span>
              </div>
              <div className="text-[18px] leading-relaxed text-foreground/90 sm:text-[20px]">
                {v.body}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ============================================================================
   SLIDE 12 — Early Access (close)
   ============================================================================*/

function Slide12() {
  return (
    <Slide n={12} eyebrow="Early access" className="justify-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, color-mix(in oklab, var(--signal) 14%, transparent), transparent 70%)",
        }}
      />

      <Headline className="max-w-[18ch]">
        Quiet software.{" "}
        <span className="text-muted-foreground/85">Loud results.</span>
      </Headline>

      <Body className="mt-10 max-w-[68ch]">
        We&apos;re onboarding a first cohort now. 30 minutes, no slides —
        we&apos;ll run Bonggy on your real accounts and show you the hottest
        signals firing this week.
      </Body>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
      >
        <Link
          href="https://cal.com/bonggy/30min?overlayCalendar=true"
          target="_blank"
          rel="noreferrer"
          className="group/cta relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-md bg-zinc-950 px-5 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white"
          style={{
            boxShadow:
              "0 0 0 1px color-mix(in oklab, var(--signal) 30%, transparent), inset 0 1px 0 oklch(1 0 0 / 6%)",
          }}
        >
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-signal to-teal-400 opacity-40 blur-md transition-opacity duration-500 group-hover/cta:opacity-75"
          />
          <span className="relative z-10 flex items-center gap-2">
            <span>Join the early-access cohort</span>
            <ArrowUpRight
              weight="bold"
              className="size-3.5 transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
            />
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border/80 bg-card/40 px-5 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-foreground backdrop-blur transition-colors hover:bg-card/60"
        >
          <span>Get a live account walkthrough</span>
          <ArrowLineUpRight weight="bold" className="size-3.5" />
        </Link>

        <a
          href="mailto:founders@bonggy.com?subject=Pilot%20seat%20—%20Bonggy"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border/60 bg-transparent px-5 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <span>Reserve a pilot seat</span>
          <ArrowRight weight="bold" className="size-3.5" />
        </a>
      </motion.div>

      <div className="mt-20 flex flex-col gap-3 border-t border-border/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[14.5px] italic text-foreground/80">
          Built for the people who have to live with the reply.
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <a
            href="https://bonggy.com"
            className="transition-colors hover:text-foreground"
          >
            bonggy.com
          </a>
          <span className="text-foreground/30">·</span>
          <a
            href="mailto:founders@bonggy.com"
            className="transition-colors hover:text-foreground"
          >
            founders@bonggy.com
          </a>
          <span className="text-foreground/30">·</span>
          <span>Built in Bengaluru</span>
        </div>
      </div>
    </Slide>
  );
}

/* ----------------------------------------------------------------------------
   Shared primitives
   ----------------------------------------------------------------------------*/

function Headline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "text-display text-balance text-[36px] font-medium leading-[1.02] tracking-tight text-foreground sm:text-[52px] lg:text-[68px]",
        className,
      )}
    >
      {children}
    </motion.h2>
  );
}

function Body({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "text-[15.5px] leading-relaxed text-muted-foreground sm:text-[16.5px]",
        className,
      )}
    >
      {children}
    </motion.p>
  );
}

type StatIcon = React.ComponentType<{
  className?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}>;

function StatCard({
  icon: Icon,
  title,
  body,
}: {
  icon: StatIcon;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4 rounded-bento-sm border border-border/60 bg-card/30 p-5 backdrop-blur"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border/60 bg-card/40">
        <Icon weight="regular" className="size-4 text-signal" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-[14.5px] font-medium tracking-tight text-foreground">
          {title}
        </div>
        <div className="text-[13px] leading-relaxed text-muted-foreground">
          {body}
        </div>
      </div>
    </motion.div>
  );
}
