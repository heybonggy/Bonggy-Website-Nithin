/* eslint-disable @next/next/no-img-element -- Satori renders a plain <img>;
   next/image does not exist inside an OG image tree. */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { LOGO_GEOMETRY, RING, gapFor } from "@/lib/logo-geometry";
import { botSvg, type BotLookData } from "@/lib/bot-geometry";
import { paletteFor } from "@/content/bot-palette";
import { CATALOG, FLOW_PART_LABELS, type CatalogBot } from "@/content/bots";

/**
 * One OG renderer for every page (DESIGN.md §2: ink on paper, colour only on
 * bots). 1200×630, white, with the planet lockup, a grey kicker and the
 * headline in two tones.
 *
 * Geist 500 is loaded from the repo and passed to ImageResponse. There is no
 * system-ui fallback on purpose: Satori would otherwise silently substitute a
 * font, and the previews would come out in whatever the build box had.
 */

export const OG_SIZE = { width: 1200, height: 630 };

const INK = "#0a0a0a";
const GREY = "#6b6b6b";
const FOOT = "#525252";
const PAPER = "#ffffff";

let fontCache: ArrayBuffer | null = null;

async function geist(): Promise<ArrayBuffer> {
  if (fontCache) return fontCache;
  const buf = await readFile(join(process.cwd(), "src/assets/fonts/Geist-Medium.ttf"));
  fontCache = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  return fontCache;
}

/** A data: URL, because Satori draws images but not inline SVG children. */
const svgUrl = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

/** The planet mark as an <img>, at whatever size the layout needs. */
function markUrl(size: number) {
  const g = LOGO_GEOMETRY;
  const ring = size <= 32 ? RING.iconSmall : RING.icon;
  const gap = gapFor(ring);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${g.viewBox}">` +
    `<path d="${g.backArc}" fill="none" stroke="${INK}" stroke-width="${ring}" stroke-linecap="round"/>` +
    `<circle cx="${g.planet.cx}" cy="${g.planet.cy}" r="${g.planet.r}" fill="${INK}"/>` +
    `<ellipse cx="${g.highlight.cx}" cy="${g.highlight.cy}" rx="${g.highlight.rx}" ry="${g.highlight.ry}" fill="${PAPER}" opacity="0.45" transform="${g.highlight.rotate}"/>` +
    `<path d="${g.frontArc}" fill="none" stroke="${PAPER}" stroke-width="${gap}" stroke-linecap="round"/>` +
    `<path d="${g.frontArc}" fill="none" stroke="${INK}" stroke-width="${ring}" stroke-linecap="round"/>` +
    `</svg>`;
  return svgUrl(svg);
}

function botUrl(look: BotLookData, size: number) {
  const p = paletteFor(look.color);
  return svgUrl(botSvg(look, { disc: p.disc, ring: p.ring, faceInk: p.faceInk }, { size }));
}

/* --------------------------------- pieces ---------------------------------- */

function Lockup() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <img src={markUrl(56)} width={56} height={56} alt="" />
      <span style={{ fontSize: 34, fontWeight: 500, letterSpacing: "-0.02em", color: INK }}>
        Bonggy
      </span>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", fontSize: 22, color: FOOT }}>
      www.bonggy.com
    </div>
  );
}

function Headline({ ink, grey }: { ink: string; grey: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: 68,
        fontWeight: 500,
        letterSpacing: "-0.03em",
        lineHeight: 1.04,
      }}
    >
      <span style={{ color: INK }}>{ink}</span>
      <span style={{ color: GREY }}>{grey}</span>
    </div>
  );
}

/** The eleven bots in a row, in their default looks. Home and /bots only. */
function BotRow() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      {CATALOG.map((bot) => (
        <img key={bot.slug} src={botUrl(bot.look, 64)} width={64} height={64} alt="" />
      ))}
    </div>
  );
}

const chip = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #d8d8d8",
  borderRadius: 999,
  padding: "6px 16px",
  fontSize: 20,
  color: FOOT,
} as const;

/* --------------------------------- layouts --------------------------------- */

const page = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: 72,
  background: PAPER,
  fontFamily: "Geist",
} as const;

async function render(node: React.ReactElement) {
  return new ImageResponse(node, {
    ...OG_SIZE,
    // No fallback family: Satori would quietly substitute whatever the build
    // box had, and the previews would come out in the wrong face.
    fonts: [{ name: "Geist", data: await geist(), weight: 500, style: "normal" }],
  });
}

/** A page's OG image: kicker, two-tone headline, and the bot row on two pages. */
export async function pageOgImage({
  kicker,
  ink,
  grey,
  bots = false,
}: {
  kicker: string;
  ink: string;
  grey: string;
  bots?: boolean;
}) {
  return render(
    <div style={page}>
      <Lockup />
      <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1020 }}>
        <span style={{ fontSize: 26, color: GREY }}>{kicker}</span>
        <Headline ink={ink} grey={grey} />
      </div>
      {bots ? <BotRow /> : null}
      <Footer />
    </div>,
  );
}

/** A bot's OG image: the avatar, its flow parts as chips, and its hard limit. */
export async function botOgImage(bot: CatalogBot) {
  const team = bot.team === "revops" ? "RevOps" : bot.team === "sales" ? "Sales" : "Marketing";
  return render(
    <div style={page}>
      <Lockup />
      <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
          <span style={{ fontSize: 26, color: GREY }}>{`${team} · ${bot.role}`}</span>
          <Headline ink={bot.name} grey={bot.job} />
        </div>
          <img src={botUrl(bot.look, 280)} width={280} height={280} alt="" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {FLOW_PART_LABELS.map((part) => (
            <span key={part.key} style={chip}>
              {part.label}
            </span>
          ))}
        </div>
        <div style={{ display: "flex" }}>
          <span style={{ ...chip, borderColor: INK, color: INK }}>
            {`Hard limit: ${bot.exampleFlow.limit.toLowerCase()}`}
          </span>
        </div>
      </div>
      <Footer />
    </div>,
  );
}
