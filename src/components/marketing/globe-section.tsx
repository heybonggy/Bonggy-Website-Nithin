"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import createGlobe from "cobe";
import {
  CurrencyDollar,
  UsersThree,
  Stack,
  Globe,
  Pulse,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { SPRING_BOUNCE, SPRING } from "./_motion";

/**
 * "We read the world" , a globe with rotating signal popups. Each popup says
 * "Signal detected" (no specific company name) so the visual doesn't make
 * promises about which named accounts we're watching.
 */

type Signal = {
  id: string;
  location: [number, number];
  popupX: number;
  popupY: number;
  event: string;
  detail: string;
  Icon: React.ComponentType<{ className?: string; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }>;
};

// Popups live in 6 fixed slots, a strict 2-col × 3-row grid around the
// globe. No two slots can ever overlap. SIGNALS picked to be the kind of
// thing an SDR CAN'T surface from LinkedIn / Crunchbase alone, things that
// require correlation across feeds or stealth-source watching.
const SIGNALS: Signal[] = [
  // LEFT COLUMN
  {
 id: "s1",
 location: [37.77, -122.41],
 popupX: 0,
 popupY: 4,
 event: "Effort on-goal",
 detail: "SDR team · 94% pointed at Q4 ICP",
 Icon: UsersThree,
  },
  {
 id: "s2",
 location: [40.71, -74.01],
 popupX: 0,
 popupY: 42,
 event: "Drift detected",
 detail: "Rep · 62% on out-of-ICP accounts",
 Icon: TrendUp,
  },
  {
 id: "s3",
 location: [-33.87, 151.21],
 popupX: 0,
 popupY: 80,
 event: "Handoff gap closed",
 detail: "AE now has the full SDR discovery",
 Icon: Globe,
  },
  // RIGHT COLUMN
  {
 id: "s4",
 location: [51.51, -0.13],
 popupX: 58,
 popupY: 4,
 event: "Renewal effort tied",
 detail: "CS hours mapped to the revenue goal",
 Icon: Stack,
  },
  {
 id: "s5",
 location: [52.52, 13.41],
 popupX: 58,
 popupY: 42,
 event: "Goal coverage up",
 detail: "Mid-market segment · 81% this week",
 Icon: CurrencyDollar,
  },
  {
 id: "s6",
 location: [35.68, 139.65],
 popupX: 58,
 popupY: 80,
 event: "Realignment nudge sent",
 detail: "5 in-ICP accounts surfaced to the rep",
 Icon: Pulse,
  },
];

const SOURCES = [
  "CRM activity", "Sequencer sends", "Email", "Calendar",
  "Slack threads", "Call recordings", "Meeting notes", "Pipeline edits",
  "Intent feeds", "Support tickets", "Renewal data", "Deal stages",
  "Account notes", "Task logs",
];

export function GlobeSection() {
  return (
 <Section
 id="coverage"
 eyebrow="The gap nobody closes"
 tint
 className="py-28 sm:py-32 lg:py-40"
 >
 <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
 <div>
 <motion.h2
 initial={{ y: 14 }}
 whileInView={{ y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={SPRING}
 className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]"
 >
 Revenue at the top.{" "}
 <span className="text-muted-foreground/85">
 Ten thousand actions at the bottom. Nothing in between.
 </span>
 </motion.h2>

 <motion.p
 initial={{ y: 12 }}
 whileInView={{ y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={{ ...SPRING, delay: 0.05 }}
 className="mt-7 max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground"
 >
 Your CRM shows pipeline. Your sequencer shows sends. None of them
 tell you whether the effort actually points at what you are trying
 to win this quarter. That blank space is where strategy dies.
 Bonggy fills it.
 </motion.p>

 <motion.div
 initial={{ y: 12 }}
 whileInView={{ y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={{ ...SPRING, delay: 0.1 }}
 className="mt-10"
 >
 <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
 Effort we read · across every tool
 </div>
 <div className="flex flex-wrap gap-1.5">
 {SOURCES.map((s) => (
 <span
 key={s}
 className="inline-flex items-center gap-1.5 rounded-[3px] border border-border/70 bg-card/30 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground/90 transition-colors hover:border-signal/40 hover:text-foreground"
 >
 <span className="size-1 shrink-0 bg-signal/70" />
 {s}
 </span>
 ))}
 </div>
 </motion.div>

 <motion.div
 initial={{ y: 12 }}
 whileInView={{ y: 0 }}
 viewport={{ once: true, amount: 0.15 }}
 transition={{ ...SPRING, delay: 0.15 }}
 className="mt-10 flex items-center gap-6 font-mono text-[11px] text-muted-foreground"
 >
 <div className="flex items-center gap-1.5">
 <span className="size-1.5 rounded-full bg-signal pulse-signal" />
 <span>Streaming</span>
 </div>
 <div>
 <span className="text-foreground/70 tabular-nums">1,247</span>{" "}
 actions this week
 </div>
 <div>
 <span className="text-foreground/70 tabular-nums">14</span> tools
 </div>
 </motion.div>
 </div>

 {/* Forced dark scope: cobe globe is tuned for a dark canvas
 (dark:1, mapBrightness:7) and popup cards read better against it
 on dark surfaces, regardless of the site theme. */}
 <div className="dark relative mx-auto w-full max-w-[560px] text-foreground">
 <GlobeCanvas />
 <SignalPopups />
 </div>
 </div>
 </Section>
  );
}

function GlobeCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
 if (!canvasRef.current) return;
 const canvas = canvasRef.current;
 let phi = 0;
 let globe: ReturnType<typeof createGlobe> | null = null;
 let raf = 0;
 let visible = false;

 const init = () => {
 const width = canvas.offsetWidth;
 if (width === 0) return;

 globe = createGlobe(canvas, {
 devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
 width,
 height: width,
 phi: 0,
 theta: 0.25,
 dark: 1,
 diffuse: 1.4,
 // Continent dots only , no markers (the floating green pip the user flagged)
 mapSamples: 14000,
 mapBrightness: 7,
 baseColor: [0.32, 0.32, 0.34],
 markerColor: [0.55, 0.92, 0.74],
 glowColor: [0.06, 0.06, 0.07],
 markerElevation: 0,
 markers: [],
 opacity: 0.95,
 });

 canvas.style.opacity = "1";
 };

 // Drives the rAF loop only while the canvas is on-screen. When the user
 // scrolls past, we cancelAnimationFrame so cobe stops eating GPU.
 const animate = () => {
 if (!globe || !visible) return;
 phi += 0.004;
 globe.update({ phi, theta: 0.25 });
 raf = requestAnimationFrame(animate);
 };

 const start = () => {
 if (raf || !globe) return;
 raf = requestAnimationFrame(animate);
 };
 const stop = () => {
 if (raf) {
 cancelAnimationFrame(raf);
 raf = 0;
 }
 };

 // Visibility-gated rAF
 const io = new IntersectionObserver(
 (entries) => {
 visible = entries[0]?.isIntersecting ?? false;
 if (visible) start();
 else stop();
 },
 { threshold: 0.01 },
 );
 io.observe(canvas);

 if (canvas.offsetWidth > 0) {
 init();
 visible = true;
 start();
 } else {
 const ro = new ResizeObserver((entries) => {
 if (entries[0]?.contentRect.width > 0) {
 ro.disconnect();
 init();
 start();
 }
 });
 ro.observe(canvas);
 }

 return () => {
 stop();
 io.disconnect();
 globe?.destroy();
 };
  }, []);

  return (
 <div className="relative aspect-square w-full">
 <canvas
 ref={canvasRef}
 className="size-full"
 style={{
 width: "100%",
 height: "100%",
 }}
 />
 </div>
  );
}

function SignalPopups() {
  // cycle key changes per rotation , AnimatePresence then fades the entire
  // group in/out together (synced), not item-by-item.
  const [cycle, setCycle] = React.useState(0);
  const [active, setActive] = React.useState<string[]>(() => [
 SIGNALS[0].id,
 SIGNALS[2].id,
 SIGNALS[5].id,
  ]);

  React.useEffect(() => {
 const id = setInterval(() => {
 const all = SIGNALS.map((s) => s.id);
 const shuffled = [...all].sort(() => Math.random() - 0.5);
 setActive(shuffled.slice(0, 3));
 setCycle((c) => c + 1);
 }, 3400);
 return () => clearInterval(id);
  }, []);

  const visible = SIGNALS.filter((s) => active.includes(s.id));

  return (
 <div className="pointer-events-none absolute inset-0">
 <AnimatePresence mode="wait">
 <motion.div
 key={cycle}
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
 className="absolute inset-0"
 >
 {visible.map((s, i) => (
 <motion.div
 key={s.id}
 initial={{ y: 6, scale: 0.95 }}
 animate={{ y: 0, scale: 1 }}
 transition={{ ...SPRING_BOUNCE, delay: i * 0.08 }}
 className="absolute w-[150px] sm:w-[170px] lg:w-[180px]"
 style={{
 left: `${s.popupX}%`,
 top: `${s.popupY}%`,
 }}
 >
 <div
 className="rounded-lg border border-border/80 bg-card/95 px-3 py-2 text-left "
 style={{
 boxShadow:
 "0 12px 28px -10px oklch(0 0 0 / 60%), inset 0 1px 0 oklch(1 0 0 / 6%)",
 }}
 >
 <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-signal">
 Effort tracked
 </div>
 <div className="mt-0.5 text-[11px] font-medium tracking-tight text-foreground">
 {s.event}
 </div>
 <div className="mt-0.5 text-[10px] text-muted-foreground/85">
 {s.detail}
 </div>
 </div>
 </motion.div>
 ))}
 </motion.div>
 </AnimatePresence>
 </div>
  );
}
