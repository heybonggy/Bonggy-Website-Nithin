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
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={SPRING}
                className="mb-8 inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
              >
                <span className="size-1 rounded-full bg-signal" />
                {eyebrow}
              </motion.div>

              <motion.h1
                initial={{ y: 14 }}
                animate={{ y: 0 }}
                transition={{ ...SPRING, delay: 0.05 }}
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
                  transition={{ ...SPRING, delay: 0.12 }}
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

/** Small block component for divider-led lists used across sub-pages */
export function SubPageBlock({
  index,
  tag,
  title,
  children,
}: {
  index: string;
  tag: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-6 py-14 lg:grid-cols-[180px_1fr] lg:py-16">
      <div className="flex flex-col gap-3">
        <div className="font-mono text-[48px] font-normal leading-none tabular-nums text-foreground/30">
          {index}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
          {tag}
        </div>
      </div>
      <div className="max-w-[64ch]">
        <h3 className="text-display text-[26px] font-normal leading-tight tracking-tight text-foreground sm:text-[32px]">
          {title}
        </h3>
        <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
