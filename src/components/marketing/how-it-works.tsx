import { ChartBar, Compass, Eye, Target } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./section";

const STEPS = [
  { Icon: Eye, title: "Track", body: "Bots read activity across the tools you connect." },
  { Icon: Target, title: "Align", body: "Every action maps to a revenue goal." },
  { Icon: Compass, title: "Nudge", body: "Drift gets flagged with a next move, and a person decides." },
  { Icon: ChartBar, title: "Report", body: "One picture from rep to CRO, with no leaderboards." },
];

/** #how-it-works: the Track → Align → Nudge → Report loop every flow runs on. */
export function HowItWorks() {
  return (
    <Section id="how-it-works" aria-labelledby="how-title">
      <SectionHeader title={<span id="how-title">Every flow runs on one loop.</span>} />
      <div className="relative mt-12">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ Icon, title, body }, i) => (
            <li key={title} className="relative flex flex-col gap-6 rounded-2xl bg-surface p-5 sm:p-6">
              <span className="flex items-center justify-between">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-background text-foreground hairline">
                  <Icon className="size-4.5" aria-hidden />
                </span>
                <span className="tabular text-caption text-fg-3">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <span>
                <h3 className="text-title font-medium text-foreground">{title}</h3>
                <p className="mt-1.5 text-ui text-fg-2">{body}</p>
              </span>
            </li>
          ))}
        </ol>
        {/* The loop: Report feeds back into Track. */}
        <svg
          aria-hidden
          viewBox="0 0 1000 60"
          preserveAspectRatio="none"
          className="mt-2 hidden h-12 w-full text-fg-3 lg:block"
          fill="none"
        >
          <path
            d="M875 4 V30 Q875 52 853 52 H147 Q125 52 125 30 V12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 5"
            vectorEffect="non-scaling-stroke"
          />
          <path d="M119 16 L125 6 L131 16" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </Section>
  );
}
