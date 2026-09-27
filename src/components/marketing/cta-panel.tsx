import { CtaButton } from "./cta-button";
import { EarlyAccessCta } from "./early-access-cta";
import { Mascot as BonggyMark } from "@/components/ui/mascot";

/**
 * Closing CTA — a light, film-grained panel that pops against the dark page,
 * the way factory.ai's "Ready to build…" block does before its footer.
 */
export function CtaPanel() {
  return (
    <section className="relative w-full px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="relative isolate overflow-hidden rounded-[20px] border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
          {/* Light base + grain + corner vignette */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[oklch(0.95_0.004_280)] via-[oklch(0.9_0.004_280)] to-[oklch(0.81_0.005_280)]" />
          <div className="cta-grain absolute inset-0 -z-10 opacity-[0.55] mix-blend-multiply" />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(130% 120% at 100% 100%, transparent 40%, oklch(0.62 0.01 280 / 0.35))",
            }}
          />

          {/* Faint mark, bottom-right, like factory's flower watermark */}
          <BonggyMark
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-8 size-56 opacity-[0.06] grayscale lg:size-72"
          />

          <div className="relative flex flex-col gap-8 p-10 sm:p-14 lg:p-16">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-700/80">
              <span className="size-1.5 rounded-full bg-signal" />
              Early access
            </div>
            <h2 className="text-display max-w-[18ch] text-balance text-[34px] font-medium leading-[1.02] tracking-tight text-zinc-950 sm:text-[46px] lg:text-[58px]">
              Build the agents.{" "}
              <span className="text-zinc-600">Keep the conversation.</span>
            </h2>
            <p className="max-w-[48ch] text-[15.5px] leading-relaxed text-zinc-700">
              Bring a real account list. In 30 minutes we&apos;ll map your
              market with you and sketch the first agents your team would
              build.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <EarlyAccessCta size="lg" />
              <CtaButton
                size="lg"
                variant="ghost"
                className="border-zinc-900/25 bg-transparent text-zinc-950 hover:border-zinc-900/40 hover:bg-zinc-900/[0.06]"
              >
                Book a 30-min call
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
