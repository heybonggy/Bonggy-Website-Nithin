import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";

export function ScrollSkew({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let currentSkew = 0;
    let targetSkew = 0;
    let rafId: number;

    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      targetSkew = Math.max(-2, Math.min(2, velocity * 0.003));
    });

    const animate = () => {
      currentSkew += (targetSkew - currentSkew) * 0.08;
      targetSkew *= 0.92; // decay
      if (ref.current) {
        ref.current.style.transform = `skewY(${currentSkew}deg)`;
      }
      lenis.raf(Date.now());
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={ref} style={{ transformOrigin: "center center", willChange: "transform" }}>
      {children}
    </div>
  );
}
