import { useState } from "react";
import {
  Zap,
  Download,
  Send,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  Target,
} from "lucide-react";
import TopBar from "@/components/app/TopBar";

const ammoPacks = [
  {
    id: "a1",
    contact: "Priya Raman",
    title: "VP Sales",
    company: "Linear",
    account: "Linear",
    clusterUrgency: 94,
    tones: [
      {
        name: "Advisor",
        color: "bg-blue-500",
        subject: "Quick thought on {company}'s data infrastructure",
        body: "Hey {firstName} — saw {company} is scaling the GTM team post-Series C. Most teams we see at this stage hit a wall around month 3 when the CRM becomes ungovernable. Happy to share how similar teams avoided that. No pitch, just 10 min of context if useful.",
        wordCount: 142,
        readTime: "18s",
      },
      {
        name: "Operator",
        color: "bg-bonggy-text-primary",
        subject: "{company} — CRM governance at 120 heads",
        body: "{firstName}, you're hiring 3 SDRs and no RevOps. That's a recipe for dirty data and bad pipeline hygiene. We helped Vercel clean this up in 2 weeks. Want the playbook?",
        wordCount: 89,
        readTime: "12s",
      },
      {
        name: "Challenger",
        color: "bg-bonggy-accent",
        subject: "Your competitors just made themselves visible",
        body: "{firstName}, {company}'s funding + hiring pattern matches 14 accounts we tracked this quarter. 11 of them chose us. The 3 that didn't are still trying to unify their enrichment stack. Curious where you land.",
        wordCount: 118,
        readTime: "15s",
      },
    ],
    tokens: ["{firstName}", "{company}", "{title}", "{fundingRound}", "{hiringSignal}"],
    generatedAt: "2 hrs ago",
  },
  {
    id: "a2",
    contact: "Daniel Yu",
    title: "Head of GTM",
    company: "Modal",
    account: "Modal",
    clusterUrgency: 91,
    tones: [
      {
        name: "Advisor",
        color: "bg-blue-500",
        subject: "Saw {company} is evaluating alternatives",
        body: "Hi {firstName} — noticed {company} is looking at Clearbit alternatives on G2. We've helped teams at your stage consolidate their enrichment stack and cut costs by 40%. Happy to share what that looks like.",
        wordCount: 134,
        readTime: "17s",
      },
      {
        name: "Operator",
        color: "bg-bonggy-text-primary",
        subject: "Your enrichment stack is bleeding money",
        body: "{firstName}, you're evaluating Clearbit alternatives because the pricing doesn't scale. We see this every week. Modal can cut enrichment spend by 40% while getting better coverage. Here's the breakdown.",
        wordCount: 98,
        readTime: "13s",
      },
      {
        name: "Challenger",
        color: "bg-bonggy-accent",
        subject: "The teams that move fast win",
        body: "{firstName}, 23 companies evaluated enrichment vendors this quarter. The 16 that decided in under 30 days got better pricing and faster implementation. The 7 that didn't are still comparing feature checklists.",
        wordCount: 112,
        readTime: "14s",
      },
    ],
    tokens: ["{firstName}", "{company}", "{title}", "{techStack}"],
    generatedAt: "4 hrs ago",
  },
  {
    id: "a3",
    contact: "Sarah Chen",
    title: "VP Revenue",
    company: "Vercel",
    account: "Vercel",
    clusterUrgency: 88,
    tones: [
      {
        name: "Advisor",
        color: "bg-blue-500",
        subject: "Congrats on the growth, {firstName}",
        body: "Hey {firstName} — 40+ GTM hires is impressive. We've helped teams at Vercel's scale avoid the common infrastructure pitfalls that slow down ramp time. Happy to share the playbook.",
        wordCount: 128,
        readTime: "16s",
      },
      {
        name: "Operator",
        color: "bg-bonggy-text-primary",
        subject: "40 hires need 1 RevOps",
        body: "{firstName}, 40 GTM hires without a dedicated RevOps function is a data disaster waiting to happen. We set up the infrastructure for teams exactly like yours. Takes 2 weeks.",
        wordCount: 92,
        readTime: "12s",
      },
    ],
    tokens: ["{firstName}", "{company}", "{title}", "{hiringSignal}"],
    generatedAt: "6 hrs ago",
  },
];

