import { MARKDOWN_PATHS, markdownFor } from "@/lib/markdown";
import { absolute } from "@/content/site";

/** Every markdown twin in one file, for a crawler that would rather fetch once. */
export const dynamic = "force-static";

export function GET() {
  const body = MARKDOWN_PATHS.map((path) => {
    const md = markdownFor(path);
    return md ? `Source: ${absolute(path)}\n\n${md}` : null;
  })
    .filter(Boolean)
    .join("\n\n---\n\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
