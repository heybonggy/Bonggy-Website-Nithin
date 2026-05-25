import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";

export const metadata: Metadata = {
  title: "Use cases",
  description:
    "One pattern, 110 ways. Every play is the same move: something changes at a company, and instead of a rep noticing it, researching it, and writing something — Bonggy does that part. The rep shows up to a decision, not a blank page.",
};

const ROLES = [
  {
    name: "SDR / BDR",
    framing:
      "Measured on meetings booked. The day is spent on everything that comes before a meeting gets booked.",
    plays: [
      "Surface accounts where a VP Sales was hired in the last 30 days",
      "Catch every Series B raise in our ICP within 24h of announcement",
      "Detect stack migrations off HubSpot, draft to the new owner",
      "Find accounts hiring 5+ SDRs in a single quarter",
      "Watch champion job-changes and draft the warm intro the moment it lands",
      "Catch SOC 2 certifications — enterprise unlock signals",
      "Spot RFPs the moment they're posted",
      "Identify champions promoted into procurement-influence roles",
      "Detect re-hires of laid-off VPs at funded companies",
    ],
    open: true,
  },
  {
    name: "Account Executive",
    framing:
      "Walk into every call with the account's full context: what changed, who's involved, what to lead with.",
    plays: [
      "Pre-call brief: every signal that's fired since the last touch",
      "Champion-mapping: who actually decides at the prospect",
      "Competitive heads-up when a prospect signs with a competitor's competitor",
      "Stakeholder-change alerts during open opportunities",
      "Renewal-cycle predictions from contract-language signals",
    ],
  },
  {
    name: "Sales Manager / Director",
    framing:
      "Coach on strategy, not on 'did you research this account.' The research is done.",
    plays: [
      "Pipeline-health view: signals firing per rep's book",
      "Account prioritization across the team based on signal density",
      "Coaching prompts when a rep skips the highest-fit accounts",
      "Weekly coaching summary: which signals each rep is converting on",
    ],
  },
  {
    name: "RevOps",
    framing:
      "One sync replaces the export-clean-upload waterfall. Every data point reviewable before the CRM.",
    plays: [
      "Bi-directional CRM sync with explicit approval gates",
      "Account-data enrichment without the spray-and-pray API spend",
      "Signal-source unification across LinkedIn, Crunchbase, SEC, DNS feeds",
      "Pipeline-stage attribution tied to the signal that triggered the touch",
    ],
  },
  {
    name: "Account Manager",
    framing:
      "Catch renewal risk, expansion signals, and champion job-changes before they become a problem.",
    plays: [
      "Champion-departure alerts at named customers",
      "Expansion-signal scoring on existing accounts",
      "Renewal-risk monitoring through public stack changes",
      "Stakeholder map updates as the customer org evolves",
    ],
  },
  {
    name: "Customer Success Manager",
    framing:
      "Get ahead of the conversation. Know what your customer is thinking before they tell you.",
    plays: [
      "Usage-signal escalation when adoption drops in named accounts",
      "Health-score adjustments based on public layoff / hiring signals",
      "Customer-celebration triggers (raises, awards, big customer wins)",
    ],
  },
  {
    name: "VP of Sales / Leadership",
    framing:
      "See the motion, not the noise. Where is pipeline being created and where is it being missed.",
    plays: [
      "Team-wide signal coverage report",
      "Highest-fit-but-unworked account list for the week",
      "Forecast confidence tied to signal-led pipeline vs. cold pipeline",
    ],
  },
  {
    name: "Marketing",
    framing:
      "Hand sales accounts that are already warm. Run ABM on signal, not intuition.",
    plays: [
      "ABM-segment definition by current signal patterns",
      "Audience refresh on every Series B in target verticals",
      "Content-syndication routing based on which signal an account is firing",
    ],
  },
  {
    name: "Partnerships",
    framing:
      "Catch every co-sell, partner-led, and ecosystem signal worth a conversation.",
    plays: [
      "Partner-customer overlap detection",
      "Joint-win signal monitoring",
      "Ecosystem-shift watching when a partner's stack changes",
    ],
  },
  {
    name: "Founders doing their own sales",
    framing:
      "Your instinct, systematized. Run the motion an SDR would, without hiring one yet.",
    plays: [
      "Founder-led outbound based on warm-network signal density",
      "Investor-network champion mapping",
      "ICP refinement from the patterns of every account that converted",
    ],
  },
  {
    name: "Marketing & Sales Agencies",
    framing:
      "Run signal-led outbound across every client from per-client workspaces. Same headcount, more accounts.",
    plays: [
      "Per-client workspace isolation",
      "Cross-client benchmarking on signal-to-meeting conversion",
      "Agency-grade reporting on signal coverage",
    ],
  },
  {
    name: "Recruiter",
    framing:
      "Catch hiring signals at adjacent companies before the requisition hits LinkedIn.",
    plays: [
      "Stealth-mode hire monitoring from team-page changes",
      "Layoff signals across target candidate pools",
      "Funding-round signals as a leading indicator of hiring demand",
    ],
  },
];

export default function UseCasesPage() {
  return (
    <SubPageShell
      eyebrow="Use cases"
      title="One pattern,"
      titleAccent="110 ways."
      lede="Every play here is the same move: something changes at a company, and instead of a rep noticing it, researching it, and writing something, Bonggy does that part. The rep shows up to a decision, not a blank page. Built for SDRs first. The same engine runs the rest of the GTM motion."
      narrow
    >
      <div className="divide-y divide-border/60">
        {ROLES.map((role, i) => (
          <details
            key={role.name}
            open={role.open}
            className="group/role py-10 lg:py-12"
          >
            <summary className="flex cursor-pointer items-baseline justify-between gap-6 list-none [&::-webkit-details-marker]:hidden">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-display text-[24px] font-normal leading-tight tracking-tight text-foreground sm:text-[30px]">
                  {role.name}
                </h3>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 transition-transform group-open/role:rotate-45">
                +
              </span>
            </summary>

            <div className="mt-5 max-w-[64ch] pl-0 lg:pl-[58px]">
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {role.framing}
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2">
                {role.plays.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-[14px] leading-snug text-foreground/85"
                  >
                    <span className="mt-2 size-1 flex-none rounded-full bg-signal/70" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>

      <div className="mt-16 border-t border-border/60 pt-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <h3 className="text-display text-balance text-[28px] font-normal leading-tight tracking-tight sm:text-[36px]">
              Don&apos;t see your motion? Tell us.
            </h3>
            <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground">
              We&apos;re shaping Bonggy with design partners right now. One
              call to walk through your motion and see what Bonggy does on
              your accounts, live.
            </p>
          </div>
          <div className="flex items-start lg:justify-end">
            <CtaButton variant="signal">Book a strategy session</CtaButton>
          </div>
        </div>
      </div>
    </SubPageShell>
  );
}
