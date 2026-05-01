import { useState, useEffect, useCallback } from "react";
import {
  ShieldCheck,
  Check,
  X,
  SkipForward,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  SkipForwardIcon,
} from "lucide-react";
import TopBar from "@/components/app/TopBar";

interface QueueItem {
  id: string;
  contactName: string;
  title: string;
  company: string;
  field: string;
  before: string;
  after: string;
  provider: string;
  confidence: number;
  cost: string;
}

const queueItems: QueueItem[] = [
  {
    id: "q1",
    contactName: "Priya Raman",
    title: "VP Sales",
    company: "Modal",
    field: "Email",
    before: "priya.raman@modal.io",
    after: "priya@modal.com",
    provider: "Apollo",
    confidence: 96,
    cost: "$0.10",
  },
  {
    id: "q2",
    contactName: "Daniel Yu",
    title: "Head of GTM",
    company: "Linear",
    field: "Phone",
    before: "—",
    after: "+1 (415) 555-0142",
    provider: "ZoomInfo",
    confidence: 91,
    cost: "$0.15",
  },
  {
    id: "q3",
    contactName: "Sarah Lindqvist",
    title: "RevOps Lead",
    company: "Vercel",
    field: "Title",
    before: "Sales Ops Manager",
    after: "Senior RevOps Lead",
    provider: "Clearbit",
    confidence: 72,
    cost: "$0.05",
  },
  {
    id: "q4",
    contactName: "Marco Beltran",
    title: "CMO",
    company: "Retool",
    field: "Email",
    before: "marco@retool.io",
    after: "marco.beltran@retool.com",
    provider: "Hunter",
    confidence: 88,
    cost: "$0.02",
  },
  {
    id: "q5",
    contactName: "Akshat Bubna",
    title: "CTO",
    company: "Linear",
    field: "LinkedIn",
    before: "—",
    after: "linkedin.com/in/akshatbubna",
    provider: "Apollo",
    confidence: 94,
    cost: "$0.10",
  },
  {
    id: "q6",
    contactName: "Jessica Park",
    title: "VP Revenue",
    company: "Figma",
    field: "Phone",
    before: "+1 (510) 555-0198",
    after: "+1 (415) 555-0234",
    provider: "ZoomInfo",
    confidence: 68,
    cost: "$0.15",
  },
];

