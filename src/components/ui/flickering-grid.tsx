"use client";

import { useEffect, useRef } from "react";

type FlickeringGridProps = {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string; // rgb() or rgba() — alpha is overridden per-square
  maxOpacity?: number;
  className?: string;
};

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgba(95, 191, 143, 1)",
  maxOpacity = 0.3,
  className,
}: FlickeringGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const parsedColor = (() => {
      const m = color.match(/rgba?\(([^)]+)\)/);
      if (!m) return { r: 95, g: 191, b: 143 };
      const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
      return { r: parts[0] ?? 95, g: parts[1] ?? 191, b: parts[2] ?? 143 };
    })();

    let cols = 0;
    let rows = 0;
    let squares: number[] = []; // current opacities
    let targets: number[] = []; // target opacities (animated towards)
    let rafId = 0;
    let last = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset before scaling
      ctx.scale(dpr, dpr);

      const cellSize = squareSize + gridGap;
      cols = Math.ceil(w / cellSize) + 1;
      rows = Math.ceil(h / cellSize) + 1;
      const count = cols * rows;
      squares = new Array(count).fill(0).map(() => Math.random() * maxOpacity);
      targets = squares.slice();
    };

    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw);
      const dt = last ? (now - last) / 1000 : 0;
      last = now;

      const w = container.clientWidth;
      const h = container.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const cellSize = squareSize + gridGap;
      const flickerPerSec = flickerChance;

      for (let i = 0; i < squares.length; i++) {
        // Occasionally pick a new target
        if (Math.random() < flickerPerSec * dt) {
          targets[i] = Math.random() * maxOpacity;
        }
        // Ease current toward target
        squares[i] += (targets[i] - squares[i]) * Math.min(1, dt * 4);

        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * cellSize;
        const y = row * cellSize;
        ctx.fillStyle = `rgba(${parsedColor.r}, ${parsedColor.g}, ${parsedColor.b}, ${squares[i].toFixed(3)})`;
        ctx.fillRect(x, y, squareSize, squareSize);
      }
    };

    setup();
    if (prefersReduced) {
      // Draw a single static frame for reduced-motion users
      const w = container.clientWidth;
      const h = container.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const cellSize = squareSize + gridGap;
      for (let i = 0; i < squares.length; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        ctx.fillStyle = `rgba(${parsedColor.r}, ${parsedColor.g}, ${parsedColor.b}, ${(maxOpacity * 0.4).toFixed(3)})`;
        ctx.fillRect(col * cellSize, row * cellSize, squareSize, squareSize);
      }
    } else {
      rafId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => {
      setup();
    });
    ro.observe(container);

    // Pause when off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          cancelAnimationFrame(rafId);
        } else if (!prefersReduced) {
          last = 0;
          rafId = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 },
    );
    io.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
    };
  }, [squareSize, gridGap, flickerChance, color, maxOpacity]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}

export default FlickeringGrid;
