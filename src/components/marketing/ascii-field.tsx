"use client";

import * as React from "react";

/**
 * Hero background — an interactive ASCII field. A slowly self-rotating ASCII
 * "moon" sphere (lit + cratered via value noise) sits centered in a streaming
 * horizontal particle field that bends around it and reacts to the cursor.
 * Adapted for our dark theme and gated for performance: the rAF loop pauses
 * when the hero scrolls off-screen, and prefers-reduced-motion renders a
 * single static frame.
 *
 * Adapted from the "Ascii Moon" reference; core noise + shading preserved.
 */

const MOON_CHARS =
  " `.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@";
const FIELD_CHARS = "  ..::--==++**##@@".split("");

const hash = (x: number, y: number) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
};
const smooth = (t: number) => t * t * (3 - 2 * t);
const noise2D = (x: number, y: number) => {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);
  const ux = smooth(fx);
  const uy = smooth(fy);
  return (
    a * (1 - ux) * (1 - uy) +
    b * ux * (1 - uy) +
    c * (1 - ux) * uy +
    d * ux * uy
  );
};
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

export function AsciiField({ paused = false }: { paused?: boolean }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  // `paused` is driven by the sticky hero once the next section covers it —
  // the rAF would otherwise run forever (a covered sticky element still counts
  // as "in viewport", so the IntersectionObserver never fires).
  const pausedRef = React.useRef(paused);
  pausedRef.current = paused;
  const restartRef = React.useRef<(() => void) | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The streaming field runs on its own, much slower clock than the sphere
    // so the two read as independent. Lower = slower field.
    const FIELD_SPEED = 0.1;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let time = 0;
    let fieldTime = 0;
    let rafId = 0;
    let visible = true;
    let mobile = false;
    let lastDraw = 0;
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      mobile = width < 768;
      // Mobile is fill-rate bound: cap DPR lower and render far fewer columns
      // (cell count scales ~cols²) so the per-frame fillText work drops enough
      // to hold a smooth framerate on phones.
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      cols = mobile ? 72 : 150;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const draw = (now = 0) => {
      // Reschedule first so throttled (skipped) frames still keep the loop
      // alive. IntersectionObserver restarts the loop when it returns to view.
      if (!reduce && visible && !pausedRef.current)
        rafId = requestAnimationFrame(draw);

      // Cap mobile at ~30fps — halves the canvas work on phones where the loop
      // is the main jank source. Motion is advanced by real elapsed time so the
      // perceived speed is identical regardless of the framerate cap.
      if (mobile && now && now - lastDraw < 31) return;
      const dt = lastDraw ? Math.min(now - lastDraw, 50) : 16;
      lastDraw = now;
      const step = now ? dt / 16 : 1;

      ctx.clearRect(0, 0, width, height);
      if (!reduce) {
        time += 0.012 * step;
        fieldTime += 0.012 * FIELD_SPEED * step;
      }

      const cellW = width / cols;
      const cellH = cellW * 1.18;
      rows = Math.ceil(height / cellH);

      const moonX = width * 0.5;
      const moonY = height * 0.46;
      const moonRadius = Math.min(width, height) * 0.26;

      ctx.font = `${cellH * 0.84}px ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let lx = 1.0;
      let ly = 0.15;
      let lz = -0.6;
      const lLen = Math.hypot(lx, ly, lz);
      lx /= lLen;
      ly /= lLen;
      lz /= lLen;

      // Overdraw a margin of cells past every edge so the streaming
      // horizontal offset never reveals an empty strip at the screen edges.
      for (let r = -3; r < rows + 3; r++) {
        const rowY = r * cellH + cellH / 2;
        const laneNorm = rowY / height;
        const laneSpeed = 1.75;

        for (let c = -5; c < cols + 5; c++) {
          const x = c * cellW + cellW / 2;
          const y = rowY;

          const dxMoon = x - moonX;
          const dyMoon = y - moonY;
          const distMoon = Math.hypot(dxMoon, dyMoon);
          const normMoon = distMoon / moonRadius;
          const angleMoon = Math.atan2(dyMoon, dxMoon);

          const mouseDistance = Math.hypot(x - mouse.x, y - mouse.y);
          const mouseField = Math.exp(-mouseDistance * 0.0032);

          let char = "";
          let opacity = 0;
          let drawX = x;
          let drawY = y;
          let tint = false; // signal-green accent on the moon's lit limb

          if (normMoon < 1.0) {
            const localX = dxMoon / moonRadius;
            const localY = -(y - moonY) / moonRadius;
            const localR2 = localX * localX + localY * localY;
            const z = Math.sqrt(Math.max(0, 1.0 - localR2));

            const angle = time * 0.72;
            const px = localX * Math.cos(angle) - z * Math.sin(angle);
            const py = localY;
            const pz = localX * Math.sin(angle) + z * Math.cos(angle);

            let diffuse = px * lx + py * ly + pz * lz;
            diffuse = Math.max(0, diffuse);

            const maria =
              noise2D(px * 2.6 + 4.2, py * 2.6 - 1.7) * 0.6 +
              noise2D(pz * 3.4 - 8.1, py * 3.4 + 5.4) * 0.4;
            const craters =
              noise2D(px * 12.0 + py * 6.0 + 30.0, pz * 12.0 - px * 4.0 - 20.0) *
                0.65 +
              noise2D(px * 20.0 - 11.0, py * 20.0 + 7.0) * 0.35;

            const albedo = clamp(0.76 + craters * 0.14 - maria * 0.18, 0.52, 0.92);

            if (diffuse > 0 && diffuse < 0.15) {
              diffuse += Math.sin(px * 50 + py * 50) * 0.03;
              diffuse = Math.max(0, diffuse);
            }

            const ambient = 0.015;
            const intensity = ambient + diffuse * albedo * 1.3;
            const moonIdx = clamp(
              Math.floor(intensity * (MOON_CHARS.length - 1)),
              0,
              MOON_CHARS.length - 1,
            );
            char = MOON_CHARS[moonIdx];
            opacity = clamp(0.2 + intensity * 0.82, 0.2, 1);
            // faint green terminator on the bright limb for brand colour
            tint = intensity > 0.62 && intensity < 0.95;

            const edgeBend = Math.exp(-Math.abs(normMoon - 1.0) * 8) * 4;
            drawX += -Math.sin(angleMoon) * edgeBend;
            drawY += Math.cos(angleMoon) * edgeBend * 0.4;
            drawX += Math.sin(time * 3.6 + r * 0.32 + c * 0.11) * mouseField * 16;
            drawY += Math.cos(time * 2.8 + c * 0.24) * mouseField * 5;
          } else {
            const sampleX =
              c * 0.085 -
              fieldTime * (1.3 + laneSpeed * 1.0) +
              Math.sin(time * 4.2 + r * 0.28 + c * 0.08) * mouseField * 1.8;
            const sampleY =
              r * 0.11 +
              Math.sin(c * 0.025 + fieldTime * 1.2) * 0.6 +
              Math.cos(time * 3.4 + c * 0.2) * mouseField * 1.1;

            const flowA = noise2D(sampleX, sampleY);
            const flowB = noise2D(sampleX * 1.7 + 20, sampleY * 0.8 - 14);
            const wave =
              Math.sin(sampleX * 1.9 + laneNorm * 14) * 0.5 +
              Math.cos(sampleY * 2.4 - fieldTime * 2.1) * 0.5;

            let density = flowA * 0.42 + flowB * 0.28 + (wave * 0.5 + 0.5) * 0.3;
            const orbitBand = Math.exp(-Math.pow((normMoon - 1.12) * 5.5, 2));
            density += orbitBand * 0.16;
            // Cursor bloom: the pointer reveals denser, brighter characters so
            // it leaves a visible signal-green wake even when the field itself
            // is nearly frozen. This is what makes the hero feel interactive.
            density += mouseField * 0.5;

            if (density > 0.38) {
              const fieldIdx = clamp(
                Math.floor(density * (FIELD_CHARS.length - 1)),
                0,
                FIELD_CHARS.length - 1,
              );
              char = FIELD_CHARS[fieldIdx];
              opacity = 0.03 + density * 0.2 + mouseField * 0.28;
              // Green on the orbiting ring AND in the cursor's wake.
              tint = orbitBand > 0.5 || mouseField > 0.32;

              // Bounded sub-cell jitter only — no large horizontal travel, so
              // characters stay on their grid and never leave an edge strip.
              drawX += (flowB - 0.5) * 3;
              drawY += Math.sin(sampleX * 2.2 + fieldTime + laneNorm * 8) * 1.8;
              const swirl = orbitBand * 10;
              drawX += -Math.sin(angleMoon) * swirl;
              drawY += Math.cos(angleMoon) * swirl * 0.6;
              drawX += Math.sin(time * 4.8 + r * 0.35 + c * 0.1) * mouseField * 18;
              drawY += Math.cos(time * 3.2 + c * 0.25) * mouseField * 6;
            }
          }

          if (!char || opacity <= 0.02) continue;
          ctx.fillStyle = tint
            ? `rgba(120, 220, 170, ${opacity})`
            : `rgba(228, 232, 231, ${opacity})`;
          ctx.fillText(char, drawX, drawY);
        }
      }
    };

    // Single gate: run only while on-screen AND not covered (paused). Resets
    // the frame timer so resume doesn't jump the motion.
    const maybeRun = () => {
      if (reduce) return;
      cancelAnimationFrame(rafId);
      if (visible && !pausedRef.current) {
        lastDraw = 0;
        rafId = requestAnimationFrame(draw);
      }
    };
    restartRef.current = maybeRun;

    // Pause the loop when the hero scrolls out of view.
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        maybeRun();
      },
      { threshold: 0 },
    );

    const start = () => {
      resize();
      io.observe(canvas);
      if (reduce) draw();
      else maybeRun();
    };

    if (document.fonts?.ready) document.fonts.ready.then(start);
    else start();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      restartRef.current = null;
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Start/stop the loop when the covered (paused) state flips.
  React.useEffect(() => {
    restartRef.current?.();
  }, [paused]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 block size-full"
    />
  );
}
