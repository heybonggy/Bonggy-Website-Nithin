import { useState } from "react";
import { Link } from "react-router";
import {
  Building2,
  Search,
  Filter,
  Flame,
  ChevronRight,
  TrendingUp,
  Download,
  Plus,
} from "lucide-react";
import TopBar from "@/components/app/TopBar";

const accounts = [
  {
    id: "1",
    name: "Linear",
    domain: "linear.app",
    industry: "Developer Tools",
    size: "200-500",
    signals: 8,
    urgency: 94,
    lastActivity: "2 min ago",
    hasCluster: true,
  },
  {
    id: "2",
    name: "Modal",
    domain: "modal.com",
    industry: "Data Infrastructure",
    size: "50-200",
    signals: 6,
    urgency: 91,
    lastActivity: "15 min ago",
    hasCluster: true,
  },
  {
    id: "3",
    name: "Vercel",
    domain: "vercel.com",
    industry: "Cloud Platform",
    size: "500+",
    signals: 12,
    urgency: 88,
    lastActivity: "32 min ago",
    hasCluster: true,
  },
  {
    id: "4",
    name: "Retool",
    domain: "retool.com",
    industry: "Internal Tools",
    size: "200-500",
    signals: 5,
    urgency: 86,
    lastActivity: "1 hr ago",
    hasCluster: true,
  },
  {
    id: "5",
    name: "Figma",
    domain: "figma.com",
    industry: "Design Tools",
    size: "1000+",
    signals: 4,
    urgency: 82,
    lastActivity: "2 hrs ago",
    hasCluster: true,
  },
  {
    id: "6",
    name: "Notion",
    domain: "notion.so",
    industry: "Productivity",
    size: "500+",
    signals: 3,
    urgency: 71,
    lastActivity: "3 hrs ago",
    hasCluster: false,
  },
  {
    id: "7",
    name: "Stripe",
    domain: "stripe.com",
    industry: "Fintech",
    size: "5000+",
    signals: 7,
    urgency: 68,
    lastActivity: "5 hrs ago",
    hasCluster: false,
  },
  {
    id: "8",
    name: "Supabase",
    domain: "supabase.com",
    industry: "Database",
    size: "50-200",
    signals: 4,
    urgency: 65,
    lastActivity: "6 hrs ago",
    hasCluster: false,
  },
  {
    id: "9",
    name: "Railway",
    domain: "railway.app",
    industry: "DevOps",
    size: "50-200",
    signals: 2,
    urgency: 58,
    lastActivity: "8 hrs ago",
    hasCluster: false,
  },
  {
    id: "10",
    name: "Plaid",
    domain: "plaid.com",
    industry: "Fintech",
    size: "1000+",
    signals: 3,
    urgency: 52,
    lastActivity: "12 hrs ago",
    hasCluster: false,
  },
];

export default function Accounts() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"urgency" | "name" | "activity">("urgency");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = accounts
    .filter((a) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.domain.toLowerCase().includes(q) ||
        a.industry.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "urgency") return b.urgency - a.urgency;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen">
      <TopBar title="Accounts" description={`${accounts.length} accounts tracked`}>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bonggy-text-primary text-bonggy-surface text-[13px] hover:opacity-85 transition-opacity">
          <Plus size={14} /> Add Account
        </button>
      </TopBar>

      <div className="p-6 max-w-[1400px]">
        {/* Filters */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-[360px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-bonggy-text-tertiary" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search accounts..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-bonggy-border bg-bonggy-surface text-[13px] text-bonggy-text-primary placeholder:text-bonggy-text-tertiary outline-none focus:border-bonggy-text-primary transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[13px] transition-colors ${
              showFilters
                ? "border-bonggy-text-primary text-bonggy-text-primary bg-bonggy-bg"
                : "border-bonggy-border text-bonggy-text-secondary hover:text-bonggy-text-primary bg-bonggy-surface"
            }`}
          >
            <Filter size={14} /> Filters
          </button>
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-[11px] text-bonggy-text-tertiary mr-1">Sort:</span>
            {(["urgency", "name", "activity"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-2.5 py-1 rounded text-[11px] capitalize transition-colors ${
                  sortBy === s
                    ? "bg-bonggy-bg text-bonggy-text-primary font-medium"
                    : "text-bonggy-text-tertiary hover:text-bonggy-text-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-bonggy-surface border border-bonggy-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-bonggy-border bg-bonggy-bg">
                  <th className="text-left text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-5 py-3">
                    Account
                  </th>
                  <th className="text-left text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-3 py-3">
                    Industry
                  </th>
                  <th className="text-left text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-3 py-3">
                    Signals
                  </th>
                  <th className="text-left text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-3 py-3">
                    Urgency
                  </th>
                  <th className="text-left text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-3 py-3">
                    Last Activity
                  </th>
                  <th className="text-right text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wide px-5 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((account) => (
                  <tr
                    key={account.id}
                    className="border-b border-bonggy-border hover:bg-bonggy-bg transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-bonggy-bg border border-bonggy-border flex items-center justify-center text-[13px] font-medium text-bonggy-text-primary shrink-0">
                          {account.name[0]}
                        </div>
                        <div>
                          <Link
                            to={`/app/accounts/${account.id}`}
                            className="text-[13px] font-medium text-bonggy-text-primary hover:text-bonggy-accent transition-colors"
                          >
                            {account.name}
                          </Link>
                          <p className="text-[11px] text-bonggy-text-tertiary">{account.domain}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span className="text-[12px] text-bonggy-text-secondary bg-bonggy-bg px-2 py-0.5 rounded border border-bonggy-border">
                        {account.industry}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-1.5">
                        <Flame size={12} className={account.signals >= 5 ? "text-bonggy-accent" : "text-bonggy-text-tertiary"} />
                        <span className="text-[13px] text-bonggy-text-primary">{account.signals}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-bonggy-bg rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              account.urgency >= 90
                                ? "bg-bonggy-accent"
                                : account.urgency >= 70
                                ? "bg-bonggy-warning"
                                : "bg-bonggy-success"
                            }`}
                            style={{ width: `${account.urgency}%` }}
                          />
                        </div>
                        <span className="text-[12px] font-medium text-bonggy-text-primary w-7">
                          {account.urgency}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span className="text-[12px] text-bonggy-text-secondary">{account.lastActivity}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-md text-bonggy-text-tertiary hover:text-bonggy-text-primary hover:bg-bonggy-bg transition-colors">
                          <TrendingUp size={14} />
                        </button>
                        <button className="p-1.5 rounded-md text-bonggy-text-tertiary hover:text-bonggy-text-primary hover:bg-bonggy-bg transition-colors">
                          <Download size={14} />
                        </button>
                        <Link
                          to={`/app/accounts/${account.id}`}
                          className="p-1.5 rounded-md text-bonggy-text-tertiary hover:text-bonggy-text-primary hover:bg-bonggy-bg transition-colors"
                        >
                          <ChevronRight size={14} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Building2 size={32} className="mx-auto text-bonggy-text-tertiary mb-3" />
              <p className="text-[14px] text-bonggy-text-secondary">No accounts found</p>
              <p className="text-[12px] text-bonggy-text-tertiary mt-1">Try adjusting your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
