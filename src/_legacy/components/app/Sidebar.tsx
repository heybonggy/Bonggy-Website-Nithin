import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import {
  LayoutDashboard,
  Building2,
  Radio,
  FileText,
  Zap,
  ShieldCheck,
  Download,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/app", icon: LayoutDashboard },
  { label: "Accounts", href: "/app/accounts", icon: Building2 },
  { label: "Signals", href: "/app/signals", icon: Radio },
  { label: "Sequences", href: "/app/sequences", icon: FileText },
  { label: "Ammo Packs", href: "/app/ammo", icon: Zap },
  { label: "Trust Queue", href: "/app/trust", icon: ShieldCheck, badge: 12 },
  { label: "Enrichment", href: "/app/enrichment", icon: Download },
];

const configNav: NavItem[] = [
  { label: "Settings", href: "/app/settings", icon: Settings },
];

function Logo({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex items-center gap-2.5 px-3">
      <div className="w-8 h-8 rounded-lg bg-bonggy-accent flex items-center justify-center shrink-0">
        <Sparkles size={16} className="text-white" />
      </div>
      {!collapsed && (
        <span className="text-[15px] font-semibold text-bonggy-text-primary tracking-tight">
          Bonggy
        </span>
      )}
    </div>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-bonggy-surface border-r border-bonggy-border flex flex-col transition-all duration-300 z-40 ${
        collapsed ? "w-[68px]" : "w-[240px]"
      }`}
    >
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-3 border-b border-bonggy-border shrink-0">
        <Logo collapsed={collapsed} />
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-md text-bonggy-text-tertiary hover:text-bonggy-text-primary hover:bg-bonggy-bg transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
        )}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="p-1 rounded-md text-bonggy-text-tertiary hover:text-bonggy-text-primary hover:bg-bonggy-bg transition-colors absolute -right-3 top-5 w-6 h-6 bg-bonggy-surface border border-bonggy-border rounded-full flex items-center justify-center"
          >
            <ChevronRight size={12} />
          </button>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto scrollbar-hide">
        {!collapsed && (
          <p className="px-3 mb-2 text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wider">
            Workspace
          </p>
        )}
        {mainNav.map((item) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/app"}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-all relative ${
                isActive
                  ? "bg-bonggy-bg text-bonggy-text-primary font-medium"
                  : "text-bonggy-text-secondary hover:bg-bonggy-bg/60 hover:text-bonggy-text-primary"
              } ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge !== undefined && (
                <span className="ml-auto text-[11px] font-medium text-bonggy-accent bg-bonggy-accent/10 px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
              {collapsed && item.badge !== undefined && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-bonggy-accent text-white text-[9px] font-medium flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}

        {!collapsed && (
          <p className="px-3 mt-6 mb-2 text-[11px] font-medium text-bonggy-text-tertiary uppercase tracking-wider">
            Configure
          </p>
        )}
        {collapsed && <div className="h-4" />}
        {configNav.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-all ${
                isActive
                  ? "bg-bonggy-bg text-bonggy-text-primary font-medium"
                  : "text-bonggy-text-secondary hover:bg-bonggy-bg/60 hover:text-bonggy-text-primary"
              } ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-bonggy-border shrink-0">
        <div
          className={`flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-bonggy-bg transition-colors cursor-pointer ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-bonggy-text-primary flex items-center justify-center text-[11px] font-medium text-bonggy-surface shrink-0">
            JD
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-bonggy-text-primary truncate">John Doe</p>
              <p className="text-[11px] text-bonggy-text-tertiary truncate">john@acme.com</p>
            </div>
          )}
          {!collapsed && <LogOut size={14} className="text-bonggy-text-tertiary hover:text-bonggy-text-primary" />}
        </div>
      </div>
    </aside>
  );
}
