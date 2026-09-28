"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { signOut } from "@/lib/auth/actions";
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
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  shortLabel: string;
  href: string;
  icon: typeof LayoutDashboard;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

/*
 * Counts and status badges were removed with the seed data: every figure
 * they showed was invented. They come back when a real data source exists
 * and can report an actual number.
 */
const NAV_SECTIONS: NavSection[] = [
  {
    title: "Operations",
    items: [
      { label: "Overview Console", shortLabel: "Overview", href: "/admin", icon: LayoutDashboard },
      { label: "Event Operations", shortLabel: "Events", href: "/admin/events", icon: Calendar },
      { label: "Tournament Control", shortLabel: "Tournaments", href: "/admin/tournaments", icon: Trophy },
    ],
  },
  {
    title: "Commerce",
    items: [
      { label: "Vendor Pipeline", shortLabel: "Vendors", href: "/admin/vendors", icon: Store },
      { label: "Financials & Stripe", shortLabel: "Financials", href: "/admin/financials", icon: DollarSign },
    ],
  },
  {
    title: "Governance",
    items: [{ label: "Waiver Audit Log", shortLabel: "Waivers", href: "/admin/waivers", icon: FileCheck2 }],
  },
];

const ALL_ITEMS = NAV_SECTIONS.flatMap((section) => section.items);

interface AdminSidebarProps {
  currentRole?: string;
}

export function AdminSidebar({ currentRole = "Tournament Director" }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* ── Mobile rail and drawer (below md) ───────────────────────── */}
      <div className="md:hidden sticky top-0 z-40 bg-ink text-ivory border-b border-ivory/15">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin" className="flex items-center gap-2.5 min-w-0">
            <Logo variant="light" className="h-5 w-auto" />
            <span className="text-[9px] font-headline uppercase tracking-[0.2em] text-gold bg-gold/15 px-1.5 py-0.5 border border-gold/30 shrink-0">
              OPS
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-11 w-11 items-center justify-center text-ivory hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gold" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Swipeable section pills while the drawer is closed */}
        {!mobileMenuOpen && (
          <nav
            aria-label="Console sections"
            className="overflow-x-auto no-scrollbar border-t border-ivory/10 px-2 py-1.5 bg-black/40"
          >
            <ul className="flex items-center gap-1 min-w-max">
              {ALL_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-headline uppercase tracking-wider transition-colors",
                        isActive
                          ? "bg-gold text-ink font-bold"
                          : "text-ivory/70 hover:text-ivory hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn("w-3 h-3", isActive ? "text-ink" : "text-gold")} />
                      <span>{item.shortLabel}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Full drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-ivory/15 bg-ink p-4 space-y-5">
            <div className="flex items-center gap-2 px-1 text-xs font-body">
              <Shield className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="font-semibold text-ivory truncate">{currentRole}</span>
            </div>

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
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2.5 text-xs font-headline uppercase tracking-wider transition-colors",
                          isActive
                            ? "bg-gold text-ink font-bold"
                            : "text-ivory/80 hover:bg-white/10 hover:text-ivory"
                        )}
                      >
                        <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-ink" : "text-gold")} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-ivory/15 space-y-2">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-3 py-2 text-xs font-headline uppercase tracking-wider text-ivory/70 hover:text-ivory bg-white/5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gold shrink-0" />
                View public site
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-headline uppercase tracking-wider text-red-400 hover:text-red-300 bg-red-950/20 border border-red-900/30"
                >
                  <LogOut className="w-3.5 h-3.5 shrink-0" />
                  Log out
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* ── Desktop rail (md and up) ────────────────────────────────── */}
      <aside className="hidden md:flex w-60 lg:w-64 bg-ink text-ivory shrink-0 flex-col justify-between border-r border-ivory/15 h-screen sticky top-0 z-30">
        <div className="min-h-0 overflow-y-auto no-scrollbar">
          <div className="p-5 lg:p-6 border-b border-ivory/15 bg-black/40">
            <Link href="/admin" className="flex items-center gap-2.5">
              <Logo variant="light" className="h-6 w-auto" />
              <span className="text-[9px] font-headline uppercase tracking-[0.25em] text-gold bg-gold/15 px-1.5 py-0.5 border border-gold/40">
                OPS CONSOLE
              </span>
            </Link>
          </div>

          <div className="px-5 lg:px-6 py-3 bg-white/5 border-b border-ivory/15 flex items-center gap-2 text-xs font-body">
            <Shield className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="font-semibold text-ivory truncate">{currentRole}</span>
          </div>

          <nav className="p-3 lg:p-4 space-y-4" aria-label="Console sections">
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
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2.5 text-xs font-headline uppercase tracking-wider transition-colors",
                        isActive
                          ? "bg-gold text-ink font-bold"
                          : "text-ivory/70 hover:bg-white/10 hover:text-ivory"
                      )}
                    >
                      <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-ink" : "text-gold")} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        <div className="p-3 lg:p-4 border-t border-ivory/15 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-xs font-headline uppercase tracking-wider text-ivory/60 hover:text-ivory hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>View public site</span>
          </Link>

          <form action={signOut}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-headline uppercase tracking-wider text-red-400 hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              <span>Log out</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
