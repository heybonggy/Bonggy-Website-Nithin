"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import {
  AddressBook,
  Brain,
  CalendarBlank,
  ChatsCircle,
  EnvelopeSimple,
  Microphone,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { Section } from "./section";
import { useLoopFocus } from "./loop-focus";
import { SPRING, usePrefersReducedMotion } from "./_motion";

// Generic tool labels only: none of these are named integrations.
const TOOLS = [
  { label: "CRM", Icon: AddressBook },
  { label: "Email", Icon: EnvelopeSimple },
  { label: "Calendar", Icon: CalendarBlank },
  { label: "Slack", Icon: ChatsCircle },
  { label: "Call notes", Icon: Microphone },
];

const ROLES = ["Modeller", "Researcher", "Value generator"];

const INSTRUCTIONS =
  "Every Monday, check accounts renewing in the next 90 days. Flag usage drops and new stakeholders, then draft a renewal brief for the account owner to review.";

export function BotBuilder() {
  return (
    <Section id="build" eyebrow="Build your own">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <h2 className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]">
          Build any bot.{" "}
          <span className="text-muted-foreground/85">
            Then put them to work as a team.
          </span>
        </h2>
        <p className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground lg:pt-2">
          Give a bot a name, a role and instructions. Choose the tools it can
          use, point it at a revenue goal and switch memory on. Start from a
          template or build the one only your team needs, then group bots into
          pods that share what they learn.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BuilderCard />
        <GroupCard />
      </div>
    </Section>
  );
}

/* ───────────────────────────── builder mock ───────────────────────────── */

function BuilderCard() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = usePrefersReducedMotion();

  return (
    <figure
      ref={ref}
      aria-label="Example bot builder (mock UI)"
      className="terminal-corners relative flex flex-col rounded-lg border border-border/80 bg-card/60"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-3.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          New bot
        </span>
        <span className="rounded-[3px] border border-border/80 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
          Example · mock UI
        </span>
      </div>

      <dl className="flex flex-1 flex-col gap-4 p-5">
        <Field label="Name">
          <div className="rounded-md border border-border/80 bg-background/60 px-3 py-2 text-[14px] text-foreground">
            Renewal Scout
          </div>
        </Field>

        <Field label="Role">
          <div className="flex flex-wrap gap-1.5">
            {ROLES.map((r) => (
              <span
                key={r}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-[12.5px]",
                  r === "Researcher"
                    ? "border-signal/50 bg-signal/10 text-signal"
                    : "border-border/80 text-muted-foreground",
                )}
              >
                {r}
              </span>
            ))}
          </div>
        </Field>

        <Field label="Instructions">
          <div className="min-h-[88px] rounded-md border border-border/80 bg-background/60 px-3 py-2 text-[13px] leading-relaxed text-foreground/90 sm:min-h-[68px]">
            <TypeOnce text={INSTRUCTIONS} run={inView} instant={reduce} />
          </div>
        </Field>

        <Field label="Tools it can use">
          <ul className="flex flex-wrap gap-1.5">
            {TOOLS.map(({ label, Icon }, i) => (
              <motion.li
                key={label}
                initial={reduce ? false : { scale: 0.9 }}
                animate={inView ? { scale: 1 } : undefined}
                transition={{ ...SPRING, delay: 0.3 + i * 0.06 }}
                className="flex items-center gap-1.5 rounded-full border border-border/80 bg-background/60 py-1 pl-2 pr-2.5 text-[12px] text-foreground"
              >
                <Icon weight="regular" className="size-3.5 text-signal" aria-hidden />
                {label}
              </motion.li>
            ))}
          </ul>
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Revenue goal">
            <div className="text-[13.5px] text-foreground">Net revenue retention</div>
          </Field>
          <Field label="Memory">
            <div className="flex items-center gap-2 text-[13.5px] text-foreground">
              <span
                aria-hidden
                className="relative inline-flex h-4 w-7 items-center rounded-full bg-signal"
              >
                <span className="absolute right-0.5 size-3 rounded-full bg-background" />
              </span>
              On · shared with Enterprise pod
            </div>
          </Field>
        </div>
      </dl>

      <figcaption className="border-t border-border/60 px-5 py-3 text-[12px] leading-snug text-muted-foreground">
        Drafts from this bot wait for the account owner&apos;s approval before
        anything goes out.
      </figcaption>
    </figure>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  );
}

