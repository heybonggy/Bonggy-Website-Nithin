import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { CareersForm } from "@/components/marketing/careers-form";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "We're hiring the people who want to fix outbound for real. Engineering, design, and GTM roles open in waves as the team scales.",
};

const PRINCIPLES = [
  {
    n: "01",
    title: "Make the average rep work like the great rep.",
    body: "If the work you ship doesn't make a junior SDR sharper without more hours, it doesn't ship.",
  },
  {
    n: "02",
    title: "Anti-spray, anti-autopilot, anti-bloat.",
    body: "We do not chase feature parity. Every send earns the right to the next. So does every feature.",
  },
  {
    n: "03",
    title: "Reps own the relationship. We own the thinking.",
    body: "Humans send. The reply lands on a person. The product reflects that.",
  },
];

export default function CareersPage() {
  return (
    <SubPageShell
      eyebrow="Careers"
      title="Fix outbound."
      titleAccent="Build the thinking layer."
      lede="We're small on purpose. We hire when a problem genuinely needs a person, not when a hiring plan needs a name. Send a note even if there's no listed role , if you have a strong take on what outbound should become, we want to talk."
      narrow
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
            How we work
          </div>
          <h3 className="mt-3 text-display text-[26px] font-normal leading-tight tracking-tight text-foreground sm:text-[32px]">
            Small team. Strong taste. No layers.
          </h3>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-muted-foreground">
            <p>
              Everyone here ships. The person closing a design partner is the
              same person showing up to a customer call the next week. The
              person shipping the score-engine is the same person writing the
              postmortem.
            </p>
            <p>
              We move quickly because we&apos;ve cut everything that doesn&apos;t
              compound. Async-first. Written-first. Demo-first.
            </p>
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
            What we care about
          </div>
          <ul className="mt-3 space-y-6">
            {PRINCIPLES.map((p) => (
              <li key={p.n} className="flex gap-4">
                <span className="font-mono text-[14px] tabular-nums text-muted-foreground/60">
                  {p.n}
                </span>
                <div>
                  <div className="text-[16px] font-medium tracking-tight text-foreground">
                    {p.title}
                  </div>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-24 border-t border-border/60 pt-16">
        <CareersForm />
      </div>
    </SubPageShell>
  );
}
