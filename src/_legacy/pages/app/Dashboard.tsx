import { useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  Flame,
  TrendingUp,
  Radio,
  Zap,
  ArrowRight,
  Users,
  FileText,
  ShieldCheck,
  Activity,
  Target,
  Building2,
} from "lucide-react";
import TopBar from "@/components/app/TopBar";
import gsap from "gsap";

const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReduced || !ref.current) return;
    const el = ref.current;
    gsap.set(el, { opacity: 0, y: 16 });
    const tween = gsap.to(el, {
      opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1,
    });
    return () => { tween.kill(); };
  }, []);
  return ref;
}

/* ─── Mock Data ─── */
const hotClusters = [
  {
    account: "Linear",
    signals: ["Series C · $80M", "VP Sales + 3 SDRs", "No RevOps"],
    narrative: "Building outbound without infrastructure — 3 SDRs, no RevOps, 90 days to prove it.",
    urgency: 94,
    pattern: "VP Sales + Series B+ + no RevOps = 80% win",
  },
  {
    account: "Modal",
    signals: ["Head of Sales Ops", "Evaluating Clearbit alt", "Visited pricing 3x"],
    narrative: "Active evaluation window. Decision-maker researching alternatives while hiring for the role.",
    urgency: 91,
    pattern: "Tech eval + hiring + intent = 72% win",
  },
  {
    account: "Vercel",
    signals: ["Champion moved to Vercel", "Hiring 40+ GTM roles"],
    narrative: "Champion land + expand play. Former user now has budget authority.",
    urgency: 88,
    pattern: "Champion move + hiring spree = 67% win",
  },
  {
    account: "Retool",
    signals: ["Series B extension", "RevOps hire stalled", "Competitor churn signal"],
    narrative: "Internal champion frustrated with current stack. Budget confirmed for Q3.",
    urgency: 86,
    pattern: "Champion + stalled vendor = 74% win",
  },
  {
    account: "Figma",
    signals: ["Enterprise expansion", "Security review initiated", "Procurement contact mapped"],
    narrative: "Enterprise upsell window. Security review is the final gate before expansion.",
    urgency: 82,
    pattern: "Enterprise + security review = 69% win",
  },
];

const recentActivity = [
  { type: "cluster" as const, text: "New cluster: Linear · Urgency 94", time: "2 min ago" },
  { type: "ammo" as const, text: "Ammo pack generated for Modal (3 tones)", time: "15 min ago" },
  { type: "signal" as const, text: "Signal: VP Sales hired at Vercel", time: "32 min ago" },
  { type: "pattern" as const, text: "Win pattern match: 3 accounts flagged", time: "1 hr ago" },
  { type: "enrich" as const, text: "Enrichment complete: 47 contacts", time: "2 hrs ago" },
  { type: "sync" as const, text: "CRM sync: 12 fields updated in Salesforce", time: "3 hrs ago" },
  { type: "cluster" as const, text: "New cluster: Retool · Urgency 86", time: "4 hrs ago" },
  { type: "signal" as const, text: "Signal: Funding round detected at Modal", time: "5 hrs ago" },
];

const quickStats = [
  { label: "Hot clusters", value: "12", change: "+3 today", icon: Flame, color: "text-bonggy-accent" },
  { label: "Active sequences", value: "8", change: "2 pending", icon: FileText, color: "text-bonggy-text-primary" },
  { label: "Ammo packs today", value: "24", change: "+8 from yesterday", icon: Zap, color: "text-bonggy-success" },
  { label: "Trust queue", value: "12", change: "4 need review", icon: ShieldCheck, color: "text-bonggy-warning" },
];

