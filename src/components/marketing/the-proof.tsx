"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import {
  EnvelopeSimple,
  Tray,
  Pulse,
  ArrowDown,
  ArrowUp,
  Clock,
  ChartLine,
  Target,
} from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { SPRING, SPRING_BOUNCE } from "./_motion";
import { cn } from "@/lib/utils";

/**
 * Full comparison table for the "two reps" story.
 * Numbers are messy / organic per taste rules.
 */

type Side = {
  label: string;
  badge: string;
  badgeTone: "muted" | "signal";
  metrics: Metric[];
  angles: { text: string; tone: "muted" | "signal" }[];
};

type Metric = {
  Icon: React.ComponentType<{ className?: string; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }>;
  label: string;
  /** Numeric value for counters and bar comparisons */
  value: number;
  /** Optional suffix (/wk, %, etc.) */
  suffix?: string;
  /** Render override if value isn't numeric */
  display?: string;
  /** Trend direction */
  trend?: "up" | "down" | "flat";
  /** Used to normalise the comparison bar , what value should equal "100%" of the bar */
  scale: number;
  /** Whether higher is better , affects color of bar */
  betterHigh: boolean;
};

const WITHOUT: Side = {
  label: "Rep without judgment",
  badge: "Volume mode",
  badgeTone: "muted",
  metrics: [
    { Icon: EnvelopeSimple, label: "Sent", value: 1247, suffix: " / wk", trend: "up", scale: 1300, betterHigh: false },
    { Icon: Tray, label: "Meetings booked", value: 3.2, suffix: " / wk", trend: "down", scale: 12, betterHigh: true },
    { Icon: Target, label: "Reply rate", value: 0.6, suffix: "%", trend: "down", scale: 14, betterHigh: true },
    { Icon: ChartLine, label: "Pipeline influenced", value: 42, suffix: "K", display: "$42K", trend: "down", scale: 600, betterHigh: true },
    { Icon: Clock, label: "Hours / account", value: 0.4, suffix: " hr", trend: "down", scale: 4, betterHigh: true },
    { Icon: Pulse, label: "Domain health", value: 22, display: "Burning", trend: "down", scale: 100, betterHigh: true },
  ],
  angles: [
    { text: "\"Just wanted to check in\"", tone: "muted" },
    { text: "\"Saw your company is growing\"", tone: "muted" },
    { text: "\"Hoping to connect quickly\"", tone: "muted" },
  ],
};

const WITH: Side = {
  label: "Rep with Bonggy",
  badge: "Signal mode",
  badgeTone: "signal",
  metrics: [
    { Icon: EnvelopeSimple, label: "Sent", value: 184, suffix: " / wk", trend: "down", scale: 1300, betterHigh: false },
    { Icon: Tray, label: "Meetings booked", value: 11.4, suffix: " / wk", trend: "up", scale: 12, betterHigh: true },
    { Icon: Target, label: "Reply rate", value: 12.8, suffix: "%", trend: "up", scale: 14, betterHigh: true },
    { Icon: ChartLine, label: "Pipeline influenced", value: 487, suffix: "K", display: "$487K", trend: "up", scale: 600, betterHigh: true },
    { Icon: Clock, label: "Hours / account", value: 3.1, suffix: " hr", trend: "up", scale: 4, betterHigh: true },
    { Icon: Pulse, label: "Domain health", value: 96, display: "Healthy", trend: "up", scale: 100, betterHigh: true },
  ],
  angles: [
    { text: "\"Saw Mira just stepped in as VP Sales the week after your Series B. The two together usually open a 30-day SDR build window.\"", tone: "signal" },
    { text: "\"Your stack migration off HubSpot started Mar 14, right around when Linear hit the same wave. Worth comparing notes?\"", tone: "signal" },
    { text: "\"Anita just moved from your team to Stripe. We help her successor walk into the role with the same playbook.\"", tone: "signal" },
  ],
};

const DELTA_SUMMARY = [
  { metric: "Meetings", delta: "+8.2 / wk", direction: "up" as const },
  { metric: "Reply rate", delta: "+12.2 pts", direction: "up" as const },
  { metric: "Pipeline", delta: "+$445K", direction: "up" as const },
  { metric: "Sends", delta: "-85%", direction: "down" as const },
];

