import * as React from "react";
import { cn } from "@/lib/utils";
import { LOGO_GEOMETRY, RING, gapFor, logoSvgInner } from "@/lib/logo-geometry";

export { LOGO_GEOMETRY, logoSvgInner };

/**
 * The Bonggy logo: the planet mark (DESIGN.md §7). Paths and proportions are
 * the original artwork, unchanged. It's monochrome: planet and ring in
 * currentColor, the highlight in the page colour at 45%, and a thin
 * page-coloured gap where the front arc crosses the planet so the ring
 * stays readable in one colour. No glow.
 *
 * `ring` thickens the ring for icon sizes (the favicon and apple icon use
 * 12/256 so it survives at 16px); everywhere else it's the original 4.
 */


export function LogoMark({
  className,
  ring = 4,
  page = "var(--background)",
  title,
}: {
  className?: string;
  ring?: number;
  /** The colour behind the mark (for the highlight and the ring gap). */
  page?: string;
  title?: string;
}) {
  const g = LOGO_GEOMETRY;
  const gap = gapFor(ring);
  return (
    <svg
      viewBox={g.viewBox}
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={g.backArc} fill="none" stroke="currentColor" strokeWidth={ring} strokeLinecap="round" />
      <circle cx={g.planet.cx} cy={g.planet.cy} r={g.planet.r} fill="currentColor" />
      <ellipse
        cx={g.highlight.cx}
        cy={g.highlight.cy}
        rx={g.highlight.rx}
        ry={g.highlight.ry}
        fill={page}
        opacity={0.45}
        transform={g.highlight.rotate}
      />
      <path d={g.frontArc} fill="none" stroke={page} strokeWidth={gap} strokeLinecap="round" />
      <path d={g.frontArc} fill="none" stroke="currentColor" strokeWidth={ring} strokeLinecap="round" />
    </svg>
  );
}

/** Logo lockup: the planet mark with the "Bonggy" wordmark (Geist 500). */
export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-foreground", className)}>
      {/* At 24px the original 4/256 ring breaks into a dotted hairline, so small
          marks use the icons' heavier 12/256 ring (DESIGN.md §7.1). */}
      <LogoMark ring={RING.ui} className={cn("size-6", markClassName)} />
      <span className="text-[1.0625rem] font-medium leading-none tracking-[-0.02em]">Bonggy</span>
    </span>
  );
}

/** Static mark with explicit colours, for next/og images (no currentColor). */
export function LogoSvg({ size, ink, page, ring = 4 }: { size: number; ink: string; page: string; ring?: number }) {
  const g = LOGO_GEOMETRY;
  const gap = gapFor(ring);
  return (
    <svg width={size} height={size} viewBox={g.viewBox} xmlns="http://www.w3.org/2000/svg">
      <path d={g.backArc} fill="none" stroke={ink} strokeWidth={ring} strokeLinecap="round" />
      <circle cx={g.planet.cx} cy={g.planet.cy} r={g.planet.r} fill={ink} />
      <ellipse cx={g.highlight.cx} cy={g.highlight.cy} rx={g.highlight.rx} ry={g.highlight.ry} fill={page} opacity={0.45} transform={g.highlight.rotate} />
      <path d={g.frontArc} fill="none" stroke={page} strokeWidth={gap} strokeLinecap="round" />
      <path d={g.frontArc} fill="none" stroke={ink} strokeWidth={ring} strokeLinecap="round" />
    </svg>
  );
}
