"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Single-row integrations marquee. 39 brands, every one with a self-hosted
 * SVG logo from a maintained brand-icon library (Simple Icons or
 * gilbarbara/logos). CSS filter brightness(0) invert(1) flattens every
 * source SVG — monochrome or full-color — to a pure white silhouette so
 * the row reads as one cohesive treatment.
 *
 * Animation, hover-pause, mobile slowdown, and prefers-reduced-motion
 * handling all live in globals.css under the .marquee-* utility classes.
 */

const BRANDS: { name: string; file: string }[] = [
  { name: "HubSpot",         file: "hubspot" },
  { name: "Slack",           file: "slack" },
  { name: "Notion",          file: "notion" },
  { name: "Salesforce",      file: "salesforce" },
  { name: "Gmail",           file: "gmail" },
  { name: "Linear",          file: "linear" },
  { name: "Calendly",        file: "calendly" },
  { name: "Zapier",          file: "zapier" },
  { name: "Microsoft Teams", file: "microsoft-teams" },
  { name: "Cal.com",         file: "cal-com" },
  { name: "GitHub",          file: "github" },
  { name: "Pipedrive",       file: "pipedrive" },
  { name: "Airtable",        file: "airtable" },
  { name: "Snowflake",       file: "snowflake" },
  { name: "Discord",         file: "discord" },
  { name: "Jira",            file: "jira" },
  { name: "Greenhouse",      file: "greenhouse" },
  { name: "WhatsApp",        file: "whatsapp" },
  { name: "Asana",           file: "asana" },
  { name: "Databricks",      file: "databricks" },
  { name: "Dropbox",         file: "dropbox" },
  { name: "Reddit",          file: "reddit" },
  { name: "ClickUp",         file: "clickup" },
  { name: "Google Drive",    file: "google-drive" },
  { name: "Fathom",          file: "fathom" },
  { name: "Twilio",          file: "twilio" },
  { name: "BigQuery",        file: "bigquery" },
  { name: "Monday",          file: "monday" },
  { name: "Aircall",         file: "aircall" },
  { name: "Webhooks",        file: "webhooks" },
  { name: "X",               file: "x" },
  { name: "Crunchbase",      file: "crunchbase" },
  { name: "SimilarWeb",      file: "similarweb" },
  { name: "Hacker News",     file: "hacker-news" },
  { name: "Product Hunt",    file: "product-hunt" },
  { name: "Wappalyzer",      file: "wappalyzer" },
  { name: "Perplexity",      file: "perplexity" },
  { name: "Substack",        file: "substack" },
  // LinkedIn intentionally omitted from the public marquee.
];

function Tile({
  brand,
  compact = false,
}: {
  brand: { name: string; file: string };
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "group/tile flex shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 transition-colors hover:bg-white/[0.04]",
        compact ? "h-9 w-[104px]" : "h-14 w-[140px]",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/logos/${brand.file}.svg`}
        alt={brand.name}
        loading="lazy"
        // brightness(0) invert(1) flattens any source SVG (monochrome or
        // full-color) to pure white silhouette, so the row stays cohesive.
        className={cn(
          "w-auto object-contain opacity-60 transition-opacity group-hover/tile:opacity-100",
          compact ? "h-[18px] max-w-[80px]" : "h-6 max-w-[100px]",
        )}
        style={{ filter: "brightness(0) invert(1)" }}
      />
    </div>
  );
}

export function IntegrationsMarquee({ compact = false }: { compact?: boolean }) {
  // Duplicate the array so the keyframe can translate -50% without a visible
  // seam — by the time the first copy scrolls off, the second copy is in
  // exactly the same position the first started.
  const doubled = React.useMemo(() => [...BRANDS, ...BRANDS], []);

  return (
    <section
      aria-label="Integrations"
      className={cn(
        "relative w-full",
        // Compact: pinned inside the hero's dead lower space, so no own padding.
        // Default: a standalone band, but far tighter than before.
        compact
          ? ""
          : "pt-12 pb-12 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-16",
      )}
    >
      {/* Section header — matches the existing eyebrow style (green dot +
          mono uppercase label, muted gray) used by Section. */}
      <div
        className={cn(
          "mx-auto w-full max-w-[1400px] px-6 lg:px-10",
          // In the hero, center the label above the full-bleed marquee so it
          // matches the centered hero rather than floating off to the left.
          compact ? "mb-3 flex justify-center" : "mb-8 sm:mb-10",
        )}
      >
        <div className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="size-1 rounded-full bg-signal" />
          Connects with your stack
        </div>
      </div>

      {/* Marquee track — full bleed with edge mask. Hovering pauses the
          row via the .marquee-track:hover rule in globals.css. */}
      <div
        className="marquee-track relative overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className={cn(
            "marquee-row marquee-row--left flex w-max items-center",
            compact ? "gap-4" : "gap-8",
          )}
        >
          {doubled.map((brand, i) => (
            <Tile key={`${brand.file}-${i}`} brand={brand} compact={compact} />
          ))}
        </div>
      </div>
    </section>
  );
}
