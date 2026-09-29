import { CATALOG, botMdPath, botUrl } from "@/content/bots";
import { PAGES, absolute } from "@/content/site";

/**
 * The bot catalog as structured data, for anything that would rather read JSON
 * than parse a page. CORS is open because it is public, unauthenticated and
 * carries nothing a visitor can't already see on /bots.
 */
export const dynamic = "force-static";

export function GET() {
  const body = {
    version: 1,
    updated: PAGES.bots.lastModified,
    source: absolute("/bots"),
    bots: CATALOG.map((bot) => ({
      id: bot.slug,
      name: bot.name,
      team: bot.team,
      role: bot.role,
      job: bot.job,
      description: bot.description,
      url: botUrl(bot.slug),
      markdown: absolute(botMdPath(bot.slug)),
      avatar: {
        png: `/brand/bots/${bot.slug}-256.png`,
        svg: `/brand/bots/${bot.slug}.svg`,
      },
      look: bot.look,
      exampleFlow: bot.exampleFlow,
    })),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
