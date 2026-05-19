"use client";

import { useEffect, useRef } from "react";

type FluidParticlesBackgroundProps = {
  className?: string;
  particleCount?: number;
  noiseIntensity?: number;
  particleSize?: { min: number; max: number };
  /** Container is sized to its parent (not window). Pass false to keep full-viewport behavior. */
  fitParent?: boolean;
};

// Compact Perlin-noise implementation (3D simplex). One instance per component.
function createNoise() {
  const permutation = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
    36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120,
    234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71,
    134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133,
    230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161,
    1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130,
    116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250,
    124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227,
    47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44,
    154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98,
    108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34,
    242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14,
    239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121,
    50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243,
    141, 128, 195, 78, 66, 215, 61, 156, 180,
  ];
  const p = new Array(512);
  for (let i = 0; i < 256; i++) p[256 + i] = p[i] = permutation[i];

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (t: number, a: number, b: number) => a + t * (b - a);
  const grad = (hash: number, x: number, y: number, z: number) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };

  return {
    simplex3(x: number, y: number, z: number) {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;
      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);
      const u = fade(x);
      const v = fade(y);
      const w = fade(z);
      const A = p[X] + Y;
      const AA = p[A] + Z;
      const AB = p[A + 1] + Z;
      const B = p[X + 1] + Y;
      const BA = p[B] + Z;
      const BB = p[B + 1] + Z;
      return lerp(
        w,
        lerp(
          v,
          lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
          lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))
        ),
        lerp(
          v,
          lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
          lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))
        )
      );
    },
  };
}

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export function FluidParticlesBackground({
  className,
  particleCount = 500,
  noiseIntensity = 0.0035,
  particleSize = { min: 0.4, max: 1.1 },
  fitParent = true,
}: FluidParticlesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const noise = createNoise();
    let rafId = 0;
    let visible = true;
    let particles: Particle[] = [];

    // Scroll-driven parallax + viewport-progress fade.
    let scrollTicking = false;
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // progress: 0 when section's top edge enters from bottom of viewport,
        // 1 when section's bottom edge has scrolled past viewport top.
        const total = rect.height + vh;
        const traveled = Math.max(0, Math.min(total, vh - rect.top));
        const progress = traveled / total;
        // Fade in over the first 20%, hold (capped peak), fade out over the last 25%.
        // Peak cap keeps the field as ambient texture, not a foreground element.
        const PEAK = 0.6;
        const opacity =
          progress < 0.2
            ? (progress / 0.2) * PEAK
            : progress > 0.75
            ? Math.max(0, ((1 - progress) / 0.25) * PEAK)
            : PEAK;
        container.style.setProperty("--fluid-progress", progress.toFixed(3));
        container.style.opacity = opacity.toFixed(3);
        scrollTicking = false;
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = fitParent ? container.clientWidth : window.innerWidth;
      const h = fitParent ? container.clientHeight : window.innerHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      // Re-seed particles for the new size
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * (particleSize.max - particleSize.min) + particleSize.min,
        vx: 0,
        vy: 0,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 50,
      }));
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!visible) return;

      const w = fitParent ? container.clientWidth : window.innerWidth;
      const h = fitParent ? container.clientHeight : window.innerHeight;

      // Fast trail decay — particles leave only a brief glow tail, no rope-like buildup.
      ctx.fillStyle = "rgba(10, 10, 10, 0.32)";
      ctx.fillRect(0, 0, w, h);

      const t = Date.now() * 0.0001;
      for (const particle of particles) {
        particle.life += 1;
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * w;
          particle.y = Math.random() * h;
        }

        const opacity = Math.sin((particle.life / particle.maxLife) * Math.PI) * 0.32;
        const n = noise.simplex3(particle.x * noiseIntensity, particle.y * noiseIntensity, t);
        const angle = n * Math.PI * 4;
        particle.vx = Math.cos(angle) * 1.8;
        particle.vy = Math.sin(angle) * 1.8;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = w;
        if (particle.x > w) particle.x = 0;
        if (particle.y < 0) particle.y = h;
        if (particle.y > h) particle.y = 0;

        // Mix mint + brand emerald based on lifetime phase for subtle hue shift
        const useMint = particle.life > particle.maxLife * 0.5;
        ctx.fillStyle = useMint
          ? `rgba(155, 232, 196, ${opacity.toFixed(3)})`
          : `rgba(95, 191, 143, ${opacity.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    onScroll(); // initial scroll-progress sync
    window.addEventListener("scroll", onScroll, { passive: true });

    if (prefersReduced) {
      // No animated frames, but still wire up scroll listener for fade behavior
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }
    rafId = requestAnimationFrame(animate);

    const ro = new ResizeObserver(resize);
    if (fitParent) ro.observe(container);
    else window.addEventListener("resize", resize);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (!fitParent) window.removeEventListener("resize", resize);
    };
  }, [particleCount, noiseIntensity, particleSize.min, particleSize.max, fitParent]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        // Opacity is updated per-scroll via inline style; CSS transition smooths frame-to-frame jumps.
        transition: "opacity 200ms linear",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          // Soft blur + light brightness boost turns dots into scattered glow specks
          // without smearing them into dense ropes.
          filter: "blur(0.6px) brightness(1.1) saturate(1.05)",
          // Parallax: shifts canvas vertically ±40px as section travels through viewport.
          transform:
            "translateY(calc((var(--fluid-progress, 0.5) - 0.5) * 80px))",
          transition: "transform 120ms linear",
        }}
      />
    </div>
  );
}

export default FluidParticlesBackground;
