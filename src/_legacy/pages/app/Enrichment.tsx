import { useState } from "react";
import {
  Download,
  Play,
  Pause,
  Settings2,
  Check,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Zap,
} from "lucide-react";
import TopBar from "@/components/app/TopBar";

const providers = [
  { name: "Apollo", status: "active" as const, costPerCall: "$0.10", fields: ["Email", "Phone", "Title", "LinkedIn"], confidence: 92, callsToday: 142 },
  { name: "Clearbit", status: "active" as const, costPerCall: "$0.05", fields: ["Company", "Industry", "Size"], confidence: 88, callsToday: 89 },
  { name: "Hunter", status: "active" as const, costPerCall: "$0.02", fields: ["Email"], confidence: 85, callsToday: 67 },
  { name: "ZoomInfo", status: "active" as const, costPerCall: "$0.15", fields: ["Phone", "Email", "Title"], confidence: 94, callsToday: 34 },
  { name: "Snov.io", status: "paused" as const, costPerCall: "$0.03", fields: ["Email"], confidence: 78, callsToday: 0 },
  { name: "Lusha", status: "paused" as const, costPerCall: "$0.04", fields: ["Phone", "Email"], confidence: 80, callsToday: 0 },
];

const recentRuns = [
  { contact: "Priya Raman", company: "Modal", provider: "Apollo", fields: 4, confidence: 96, cost: "$0.10", status: "success" as const, time: "2 min ago" },
  { contact: "Daniel Yu", company: "Linear", provider: "ZoomInfo", fields: 3, confidence: 91, cost: "$0.15", status: "success" as const, time: "5 min ago" },
  { contact: "Sarah Lindqvist", company: "Vercel", provider: "Clearbit", fields: 2, confidence: 72, cost: "$0.05", status: "warning" as const, time: "12 min ago" },
  { contact: "Marco Beltran", company: "Retool", provider: "Hunter", fields: 1, confidence: 88, cost: "$0.02", status: "success" as const, time: "18 min ago" },
  { contact: "Akshat Bubna", company: "Linear", provider: "Apollo", fields: 4, confidence: 94, cost: "$0.10", status: "success" as const, time: "25 min ago" },
  { contact: "Jessica Park", company: "Figma", provider: "ZoomInfo", fields: 2, confidence: 68, cost: "$0.15", status: "warning" as const, time: "32 min ago" },
];

export default function Enrichment() {
  const [waterfallOrder] = useState(providers);

  const totalCost = recentRuns.reduce((acc, r) => acc + parseFloat(r.cost.slice(1)), 0);
  void recentRuns.filter((r) => r.status === "success").length;

  return (
    <div className="min-h-screen">
      <TopBar title="Enrichment" description="Multi-provider waterfall configuration">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bonggy-text-primary text-bonggy-surface text-[13px] hover:opacity-85 transition-opacity">
          <Zap size={14} /> Run Enrichment
        </button>
      </TopBar>

      <div className="p-6 max-w-[1400px]">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Providers active", value: "4", icon: Download, color: "text-bonggy-success" },
            { label: "Calls today", value: "332", icon: TrendingUp, color: "text-bonggy-text-primary" },
            { label: "Success rate", value: "94%", icon: Check, color: "text-bonggy-success" },
            { label: "Cost today", value: `$${totalCost.toFixed(2)}`, icon: DollarSign, color: "text-bonggy-accent" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
                <Icon size={16} className={stat.color} />
                <p className="text-[24px] font-normal font-serif-display text-bonggy-text-primary mt-2 leading-none">
                  {stat.value}
                </p>
                <p className="text-[12px] text-bonggy-text-tertiary mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Provider Config */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-semibold text-bonggy-text-primary">Provider Waterfall</h2>
              <button className="text-[12px] text-bonggy-accent hover:underline flex items-center gap-1">
                <Settings2 size={12} /> Configure
              </button>
            </div>

            <div className="bg-bonggy-surface border border-bonggy-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px]">
                  <thead>
                    <tr className="border-b border-bonggy-border bg-bonggy-bg">
                      <th className="text-left text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-4 py-3">Priority</th>
                      <th className="text-left text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-3 py-3">Provider</th>
                      <th className="text-left text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-3 py-3">Cost</th>
                      <th className="text-left text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-3 py-3">Confidence</th>
                      <th className="text-left text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-3 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waterfallOrder.map((provider, index) => (
                      <tr key={provider.name} className="border-b border-bonggy-border hover:bg-bonggy-bg transition-colors">
                        <td className="px-4 py-3">
                          <span className="text-[12px] font-mono-data text-bonggy-text-tertiary">{index + 1}</span>
                        </td>
                        <td className="px-3 py-3">
                          <p className="text-[13px] text-bonggy-text-primary">{provider.name}</p>
                          <p className="text-[10px] text-bonggy-text-tertiary">{provider.fields.join(", ")}</p>
                        </td>
                        <td className="px-3 py-3">
                          <span className="text-[12px] text-bonggy-text-primary">{provider.costPerCall}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1 bg-bonggy-bg rounded-full overflow-hidden">
                              <div
                                className="h-full bg-bonggy-success rounded-full"
                                style={{ width: `${provider.confidence}%` }}
                              />
                            </div>
                            <span className="text-[11px] text-bonggy-text-secondary">{provider.confidence}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <button
                            className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded ${
                              provider.status === "active"
                                ? "bg-bonggy-success/10 text-bonggy-success"
                                : "bg-bonggy-bg text-bonggy-text-tertiary"
                            }`}
                          >
                            {provider.status === "active" ? <Play size={10} /> : <Pause size={10} />}
                            {provider.status}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Runs */}
          <div>
            <h2 className="text-[15px] font-semibold text-bonggy-text-primary mb-4">Recent Runs</h2>
            <div className="bg-bonggy-surface border border-bonggy-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px]">
                  <thead>
                    <tr className="border-b border-bonggy-border bg-bonggy-bg">
                      <th className="text-left text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-4 py-3">Contact</th>
                      <th className="text-left text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-3 py-3">Provider</th>
                      <th className="text-right text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-4 py-3">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRuns.map((run, i) => (
                      <tr key={i} className="border-b border-bonggy-border hover:bg-bonggy-bg transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-[13px] text-bonggy-text-primary">{run.contact}</p>
                          <p className="text-[10px] text-bonggy-text-tertiary">{run.company}</p>
                        </td>
                        <td className="px-3 py-3">
                          <span className="text-[12px] text-bonggy-text-secondary">{run.provider}</span>
                          <p className="text-[10px] text-bonggy-text-tertiary">{run.cost}</p>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {run.status === "success" ? (
                              <Check size={12} className="text-bonggy-success" />
                            ) : (
                              <AlertTriangle size={12} className="text-bonggy-warning" />
                            )}
                            <span className={`text-[12px] ${run.status === "success" ? "text-bonggy-success" : "text-bonggy-warning"}`}>
                              {run.confidence}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
