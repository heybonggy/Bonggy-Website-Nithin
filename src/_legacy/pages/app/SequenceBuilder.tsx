import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Plus,
  GripVertical,
  Mail,
  Phone,
  Linkedin,
  Clock,
  Trash2,
  Copy,
  ChevronDown,
  ChevronUp,
  Send,
  Save,
  Zap,
} from "lucide-react";
import TopBar from "@/components/app/TopBar";

interface SequenceStep {
  id: string;
  channel: "email" | "call" | "linkedin" | "task";
  delay: string;
  subject: string;
  body: string;
  expanded: boolean;
}

const initialSteps: SequenceStep[] = [
  {
    id: "1",
    channel: "email",
    delay: "Immediately",
    subject: "Quick thought on {company}'s data infrastructure",
    body: "Hey {firstName} — saw {company} is scaling the GTM team post-Series C. Most teams we see at this stage hit a wall around month 3 when the CRM becomes ungovernable. Happy to share how similar teams avoided that. No pitch, just 10 min of context if useful.",
    expanded: true,
  },
  {
    id: "2",
    channel: "email",
    delay: "3 days",
    subject: "Re: {company}'s outbound setup",
    body: "{firstName}, quick follow-up. I sent a note a few days ago about the CRM governance challenge at fast-growing teams. If timing's off, totally get it. But if you're starting to feel the pain of 3 SDRs entering data into different formats, might be worth a brief conversation.",
    expanded: false,
  },
  {
    id: "3",
    channel: "linkedin",
    delay: "5 days",
    subject: "",
    body: "Saw your post about scaling the sales team at {company}. Curious — how are you thinking about data governance as you add more SDRs? We've helped teams avoid the 'month 3 mess'.",
    expanded: false,
  },
  {
    id: "4",
    channel: "email",
    delay: "7 days",
    subject: "The 90-day prove-it window",
    body: "{firstName}, I'll be direct — you're 3 SDRs in with no RevOps hire. That's a 90-day prove-it window before the data chaos becomes permanent. We helped Vercel clean this up in 2 weeks. Want the playbook?",
    expanded: false,
  },
  {
    id: "5",
    channel: "task",
    delay: "10 days",
    subject: "",
    body: "Call {firstName} at {company}. Reference: 3 SDRs, no RevOps, 90-day window. Offer: 10-min breakdown of how Vercel avoided the Month 3 mess.",
    expanded: false,
  },
];

const channelIcons = {
  email: Mail,
  call: Phone,
  linkedin: Linkedin,
  task: Clock,
};

const channelColors = {
  email: "bg-blue-500/10 text-blue-500",
  call: "bg-bonggy-success/10 text-bonggy-success",
  linkedin: "bg-[#0077b5]/10 text-[#0077b5]",
  task: "bg-bonggy-warning/10 text-bonggy-warning",
};

