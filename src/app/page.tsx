"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight, ShieldCheck, Moon, Sun, Radio, Users, Target, FileText, Zap, TrendingUp,
  MessageSquare, Download, Search, Bell, Globe, Eye, Lightbulb, Quote, Building2, Menu,
  Check, DollarSign, Send, UserCheck, BookOpen,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EarlyAccessModal } from "@/components/EarlyAccessModal";
import { BonggyMark } from "@/components/BonggyMark";
import { TurbulentFlow } from "@/components/ui/turbulent-flow";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { HeroBackgroundPaths } from "@/components/ui/hero-background-paths";


gsap.registerPlugin(ScrollTrigger);

const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ─── GSAP Reveal Hook ───
function useGsapReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (prefersReduced || !ref.current) return;
    const el = ref.current;
    gsap.set(el, { opacity: 0, y: 16 });
    const tween = gsap.to(el, {
      opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none" },
    });
    return () => { tween.kill(); };
  }, []);
  return ref;
}

// ─── UI Helpers ───
function Logo() {
  return (
    <span className="flex items-center justify-center">
      <BonggyMark size={40} />
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[14px] font-normal uppercase tracking-[0.06em] text-bonggy-text-tertiary mb-3">{children}</p>
  );
}

// ─── FLOATING CONTROLS (Logo left, Nav + Toggle right) ───
function FloatingControls() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);

  return (
    <div className="fixed top-5 left-5 right-5 z-50 flex items-center justify-between bg-bonggy-surface/80 backdrop-blur-md border border-bonggy-border rounded-full px-4 py-2 shadow-sm">
      <a href="#" className="flex items-center justify-center shrink-0">
        <Logo />
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-1">
        <a href="#cta" className="text-[13px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-bonggy-bg">About Us</a>
        <a href="#how-it-works" className="text-[13px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-bonggy-bg">How it works</a>

        {/* Who it's for — hover-open dropdown */}
        <div className="relative group">
          <a
            href="#who-its-for"
            className="inline-flex items-center gap-1 text-[13px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-bonggy-bg"
          >
            Who it&apos;s for
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="opacity-60">
              <path d="M1 3l3.5 3L8 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-200 z-50">
            <div className="rounded-xl border border-bonggy-border bg-bonggy-surface shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5)] p-2">
              <Link
                href="/use-cases"
                className="flex items-center justify-between gap-6 px-4 py-2.5 rounded-md text-[13px] font-medium text-bonggy-accent hover:bg-bonggy-bg transition-colors whitespace-nowrap"
              >
                See all use cases
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
        <button
          onClick={() => setEarlyAccessOpen(true)}
          className="text-[13px] font-medium text-bonggy-accent bg-bonggy-accent/10 border border-bonggy-accent/30 hover:bg-bonggy-accent/20 hover:border-bonggy-accent/50 transition-colors px-3 py-1.5 rounded-md"
        >
          Early Access
        </button>
        <div className="w-px h-4 bg-bonggy-border mx-1" />
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-full text-bonggy-text-secondary hover:text-bonggy-text-primary hover:bg-bonggy-bg transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden p-2 rounded-full text-bonggy-text-secondary hover:text-bonggy-text-primary hover:bg-bonggy-bg transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-[280px] bg-bonggy-surface border-bonggy-border p-0">
          <div className="flex flex-col gap-1 mt-6 px-4">
            <p className="px-3 mb-2 text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wider">Menu</p>
            <a href="#cta" onClick={() => setMobileOpen(false)} className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-2.5 rounded-lg hover:bg-bonggy-bg">About Us</a>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-2.5 rounded-lg hover:bg-bonggy-bg">How it works</a>
            <a href="#who-its-for" onClick={() => setMobileOpen(false)} className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-2.5 rounded-lg hover:bg-bonggy-bg">Who it&apos;s for</a>
            <Link href="/use-cases" onClick={() => setMobileOpen(false)} className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-2.5 rounded-lg hover:bg-bonggy-bg">Use cases</Link>
            <button
              onClick={() => { setMobileOpen(false); setEarlyAccessOpen(true); }}
              className="text-left text-[14px] font-medium text-bonggy-accent bg-bonggy-accent/10 border border-bonggy-accent/30 hover:bg-bonggy-accent/20 hover:border-bonggy-accent/50 transition-colors px-3 py-2.5 rounded-lg"
            >
              Early Access
            </button>
            <div className="h-px bg-bonggy-border my-2" />
            <button
              onClick={() => { toggleTheme(); }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-bonggy-bg transition-colors text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>

      <EarlyAccessModal open={earlyAccessOpen} onOpenChange={setEarlyAccessOpen} />
    </div>
  );
}

