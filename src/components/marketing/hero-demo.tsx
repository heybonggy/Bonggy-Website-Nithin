"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  ArrowClockwise,
  Check,
  ChartPieSlice,
  FileText,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { SPRING, SPRING_BOUNCE, usePrefersReducedMotion } from "./_motion";

/**
 * Hero demo: a SCRIPTED preview. Nothing is fetched, analysed or sent; every
 * value below is made-up example data for the fictional acme.com. If a
 * visitor types their own domain we say so rather than pretend to read it.
 */
const EXAMPLE_DOMAIN = "acme.com";

const PAGES = ["/pricing", "/careers", "/customers", "/blog"];

const ICP = [
  { k: "Industry", v: "Logistics software" },
  { k: "Company size", v: "200–1,000 employees" },
  { k: "Buyer roles", v: "VP Operations · Head of RevOps" },
  { k: "Pains", v: "Slow carrier onboarding · manual quotes" },
];

const BOTS = [
  {
    name: "Market Modeller",
    job: "Sizes Acme's segments and ranks the plays.",
    Icon: ChartPieSlice,
  },
  {
    name: "Account Researcher",
    job: "Pulls signals and buyers for target accounts.",
    Icon: MagnifyingGlass,
  },
  {
    name: "Brief Writer",
    job: "Turns research into briefs you review.",
    Icon: FileText,
  },
];

const BRIEF_WHY = "Why now: three new ops roles this month and a new VP Operations.";

const STEPS = ["Read", "ICP", "Team", "Brief"] as const;

/** When each step starts, in ms after "Build my team". */
const TIMELINE = [0, 1900, 3500, 5400];
const DONE_AT = 7200;
const FINAL_STEP = 4;