export default function SequenceBuilder() {
  const [steps, setSteps] = useState<SequenceStep[]>(initialSteps);
  const [name, setName] = useState("Series A Outbound Play");
  const [framework, setFramework] = useState("Challenger");
  const [tone, setTone] = useState("Operator");

  const toggleExpand = (id: string) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, expanded: !s.expanded } : s)));
  };

  return (
    <div className="min-h-screen">
      <TopBar title="Sequence Builder" description={name}>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bonggy-text-primary text-bonggy-surface text-[13px] hover:opacity-85 transition-opacity">
          <Save size={14} /> Save
        </button>
      </TopBar>

      <div className="p-6 max-w-[1400px]">
        {/* Back + Header */}
        <div className="mb-6">
          <Link
            to="/app/sequences"
            className="inline-flex items-center gap-1 text-[12px] text-bonggy-text-tertiary hover:text-bonggy-text-primary transition-colors mb-4"
          >
            <ArrowLeft size={12} /> Back to sequences
          </Link>

          <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1.5 block">
                  Sequence Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-bonggy-border bg-bonggy-bg text-[13px] text-bonggy-text-primary outline-none focus:border-bonggy-text-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1.5 block">
                  Framework
                </label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-bonggy-border bg-bonggy-bg text-[13px] text-bonggy-text-primary outline-none focus:border-bonggy-text-primary transition-colors"
                >
                  <option>Challenger</option>
                  <option>Advisor</option>
                  <option>Educational</option>
                  <option>Problem-Agitation</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1.5 block">
                  Default Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-bonggy-border bg-bonggy-bg text-[13px] text-bonggy-text-primary outline-none focus:border-bonggy-text-primary transition-colors"
                >
                  <option>Advisor</option>
                  <option>Operator</option>
                  <option>Challenger</option>
                  <option>Founder-to-founder</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Steps Panel */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-semibold text-bonggy-text-primary">
                Steps ({steps.length})
              </h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bonggy-text-primary text-bonggy-surface text-[12px] hover:opacity-85 transition-opacity">
                <Plus size={12} /> Add Step
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => {
                const Icon = channelIcons[step.channel];
                return (
                  <div
                    key={step.id}
                    className="bg-bonggy-surface border border-bonggy-border rounded-xl overflow-hidden hover:border-bonggy-border-hover transition-colors"
                  >
                    {/* Step Header */}
                    <div
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                      onClick={() => toggleExpand(step.id)}
                    >
                      <GripVertical size={14} className="text-bonggy-text-tertiary cursor-grab" />
                      <span className="text-[11px] text-bonggy-text-tertiary font-mono-data w-5">
                        {index + 1}
                      </span>
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center ${channelColors[step.channel]}`}>
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] text-bonggy-text-primary capitalize">{step.channel}</span>
                          <span className="text-[10px] text-bonggy-text-tertiary flex items-center gap-1">
                            <Clock size={10} /> {step.delay}
                          </span>
                        </div>
                        {!step.expanded && step.subject && (
                          <p className="text-[11px] text-bonggy-text-tertiary truncate">{step.subject}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); }}
                          className="p-1 rounded text-bonggy-text-tertiary hover:text-bonggy-text-primary hover:bg-bonggy-bg transition-colors"
                        >
                          <Copy size={12} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); }}
                          className="p-1 rounded text-bonggy-text-tertiary hover:text-red-500 hover:bg-bonggy-bg transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                        {step.expanded ? <ChevronUp size={14} className="text-bonggy-text-tertiary" /> : <ChevronDown size={14} className="text-bonggy-text-tertiary" />}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {step.expanded && (
                      <div className="px-4 pb-4 border-t border-bonggy-border">
                        {step.subject && (
                          <div className="mt-3">
                            <label className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1 block">
                              Subject
                            </label>
                            <input
                              value={step.subject}
                              onChange={() => {}}
                              className="w-full px-3 py-2 rounded-lg border border-bonggy-border bg-bonggy-bg text-[13px] text-bonggy-text-primary outline-none focus:border-bonggy-text-primary transition-colors"
                            />
                          </div>
                        )}
                        <div className="mt-3">
                          <label className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1 block">
                            Body
                          </label>
                          <textarea
                            value={step.body}
                            onChange={() => {}}
                            rows={4}
                            className="w-full px-3 py-2 rounded-lg border border-bonggy-border bg-bonggy-bg text-[13px] text-bonggy-text-primary outline-none focus:border-bonggy-text-primary transition-colors resize-none"
                          />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {["{firstName}", "{company}", "{title}", "{fundingRound}", "{hiringSignal}", "{techStack}"].map((token) => (
                            <button
                              key={token}
                              className="text-[10px] text-bonggy-accent bg-bonggy-accent/10 px-2 py-0.5 rounded font-mono-data hover:bg-bonggy-accent/20 transition-colors"
                            >
                              {token}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <Send size={16} className="text-bonggy-text-secondary" />
                <h2 className="text-[15px] font-semibold text-bonggy-text-primary">Preview</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1.5 block">
                    Select Contact
                  </label>
                  <select className="w-full px-3 py-2 rounded-lg border border-bonggy-border bg-bonggy-bg text-[13px] text-bonggy-text-primary outline-none">
                    <option>Priya Raman · VP Sales · Linear</option>
                    <option>Daniel Yu · Head of GTM · Linear</option>
                    <option>Marco Beltran · CMO · Linear</option>
                  </select>
                </div>

                <div className="bg-bonggy-bg rounded-lg border border-bonggy-border p-4">
                  <p className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1">
                    Subject
                  </p>
                  <p className="text-[13px] text-bonggy-text-primary">
                    Quick thought on Linear's data infrastructure
                  </p>
                </div>

                <div className="bg-bonggy-bg rounded-lg border border-bonggy-border p-4">
                  <p className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide mb-1">
                    Body
                  </p>
                  <p className="text-[13px] text-bonggy-text-secondary leading-[1.6]">
                    Hey Priya — saw Linear is scaling the GTM team post-Series C. Most teams we see at this stage hit a wall around month 3 when the CRM becomes ungovernable. Happy to share how similar teams avoided that. No pitch, just 10 min of context if useful.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <span className="text-[10px] text-bonggy-text-tertiary bg-bonggy-bg px-2 py-0.5 rounded border border-bonggy-border">
                    Operator tone
                  </span>
                  <span className="text-[10px] text-bonggy-text-tertiary">
                    142 words · 18s read
                  </span>
                </div>

                <div className="pt-4 border-t border-bonggy-border">
                  <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-bonggy-accent text-white text-[13px] hover:opacity-85 transition-opacity">
                    <Zap size={14} /> Generate Ammo Pack
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
