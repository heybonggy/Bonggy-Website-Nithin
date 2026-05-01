import { useState } from "react";
import {
  ChevronRight, SkipForward, CheckCircle2, Download,
  Target, Radio, FileText, Users, MessageSquare,
  TrendingUp, ShieldCheck, Zap, AlertTriangle,
  Check, Send, Flame, Layers,
} from "lucide-react";

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium text-white shrink-0" style={{ backgroundColor: color }}>
      {initials}
    </div>
  );
}

function SignalDot({ type }: { type: "intent" | "funding" | "hiring" | "tech" | "champion" | "flaw" }) {
  const colors = {
    intent: "bg-bonggy-accent",
    funding: "bg-bonggy-success",
    hiring: "bg-bonggy-warning",
    tech: "bg-blue-500",
    champion: "bg-purple-500",
    flaw: "bg-red-500",
  };
  return <div className={`w-2 h-2 rounded-full ${colors[type]} shrink-0`} />;
}

// ─── SIGNAL CLUSTER BOARD (Hero Visual) ───
function SignalClusterBoard() {
  const clusters = [
    {
      account: "Linear",
      signals: [
        { type: "funding" as const, label: "Series C · $80M", time: "2d ago" },
        { type: "hiring" as const, label: "VP Sales + 3 SDRs", time: "5d ago" },
        { type: "flaw" as const, label: "No RevOps hire", time: "ongoing" },
      ],
      narrative: "Building outbound without infrastructure — 3 SDRs, no RevOps, 90 days to prove it.",
      urgency: 94,
      winPattern: "VP Sales + Series B+ + no RevOps = 80% win rate",
    },
    {
      account: "Modal",
      signals: [
        { type: "hiring" as const, label: "Head of Sales Ops posted", time: "1d ago" },
        { type: "tech" as const, label: "Evaluating Clearbit alt on G2", time: "3d ago" },
        { type: "intent" as const, label: "Visited pricing 3×", time: "this week" },
      ],
      narrative: "Active evaluation window. Decision-maker researching alternatives while hiring for the role that owns the stack.",
      urgency: 91,
      winPattern: "Tech eval + hiring signal + intent = 72% win rate",
    },
    {
      account: "Vercel",
      signals: [
        { type: "champion" as const, label: "Champion moved to Vercel", time: "1w ago" },
        { type: "funding" as const, label: "Hiring 40+ GTM roles", time: "ongoing" },
      ],
      narrative: "Champion land + expand play. Former user now has budget authority at high-growth target.",
      urgency: 88,
      winPattern: "Champion move + hiring spree = 67% win rate",
    },
  ];

  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Radio size={14} className="text-bonggy-accent" />
          <span className="text-[11px] font-medium text-bonggy-text-primary uppercase tracking-wide">Signal Clusters</span>
        </div>
        <span className="text-[11px] text-bonggy-accent">3 hot accounts · 14-day window</span>
      </div>
      {clusters.map((c, i) => (
        <div
          key={c.account}
          className={`rounded-lg border transition-all duration-200 cursor-default ${
            expanded === i ? "border-bonggy-accent bg-bonggy-accent/5" : "border-bonggy-border bg-bonggy-surface hover:border-bonggy-border-hover"
          }`}
          onClick={() => setExpanded(expanded === i ? null : i)}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-bonggy-bg border border-bonggy-border flex items-center justify-center text-sm font-medium text-bonggy-text-primary">
                  {c.account[0]}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-bonggy-text-primary">{c.account}</p>
                  <p className="text-[11px] text-bonggy-text-tertiary">{c.signals.length} clustered signals</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-medium ${c.urgency >= 90 ? "text-bonggy-accent" : "text-bonggy-warning"}`}>
                  Urgency {c.urgency}
                </span>
                <ChevronRight size={14} className={`text-bonggy-text-tertiary transition-transform ${expanded === i ? "rotate-90" : ""}`} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {c.signals.map((s) => (
                <span key={s.label} className="inline-flex items-center gap-1.5 text-[11px] bg-bonggy-bg px-2 py-1 rounded border border-bonggy-border">
                  <SignalDot type={s.type} />
                  {s.label}
                </span>
              ))}
            </div>
            {expanded === i && (
              <div className="mt-3 pt-3 border-t border-bonggy-border space-y-3">
                <div className="bg-bonggy-bg rounded border border-bonggy-border p-3">
                  <p className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1">Account narrative</p>
                  <p className="text-[13px] text-bonggy-text-primary leading-[1.5]">{c.narrative}</p>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={12} className="text-bonggy-success" />
                  <span className="text-[11px] text-bonggy-success">{c.winPattern}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-[11px] text-white bg-bonggy-accent px-3 py-1.5 rounded flex items-center gap-1">
                    <Zap size={10} /> Create angle
                  </button>
                  <button className="text-[11px] text-bonggy-text-secondary bg-bonggy-bg px-3 py-1.5 rounded border border-bonggy-border flex items-center gap-1">
                    <Users size={10} /> View committee
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── AMMO PACK PREVIEW ───
function AmmoPackPreview() {
  const [activeTone, setActiveTone] = useState(0);
  const tones = [
    { name: "Advisor", label: "Soft, consultative", color: "bg-blue-500" },
    { name: "Operator", label: "Blunt, tactical", color: "bg-bonggy-text-primary" },
    { name: "Challenger", label: "Direct, sharp", color: "bg-bonggy-accent" },
  ];
  const emails = [
    { subject: "Quick thought on {company} data infrastructure", body: "Hey {firstName} — saw {company} is scaling the GTM team post-Series C. Most teams we see at this stage hit a wall around month 3 when the CRM becomes ungovernable. Happy to share how Vercel avoided that. No pitch, just 10 min of context if useful." },
    { subject: "{company} — CRM governance at 120 heads", body: "{firstName}, you\'re hiring 3 SDRs and no RevOps. That\'s a recipe for dirty data and bad pipeline hygiene. We helped Vercel clean this up in 2 weeks. Want the playbook?" },
    { subject: "Your competitors just made themselves visible", body: "{firstName}, {company}\'s funding + hiring pattern matches 14 accounts we tracked this quarter. 11 of them chose us. The 3 that didn\'t are still trying to unify their enrichment stack. Curious where you land." },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={14} className="text-bonggy-accent" />
          <span className="text-[11px] font-medium text-bonggy-text-primary uppercase tracking-wide">Ammo Pack · Priya Raman · Modal</span>
        </div>
        <span className="text-[11px] text-bonggy-success">3 tones ready</span>
      </div>

      <div className="flex gap-2">
        {tones.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setActiveTone(i)}
            className={`text-[11px] px-3 py-1.5 rounded border transition-all ${
              activeTone === i
                ? "border-bonggy-accent text-bonggy-accent bg-bonggy-accent/10"
                : "border-bonggy-border text-bonggy-text-secondary hover:border-bonggy-border-hover"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${t.color}`} />
              {t.name}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-bonggy-bg rounded-lg border border-bonggy-border p-4 space-y-3">
        <div>
          <p className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1">Subject</p>
          <p className="text-[13px] text-bonggy-text-primary">{emails[activeTone].subject}</p>
        </div>
        <div>
          <p className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1">Body</p>
          <p className="text-[13px] text-bonggy-text-secondary leading-[1.6]">{emails[activeTone].body}</p>
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-bonggy-border">
          <span className="text-[10px] text-bonggy-text-tertiary bg-bonggy-surface px-2 py-0.5 rounded">{tones[activeTone].label}</span>
          <span className="text-[10px] text-bonggy-text-tertiary">142 words · 18s read</span>
        </div>
      </div>

      <div className="bg-bonggy-surface rounded-lg border border-bonggy-border p-3">
        <p className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-2">Personalization tokens</p>
        <div className="flex flex-wrap gap-1.5">
          {["{firstName}", "{company}", "{title}", "{fundingRound}", "{hiringSignal}", "{techStack}"].map((t) => (
            <span key={t} className="text-[10px] text-bonggy-accent bg-bonggy-accent/10 px-2 py-0.5 rounded font-mono-data">{t}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="text-[11px] text-white bg-bonggy-accent px-4 py-2 rounded flex items-center gap-1.5">
          <Download size={11} /> Export pack (CSV)
        </button>
        <button className="text-[11px] text-bonggy-text-secondary bg-bonggy-bg px-4 py-2 rounded border border-bonggy-border flex items-center gap-1.5">
          <Send size={11} /> Push to Outreach
        </button>
      </div>
    </div>
  );
}

// ─── COMMITTEE HEATMAP ───
function CommitteeHeatmap() {
  const committee = [
    { role: "VP Sales", name: "Priya Raman", present: true, enriched: true, signal: "green" },
    { role: "Head of GTM", name: "Daniel Yu", present: true, enriched: true, signal: "green" },
    { role: "RevOps Lead", name: "—", present: false, enriched: false, signal: "red", gap: "Missing in 80% of won deals" },
    { role: "CMO", name: "Marco Beltran", present: true, enriched: true, signal: "yellow" },
    { role: "CTO", name: "Akshat Bubna", present: true, enriched: false, signal: "yellow" },
    { role: "Finance", name: "—", present: false, enriched: false, signal: "red", gap: "Budget owner not mapped" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-bonggy-accent" />
          <span className="text-[11px] font-medium text-bonggy-text-primary uppercase tracking-wide">Committee Heatmap · Modal</span>
        </div>
        <span className="text-[11px] text-bonggy-warning">2 thread gaps detected</span>
      </div>

      <div className="space-y-2">
        {committee.map((m) => (
          <div
            key={m.role}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              m.gap ? "border-bonggy-warning bg-bonggy-warning/5" : "border-bonggy-border bg-bonggy-surface"
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium text-white shrink-0 ${
              m.signal === "green" ? "bg-bonggy-success" : m.signal === "yellow" ? "bg-bonggy-warning" : "bg-red-500"
            }`}>
              {m.present ? m.name.split(" ").map((n) => n[0]).join("") : "?"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[13px] text-bonggy-text-primary">{m.role}</p>
                {m.gap && (
                  <span className="text-[10px] text-bonggy-warning bg-bonggy-warning/10 px-1.5 py-0.5 rounded">Thread gap</span>
                )}
              </div>
              <p className="text-[11px] text-bonggy-text-secondary">{m.present ? m.name : m.gap}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {m.enriched && <Check size={11} className="text-bonggy-success" />}
              {m.gap && <AlertTriangle size={11} className="text-bonggy-warning" />}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-bonggy-bg rounded border border-bonggy-border p-3">
        <p className="text-[11px] text-bonggy-text-secondary leading-[1.5]">
          <strong className="text-bonggy-text-primary">Recommendation:</strong> Loop in a RevOps contact first — 80% of your won deals at Series B+ infra companies had RevOps in the evaluation. Secondary: map Finance for budget approval.
        </p>
      </div>
    </div>
  );
}

// ─── WIN PATTERN MATCHER ───
function WinPatternMatcher() {
  const patterns = [
    { name: "VP Sales + Series B+ + no RevOps", winRate: "80%", matches: 3, accounts: ["Linear", "Modal", "Retool"] },
    { name: "Tech eval + hiring signal + intent", winRate: "72%", matches: 2, accounts: ["Modal", "Vercel"] },
    { name: "Champion move + hiring spree", winRate: "67%", matches: 1, accounts: ["Vercel"] },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target size={14} className="text-bonggy-accent" />
          <span className="text-[11px] font-medium text-bonggy-text-primary uppercase tracking-wide">Win Patterns</span>
        </div>
        <span className="text-[11px] text-bonggy-success">Learned from 47 closed-won deals</span>
      </div>

      <div className="space-y-3">
        {patterns.map((p) => (
          <div key={p.name} className="bg-bonggy-surface rounded-lg border border-bonggy-border p-4 hover:border-bonggy-border-hover transition-colors">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] text-bonggy-text-primary">{p.name}</p>
              <span className="text-[11px] text-bonggy-success font-medium">{p.winRate} win rate</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] text-bonggy-text-tertiary">{p.matches} current matches:</span>
              {p.accounts.map((a) => (
                <span key={a} className="text-[10px] text-bonggy-text-primary bg-bonggy-bg px-2 py-0.5 rounded border border-bonggy-border">{a}</span>
              ))}
            </div>
            <div className="h-1 bg-bonggy-bg rounded-full overflow-hidden">
              <div className="h-full bg-bonggy-success rounded-full" style={{ width: p.winRate }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SLACK ALERT CARD ───
function SlackAlertCard() {
  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare size={14} className="text-bonggy-accent" />
        <span className="text-[11px] font-medium text-bonggy-text-primary uppercase tracking-wide">Slack Alert Preview</span>
        <span className="text-[10px] text-bonggy-text-tertiary ml-auto">#priority-intent</span>
      </div>

      <div className="bg-[#1a1d21] rounded-lg border border-[#363636] p-4 text-[13px]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded bg-bonggy-accent flex items-center justify-center text-white text-[11px] font-bold shrink-0">B</div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-white font-medium">Bonggy · Signal Cluster Alert</p>
              <p className="text-[#a3a3a3] text-[12px]">Today at 9:14 AM</p>
            </div>

            <div className="bg-[#222529] rounded border border-[#363636] p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Flame size={12} className="text-bonggy-accent" />
                <span className="text-white font-medium">Linear · Urgency 94</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] text-bonggy-accent bg-bonggy-accent/20 px-1.5 py-0.5 rounded">Series C · $80M</span>
                <span className="text-[10px] text-bonggy-warning bg-bonggy-warning/20 px-1.5 py-0.5 rounded">VP Sales + 3 SDRs hired</span>
                <span className="text-[10px] text-red-400 bg-red-500/20 px-1.5 py-0.5 rounded">No RevOps presence</span>
              </div>
              <p className="text-[#c9c9c9] text-[12px] leading-[1.5]">
                Building outbound without infrastructure — 3 SDRs, no RevOps, 90 days to prove it. Win pattern match: 80%.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-[#a3a3a3] text-[11px] uppercase tracking-wide">Draft email (Advisor tone)</p>
              <p className="text-[#c9c9c9] text-[12px] leading-[1.5] italic">
                &ldquo;Hey Priya — saw Linear closed Series C and you\'re scaling the GTM team. Most teams at this stage hit a CRM governance wall around month 3. Happy to share how similar teams avoided it.&rdquo;
              </p>
            </div>

            <div className="flex gap-2">
              <span className="text-[10px] text-white bg-bonggy-accent px-2 py-1 rounded cursor-pointer">Send to sequencing sheet</span>
              <span className="text-[10px] text-[#a3a3a3] bg-[#222529] px-2 py-1 rounded border border-[#363636] cursor-pointer">Mark as contacted</span>
              <span className="text-[10px] text-[#a3a3a3] bg-[#222529] px-2 py-1 rounded border border-[#363636] cursor-pointer">Snooze 7d</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NARRATIVE COHERENCE SCORE ───
function NarrativeCoherencePanel() {
  const touches = [
    { step: 1, angle: "Efficiency play", tone: "Advisor", coherence: true },
    { step: 2, angle: "Efficiency play", tone: "Operator", coherence: true },
    { step: 3, angle: "Reporting angle", tone: "Advisor", coherence: false, warning: "Shifted from 'efficiency' to 'reporting' — committee gets mixed signals" },
    { step: 4, angle: "Efficiency play", tone: "Challenger", coherence: true },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-bonggy-accent" />
          <span className="text-[11px] font-medium text-bonggy-text-primary uppercase tracking-wide">Narrative Coherence</span>
        </div>
        <span className="text-[11px] text-bonggy-warning">1 inconsistency detected</span>
      </div>

      <div className="space-y-2">
        {touches.map((t) => (
          <div
            key={t.step}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              !t.coherence ? "border-bonggy-warning bg-bonggy-warning/5" : "border-bonggy-border bg-bonggy-surface"
            }`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0 ${
              t.coherence ? "bg-bonggy-success/10 text-bonggy-success" : "bg-bonggy-warning/10 text-bonggy-warning"
            }`}>
              {t.step}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[13px] text-bonggy-text-primary">{t.angle}</p>
                <span className="text-[10px] text-bonggy-text-tertiary bg-bonggy-bg px-1.5 py-0.5 rounded">{t.tone}</span>
              </div>
              {t.warning && <p className="text-[11px] text-bonggy-warning mt-0.5">{t.warning}</p>}
            </div>
            {t.coherence ? <Check size={14} className="text-bonggy-success shrink-0" /> : <AlertTriangle size={14} className="text-bonggy-warning shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── KNOWLEDGEBASE CONFIG PANEL ───
function KnowledgebasePanel() {
  const tones = [
    { name: "Advisor", desc: "Soft, consultative, educational", active: true },
    { name: "Operator", desc: "Blunt, tactical, efficiency-focused", active: true },
    { name: "Founder-to-founder", desc: "Peer-level, strategic", active: false },
    { name: "Challenger", desc: "Direct, provocative, respectful but sharp", active: true },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Layers size={14} className="text-bonggy-accent" />
        <span className="text-[11px] font-medium text-bonggy-text-primary uppercase tracking-wide">Knowledgebase</span>
      </div>

      <div className="bg-bonggy-surface rounded-lg border border-bonggy-border p-4">
        <p className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-2">ICP Definition</p>
        <p className="text-[13px] text-bonggy-text-primary leading-[1.5]">
          US B2B SaaS, 50–500 employees, Series A–B, outbound motion, no RevOps hire yet. Deprioritize anyone who laid off &gt;10% GTM.
        </p>
      </div>

      <div className="bg-bonggy-surface rounded-lg border border-bonggy-border p-4">
        <p className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-3">Tone DNA</p>
        <div className="space-y-2">
          {tones.map((t) => (
            <div key={t.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${t.active ? "bg-bonggy-success" : "bg-bonggy-text-tertiary"}`} />
                <span className="text-[13px] text-bonggy-text-primary">{t.name}</span>
              </div>
              <span className="text-[11px] text-bonggy-text-tertiary">{t.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-bonggy-bg rounded border border-bonggy-border p-3">
        <p className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1">Persona Map</p>
        <div className="flex flex-wrap gap-1.5">
          {["VP Sales", "Head of GTM", "RevOps Lead", "CMO", "CTO", "Finance"].map((p) => (
            <span key={p} className="text-[10px] text-bonggy-text-primary bg-bonggy-surface px-2 py-0.5 rounded border border-bonggy-border">{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── HERO WORKSPACE ───
const TABS = [
  { id: "clusters", label: "Signal Clusters", count: 3 },
  { id: "ammo", label: "Ammo Packs", count: 12 },
  { id: "committee", label: "Committees", count: 5 },
  { id: "patterns", label: "Win Patterns", count: 3 },
  { id: "slack", label: "Slack Alerts", count: null },
  { id: "coherence", label: "Coherence", count: 1 },
  { id: "kb", label: "Knowledgebase", count: null },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TAB_TITLES: Record<TabId, { title: string; subtitle: string }> = {
  clusters: { title: "Signal Clusters", subtitle: "3 hot accounts · 14-day window" },
  ammo: { title: "Ammo Pack Generator", subtitle: "12 packs ready for export" },
  committee: { title: "Committee Heatmaps", subtitle: "5 accounts mapped · 2 gaps detected" },
  patterns: { title: "Win Pattern Matcher", subtitle: "Learned from 47 closed-won deals" },
  slack: { title: "Slack Integration", subtitle: "Real-time alerts to #priority-intent" },
  coherence: { title: "Narrative Coherence", subtitle: "1 inconsistency flagged" },
  kb: { title: "Knowledgebase", subtitle: "ICP, tones, personas, motion templates" },
};

export function HeroWorkspace() {
  const [activeTab, setActiveTab] = useState<TabId>("clusters");

  return (
    <div className="w-full rounded-[10px] border border-bonggy-border bg-bonggy-surface overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]">
      {/* URL bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-bonggy-border bg-bonggy-bg">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-bonggy-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-bonggy-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-bonggy-border" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-[11px] font-mono-data text-bonggy-text-tertiary bg-bonggy-bg px-3 py-1 rounded">
            app.bonggy.com / workspace / outbound-q2
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-h-[420px]">
        {/* Sidebar */}
        <div className="shrink-0 border-b md:border-b-0 md:border-r border-bonggy-border py-3 md:py-4">
          <div className="px-4 mb-3 md:mb-6 hidden md:block">
            <span className="text-[11px] font-medium uppercase tracking-wider text-bonggy-text-tertiary">Workspace</span>
          </div>
          <div className="flex md:flex-col overflow-x-auto px-2 md:px-0 gap-1 md:gap-0 scrollbar-hide">
            {TABS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 md:gap-0 md:justify-between px-3 md:px-4 py-2 mx-1 md:mx-2 rounded-md text-[13px] text-left whitespace-nowrap transition-all duration-200 ${
                    isActive ? "bg-bonggy-bg text-bonggy-text-primary font-medium" : "text-bonggy-text-secondary hover:bg-bonggy-bg/50"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.count !== null && (
                    <span className={`text-[11px] ${isActive ? "text-bonggy-accent font-medium" : "text-bonggy-text-tertiary"}`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main area */}
        <div className="flex-1 bg-bonggy-bg overflow-hidden">
          <div className="px-4 md:px-6 pt-4 md:pt-6 pb-2">
            <h3 className="text-sm font-medium text-bonggy-text-primary mb-0.5">{TAB_TITLES[activeTab].title}</h3>
            <p className="text-[11px] text-bonggy-text-tertiary">{TAB_TITLES[activeTab].subtitle}</p>
          </div>
          <div className="px-4 md:px-6 pb-4 md:pb-6">
            <div className="bg-bonggy-surface rounded-lg border border-bonggy-border overflow-hidden">
              {activeTab === "clusters" && <SignalClusterBoard />}
              {activeTab === "ammo" && <AmmoPackPreview />}
              {activeTab === "committee" && <CommitteeHeatmap />}
              {activeTab === "patterns" && <WinPatternMatcher />}
              {activeTab === "slack" && <SlackAlertCard />}
              {activeTab === "coherence" && <NarrativeCoherencePanel />}
              {activeTab === "kb" && <KnowledgebasePanel />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Standalone components for the Product Grid section
   ================================================================ */

export function SignalClusterCard() {
  return (
    <div className="w-full rounded-[10px] border border-bonggy-border bg-bonggy-surface overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-bonggy-border">
        <div className="flex items-center gap-2">
          <Radio size={14} className="text-bonggy-accent" />
          <h3 className="text-sm font-medium text-bonggy-text-primary">Signal Clusters</h3>
        </div>
        <span className="text-[11px] text-bonggy-accent">3 hot accounts</span>
      </div>
      <div className="p-4 space-y-3">
        {[
          { account: "Linear", signals: ["Series C", "VP Sales hire", "No RevOps"], urgency: 94 },
          { account: "Modal", signals: ["Tech eval", "Hiring signal", "Intent 3x"], urgency: 91 },
          { account: "Vercel", signals: ["Champion moved", "Hiring 40+"], urgency: 88 },
        ].map((a) => (
          <div key={a.account} className="flex items-center gap-3 p-3 rounded-lg border border-bonggy-border bg-bonggy-bg hover:border-bonggy-border-hover transition-colors">
            <div className="w-8 h-8 rounded-lg bg-bonggy-surface border border-bonggy-border flex items-center justify-center text-sm font-medium text-bonggy-text-primary">
              {a.account[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-bonggy-text-primary">{a.account}</p>
              <div className="flex flex-wrap gap-1 mt-0.5">
                {a.signals.map((s) => (
                  <span key={s} className="text-[10px] text-bonggy-text-secondary bg-bonggy-surface px-1.5 py-0.5 rounded border border-bonggy-border">{s}</span>
                ))}
              </div>
            </div>
            <span className={`text-[11px] font-medium shrink-0 ${a.urgency >= 90 ? "text-bonggy-accent" : "text-bonggy-warning"}`}>
              {a.urgency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AmmoPackCard() {
  return (
    <div className="w-full rounded-[10px] border border-bonggy-border bg-bonggy-surface overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-bonggy-border">
        <div className="flex items-center gap-2">
          <FileText size={14} className="text-bonggy-accent" />
          <h3 className="text-sm font-medium text-bonggy-text-primary">Ammo Pack Export</h3>
        </div>
        <span className="text-[11px] text-bonggy-success">3 tones</span>
      </div>
      <div className="p-4 space-y-3">
        {[
          { tone: "Advisor", preview: "Most teams at this stage hit a wall around month 3...", color: "bg-blue-500" },
          { tone: "Operator", preview: "You\'re hiring 3 SDRs and no RevOps. That\'s a recipe for...", color: "bg-bonggy-text-primary" },
          { tone: "Challenger", preview: "11 of them chose us. The 3 that didn\'t are still trying to...", color: "bg-bonggy-accent" },
        ].map((t) => (
          <div key={t.tone} className="p-3 rounded-lg border border-bonggy-border bg-bonggy-bg hover:border-bonggy-border-hover transition-colors">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${t.color}`} />
              <span className="text-[11px] text-bonggy-text-tertiary">{t.tone}</span>
            </div>
            <p className="text-[12px] text-bonggy-text-secondary leading-[1.5] line-clamp-2">{t.preview}</p>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1">
          <button className="text-[11px] text-white bg-bonggy-accent px-3 py-1.5 rounded flex items-center gap-1">
            <Download size={10} /> Export CSV
          </button>
          <button className="text-[11px] text-bonggy-text-secondary bg-bonggy-bg px-3 py-1.5 rounded border border-bonggy-border flex items-center gap-1">
            <Send size={10} /> Push to Outreach
          </button>
        </div>
      </div>
    </div>
  );
}

export function SlackAlertStandalone() {
  return (
    <div className="w-full rounded-[10px] border border-bonggy-border bg-bonggy-surface overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-bonggy-border">
        <div className="flex items-center gap-2">
          <MessageSquare size={14} className="text-bonggy-accent" />
          <h3 className="text-sm font-medium text-bonggy-text-primary">Slack Alert</h3>
        </div>
        <span className="text-[10px] text-bonggy-text-tertiary bg-bonggy-bg px-2 py-0.5 rounded border border-bonggy-border">#priority-intent</span>
      </div>
      <div className="p-4">
        <div className="bg-[#1a1d21] rounded-lg border border-[#363636] p-4 text-[12px]">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded bg-bonggy-accent flex items-center justify-center text-white text-[10px] font-bold shrink-0">B</div>
            <div className="flex-1 space-y-2">
              <p className="text-white font-medium">Signal: Linear · Urgency 94</p>
              <div className="flex flex-wrap gap-1">
                <span className="text-[9px] text-bonggy-accent bg-bonggy-accent/20 px-1 py-0.5 rounded">Series C</span>
                <span className="text-[9px] text-bonggy-warning bg-bonggy-warning/20 px-1 py-0.5 rounded">VP Sales hired</span>
                <span className="text-[9px] text-red-400 bg-red-500/20 px-1 py-0.5 rounded">No RevOps</span>
              </div>
              <p className="text-[#c9c9c9] leading-[1.4]">
                3 SDRs, no RevOps, 90 days to prove it. Win pattern: 80%.
              </p>
              <div className="flex gap-1.5 pt-1">
                <span className="text-[9px] text-white bg-bonggy-accent px-1.5 py-0.5 rounded">To sequencing sheet</span>
                <span className="text-[9px] text-[#a3a3a3] bg-[#222529] px-1.5 py-0.5 rounded border border-[#363636]">Snooze 7d</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrustQueuePanel() {
  const items = [
    { name: "Priya Raman", title: "VP Sales", company: "Modal", email: "priya@modal.com", source: "Signal cluster · 3 signals", confidence: 96, status: "good" },
    { name: "Daniel Yu", title: "Head of GTM", company: "Linear", email: "daniel@linear.app", source: "Win pattern match · 80%", confidence: 91, status: "good" },
    { name: "Sara Lindqvist", title: "RevOps", company: "Vercel", email: "s.lindqvist@vercel.com", source: "Thread gap detected", confidence: 72, status: "warn" },
    { name: "Marco Beltran", title: "CMO", company: "Retool", email: "marco@retool.com", source: "Narrative ready · 3 tones", confidence: 88, status: "good" },
  ];

  return (
    <div className="w-full rounded-[10px] border border-bonggy-border bg-bonggy-surface overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-bonggy-border">
        <div>
          <h3 className="text-sm font-medium text-bonggy-text-primary">Strike Queue</h3>
          <p className="text-[11px] text-bonggy-text-tertiary mt-0.5">4 contacts armed and ready</p>
        </div>
        <div className="flex gap-2">
          <button className="text-[11px] text-bonggy-text-secondary bg-bonggy-bg px-3 py-1.5 rounded border border-bonggy-border flex items-center gap-1 hover:border-bonggy-border-hover transition-colors">
            <SkipForward size={11} /> Skip
          </button>
          <button className="text-[11px] text-bonggy-surface bg-bonggy-text-primary px-3 py-1.5 rounded flex items-center gap-1 hover:opacity-85 transition-opacity">
            <CheckCircle2 size={11} /> Approve all
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px]">
          <thead>
            <tr className="border-b border-bonggy-border bg-bonggy-bg">
              <th className="text-left text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-5 py-2.5">Contact</th>
              <th className="text-left text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-3 py-2.5">Signal</th>
              <th className="text-right text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-5 py-2.5">Score</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.name} className={`border-b border-bonggy-border hover:bg-bonggy-bg transition-colors ${item.status === "warn" ? "bg-bonggy-warning/5" : ""}`}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={item.name.split(" ").map((n) => n[0]).join("")} color={item.status === "warn" ? "#c9a227" : "#1a1a1a"} />
                    <div>
                      <p className="text-[13px] text-bonggy-text-primary">{item.name}</p>
                      <p className="text-[11px] text-bonggy-text-tertiary">{item.title} · {item.company}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className="text-[11px] text-bonggy-text-secondary bg-bonggy-bg px-2 py-0.5 rounded border border-bonggy-border">{item.source}</span>
                </td>
                <td className="px-5 py-3 text-right">
                  <span className={`text-[13px] font-medium ${item.confidence >= 90 ? "text-bonggy-success" : item.confidence >= 80 ? "text-bonggy-text-primary" : "text-bonggy-warning"}`}>
                    {item.confidence}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
