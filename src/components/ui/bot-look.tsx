import * as React from "react";
import {
  BOT_VIEWBOX,
  botPrimitives,
  type Palette,
  type Primitive,
} from "@/lib/bot-geometry";

/**
 * Bot looks (DESIGN.md §7.21): a colour, a body shape, eyes and an
 * accessory, drawn as SVG. Colour lives only on bots; page chrome stays
 * grayscale. The default is our mascot: graphite pebble with a pill eye.
 */

export const BOT_COLORS = ["graphite", "coral", "amber", "lime", "teal", "sky", "violet", "pink"] as const;
export const BOT_SHAPES = ["pebble", "round", "squircle", "capsule", "blob"] as const;
export const BOT_EYES = ["pill", "dots", "visor", "round", "arcs"] as const;
export const BOT_ACCESSORIES = ["none", "antenna", "headset", "beanie", "glasses"] as const;

export type BotColor = (typeof BOT_COLORS)[number];
export type BotShape = (typeof BOT_SHAPES)[number];
export type BotEyes = (typeof BOT_EYES)[number];
export type BotAccessory = (typeof BOT_ACCESSORIES)[number];
export type BotLook = { color: BotColor; shape: BotShape; eyes: BotEyes; accessory: BotAccessory };

export const DEFAULT_LOOK: BotLook = { color: "graphite", shape: "pebble", eyes: "pill", accessory: "none" };

/** CSS variables for a colour: disc, ink (text in that colour), tint, face. */
export const botColorVars = (c: BotColor) =>
  ({
    "--bot-disc": `var(--bot-${c}-disc)`,
    "--bot-ink": `var(--bot-${c}-ink)`,
    "--bot-tint": `var(--bot-${c}-tint)`,
    "--bot-face-ink": `var(--bot-${c}-face)`,
    "--bot-ring": `var(--bot-${c}-ring)`,
  }) as React.CSSProperties;

/** The CSS variable each palette slot resolves to while on the site. */
const CSS_PALETTE: Palette = {
  disc: "var(--bot-disc)",
  ring: "var(--bot-ring)",
  faceInk: "var(--bot-face-ink)",
};

/** One primitive as a React element, painted through the CSS variables. */
function Draw({ p, index }: { p: Primitive; index: number }) {
  const fill = p.fill === undefined ? undefined : p.fill === "none" ? "none" : CSS_PALETTE[p.fill];
  const stroke = p.stroke === undefined ? undefined : p.stroke === "none" ? "none" : CSS_PALETTE[p.stroke];
  const common = {
    fill,
    stroke,
    strokeWidth: p.w,
    strokeLinecap: "cap" in p && p.cap ? ("round" as const) : undefined,
    strokeLinejoin: "join" in p && p.join ? ("round" as const) : undefined,
    // The body's hairline stays 1.5px however large the avatar is drawn.
    vectorEffect: "hairline" in p && p.hairline ? ("non-scaling-stroke" as const) : undefined,
  };

  switch (p.el) {
    case "path":
      return <path key={index} d={p.d} {...common} />;
    case "circle":
      return <circle key={index} cx={p.cx} cy={p.cy} r={p.r} {...common} />;
    case "rect":
      return <rect key={index} x={p.x} y={p.y} width={p.width} height={p.height} rx={p.rx} {...common} />;
  }
}

/**
 * Draws a bot face. `happy` swaps the eyes for the ✓ (happy / celebrate).
 * The viewBox leaves room above for antennas and pom-poms.
 */
export function BotFace({ look, happy = false, size }: { look: BotLook; happy?: boolean; size: number }) {
  return (
    <svg viewBox={BOT_VIEWBOX} className="block size-full overflow-visible" style={botColorVars(look.color)}>
      {botPrimitives(look, { size, happy }).map((p, i) => (
        <Draw key={i} p={p} index={i} />
      ))}
    </svg>
  );
}

/** Human-readable option names for the customiser. */
export const LOOK_LABELS = {
  color: { graphite: "Graphite", coral: "Coral", amber: "Amber", lime: "Lime", teal: "Teal", sky: "Sky", violet: "Violet", pink: "Pink" },
  shape: { pebble: "Pebble", round: "Round", squircle: "Squircle", capsule: "Capsule", blob: "Blob" },
  eyes: { pill: "Pill", dots: "Dots", visor: "Visor", round: "Round", arcs: "Happy" },
  accessory: { none: "None", antenna: "Antenna", headset: "Headset", beanie: "Beanie", glasses: "Glasses" },
} as const;
