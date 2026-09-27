import * as React from "react";

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

const BODY: Record<BotShape, string> = {
  pebble: "M50 4 C85 4 96 15 96 50 C96 85 85 96 50 96 C15 96 4 85 4 50 C4 15 15 4 50 4 Z",
  round: "M50 4 A46 46 0 1 1 49.99 4 Z",
  squircle: "M30 6 H70 A24 24 0 0 1 94 30 V70 A24 24 0 0 1 70 94 H30 A24 24 0 0 1 6 70 V30 A24 24 0 0 1 30 6 Z",
  capsule: "M50 3 C71 3 84 17 84 38 V62 C84 83 71 97 50 97 C29 97 16 83 16 62 V38 C16 17 29 3 50 3 Z",
  blob: "M54 5 C80 7 96 26 94 52 C92 79 72 96 46 94 C20 92 4 72 7 47 C10 22 29 3 54 5 Z",
};

function Eyes({ eyes, happy }: { eyes: BotEyes; happy: boolean }) {
  const ink = "var(--bot-face-ink)";
  if (happy) {
    return (
      <path className="bot-eye" d="M33 45 L45 56 L67 34" fill="none" stroke={ink} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
    );
  }
  switch (eyes) {
    case "dots":
      return (
        <g className="bot-eye" fill={ink}>
          <circle cx={37} cy={44} r={6.5} />
          <circle cx={63} cy={44} r={6.5} />
        </g>
      );
    case "visor":
      return <rect className="bot-eye" x={20} y={36} width={60} height={16} rx={8} fill={ink} />;
    case "round":
      return <circle className="bot-eye" cx={50} cy={44} r={11} fill={ink} />;
    case "arcs":
      return (
        <g className="bot-eye" fill="none" stroke={ink} strokeWidth={6} strokeLinecap="round">
          <path d="M28 49 Q37 35 46 49" />
          <path d="M54 49 Q63 35 72 49" />
        </g>
      );
    default:
      return <rect className="bot-eye" x={31} y={37.5} width={38} height={13} rx={6.5} fill={ink} />;
  }
}

function Accessory({ accessory }: { accessory: BotAccessory }) {
  const ink = "var(--bot-face-ink)";
  switch (accessory) {
    case "antenna":
      return (
        <g className="bot-acc">
          <path d="M50 6 V-6" stroke="var(--bot-disc)" strokeWidth={5} strokeLinecap="round" />
          <circle cx={50} cy={-9} r={6} fill="var(--bot-disc)" stroke="var(--bot-ring)" strokeWidth={1.5} />
        </g>
      );
    case "headset":
      return (
        <g className="bot-acc" fill="none" stroke={ink} strokeWidth={5} strokeLinecap="round">
          <path d="M10 46 C10 6 90 6 90 46" />
          <rect x={2} y={38} width={12} height={22} rx={5} fill={ink} stroke="none" />
          <rect x={86} y={38} width={12} height={22} rx={5} fill={ink} stroke="none" />
          <path d="M92 60 C92 74 80 78 68 76" strokeWidth={4} />
        </g>
      );
    case "beanie":
      return (
        <g className="bot-acc">
          <path d="M10 30 C10 -2 90 -2 90 30 Z" fill={ink} />
          <rect x={8} y={24} width={84} height={10} rx={5} fill={ink} />
          <circle cx={50} cy={-3} r={7} fill={ink} />
        </g>
      );
    case "glasses":
      return (
        <g className="bot-acc" fill="none" stroke={ink} strokeWidth={4}>
          <circle cx={35} cy={44} r={12} />
          <circle cx={65} cy={44} r={12} />
          <path d="M47 43 Q50 40 53 43" />
        </g>
      );
    default:
      return null;
  }
}

/**
 * Draws a bot face. `happy` swaps the eyes for the ✓ (happy / celebrate).
 * The viewBox leaves room above for antennas and pom-poms.
 */
export function BotFace({ look, happy = false, size }: { look: BotLook; happy?: boolean; size: number }) {
  const showAcc = size >= 20 && look.accessory !== "none";
  return (
    <svg viewBox="-8 -16 116 116" className="block size-full overflow-visible" style={botColorVars(look.color)}>
      <path d={BODY[look.shape]} fill="var(--bot-disc)" stroke="var(--bot-ring)" strokeWidth={2.5} />
      <Eyes eyes={look.eyes} happy={happy} />
      {showAcc ? <Accessory accessory={look.accessory} /> : null}
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
