"use client";

import * as React from "react";
import { CtaButton } from "./cta-button";
import { EarlyAccessCta } from "./early-access-cta";
import { AgentsPreview } from "./agents-preview";

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24"
    >

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
              <CtaButton size="lg" variant="soft">
                Book a 30-min call
              </CtaButton>
            </div>
            {/* TODO(social-proof): no customer logos, quotes or counts until
                they're real and approved. Leave this slot empty until then. */}
          </div>
        </div>

        <AgentsPreview />
      </div>
    </section>
  );
}
