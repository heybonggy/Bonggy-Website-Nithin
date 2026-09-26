import {
  AddressBook,
  CalendarBlank,
  ChatsCircle,
  EnvelopeSimple,
  Microphone,
} from "@phosphor-icons/react/dist/ssr";
import { CONTEXT } from "./data";

// Generic tool names only; none are named integrations.
const TOOL_ICONS: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  CRM: AddressBook,
  Email: EnvelopeSimple,
  Calendar: CalendarBlank,
  Slack: ChatsCircle,
  "Call notes": Microphone,
};

/** Company context: what every agent reads before it does anything. */
export function ContextView() {
  return (
    <div className="h-full overflow-hidden p-4 sm:p-5">
      <p className="m-0 mb-4 text-[12.5px] text-muted-foreground">Every agent reads this first.</p>
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Company">{CONTEXT.company}</Field>
        <Field label="What you sell">{CONTEXT.sells}</Field>
        <Field label="Ideal customer" wide>
          {CONTEXT.icp}
        </Field>
        <Field label="Revenue goals" wide>
          <ul className="flex flex-wrap gap-1.5">
            {CONTEXT.goals.map((g) => (
              <li key={g} className="rounded-md border border-signal/35 bg-signal/[0.07] px-2 py-0.5 text-[12px] text-signal">
                {g}
              </li>
            ))}
          </ul>
        </Field>
        <Field label="Voice" wide>
          {CONTEXT.voice}
        </Field>
        <Field label="Connected tools" wide>
          <ul className="flex flex-wrap gap-1.5">
            {CONTEXT.tools.map((t) => {
              const Icon = TOOL_ICONS[t];
              return (
                <li key={t} className="flex items-center gap-1.5 rounded-full border border-border bg-background py-1 pl-2 pr-2.5 text-[12px] text-foreground">
                  {Icon ? <Icon className="size-3.5 text-signal" aria-hidden /> : null}
                  {t}
                </li>
              );
            })}
          </ul>
        </Field>
      </dl>
    </div>
  );
}

function Field({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt>
      <dd className="m-0 rounded-lg border border-border bg-card px-3 py-2.5 text-[13px] leading-relaxed text-foreground">
        {children}
      </dd>
    </div>
  );
}
