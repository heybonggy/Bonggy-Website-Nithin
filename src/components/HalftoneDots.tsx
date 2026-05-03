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

    const spacing = 14;
    const baseRadius = 1.4;
    const waveSpeed = 0.002;
    const waveFrequency = 0.015;
    const waveAmplitude = 20;
    const mouseRadius = 120;
    const mouseStrength = 0.6;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);

      // Rebuild dot grid
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const dots: Dot[] = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing + spacing / 2;
          const y = row * spacing + spacing / 2;
          // Fade in from the right edge (x = width is most opaque)
          const normalizedX = x / width;
          const baseOpacity = Math.max(0, normalizedX * 1.2 - 0.1) * 0.9;
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            size: baseRadius,
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
        // Wave animation
        const waveY = Math.sin(dot.baseX * waveFrequency + t * waveSpeed * (prefersReduced ? 0 : 1)) * waveAmplitude;
        const waveX = Math.cos(dot.baseY * waveFrequency * 0.7 + t * waveSpeed * 0.8 * (prefersReduced ? 0 : 1)) * (waveAmplitude * 0.5);

        let dx = dot.baseX + waveX - mx;
        let dy = dot.baseY + waveY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let offsetX = 0;
        let offsetY = 0;
        let sizeMult = 1;

        if (dist < mouseRadius && dist > 0) {
          const force = (1 - dist / mouseRadius) * mouseStrength;
          offsetX = (dx / dist) * force * 15;
          offsetY = (dy / dist) * force * 15;
          sizeMult = 1 + force * 0.6;
        }

        const x = dot.baseX + waveX + offsetX;
        const y = dot.baseY + waveY + offsetY;

        // Breathing opacity
        const breath = prefersReduced ? 0 : Math.sin(t * 0.02 + dot.phase) * 0.15;
        const alpha = Math.max(0, Math.min(1, dot.opacity + breath));

        if (alpha <= 0.01) continue;

        const size = dot.size * sizeMult;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
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
      style={{ opacity: 0.8 }}
    />
  );
}