export default function TrustQueue() {
  const [items] = useState<QueueItem[]>(queueItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [decisions, setDecisions] = useState<Record<string, "approved" | "rejected" | "skipped">>({});
  const [autoApproveThreshold, setAutoApproveThreshold] = useState(90);

  const current = items[currentIndex];
  const remaining = items.filter((item) => !decisions[item.id]).length;
  const approved = Object.values(decisions).filter((d) => d === "approved").length;
  const rejected = Object.values(decisions).filter((d) => d === "rejected").length;

  const handleDecision = useCallback((id: string, decision: "approved" | "rejected" | "skipped") => {
    setDecisions((prev) => ({ ...prev, [id]: decision }));
    setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));
  }, [items.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!current) return;
      switch (e.key.toLowerCase()) {
        case "a":
          handleDecision(current.id, "approved");
          break;
        case "r":
          handleDecision(current.id, "rejected");
          break;
        case "s":
          handleDecision(current.id, "skipped");
          break;
        case "j":
          setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));
          break;
        case "k":
          setCurrentIndex((prev) => Math.max(prev - 1, 0));
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, handleDecision, items.length]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <TopBar title="Trust Queue" />
        <div className="p-6 text-center py-20">
          <ShieldCheck size={48} className="mx-auto text-bonggy-success mb-4" />
          <p className="text-lg text-bonggy-text-primary">All caught up!</p>
          <p className="text-[13px] text-bonggy-text-tertiary mt-1">No items in the trust queue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TopBar title="Trust Queue" description={`${remaining} pending · ${approved} approved · ${rejected} rejected`} />

      <div className="p-6 max-w-[1000px] mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] text-bonggy-text-tertiary">
              Item {currentIndex + 1} of {items.length}
            </span>
            <span className="text-[12px] text-bonggy-text-tertiary">
              {remaining} remaining
            </span>
          </div>
          <div className="w-full h-1.5 bg-bonggy-bg rounded-full overflow-hidden">
            <div
              className="h-full bg-bonggy-accent rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
            />
          </div>
        </div>

        {current && !decisions[current.id] ? (
          <>
            {/* Review Card */}
            <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-6 mb-6">
              {/* Contact Header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-bonggy-border">
                <div className="w-12 h-12 rounded-full bg-bonggy-text-primary flex items-center justify-center text-[15px] font-medium text-bonggy-surface">
                  {current.contactName.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-[16px] font-medium text-bonggy-text-primary">{current.contactName}</p>
                  <p className="text-[13px] text-bonggy-text-secondary">{current.title} · {current.company}</p>
                </div>
                <div className="ml-auto text-right">
                  <span className={`text-[14px] font-medium ${
                    current.confidence >= 90 ? "text-bonggy-success" :
                    current.confidence >= 70 ? "text-bonggy-warning" : "text-bonggy-text-tertiary"
                  }`}>
                    {current.confidence}%
                  </span>
                  <p className="text-[11px] text-bonggy-text-tertiary">confidence</p>
                </div>
              </div>

              {/* Field Change */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] text-bonggy-text-tertiary uppercase tracking-wide">Field</span>
                  <span className="text-[13px] font-medium text-bonggy-text-primary">{current.field}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-bonggy-bg rounded-lg border border-bonggy-border p-4">
                    <p className="text-[10px] text-bonggy-text-tertiary uppercase tracking-wide mb-1">Before</p>
                    <p className="text-[14px] text-bonggy-text-secondary">{current.before}</p>
                  </div>
                  <div className="bg-bonggy-accent/5 rounded-lg border border-bonggy-accent/20 p-4">
                    <p className="text-[10px] text-bonggy-accent uppercase tracking-wide mb-1">After</p>
                    <p className="text-[14px] text-bonggy-text-primary">{current.after}</p>
                  </div>
                </div>
              </div>

              {/* Provider Info */}
              <div className="flex items-center gap-6 pt-4 border-t border-bonggy-border">
                <div>
                  <p className="text-[10px] text-bonggy-text-tertiary uppercase tracking-wide">Provider</p>
                  <p className="text-[13px] text-bonggy-text-primary">{current.provider}</p>
                </div>
                <div>
                  <p className="text-[10px] text-bonggy-text-tertiary uppercase tracking-wide">Cost</p>
                  <p className="text-[13px] text-bonggy-text-primary">{current.cost}</p>
                </div>
                <div>
                  <p className="text-[10px] text-bonggy-text-tertiary uppercase tracking-wide">Method</p>
                  <p className="text-[13px] text-bonggy-text-primary">Waterfall enrichment</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleDecision(current.id, "rejected")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-red-200 bg-red-50 text-red-600 text-[13px] hover:bg-red-100 transition-colors dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400"
              >
                <X size={16} /> Reject <kbd className="text-[10px] bg-red-100 dark:bg-red-500/20 px-1.5 py-0.5 rounded ml-1">R</kbd>
              </button>
              <button
                onClick={() => handleDecision(current.id, "skipped")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-bonggy-border bg-bonggy-bg text-bonggy-text-secondary text-[13px] hover:border-bonggy-border-hover transition-colors"
              >
                <SkipForward size={16} /> Skip <kbd className="text-[10px] bg-bonggy-surface px-1.5 py-0.5 rounded ml-1">S</kbd>
              </button>
              <button
                onClick={() => handleDecision(current.id, "approved")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-bonggy-success text-white text-[13px] hover:opacity-85 transition-opacity"
              >
                <Check size={16} /> Approve <kbd className="text-[10px] bg-bonggy-success/30 px-1.5 py-0.5 rounded ml-1">A</kbd>
              </button>
            </div>

            <p className="text-center text-[11px] text-bonggy-text-tertiary mt-4">
              Use keyboard shortcuts: A to approve, R to reject, S to skip, J/K to navigate
            </p>
          </>
        ) : (
          <div className="text-center py-16">
            {current && decisions[current.id] === "approved" && (
              <CheckCircle2 size={48} className="mx-auto text-bonggy-success mb-4" />
            )}
            {current && decisions[current.id] === "rejected" && (
              <XCircle size={48} className="mx-auto text-red-500 mb-4" />
            )}
            {current && decisions[current.id] === "skipped" && (
              <SkipForwardIcon size={48} className="mx-auto text-bonggy-warning mb-4" />
            )}
            <p className="text-[15px] text-bonggy-text-primary">
              {current ? `This item has been ${decisions[current.id]}` : "No more items"}
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={() => setCurrentIndex(Math.max(currentIndex - 1, 0))}
                className="flex items-center gap-1 px-4 py-2 rounded-lg border border-bonggy-border text-[12px] text-bonggy-text-secondary hover:border-bonggy-border-hover transition-colors"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <button
                onClick={() => setCurrentIndex(Math.min(currentIndex + 1, items.length - 1))}
                className="flex items-center gap-1 px-4 py-2 rounded-lg border border-bonggy-border text-[12px] text-bonggy-text-secondary hover:border-bonggy-border-hover transition-colors"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Bulk Actions */}
        <div className="mt-8 bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
          <h3 className="text-[14px] font-medium text-bonggy-text-primary mb-3">Bulk Actions</h3>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-bonggy-text-secondary">Auto-approve above</span>
              <input
                type="number"
                value={autoApproveThreshold}
                onChange={(e) => setAutoApproveThreshold(Number(e.target.value))}
                className="w-16 px-2 py-1 rounded border border-bonggy-border bg-bonggy-bg text-[12px] text-bonggy-text-primary outline-none text-center"
              />
              <span className="text-[12px] text-bonggy-text-secondary">% confidence</span>
            </div>
            <button className="px-4 py-2 rounded-lg bg-bonggy-success text-white text-[12px] hover:opacity-85 transition-opacity">
              Approve All Remaining
            </button>
            <button className="px-4 py-2 rounded-lg border border-bonggy-border text-bonggy-text-secondary text-[12px] hover:border-bonggy-border-hover transition-colors">
              Skip All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
