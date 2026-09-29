import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { SubPageShell, SubPageCta } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";
import { ExampleFlow, StaticBotAvatar } from "@/components/marketing/bot-flow-list";
import { JsonLd } from "@/components/json-ld";
import { graphForBot } from "@/lib/jsonld";
import { ogPath } from "@/lib/metadata";
import { BRIGHT_LINES } from "@/content/site";
import {
  BOT_SLUGS,
  TEAM_LABELS,
  botBySlug,
  botMdPath,
  botPath,
  botsForTeam,
} from "@/content/bots";

/** Eleven bots, all known at build time. Anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return BOT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bot = botBySlug(slug);
  if (!bot) return {};

  const path = botPath(slug);
  const image = {
    url: ogPath(slug),
    width: 1200,
    height: 630,
    alt: `${bot.name} ${bot.job}`,
  };

  return {
    title: bot.seoTitle,
    description: bot.seoDescription,
    alternates: { canonical: path, types: { "text/markdown": botMdPath(slug) } },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Bonggy",
      url: path,
      title: `${bot.seoTitle} · Bonggy`,
      description: bot.seoDescription,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${bot.seoTitle} · Bonggy`,
      description: bot.seoDescription,
      images: [image],
    },
  };
}

/** The bright line every bot page repeats, word for word (DESIGN.md §12). */
const APPROVAL_LINE = BRIGHT_LINES.find((l) => l.id === "approval-by-action")!;

export default async function BotPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bot = botBySlug(slug);
  if (!bot) notFound();

  const team = TEAM_LABELS[bot.team];
  const siblings = botsForTeam(bot.team).filter((b) => b.slug !== bot.slug);

  return (
    <>
      <JsonLd graph={graphForBot(slug)} />
      <SubPageShell
        eyebrow={`${team} bot · ${bot.role}`}
        title={bot.name}
        titleAccent={bot.job}
        lede={bot.description}
        narrow
      >
        <div className="flex flex-col gap-12">
          <div className="flex justify-center">
            <StaticBotAvatar bot={bot} size={120} />
          </div>

          <section aria-labelledby="example-flow">
            <h2 id="example-flow" className="text-heading text-foreground">
              Example flow
            </h2>
            <ExampleFlow bot={bot} className="mt-4" />
          </section>

          <section aria-labelledby="needs-a-person">
            <h2 id="needs-a-person" className="text-heading text-foreground">
              What needs a person
            </h2>
            <p className="mt-4 text-body text-fg-2">{bot.exampleFlow.approval}.</p>
            <p id={APPROVAL_LINE.id} className="mt-4 scroll-mt-28 text-body text-fg-2">
              <span className="font-medium text-foreground">{APPROVAL_LINE.title}</span>{" "}
              {APPROVAL_LINE.body}
            </p>
            {bot.group ? <p className="mt-4 text-body text-fg-2">{bot.group}</p> : null}
          </section>

          {siblings.length > 0 ? (
            <section aria-labelledby="more-team-bots">
              <h2 id="more-team-bots" className="text-heading text-foreground">
                More {team} bots
              </h2>
              <ul className="mt-4 flex flex-col gap-1">
                {siblings.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={botPath(other.slug)}
                      className="inline-flex min-h-11 items-center gap-2 text-ui text-foreground"
                    >
                      <StaticBotAvatar bot={other} size={28} />
                      <span className="font-medium">{other.name}</span>
                      <span className="text-fg-2">{other.job}</span>
                      <ArrowRight className="size-4 shrink-0 text-fg-3" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <SubPageCta title="Build one like it, from a sentence.">
          <CtaButton size="lg">Book a strategy call</CtaButton>
        </SubPageCta>
      </SubPageShell>
    </>
  );
}
