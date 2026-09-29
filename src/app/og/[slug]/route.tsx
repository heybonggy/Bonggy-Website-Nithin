import { PAGES, type PageSlug } from "@/content/site";
import { BOT_SLUGS, botBySlug } from "@/content/bots";
import { botOgImage, pageOgImage } from "@/lib/og";

/**
 * One OG image per page and per bot, at a stable path (`/og/<slug>`).
 *
 * Node, not edge: the renderer reads the Geist TTF off disk so previews are
 * never drawn in whatever font the build box happened to have. Static, so the
 * images are bytes on the CDN rather than something rendered per request.
 */
export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;

/** The 404 borrows /og/home, so it needs no slug of its own. */
const PAGE_SLUGS = (Object.keys(PAGES) as PageSlug[]).filter((slug) => slug !== "not-found");

export function generateStaticParams() {
  return [...PAGE_SLUGS, ...BOT_SLUGS].map((slug) => ({ slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const bot = botBySlug(slug);
  if (bot) return botOgImage(bot);

  const page = PAGES[slug as PageSlug];
  if (!page) return new Response("Not found", { status: 404 });

  // Home and /bots show the whole cast; the rest are words on paper.
  return pageOgImage({ ...page.og, bots: slug === "home" || slug === "bots" });
}
