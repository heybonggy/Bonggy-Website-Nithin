"use client";

import * as React from "react";
import Link from "next/link";

/**
 * Two-row integrations marquee — top row scrolls right, bottom row scrolls
 * left. Logos are self-hosted in /public/logos as SVGs sourced from
 * Simple Icons + gilbarbara/logos, then CSS-forced to monochrome white via
 * `filter: brightness(0) invert(1)` so the row reads as one cohesive
 * treatment even though the source SVGs are a mix of monochrome marks and
 * full-color brand logos. Brands without a local SVG (≈half the list,
 * mostly mid-market B2B tools whose owners removed their marks from the
 * public registries) fall back to a Geist Medium wordmark.
 *
 * Animation, hover-pause, mobile slowdown, and prefers-reduced-motion
 * handling all live in globals.css under the .marquee-* utility classes.
 */

const ROW_1 = [
  "HubSpot", "Salesforce", "Outreach", "Salesloft", "Apollo", "Gmail",
  "Outlook", "LinkedIn", "Slack", "Notion", "Zapier", "Linear",
  "Pipedrive", "Attio", "Instantly", "Smartlead", "Lemlist", "Reply.io",
  "Cal.com", "Calendly", "Chili Piper", "Gong", "Chorus", "Fathom",
  "Granola", "Aircall", "Dialpad", "Twilio", "WhatsApp", "Discord",
  "Clay", "ZoomInfo", "Lusha", "Hunter", "Crunchbase", "PitchBook",
  "Tavily", "Firecrawl", "Reddit", "Hacker News", "X", "GitHub",
  "Product Hunt", "Substack",
];

const ROW_2 = [
  "Microsoft Teams", "Cognism", "LeadIQ", "Surfe", "Crystal Knows",
  "UserGems", "6sense", "Demandbase", "Warmly", "Koala", "RB2B",
  "Common Room", "BuiltWith", "Wappalyzer", "SimilarWeb", "CB Insights",
  "Exa", "Perplexity", "USASpending", "SAM.gov", "GovWin",
  "Definitive Healthcare", "KLAS", "Veeva", "ClinicalTrials.gov",
  "SEC EDGAR", "Bullhorn", "Greenhouse", "Lever", "Workday",
  "Snowflake", "BigQuery", "Databricks", "Census", "Hightouch",
  "Google Drive", "Dropbox", "Airtable", "Jira", "Asana", "ClickUp",
  "Monday", "Webhooks",
];

// Map of brand display name → local SVG filename (in /public/logos/).
// Only brands sourced from maintained brand-icon libraries (Simple Icons or
// gilbarbara/logos) — guaranteed-correct, monochrome-flattenable SVGs.
// Brands not in this map render as Geist Medium wordmarks via the LogoMark
// fallback (still in the marquee, same tile shell, just text).
const BRAND_LOGO: Record<string, string> = {
  // Row 1
  "HubSpot": "hubspot",
  "Salesforce": "salesforce",
  "Gmail": "gmail",
  "LinkedIn": "linkedin",
  "Slack": "slack",
  "Notion": "notion",
  "Zapier": "zapier",
  "Linear": "linear",
  "Pipedrive": "pipedrive",
  "Cal.com": "cal-com",
  "Calendly": "calendly",
  "Fathom": "fathom",
  "Aircall": "aircall",
  "Twilio": "twilio",
  "WhatsApp": "whatsapp",
  "Discord": "discord",
  "Crunchbase": "crunchbase",
  "Reddit": "reddit",
  "Hacker News": "hacker-news",
  "X": "x",
  "GitHub": "github",
  "Product Hunt": "product-hunt",
  "Substack": "substack",

  // Row 2
  "Microsoft Teams": "microsoft-teams",
  "SimilarWeb": "similarweb",
  "Perplexity": "perplexity",
  "Greenhouse": "greenhouse",
  "Snowflake": "snowflake",
  "BigQuery": "bigquery",
  "Databricks": "databricks",
  "Google Drive": "google-drive",
  "Dropbox": "dropbox",
  "Airtable": "airtable",
  "Jira": "jira",
  "Asana": "asana",
  "ClickUp": "clickup",
  "Monday": "monday",
  "Webhooks": "webhooks",
  "Wappalyzer": "wappalyzer",
};

function LogoMark({ name }: { name: string }) {
  const file = BRAND_LOGO[name];
  const [errored, setErrored] = React.useState(false);

  if (!file || errored) {
    return (
      <span className="truncate text-center text-[14px] font-medium text-white/60 transition-colors group-hover/tile:text-white">
        {name}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/logos/${file}.svg`}
      alt={name}
      loading="lazy"
      onError={() => setErrored(true)}
      // brightness(0) invert(1) flattens any source SVG (monochrome or
      // full-color) to pure white silhouette, so the row stays cohesive.
      className="h-6 w-auto max-w-[100px] object-contain opacity-60 transition-opacity group-hover/tile:opacity-100"
      style={{ filter: "brightness(0) invert(1)" }}
    />
  );
}

function Tile({ name }: { name: string }) {
  return (
    <div className="group/tile flex h-14 w-[140px] shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 transition-colors hover:bg-white/[0.04]">
      <LogoMark name={name} />
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  // Duplicate the array so the keyframe can translate -50% without a visible
  // seam — by the time the first copy scrolls off, the second copy is in
  // exactly the same position the first started.
  const doubled = React.useMemo(() => [...items, ...items], [items]);
  return (
    <div
      className={`marquee-row marquee-row--${direction} flex w-max items-center gap-8`}
    >
      {doubled.map((name, i) => (
        <Tile key={`${name}-${i}`} name={name} />
      ))}
    </div>
  );
}

export function IntegrationsMarquee() {
  return (
    <section
      aria-label="Integrations"
      className="relative w-full pt-20 pb-14 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20"
    >
      {/* Section header — matches the existing eyebrow style (green dot +
          mono uppercase label, muted gray) used by Section. */}
      <div className="mx-auto mb-8 w-full max-w-[1400px] px-6 sm:mb-10 lg:px-10">
        <div className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="size-1 rounded-full bg-signal" />
          Connects with your stack
        </div>
      </div>

      {/* Marquee track — full bleed with edge mask. Hovering the track
          pauses BOTH rows together via the .marquee-track:hover rule in
          globals.css. */}
      <div
        className="marquee-track relative overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="space-y-3 sm:space-y-4">
          <MarqueeRow items={ROW_1} direction="right" />
          <MarqueeRow items={ROW_2} direction="left" />
        </div>
      </div>

      {/* See all integrations — small, muted, right-aligned */}
      <div className="mx-auto mt-8 w-full max-w-[1400px] px-6 sm:mt-10 lg:px-10">
        <div className="flex justify-end">
          <Link
            href="/integrations"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
          >
            See all integrations →
          </Link>
        </div>
      </div>
    </section>
  );
}
