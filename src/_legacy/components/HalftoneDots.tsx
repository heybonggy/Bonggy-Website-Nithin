import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  phase: number;
}

export function HalftoneDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const baseRadius = 1.5;
    const pulseSpeed = 0.0015;
    const mouseRadius = 160;
    const mouseGlowStrength = 1.5;
    const mouseSizeStrength = 2.2;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Arc configuration — center is just off-screen to the right
    const centerXOffset = 0.05; // center is 5% past the right edge
    const arcStartAngle = Math.PI * 0.55; // upper part of left-facing arc
    const arcEndAngle = Math.PI * 1.45; // lower part of left-facing arc
    const minRadiusFactor = 0.48; // inner arc starts here
    const maxRadiusFactor = 0.95; // outer arc ends here
    const rings = 50; // number of concentric arc rings
    const dotsPerRingBase = 100; // base dots for outer ring scaling

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);

      const cx = width * (1 + centerXOffset);
      const cy = height * 0.5;
      const diag = Math.sqrt(width * width + height * height);
      const maxR = diag * maxRadiusFactor;
      const minR = diag * minRadiusFactor;

      const dots: Dot[] = [];

      for (let ring = 0; ring < rings; ring++) {
        const t = ring / (rings - 1);
        const radius = minR + (maxR - minR) * t;

        // More dots on outer rings, fewer on inner — proportional to arc length
        const arcSpan = arcEndAngle - arcStartAngle;
        const circumference = radius * arcSpan;
        const maxCircumference = maxR * arcSpan;
        const dotsInRing = Math.max(6, Math.round(dotsPerRingBase * (circumference / maxCircumference) + dotsPerRingBase * 0.2));

        for (let i = 0; i < dotsInRing; i++) {
          const angleT = i / (dotsInRing - 1 || 1);
          const angle = arcStartAngle + arcSpan * angleT;

          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;

          // Skip dots that are well off-screen to save perf
          if (x < -60 || x > width + 60 || y < -60 || y > height + 60) continue;

          // Opacity: inner rings (right side) are more opaque,
          // outer rings fade out. Also fade at arc tips.
          const ringOpacity = 1.0 - 0.8 * t; // 1.0 → 0.2
          const arcEdgeFade = Math.sin(angleT * Math.PI); // fade at top & bottom
          const baseOpacity = ringOpacity * arcEdgeFade * 0.9;

          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            size: baseRadius * (0.55 + 0.45 * (1 - t)), // inner dots slightly larger
            opacity: baseOpacity,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }

      dotsRef.current = dots;
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    function animate() {
      if (!ctx || !canvas) return;
      timeRef.current += 1;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isDark = theme === "dark";
      const dotColor = isDark ? "255, 255, 255" : "28, 28, 28";

      for (const dot of dotsRef.current) {
        // Subtle ambient pulse
        const pulse = prefersReduced ? 0 : Math.sin(t * pulseSpeed + dot.phase) * 0.1;

        const dx = dot.baseX - mx;
        const dy = dot.baseY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let glowMult = 1;
        let sizeMult = 1;

        if (dist < mouseRadius && dist > 0) {
          const falloff = 1 - dist / mouseRadius;
          const smoothFalloff = falloff * falloff * (3 - 2 * falloff); // smoothstep
          glowMult = 1 + smoothFalloff * mouseGlowStrength;
          sizeMult = 1 + smoothFalloff * mouseSizeStrength;
        }

        // Breathing opacity combined with hover glow
        const alpha = Math.max(0, Math.min(1, (dot.opacity + pulse) * glowMult));

        if (alpha <= 0.005) continue;

        const size = dot.size * sizeMult;

        ctx.beginPath();
        ctx.arc(dot.baseX, dot.baseY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${alpha})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    resize();
    animate();

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.92 }}
    />
  );
}
