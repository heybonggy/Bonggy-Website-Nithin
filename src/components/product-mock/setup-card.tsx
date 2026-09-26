import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

/** A new agent confirming the job it was given, as label/value rows. */
export function SetupCard({ title, rows }: { title: string; rows: { k: string; v: string }[] }) {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <CheckCircle weight="fill" className="size-4 text-signal" aria-hidden />
        <h3 className="m-0 truncate text-[13px] font-medium text-foreground">{title}</h3>
      </div>
      <dl className="grid grid-cols-1">
        {rows.map((r) => (
          <div
            key={r.k}
            className="grid grid-cols-1 gap-1 border-t border-border px-4 py-2.5 first:border-t-0 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-4"
          >
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:pt-0.5">{r.k}</dt>
            <dd className="m-0 text-[12.5px] leading-relaxed text-foreground">{r.v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
