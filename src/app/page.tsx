export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-[640px] text-center">
        <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-bonggy-accent mb-5">
          Bonggy · Next.js 15 migration
        </p>
        <h1 className="font-serif-display text-[42px] md:text-[56px] font-normal leading-[1.04] tracking-tight text-bonggy-text-primary">
          Pipeline,
          <br />
          <span className="italic">in the second you need it.</span>
        </h1>
        <p className="mt-6 text-[15px] text-bonggy-text-secondary leading-relaxed max-w-[480px] mx-auto">
          Skeleton is live. Existing Vite landing is preserved on{" "}
          <code className="font-mono-data text-[13px] text-bonggy-text-primary px-1.5 py-0.5 rounded bg-bonggy-surface border border-bonggy-border">
            main
          </code>{" "}
          and in{" "}
          <code className="font-mono-data text-[13px] text-bonggy-text-primary px-1.5 py-0.5 rounded bg-bonggy-surface border border-bonggy-border">
            src/_legacy/
          </code>
          . Migration continues from here.
        </p>
        <p className="mt-8 text-[12px] text-bonggy-text-tertiary">
          Restore point: <span className="font-mono-data">v0.1-vite-baseline</span>
        </p>
      </div>
    </main>
  );
}
