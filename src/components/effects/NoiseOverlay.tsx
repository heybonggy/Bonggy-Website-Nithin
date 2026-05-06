import { useEffect, useRef } from "react";

export function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame: number;
    const w = 256;
    const h = 256;
    canvas.width = w;
    canvas.height = h;

    const draw = () => {
      const idata = ctx.createImageData(w, h);
      const buf = idata.data;
      for (let i = 0; i < buf.length; i += 4) {
        const v = Math.random() * 255;
        buf[i] = v;
        buf[i + 1] = v;
        buf[i + 2] = v;
        buf[i + 3] = 18; // very low opacity
      }
      ctx.putImageData(idata, 0, 0);
      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.035] mix-blend-overlay"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
