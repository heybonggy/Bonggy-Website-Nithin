import { useState } from "react";
import {
  Settings2,
  Users,
  CreditCard,
  Plug,
  Palette,
  Bell,
  Shield,
  Save,
  Check,
} from "lucide-react";
import TopBar from "@/components/app/TopBar";

const tabs = [
  { id: "general", label: "General", icon: Settings2 },
  { id: "team", label: "Team", icon: Users },
  { id: "crm", label: "CRM", icon: Plug },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

const teamMembers = [
  { name: "John Doe", email: "john@acme.com", role: "Admin", status: "active" },
  { name: "Sarah Kim", email: "sarah@acme.com", role: "Manager", status: "active" },
  { name: "Mike Chen", email: "mike@acme.com", role: "Rep", status: "active" },
  { name: "Lisa Park", email: "lisa@acme.com", role: "Viewer", status: "pending" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <TopBar title="Settings" />

      <div className="p-6 max-w-[1000px]">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Tabs */}
          <div className="md:w-[200px] shrink-0">
            <div className="flex md:flex-col gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors text-left ${
                      activeTab === tab.id
                        ? "bg-bonggy-bg text-bonggy-text-primary font-medium"
                        : "text-bonggy-text-secondary hover:bg-bonggy-bg/60 hover:text-bonggy-text-primary"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === "general" && (
              <div className="space-y-6">
                <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
                  <h3 className="text-[15px] font-semibold text-bonggy-text-primary mb-4">Organization</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[12px] text-bonggy-text-secondary mb-1.5 block">Company Name</label>
                      <input
                        defaultValue="Acme Inc"
                        className="w-full px-3 py-2 rounded-lg border border-bonggy-border bg-bonggy-bg text-[13px] text-bonggy-text-primary outline-none focus:border-bonggy-text-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] text-bonggy-text-secondary mb-1.5 block">Workspace Slug</label>
                      <input
                        defaultValue="acme"
                        className="w-full px-3 py-2 rounded-lg border border-bonggy-border bg-bonggy-bg text-[13px] text-bonggy-text-primary outline-none focus:border-bonggy-text-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] text-bonggy-text-secondary mb-1.5 block">Timezone</label>
                      <select className="w-full px-3 py-2 rounded-lg border border-bonggy-border bg-bonggy-bg text-[13px] text-bonggy-text-primary outline-none focus:border-bonggy-text-primary transition-colors">
                        <option>America/Los_Angeles (PST)</option>
                        <option>America/New_York (EST)</option>
                        <option>Europe/London (GMT)</option>
                        <option>Asia/Singapore (SGT)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
                  <h3 className="text-[15px] font-semibold text-bonggy-text-primary mb-4">ICP Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[12px] text-bonggy-text-secondary mb-1.5 block">Target Industries</label>
                      <input
                        defaultValue="B2B SaaS, Developer Tools, Cloud Infrastructure"
                        className="w-full px-3 py-2 rounded-lg border border-bonggy-border bg-bonggy-bg text-[13px] text-bonggy-text-primary outline-none focus:border-bonggy-text-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] text-bonggy-text-secondary mb-1.5 block">Company Size</label>
                      <input
                        defaultValue="50-500 employees"
                        className="w-full px-3 py-2 rounded-lg border border-bonggy-border bg-bonggy-bg text-[13px] text-bonggy-text-primary outline-none focus:border-bonggy-text-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] text-bonggy-text-secondary mb-1.5 block">Funding Stage</label>
                      <input
                        defaultValue="Series A - Series C"
                        className="w-full px-3 py-2 rounded-lg border border-bonggy-border bg-bonggy-bg text-[13px] text-bonggy-text-primary outline-none focus:border-bonggy-text-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-bonggy-text-primary text-bonggy-surface text-[13px] hover:opacity-85 transition-opacity"
                  >
                    {saved ? <Check size={14} /> : <Save size={14} />}
                    {saved ? "Saved" : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div className="bg-bonggy-surface border border-bonggy-border rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-bonggy-border">
                  <h3 className="text-[15px] font-semibold text-bonggy-text-primary">Team Members</h3>
                  <button className="text-[12px] text-bonggy-accent hover:underline">Invite member</button>
                </div>
                <div className="divide-y divide-bonggy-border">
                  {teamMembers.map((member) => (
                    <div key={member.email} className="flex items-center justify-between px-5 py-4 hover:bg-bonggy-bg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-bonggy-text-primary flex items-center justify-center text-[11px] font-medium text-bonggy-surface">
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-[13px] text-bonggy-text-primary">{member.name}</p>
                          <p className="text-[11px] text-bonggy-text-tertiary">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded ${
                          member.role === "Admin" ? "bg-bonggy-accent/10 text-bonggy-accent" :
                          member.role === "Manager" ? "bg-bonggy-success/10 text-bonggy-success" :
                          "bg-bonggy-bg text-bonggy-text-secondary"
                        }`}>
                          {member.role}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          member.status === "active" ? "text-bonggy-success" : "text-bonggy-warning"
                        }`}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "crm" && (
              <div className="space-y-4">
                {[
                  { name: "Salesforce", connected: true, lastSync: "5 min ago", fields: 24 },
                  { name: "HubSpot", connected: true, lastSync: "12 min ago", fields: 18 },
                  { name: "Apollo", connected: true, lastSync: "2 min ago", fields: 12 },
                  { name: "Outreach", connected: false, lastSync: "—", fields: 0 },
                ].map((crm) => (
                  <div
                    key={crm.name}
                    className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-bonggy-bg border border-bonggy-border flex items-center justify-center">
                        <Plug size={16} className="text-bonggy-text-secondary" />
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-bonggy-text-primary">{crm.name}</p>
                        <p className="text-[11px] text-bonggy-text-tertiary">
                          {crm.connected ? `Last sync: ${crm.lastSync} · ${crm.fields} fields` : "Not connected"}
                        </p>
                      </div>
                    </div>
                    <button
                      className={`text-[12px] px-3 py-1.5 rounded-lg transition-colors ${
                        crm.connected
                          ? "border border-bonggy-border text-bonggy-text-secondary hover:border-bonggy-border-hover"
                          : "bg-bonggy-text-primary text-bonggy-surface hover:opacity-85"
                      }`}
                    >
                      {crm.connected ? "Configure" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-6">
                <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
                  <h3 className="text-[15px] font-semibold text-bonggy-text-primary mb-1">Pro Plan</h3>
                  <p className="text-[13px] text-bonggy-text-secondary mb-4">$299/month · Billed monthly</p>
                  <div className="space-y-2">
                    {[
                      { label: "Accounts tracked", used: 847, limit: 5000 },
                      { label: "Enrichment calls", used: 332, limit: 2000 },
                      { label: "Sequences", used: 8, limit: 25 },
                      { label: "Team members", used: 4, limit: 10 },
                    ].map((usage) => (
                      <div key={usage.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[12px] text-bonggy-text-secondary">{usage.label}</span>
                          <span className="text-[11px] text-bonggy-text-tertiary">
                            {usage.used.toLocaleString()} / {usage.limit.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-bonggy-bg rounded-full overflow-hidden">
                          <div
                            className="h-full bg-bonggy-accent rounded-full"
                            style={{ width: `${(usage.used / usage.limit) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5 space-y-4">
                <h3 className="text-[15px] font-semibold text-bonggy-text-primary mb-4">Appearance</h3>
                <div>
                  <label className="text-[12px] text-bonggy-text-secondary mb-2 block">Theme</label>
                  <div className="flex gap-3">
                    {["Light", "Dark", "System"].map((theme) => (
                      <button
                        key={theme}
                        className={`px-4 py-2 rounded-lg border text-[13px] transition-colors ${
                          theme === "Light"
                            ? "border-bonggy-text-primary text-bonggy-text-primary bg-bonggy-bg"
                            : "border-bonggy-border text-bonggy-text-secondary hover:border-bonggy-border-hover"
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5 space-y-4">
                <h3 className="text-[15px] font-semibold text-bonggy-text-primary mb-4">Notification Preferences</h3>
                {[
                  { label: "New signal cluster detected", desc: "Get notified when a new hot cluster is identified", enabled: true },
                  { label: "Ammo pack generated", desc: "Notification when ammo packs are ready for review", enabled: true },
                  { label: "Trust queue items", desc: "Daily digest of pending trust queue items", enabled: false },
                  { label: "CRM sync failures", desc: "Alert when CRM sync encounters errors", enabled: true },
                  { label: "Weekly summary", desc: "Weekly performance summary every Monday", enabled: true },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-start justify-between py-2">
                    <div>
                      <p className="text-[13px] text-bonggy-text-primary">{pref.label}</p>
                      <p className="text-[11px] text-bonggy-text-tertiary">{pref.desc}</p>
                    </div>
                    <button
                      className={`w-9 h-5 rounded-full transition-colors relative ${
                        pref.enabled ? "bg-bonggy-accent" : "bg-bonggy-border"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                          pref.enabled ? "translate-x-4" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-4">
                <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
                  <h3 className="text-[15px] font-semibold text-bonggy-text-primary mb-4">API Keys</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Production API Key", key: "bng_live_••••••••••••••••••••••••", created: "Jan 15, 2026" },
                      { name: "Test API Key", key: "bng_test_••••••••••••••••••••••••", created: "Feb 1, 2026" },
                    ].map((apiKey) => (
                      <div key={apiKey.name} className="flex items-center justify-between p-3 bg-bonggy-bg rounded-lg border border-bonggy-border">
                        <div>
                          <p className="text-[13px] text-bonggy-text-primary">{apiKey.name}</p>
                          <p className="text-[11px] text-bonggy-text-tertiary font-mono-data">{apiKey.key}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-bonggy-text-tertiary">{apiKey.created}</span>
                          <button className="text-[11px] text-bonggy-accent hover:underline">Reveal</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-5">
                  <h3 className="text-[15px] font-semibold text-bonggy-text-primary mb-4">Danger Zone</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-500/5 rounded-lg border border-red-100 dark:border-red-500/10">
                      <div>
                        <p className="text-[13px] text-red-600 dark:text-red-400">Delete Workspace</p>
                        <p className="text-[11px] text-red-400 dark:text-red-500/60">This action cannot be undone</p>
                      </div>
                      <button className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-[12px] hover:bg-red-100 transition-colors dark:border-red-500/20 dark:text-red-400">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