export default function Dashboard() {
  const clustersRef = useReveal();
  const activityRef = useReveal();
  const statsRef = useReveal();

  return (
    <div className="min-h-screen">
      <TopBar title="Dashboard" description="Overview of your outbound intelligence" />

      <div className="p-6 max-w-[1400px]">
        {/* Quick Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5 hover:border-bonggy-border-hover transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon size={16} className={stat.color} />
                  <span className="text-[11px] text-bonggy-text-tertiary">{stat.change}</span>
                </div>
                <p className="text-[28px] font-normal font-serif-display text-bonggy-text-primary leading-none">
                  {stat.value}
                </p>
                <p className="text-[13px] text-bonggy-text-tertiary mt-1.5">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Hot Clusters — 3 cols */}
          <div ref={clustersRef} className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame size={16} className="text-bonggy-accent" />
                <h2 className="text-[15px] font-semibold text-bonggy-text-primary">Hot Clusters</h2>
                <span className="text-[11px] text-bonggy-text-tertiary bg-bonggy-bg px-2 py-0.5 rounded border border-bonggy-border">
                  14-day window
                </span>
              </div>
              <Link
                to="/app/signals"
                className="text-[13px] text-bonggy-accent hover:underline flex items-center gap-1"
              >
                View all <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-3">
              {hotClusters.map((cluster) => (
                <div
                  key={cluster.account}
                  className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5 hover:border-bonggy-border-hover transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-bonggy-bg border border-bonggy-border flex items-center justify-center text-[15px] font-semibold text-bonggy-text-primary">
                        {cluster.account[0]}
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-bonggy-text-primary">
                          {cluster.account}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {cluster.signals.map((s) => (
                            <span
                              key={s}
                              className="text-[10px] text-bonggy-text-secondary bg-bonggy-bg px-2 py-0.5 rounded border border-bonggy-border"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[18px] font-normal font-serif-display text-bonggy-accent">
                        {cluster.urgency}
                      </span>
                      <p className="text-[10px] text-bonggy-text-tertiary">urgency</p>
                    </div>
                  </div>

                  <p className="text-[13px] text-bonggy-text-secondary leading-[1.5] mb-2">
                    {cluster.narrative}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp size={12} className="text-bonggy-success" />
                      <span className="text-[11px] text-bonggy-success">{cluster.pattern}</span>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-bonggy-text-tertiary group-hover:text-bonggy-text-primary group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Activity + Quick Actions */}
          <div ref={activityRef} className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={16} className="text-bonggy-text-secondary" />
                <h2 className="text-[15px] font-semibold text-bonggy-text-primary">Recent Activity</h2>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity, i) => {
                  const icons = {
                    cluster: Flame,
                    ammo: Zap,
                    signal: Radio,
                    pattern: Target,
                    enrich: Users,
                    sync: Activity,
                  };
                  const colors = {
                    cluster: "text-bonggy-accent",
                    ammo: "text-bonggy-success",
                    signal: "text-blue-500",
                    pattern: "text-purple-500",
                    enrich: "text-bonggy-text-secondary",
                    sync: "text-bonggy-text-tertiary",
                  };
                  const Icon = icons[activity.type];
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <Icon size={14} className={`mt-0.5 shrink-0 ${colors[activity.type]}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-bonggy-text-primary leading-[1.4]">
                          {activity.text}
                        </p>
                        <p className="text-[11px] text-bonggy-text-tertiary mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
              <h2 className="text-[15px] font-semibold text-bonggy-text-primary mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { label: "New Sequence", icon: FileText, href: "/app/sequences" },
                  { label: "Review Trust Queue", icon: ShieldCheck, href: "/app/trust", badge: 12 },
                  { label: "Generate Ammo Pack", icon: Zap, href: "/app/ammo" },
                  { label: "View Accounts", icon: Building2, href: "/app/accounts" },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.label}
                      to={action.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-bonggy-text-secondary hover:bg-bonggy-bg hover:text-bonggy-text-primary transition-colors group"
                    >
                      <Icon size={16} />
                      <span className="flex-1">{action.label}</span>
                      {action.badge && (
                        <span className="text-[11px] text-bonggy-accent bg-bonggy-accent/10 px-1.5 py-0.5 rounded">
                          {action.badge}
                        </span>
                      )}
                      <ArrowRight
                        size={12}
                        className="text-bonggy-text-tertiary group-hover:text-bonggy-text-primary group-hover:translate-x-0.5 transition-all"
                      />
                    </Link>
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
