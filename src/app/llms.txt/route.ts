import { llmsTxt } from "@/lib/llms";

/**
 * /llms.txt: what Bonggy is, the facts an answer engine needs, and where the
 * markdown twins are. Generated from src/content, so it can't drift from the
 * site it describes.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