export function HeroDemo({
  onPlayingChange,
}: {
  /** Lets the hero pause its ambient background while the script plays. */
  onPlayingChange?: (playing: boolean) => void;
}) {
  const reduce = usePrefersReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.4 });

  const [domain, setDomain] = React.useState(EXAMPLE_DOMAIN);
  const [runId, setRunId] = React.useState(0);
  const [step, setStep] = React.useState(0);
  const [pagesRead, setPagesRead] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [approved, setApproved] = React.useState(false);

  // Autoplay once, the first time the demo is on screen.
  const [autoplayed, setAutoplayed] = React.useState(false);
  if (inView && !autoplayed && !reduce) {
    setAutoplayed(true);
    setRunId(1);
  }

  React.useEffect(() => {
    if (runId === 0 || reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    at(0, () => {
      setStep(1);
      setPagesRead(0);
      setApproved(false);
      setPlaying(true);
    });
    PAGES.forEach((_, i) => at(350 + i * 350, () => setPagesRead(i + 1)));
    TIMELINE.slice(1).forEach((ms, i) => at(ms, () => setStep(i + 2)));
    at(DONE_AT, () => setPlaying(false));
    return () => timers.forEach(clearTimeout);
  }, [runId, reduce]);

  React.useEffect(() => {
    onPlayingChange?.(playing);
  }, [playing, onPlayingChange]);

  // Reduced motion: show the finished state, no script.
  const shownStep = reduce ? FINAL_STEP : step;
  const shownPages = reduce ? PAGES.length : pagesRead;
  const cleanDomain = domain.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const customDomain = cleanDomain !== "" && cleanDomain.toLowerCase() !== EXAMPLE_DOMAIN;

  function build(e: React.FormEvent) {
    e.preventDefault();
    if (reduce) return;
    setRunId((r) => r + 1);
  }

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label="Bonggy studio demo preview, using example data"
      className="terminal-corners relative w-full overflow-hidden rounded-lg border border-border/80 bg-card/85 shadow-diffusion backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span
            className={cn(
              "size-1.5 rounded-full bg-signal",
              playing && "pulse-signal",
            )}
          />
          Bonggy studio
        </div>
        <span className="whitespace-nowrap rounded-[3px] border border-border/80 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="hidden sm:inline">Demo preview · </span>Example data
        </span>
      </div>

      {/* URL input */}
      <form onSubmit={build} className="flex gap-2 px-4 pt-4">
        <label htmlFor="hero-demo-domain" className="sr-only">
          Company website
        </label>
        <div className="flex h-10 min-w-0 flex-1 items-center rounded-md border border-border/80 bg-background/60 pl-3 focus-within:border-signal/60 focus-within:ring-2 focus-within:ring-signal/20">
          <span aria-hidden className="font-mono text-[12px] text-muted-foreground">
            https://
          </span>
          <input
            id="hero-demo-domain"
            name="domain"
            type="text"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            maxLength={60}
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            aria-describedby="hero-demo-note"
            className="h-full min-w-0 flex-1 bg-transparent pr-3 font-mono text-[12.5px] text-foreground outline-none"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md bg-foreground px-3.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          {runId > 0 && !playing && !reduce ? (
            <ArrowClockwise weight="bold" className="size-3.5" aria-hidden />
          ) : null}
          {runId > 0 && !playing && !reduce ? "Replay" : "Build my team"}
        </button>
      </form>

      {/* Step rail */}
      <ol className="mt-4 grid grid-cols-4 gap-1 px-4" aria-label="Demo steps">
        {STEPS.map((label, i) => {
          const state =
            shownStep > i + 1 || (shownStep === FINAL_STEP && i + 1 === FINAL_STEP && !playing)
              ? "done"
              : shownStep === i + 1
                ? "active"
                : "todo";
          return (
            <li
              key={label}
              className="flex flex-col gap-1.5"
              aria-current={state === "active" ? "step" : undefined}
            >
              <span
                className={cn(
                  "h-[2px] w-full rounded-full transition-colors duration-500",
                  state === "todo" ? "bg-border" : "bg-signal",
                )}
              />
              <span
                className={cn(
                  "font-mono text-[9.5px] uppercase tracking-[0.16em] transition-colors duration-500",
                  state === "todo" ? "text-muted-foreground" : "text-foreground",
                )}
              >
                {String(i + 1).padStart(2, "0")} {label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="space-y-3 px-4 pb-3 pt-4">
        {/* a. Reading */}
        <div className="h-[80px] sm:h-[52px]">
          {shownStep >= 1 ? (
            <div>
              <div className="font-mono text-[12px] text-foreground">
                <Typed key={runId} text={`Reading ${EXAMPLE_DOMAIN}…`} instant={!!reduce} />
              </div>
              <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Pages read">
                {PAGES.map((p, i) => (
                  <li
                    key={p}
                    className={cn(
                      "flex items-center gap-1 rounded-[3px] border px-1.5 py-0.5 font-mono text-[10px] transition-colors duration-300",
                      i < shownPages
                        ? "border-signal/30 text-foreground"
                        : "border-border/60 text-muted-foreground",
                    )}
                  >
                    {i < shownPages ? (
                      <Check weight="bold" className="size-2.5 text-signal" aria-hidden />
                    ) : null}
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Skeleton lines={2} />
          )}
        </div>

        {/* b. ICP card */}
        <div className="h-[152px] rounded-md border border-border/60 bg-background/40 p-3 sm:h-[116px]">
          <div className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">
            ICP · example
          </div>
          {shownStep >= 2 ? (
            <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              {ICP.map((row, i) => (
                <motion.div
                  key={`${runId}-${row.k}`}
                  initial={reduce ? false : { y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ...SPRING, delay: i * 0.12 }}
                  className="min-w-0"
                >
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground">
                    {row.k}
                  </dt>
                  <dd className="line-clamp-2 text-[12px] leading-snug text-foreground sm:truncate">
                    {row.v}
                  </dd>
                </motion.div>
              ))}
            </dl>
          ) : (
            <Skeleton lines={2} columns />
          )}
        </div>

        {/* c. Bots */}
        <div className="h-[146px] sm:h-[108px]">
          <ul className="grid h-full grid-cols-1 gap-1.5 sm:grid-cols-3 sm:gap-2" aria-label="Agents">
            {BOTS.map((bot, i) => (
              <li key={bot.name} className="min-w-0">
                {shownStep >= 3 ? (
                  <motion.div
                    key={`${runId}-${bot.name}`}
                    initial={reduce ? false : { y: 10, opacity: 0, scale: 0.97 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ ...SPRING_BOUNCE, delay: i * 0.35 }}
                    className="flex h-full items-center gap-2.5 rounded-md border border-border/70 bg-background/50 px-2.5 py-1.5 sm:flex-col sm:items-start sm:gap-1.5 sm:p-2.5"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-signal/15 text-signal">
                      <bot.Icon weight="regular" className="size-3.5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[12px] font-medium text-foreground">{bot.name}</div>
                      <p className="truncate text-[11px] leading-snug text-muted-foreground sm:line-clamp-2 sm:whitespace-normal">
                        {bot.job}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full rounded-md border border-dashed border-border/60" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* d. Draft brief */}
        <div className="h-[196px] sm:h-[150px]">
          {shownStep >= 4 ? (
            <motion.div
              key={`brief-${runId}`}
              initial={reduce ? false : { y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={SPRING}
              className="flex h-full flex-col rounded-md border border-border/80 bg-background/60 p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 text-[12.5px] font-medium leading-snug text-foreground sm:truncate">
                  Account brief · Northwind Freight
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-[3px] px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em]",
                    approved
                      ? "bg-signal/15 text-signal"
                      : "border border-border/80 text-foreground",
                  )}
                >
                  {approved ? "Approved by you" : "Needs approval"}
                </span>
              </div>
              <p className="mt-2 text-[11.5px] leading-snug text-muted-foreground">
                <Typed key={`why-${runId}`} text={BRIEF_WHY} instant={!!reduce} />
              </p>
              <p className="mt-1 text-[11.5px] leading-snug text-muted-foreground">
                Angle: cut carrier onboarding time ahead of their Q4 expansion.
              </p>
              <div className="mt-auto flex flex-col items-start gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground">
                  Goal · New logo, mid-market
                </span>
                <AnimatePresence mode="wait" initial={false}>
                  {approved ? (
                    <motion.span
                      key="sent"
                      initial={reduce ? false : { scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="font-mono text-[10px] text-signal"
                    >
                      Ready to send from your account
                    </motion.span>
                  ) : (
                    <motion.button
                      key="approve"
                      type="button"
                      onClick={() => setApproved(true)}
                      exit={reduce ? undefined : { scale: 0.9, opacity: 0 }}
                      className="inline-flex h-7 shrink-0 items-center gap-1 rounded-md bg-signal px-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-signal-foreground ring-2 ring-signal/25 transition-colors hover:bg-signal/90 focus-visible:outline-none focus-visible:ring-signal/70"
                    >
                      <Check weight="bold" className="size-3" aria-hidden />
                      Approve
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <div className="h-full rounded-md border border-dashed border-border/60 p-3">
              <Skeleton lines={3} />
            </div>
          )}
        </div>
      </div>

      <p
        id="hero-demo-note"
        className="border-t border-border/60 px-4 py-2.5 text-[11px] leading-snug text-muted-foreground"
      >
        {customDomain
          ? `This preview always uses the made-up ${EXAMPLE_DOMAIN} example; it can't read ${cleanDomain}. Book a call to see it on your market.`
          : "Scripted preview with made-up example data. Nothing is fetched, analysed or sent."}
      </p>

      {/* Announce progress to screen readers without reading every tick. */}
      <p className="sr-only" aria-live="polite">
        {shownStep === 0
          ? ""
          : shownStep < FINAL_STEP || playing
            ? `Demo step ${shownStep} of 4: ${STEPS[shownStep - 1]}`
            : "Demo finished. An example account brief is waiting for approval."}
      </p>
    </div>
  );
}

/** Types `text` out once; `instant` renders it whole (reduced motion). */
function Typed({ text, instant }: { text: string; instant: boolean }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (instant) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, 26);
    return () => clearInterval(id);
  }, [text, instant]);
  const shown = instant ? text : text.slice(0, count);
  return (
    <>
      <span aria-hidden>{shown}</span>
      <span className="sr-only">{text}</span>
    </>
  );
}

function Skeleton({ lines, columns = false }: { lines: number; columns?: boolean }) {
  return (
    <div className={cn("grid gap-2", columns && "grid-cols-2 gap-x-3")} aria-hidden>
      {Array.from({ length: columns ? lines * 2 : lines }, (_, i) => (
        <span
          key={i}
          className="h-2.5 rounded-full bg-foreground/[0.06]"
          style={{ width: `${columns ? 80 : 90 - i * 18}%` }}
        />
      ))}
    </div>
  );
}
