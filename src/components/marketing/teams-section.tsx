import { BotAvatar } from "@/components/ui/mascot";
import { BOTS, TEAM_LIST } from "@/components/product-mock/data";
import { Section, SectionHeader } from "./section";

const TEAM_NAME = { sales: "Sales", revops: "RevOps", marketing: "Marketing" } as const;

/** #what-we-do: the three teams and the bots each one builds. */
export function TeamsSection() {
  return (
    <Section id="what-we-do" aria-labelledby="teams-title">
      <SectionHeader
        title={<span id="teams-title">One workspace. Three teams.</span>}
        intro="Sales, RevOps and marketing teams each build bots for their own work. Every bot is a modeller, a researcher or a value generator, and every one answers to a revenue goal."
      />
      <div className="mt-12 flex flex-col divide-y divide-border border-y border-border">
        {TEAM_LIST.map((t) => {
          const bots = BOTS.filter((b) => b.team === t.id);
          return (
            <div key={t.id} className="grid gap-4 py-6 lg:grid-cols-[180px_1fr] lg:gap-8 lg:py-8">
              <h3 className="flex items-center gap-2.5 self-start text-title text-foreground">
                <BotAvatar team={t.id} size={28} />
                {TEAM_NAME[t.id]}
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {bots.map((b) => (
                  <li key={b.id} className="flex flex-col gap-2 rounded-2xl bg-surface p-4">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-ui font-semibold text-foreground">{b.name}</span>
                      <span className="shrink-0 text-caption text-fg-3">{b.role}</span>
                    </span>
                    <span className="text-ui-sm text-fg-2">{b.job}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
