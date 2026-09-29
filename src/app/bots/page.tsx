import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { SubPageShell, SubPageCta } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";
import { ExampleFlow, StaticBotAvatar } from "@/components/marketing/bot-flow-list";
import { TeamTag } from "@/components/product-mock";
import { JsonLd } from "@/components/json-ld";
import { graphFor } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { PRESETS_LINE } from "@/content/site";
import { TEAM_LABELS, TEAM_ORDER, botPath, botsForTeam } from "@/content/bots";

export const metadata: Metadata = pageMetadata({ slug: "bots" });

/**
 * Every bot on one page, by team. A server component: the avatars are static
 * and nothing here needs the character engine or the customiser's store.
 */
export default function BotsPage() {
  return (
    <>
      <JsonLd graph={graphFor("bots")} />
      <SubPageShell
        eyebrow="Bots"
        title="Bots for sales, RevOps and marketing teams."
        titleAccent="Flows teams have built. Each one answers to a revenue goal."
      >
        <div className="flex flex-col gap-16">
          {TEAM_ORDER.map((team) => (
            <section key={team} aria-labelledby={`team-${team}`}>
              <h2 id={`team-${team}`} className="text-heading text-foreground">
                {TEAM_LABELS[team]}
              </h2>

              <div className="mt-6 flex flex-col gap-10">
                {botsForTeam(team).map((bot) => (
                  <article key={bot.slug} id={bot.slug} className="scroll-mt-28">
                    <div className="flex items-start gap-4">
                      <StaticBotAvatar bot={bot} size={56} />
                      <div className="min-w-0">
                        <h3 className="text-title font-medium text-foreground">{bot.name}</h3>
                        <p className="mt-1.5 flex flex-wrap items-center gap-1.5">
                          <TeamTag team={bot.team} />
                          <span className="inline-flex h-5 shrink-0 items-center rounded-full bg-background px-2 text-caption text-fg-2 hairline">
                            {bot.role}
                          </span>
                        </p>
                        <p className="mt-3 text-body text-foreground">{bot.job}</p>
                        <p className="mt-1.5 text-body text-fg-2">{bot.description}</p>
                      </div>
                    </div>

                    <ExampleFlow bot={bot} className="mt-5" />

                    <Link
                      href={botPath(bot.slug)}
                      className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-ui font-medium text-foreground"
                    >
                      More on {bot.name}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <SubPageCta title={PRESETS_LINE}>
          <CtaButton size="lg">Book a strategy call</CtaButton>
        </SubPageCta>
      </SubPageShell>
    </>
  );
}
