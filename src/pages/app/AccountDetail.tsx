import { useParams, Link } from "react-router";
import {
  Building2,
  ArrowLeft,
  Flame,
  Users,
  Radio,
  TrendingUp,
  Zap,
  Target,
  AlertTriangle,
  Check,
  FileText,
  ChevronRight,
} from "lucide-react";
import TopBar from "@/components/app/TopBar";

/* ─── Mock Data ─── */
const accountData: Record<string, {
  name: string; domain: string; industry: string; size: string;
  signals: { type: string; label: string; time: string }[];
  narrative: string; urgency: number;
  committee: { role: string; name: string; present: boolean; enriched: boolean; signal: string; gap?: string }[];
  contacts: { name: string; title: string; email: string; enriched: boolean; confidence: number }[];
}> = {
  "1": {
    name: "Linear", domain: "linear.app", industry: "Developer Tools", size: "200-500",
    signals: [
      { type: "funding", label: "Series C · $80M", time: "2d ago" },
      { type: "hiring", label: "VP Sales + 3 SDRs", time: "5d ago" },
      { type: "flaw", label: "No RevOps hire", time: "ongoing" },
      { type: "intent", label: "Visited pricing page", time: "1d ago" },
      { type: "tech", label: "Evaluating CRM alternatives", time: "3d ago" },
    ],
    narrative: "Building outbound without infrastructure — 3 SDRs, no RevOps, 90 days to prove it.",
    urgency: 94,
    committee: [
      { role: "VP Sales", name: "Priya Raman", present: true, enriched: true, signal: "green" },
      { role: "Head of GTM", name: "Daniel Yu", present: true, enriched: true, signal: "green" },
      { role: "RevOps Lead", name: "—", present: false, enriched: false, signal: "red", gap: "Missing in 80% of won deals" },
      { role: "CMO", name: "Marco Beltran", present: true, enriched: true, signal: "yellow" },
      { role: "CTO", name: "Akshat Bubna", present: true, enriched: false, signal: "yellow" },
      { role: "Finance", name: "—", present: false, enriched: false, signal: "red", gap: "Budget owner not mapped" },
    ],
    contacts: [
      { name: "Priya Raman", title: "VP Sales", email: "priya@linear.app", enriched: true, confidence: 96 },
      { name: "Daniel Yu", title: "Head of GTM", email: "daniel@linear.app", enriched: true, confidence: 94 },
      { name: "Marco Beltran", title: "CMO", email: "marco@linear.app", enriched: true, confidence: 88 },
      { name: "Akshat Bubna", title: "CTO", email: "akshat@linear.app", enriched: false, confidence: 62 },
    ],
  },
};

