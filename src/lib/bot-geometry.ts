/**
 * Bot faces as data, with no React in it (DESIGN.md §7.21).
 *
 * `ui/bot-look.tsx` draws these with CSS variables so a look can change live in
 * the customiser. The OG renderer and the brand-asset script need the same
 * drawing as a string with literal colours, because neither Satori nor a
 * downloaded SVG can resolve `var(--bot-disc)`.
 *
 * Both read the primitives below, so there is one definition of what a bot
 * looks like and no chance of the downloads drifting from the site.
 */

export type BotColor =
  | "graphite" | "coral" | "amber" | "lime" | "teal" | "sky" | "violet" | "pink";
export type BotShape = "pebble" | "round" | "squircle" | "capsule" | "blob";
export type BotEyes = "pill" | "dots" | "visor" | "round" | "arcs";
export type BotAccessory = "none" | "antenna" | "headset" | "beanie" | "glasses";

/** Which palette slot a primitive paints with. */
export type Paint = "disc" | "ring" | "faceInk" | "none";

export type Primitive =
  | { el: "path"; d: string; fill?: Paint; stroke?: Paint; w?: number; cap?: boolean; join?: boolean; hairline?: boolean }
  | { el: "circle"; cx: number; cy: number; r: number; fill?: Paint; stroke?: Paint; w?: number }
  | { el: "rect"; x: number; y: number; width: number; height: number; rx: number; fill?: Paint; stroke?: Paint; w?: number };

/** The viewBox leaves room above for antennas and pom-poms. */
export const BOT_VIEWBOX = "-8 -16 116 116";

export const BODY: Record<BotShape, string> = {
  pebble: "M50 4 C85 4 96 15 96 50 C96 85 85 96 50 96 C15 96 4 85 4 50 C4 15 15 4 50 4 Z",
  round: "M50 4 A46 46 0 1 1 49.99 4 Z",
  squircle: "M30 6 H70 A24 24 0 0 1 94 30 V70 A24 24 0 0 1 70 94 H30 A24 24 0 0 1 6 70 V30 A24 24 0 0 1 30 6 Z",
  capsule: "M50 3 C71 3 84 17 84 38 V62 C84 83 71 97 50 97 C29 97 16 83 16 62 V38 C16 17 29 3 50 3 Z",
  blob: "M54 5 C80 7 96 26 94 52 C92 79 72 96 46 94 C20 92 4 72 7 47 C10 22 29 3 54 5 Z",
};

export const bodyPrimitive = (shape: BotShape): Primitive => ({
  el: "path",
  d: BODY[shape],
  fill: "disc",
  stroke: "ring",
  w: 1.5,
  hairline: true,
});

/** The ✓ that replaces the eyes on a happy or celebrating bot. */
const HAPPY: Primitive[] = [
  { el: "path", d: "M33 45 L45 56 L67 34", fill: "none", stroke: "faceInk", w: 7, cap: true, join: true },
];

const EYES: Record<BotEyes, Primitive[]> = {
  pill: [{ el: "rect", x: 31, y: 37.5, width: 38, height: 13, rx: 6.5, fill: "faceInk" }],
  dots: [
    { el: "circle", cx: 37, cy: 44, r: 6.5, fill: "faceInk" },
    { el: "circle", cx: 63, cy: 44, r: 6.5, fill: "faceInk" },
  ],
  visor: [{ el: "rect", x: 20, y: 36, width: 60, height: 16, rx: 8, fill: "faceInk" }],
  round: [{ el: "circle", cx: 50, cy: 44, r: 11, fill: "faceInk" }],
  arcs: [
    { el: "path", d: "M28 49 Q37 35 46 49", fill: "none", stroke: "faceInk", w: 6, cap: true },
    { el: "path", d: "M54 49 Q63 35 72 49", fill: "none", stroke: "faceInk", w: 6, cap: true },
  ],
};

export const eyePrimitives = (eyes: BotEyes, happy = false): Primitive[] =>
  happy ? HAPPY : EYES[eyes];

