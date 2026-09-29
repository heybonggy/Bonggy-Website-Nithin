import { MARKDOWN_PATHS, markdownFor } from "@/lib/markdown";

/** Every markdown twin in one file, for a crawler that would rather fetch once. */
export const dynamic = "force-static";

export function GET() {
  // Each twin already opens with its own `Source:` line, so don't add a second.
  const body = MARKDOWN_PATHS.map((path) => markdownFor(path))
    .filter(Boolean)
    .join("\n\n---\n\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
