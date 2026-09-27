import * as React from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { cn } from "@/lib/utils";

/**
 * Shell for every sub-page: header, a text-led intro (kicker, two-tone H1,
 * lede) and a content column. `narrow` constrains the column to a readable
 * measure for long text (privacy, terms, security, FAQ, essays).
 */
export function SubPageShell({
  eyebrow,
  title,
  titleAccent,
  lede,
  children,
  narrow = false,
}: {
  /** Short sentence-case kicker above the title (no uppercase eyebrow). */
  eyebrow: string;
  title: string;
  titleAccent?: string;
  lede?: string;
  children: React.ReactNode;
  narrow?: boolean;
}) {
  const column = narrow ? "max-w-copy" : "max-w-content";
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <section className="px-4 pb-12 pt-32 sm:px-6 sm:pb-16 sm:pt-[148px]">
          <div className={cn("mx-auto w-full", column)}>
            <p className="text-ui-sm font-medium text-fg-3">{eyebrow}</p>
            <h1 className="mt-4 text-display-lg text-foreground sm:text-display-xl">
              {title}
              {titleAccent ? (
                <>
                  {" "}
                  <span className="text-fg-3">{titleAccent}</span>
                </>
              ) : null}
            </h1>
            {lede ? <p className="mt-6 max-w-copy text-body-lg text-fg-2">{lede}</p> : null}
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 sm:pb-32">
          <div className={cn("mx-auto w-full", column)}>{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
