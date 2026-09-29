import * as React from "react";
import { EMAIL } from "@/content/site";

/**
 * Renders a body string, turning our own address into a mailto link.
 *
 * The legal copy lives in src/content as plain strings so the markdown twins
 * can use it. The pages still owe the reader a link they can click, so the one
 * address we publish is linked here rather than split into JSX in the content.
 */
export function LinkifyEmail({ text }: { text: string }) {
  const parts = text.split(EMAIL);
  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 ? (
            <a
              href={`mailto:${EMAIL}`}
              className="text-foreground underline underline-offset-4 hover:no-underline"
            >
              {EMAIL}
            </a>
          ) : null}
        </React.Fragment>
      ))}
    </>
  );
}
