import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight, ShieldCheck, Moon, Sun, Radio, Users, Target, FileText, Zap, TrendingUp,
  MessageSquare, Download, Search, Bell, Globe, Eye, Lightbulb, Quote, Building2, Menu,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/hooks/useTheme";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EarlyAccessModal } from "@/components/EarlyAccessModal";


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
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
    });
    return () => { tween.kill(); };
  }, []);
  return ref;
}

// ─── UI Helpers ───
function Logo() {
  return (
    <span className="text-[16px] font-semibold text-bonggy-text-primary tracking-tight">
      Bonggy
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
        <a href="#" className="text-[13px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-bonggy-bg">Home</a>
        <a href="#how-it-works" className="text-[13px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-bonggy-bg">How it works</a>
        <a href="#who-its-for" className="text-[13px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-bonggy-bg">Who it's for</a>
        <a href="/faq" className="text-[13px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-bonggy-bg">FAQ</a>
        <a href="#cta" className="text-[13px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-bonggy-bg">About Us</a>
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
            <a href="#" onClick={() => setMobileOpen(false)} className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-2.5 rounded-lg hover:bg-bonggy-bg">Home</a>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-2.5 rounded-lg hover:bg-bonggy-bg">How it works</a>
            <a href="#who-its-for" onClick={() => setMobileOpen(false)} className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-2.5 rounded-lg hover:bg-bonggy-bg">Who it's for</a>
            <a href="/faq" onClick={() => setMobileOpen(false)} className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-2.5 rounded-lg hover:bg-bonggy-bg">FAQ</a>
            <a href="#cta" onClick={() => setMobileOpen(false)} className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-2.5 rounded-lg hover:bg-bonggy-bg">About Us</a>
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
    { icon: Globe, r: 170 * s, delay: 0, duration: 24, tilt: 0, size: 18 * s },
    { icon: Search, r: 170 * s, delay: -12, duration: 24, tilt: 0, size: 18 * s },
    { icon: Eye, r: 170 * s, delay: -6, duration: 24, tilt: 0, size: 18 * s },
    { icon: Bell, r: 170 * s, delay: -18, duration: 24, tilt: 0, size: 18 * s },
    { icon: Radio, r: 135 * s, delay: -2, duration: 18, tilt: 45, size: 20 * s },
    { icon: Target, r: 135 * s, delay: -11, duration: 18, tilt: 45, size: 20 * s },
    { icon: Users, r: 135 * s, delay: -7, duration: 18, tilt: 45, size: 20 * s },
    { icon: MessageSquare, r: 135 * s, delay: -15, duration: 18, tilt: 45, size: 20 * s },
    { icon: FileText, r: 95 * s, delay: -1, duration: 13, tilt: -35, size: 18 * s },
    { icon: Zap, r: 95 * s, delay: -6.5, duration: 13, tilt: -35, size: 18 * s },
    { icon: TrendingUp, r: 95 * s, delay: -4, duration: 13, tilt: -35, size: 18 * s },
    { icon: Download, r: 95 * s, delay: -9.5, duration: 13, tilt: -35, size: 18 * s },
    { icon: ShieldCheck, r: 58 * s, delay: 0, duration: 9, tilt: 70, size: 18 * s },
    { icon: TrendingUp, r: 58 * s, delay: -4.5, duration: 9, tilt: 70, size: 18 * s },
  ];

  const traces = [170 * s, 135 * s, 95 * s, 58 * s];

  return (
    <div ref={containerRef} className="relative w-full max-w-[420px] mx-auto aspect-square overflow-hidden">
      {traces.map((r) => (
        <div
          key={r}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bonggy-border"
          style={{ width: r * 2, height: r * 2, opacity: 0.2 }}
        />
      ))}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 28 * s, height: 28 * s,
          background: "radial-gradient(circle, rgba(124,230,85,0.35) 0%, rgba(124,230,85,0.08) 50%, transparent 70%)",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-bonggy-accent" />
      {orbits.map((o, i) => {
        const Icon = o.icon;
        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2"
            style={{
              width: o.r * 2, height: o.r * 2,
              marginLeft: -o.r, marginTop: -o.r,
              animation: `orbit-spin ${o.duration}s linear infinite`,
              animationDelay: `${o.delay}s`,
              transform: `rotate(${o.tilt}deg)`,
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
              }}
            >
              <div
                className="flex items-center justify-center rounded-full bg-bonggy-surface border border-bonggy-border shadow-sm"
                style={{ width: o.size + 14, height: o.size + 14, transform: `rotate(-${o.tilt}deg)` }}
              >
                <Icon size={Math.round(o.size)} className="text-bonggy-text-primary" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── SIGNAL TICKER (hero atmosphere) ───
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

function SignalTicker({ side, duration }: { side: "left" | "right"; duration: number }) {
  return (
    <div
      className={`pointer-events-none absolute top-0 bottom-0 ${side === "left" ? "left-0" : "right-0"} hidden lg:block w-[160px] xl:w-[200px] overflow-hidden z-0`}
      aria-hidden="true"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
      }}
    >
      <div
        className="flex flex-col"
        style={{
          animation: prefersReduced ? "none" : `ticker-up ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {[...SIGNALS, ...SIGNALS].map((s, i) => (
          <div
            key={i}
            className={`py-1.5 text-[10px] xl:text-[11px] text-bonggy-text-tertiary font-mono-data whitespace-nowrap ${side === "left" ? "pl-3 xl:pl-5 text-left" : "pr-3 xl:pr-5 text-right"}`}
            style={{ opacity: 0.4 }}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HERO ───
function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [glitchActive, setGlitchActive] = useState(prefersReduced);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;
    const tl = gsap.timeline({ delay: 0.1 });

    const words1 = sectionRef.current.querySelectorAll(".hero-word-1");
    tl.from(words1, { y: 50, opacity: 0, duration: 0.6, ease: "back.out(1.4)", stagger: 0.04 }, 0.2);

    const words2 = sectionRef.current.querySelectorAll(".hero-word-2");
    tl.from(words2, { y: 50, opacity: 0, duration: 0.6, ease: "back.out(1.4)", stagger: 0.04 }, "+=0.4");

    const sub1 = sectionRef.current.querySelector(".hero-sub-1");
    if (sub1) tl.from(sub1, { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "+=0.2");

    const sub2 = sectionRef.current.querySelector(".hero-sub-2");
    if (sub2) {
      tl.from(sub2, { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "+=0.25");
      tl.call(() => setGlitchActive(true), [], "-=0.4");
    }

    const sub3 = sectionRef.current.querySelector(".hero-sub-3");
    if (sub3) tl.from(sub3, { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "+=0.2");

    const cta = sectionRef.current.querySelector(".hero-cta");
    if (cta) tl.from(cta, { y: 15, opacity: 0, duration: 0.4, ease: "power2.out" }, "+=0.1");

    return () => { tl.kill(); };
  }, []);

  const headlinePart1 = "Your SDRs aren't lazy.".split(" ");
  const headlinePart2 = "Your stack is lying to you.".split(" ");

  return (
    <section ref={sectionRef} className="relative pt-24 md:pt-32 pb-16 md:pb-24 lg:min-h-screen px-5 md:px-10 overflow-hidden flex items-center">
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "min(700px, 180vw)", height: "min(500px, 120vh)",
          background: "radial-gradient(ellipse, rgba(124,230,85,0.05) 0%, transparent 70%)",
        }}
      />

      <SignalTicker side="left" duration={48} />
      <SignalTicker side="right" duration={62} />

      <div className="relative z-10 max-w-[1120px] mx-auto w-full">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-serif-display text-[40px] sm:text-[48px] md:text-[80px] lg:text-[96px] font-normal leading-[0.95] tracking-[-0.02em] text-bonggy-text-primary mb-8 md:mb-10 break-words max-w-full">
            <span className="block">
              {headlinePart1.map((w, i) => (
                <span key={`p1-${i}`} className="hero-word-1 inline-block mr-[0.25em]">{w}</span>
              ))}
            </span>
            <span className="block">
              {headlinePart2.map((w, i) => {
                const isLying = w === "lying";
                return (
                  <span key={`p2-${i}`} className={`hero-word-2 inline-block mr-[0.25em] ${isLying ? "italic" : ""}`}>{w}</span>
                );
              })}
            </span>
          </h1>
          <div className="mb-10 max-w-[480px] mx-auto">
            <p className="hero-sub-1 text-lg md:text-xl text-bonggy-text-secondary leading-[1.6]">
              More data does not mean more pipeline.
            </p>
            <p className="hero-sub-2 text-lg md:text-xl text-bonggy-text-primary leading-[1.6]">
              It means more <GlitchWord from="-----" to="noise" active={glitchActive} />.
            </p>
            <p className="hero-sub-3 text-lg md:text-xl text-bonggy-text-secondary leading-[1.6] mt-3">
              Bonggy turns signal into strategy so your reps know exactly what to do.
            </p>
          </div>
          <div className="hero-cta w-full flex items-center justify-center">
            <a href="https://cal.com/bonggy/30min?overlayCalendar=true" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto text-base font-normal bg-bonggy-text-primary text-bonggy-surface px-8 py-4 rounded-md hover:opacity-85 transition-opacity flex items-center justify-center gap-2">
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
            stats.forEach((stat, i) => {
              const el = numbersRef.current[i];
              if (!el) return;

              const duration = 1.5 + Math.random() * 1.5; // 1.5–3s random
              const obj = { value: 0 };

              gsap.to(obj, {
                value: stat.num,
                duration,
                ease: "power2.out",
                onUpdate: () => {
                  const val = stat.decimals > 0
                    ? obj.value.toFixed(stat.decimals)
                    : Math.round(obj.value).toString();
                  el.textContent = (stat.prefix || "") + val + stat.suffix;
                },
              });
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

  return (
    <section ref={ref} className="py-20 md:py-28 px-5 md:px-10 border-y border-bonggy-border bg-bonggy-surface">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((s, i) => (
            <div key={s.label}>
              <span
                ref={(el) => { numbersRef.current[i] = el; }}
                className="block text-[36px] md:text-[48px] font-normal font-serif-display text-bonggy-text-primary tracking-[-0.02em] leading-none"
              >
                {(s.prefix || "") + "0" + s.suffix}
              </span>
              <p className="text-[14px] text-bonggy-text-tertiary mt-3 leading-[1.4]">{s.label}</p>
            </div>
          ))}
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
function TheReframe() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReduced || !ref.current) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    tl.from(ref.current.querySelector(".reframe-headline"), { y: 30, opacity: 0, duration: 0.5, ease: "power2.out" }, 0);
    const items = ref.current.querySelectorAll(".reframe-item");
    gsap.set(items, { y: 20, opacity: 0 });
    tl.to(items, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.08 }, 0.2);
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={ref} className="py-[100px] md:py-[120px] px-5 md:px-10">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[720px] mx-auto text-center mb-12">
          <h2 className="reframe-headline font-serif-display text-[32px] md:text-[44px] font-normal leading-[1.1] tracking-[-0.02em] text-bonggy-text-primary">
            You <GlitchWord from="have" to="do not have" /> a data problem.
            <br className="hidden md:block" />{" "}
            You have <GlitchWord from="an activity" to="a thinking" /> problem.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1120px] mx-auto">
          {[
            { title: "Signal", body: "Your reps see the job change. They miss the buying window that comes with it." },
            { title: "Cluster", body: "They see the funding round. They miss the infrastructure gap it creates." },
            { title: "Act", body: "They see the hiring spike. They miss the 90-day prove-it clock that started ticking." },
          ].map((item) => (
            <div key={item.title} className="reframe-item bg-bonggy-surface border border-bonggy-border rounded-[10px] p-6">
              <p className="text-[14px] font-medium text-bonggy-text-tertiary mb-2 uppercase tracking-wide">{item.title}</p>
              <p className="text-lg text-bonggy-text-secondary leading-[1.6]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── THE INSIGHT ───
function TheInsight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReduced || !ref.current) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    tl.from(ref.current.querySelector(".insight-headline"), { y: 30, opacity: 0, duration: 0.5, ease: "power2.out" }, 0);
    const items = ref.current.querySelectorAll(".insight-item");
    gsap.set(items, { y: 20, opacity: 0 });
    tl.to(items, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.08 }, 0.2);
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={ref} className="py-[100px] md:py-[120px] px-5 md:px-10 bg-bonggy-surface">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[640px] mx-auto text-center mb-12">
          <h2 className="insight-headline font-serif-display text-[36px] md:text-[48px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">
            The &quot;more activity&quot; trap is killing your brand.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[800px] mx-auto mb-12">
          {[
            { num: "500", label: "accounts sprayed" },
            { num: "3", label: "angles recycled" },
            { num: "60%", label: "heard it before" },
            { num: "1%", label: "reply rate" },
          ].map((s) => (
            <div key={s.label} className="insight-item bg-bonggy-bg border border-bonggy-border rounded-[10px] p-5 text-center">
              <p className="text-[28px] md:text-[32px] font-normal text-bonggy-text-primary tracking-[-0.02em]">{s.num}</p>
              <p className="text-[12px] text-bonggy-text-tertiary mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="max-w-[640px] mx-auto text-center">
          <p className="text-base text-bonggy-text-primary leading-[1.6]">
            The winners are not sending more. They are sending <strong className="font-normal">right</strong>.
            Right account. Right moment. Right narrative.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ───
function HowItWorks() {
  const [activeSet, setActiveSet] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useGsapReveal<HTMLDivElement>();

  useEffect(() => {
    if (prefersReduced || !gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".hiw-card");
    gsap.set(cards, { y: 20, opacity: 0 });
    const tween = gsap.to(cards, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.08, scrollTrigger: { trigger: gridRef.current, start: "top 80%" } });
    return () => { tween.kill(); };
  }, [activeSet]);

  const sets = [
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

  const current = sets[activeSet];

  return (
    <section id="how-it-works" className="py-[100px] md:py-[120px] px-5 md:px-10">
      <div className="max-w-[1120px] mx-auto">
        <div ref={headerRef} className="text-center mb-12">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="font-serif-display text-[36px] md:text-[48px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">Five modules. One revenue system.</h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {current.steps.map((s) => (
            <div
              key={s.num}
              className="hiw-card group p-6 rounded-[10px] border border-bonggy-border bg-bonggy-surface"
            >
              <span className="font-mono-data text-[14px] text-bonggy-accent block mb-4">{s.num}</span>
              <h3 className="text-lg font-normal text-bonggy-text-primary mb-3 leading-[1.3]">{s.title}</h3>
              <p className="text-base text-bonggy-text-secondary leading-[1.6]">{s.desc}</p>
              <div className="mt-5 h-px bg-bonggy-border rounded-full overflow-hidden">
                <div className="h-full bg-bonggy-text-primary w-0 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {sets.map((set, i) => (
            <button
              key={set.label}
              onClick={() => setActiveSet(i)}
              className={`flex-1 min-w-[100px] max-w-[160px] px-3 py-2 md:px-5 md:py-2.5 rounded-md text-[13px] md:text-[14px] transition-all ${
                activeSet === i
                  ? "bg-bonggy-text-primary text-bonggy-surface font-medium"
                  : "text-bonggy-text-secondary hover:text-bonggy-text-primary hover:bg-bonggy-surface border border-bonggy-border"
              }`}
            >
              <span className="block">{set.label}</span>
              <span className={`block text-[12px] mt-0.5 ${activeSet === i ? "text-bonggy-surface/60" : "text-bonggy-text-tertiary"}`}>
                {set.desc}
              </span>
            </button>
          ))}
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
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%" } });
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
function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });
    tl.from(sectionRef.current.querySelector(".cta-headline"), { y: 30, opacity: 0, duration: 0.5, ease: "power2.out" }, 0);
    tl.from(sectionRef.current.querySelector(".cta-sub"), { y: 15, opacity: 0, duration: 0.45, ease: "power2.out" }, 0.2);
    const buttons = sectionRef.current.querySelectorAll(".cta-btn");
    if (buttons.length) {
      gsap.set(buttons, { y: 15, opacity: 0 });
      tl.to(buttons, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.07 }, 0.35);
    }
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="py-[120px] md:py-[160px] px-5 md:px-10 bg-bonggy-surface">
      <div className="max-w-[720px] mx-auto text-center">
        <h2 className="cta-headline font-serif-display text-[32px] md:text-[48px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary mb-5">
          Your best rep&apos;s playbook. Available to everyone.
        </h2>
        <p className="cta-sub text-base text-bonggy-text-secondary leading-[1.6] max-w-[520px] mx-auto mb-8">
          You are buying back your reps&apos; time. One call to see if your outbound strategy is actually working, or if you are just hoping volume covers the gaps.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href="https://cal.com/bonggy/30min?overlayCalendar=true" target="_blank" rel="noopener noreferrer" className="cta-btn text-sm font-normal bg-bonggy-text-primary text-bonggy-surface px-6 py-3 rounded-md hover:opacity-85 transition-opacity inline-flex items-center gap-1.5">
            Strategy Session <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── WHO IT'S FOR ───
function WhoItsFor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReduced || !ref.current) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    tl.from(ref.current.querySelector(".wif-headline"), { y: 30, opacity: 0, duration: 0.5, ease: "power2.out" }, 0);
    const items = ref.current.querySelectorAll(".wif-card");
    gsap.set(items, { y: 20, opacity: 0 });
    tl.to(items, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.08 }, 0.2);
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={ref} id="who-its-for" className="py-[100px] md:py-[120px] px-5 md:px-10 bg-bonggy-surface border-y border-bonggy-border">
      <div className="max-w-[1120px] mx-auto">
        <p className="text-[13px] text-bonggy-accent uppercase tracking-wide font-medium mb-3">💚 Founder Note</p>

        {/* Founder Quote */}
        <div className="bg-bonggy-bg border border-bonggy-border rounded-xl p-6 md:p-8 mb-10">
          <Quote size={20} className="text-bonggy-accent mb-3" />
          <p className="text-[16px] md:text-[18px] text-bonggy-text-primary leading-[1.6] font-serif-display mb-4">
            &ldquo;We built Bonggy because we lived this. The real problem is not that your SDRs are slow, your AEs are cautious, or your managers are stretched. It is that every single one of them is operating from a different version of the truth. The SDR sees one narrative in Apollo. The AE sees another in Salesforce. The manager tries to coach from a dashboard that was stale last Tuesday. And RevOps spends Monday morning reconciling who is even right. The friction is not between you and your prospects. It is between your SDRs, your AEs, your managers, and your RevOps team &mdash; all surrounded by information, none of it aligned. We are done pretending this is normal.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-bonggy-text-tertiary">—</span>
            <div>
              <p className="text-[13px] text-bonggy-text-primary font-medium">Team Bonggy</p>
              <p className="text-[11px] text-bonggy-text-tertiary">We lived the struggle. So we built the fix.</p>
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            { icon: Users, title: "The SDR who sprays 500 accounts", desc: "With the same 3 angles because there is no time to research 500. Bonggy writes the angle for each account automatically." },
            { icon: Building2, title: "The RevOps lead who manually dedupes CSVs", desc: "Who exports from Apollo, cleans in Excel, uploads to Salesforce. Bonggy replaces the entire waterfall with one sync." },
            { icon: Zap, title: "The founding AE who researches more than sells", desc: "Who knows every signal but cannot scale that knowledge to the rest of the team. Bonggy makes your playbook available to everyone." },
            { icon: MessageSquare, title: "The VP Sales who cannot trust the data", desc: "Who gets pipeline reviews full of gut feelings instead of signal-backed narratives. Bonggy gives you the why behind every target." },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="wif-card bg-bonggy-bg border border-bonggy-border rounded-xl p-6 hover:border-bonggy-border-hover transition-colors">
                <Icon size={18} className="text-bonggy-accent mb-3" />
                <h3 className="text-[15px] font-medium text-bonggy-text-primary mb-2">{card.title}</h3>
                <p className="text-[14px] text-bonggy-text-secondary leading-[1.6]">{card.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Who Bonggy is actually for */}
        <h3 className="text-[20px] font-medium text-bonggy-text-primary mb-4">Who Bonggy is actually for</h3>
        <div className="space-y-3 mb-10">
          {[
            { role: "VP Sales / Head of Sales", outcome: "Hot accounts ranked by urgency, not alphabetically. Know what to talk about before the call starts." },
            { role: "Sales Manager / Team Lead", outcome: "Every rep armed with account-specific angles. No more 'just checking in' emails." },
            { role: "RevOps Lead", outcome: "Own the enrichment waterfall. See cost per field. Approve every data point before it hits the CRM." },
            { role: "SDR / BDR", outcome: "Spend 70% of your time selling, not researching. The narrative is written for you." },
            { role: "Founding AE / Founder", outcome: "Your instinct, systematized. Every rep gets the playbook you developed through 200 conversations." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-bonggy-border bg-bonggy-bg">
              <div className="w-7 h-7 rounded-full bg-bonggy-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[11px] font-medium text-bonggy-accent">{i + 1}</span>
              </div>
              <div>
                <p className="text-[14px] font-medium text-bonggy-text-primary mb-0.5">{item.role}</p>
                <p className="text-[13px] text-bonggy-text-secondary leading-[1.5]">{item.outcome}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Vision */}
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={18} className="text-bonggy-accent" />
          <p className="text-[13px] text-bonggy-accent uppercase tracking-wide font-medium">Vision</p>
        </div>
        <p
          ref={(el) => {
            if (!el || prefersReduced) return;
            gsap.from(el, {
              y: 20,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
            });
          }}
          className="text-[16px] md:text-[17px] text-bonggy-text-secondary leading-[1.7] max-w-[720px]"
        >
          We are not building another lead database. We are not building another sequencer. We are building the <strong className="text-bonggy-text-primary font-normal">intelligence layer</strong> that turns raw signal into actionable strategy. The future of outbound is not more volume. It is more precision.
        </p>
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
    const tween = gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 90%" } });
    return () => { tween.kill(); };
  }, []);

  return (
    <footer ref={ref} className="py-10 px-5 md:px-10 border-t border-bonggy-border">
      <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-[14px] text-bonggy-text-tertiary">The strategy layer between signal and send.</p>
        <div className="flex items-center gap-6">
          <a href="/faq" className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors">FAQ</a>
          <a href="/privacy.html" className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors">Privacy</a>
          <a href="/terms.html" className="text-[13px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors">Terms</a>
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