/** Types text once when `run` flips on. Space is reserved by the parent. */
function TypeOnce({ text, run, instant }: { text: string; run: boolean; instant: boolean }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!run || instant) return;
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setCount(Math.min(i, text.length));
      if (i >= text.length) clearInterval(id);
    }, 24);
    return () => clearInterval(id);
  }, [run, instant, text]);
  const shown = instant ? text : text.slice(0, count);
  return (
    <>
      <span aria-hidden>
        {shown}
        {!instant && run && count < text.length ? (
          <span className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 bg-signal" />
        ) : null}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}

/* ───────────────────────────── group graph ───────────────────────────── */

// Coordinates in a 100 × 75 box. The graph area is 4:3 on mobile and a little
// wider on desktop; nodes are positioned in % so they track either way.
const HUB = { x: 50, y: 37.5 };
const MEMBERS = [
  { name: "Market Modeller", x: 21, y: 13 },
  { name: "Account Researcher", x: 79, y: 13 },
  { name: "Brief Writer", x: 79, y: 62 },
  { name: "Renewal Scout", x: 21, y: 62 },
];
// Direction data moves: into memory from the researchers, out to the writer.
const EDGES = MEMBERS.map((m, i) =>
  i === 2
    ? `M ${HUB.x},${HUB.y} L ${m.x},${m.y}`
    : `M ${m.x},${m.y} L ${HUB.x},${HUB.y}`,
);
const PEER_EDGE = `M ${MEMBERS[0].x},${MEMBERS[0].y} L ${MEMBERS[1].x},${MEMBERS[1].y}`;

function GroupCard() {
  const ref = React.useRef<HTMLDivElement>(null);
  const focused = useLoopFocus(ref);
  const reduce = usePrefersReducedMotion();
  const animate = focused && !reduce;

  return (
    <figure
      ref={ref}
      aria-label="Example group: Enterprise pod, four agents sharing one memory"
      className="terminal-corners relative flex flex-col rounded-lg border border-border/80 bg-card/60"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-3.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Groups
        </span>
        <span className="rounded-[3px] border border-border/80 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
          Example
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-[18px] font-normal tracking-tight text-foreground">
          Enterprise pod
        </h3>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Four agents, one shared memory, one revenue goal.
        </p>
      </div>

      <div className="relative mx-5 mb-5 aspect-[4/3] overflow-hidden rounded-md border border-border/60 bg-background/50 lg:aspect-[16/10]">
        <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-30" />
        <svg
          aria-hidden
          viewBox="0 0 100 75"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
        >
          {[...EDGES, PEER_EDGE].map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="oklch(0.78 0.13 152 / 55%)"
              strokeWidth="1"
              strokeDasharray="1.2 1.2"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {animate
            ? [...EDGES, PEER_EDGE].map((d, i) => (
                <motion.circle
                  key={`p-${d}`}
                  r="0.9"
                  fill="oklch(0.85 0.14 152)"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    delay: i * 0.55,
                    ease: "easeInOut",
                  }}
                  style={{ offsetPath: `path('${d}')` }}
                />
              ))
            : null}
        </svg>

        {/* Shared memory hub */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${HUB.x}%`, top: `${(HUB.y / 75) * 100}%` }}
        >
          {animate ? (
            <motion.span
              aria-hidden
              className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/40"
              animate={{ scale: [0.6, 1.6], opacity: [0.7, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
            />
          ) : null}
          <div className="relative flex items-center gap-1.5 whitespace-nowrap rounded-full border border-signal/50 bg-background px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-signal">
            <Brain weight="regular" className="size-3.5" aria-hidden />
            Shared memory
          </div>
        </div>

        {MEMBERS.map((m) => (
          <div
            key={m.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${m.x}%`, top: `${(m.y / 75) * 100}%` }}
          >
            <div className="whitespace-nowrap rounded-md border border-border/80 bg-card px-2 py-1 text-[11px] text-foreground shadow-diffusion-sm sm:text-[12px]">
              {m.name}
            </div>
          </div>
        ))}
      </div>

      <figcaption className="mt-auto border-t border-border/60 px-5 py-3 text-[12px] leading-snug text-muted-foreground">
        Research flows into shared memory; the Brief Writer drafts from it.
        Every draft still waits for a person.
      </figcaption>
    </figure>
  );
}
