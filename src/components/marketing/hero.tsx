"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { CtaButton } from "./cta-button";
import { EarlyAccessCta } from "./early-access-cta";
import { AgentsPreview } from "./agents-preview";
import { useLoopFocus } from "./loop-focus";
import { EASE_OUT } from "./_motion";

// The ASCII field is decorative and the heaviest thing on the page, so it's
// split out of the main bundle and only mounted on desktop, after load.
const AsciiField = dynamic(
  () => import("./ascii-field").then((m) => m.AsciiField),
  { ssr: false },
);

/** True once the page has settled, on desktop, without reduced motion. */
function useAmbientBackground() {
  const [enabled, setEnabled] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    if (!mq.matches) return;
    let idleId: number | undefined;
    const start = () => {
      const ric =
        window.requestIdleCallback ??
        ((cb: () => void) => window.setTimeout(cb, 200));
      idleId = ric(() => setEnabled(true), { timeout: 2500 });
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
    };
  }, []);
  return enabled;
}

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const focused = useLoopFocus(sectionRef);
  const ambient = useAmbientBackground();
  const [demoPlaying, setDemoPlaying] = React.useState(false);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24"
    >
      {/* Background behind the headline: static gradient everywhere; the
          ASCII field fades in on top of it on desktop once the page settles. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 70% 35%, oklch(0.78 0.13 152 / 7%), transparent 70%), radial-gradient(50% 40% at 15% 10%, oklch(1 0 0 / 3%), transparent 70%)",
          }}
        />
        {ambient ? (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.32 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
          >
            {/* Paused while the demo script plays or another section holds
                loop focus, so only one loop runs at a time. */}
            <AsciiField paused={!focused || demoPlaying} />
          </motion.div>
        ) : null}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 30% 45%, oklch(0.085 0.005 280 / 0.75), transparent 75%), linear-gradient(to bottom, transparent 70%, var(--background))",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 px-6 lg:gap-16 lg:px-10">
        <div className="grid grid-cols-1 gap-x-16 gap-y-7 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <div className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-3 w-[3px] shrink-0 bg-signal" />
              GTM studio · Early access
            </div>
            <h1 className="text-display max-w-[18ch] text-balance text-[40px] font-normal leading-none tracking-tight sm:text-[56px] lg:text-[68px]">
              Agents for the work before the conversation.{" "}
              <span className="text-muted-foreground/85">
                You still have the conversation.
              </span>
            </h1>
          </div>

          <div>
            <p className="max-w-[48ch] text-[16.5px] leading-relaxed text-muted-foreground">
              Bonggy is a studio for sales agents that model your market,
              research your accounts and draft the work, aligned to revenue
              and reviewed by your team.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <EarlyAccessCta size="lg" />
              <CtaButton size="lg" variant="ghost" magnetic={false}>
                Book a 30-min call
              </CtaButton>
            </div>
            {/* TODO(social-proof): no customer logos, quotes or counts until
                they're real and approved. Leave this slot empty until then. */}
          </div>
        </div>

        <AgentsPreview onPlayingChange={setDemoPlaying} />
      </div>
    </section>
  );
}
