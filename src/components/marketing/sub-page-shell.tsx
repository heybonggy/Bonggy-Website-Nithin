"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SPRING } from "./_motion";
import { cn } from "@/lib/utils";

/**
 * Consistent shell for every sub-page. Set `narrow` for text-heavy pages
 * (Privacy, Terms, FAQ, Security) , the content column is centered on the
 * page and constrained to a readable measure.
 */
export function SubPageShell({
  eyebrow,
  title,
  titleAccent,
  lede,
  children,
  narrow = false,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  lede?: string;
  children: React.ReactNode;
  narrow?: boolean;
}) {
  const innerClass = narrow ? "mx-auto max-w-3xl" : "";

  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <section className="relative isolate overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16 lg:pt-44">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% -5%, oklch(0.78 0.13 152 / 8%), transparent 60%)",
            }}
          />
          <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
            <div className={cn(innerClass)}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={SPRING.gentle}
                className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
              >
                <span className="h-3 w-[3px] shrink-0 bg-signal" />
                <span className="shrink-0 whitespace-nowrap">{eyebrow}</span>
                <span aria-hidden className="ascii-rule h-px flex-1" />
              </motion.div>

              <motion.h1
                initial={{ y: 14 }}
                animate={{ y: 0 }}
                transition={{ ...SPRING.gentle, delay: 0.05 }}
                className="text-display max-w-[20ch] text-balance text-[40px] font-normal leading-none tracking-tight sm:text-[56px] lg:text-[72px]"
              >
                {title}{" "}
                {titleAccent ? (
                  <span className="text-muted-foreground/85">
                    {titleAccent}
                  </span>
                ) : null}
              </motion.h1>

              {lede ? (
                <motion.p
                  initial={{ y: 12 }}
                  animate={{ y: 0 }}
                  transition={{ ...SPRING.gentle, delay: 0.12 }}
                  className="mt-8 max-w-[62ch] text-[17px] leading-relaxed text-muted-foreground"
                >
                  {lede}
                </motion.p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="relative pb-32">
          <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
            <div className={cn(innerClass)}>{children}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
