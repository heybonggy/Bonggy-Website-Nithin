import { MARKDOWN_PATHS, markdownFor } from "@/lib/markdown";
import { absolute } from "@/content/site";

/**
 * The markdown twin of a page, at `<path>.md`.
 *
 * next.config.ts rewrites `/faq.md` here; this route never appears in a URL.
 * Each response carries a canonical Link header pointing at the HTML page, so
 * a twin is never mistaken for the page itself.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return MARKDOWN_PATHS.map((path) => ({
    // "/" is the index twin, served with no slug segments.
    slug: path === "/" ? [] : path.slice(1).split("/"),
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const path = slug && slug.length > 0 ? `/${slug.join("/")}` : "/";
  const body = markdownFor(path);

  if (!body) return new Response("Not found", { status: 404 });

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${absolute(path)}>; rel="canonical"`,
    },
  });
}
