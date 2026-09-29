import type { Metadata } from "next";
import Link from "next/link";

import { SubPageShell, SubPageSection } from "@/components/marketing/sub-page-shell";
import { CopyButton } from "@/components/marketing/copy-button";
import { StaticBotAvatar } from "@/components/marketing/bot-flow-list";
import { JsonLd } from "@/components/json-ld";
import { graphFor } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { BOILERPLATE } from "@/lib/markdown";
import { EMAIL, LINKEDIN_URL } from "@/content/site";
import { CATALOG, botPath } from "@/content/bots";
import { BOT_PALETTE } from "@/content/bot-palette";

export const metadata: Metadata = pageMetadata({ slug: "brand" });

const file = (path: string, label: string) => ({ path, label });

const LOGO_FILES = [
  file("/brand/logo/bonggy-mark-black.svg", "Mark, black (SVG)"),
  file("/brand/logo/bonggy-mark-white.svg", "Mark, white (SVG)"),
  file("/brand/logo/bonggy-mark-black-1024.png", "Mark, black (PNG)"),
  file("/brand/logo/bonggy-mark-white-1024.png", "Mark, white (PNG)"),
  file("/brand/logo/bonggy-lockup-black.svg", "Lockup, black (SVG)"),
  file("/brand/logo/bonggy-lockup-white.svg", "Lockup, white (SVG)"),
];

/** The page greys, as the tokens define them (DESIGN.md §2). */
const NEUTRALS = [
  { name: "Ink", value: "#0a0a0a", note: "Headlines and the mark" },
  { name: "Paper", value: "#ffffff", note: "The page" },
  { name: "Graphite", value: "#1b1b1b", note: "Dark mode's page" },
];

const downloadLink =
  "inline-flex min-h-11 items-center rounded-full bg-surface-2 px-4 text-ui-sm font-medium text-foreground transition-colors duration-[var(--dur-fast)] hover:bg-surface-3";

export default function BrandPage() {
  return (
    <>
      <JsonLd graph={graphFor("brand")} />
      <SubPageShell
        eyebrow="Brand"
        title="The planet, the bots, the rules."
        titleAccent="Everything you need to write about Bonggy."
        narrow
      >
        <div className="flex flex-col gap-14">
          <SubPageSection title="Name">
            <p>Bonggy, capital B, one word. Lowercase only in URLs and handles.</p>
          </SubPageSection>

          <SubPageSection title="Logo">
            <div className="flex flex-wrap items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- a brand
                  file served as-is; next/image would re-encode the artwork. */}
              <img
                src="/brand/logo/bonggy-lockup-black.svg"
                alt="The Bonggy lockup: the planet mark and the Bonggy wordmark"
                width={120}
                height={30}
                className="dark:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- as above. */}
              <img
                src="/brand/logo/bonggy-lockup-white.svg"
                alt=""
                width={120}
                height={30}
                className="hidden dark:block"
              />
            </div>
            <ul className="flex flex-wrap gap-2">
              {LOGO_FILES.map((f) => (
                <li key={f.path}>
                  <a href={f.path} download className={downloadLink}>
                    {f.label}
                  </a>
                </li>
              ))}
            </ul>
            <p>
              Monochrome, always. Keep clear space of half the mark&apos;s width on every side. At
              24px and under, use the heavier ring. Don&apos;t recolour it, add effects, or put a bot
              in its place.
            </p>
          </SubPageSection>

          <SubPageSection title="Colour">
            <ul className="flex flex-wrap gap-3">
              {NEUTRALS.map((c) => (
                <li key={c.name} className="flex items-center gap-2.5">
                  <span
                    className="size-8 shrink-0 rounded-full hairline"
                    style={{ background: c.value }}
                    aria-hidden
                  />
                  <span className="text-ui-sm">
                    <span className="font-medium text-foreground">{c.name}</span>{" "}
                    <span className="tabular text-fg-3">{c.value}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-ui-sm text-fg-3">Bots only. Colour belongs to the bots.</p>
            <ul className="flex flex-wrap gap-3">
              {Object.entries(BOT_PALETTE).map(([name, palette]) => (
                <li key={name} className="flex items-center gap-2.5">
                  <span
                    className="size-8 shrink-0 rounded-full hairline"
                    style={{ background: palette.disc }}
                    aria-hidden
                  />
                  <span className="text-ui-sm">
                    <span className="font-medium capitalize text-foreground">{name}</span>{" "}
                    <span className="tabular text-fg-3">{palette.disc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </SubPageSection>

          <SubPageSection title="Type">
            <p>Geist for everything. Geist Mono for receipts.</p>
          </SubPageSection>

          <SubPageSection title="Bots">
            <ul className="grid gap-4 sm:grid-cols-2">
              {CATALOG.map((bot) => (
                <li key={bot.slug} className="flex items-center gap-3">
                  <StaticBotAvatar bot={bot} size={44} />
                  <span className="min-w-0">
                    <Link
                      href={botPath(bot.slug)}
                      className="text-ui font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      {bot.name}
                    </Link>
                    <span className="mt-0.5 flex gap-2 text-caption text-fg-3">
                      <a href={`/brand/bots/${bot.slug}.svg`} download className="hover:text-foreground">
                        SVG
                      </a>
                      <a
                        href={`/brand/bots/${bot.slug}-1024.png`}
                        download
                        className="hover:text-foreground"
                      >
                        PNG
                      </a>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </SubPageSection>

          <SubPageSection title="Boilerplate">
            {([25, 50, 100] as const).map((length) => (
              <div key={length} className="rounded-2xl bg-surface p-5 sm:p-6">
                <p className="text-ui-sm font-medium text-fg-3">{length} words</p>
                <p className="mt-2 text-body text-foreground">{BOILERPLATE[length]}</p>
                <div className="mt-4">
                  <CopyButton text={BOILERPLATE[length]} label={`Copy ${length} words`} />
                </div>
              </div>
            ))}
          </SubPageSection>

          <SubPageSection title="Voice">
            <p>
              Sentence case, one idea per sentence, no exclamation marks. Bots speak lowercase and
              end with what didn&apos;t happen (&ldquo;nothing sent.&rdquo;). Say &ldquo;Flows teams
              have built&rdquo;, never &ldquo;templates&rdquo;.
            </p>
          </SubPageSection>

          <SubPageSection title="Press">
            <p>
              <a
                href={`mailto:${EMAIL}`}
                className="text-foreground underline underline-offset-4 hover:no-underline"
              >
                {EMAIL}
              </a>
            </p>
            <p>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:no-underline"
              >
                LinkedIn
              </a>
            </p>
          </SubPageSection>
        </div>
      </SubPageShell>
    </>
  );
}