export default function AccountDetail() {
  const { accountId } = useParams();
  const data = accountData[accountId || ""];

  if (!data) {
    return (
      <div className="min-h-screen">
        <TopBar title="Account" />
        <div className="p-6 max-w-[800px] mx-auto text-center py-20">
          <Building2 size={48} className="mx-auto text-bonggy-text-tertiary mb-4" />
          <p className="text-lg text-bonggy-text-primary mb-2">Account not found</p>
          <Link to="/app/accounts" className="text-[13px] text-bonggy-accent hover:underline">
            Back to accounts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TopBar title={data.name} description={data.domain} />

      <div className="p-6 max-w-[1400px]">
        {/* Back + Header */}
        <div className="mb-6">
          <Link
            to="/app/accounts"
            className="inline-flex items-center gap-1 text-[12px] text-bonggy-text-tertiary hover:text-bonggy-text-primary transition-colors mb-4"
          >
            <ArrowLeft size={12} /> Back to accounts
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-bonggy-bg border border-bonggy-border flex items-center justify-center text-[22px] font-semibold text-bonggy-text-primary">
                {data.name[0]}
              </div>
              <div>
                <h1 className="text-[22px] font-semibold text-bonggy-text-primary">{data.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[12px] text-bonggy-text-secondary">{data.industry}</span>
                  <span className="text-bonggy-text-tertiary">·</span>
                  <span className="text-[12px] text-bonggy-text-secondary">{data.size} employees</span>
                  <span className="text-bonggy-text-tertiary">·</span>
                  <a href={`https://${data.domain}`} className="text-[12px] text-bonggy-accent hover:underline">
                    {data.domain}
                  </a>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Flame size={16} className="text-bonggy-accent" />
                <span className="text-[28px] font-normal font-serif-display text-bonggy-accent">{data.urgency}</span>
              </div>
              <p className="text-[11px] text-bonggy-text-tertiary">urgency score</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Signal Timeline */}
            <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Radio size={16} className="text-bonggy-accent" />
                <h2 className="text-[15px] font-semibold text-bonggy-text-primary">Signal Timeline</h2>
                <span className="text-[11px] text-bonggy-text-tertiary ml-auto">{data.signals.length} signals</span>
              </div>
              <div className="space-y-3">
                {data.signals.map((signal, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="relative">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${
                        signal.type === "funding" ? "bg-bonggy-success" :
                        signal.type === "hiring" ? "bg-bonggy-warning" :
                        signal.type === "flaw" ? "bg-red-500" :
                        signal.type === "intent" ? "bg-bonggy-accent" : "bg-blue-500"
                      }`} />
                      {i < data.signals.length - 1 && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-6 bg-bonggy-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-[13px] text-bonggy-text-primary">{signal.label}</p>
                      <p className="text-[11px] text-bonggy-text-tertiary mt-0.5">{signal.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Narrative Card */}
            <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target size={16} className="text-bonggy-accent" />
                <h2 className="text-[15px] font-semibold text-bonggy-text-primary">Account Narrative</h2>
              </div>
              <p className="text-[15px] text-bonggy-text-primary leading-[1.6] font-serif-display">
                &ldquo;{data.narrative}&rdquo;
              </p>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-bonggy-border">
                <TrendingUp size={14} className="text-bonggy-success" />
                <span className="text-[12px] text-bonggy-success">
                  VP Sales + Series B+ + no RevOps = 80% win rate
                </span>
              </div>
            </div>

            {/* Committee Heatmap */}
            <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users size={16} className="text-bonggy-accent" />
                <h2 className="text-[15px] font-semibold text-bonggy-text-primary">Committee Map</h2>
                <span className="text-[11px] text-bonggy-warning ml-auto flex items-center gap-1">
                  <AlertTriangle size={12} /> 2 thread gaps
                </span>
              </div>
              <div className="space-y-2">
                {data.committee.map((member) => (
                  <div
                    key={member.role}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      member.gap ? "border-bonggy-warning bg-bonggy-warning/5" : "border-bonggy-border bg-bonggy-bg"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium text-white shrink-0 ${
                      member.signal === "green" ? "bg-bonggy-success" :
                      member.signal === "yellow" ? "bg-bonggy-warning" : "bg-red-500"
                    }`}>
                      {member.present ? member.name.split(" ").map((n) => n[0]).join("") : "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] text-bonggy-text-primary">{member.role}</p>
                        {member.gap && (
                          <span className="text-[10px] text-bonggy-warning bg-bonggy-warning/10 px-1.5 py-0.5 rounded">
                            Gap
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-bonggy-text-secondary">
                        {member.present ? member.name : member.gap}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {member.enriched && <Check size={12} className="text-bonggy-success" />}
                      {member.gap && <AlertTriangle size={12} className="text-bonggy-warning" />}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-bonggy-bg rounded-lg border border-bonggy-border p-3">
                <p className="text-[12px] text-bonggy-text-secondary leading-[1.5]">
                  <strong className="text-bonggy-text-primary">Recommendation:</strong> Loop in a RevOps contact first — 80% of won deals at Series B+ infra companies had RevOps in the evaluation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contacts */}
            <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-bonggy-text-secondary" />
                  <h2 className="text-[15px] font-semibold text-bonggy-text-primary">Contacts</h2>
                </div>
                <span className="text-[11px] text-bonggy-text-tertiary">{data.contacts.length} mapped</span>
              </div>
              <div className="space-y-2">
                {data.contacts.map((contact) => (
                  <div key={contact.name} className="flex items-center gap-3 p-3 rounded-lg border border-bonggy-border bg-bonggy-bg hover:border-bonggy-border-hover transition-colors">
                    <div className="w-8 h-8 rounded-full bg-bonggy-text-primary flex items-center justify-center text-[10px] font-medium text-bonggy-surface shrink-0">
                      {contact.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-bonggy-text-primary">{contact.name}</p>
                      <p className="text-[11px] text-bonggy-text-tertiary">{contact.title}</p>
                    </div>
                    <span className={`text-[11px] font-medium ${
                      contact.confidence >= 90 ? "text-bonggy-success" :
                      contact.confidence >= 70 ? "text-bonggy-warning" : "text-bonggy-text-tertiary"
                    }`}>
                      {contact.confidence}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
              <h2 className="text-[15px] font-semibold text-bonggy-text-primary mb-3">Actions</h2>
              <div className="space-y-2">
                {[
                  { label: "Generate ammo pack", icon: Zap, color: "text-bonggy-accent" },
                  { label: "Create sequence", icon: FileText, color: "text-bonggy-text-primary" },
                  { label: "Add to trust queue", icon: Target, color: "text-bonggy-warning" },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-bonggy-text-secondary hover:bg-bonggy-bg hover:text-bonggy-text-primary transition-colors text-left"
                    >
                      <Icon size={16} className={action.color} />
                      <span>{action.label}</span>
                      <ChevronRight size={12} className="ml-auto text-bonggy-text-tertiary" />
                    </button>
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
