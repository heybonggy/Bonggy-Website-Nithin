/**
 * A stable id from a heading's own words: "What we collect" → what-we-collect.
 *
 * Ids come from the text, not the position, so linking to a section keeps
 * working when another one is added above it.
 */
export function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
