"use client";

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
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Overview",
    shortLabel: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    label: "Event Operations",
    shortLabel: "Events",
    href: "/admin/events",
    icon: Calendar,
    badge: "8 Active",
  },
  {
    label: "Vendor Pipeline",
    shortLabel: "Vendors",
    href: "/admin/vendors",
    icon: Store,
    badge: "4 New",
  },
  {
    label: "Tournament Control",
    shortLabel: "Tournaments",
    href: "/admin/tournaments",
    icon: Trophy,
    badge: "3 Live",
  },
  {
    label: "Waiver Audit Log",
    shortLabel: "Waivers",
    href: "/admin/waivers",
    icon: FileCheck2,
    badge: "98%",
  },
  {
    label: "Financials & Stripe",
    shortLabel: "Financials",
    href: "/admin/financials",
    icon: DollarSign,
    badge: null,
  },
];

interface AdminSidebarProps {
  currentRole?: string;
}

/**
 * Console navigation. A pinned vertical rail from md up; below that it
 * collapses to a compact swipeable chip rail so phones do not have to
 * scroll past a full screen of nav to reach the console itself.
 */
export function AdminSidebar({ currentRole = "Tournament Director" }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* ── Mobile rail (below md) ───────────────────────────── */}
      <div className="md:hidden sticky top-0 z-30 bg-ink text-ivory border-b border-ivory/10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin" className="flex items-center gap-2.5 min-w-0">
            <Logo variant="light" className="h-5 w-auto" />
            <span className="text-[9px] font-headline uppercase tracking-[0.2em] text-gold bg-gold/15 px-1.5 py-0.5 border border-gold/30 shrink-0">
              OPS
            </span>
          </Link>

          <div className="flex items-center gap-2 text-[10px] font-body min-w-0">
            <Shield className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="font-semibold text-ivory truncate max-w-[110px]">{currentRole}</span>
            <span className="inline-flex items-center gap-1 text-green-400 font-mono shrink-0">
              <Activity className="w-2.5 h-2.5" />
              Online
            </span>
          </div>
        </div>

        <nav aria-label="Console sections" className="overflow-x-auto no-scrollbar border-t border-ivory/10">
          <ul className="flex min-w-max">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 text-[11px] font-headline uppercase tracking-[0.12em] whitespace-nowrap border-b-2 transition-colors",
                      isActive
                        ? "border-gold text-gold"
                        : "border-transparent text-ivory/60 hover:text-ivory"
                    )}
                  >
                    <Icon className={cn("w-3.5 h-3.5", isActive ? "text-gold" : "text-ivory/50")} />
                    <span>{item.shortLabel}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1 py-0.5 bg-white/10 text-ivory/80">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* ── Desktop rail (md and up) ─────────────────────────── */}
      <aside className="hidden md:flex w-56 lg:w-64 bg-ink text-ivory shrink-0 flex-col justify-between border-r border-ivory/10 h-screen sticky top-0">
        <div className="min-h-0 overflow-y-auto">
          <div className="p-5 lg:p-6 border-b border-ivory/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <Logo variant="light" className="h-6 w-auto" />
              <span className="text-[10px] font-headline uppercase tracking-widest text-gold bg-gold/15 px-2 py-0.5 border border-gold/30">
                OPS
              </span>
            </Link>
          </div>

          <div className="px-5 lg:px-6 py-3 bg-white/5 border-b border-ivory/10 flex items-center justify-between gap-2 text-xs font-body">
            <div className="flex items-center gap-2 min-w-0">
              <Shield className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="font-semibold text-ivory truncate">{currentRole}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] text-green-400 font-mono shrink-0">
              <Activity className="w-2.5 h-2.5" />
              Online
            </span>
          </div>

          <nav className="p-3 lg:p-4 space-y-1" aria-label="Console sections">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between gap-2 px-3 py-2.5 text-xs font-headline uppercase tracking-wider transition-colors",
                    isActive
                      ? "bg-gold text-ink font-bold"
                      : "text-ivory/70 hover:bg-white/10 hover:text-ivory"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-ink" : "text-gold")} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 font-headline uppercase shrink-0",
                        isActive ? "bg-ink text-gold" : "bg-white/10 text-ivory/80"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-3 lg:p-4 border-t border-ivory/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs font-headline uppercase tracking-wider text-ivory/60 hover:text-ivory hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-gold" />
              <span>View Public Site</span>
            </div>
          </Link>

          <Link
            href="/admin/login"
            className="flex items-center justify-between px-3 py-2 text-xs font-headline uppercase tracking-wider text-red-400 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5" />
              <span>Switch Role / Logout</span>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
