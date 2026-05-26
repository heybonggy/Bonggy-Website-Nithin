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
    event: "Past champion hired",
    detail: "At a competitor's customer · re-engage window",
    Icon: UsersThree,
  },
  {
    id: "s2",
    location: [40.71, -74.01],
    popupX: 0,
    popupY: 42,
    event: "Quiet 8% RIF",
    detail: "Off press · vendor review incoming",
    Icon: TrendUp,
  },
  {
    id: "s3",
    location: [-33.87, 151.21],
    popupX: 0,
    popupY: 80,
    event: "Procurement RFP leaked",
    detail: "Outbound tooling · 16 days to close",
    Icon: Globe,
  },
  // RIGHT COLUMN
  {
    id: "s4",
    location: [51.51, -0.13],
    popupX: 58,
    popupY: 4,
    event: "GitHub: platform rebuild",
    detail: "12 new repos · data-stack shift",
    Icon: Stack,
  },
  {
    id: "s5",
    location: [52.52, 13.41],
    popupX: 58,
    popupY: 42,
    event: "Re-org broke the mandate",
    detail: "New CTO · existing stack under review",
    Icon: CurrencyDollar,
  },
  {
    id: "s6",
    location: [35.68, 139.65],
    popupX: 58,
    popupY: 80,
    event: "Signal cluster",
    detail: "VP hire + raise + 6 SDR reqs · 21 days",
    Icon: Pulse,
  },
];

const SOURCES = [
  "LinkedIn", "Crunchbase", "SEC filings", "DNS records",
  "Job boards", "Press releases", "GitHub", "TechCrunch",
  "Layoffs.fyi", "Bloomberg", "Trust portals", "Procurement feeds",
  "USA Spending", "Engineering blogs",
];

export function GlobeSection() {
  return (
    <Section
      id="coverage"
      eyebrow="Always on · Reading the world"
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
            We read the world.{" "}
            <span className="text-muted-foreground/85">
              So your reps don&apos;t have to.
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 12 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ ...SPRING, delay: 0.05 }}
            className="mt-7 max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground"
          >
            Funding rounds. New hires. Stack migrations. Champion moves.
            Earnings prints. RFPs. Bonggy watches the public surface area of
            every account on your list and surfaces the moments that actually
            open a buying window. Continuously. Globally.
          </motion.p>

          <motion.div
            initial={{ y: 12 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ ...SPRING, delay: 0.1 }}
            className="mt-10"
          >
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
              Sources we read · {SOURCES.length} feeds
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SOURCES.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border/60 bg-card/40 px-2.5 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur"
                >
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
              events this week
            </div>
            <div>
              <span className="text-foreground/70 tabular-nums">14</span> sources
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

      // Moderate rotation , visible on mobile, not jarring on desktop.
      const animate = () => {
        phi += 0.004;
        globe!.update({ phi, theta: 0.25 });
        raf = requestAnimationFrame(animate);
      };
      animate();
      canvas.style.opacity = "1";
    };

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(raf);
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
                className="rounded-lg border border-border/80 bg-card/95 px-3 py-2 text-left backdrop-blur"
                style={{
                  boxShadow:
                    "0 12px 28px -10px oklch(0 0 0 / 60%), inset 0 1px 0 oklch(1 0 0 / 6%)",
                }}
              >
                <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-signal">
                  Signal detected
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