const ACCESSORIES: Record<Exclude<BotAccessory, "none">, Primitive[]> = {
  antenna: [
    { el: "path", d: "M50 6 V-6", fill: "none", stroke: "disc", w: 5, cap: true },
    { el: "circle", cx: 50, cy: -9, r: 6, fill: "disc", stroke: "ring", w: 1.5 },
  ],
  headset: [
    { el: "path", d: "M10 46 C10 6 90 6 90 46", fill: "none", stroke: "faceInk", w: 5, cap: true },
    { el: "rect", x: 2, y: 38, width: 12, height: 22, rx: 5, fill: "faceInk" },
    { el: "rect", x: 86, y: 38, width: 12, height: 22, rx: 5, fill: "faceInk" },
    { el: "path", d: "M92 60 C92 74 80 78 68 76", fill: "none", stroke: "faceInk", w: 4, cap: true },
  ],
  beanie: [
    { el: "path", d: "M10 30 C10 -2 90 -2 90 30 Z", fill: "faceInk" },
    { el: "rect", x: 8, y: 24, width: 84, height: 10, rx: 5, fill: "faceInk" },
    { el: "circle", cx: 50, cy: -3, r: 7, fill: "faceInk" },
  ],
  glasses: [
    { el: "circle", cx: 35, cy: 44, r: 12, fill: "none", stroke: "faceInk", w: 4 },
    { el: "circle", cx: 65, cy: 44, r: 12, fill: "none", stroke: "faceInk", w: 4 },
    { el: "path", d: "M47 43 Q50 40 53 43", fill: "none", stroke: "faceInk", w: 4 },
  ],
};

/** Accessories are hidden under 20px, where they are only noise. */
export const accessoryPrimitives = (accessory: BotAccessory, size: number): Primitive[] =>
  accessory === "none" || size < 20 ? [] : ACCESSORIES[accessory];

export type BotLookData = {
  color: BotColor;
  shape: BotShape;
  eyes: BotEyes;
  accessory: BotAccessory;
};

/** Every primitive for one bot, in paint order. */
export function botPrimitives(look: BotLookData, { size = 100, happy = false } = {}): Primitive[] {
  return [
    bodyPrimitive(look.shape),
    ...eyePrimitives(look.eyes, happy),
    ...accessoryPrimitives(look.accessory, size),
  ];
}

/* ------------------------------ string drawing ----------------------------- */

export type Palette = { disc: string; ring: string; faceInk: string };

const attr = (name: string, value: string | number | undefined) =>
  value === undefined ? "" : ` ${name}="${value}"`;

function paint(role: Paint | undefined, palette: Palette): string | undefined {
  if (role === undefined) return undefined;
  if (role === "none") return "none";
  return palette[role];
}

/** One primitive as an SVG element string. */
export function primitiveToSvg(p: Primitive, palette: Palette): string {
  const common =
    attr("fill", paint(p.fill, palette)) +
    attr("stroke", paint(p.stroke, palette)) +
    attr("stroke-width", p.w) +
    ("cap" in p && p.cap ? ' stroke-linecap="round"' : "") +
    ("join" in p && p.join ? ' stroke-linejoin="round"' : "");

  switch (p.el) {
    case "path":
      return `<path d="${p.d}"${common}/>`;
    case "circle":
      return `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r}"${common}/>`;
    case "rect":
      return `<rect x="${p.x}" y="${p.y}" width="${p.width}" height="${p.height}" rx="${p.rx}"${common}/>`;
  }
}

/**
 * A complete standalone SVG of one bot, in literal colours.
 *
 * `size` decides whether the accessory is drawn, exactly as on the site.
 */
export function botSvg(
  look: BotLookData,
  palette: Palette,
  { size = 256, happy = false, label }: { size?: number; happy?: boolean; label?: string } = {},
): string {
  const body = botPrimitives(look, { size, happy })
    .map((p) => primitiveToSvg(p, palette))
    .join("");
  const name = label ? ` role="img" aria-label="${label}"` : ' aria-hidden="true"';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" ` +
    `viewBox="${BOT_VIEWBOX}"${name}>${body}</svg>`
  );
}
