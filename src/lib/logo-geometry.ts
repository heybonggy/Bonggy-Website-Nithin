/**
 * The planet mark's geometry, with no React in it (DESIGN.md §7.1).
 *
 * The paths and proportions are the original artwork. This file has no JSX and
 * no imports, so the brand-asset build script can read the same numbers the
 * components draw: every icon, OG image and downloadable file comes from here,
 * and none of them is hand-drawn.
 */

export const LOGO_GEOMETRY = {
  viewBox: "0 0 256 256",
  backArc: "M 220.7 90.5 A 100 32 -22 0 0 35.3 165.5",
  frontArc: "M 220.7 90.5 A 100 32 -22 0 1 35.3 165.5",
  planet: { cx: 128, cy: 128, r: 75 },
  highlight: { cx: 106, cy: 96, rx: 22, ry: 9, rotate: "rotate(-18 106 96)" },
} as const;

/**
 * Ring weights, by where the mark is drawn (DESIGN.md §7.1).
 *
 * The artwork's own ring is 4/256. It breaks into a dotted hairline below about
 * 32px, so icons thicken it: 14 at 48px and up, 16 at 16 and 32, where a whole
 * pixel of the ring is at stake.
 */
export const RING = { art: 4, ui: 12, icon: 14, iconSmall: 16 } as const;

/** The page-coloured gap that keeps the front arc readable in one colour. */
export const gapFor = (ring: number) => ring + Math.max(4, ring * 0.9);

/** The mark's inner SVG, for places that need a string (icons, OG, exports). */
export function logoSvgInner({
  ink,
  page,
  ring = RING.art,
}: {
  ink: string;
  page: string;
  ring?: number;
}) {
  const g = LOGO_GEOMETRY;
  const gap = gapFor(ring);
  return [
    `<path d="${g.backArc}" fill="none" stroke="${ink}" stroke-width="${ring}" stroke-linecap="round"/>`,
    `<circle cx="${g.planet.cx}" cy="${g.planet.cy}" r="${g.planet.r}" fill="${ink}"/>`,
    `<ellipse cx="${g.highlight.cx}" cy="${g.highlight.cy}" rx="${g.highlight.rx}" ry="${g.highlight.ry}" fill="${page}" opacity="0.45" transform="${g.highlight.rotate}"/>`,
    `<path d="${g.frontArc}" fill="none" stroke="${page}" stroke-width="${gap}" stroke-linecap="round"/>`,
    `<path d="${g.frontArc}" fill="none" stroke="${ink}" stroke-width="${ring}" stroke-linecap="round"/>`,
  ].join("");
}

/** A complete standalone SVG document of the mark. */
export function logoSvgDocument({
  ink,
  page,
  ring = RING.art,
  label = "Bonggy",
}: {
  ink: string;
  page: string;
  ring?: number;
  label?: string;
}) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_GEOMETRY.viewBox}" role="img" aria-label="${label}">` +
    logoSvgInner({ ink, page, ring }) +
    `</svg>`
  );
}

/**
 * The paper tile: a full-bleed white square with the mark centred on it.
 *
 * Raster icons are opaque so they read on dark surfaces. A transparent PNG
 * drawn in ink disappears against a dark tab strip or launcher, which is what
 * the old 48px favicon did.
 */
export const PAPER = "#ffffff";
export const INK = "#0a0a0a";

/** How much of the tile the planet fills, by icon size. */
export const tileScale = (size: number) => (size <= 32 ? 0.92 : 0.84);

export function paperTileSvg(size: number, ring?: number) {
  const scale = tileScale(size);
  const inner = 256 * scale;
  const offset = (256 - inner) / 2;
  const weight = ring ?? (size <= 32 ? RING.iconSmall : RING.icon);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 256 256">` +
    `<rect width="256" height="256" fill="${PAPER}"/>` +
    `<g transform="translate(${offset} ${offset}) scale(${scale})">` +
    logoSvgInner({ ink: INK, page: PAPER, ring: weight }) +
    `</g></svg>`
  );
}
