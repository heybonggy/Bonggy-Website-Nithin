import { useState } from "react";
import {
  Radio,
  TrendingUp,
  Target,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import TopBar from "@/components/app/TopBar";

const signalClusters = [
  {
    id: "c1",
    account: "Linear",
    signals: [
      { type: "funding", label: "Series C · $80M", time: "2d ago" },
      { type: "hiring", label: "VP Sales + 3 SDRs", time: "5d ago" },
      { type: "flaw", label: "No RevOps hire", time: "ongoing" },
    ],
    narrative: "Building outbound without infrastructure — 3 SDRs, no RevOps, 90 days to prove it.",
    urgency: 94,
    winPattern: "VP Sales + Series B+ + no RevOps = 80% win rate",
    createdAt: "2d ago",
    status: "hot",
  },
  {
    id: "c2",
    account: "Modal",
    signals: [
      { type: "hiring", label: "Head of Sales Ops posted", time: "1d ago" },
      { type: "tech", label: "Evaluating Clearbit alt on G2", time: "3d ago" },
      { type: "intent", label: "Visited pricing 3x", time: "this week" },
    ],
    narrative: "Active evaluation window. Decision-maker researching alternatives while hiring for the role that owns the stack.",
    urgency: 91,
    winPattern: "Tech eval + hiring signal + intent = 72% win rate",
    createdAt: "1d ago",
    status: "hot",
  },
  {
    id: "c3",
    account: "Vercel",
    signals: [
      { type: "champion", label: "Champion moved to Vercel", time: "1w ago" },
      { type: "funding", label: "Hiring 40+ GTM roles", time: "ongoing" },
    ],
    narrative: "Champion land + expand play. Former user now has budget authority at high-growth target.",
    urgency: 88,
    winPattern: "Champion move + hiring spree = 67% win rate",
    createdAt: "3d ago",
    status: "hot",
  },
  {
    id: "c4",
    account: "Retool",
    signals: [
      { type: "funding", label: "Series B extension", time: "4d ago" },
      { type: "flaw", label: "RevOps hire stalled", time: "2w ago" },
      { type: "tech", label: "Competitor churn signal", time: "1d ago" },
    ],
    narrative: "Internal champion frustrated with current stack. Budget confirmed for Q3.",
    urgency: 86,
    winPattern: "Champion + stalled vendor = 74% win",
    createdAt: "4d ago",
    status: "warm",
  },
  {
    id: "c5",
    account: "Figma",
    signals: [
      { type: "intent", label: "Enterprise expansion", time: "5d ago" },
      { type: "tech", label: "Security review initiated", time: "3d ago" },
      { type: "hiring", label: "Procurement contact mapped", time: "1w ago" },
    ],
    narrative: "Enterprise upsell window. Security review is the final gate before expansion.",
    urgency: 82,
    winPattern: "Enterprise + security review = 69% win",
    createdAt: "5d ago",
    status: "warm",
  },
];

const recentSignals = [
  { account: "Linear", type: "funding", label: "Series C · $80M", time: "2 min ago" },
  { account: "Modal", type: "hiring", label: "Head of Sales Ops posted", time: "15 min ago" },
  { account: "Vercel", type: "champion", label: "Champion moved to Vercel", time: "32 min ago" },
  { account: "Retool", type: "tech", label: "Competitor churn signal detected", time: "1 hr ago" },
  { account: "Figma", type: "intent", label: "Enterprise expansion signal", time: "2 hrs ago" },
  { account: "Linear", type: "intent", label: "Visited pricing page", time: "3 hrs ago" },
  { account: "Modal", type: "tech", label: "Evaluating Clearbit alternative", time: "4 hrs ago" },
  { account: "Supabase", type: "funding", label: "Series B announced", time: "6 hrs ago" },
];

export default function Signals() {
  const [expandedCluster, setExpandedCluster] = useState<string | null>("c1");
  const [filter, setFilter] = useState<"all" | "hot" | "warm">("all");

  const filtered = signalClusters.filter((c) =>
    filter === "all" ? true : c.status === filter
  );

  return (
    <div className="min-h-screen">
      <TopBar title="Signals & Clusters" description={`${signalClusters.length} active clusters · ${recentSignals.length} recent signals`} />

      <div className="p-6 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Clusters */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-[15px] font-semibold text-bonggy-text-primary">Signal Clusters</h2>
                <div className="flex items-center gap-1">
                  {(["all", "hot", "warm"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-2.5 py-1 rounded text-[11px] capitalize transition-colors ${
                        filter === f
                          ? "bg-bonggy-bg text-bonggy-text-primary font-medium"
                          : "text-bonggy-text-tertiary hover:text-bonggy-text-primary"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-bonggy-text-tertiary">
                {filtered.length} clusters
              </span>
            </div>

            <div className="space-y-3">
              {filtered.map((cluster) => (
                <div
                  key={cluster.id}
                  className={`bg-bonggy-surface border rounded-xl transition-all cursor-pointer ${
                    expandedCluster === cluster.id
                      ? "border-bonggy-accent"
                      : "border-bonggy-border hover:border-bonggy-border-hover"
                  }`}
                  onClick={() => setExpandedCluster(expandedCluster === cluster.id ? null : cluster.id)}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-bonggy-bg border border-bonggy-border flex items-center justify-center text-[15px] font-semibold text-bonggy-text-primary">
                          {cluster.account[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-[14px] font-medium text-bonggy-text-primary">
                              {cluster.account}
                            </p>
                            {cluster.status === "hot" && (
                              <span className="text-[10px] text-bonggy-accent bg-bonggy-accent/10 px-1.5 py-0.5 rounded">
                                Hot
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {cluster.signals.map((s) => (
                              <span
                                key={s.label}
                                className="text-[10px] text-bonggy-text-secondary bg-bonggy-bg px-2 py-0.5 rounded border border-bonggy-border"
                              >
                                {s.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[20px] font-normal font-serif-display text-bonggy-accent">
                            {cluster.urgency}
                          </span>
                          <p className="text-[10px] text-bonggy-text-tertiary">urgency</p>
                        </div>
                        {expandedCluster === cluster.id ? (
                          <ChevronUp size={16} className="text-bonggy-text-tertiary" />
                        ) : (
                          <ChevronDown size={16} className="text-bonggy-text-tertiary" />
                        )}
                      </div>
                    </div>

                    {expandedCluster === cluster.id && (
                      <div className="mt-4 pt-4 border-t border-bonggy-border space-y-4">
                        <div className="bg-bonggy-bg rounded-lg border border-bonggy-border p-4">
                          <p className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1">
                            Account Narrative
                          </p>
                          <p className="text-[14px] text-bonggy-text-primary leading-[1.5] font-serif-display">
                            &ldquo;{cluster.narrative}&rdquo;
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <TrendingUp size={14} className="text-bonggy-success" />
                          <span className="text-[12px] text-bonggy-success">{cluster.winPattern}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="text-[12px] text-white bg-bonggy-accent px-4 py-2 rounded-lg flex items-center gap-1.5 hover:opacity-85 transition-opacity">
                            <Zap size={12} /> Generate ammo pack
                          </button>
                          <button className="text-[12px] text-bonggy-text-secondary bg-bonggy-bg px-4 py-2 rounded-lg border border-bonggy-border flex items-center gap-1.5 hover:border-bonggy-border-hover transition-colors">
                            <Target size={12} /> View account
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Signals Feed */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Radio size={16} className="text-bonggy-text-secondary" />
              <h2 className="text-[15px] font-semibold text-bonggy-text-primary">Recent Signals</h2>
            </div>
            <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-4">
              <div className="space-y-3">
                {recentSignals.map((signal, i) => {
                  const colors: Record<string, string> = {
                    funding: "bg-bonggy-success",
                    hiring: "bg-bonggy-warning",
                    tech: "bg-blue-500",
                    intent: "bg-bonggy-accent",
                    champion: "bg-purple-500",
                    flaw: "bg-red-500",
                  };
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${colors[signal.type] || "bg-bonggy-text-tertiary"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-bonggy-text-primary leading-[1.4]">{signal.label}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[11px] text-bonggy-text-secondary">{signal.account}</span>
                          <span className="text-bonggy-text-tertiary">·</span>
                          <span className="text-[11px] text-bonggy-text-tertiary">{signal.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
