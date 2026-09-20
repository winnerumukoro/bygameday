"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import {
  LayoutDashboard,
  Calendar,
  Store,
  Trophy,
  FileCheck2,
  DollarSign,
  ExternalLink,
  LogOut,
  Shield,
  Activity,
  MapPin,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  shortLabel: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: string | null;
  badgeType?: "live" | "gold" | "green" | "neutral";
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Operations Command",
    items: [
      {
        label: "Overview Console",
        shortLabel: "Overview",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        label: "Event Operations",
        shortLabel: "Events",
        href: "/admin/events",
        icon: Calendar,
        badge: "8 Active",
        badgeType: "neutral",
      },
      {
        label: "Tournament Control",
        shortLabel: "Tournaments",
        href: "/admin/tournaments",
        icon: Trophy,
        badge: "3 Live",
        badgeType: "live",
      },
    ],
  },
  {
    title: "Commerce & Curation",
    items: [
      {
        label: "Vendor Pipeline",
        shortLabel: "Vendors",
        href: "/admin/vendors",
        icon: Store,
        badge: "4 New",
        badgeType: "gold",
      },
      {
        label: "Financials & Stripe",
        shortLabel: "Financials",
        href: "/admin/financials",
        icon: DollarSign,
        badge: "Active",
        badgeType: "green",
      },
    ],
  },
  {
    title: "Risk & Governance",
    items: [
      {
        label: "Waiver Audit Log",
        shortLabel: "Waivers",
        href: "/admin/waivers",
        icon: FileCheck2,
        badge: "98% Gate",
        badgeType: "green",
      },
    ],
  },
];

const VENUES = [
  { id: "rucker", name: "Rucker Park", courts: "Courts 1 & 2 (Active)", active: true },
  { id: "dyckman", name: "Dyckman Park", courts: "Main Court (Scheduled)", active: false },
  { id: "west4th", name: "West 4th Cage", courts: "Showdown Arena (Standby)", active: false },
];

interface AdminSidebarProps {
  currentRole?: string;
}