export function TheProof() {
  return (
    <Section id="proof" eyebrow="The difference">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <motion.h2
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={SPRING}
          className="text-display text-balance text-[36px] font-medium leading-none tracking-tight sm:text-[44px] lg:text-[56px]"
        >
          Two reps. Same accounts.{" "}
          <span className="text-muted-foreground/85">
            One has the judgment, one doesn&apos;t.
          </span>
        </motion.h2>

        <motion.p
          initial={{ y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground lg:pt-2"
        >
          The rep without it sends hundreds of near-identical emails, recycles
          the same three angles, and watches reply rates fall while the domain
          takes the hit. The rep with Bonggy sends a fraction of that. Every
          message tied to a real reason that account is worth a conversation
          right now. Same person. Same list. The only difference is the
          thinking behind each send.
        </motion.p>
      </div>

      {/* Full metric comparison grid */}
      <motion.div
        initial={{ y: 16 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={SPRING}
        className="mt-14 overflow-hidden rounded-bento border border-border/80 bg-card/40 shadow-diffusion-sm backdrop-blur"
      >
        {/* Header row */}
        <div className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b border-border/60 bg-background/30 px-6 py-4 sm:px-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
            Metric
          </div>
          <SideBadge side={WITHOUT} />
          <SideBadge side={WITH} highlight />
        </div>

        {/* Metric rows with weight bars */}
        <div className="divide-y divide-border/60">
          {WITHOUT.metrics.map((m, i) => (
            <MetricRow
              key={m.label}
              metric={m}
              compare={WITH.metrics[i]}
              index={i}
            />
          ))}
        </div>

        {/* Opening lines */}
        <div className="grid grid-cols-1 border-t border-border/60 lg:grid-cols-2">
          <AnglesColumn side={WITHOUT} />
          <AnglesColumn side={WITH} highlight />
        </div>
      </motion.div>

      {/* Delta summary strip */}
      <motion.div
        initial={{ y: 12 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={SPRING}
        className="mt-6 grid grid-cols-2 gap-3 rounded-bento border border-signal/30 bg-signal/[0.04] p-5 sm:grid-cols-4 sm:p-6"
      >
        {DELTA_SUMMARY.map((d, i) => (
          <motion.div
            key={d.metric}
            initial={{ y: 8 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ ...SPRING, delay: i * 0.06 }}
            className="flex flex-col gap-1"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
              {d.metric}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-[22px] font-medium tabular-nums tracking-tight text-signal">
                {d.delta}
              </span>
              {d.direction === "up" ? (
                <ArrowUp weight="bold" className="size-3.5 text-signal" />
              ) : (
                <ArrowDown weight="bold" className="size-3.5 text-signal" />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ y: 12 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={SPRING}
        className="mt-10 max-w-3xl text-pretty text-[16px] leading-relaxed text-muted-foreground"
      >
        Fewer sends, sharper angles, a domain that stays healthy, and a rep who
        spends the day in conversations instead of tabs.
      </motion.p>
    </Section>
  );
}

function SideBadge({ side, highlight }: { side: Side; highlight?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <div className={cn("font-mono text-[10px] uppercase tracking-[0.22em]", highlight ? "text-signal" : "text-muted-foreground/80")}>
        {side.label}
      </div>
      <span
        className={cn(
          "w-fit rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium tracking-wide",
          side.badgeTone === "signal"
            ? "border-signal/40 bg-signal/10 text-signal"
            : "border-border bg-background/60 text-muted-foreground",
        )}
      >
        {side.badge}
      </span>
    </div>
  );
}

function MetricRow({
  metric,
  compare,
  index,
}: {
  metric: Metric;
  compare: Metric;
  index: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-[1.4fr_1fr_1fr] items-center px-6 py-4 sm:px-8 sm:py-5"
    >
      <div className="flex items-center gap-2.5 text-[13.5px] text-muted-foreground">
        <metric.Icon weight="regular" className="size-4 text-muted-foreground/70" />
        <span>{metric.label}</span>
      </div>

      <MetricCell metric={metric} delay={index * 0.05} animate={inView} />
      <MetricCell metric={compare} delay={index * 0.05 + 0.1} animate={inView} highlight />
    </div>
  );
}

function MetricCell({
  metric,
  delay,
  animate,
  highlight,
}: {
  metric: Metric;
  delay: number;
  animate: boolean;
  highlight?: boolean;
}) {
  // % of scale this metric fills
  const pct = Math.min(100, (metric.value / metric.scale) * 100);

  // Color logic: for "betterHigh" metrics, signal color when high; for sends (betterHigh:false), signal when low
  const isGood = metric.betterHigh
    ? pct > 40
    : pct < 30;
  const barColor = highlight && isGood
    ? "bg-signal"
    : !highlight && !isGood
      ? "bg-muted-foreground/40"
      : highlight && !isGood
        ? "bg-muted-foreground/40"
        : "bg-muted-foreground/30";

  return (
    <div className="flex flex-col gap-1.5 pr-3">
      <div
        className={cn(
          "flex items-baseline gap-1.5 font-mono text-[16px] font-medium tabular-nums tracking-tight",
          highlight && isGood ? "text-signal" : "text-foreground",
        )}
      >
        <AnimatedNumber
          target={metric.value}
          suffix={metric.suffix}
          display={metric.display}
          animate={animate}
          delay={delay}
        />
        {metric.trend === "up" && <ArrowUp weight="bold" className="size-3 opacity-70" />}
        {metric.trend === "down" && <ArrowDown weight="bold" className="size-3 opacity-70" />}
      </div>

      {/* Weight bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-border/60">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: animate ? `${pct}%` : 0 }}
          transition={{ ...SPRING, delay: delay + 0.2 }}
          className={cn("h-full rounded-full", barColor)}
        />
      </div>
    </div>
  );
}

function AnimatedNumber({
  target,
  suffix,
  display,
  animate,
  delay,
}: {
  target: number;
  suffix?: string;
  display?: string;
  animate: boolean;
  delay: number;
}) {
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    if (!animate) return;
    let raf: number;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const elapsed = now - start - delay * 1000;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, elapsed / duration);
      // ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, target, delay]);

  if (display) {
    return <span>{display}</span>;
  }

  const formatted =
    target % 1 === 0
      ? Math.round(val).toLocaleString()
      : val.toFixed(1);

  return <span>{formatted}{suffix || ""}</span>;
}

function AnglesColumn({ side, highlight }: { side: Side; highlight?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 p-7 sm:p-8",
        highlight && "bg-signal/[0.025] lg:border-l border-border/60",
        !highlight && "lg:border-r border-border/60",
      )}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
        Opening lines
      </div>
      <ul className="flex flex-col gap-2.5">
        {side.angles.map((a, i) => (
          <motion.li
            key={i}
            initial={{ y: 8 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ ...SPRING, delay: 0.1 + i * 0.05 }}
            className={cn(
              "flex items-start gap-2.5 text-[13.5px] leading-snug",
              a.tone === "signal" ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "mt-2 size-1 flex-none rounded-full",
                a.tone === "signal" ? "bg-signal" : "bg-muted-foreground/40",
              )}
            />
            <span>{a.text}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
