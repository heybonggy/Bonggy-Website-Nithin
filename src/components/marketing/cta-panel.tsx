import { CtaButton } from "./cta-button";
import { BonggyMark } from "./bonggy-mark";

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
              Build with us
            </div>
            <h2 className="text-display max-w-[16ch] text-balance text-[34px] font-medium leading-[1.02] tracking-tight text-zinc-950 sm:text-[46px] lg:text-[58px]">
              See your team&apos;s drift this week.
            </h2>
            <p className="max-w-[46ch] text-[15.5px] leading-relaxed text-zinc-700">
              Bring a real quarter. In 15 minutes we&apos;ll read your
              team&apos;s actual effort and show you where it&apos;s leaking.
            </p>
            <div>
              <CtaButton size="lg" variant="inverse">Strategize</CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