// ─── ORBITING ICONS ───
function OrbitingIcons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth;
      setScale(Math.min(1, width / 340));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const s = scale;
  const orbits = [
    { icon: Globe, r: 170 * s, delay: 0, duration: 24, tilt: 0, size: 18 * s, label: "Coverage" },
    { icon: Search, r: 170 * s, delay: -12, duration: 24, tilt: 0, size: 18 * s, label: "Discover" },
    { icon: Eye, r: 170 * s, delay: -6, duration: 24, tilt: 0, size: 18 * s, label: "Watch" },
    { icon: Bell, r: 170 * s, delay: -18, duration: 24, tilt: 0, size: 18 * s, label: "Alerts" },
    { icon: Radio, r: 135 * s, delay: -2, duration: 18, tilt: 45, size: 20 * s, label: "Signal" },
    { icon: Target, r: 135 * s, delay: -11, duration: 18, tilt: 45, size: 20 * s, label: "Account" },
    { icon: Users, r: 135 * s, delay: -7, duration: 18, tilt: 45, size: 20 * s, label: "Committee" },
    { icon: MessageSquare, r: 135 * s, delay: -15, duration: 18, tilt: 45, size: 20 * s, label: "Outreach" },
    { icon: FileText, r: 95 * s, delay: -1, duration: 13, tilt: -35, size: 18 * s, label: "Brief" },
    { icon: Zap, r: 95 * s, delay: -6.5, duration: 13, tilt: -35, size: 18 * s, label: "Action" },
    { icon: TrendingUp, r: 95 * s, delay: -4, duration: 13, tilt: -35, size: 18 * s, label: "Intent" },
    { icon: Download, r: 95 * s, delay: -9.5, duration: 13, tilt: -35, size: 18 * s, label: "Export" },
    { icon: ShieldCheck, r: 58 * s, delay: 0, duration: 9, tilt: 70, size: 18 * s, label: "Trust" },
    { icon: TrendingUp, r: 58 * s, delay: -4.5, duration: 9, tilt: 70, size: 18 * s, label: "Score" },
  ];

  const traces = [170 * s, 135 * s, 95 * s, 58 * s];
  const hoveredRadius = hoveredIdx !== null ? orbits[hoveredIdx].r : null;

  return (
    <div ref={containerRef} className="relative w-full max-w-[420px] mx-auto aspect-square overflow-hidden">
      {traces.map((r) => {
        const isActiveTrace = hoveredRadius === r;
        return (
          <div
            key={r}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300"
            style={{
              width: r * 2,
              height: r * 2,
              borderColor: isActiveTrace ? "rgba(95,191,143,0.65)" : "var(--bonggy-border)",
              opacity: isActiveTrace ? 1 : 0.2,
              boxShadow: isActiveTrace
                ? "0 0 28px rgba(95,191,143,0.45), inset 0 0 28px rgba(95,191,143,0.22)"
                : "none",
            }}
          />
        );
      })}
      {/* Center — BonggyMark logo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <BonggyMark size={Math.round(64 * s)} />
      </div>
      {orbits.map((o, i) => {
        const Icon = o.icon;
        const isHovered = hoveredIdx === i;
        const dimmed = hoveredIdx !== null && !isHovered;
        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2"
            style={{
              width: o.r * 2, height: o.r * 2,
              marginLeft: -o.r, marginTop: -o.r,
              animation: `orbit-spin ${o.duration}s linear infinite`,
              animationDelay: `${o.delay}s`,
              animationPlayState: isHovered ? "paused" : "running",
              transform: `rotate(${o.tilt}deg)`,
              zIndex: isHovered ? 10 : 1,
            }}
          >
            <div
              className="absolute"
              style={{
                top: 0, left: "50%",
                marginLeft: -(o.size + 14) / 2,
                marginTop: -(o.size + 14) / 2,
                animation: `orbit-counter ${o.duration}s linear infinite`,
                animationDelay: `${o.delay}s`,
                animationPlayState: isHovered ? "paused" : "running",
              }}
            >
              {/* Fixed-size hit-target — handles hover. The scaling visual sits inside as pointer-events:none, so hover never oscillates. */}
              <div
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative cursor-pointer"
                style={{
                  width: o.size + 14,
                  height: o.size + 14,
                  transform: `rotate(-${o.tilt}deg)`,
                }}
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center rounded-full bg-bonggy-surface shadow-sm pointer-events-none transition-[border-color,box-shadow,opacity,transform] duration-200 ease-out ${
                    isHovered ? "border border-bonggy-accent shadow-md" : "border border-bonggy-border"
                  } ${dimmed ? "opacity-40" : "opacity-100"}`}
                  style={{
                    transform: `scale(${isHovered ? 1.2 : 1})`,
                    boxShadow: isHovered
                      ? "0 0 18px -2px rgba(95,191,143,0.55), 0 4px 12px -4px rgba(0,0,0,0.4)"
                      : undefined,
                  }}
                >
                  <Icon
                    size={Math.round(o.size)}
                    className={`transition-colors duration-200 ${isHovered ? "text-bonggy-accent" : "text-bonggy-text-primary"}`}
                    strokeWidth={1.5}
                  />
                </div>
                {isHovered && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-bonggy-text-primary text-bonggy-surface text-[10px] font-medium tracking-wide whitespace-nowrap pointer-events-none font-mono-data shadow-sm"
                    style={{ top: "calc(100% + 6px)" }}
                  >
                    {o.label}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── SIGNAL TICKER (hero atmosphere) ───
const TICKER_COPIES = 6; // enough copies so the loop never empties on tall viewports
const SIGNALS = [
  "Acme Corp · VP Sales hired · 2m",
  "Stripe · Series D · 8m",
  "Notion · CTO change · 14m",
  "Figma · headcount +30% · 21m",
  "Linear · funding round · 32m",
  "Ramp · pricing change · 41m",
  "Vercel · enterprise tier · 1h",
  "Plaid · CFO hired · 1h",
  "Datadog · APAC expansion · 2h",
  "Snowflake · partner program · 2h",
  "Anthropic · Series E · 3h",
  "Mistral · open source · 4h",
  "Cursor · ARR milestone · 5h",
  "Replit · GTM lead · 6h",
  "Vanta · SOC2 update · 8h",
  "Brex · merchant launch · 10h",
  "Mercury · Series B · 12h",
  "Pylon · seed round · 14h",
  "Loom · acquired · 18h",
  "Retool · funding · 20h",
];

function SignalColumn({ duration, direction = "up", offset = 0, className = "" }: { duration: number; direction?: "up" | "down"; offset?: number; className?: string }) {
  const data = [...SIGNALS.slice(offset), ...SIGNALS.slice(0, offset)];
  return (
    <div className={`flex-1 min-w-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="flex flex-col"
        style={{
          animation: prefersReduced ? "none" : `ticker-up ${duration}s linear infinite`,
          animationDirection: direction === "down" ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        {Array.from({ length: TICKER_COPIES }, () => data).flat().map((s, i) => (
          <div
            key={i}
            className="py-1.5 px-2 text-[9px] sm:text-[10px] xl:text-[11px] text-bonggy-text-tertiary font-mono-data whitespace-nowrap text-center opacity-25 md:opacity-30"
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

function SignalField() {
  // hide=true means visible only sm+ (drops 3 columns on mobile so each remaining column has room to read)
  const columns = [
    { duration: 48, direction: "up" as const,   offset: 0,  hide: false },
    { duration: 56, direction: "down" as const, offset: 4,  hide: false },
    { duration: 42, direction: "up" as const,   offset: 9,  hide: true  },
    { duration: 62, direction: "down" as const, offset: 13, hide: false },
    { duration: 52, direction: "up" as const,   offset: 6,  hide: true  },
    { duration: 58, direction: "down" as const, offset: 11, hide: false },
    { duration: 46, direction: "up" as const,   offset: 2,  hide: true  },
  ];
  return (
    <div
      className="hero-ticker pointer-events-none absolute inset-0 z-0 flex"
      aria-hidden="true"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
      }}
    >
      {columns.map((c, i) => (
        <SignalColumn
          key={i}
          duration={c.duration}
          direction={c.direction}
          offset={c.offset}
          className={c.hide ? "hidden sm:block" : ""}
        />
      ))}
    </div>
  );
}

// ─── HERO ───
function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const words1 = section.querySelectorAll<HTMLElement>(".hero-word-1");
    const words2 = section.querySelectorAll<HTMLElement>(".hero-word-2");
    const words3 = section.querySelectorAll<HTMLElement>(".hero-word-3");
    const sub1 = section.querySelector<HTMLElement>(".hero-sub-1");
    const cta = section.querySelector<HTMLElement>(".hero-cta");

    // For users with prefers-reduced-motion (or if GSAP never runs), make sure
    // everything is visible regardless. The animation reveal is a nice-to-have,
    // not load-bearing.
    if (prefersReduced) {
      gsap.set([...Array.from(words1), ...Array.from(words2), ...Array.from(words3)], { y: 0, opacity: 1 });
      if (sub1) gsap.set(sub1, { y: 0, opacity: 1 });
      if (cta) gsap.set(cta, { y: 0, opacity: 1 });
      return;
    }

    // Use fromTo with explicit end states so every remount lands at opacity:1
    // regardless of where a previous (interrupted) animation left things.
    // Snappy timing — total runtime ~0.9s (was ~3.5s).
    const tl = gsap.timeline();
    tl.fromTo(words1, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: "back.out(1.4)", stagger: 0.02 }, 0);
    tl.fromTo(words2, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: "back.out(1.4)", stagger: 0.02 }, "-=0.12");
    tl.fromTo(words3, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: "back.out(1.4)", stagger: 0.02 }, "-=0.12");
    if (sub1) tl.fromTo(sub1, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" }, "-=0.1");
    if (cta) tl.fromTo(cta, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.22, ease: "power2.out" }, "-=0.12");

    return () => {
      // On unmount: jump to end state THEN kill, so if the user comes back the
      // elements are at opacity:1 / y:0 and the next animation has a clean baseline.
      tl.progress(1);
      tl.kill();
    };
  }, []);

  const headlineLine1 = "The strategy layer".split(" ");
  const headlineLine2 = "between signal".split(" ");
  const headlineLine3 = "and send.".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative pt-24 md:pt-32 pb-16 md:pb-24 lg:min-h-screen px-5 md:px-10 overflow-hidden flex items-center"
    >
      {isDark && !isMobile ? (
        <>
          <div className="absolute inset-0 z-0">
            <TurbulentFlow />
          </div>
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.55) 100%)",
            }}
          />
        </>
      ) : isDark ? (
        // Mobile dark fallback — CSS radial gradient, zero GPU cost
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 75% at 50% 45%, rgba(95,191,143,0.16) 0%, rgba(95,191,143,0.06) 35%, transparent 70%), radial-gradient(circle at 30% 80%, rgba(110,231,183,0.10) 0%, transparent 55%)",
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(95,191,143,0.18) 0%, rgba(110,231,183,0.06) 35%, transparent 70%)",
          }}
        />
      )}

      <div className="relative z-10 max-w-[1120px] mx-auto w-full">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-serif-display text-[40px] sm:text-[48px] md:text-[80px] lg:text-[96px] font-normal leading-[0.95] tracking-[-0.02em] text-bonggy-text-primary mb-8 md:mb-10 break-words max-w-full">
            <span className="block">
              {headlineLine1.map((w, i, arr) => {
                const isStrategy = w === "strategy";
                return (
                  <span key={`l1-${i}`}>
                    <span className={`hero-word-1 inline-block ${isStrategy ? "italic" : ""}`}>{w}</span>
                    {i < arr.length - 1 ? " " : ""}
                  </span>
                );
              })}
            </span>
            <span className="block">
              {headlineLine2.map((w, i, arr) => (
                <span key={`l2-${i}`}>
                  <span className="hero-word-2 inline-block">{w}</span>
                  {i < arr.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
            <span className="block">
              {headlineLine3.map((w, i, arr) => (
                <span key={`l3-${i}`}>
                  <span className="hero-word-3 inline-block">{w}</span>
                  {i < arr.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          </h1>
          <div className="mb-10 max-w-[520px] mx-auto">
            <p className="hero-sub-1 text-lg md:text-xl text-bonggy-text-secondary leading-[1.6]">
              Bonggy detects buying intent, builds account narratives, and drafts the outreach. Your reps stop researching and start closing.
            </p>
          </div>
          <div className="hero-cta w-full flex items-center justify-center">
            <a href="https://cal.com/bonggy/30min?overlayCalendar=true" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto text-base font-normal bg-bonggy-accent text-bonggy-bg px-8 py-4 rounded-md hover:bg-bonggy-accent-hover transition-colors flex items-center justify-center gap-2">
              Strategy Session <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── STATS ───
function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = [
    { num: 92, suffix: "%", label: "have more signal than last year", decimals: 0 },
    { num: 13, suffix: "+ hrs", label: "saved per rep per week", decimals: 0 },
    { num: 2.4, suffix: "x", label: "higher reply rate", decimals: 1 },
    { num: 14, prefix: "<", suffix: " min", label: "signal to sequencer export", decimals: 0 },
  ];

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 2;
            stats.forEach((stat, i) => {
              const el = numbersRef.current[i];
              const bar = barsRef.current[i];
              const stagger = i * 0.12;

              if (el) {
                const obj = { value: 0 };
                gsap.to(obj, {
                  value: stat.num,
                  duration,
                  delay: stagger,
                  ease: "power2.out",
                  onUpdate: () => {
                    const val = stat.decimals > 0
                      ? obj.value.toFixed(stat.decimals)
                      : Math.round(obj.value).toString();
                    el.textContent = (stat.prefix || "") + val + stat.suffix;
                  },
                });
              }

              if (bar) {
                gsap.fromTo(
                  bar,
                  { scaleX: 0 },
                  { scaleX: 1, duration, delay: stagger, ease: "power2.out" }
                );
              }
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const renderInitial = (s: typeof stats[number]) => {
    if (!prefersReduced) return (s.prefix || "") + "0" + s.suffix;
    const val = s.decimals > 0 ? s.num.toFixed(s.decimals) : s.num.toString();
    return (s.prefix || "") + val + s.suffix;
  };

  return (
    <section ref={ref} className="py-[100px] md:py-[140px] px-5 md:px-10 bg-bonggy-bg">
      <div className="max-w-[1180px] mx-auto">
        <div className="mb-12 md:mb-14 max-w-[760px]">
          <SectionLabel>The proof</SectionLabel>
          <h2 className="font-serif-display text-[36px] md:text-[56px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">
            The numbers behind <span className="italic">a clearer pipeline.</span>
          </h2>
          <p className="mt-4 text-[15px] md:text-[17px] text-bonggy-text-secondary leading-[1.65] max-w-[560px]">
            What changes when every rep operates from the same signal-backed truth.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="group relative p-6 md:p-8 rounded-2xl border border-bonggy-border bg-bonggy-surface overflow-hidden transition-all duration-300 hover:border-bonggy-accent/40 hover:-translate-y-1"
            >
              <div aria-hidden="true" className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-bonggy-accent/10 blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span
                ref={(el) => { numbersRef.current[i] = el; }}
                className="relative block text-[40px] md:text-[56px] font-normal font-serif-display text-bonggy-text-primary tracking-[-0.02em] leading-none tabular-nums"
              >
                {renderInitial(s)}
              </span>
              <div
                ref={(el) => { barsRef.current[i] = el; }}
                aria-hidden="true"
                className="mt-4 h-px w-12 bg-bonggy-accent origin-left"
                style={{ transform: prefersReduced ? "scaleX(1)" : "scaleX(0)" }}
              />
              <p className="text-[13px] md:text-[14px] text-bonggy-text-secondary mt-3 leading-[1.45]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SIGNAL FLOW — scattered signals converge into intelligence, outputs fan out ───

const SIGNAL_SETS: string[][] = [
  ["Apollo · Series B", "VP Sales hired", "AWS migration", "Headcount +30%", "ARR · $5M"],
  ["Stripe · Series E", "CTO change @ Asana", "AI infra build", "Customers · 10k", "Pricing reset"],
  ["Notion · IPO filed", "CMO @ Brex", "API v3 launch", "GTM team 2x", "Enterprise tier"],
  ["Figma · M&A", "Head of Growth @ Vanta", "Postgres adoption", "Funding · $40M", "Churn spike"],
  ["Linear · $50M round", "Founding AE @ Cursor", "Snowflake replaced", "RIF · -12%", "Win rate · +18%"],
];

// Each pill's anchor as % of stage (stage-relative so SVG paths match)
const PARTICLE_SLOTS = [
  { x: 3, y: 10 },
  { x: 4, y: 26 },
  { x: 3, y: 42 },
  { x: 4, y: 58 },
  { x: 3, y: 74 },
];

// Pill RIGHT-edge anchor (where the path emerges) — used as SVG path start
const INPUT_PATH_STARTS = [
  { x: 21, y: 12 },
  { x: 22, y: 28 },
  { x: 21, y: 44 },
  { x: 22, y: 60 },
  { x: 21, y: 76 },
];

// Output card anchors as % of stage
const OUTPUT_SLOTS = [
  { x: 62, y: 10 },
  { x: 62, y: 32 },
  { x: 62, y: 54 },
  { x: 62, y: 76 },
];
// Where the path TOUCHES each output card (its left edge, vertically centered on the card)
const OUTPUT_PATH_ENDS = [
  { x: 62, y: 17 },
  { x: 62, y: 39 },
  { x: 62, y: 61 },
  { x: 62, y: 83 },
];

const CORE_POINT = { x: 50, y: 50 };

// Cubic-bezier path string from (x1,y1) to (x2,y2) — control points lean horizontal first
function buildPath(x1: number, y1: number, x2: number, y2: number, bias = 0.55) {
  const cx1 = x1 + (x2 - x1) * bias;
  const cx2 = x2 - (x2 - x1) * (1 - bias);
  return `M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`;
}

const INPUT_PATHS = INPUT_PATH_STARTS.map((p) => buildPath(p.x, p.y, CORE_POINT.x, CORE_POINT.y));
const OUTPUT_PATHS = OUTPUT_PATH_ENDS.map((p) => buildPath(CORE_POINT.x, CORE_POINT.y, p.x, p.y));

// Output card visual identity (icon + label fixed; title swaps per cycle below)
const OUTPUT_CARDS = [
  { icon: DollarSign, label: "Opportunity scored" },
  { icon: Send, label: "Email sent" },
  { icon: UserCheck, label: "Lead confirmed" },
  { icon: BookOpen, label: "Playbook armed" },
];

// 5 cycles of fresh result titles — outputs re-render their content each cycle
const OUTPUT_TITLE_SETS: string[][] = [
  ["Acme Corp · $42K · 92 intent",   "4-touch · Direct tone",      "Marcus Chen · VP Sales",        "Funded Series B · 5 contacts"],
  ["Stripe · $96K · 88 intent",      "3-touch · Question-led",     "Jamie Park · New CTO",          "Leadership pivot · 8 contacts"],
  ["Notion · $58K · 91 intent",      "5-touch · Value-first",      "Sara Liu · CMO @ Brex",         "Launch readiness · 6 contacts"],
  ["Figma · $120K · 94 intent",      "6-touch · Advisory",         "Devon Patel · Head of Growth",  "Post-M&A motion · 9 contacts"],
  ["Linear · $34K · 86 intent",      "4-touch · Competitive",      "Alex Kim · Founding AE",        "Win-rate boost · 4 contacts"],
];

// Scrambles `el.textContent` from random glitch chars into `newText`,
// revealing characters left-to-right. Cancels any active glitch on the same element.
const SIGNAL_GLITCH_CHARS = "-_./|*#$%@";
type GlitchableEl = HTMLElement & { __glitchId?: number };
function runGlitchSwap(el: HTMLElement | null, newText: string, durationMs = 420) {
  if (!el || typeof window === "undefined") return;
  const target = el as GlitchableEl;
  if (target.__glitchId !== undefined) window.clearInterval(target.__glitchId);
  const steps = Math.max(newText.length, 8);
  const stepMs = durationMs / steps;
  let step = 0;
  const id = window.setInterval(() => {
    if (step >= steps) {
      target.textContent = newText;
      window.clearInterval(id);
      target.__glitchId = undefined;
      return;
    }
    let display = "";
    for (let i = 0; i < newText.length; i++) {
      const c = newText[i];
      if (c === " " || c === "·") display += c;
      else if (i < step) display += c;
      else display += SIGNAL_GLITCH_CHARS[Math.floor(Math.random() * SIGNAL_GLITCH_CHARS.length)];
    }
    target.textContent = display;
    step++;
  }, stepMs);
  target.__glitchId = id;
}

function SignalFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Mobile users get a static vertical layout below — skip the GSAP-driven
    // stage entirely (the absolute-positioned curved-path layout doesn't fit
    // on narrow screens).
    if (prefersReduced || isMobile || !sectionRef.current || !stageRef.current) return;
    const section = sectionRef.current;
    const stage = stageRef.current;

    const ctx = gsap.context(() => {
      const particles = stage.querySelectorAll<HTMLElement>(".signal-particle");
      const particleTexts = stage.querySelectorAll<HTMLElement>(".signal-particle-text");
      const core = stage.querySelector<HTMLElement>(".signal-core");
      const coreSphere = stage.querySelector<HTMLElement>(".signal-core-sphere");
      const coreCheck = stage.querySelector<HTMLElement>(".signal-core-check");
      const coreGlow = stage.querySelector<HTMLElement>(".signal-core-glow");
      const outputs = stage.querySelectorAll<HTMLElement>(".signal-output");
      const outputTitles = stage.querySelectorAll<HTMLElement>(".signal-output-title");
      const inputPaths = stage.querySelectorAll<SVGPathElement>(".signal-path-in");
      const outputPaths = stage.querySelectorAll<SVGPathElement>(".signal-path-out");
      const logRows = stage.querySelectorAll<HTMLElement>(".signal-log-row");
      const logRowTexts = stage.querySelectorAll<HTMLElement>(".signal-log-row-text");
      if (!core || !coreSphere || !coreCheck) return;

      // Measure pass — make particles visible to layout but invisible, compute deltas
      gsap.set(particles, { x: 0, y: 0, scale: 1, opacity: 0 });
      const stageRect = stage.getBoundingClientRect();
      const coreRect = core.getBoundingClientRect();
      const cx = coreRect.left + coreRect.width / 2 - stageRect.left;
      const cy = coreRect.top + coreRect.height / 2 - stageRect.top;
      const deltas = Array.from(particles).map((p) => {
        const r = p.getBoundingClientRect();
        return {
          dx: cx - (r.left + r.width / 2 - stageRect.left),
          dy: cy - (r.top + r.height / 2 - stageRect.top),
        };
      });

      // Hidden start state
      gsap.set(particles, { scale: 0, opacity: 0 });
      gsap.set(outputs, { x: -24, opacity: 0 });
      gsap.set(inputPaths, { opacity: 0 });
      gsap.set(outputPaths, { opacity: 0 });
      gsap.set(core, { scale: 0.9, opacity: 0 });
      gsap.set(coreGlow, { opacity: 0 });
      gsap.set(coreCheck, { scale: 0, opacity: 0 });
      gsap.set(coreSphere, { scale: 1, opacity: 1 });
      gsap.set(logRows, { opacity: 0, x: -10 });

      // Recently-processed log: 4 slots, FIFO. Latest at top.
      const logBuffer: string[] = [];
      const pushLog = (text: string) => {
        logBuffer.unshift(text);
        if (logBuffer.length > logRows.length) logBuffer.length = logRows.length;
        logRowTexts.forEach((el, i) => {
          el.textContent = logBuffer[i] ?? "";
        });
      };

      const buildCycle = (setIndex: number, isFirst: boolean) => {
        const cycle = gsap.timeline();

        // Swap in this set's particle labels
        cycle.call(() => {
          const labels = SIGNAL_SETS[setIndex];
          particleTexts.forEach((el, i) => {
            if (labels[i] !== undefined) el.textContent = labels[i];
          });
        });

        // Reset particles to scattered starting state
        cycle.set(particles, { x: 0, y: 0, scale: 0, opacity: 0 });

        // Phase A — Pills arrive (staggered)
        cycle.to(particles, { scale: 1, opacity: 1, duration: 0.45, stagger: 0.06, ease: "back.out(1.5)" });

        // Reveal input paths (they already have continuous flow animation via CSS)
        if (isFirst) {
          cycle.to(inputPaths, { opacity: 1, duration: 0.5, stagger: 0.05 }, "-=0.4");
        }

        // Phase B — Hold so user can read
        cycle.to({}, { duration: 0.5 });

        // Phase C — Converge to core, and as each arrives, push to log
        particles.forEach((p, i) => {
          cycle.to(
            p,
            {
              x: deltas[i].dx,
              y: deltas[i].dy,
              scale: 0.25,
              opacity: 0,
              duration: 0.7,
              ease: "power2.in",
            },
            i === 0 ? ">" : `<+=${0.05}`,
          );
          // When this particle "lands" at core, log it
          cycle.call(() => {
            const label = SIGNAL_SETS[setIndex][i];
            if (label) pushLog(label);
            // animate log row 0 (newest) in
            gsap.fromTo(logRows[0], { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" });
            // older rows fade slightly
            for (let r = 1; r < logRows.length; r++) {
              gsap.to(logRows[r], { opacity: Math.max(0.35, 1 - r * 0.18), duration: 0.3 });
            }
          }, undefined, ">-0.2");
        });

        // Phase D — Core glow swells, sphere fades, checkmark stamps
        cycle.to(coreGlow, { opacity: 1, duration: 0.35 }, "-=0.3");
        cycle.to(coreSphere, { opacity: 0, scale: 0.85, duration: 0.3, ease: "power2.in" }, "-=0.1");
        cycle.to(coreCheck, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" }, "-=0.1");

        // Phase E — Reveal output paths + swap output titles + pulse cards
        if (isFirst) {
          cycle.to(outputPaths, { opacity: 1, duration: 0.5, stagger: 0.06 });
          cycle.to(outputs, { x: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: "back.out(1.4)" }, "-=0.4");
        }
        cycle.call(() => {
          const titles = OUTPUT_TITLE_SETS[setIndex];
          outputTitles.forEach((el, i) => {
            if (titles[i] !== undefined) runGlitchSwap(el, titles[i], 440);
          });
        });
        cycle.to(outputs, {
          scale: 1.05,
          duration: 0.22,
          stagger: 0.06,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        });

        // Phase F — Sphere returns, check fades, glow eases back to ambient
        cycle.to(coreCheck, { scale: 0.7, opacity: 0, duration: 0.35, ease: "power2.in" }, "+=0.15");
        cycle.to(coreSphere, { opacity: 1, scale: 1, duration: 0.4 }, "-=0.2");
        cycle.to(coreGlow, { opacity: 0.4, duration: 0.45 }, "<");

        return cycle;
      };

      // One-shot intro: core fades in, paths reveal, output cards land into place.
      // After the intro finishes, the looping cycle timeline takes over.
      const introTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
        defaults: { ease: "power2.out" },
      });
      introTl.to(core, { scale: 1, opacity: 1, duration: 0.55 });
      introTl.to(coreGlow, { opacity: 0.35, duration: 0.55 }, "<");

      // Looping master timeline — repeats forever, cycles through all 5 signal sets each loop
      const loopTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.6,
        defaults: { ease: "power2.out" },
      });
      for (let i = 0; i < SIGNAL_SETS.length; i++) {
        loopTl.add(buildCycle(i, i === 0));
        if (i < SIGNAL_SETS.length - 1) {
          loopTl.to({}, { duration: 0.4 });
        }
      }

      // Chain: intro → loop (loop starts at the very end of intro and then runs forever)
      introTl.add(loopTl);
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="relative py-[80px] px-5 bg-bonggy-bg overflow-hidden">
        <div className="max-w-[640px] mx-auto">
          <div className="mb-10 text-center">
            <SectionLabel>The flow</SectionLabel>
            <h2 className="font-serif-display text-[32px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">
              Scattered signal becomes <span className="italic">one strategic narrative.</span>
            </h2>
            <p className="mt-4 text-[14px] text-bonggy-text-secondary leading-[1.6]">
              Every funding round, hire, churn event, intent burst — pulled into one truth your team acts on.
            </p>
          </div>

          <div className="relative rounded-2xl border border-bonggy-border bg-bonggy-surface overflow-hidden p-5">
            {/* Top: 3 sample signal pills */}
            <div className="mb-6">
              <div className="font-mono-data text-[10px] text-bonggy-accent uppercase tracking-[0.22em] mb-3 flex items-center gap-2">
                <span>Stream</span>
                <span className="h-px flex-1 bg-bonggy-border" />
              </div>
              <div className="flex flex-wrap gap-2">
                {SIGNAL_SETS[0].slice(0, 5).map((label) => (
                  <div
                    key={label}
                    className="px-2.5 py-1 rounded-md bg-bonggy-bg border border-bonggy-border text-[11px] font-mono-data text-bonggy-text-secondary whitespace-nowrap"
                  >
                    <span className="inline-block w-1 h-1 rounded-full bg-bonggy-accent align-middle mr-1.5" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Middle: vertical flow connector + core */}
            <div className="relative flex flex-col items-center my-2">
              <div aria-hidden="true" className="h-8 w-px bg-gradient-to-b from-transparent via-bonggy-accent/40 to-bonggy-accent/40" />
              <div className="relative my-3">
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full bg-bonggy-accent/22 blur-3xl pointer-events-none"
                />
                <div className="relative w-24 h-24 rounded-full border border-bonggy-accent/40 flex items-center justify-center">
                  <BonggyMark size={62} />
                </div>
                <p className="absolute left-1/2 -translate-x-1/2 -bottom-7 text-[10px] uppercase tracking-[0.2em] text-bonggy-text-tertiary font-mono-data whitespace-nowrap">
                  Intelligence layer
                </p>
              </div>
              <div aria-hidden="true" className="h-12 w-px bg-gradient-to-b from-bonggy-accent/40 via-bonggy-accent/40 to-transparent" />
            </div>

            {/* Bottom: output cards stacked */}
            <div>
              <div className="font-mono-data text-[10px] text-bonggy-accent uppercase tracking-[0.22em] mb-3 flex items-center gap-2">
                <span className="h-px flex-1 bg-bonggy-border" />
                <span>Outputs</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {OUTPUT_CARDS.map((o, i) => {
                  const Icon = o.icon;
                  return (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-bonggy-border bg-bonggy-bg/85 flex items-start gap-3"
                    >
                      <div className="w-9 h-9 rounded-lg bg-bonggy-accent/15 border border-bonggy-accent/30 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-bonggy-accent" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-bonggy-accent" />
                          <span className="font-mono-data text-[10px] text-bonggy-accent uppercase tracking-[0.18em]">{o.label}</span>
                        </div>
                        <p className="text-[12px] text-bonggy-text-primary leading-[1.4]">
                          {OUTPUT_TITLE_SETS[0][i]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative py-[100px] md:py-[140px] px-5 md:px-10 bg-bonggy-bg overflow-hidden">
      <div className="max-w-[1180px] mx-auto">
        <div className="mb-12 md:mb-16 max-w-[820px] mx-auto text-center">
          <SectionLabel>The flow</SectionLabel>
          <h2 className="font-serif-display text-[36px] md:text-[56px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">
            Scattered signal becomes <span className="italic">one strategic narrative.</span>
          </h2>
          <p className="mt-5 text-[15px] md:text-[17px] text-bonggy-text-secondary leading-[1.65] max-w-[580px] mx-auto">
            Every funding round, hire, churn event, intent burst — pulled into one truth your team acts on.
          </p>
        </div>

        <div
          ref={stageRef}
          className="relative h-[520px] md:h-[620px] rounded-2xl border border-bonggy-border bg-bonggy-surface overflow-hidden"
        >
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full bg-bonggy-accent/8 blur-3xl pointer-events-none" />

          {/* Curved SVG paths — flowing dashes always run, drawing direction left → right */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="signal-flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(95,191,143,0.15)" />
                <stop offset="60%" stopColor="rgba(95,191,143,0.55)" />
                <stop offset="100%" stopColor="rgba(110,231,183,0.75)" />
              </linearGradient>
              {/* Marker so the path actually points somewhere */}
              <marker
                id="signal-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(95,191,143,0.8)" />
              </marker>
            </defs>
            {INPUT_PATHS.map((d, i) => (
              <g key={`in-${i}`}>
                {/* Faint base path */}
                <path
                  d={d}
                  fill="none"
                  stroke="rgba(95,191,143,0.18)"
                  strokeWidth="0.25"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Marching-dashes flow on top */}
                <path
                  className="signal-path-in signal-flow-path"
                  d={d}
                  fill="none"
                  stroke="url(#signal-flow-gradient)"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  markerEnd="url(#signal-arrow)"
                />
              </g>
            ))}
            {OUTPUT_PATHS.map((d, i) => (
              <g key={`out-${i}`}>
                <path
                  d={d}
                  fill="none"
                  stroke="rgba(95,191,143,0.18)"
                  strokeWidth="0.25"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  className="signal-path-out signal-flow-path"
                  d={d}
                  fill="none"
                  stroke="url(#signal-flow-gradient)"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  markerEnd="url(#signal-arrow)"
                />
              </g>
            ))}
          </svg>

          {/* STREAM header */}
          <div className="absolute top-4 left-4 md:left-6">
            <span className="font-mono-data text-[10px] text-bonggy-accent uppercase tracking-[0.22em]">
              Stream · live
            </span>
          </div>

          {/* OUTPUTS header */}
          <div className="absolute top-4 right-4 md:right-6">
            <span className="font-mono-data text-[10px] text-bonggy-accent uppercase tracking-[0.22em]">
              Outputs
            </span>
          </div>

          {/* Particle pills — stage-relative positions match SVG path coords */}
          {PARTICLE_SLOTS.map((p, i) => (
            <div
              key={i}
              className="signal-particle absolute will-change-transform z-10"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <div className="px-3 py-1.5 rounded-md bg-bonggy-bg border border-bonggy-border text-[11px] md:text-[12px] font-mono-data text-bonggy-text-secondary whitespace-nowrap shadow-sm">
                <span className="inline-block w-1 h-1 rounded-full bg-bonggy-accent align-middle mr-2" />
                <span className="signal-particle-text">{SIGNAL_SETS[0][i]}</span>
              </div>
            </div>
          ))}

          {/* Center core orb — fully transparent container, sphere sits clean on stage */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <div
                aria-hidden="true"
                className="signal-core-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-60 md:h-60 rounded-full bg-bonggy-accent/30 blur-3xl pointer-events-none"
              />
              <div className="signal-core relative w-28 h-28 md:w-36 md:h-36 rounded-full border border-bonggy-accent/40 flex items-center justify-center">
                <div className="signal-core-sphere flex items-center justify-center">
                  <BonggyMark size={84} className="relative" />
                </div>
                <div
                  className="signal-core-check absolute inset-0 flex items-center justify-center pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-bonggy-accent flex items-center justify-center shadow-[0_0_40px_-8px_rgba(95,191,143,0.7)]">
                    <Check size={36} className="text-bonggy-bg" strokeWidth={3} />
                  </div>
                </div>
              </div>
            </div>
            <p className="absolute left-1/2 -translate-x-1/2 -bottom-9 text-[10px] uppercase tracking-[0.2em] text-bonggy-text-tertiary font-mono-data whitespace-nowrap">
              Intelligence layer
            </p>
          </div>

          {/* Output cards — positioned at stage-relative %, icon + label fixed, title swaps per cycle */}
          {OUTPUT_CARDS.map((o, i) => {
            const Icon = o.icon;
            const slot = OUTPUT_SLOTS[i];
            return (
              <div
                key={i}
                className="signal-output absolute z-10 w-[36%] md:w-[34%] p-3 md:p-4 rounded-xl border border-bonggy-border bg-bonggy-bg/85 backdrop-blur-sm will-change-transform flex items-start gap-3 shadow-sm"
                style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-bonggy-accent/15 border border-bonggy-accent/30 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-bonggy-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-bonggy-accent animate-pulse" />
                    <span className="font-mono-data text-[10px] text-bonggy-accent uppercase tracking-[0.18em]">{o.label}</span>
                  </div>
                  <p className="signal-output-title text-[12px] md:text-[13px] text-bonggy-text-primary leading-[1.4]">
                    {OUTPUT_TITLE_SETS[0][i]}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Processed log — bottom-left, "what just happened" */}
          <div className="absolute bottom-4 left-4 md:left-6 right-1/2 md:right-auto md:w-[33%]">
            <div className="font-mono-data text-[9px] text-bonggy-text-tertiary uppercase tracking-[0.22em] mb-2 flex items-center gap-2">
              <span>Processed</span>
              <span className="h-px flex-1 bg-bonggy-border" />
            </div>
            <div className="space-y-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="signal-log-row flex items-center gap-2 text-[10px] md:text-[11px] font-mono-data text-bonggy-text-tertiary"
                >
                  <Check size={10} className="text-bonggy-accent shrink-0" strokeWidth={3} />
                  <span className="signal-log-row-text truncate" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── GLITCH WORD ───
const GLITCH_CHARS = "-_./|";

function GlitchWord({ from, to, className, active }: { from: string; to: string; className?: string; active?: boolean }) {
  const [display, setDisplay] = useState(prefersReduced ? to : from);
  const elRef = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  const runGlitch = useCallback(() => {
    if (hasRun.current || prefersReduced) return;
    hasRun.current = true;
    const toChars = to.split("");
    let step = 0;
    const interval = setInterval(() => {
      setDisplay(
        toChars
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < step) return toChars[index];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );
      step += 1;
      if (step >= toChars.length + 1) {
        clearInterval(interval);
        setDisplay(to);
      }
    }, 30);
  }, [to]);

  // Manual mode: parent controls trigger via `active` prop
  useEffect(() => {
    if (active === undefined) return;
    if (active) runGlitch();
  }, [active, runGlitch]);

  // Auto mode: trigger via IntersectionObserver when `active` is not provided
  useEffect(() => {
    if (active !== undefined) return;
    if (!elRef.current || prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) runGlitch();
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(elRef.current);
    return () => observer.disconnect();
  }, [active, runGlitch]);

  return (
    <span ref={elRef} className={`inline-block tabular-nums ${className || ""}`}>
      {display}
    </span>
  );
}
const REFRAME_TRIO = [
  { index: 1, title: "Signal", eyebrow: "The job change", body: "Your reps see the job change. They miss the buying window that comes with it." },
  { index: 2, title: "Cluster", eyebrow: "The funding round", body: "They see the funding round. They miss the infrastructure gap it creates." },
  { index: 3, title: "Act", eyebrow: "The hiring spike", body: "They see the hiring spike. They miss the 90-day prove-it clock that started ticking." },
];

function ReframeCard({ index, title, eyebrow, body }: { index: number; title: string; eyebrow: string; body: string }) {
  return (
    <div className="reframe-card relative p-7 md:p-9 rounded-2xl border border-bonggy-border bg-bonggy-surface overflow-hidden h-full flex flex-col">
      <div aria-hidden="true" className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-bonggy-accent/10 blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-bonggy-accent/5 blur-3xl pointer-events-none" />
      <div className="relative">
        <span className="font-mono-data text-[10px] text-bonggy-accent uppercase tracking-[0.2em] block mb-3">
          Step {String(index).padStart(2, "0")} · {eyebrow}
        </span>
        <h3 className="font-serif-display text-[32px] md:text-[40px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary mb-5">
          {title}.
        </h3>
        <p className="text-[15px] md:text-[16px] text-bonggy-text-secondary leading-[1.6]">{body}</p>
      </div>
    </div>
  );
}

function TheReframe() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll(".reframe-card");
      // Cards are visible from the start — only animate a subtle slide-up reveal
      // as the user scrolls into the section. No pin, no hide-then-show.
      gsap.set(cards, { y: 24, opacity: 0.4 });
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  if (prefersReduced) {
    return (
      <section className="relative py-[100px] md:py-[120px] px-5 md:px-10 bg-bonggy-bg overflow-hidden">
        <FluidParticlesBackground />
        <div className="relative max-w-[1120px] mx-auto">
          <div className="max-w-[720px] mx-auto text-center mb-12">
            <SectionLabel>The reframe</SectionLabel>
            <h2 className="font-serif-display text-[32px] md:text-[48px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">
              You do not have a data problem. <span className="italic">You have a thinking problem.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REFRAME_TRIO.map((item) => <ReframeCard key={item.title} {...item} />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative bg-bonggy-bg overflow-hidden py-[100px] md:py-[140px]">
      <FluidParticlesBackground />
      <div className="relative max-w-[1120px] mx-auto px-5 md:px-10">
        <div className="max-w-[820px] mx-auto text-center mb-14 md:mb-16">
          <SectionLabel>The reframe</SectionLabel>
          <h2 className="font-serif-display text-[32px] md:text-[52px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">
            You do not have a data problem.{" "}
            <span className="italic">You have a thinking problem.</span>
          </h2>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {REFRAME_TRIO.map((item) => <ReframeCard key={item.title} {...item} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── THE INSIGHT ───
const INSIGHT_TRAP_STATS = [
  { num: "500", label: "accounts sprayed" },
  { num: "3", label: "angles recycled" },
  { num: "60%", label: "heard it before" },
  { num: "1%", label: "reply rate" },
];

function TheInsight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReduced || !ref.current) return;
    const section = ref.current;
    const ctx = gsap.context(() => {
      const headline = section.querySelector(".insight-headline");
      if (headline) gsap.from(headline, { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: headline, start: "top 95%" } });

      const items = section.querySelectorAll(".insight-item");
      gsap.set(items, { y: 24, opacity: 0 });
      gsap.to(items, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.08, scrollTrigger: { trigger: items[0], start: "top 95%" } });

      const close = section.querySelector(".insight-close");
      if (close) gsap.from(close, { y: 24, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: close, start: "top 95%" } });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-[100px] md:py-[140px] px-5 md:px-10 bg-bonggy-surface">
      <div className="max-w-[1180px] mx-auto">
        <div className="mb-12 md:mb-16 max-w-[760px]">
          <SectionLabel>The activity trap</SectionLabel>
          <h2 className="insight-headline font-serif-display text-[36px] md:text-[56px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">
            More activity is <span className="italic">killing your brand.</span>
          </h2>
          <p className="mt-4 text-[15px] md:text-[17px] text-bonggy-text-secondary leading-[1.65] max-w-[560px]">
            Volume looks like progress on a dashboard. It looks like noise in your buyer&apos;s inbox.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12 md:mb-16">
          {INSIGHT_TRAP_STATS.map((s) => (
            <div
              key={s.label}
              className="insight-item group relative p-6 md:p-8 rounded-2xl border border-bonggy-border bg-bonggy-bg overflow-hidden transition-all duration-300 hover:border-bonggy-accent/40 hover:-translate-y-1"
            >
              <div aria-hidden="true" className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-bonggy-accent/10 blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="relative font-serif-display text-[40px] md:text-[56px] font-normal text-bonggy-text-primary tracking-[-0.02em] leading-none">
                {s.num}
              </p>
              <div aria-hidden="true" className="mt-4 h-px w-12 bg-bonggy-accent" />
              <p className="text-[13px] md:text-[14px] text-bonggy-text-secondary mt-3 leading-[1.45]">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="insight-close relative p-8 md:p-12 rounded-2xl border border-bonggy-border bg-bonggy-bg overflow-hidden">
          <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-bonggy-accent/12 blur-3xl pointer-events-none" />
          <div className="relative max-w-[820px]">
            <span className="font-mono-data text-[11px] text-bonggy-accent uppercase tracking-[0.2em] block mb-4">
              The shift
            </span>
            <p className="font-serif-display text-[22px] md:text-[30px] text-bonggy-text-primary leading-[1.35] tracking-[-0.01em]">
              The winners are not sending <span className="italic">more.</span> They are sending <span className="italic text-bonggy-accent">right.</span> Right account. Right moment. Right narrative.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS — cinematic horizontal scroll stage ───

type HiwStep = { num: string; title: string; desc: string };
type HiwModule = { label: string; desc: string; steps: HiwStep[] };

const HIW_MODULES: HiwModule[] = [
  {
    label: "Agents",
    desc: "Watch and cluster",
    steps: [
      { num: "01", title: "Ingest every signal.", desc: "Job changes, funding, tech shifts, org moves. One feed. Zero tabs." },
      { num: "02", title: "Cluster by account.", desc: "Noise into narrative. Funding + VP Sales + no RevOps = a 90-day window." },
      { num: "03", title: "Score intent.", desc: "Weighted by strategic relevance. Urgency, not noise." },
      { num: "04", title: "Map the committee.", desc: "Auto-thread every contact. Find the gaps that kill deals." },
    ],
  },
  {
    label: "Drafts",
    desc: "Narrate and arm",
    steps: [
      { num: "01", title: "Generate the sequence.", desc: "AI writes a full multi-touch sequence for one specific buyer. Not a template." },
      { num: "02", title: "Choose your angles.", desc: "Direct, Value-first, Question-led, Social Proof, Competitive, Advisory. Pick the tones that fit." },
      { num: "03", title: "Review and approve.", desc: "Draft → Approved → Sent. Every email tagged, numbered, and ready." },
      { num: "04", title: "Export and send.", desc: "Push to Outreach, Apollo, Salesloft. Or grab the CSV and go manual." },
    ],
  },
  {
    label: "Lists",
    desc: "Build and prioritize",
    steps: [
      { num: "01", title: "Build smart lists.", desc: "Aggregate contacts by signal cluster, playbook match, or territory. Not static CSVs." },
      { num: "02", title: "Rank by urgency.", desc: "Intent score surfaces who to call today versus next quarter." },
      { num: "03", title: "Segment by motion.", desc: "Match each list to the right playbook, tone DNA, and outreach strategy." },
      { num: "04", title: "Monitor continuously.", desc: "Auto-refresh as signals change. Lists stay alive while you sleep." },
    ],
  },
  {
    label: "Enrich",
    desc: "Research and verify",
    steps: [
      { num: "01", title: "Enrich every profile.", desc: "Job history, content themes, communication style. More than a data dump." },
      { num: "02", title: "Analyze personality.", desc: "Tone matching based on traits and social activity. Know how they talk." },
      { num: "03", title: "Map social signals.", desc: "LinkedIn posts, X activity, news mentions. Real context, not guesswork." },
      { num: "04", title: "Verify thread gaps.", desc: "Missing committee members that kill deals. Flagged before you send." },
    ],
  },
  {
    label: "Playbooks",
    desc: "Strategy and position",
    steps: [
      { num: "01", title: "Define the ICP.", desc: "Ideal customer profile rooted in real win data. Not demographic fiction." },
      { num: "02", title: "Map persona pain points.", desc: "What each buyer cares about, when they care, and why." },
      { num: "03", title: "Position against competitors.", desc: "Why you win in a bake-off. Competitor angles built into every draft." },
      { num: "04", title: "Build win patterns.", desc: "Closed-won data teaches what to look for next. The system gets sharper." },
    ],
  },
];

function ModuleSlide({ index, label, desc, steps }: { index: number } & HiwModule) {
  return (
    <div className="shrink-0 w-[88vw] md:w-[72vw] lg:w-[58vw] p-7 md:p-10 rounded-2xl border border-bonggy-border bg-bonggy-surface relative overflow-hidden">
      <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-bonggy-accent/10 blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-bonggy-accent/5 blur-3xl pointer-events-none" />

      <div className="relative mb-8 md:mb-10">
        <span className="font-mono-data text-[11px] text-bonggy-accent uppercase tracking-[0.2em] block mb-3">
          Module {String(index).padStart(2, "0")} · {label}
        </span>
        <h3 className="font-serif-display text-[28px] md:text-[44px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">
          {desc}.
        </h3>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {steps.map((s) => (
          <div
            key={s.num}
            className="group flex flex-col gap-2 p-5 rounded-xl border border-bonggy-border bg-bonggy-bg/70 hover:border-bonggy-accent/40 hover:bg-bonggy-bg transition-colors"
          >
            <span className="font-mono-data text-[12px] text-bonggy-accent tracking-wider">{s.num}</span>
            <h4 className="text-[15px] md:text-[17px] font-medium text-bonggy-text-primary leading-[1.3]">{s.title}</h4>
            <p className="text-[13px] md:text-[14px] text-bonggy-text-secondary leading-[1.55]">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Skip pin-scrub on mobile — touch scroll fights the pin and feels broken.
    // Mobile users get the vertical stack fallback (same as prefers-reduced-motion).
    if (prefersReduced || isMobile || !sectionRef.current || !trackRef.current) return;
    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const getScrollDistance = () => Math.max(track.scrollWidth - window.innerWidth + 80, 0);

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.6,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
        },
      });

      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: true,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  if (prefersReduced || isMobile) {
    return (
      <section id="how-it-works" className="py-[100px] md:py-[120px] px-5 md:px-10 bg-bonggy-bg">
        <div className="max-w-[1120px] mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="font-serif-display text-[36px] md:text-[56px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">
              Five modules. <span className="italic">One revenue system.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-6 items-center">
            {HIW_MODULES.map((m, i) => (
              <ModuleSlide key={m.label} index={i + 1} {...m} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="how-it-works" className="relative bg-bonggy-bg">
      <div className="relative h-screen flex flex-col overflow-hidden">
        <div className="pt-24 pb-8 px-5 md:px-10 text-center shrink-0">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="font-serif-display text-[32px] md:text-[56px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">
            Five modules. <span className="italic">One revenue system.</span>
          </h2>
        </div>

        <div className="flex-1 flex items-center overflow-hidden">
          <div ref={trackRef} className="flex items-center gap-6 md:gap-10 pl-[6vw] pr-[6vw] will-change-transform">
            {HIW_MODULES.map((m, i) => (
              <ModuleSlide key={m.label} index={i + 1} {...m} />
            ))}
          </div>
        </div>

        <div className="pb-10 px-[6vw] shrink-0">
          <div className="h-px bg-bonggy-border overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-bonggy-accent origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.2em] text-bonggy-text-tertiary font-mono-data">
            <span>Scroll to advance</span>
            <span>{HIW_MODULES.length} modules</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── OBJECTION HANDLER ───
function ObjectionHandler() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReduced || !ref.current) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 95%" } });
    tl.from(ref.current.querySelector(".obj-headline"), { y: 30, opacity: 0, duration: 0.5, ease: "power2.out" }, 0);
    tl.from(ref.current.querySelector(".obj-body"), { y: 20, opacity: 0, duration: 0.45, ease: "power2.out" }, 0.2);
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={ref} className="py-[100px] md:py-[120px] px-5 md:px-10">
      <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div className="flex-1 max-w-[520px]">
          <h2 className="obj-headline font-serif-display text-[32px] md:text-[42px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary mb-6">
            &ldquo;We already have Data Enrichment tools.&rdquo;
          </h2>
          <div className="obj-body space-y-4">
            <p className="text-lg text-bonggy-text-secondary leading-[1.7]">
              Good. Keep them. We are not a database. We are not a sequencer.
              We are the intelligence layer that tells you <strong className="text-bonggy-text-primary font-normal">which</strong> contacts to prioritize,
              <strong className="text-bonggy-text-primary font-normal">what</strong> sequences to run, and <strong className="text-bonggy-text-primary font-normal">why</strong> the intent score matters.
            </p>
            <p className="text-bonggy-text-primary">Your stack is not the problem. The absence of strategic thinking between signal and send is.</p>
          </div>
        </div>
        <div className="w-full md:w-[380px] flex-shrink-0 overflow-hidden">
          <OrbitingIcons />
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───
const CTA_TRUST_CHIPS = [
  { value: "14-day", label: "free trial · no CC" },
  { value: "24h", label: "live with your data" },
  { value: "$2.4M+", label: "ARR scored monthly" },
  { value: "70%", label: "rep time back" },
];

function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;
    const section = sectionRef.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 95%" } });
      tl.from(section.querySelector(".cta-eyebrow"), { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" }, 0);
      tl.from(section.querySelector(".cta-headline"), { y: 40, opacity: 0, duration: 0.7, ease: "power2.out" }, 0.1);
      tl.from(section.querySelector(".cta-sub"), { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, 0.35);
      tl.from(section.querySelector(".cta-button-wrap"), { y: 18, opacity: 0, duration: 0.5, ease: "back.out(1.4)" }, 0.55);
      const chips = section.querySelectorAll(".cta-chip");
      gsap.set(chips, { y: 16, opacity: 0 });
      tl.to(chips, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.06 }, 0.75);

      // Slow scan-line animation
      const scan = section.querySelector(".cta-scan");
      if (scan) {
        gsap.to(scan, {
          xPercent: 100,
          duration: 4.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Orbital glow drift
      const orbs = section.querySelectorAll(".cta-orb");
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          x: (i % 2 === 0 ? 20 : -20),
          y: (i % 2 === 0 ? -15 : 15),
          duration: 6 + i * 0.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // Ring pulse around the CTA button
      const ring = section.querySelector(".cta-ring");
      if (ring) {
        gsap.to(ring, {
          scale: 1.25,
          opacity: 0,
          duration: 2.2,
          ease: "power2.out",
          repeat: -1,
        });
      }
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="relative overflow-hidden bg-bonggy-bg">
      {/* Full-bleed flickering pixel grid — runs end-to-end across the section */}
      <FlickeringGrid
        squareSize={4}
        gridGap={7}
        flickerChance={1.4}
        color="rgba(95, 191, 143, 1)"
        maxOpacity={0.32}
      />
      {/* Vignette over the grid so content stays readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 50%, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.85) 80%, rgba(10,10,10,0.95) 100%)",
        }}
      />

      <div className="relative max-w-[1180px] mx-auto px-5 md:px-10 py-[110px] md:py-[160px]">
        <div className="relative">
          {/* Drifting emerald orbs (kept as ambient lights over the grid) */}
          <div
            aria-hidden="true"
            className="cta-orb absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-bonggy-accent/15 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="cta-orb absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full bg-bonggy-accent/10 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="cta-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-bonggy-accent/8 blur-3xl pointer-events-none"
          />

          {/* Content */}
          <div className="relative text-center">
            <div className="cta-eyebrow inline-flex items-center gap-2 mb-7 px-3 py-1.5 rounded-full border border-bonggy-accent/30 bg-bonggy-accent/8">
              <BonggyMark size={18} className="shrink-0" />
              <span className="font-mono-data text-[10px] text-bonggy-accent uppercase tracking-[0.22em]">
                Strategy session · 30 min
              </span>
            </div>

            <h2 className="cta-headline font-serif-display text-[40px] md:text-[64px] lg:text-[76px] font-normal leading-[1.02] tracking-[-0.02em] text-bonggy-text-primary max-w-[920px] mx-auto">
              Your best rep&apos;s playbook.{" "}
              <span className="italic text-bonggy-accent">Available to everyone.</span>
            </h2>

            <p className="cta-sub mt-7 max-w-[560px] mx-auto text-[15px] md:text-[17px] text-bonggy-text-secondary leading-[1.65]">
              One call to see if your outbound is actually working, or if you are just hoping volume covers the gaps. We&apos;ll calibrate Bonggy on your accounts live.
            </p>

            <div className="cta-button-wrap relative mt-10 inline-block">
              <div
                aria-hidden="true"
                className="cta-ring absolute inset-0 rounded-md border border-bonggy-accent/50 pointer-events-none"
              />
              <a
                href="https://cal.com/bonggy/30min?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 text-[15px] font-medium bg-bonggy-accent text-bonggy-bg px-8 py-4 rounded-md hover:bg-bonggy-accent-hover transition-colors shadow-[0_0_40px_-8px_rgba(95,191,143,0.6)]"
              >
                Book a strategy session
                <ArrowRight size={16} />
              </a>
            </div>

            <p className="mt-4 text-[12px] text-bonggy-text-tertiary font-mono-data tracking-wide">
              No card required · Reschedule any time
            </p>

            {/* Trust chips */}
            <div className="mt-14 md:mt-16 pt-10 border-t border-bonggy-border max-w-[760px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {CTA_TRUST_CHIPS.map((c) => (
                <div key={c.label} className="cta-chip text-left md:text-center">
                  <p className="font-serif-display text-[22px] md:text-[28px] font-normal text-bonggy-accent leading-none tracking-[-0.02em]">
                    {c.value}
                  </p>
                  <p className="mt-2 text-[11px] md:text-[12px] text-bonggy-text-tertiary font-mono-data uppercase tracking-[0.14em] leading-[1.4]">
                    {c.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WHO IT'S FOR ───
const WIF_PAIN_CARDS = [
  { icon: Users, title: "The SDR who sprays 500 accounts", desc: "With the same 3 angles because there is no time to research 500. Bonggy writes the angle for each account automatically." },
  { icon: Building2, title: "The RevOps lead who manually dedupes CSVs", desc: "Who exports from Apollo, cleans in Excel, uploads to Salesforce. Bonggy replaces the entire waterfall with one sync." },
  { icon: Zap, title: "The founding AE who researches more than sells", desc: "Who knows every signal but cannot scale that knowledge to the rest of the team. Bonggy makes your playbook available to everyone." },
  { icon: MessageSquare, title: "The VP Sales who cannot trust the data", desc: "Who gets pipeline reviews full of gut feelings instead of signal-backed narratives. Bonggy gives you the why behind every target." },
];

const PIPELINE_STATIONS = [
  { icon: Users,          label: "SDR",          detail: "500 sprayed · 3 angles" },
  { icon: Building2,      label: "RevOps",       detail: "Manual CSV dedupes" },
  { icon: Zap,            label: "Founding AE",  detail: "Stuck in research" },
  { icon: MessageSquare,  label: "VP Sales",     detail: "Gut-feel reviews" },
];

function BrokenPipeline() {
  return (
    <div className="relative w-full h-full rounded-2xl border border-bonggy-border bg-bonggy-surface overflow-hidden flex flex-col">
      {/* Subtle dot grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Corner glow */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-bonggy-accent/12 blur-3xl pointer-events-none"
      />

      <div className="relative flex-1 flex flex-col p-6 md:p-8">
        {/* Top label */}
        <div className="pl-16 mb-6 font-mono-data text-[10px] uppercase tracking-[0.22em] text-bonggy-accent">
          Signals in
        </div>

        {/* The pipeline spine + stations — flex-1 so it fills the available column height */}
        <div className="relative flex-1">
          {/* Static gradient line */}
          <div
            aria-hidden="true"
            className="absolute left-7 top-3 bottom-3 w-px"
            style={{
              background:
                "linear-gradient(to bottom, rgba(95,191,143,0.15) 0%, rgba(95,191,143,0.45) 20%, rgba(95,191,143,0.45) 80%, rgba(95,191,143,0.15) 100%)",
            }}
          />

          {/* 4 stations — justify-between so they distribute evenly across the column height */}
          <div className="relative flex flex-col justify-between h-full py-2">
            {PIPELINE_STATIONS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="relative pl-16">
                  {/* Node */}
                  <div className="absolute left-0 top-1 w-14 h-14 flex items-center justify-center">
                    <div className="absolute inset-2 rounded-full bg-bonggy-bg border border-bonggy-accent/55 flex items-center justify-center">
                      <Icon size={16} className="text-bonggy-accent" strokeWidth={1.8} />
                    </div>
                  </div>
                  <div>
                    <span className="font-mono-data text-[10px] text-bonggy-accent uppercase tracking-[0.2em] block mb-1">
                      Stage {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="text-[15px] md:text-[16px] text-bonggy-text-primary font-medium">{s.label}</div>
                    <div className="text-[12px] md:text-[13px] text-bonggy-text-secondary">{s.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom label */}
        <div className="pl-16 mt-6 font-mono-data text-[10px] uppercase tracking-[0.22em] text-bonggy-text-tertiary flex items-center gap-2">
          <span>Pipeline out</span>
          <span className="text-bonggy-accent/70">(broken)</span>
        </div>
      </div>
    </div>
  );
}

const WIF_PERSONAS = [
  { role: "VP Sales / Head of Sales", outcome: "Hot accounts ranked by urgency, not alphabetically. Know what to talk about before the call starts." },
  { role: "Sales Manager / Team Lead", outcome: "Every rep armed with account-specific angles. No more 'just checking in' emails." },
  { role: "RevOps Lead", outcome: "Own the enrichment waterfall. See cost per field. Approve every data point before it hits the CRM." },
  { role: "SDR / BDR", outcome: "Spend 70% of your time selling, not researching. The narrative is written for you." },
  { role: "Founding AE / Founder", outcome: "Your instinct, systematized. Every rep gets the playbook you developed through 200 conversations." },
];

function WhoItsFor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced || !ref.current) return;
    const section = ref.current;
    const ctx = gsap.context(() => {
      const quote = section.querySelector(".wif-quote");
      if (quote) gsap.from(quote, { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: quote, start: "top 95%" } });

      const painCards = section.querySelectorAll(".wif-pain-card");
      gsap.set(painCards, { y: 24, opacity: 0 });
      gsap.to(painCards, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.08, scrollTrigger: { trigger: painCards[0], start: "top 95%" } });

      const bentoCards = section.querySelectorAll(".wif-bento-card");
      gsap.set(bentoCards, { y: 30, opacity: 0 });
      gsap.to(bentoCards, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.08, scrollTrigger: { trigger: bentoCards[0], start: "top 95%" } });

      const vision = section.querySelector(".wif-vision");
      if (vision) gsap.from(vision, { y: 24, opacity: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: vision, start: "top 95%" } });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="who-its-for" className="py-[100px] md:py-[140px] px-5 md:px-10 bg-bonggy-bg">
      <div className="max-w-[1180px] mx-auto">

        {/* Founder Quote — editorial glass card */}
        <div className="wif-quote relative p-8 md:p-12 rounded-2xl border border-bonggy-border bg-bonggy-surface overflow-hidden mb-16 md:mb-24">
          <div aria-hidden="true" className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-bonggy-accent/10 blur-3xl pointer-events-none" />
          <div aria-hidden="true" className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-bonggy-accent/5 blur-3xl pointer-events-none" />

          <div className="relative">
            <span className="font-mono-data text-[11px] text-bonggy-accent uppercase tracking-[0.2em] block mb-4">
              Founder Note
            </span>
            <Quote size={28} className="text-bonggy-accent mb-5" />
            <p className="font-serif-display text-[20px] md:text-[26px] text-bonggy-text-primary leading-[1.45] tracking-[-0.01em] mb-8 max-w-[920px]">
              &ldquo;We built Bonggy because we lived this. The real problem is not that your SDRs are slow, your AEs are cautious, or your managers are stretched. It is that every single one of them is operating from a different version of the truth. The SDR sees one narrative in Apollo. The AE sees another in Salesforce. The manager tries to coach from a dashboard that was stale last Tuesday. And RevOps spends Monday morning reconciling who is even right. The friction is not between you and your prospects. It is between your SDRs, your AEs, your managers, and your RevOps team &mdash; all surrounded by information, none of it aligned. We are done pretending this is normal.&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-6 border-t border-bonggy-border">
              <div className="w-10 h-10 rounded-full bg-bonggy-accent/10 border border-bonggy-accent/30 flex items-center justify-center">
                <span className="text-bonggy-accent font-mono-data text-[12px]">TB</span>
              </div>
              <div>
                <p className="text-[14px] text-bonggy-text-primary font-medium">Team Bonggy</p>
                <p className="text-[12px] text-bonggy-text-tertiary">We lived the struggle. So we built the fix.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pain bento — animated pipeline visualization + 4 stacked pain cards */}
        <div className="mb-12 md:mb-16">
          <div className="mb-8 max-w-[720px]">
            <SectionLabel>Where teams break</SectionLabel>
            <h2 className="font-serif-display text-[32px] md:text-[48px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">
              Four roles. One <span className="italic">broken</span> motion.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,360px)_1fr] gap-8 md:gap-12">
            {/* Left: static broken-pipeline visualization, stretches to match the right column */}
            <div className="min-h-[520px]">
              <BrokenPipeline />
            </div>

            {/* Right: 4 pain cards stacked vertically */}
            <div className="flex flex-col gap-4 md:gap-5">
              {WIF_PAIN_CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="wif-pain-card group relative p-6 md:p-7 rounded-2xl border border-bonggy-border bg-bonggy-surface overflow-hidden transition-all duration-300 hover:border-bonggy-accent/40 hover:-translate-y-0.5"
                  >
                    <div aria-hidden="true" className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-bonggy-accent/10 blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-bonggy-accent/10 border border-bonggy-accent/30 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-bonggy-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-mono-data text-[10px] text-bonggy-accent uppercase tracking-[0.2em] block mb-1">
                          Stage {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-[17px] md:text-[18px] font-medium text-bonggy-text-primary mb-2 leading-[1.3]">{card.title}</h3>
                        <p className="text-[14px] text-bonggy-text-secondary leading-[1.6]">{card.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Asymmetric persona bento — VP Sales as hero, 4 satellites */}
        <div className="mb-16 md:mb-24">
          <div className="mb-8 max-w-[720px]">
            <SectionLabel>Who Bonggy is for</SectionLabel>
            <h2 className="font-serif-display text-[32px] md:text-[48px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">
              Five roles. <span className="italic">One aligned narrative.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-5">
            {/* Hero card — VP Sales */}
            <div className="wif-bento-card group relative md:col-span-2 md:row-span-2 p-7 md:p-10 rounded-2xl border border-bonggy-border bg-bonggy-surface overflow-hidden transition-all duration-300 hover:border-bonggy-accent/40">
              <div aria-hidden="true" className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-bonggy-accent/15 blur-3xl pointer-events-none" />
              <div aria-hidden="true" className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-bonggy-accent/8 blur-3xl pointer-events-none" />
              <div className="relative h-full flex flex-col">
                <span className="font-mono-data text-[10px] text-bonggy-accent uppercase tracking-[0.2em] block mb-4">
                  Persona 01 · Hero
                </span>
                <h3 className="font-serif-display text-[32px] md:text-[44px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary mb-5">
                  {WIF_PERSONAS[0].role}
                </h3>
                <p className="text-[15px] md:text-[16px] text-bonggy-text-secondary leading-[1.65] max-w-[480px]">
                  {WIF_PERSONAS[0].outcome}
                </p>
                <div className="mt-auto pt-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-bonggy-text-tertiary font-mono-data">
                  <span className="w-8 h-px bg-bonggy-accent" />
                  Ranked by urgency
                </div>
              </div>
            </div>

            {/* 4 satellite cards */}
            {WIF_PERSONAS.slice(1).map((p, i) => (
              <div
                key={p.role}
                className="wif-bento-card group relative p-6 rounded-2xl border border-bonggy-border bg-bonggy-surface overflow-hidden transition-all duration-300 hover:border-bonggy-accent/40 hover:-translate-y-0.5"
              >
                <div aria-hidden="true" className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-bonggy-accent/10 blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <span className="font-mono-data text-[10px] text-bonggy-accent uppercase tracking-[0.2em] block mb-3">
                    Persona {String(i + 2).padStart(2, "0")}
                  </span>
                  <h3 className="text-[16px] md:text-[17px] font-medium text-bonggy-text-primary mb-2 leading-[1.3]">{p.role}</h3>
                  <p className="text-[13px] md:text-[14px] text-bonggy-text-secondary leading-[1.55]">{p.outcome}</p>
                </div>
              </div>
            ))}

            {/* GTM CTA — fills the empty bento slot with a dark action card */}
            <a
              href="https://cal.com/bonggy/30min?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="wif-bento-card group relative p-6 rounded-2xl border border-bonggy-accent/30 bg-bonggy-bg overflow-hidden transition-all duration-300 hover:border-bonggy-accent/70 hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-bonggy-accent/15 blur-3xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-bonggy-accent/8 blur-3xl pointer-events-none"
              />
              <div className="relative">
                <span className="font-mono-data text-[10px] text-bonggy-accent uppercase tracking-[0.2em] block mb-3">
                  Anyone in GTM
                </span>
                <h3 className="text-[18px] md:text-[20px] font-semibold text-bonggy-text-primary leading-[1.2] mb-2">
                  If pipeline touches your day, this is for you.
                </h3>
                <p className="text-[13px] text-bonggy-text-secondary leading-[1.5]">
                  Sales · Marketing · RevOps · CS · Founders.
                </p>
              </div>
              <div className="relative mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-bonggy-accent">
                Book a strategy session
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>
          </div>
        </div>

        {/* Vision — editorial closer */}
        <div className="wif-vision relative p-8 md:p-12 rounded-2xl border border-bonggy-border bg-bonggy-surface overflow-hidden">
          <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-bonggy-accent/10 blur-3xl pointer-events-none" />
          <div className="relative max-w-[820px]">
            <span className="font-mono-data text-[11px] text-bonggy-accent uppercase tracking-[0.2em] block mb-4 inline-flex items-center gap-2">
              <Lightbulb size={14} />
              Vision
            </span>
            <p className="font-serif-display text-[22px] md:text-[30px] text-bonggy-text-primary leading-[1.35] tracking-[-0.01em]">
              We are not building another lead database. We are not building another sequencer. We are building the <span className="italic text-bonggy-accent">intelligence layer</span> that turns raw signal into actionable strategy. The future of outbound is not more volume. It is more <span className="italic">precision</span>.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (prefersReduced || !ref.current) return;
    gsap.set(ref.current, { opacity: 0, y: 20 });
    const tween = gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 95%" } });
    return () => { tween.kill(); };
  }, []);

  return (
    <footer ref={ref} className="py-10 px-5 md:px-10 border-t border-bonggy-border">
      <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-[14px] text-bonggy-text-tertiary">The strategy layer between signal and send.</p>
        <div className="flex items-center gap-6">
          <Link href="/faq" className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors">FAQ</Link>
          <Link href="/privacy" className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors">Privacy</Link>
          <Link href="/terms" className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

// ─── LANDING PAGE ───
export default function Landing() {
  return (
    <div className="min-h-screen bg-bonggy-bg text-bonggy-text-primary font-sans antialiased transition-colors duration-300">
      <FloatingControls />
      <Hero />
      <Stats />
      <SignalFlow />
      <TheReframe />
        <TheInsight />
      <HowItWorks />
      <ObjectionHandler />
      <WhoItsFor />
      <CTA />
      <Footer />
    </div>
  );
}
