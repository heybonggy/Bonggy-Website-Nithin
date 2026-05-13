import { useState } from "react";
import { Link } from "react-router";
import {
  FileText,
  Plus,
  Search,
  Play,
  Pause,
  Copy,
  Trash2,
  Users,
  ArrowRight,
} from "lucide-react";
import TopBar from "@/components/app/TopBar";

const sequences = [
  {
    id: "s1",
    name: "Series A Outbound Play",
    framework: "Challenger",
    tone: "Operator",
    steps: 5,
    contacts: 47,
    status: "active" as const,
    lastRun: "2 hrs ago",
    replyRate: "12%",
    created: "3 days ago",
  },
  {
    id: "s2",
    name: "Champion Change Alert",
    framework: "Advisor",
    tone: "Advisor",
    steps: 3,
    contacts: 23,
    status: "active" as const,
    lastRun: "5 hrs ago",
    replyRate: "18%",
    created: "1 week ago",
  },
  {
    id: "s3",
    name: "Competitor Displacement",
    framework: "Challenger",
    tone: "Challenger",
    steps: 4,
    contacts: 31,
    status: "draft" as const,
    lastRun: "—",
    replyRate: "—",
    created: "2 days ago",
  },
  {
    id: "s4",
    name: "Post-Funding Follow-up",
    framework: "Educational",
    tone: "Advisor",
    steps: 6,
    contacts: 52,
    status: "active" as const,
    lastRun: "1 day ago",
    replyRate: "9%",
    created: "2 weeks ago",
  },
  {
    id: "s5",
    name: "Hiring Signal Response",
    framework: "Problem-Agitation",
    tone: "Operator",
    steps: 4,
    contacts: 18,
    status: "paused" as const,
    lastRun: "3 days ago",
    replyRate: "15%",
    created: "5 days ago",
  },
];

export default function Sequences() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "paused" | "draft">("all");

  const filtered = sequences
    .filter((s) => {
      if (statusFilter !== "all" && s.status !== statusFilter) return false;
      if (!search) return true;
      return s.name.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <div className="min-h-screen">
      <TopBar title="Sequences" description={`${sequences.length} sequences · 3 active`}>
        <Link
          to="./builder"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bonggy-text-primary text-bonggy-surface text-[13px] hover:opacity-85 transition-opacity"
        >
          <Plus size={14} /> New Sequence
        </Link>
      </TopBar>

      <div className="p-6 max-w-[1400px]">
        {/* Filters */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-[360px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-bonggy-text-tertiary" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sequences..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-bonggy-border bg-bonggy-surface text-[13px] outline-none focus:border-bonggy-text-primary transition-colors placeholder:text-bonggy-text-tertiary"
            />
          </div>
          <div className="flex items-center gap-1">
            {(["all", "active", "paused", "draft"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded text-[11px] capitalize transition-colors ${
                  statusFilter === s
                    ? "bg-bonggy-bg text-bonggy-text-primary font-medium"
                    : "text-bonggy-text-tertiary hover:text-bonggy-text-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Sequence Cards */}
        <div className="space-y-3">
          {filtered.map((seq) => (
            <div
              key={seq.id}
              className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5 hover:border-bonggy-border-hover transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    seq.status === "active" ? "bg-bonggy-success/10" :
                    seq.status === "paused" ? "bg-bonggy-warning/10" : "bg-bonggy-bg"
                  }`}>
                    <FileText size={18} className={
                      seq.status === "active" ? "text-bonggy-success" :
                      seq.status === "paused" ? "text-bonggy-warning" : "text-bonggy-text-tertiary"
                    } />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        to="./builder"
                        className="text-[14px] font-medium text-bonggy-text-primary hover:text-bonggy-accent transition-colors"
                      >
                        {seq.name}
                      </Link>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${
                        seq.status === "active" ? "bg-bonggy-success/10 text-bonggy-success" :
                        seq.status === "paused" ? "bg-bonggy-warning/10 text-bonggy-warning" :
                        "bg-bonggy-bg text-bonggy-text-tertiary"
                      }`}>
                        {seq.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[11px] text-bonggy-text-secondary">{seq.framework}</span>
                      <span className="text-bonggy-text-tertiary">·</span>
                      <span className="text-[11px] text-bonggy-text-secondary">{seq.tone} tone</span>
                      <span className="text-bonggy-text-tertiary">·</span>
                      <span className="text-[11px] text-bonggy-text-secondary">{seq.steps} steps</span>
                      <span className="text-bonggy-text-tertiary">·</span>
                      <span className="text-[11px] text-bonggy-text-secondary flex items-center gap-1">
                        <Users size={10} /> {seq.contacts} contacts
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    {seq.replyRate !== "—" && (
                      <>
                        <p className="text-[16px] font-medium text-bonggy-text-primary">{seq.replyRate}</p>
                        <p className="text-[10px] text-bonggy-text-tertiary">reply rate</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {seq.status === "active" ? (
                      <button className="p-1.5 rounded-md text-bonggy-text-tertiary hover:text-bonggy-warning hover:bg-bonggy-bg transition-colors">
                        <Pause size={14} />
                      </button>
                    ) : seq.status === "paused" ? (
                      <button className="p-1.5 rounded-md text-bonggy-text-tertiary hover:text-bonggy-success hover:bg-bonggy-bg transition-colors">
                        <Play size={14} />
                      </button>
                    ) : null}
                    <button className="p-1.5 rounded-md text-bonggy-text-tertiary hover:text-bonggy-text-primary hover:bg-bonggy-bg transition-colors">
                      <Copy size={14} />
                    </button>
                    <button className="p-1.5 rounded-md text-bonggy-text-tertiary hover:text-red-500 hover:bg-bonggy-bg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <Link
                    to="./builder"
                    className="p-2 rounded-lg text-bonggy-text-tertiary hover:text-bonggy-text-primary hover:bg-bonggy-bg transition-colors"
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <FileText size={32} className="mx-auto text-bonggy-text-tertiary mb-3" />
            <p className="text-[14px] text-bonggy-text-secondary">No sequences found</p>
          </div>
        )}
      </div>
    </div>
  );
}