export default function AmmoPacks() {
  const [expandedPack, setExpandedPack] = useState<string | null>("a1");
  const [activeTone, setActiveTone] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const getActiveTone = (packId: string) => activeTone[packId] || 0;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen">
      <TopBar title="Ammo Packs" description={`${ammoPacks.length} packs generated · ${ammoPacks.reduce((acc, p) => acc + p.tones.length, 0)} tones total`}>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bonggy-text-primary text-bonggy-surface text-[13px] hover:opacity-85 transition-opacity">
          <Plus size={14} /> Generate New
        </button>
      </TopBar>

      <div className="p-6 max-w-[1400px]">
        <div className="space-y-4">
          {ammoPacks.map((pack) => {
            const currentTone = pack.tones[getActiveTone(pack.id)];
            const isExpanded = expandedPack === pack.id;

            return (
              <div
                key={pack.id}
                className={`bg-bonggy-surface border rounded-xl overflow-hidden transition-all ${
                  isExpanded ? "border-bonggy-accent" : "border-bonggy-border hover:border-bonggy-border-hover"
                }`}
              >
                {/* Header */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                  onClick={() => setExpandedPack(isExpanded ? null : pack.id)}
                >
                  <div className="w-10 h-10 rounded-lg bg-bonggy-accent/10 flex items-center justify-center shrink-0">
                    <Zap size={18} className="text-bonggy-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-medium text-bonggy-text-primary">
                        {pack.contact}
                      </p>
                      <span className="text-[11px] text-bonggy-text-tertiary">{pack.title}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-bonggy-text-secondary">{pack.company}</span>
                      <span className="text-bonggy-text-tertiary">·</span>
                      <span className="text-[11px] text-bonggy-accent">Urgency {pack.clusterUrgency}</span>
                      <span className="text-bonggy-text-tertiary">·</span>
                      <span className="text-[11px] text-bonggy-text-tertiary">{pack.tones.length} tones</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-bonggy-text-tertiary">{pack.generatedAt}</span>
                    {isExpanded ? <ChevronUp size={16} className="text-bonggy-text-tertiary" /> : <ChevronDown size={16} className="text-bonggy-text-tertiary" />}
                  </div>
                </div>

                {/* Expanded */}
                {isExpanded && currentTone && (
                  <div className="border-t border-bonggy-border px-5 pb-5">
                    {/* Tone Switcher */}
                    <div className="flex items-center gap-2 py-4">
                      <span className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mr-2">Tones:</span>
                      {pack.tones.map((tone, i) => (
                        <button
                          key={tone.name}
                          onClick={() => setActiveTone({ ...activeTone, [pack.id]: i })}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] border transition-all ${
                            getActiveTone(pack.id) === i
                              ? "border-bonggy-accent text-bonggy-accent bg-bonggy-accent/10"
                              : "border-bonggy-border text-bonggy-text-secondary hover:border-bonggy-border-hover"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${tone.color}`} />
                          {tone.name}
                        </button>
                      ))}
                    </div>

                    {/* Email Preview */}
                    <div className="bg-bonggy-bg rounded-xl border border-bonggy-border p-5 space-y-4">
                      <div>
                        <p className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1">Subject</p>
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[14px] text-bonggy-text-primary">{currentTone.subject}</p>
                          <button
                            onClick={() => handleCopy(currentTone.subject, `${pack.id}-subject`)}
                            className="p-1.5 rounded-md text-bonggy-text-tertiary hover:text-bonggy-text-primary hover:bg-bonggy-surface transition-colors shrink-0"
                          >
                            {copied === `${pack.id}-subject` ? <Check size={14} className="text-bonggy-success" /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1">Body</p>
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-[14px] text-bonggy-text-secondary leading-[1.7]">{currentTone.body}</p>
                          <button
                            onClick={() => handleCopy(currentTone.body, `${pack.id}-body`)}
                            className="p-1.5 rounded-md text-bonggy-text-tertiary hover:text-bonggy-text-primary hover:bg-bonggy-surface transition-colors shrink-0 mt-0.5"
                          >
                            {copied === `${pack.id}-body` ? <Check size={14} className="text-bonggy-success" /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-bonggy-border">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-bonggy-text-tertiary bg-bonggy-surface px-2 py-0.5 rounded border border-bonggy-border">
                            {currentTone.wordCount} words
                          </span>
                          <span className="text-[10px] text-bonggy-text-tertiary">
                            {currentTone.readTime} read
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {pack.tokens.map((token) => (
                            <span key={token} className="text-[10px] text-bonggy-accent bg-bonggy-accent/10 px-2 py-0.5 rounded font-mono-data">
                              {token}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4">
                      <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-bonggy-accent text-white text-[12px] hover:opacity-85 transition-opacity">
                        <Download size={12} /> Export CSV
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-bonggy-border bg-bonggy-bg text-bonggy-text-secondary text-[12px] hover:border-bonggy-border-hover transition-colors">
                        <Send size={12} /> Push to Outreach
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-bonggy-border bg-bonggy-bg text-bonggy-text-secondary text-[12px] hover:border-bonggy-border-hover transition-colors">
                        <Target size={12} /> Add to Sequence
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