export function AdminSidebar({ currentRole = "Tournament Director" }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVenue, setActiveVenue] = useState(VENUES[0]);
  const [venueSelectorOpen, setVenueSelectorOpen] = useState(false);

  const renderBadge = (badge?: string | null, type: NavItem["badgeType"] = "neutral", isActive = false) => {
    if (!badge) return null;

    if (type === "live") {
      return (
        <span className={cn(
          "inline-flex items-center gap-1 text-[9px] font-headline uppercase tracking-wider px-1.5 py-0.5",
          isActive ? "bg-red-700 text-white" : "bg-red-600/90 text-white"
        )}>
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          {badge}
        </span>
      );
    }

    if (type === "gold") {
      return (
        <span className={cn(
          "text-[9px] font-headline uppercase tracking-wider px-1.5 py-0.5",
          isActive ? "bg-ink text-gold border border-gold" : "bg-gold/25 text-gold border border-gold/40"
        )}>
          {badge}
        </span>
      );
    }

    if (type === "green") {
      return (
        <span className={cn(
          "text-[9px] font-headline uppercase tracking-wider px-1.5 py-0.5",
          isActive ? "bg-green-800 text-white" : "bg-green-500/20 text-green-400 border border-green-500/30"
        )}>
          {badge}
        </span>
      );
    }

    return (
      <span className={cn(
        "text-[9px] font-headline uppercase tracking-wider px-1.5 py-0.5",
        isActive ? "bg-ink text-ivory/80" : "bg-white/10 text-ivory/70"
      )}>
        {badge}
      </span>
    );
  };

  return (
    <>
      {/* ── Mobile Rail & Drawer Header (below md) ───────────────────────────── */}
      <div className="md:hidden sticky top-0 z-40 bg-ink text-ivory border-b border-ivory/15 shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin" className="flex items-center gap-2.5 min-w-0">
            <Logo variant="light" className="h-5 w-auto" />
            <span className="text-[9px] font-headline uppercase tracking-[0.2em] text-gold bg-gold/15 px-1.5 py-0.5 border border-gold/30 shrink-0">
              OPS
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 border border-ivory/10 text-[10px] font-mono text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>LIVE</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-ivory hover:text-gold transition-colors focus:outline-none"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Quick horizontal scroll pills when menu closed */}
        {!mobileMenuOpen && (
          <nav aria-label="Quick mobile navigation" className="overflow-x-auto no-scrollbar border-t border-ivory/10 px-2 py-1.5 bg-black/40">
            <ul className="flex items-center gap-1 min-w-max">
              {NAV_SECTIONS.flatMap((s) => s.items).map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-headline uppercase tracking-wider transition-colors",
                        isActive
                          ? "bg-gold text-ink font-bold"
                          : "text-ivory/70 hover:text-ivory hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn("w-3 h-3", isActive ? "text-ink" : "text-gold")} />
                      <span>{item.shortLabel}</span>
                      {item.badge && item.badgeType === "live" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Full Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="border-t border-ivory/15 bg-ink p-4 space-y-5 animate-in slide-in-from-top duration-200">
            {/* Active Venue Selector */}
            <div className="p-3 bg-white/5 border border-ivory/15">
              <span className="text-[9px] font-headline uppercase tracking-wider text-gold block mb-1">
                Active Stadium Location
              </span>
              <div className="flex items-center justify-between text-xs font-headline uppercase text-ivory">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  {activeVenue.name}
                </span>
                <span className="text-[10px] text-green-400 font-mono">COURTS ONLINE</span>
              </div>
            </div>

            {/* Categorized Navigation Sections */}
            <div className="space-y-4">
              {NAV_SECTIONS.map((section) => (
                <div key={section.title} className="space-y-1">
                  <span className="text-[9px] font-headline uppercase tracking-[0.2em] text-ivory/40 block px-2 mb-1">
                    {section.title}
                  </span>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 text-xs font-headline uppercase tracking-wider transition-colors",
                          isActive
                            ? "bg-gold text-ink font-bold"
                            : "text-ivory/80 hover:bg-white/10 hover:text-ivory"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={cn("w-4 h-4", isActive ? "text-ink" : "text-gold")} />
                          <span>{item.label}</span>
                        </div>
                        {renderBadge(item.badge, item.badgeType, isActive)}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Bottom Mobile Links */}
            <div className="pt-3 border-t border-ivory/15 space-y-2">
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-3 py-2 text-xs font-headline uppercase tracking-wider text-ivory/70 hover:text-ivory bg-white/5"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-gold" />
                  View Public Gameday Portal
                </span>
              </Link>
              <Link
                href="/admin/login"
                className="flex items-center justify-between px-3 py-2 text-xs font-headline uppercase tracking-wider text-red-400 hover:text-red-300 bg-red-950/20 border border-red-900/30"
              >
                <span className="flex items-center gap-2">
                  <LogOut className="w-3.5 h-3.5" />
                  Switch Role / Terminate Session
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Desktop Fixed Command Rail (md and up) ─────────────────────────── */}
      <aside className="hidden md:flex w-60 lg:w-64 bg-ink text-ivory shrink-0 flex-col justify-between border-r border-ivory/15 h-screen sticky top-0 z-30 select-none shadow-xl">
        <div className="min-h-0 overflow-y-auto no-scrollbar flex flex-col">
          {/* Brand & OPS Header */}
          <div className="p-5 lg:p-6 border-b border-ivory/15 flex items-center justify-between bg-black/40">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <Logo variant="light" className="h-6 w-auto transition-transform group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="text-[9px] font-headline uppercase tracking-[0.25em] text-gold bg-gold/15 px-1.5 py-0.5 border border-gold/40 inline-block w-max">
                  OPS CONSOLE
                </span>
              </div>
            </Link>

            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
          </div>

          {/* Interactive Venue Selector Dropdown */}
          <div className="px-4 py-3 border-b border-ivory/15 bg-white/[0.02]">
            <div className="relative">
              <button
                onClick={() => setVenueSelectorOpen(!venueSelectorOpen)}
                className="w-full text-left p-2.5 bg-white/5 border border-ivory/10 hover:border-gold/50 transition-colors flex items-center justify-between group"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[9px] font-headline uppercase tracking-widest text-gold mb-0.5">
                    <MapPin className="w-3 h-3 text-gold shrink-0" />
                    <span>Active Venue</span>
                  </div>
                  <div className="font-headline uppercase text-xs text-ivory tracking-wide truncate">
                    {activeVenue.name}
                  </div>
                  <div className="text-[10px] text-ivory/50 font-body truncate">
                    {activeVenue.courts}
                  </div>
                </div>
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 text-ivory/50 group-hover:text-gold transition-transform",
                  venueSelectorOpen ? "rotate-180 text-gold" : ""
                )} />
              </button>

              {venueSelectorOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-ink border-2 border-gold z-50 shadow-2xl p-1 space-y-1 animate-in fade-in zoom-in-95 duration-100">
                  {VENUES.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setActiveVenue(v);
                        setVenueSelectorOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-2.5 py-2 text-xs font-body transition-colors flex items-center justify-between",
                        activeVenue.id === v.id
                          ? "bg-gold text-ink font-bold"
                          : "text-ivory/80 hover:bg-white/10 hover:text-ivory"
                      )}
                    >
                      <div>
                        <div className="font-headline uppercase text-[11px] tracking-wide">{v.name}</div>
                        <div className={cn("text-[9px]", activeVenue.id === v.id ? "text-ink/80" : "text-ivory/50")}>
                          {v.courts}
                        </div>
                      </div>
                      {v.active && (
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          activeVenue.id === v.id ? "bg-ink" : "bg-green-500"
                        )} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Categorized Navigation */}
          <nav className="p-3 lg:p-4 space-y-5" aria-label="Console sections">
            {NAV_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-1">
                <div className="px-3 pb-1 flex items-center justify-between">
                  <span className="text-[9px] font-headline uppercase tracking-[0.2em] text-ivory/40">
                    {section.title}
                  </span>
                </div>

                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between gap-2 px-3 py-2.5 text-xs font-headline uppercase tracking-wider transition-all relative",
                          isActive
                            ? "bg-gold text-ink font-bold shadow-sm"
                            : "text-ivory/70 hover:bg-white/10 hover:text-ivory"
                        )}
                      >
                        {/* Gold Left Active Notch */}
                        {isActive && (
                          <span className="absolute left-0 top-0 bottom-0 w-1 bg-ink" />
                        )}

                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-ink" : "text-gold")} />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {renderBadge(item.badge, item.badgeType, isActive)}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Operator Profile Footer Card */}
        <div className="p-3 lg:p-4 border-t border-ivory/15 bg-black/40 space-y-2">
          <div className="p-2.5 bg-white/5 border border-ivory/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 bg-gold text-ink font-headline text-xs font-bold flex items-center justify-center shrink-0">
                OP
              </div>
              <div className="min-w-0">
                <span className="font-headline uppercase text-[11px] text-ivory block truncate leading-tight">
                  {currentRole}
                </span>
                <span className="text-[9px] text-green-400 font-mono inline-flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5" />
                  COURTSIDE SYNC
                </span>
              </div>
            </div>

            <Shield className="w-3.5 h-3.5 text-gold shrink-0" />
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
            <Link
              href="/"
              target="_blank"
              className="px-2 py-1.5 bg-white/5 hover:bg-white/10 text-ivory/70 hover:text-ivory border border-ivory/10 text-center font-headline uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
            >
              <ExternalLink className="w-3 h-3 text-gold" />
              <span>Public</span>
            </Link>

            <Link
              href="/admin/login"
              className="px-2 py-1.5 bg-red-950/30 hover:bg-red-950/60 text-red-400 hover:text-red-300 border border-red-900/40 text-center font-headline uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Exit</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
