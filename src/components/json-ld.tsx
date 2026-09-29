import "server-only";

/**
 * One `<script type="application/ld+json">` per page.
 *
 * Server-only: the graph is static data, and shipping a copy of it to the
 * browser would be bytes no visitor can use.
 */
export function JsonLd({ graph }: { graph: unknown }) {
  return (
    <script
      type="application/ld+json"
      // The graph is built from our own content, never from user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
