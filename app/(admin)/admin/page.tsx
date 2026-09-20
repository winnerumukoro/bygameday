import Link from "next/link";
import { format } from "date-fns";
import {
  getAdminKPIs,
  getAdminVendorApplications,
  getWaiverAuditLogs,
  getBroadcastAlerts,
} from "@/lib/admin/data";
import { formatCurrency } from "@/lib/vendors/data";
import { getAllPublishedEvents } from "@/lib/events/data";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Store,
  FileCheck2,
  Trophy,
  Radio,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const kpis = getAdminKPIs();
  const pendingVendors = getAdminVendorApplications().filter(
    (a) => a.status === "submitted" || a.status === "reviewing"
  );
  const recentWaivers = getWaiverAuditLogs().slice(0, 5);
  const activeEvents = getAllPublishedEvents().slice(0, 4);
  const alerts = getBroadcastAlerts().filter((a) => a.active);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-ink/15 pb-6">
        <div>
          <span className="text-xs font-headline uppercase tracking-widest text-gold block mb-1">
            Real-Time Operations Telemetry
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline uppercase tracking-tight text-ink">
            EXECUTIVE OPS CONSOLE
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="primary" size="sm">
            <Link href="/admin/tournaments" className="gap-2 text-xs">
              <Trophy className="w-3.5 h-3.5" />
              Tournament Control
            </Link>
          </Button>
          <Button asChild variant="secondary" size="sm">
            <Link href="/admin/vendors" className="gap-2 text-xs border-ink">
              <Store className="w-3.5 h-3.5 text-gold" />
              Vendor Queue ({pendingVendors.length})
            </Link>
          </Button>
        </div>
      </div>

      {/* Active Broadcast Warning Banner if any */}
      {alerts.length > 0 && (
        <div className="p-4 bg-amber-50 border-2 border-amber-500 flex items-start gap-3 text-xs font-body text-amber-950">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="font-headline uppercase tracking-wider block mb-0.5 text-amber-900">
              Active Courtside Broadcast:
            </strong>
            <p>{alerts[0].message}</p>
          </div>
          <span className="text-[10px] text-amber-700 font-mono">
            {format(new Date(alerts[0].postedAt), "h:mm a")}
          </span>
        </div>
      )}

      {/* ────────────── KPI STATS GRID ────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Gross Revenue */}
        <div className="border-2 border-ink/15 bg-white p-5 flex flex-col justify-between">
          <span className="text-[11px] font-headline uppercase tracking-wider text-ink/50 block mb-2">
            Gross Revenue
          </span>
          <div>
            <span className="font-headline text-3xl sm:text-4xl text-ink tracking-tight block">
              {formatCurrency(kpis.grossRevenueCents)}
            </span>
            <span className="text-[10px] text-green-700 font-semibold font-body mt-1 block">
              +18.4% vs Last Season
            </span>
          </div>
        </div>

        {/* Registered Athletes */}
        <div className="border-2 border-ink/15 bg-white p-5 flex flex-col justify-between">
          <span className="text-[11px] font-headline uppercase tracking-wider text-ink/50 block mb-2">
            Athletes Rostered
          </span>
          <div>
            <span className="font-headline text-3xl sm:text-4xl text-ink tracking-tight block">
              {kpis.totalAthletes.toLocaleString()}
            </span>
            <span className="text-[10px] text-ink/60 font-body mt-1 block">
              Across 5 Sports
            </span>
          </div>
        </div>

        {/* Active Tournaments */}
        <div className="border-2 border-ink/15 bg-white p-5 flex flex-col justify-between">
          <span className="text-[11px] font-headline uppercase tracking-wider text-ink/50 block mb-2">
            Active Events
          </span>
          <div>
            <span className="font-headline text-3xl sm:text-4xl text-ink tracking-tight block">
              {kpis.activeEventsCount}
            </span>
            <span className="text-[10px] text-ink/60 font-body mt-1 block">
              Spring / Summer &apos;26
            </span>
          </div>
        </div>

        {/* Pending Vendors */}
        <div className="border-2 border-ink/15 bg-white p-5 flex flex-col justify-between">
          <span className="text-[11px] font-headline uppercase tracking-wider text-ink/50 block mb-2">
            Vendor Queue
          </span>
          <div>
            <span className="font-headline text-3xl sm:text-4xl text-gold tracking-tight block">
              {kpis.pendingVendorApps}
            </span>
            <span className="text-[10px] text-amber-700 font-semibold font-body mt-1 block">
              Awaiting Curation
            </span>
          </div>
        </div>

        {/* Waiver Compliance */}
        <div className="border-2 border-ink/15 bg-white p-5 flex flex-col justify-between">
          <span className="text-[11px] font-headline uppercase tracking-wider text-ink/50 block mb-2">
            Waiver Rate
          </span>
          <div>
            <span className="font-headline text-3xl sm:text-4xl text-green-700 tracking-tight block">
              {kpis.waiverCompletionRate}%
            </span>
            <span className="text-[10px] text-green-800 font-semibold font-body mt-1 block">
              Court Gate Pass
            </span>
          </div>
        </div>

        {/* Live Matches */}
        <div className="border-2 border-ink/15 bg-white p-5 flex flex-col justify-between">
          <span className="text-[11px] font-headline uppercase tracking-wider text-ink/50 block mb-2">
            Live Matches
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline text-3xl sm:text-4xl text-red-600 tracking-tight">
                {kpis.liveMatchesNow}
              </span>
              <Radio className="w-4 h-4 text-red-600 animate-pulse" />
            </div>
            <span className="text-[10px] text-red-700 font-semibold font-body mt-1 block">
              Underway Courtside
            </span>
          </div>
        </div>
      </div>

      {/* ────────────── TWO COLUMN OPERATIONAL DETAILS ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Active Events Roster (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border-2 border-ink/15 bg-white p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold" />
                <h3 className="font-headline text-sm uppercase tracking-wider text-ink">
                  Scheduled Events & Capacity Operations
                </h3>
              </div>
              <Link
                href="/admin/events"
                className="text-xs font-headline uppercase text-gold hover:text-ink transition-colors"
              >
                Manage All
              </Link>
            </div>

            <div className="space-y-3">
              {activeEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3.5 border border-ink/10 bg-ink/[0.01] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-ink/30 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-headline uppercase bg-ink text-ivory px-2 py-0.5">
                        {evt.type}
                      </span>
                      <span className="text-xs text-ink/50 font-body">
                        {format(new Date(evt.startsAt), "MMM d, yyyy")} • {evt.venueName}
                      </span>
                    </div>
                    <h4 className="font-headline text-base uppercase tracking-tight text-ink">
                      {evt.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right text-xs font-body">
                      <span className="text-ink/50 block text-[11px]">Capacity Fill</span>
                      <span className="font-semibold text-ink">78% Filled</span>
                    </div>
                    <Button asChild size="sm" variant="secondary" className="text-xs h-8">
                      <Link href={`/events/${evt.slug}`} target="_blank">
                        View Public
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Vendor Pipeline Quick Review */}
          <div className="border-2 border-ink/15 bg-white p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-gold" />
                <h3 className="font-headline text-sm uppercase tracking-wider text-ink">
                  New Vendor Applications Awaiting Approval ({pendingVendors.length})
                </h3>
              </div>
              <Link
                href="/admin/vendors"
                className="text-xs font-headline uppercase text-gold hover:text-ink transition-colors"
              >
                Go to Pipeline
              </Link>
            </div>

            <div className="space-y-3">
              {pendingVendors.map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 border border-ink/10 bg-ink/[0.01] flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-headline text-sm uppercase text-ink">
                        {app.businessName}
                      </span>
                      <span className="text-[10px] font-headline uppercase bg-gold/15 text-ink px-1.5 py-0.5 border border-gold/30">
                        {app.subcategoryName}
                      </span>
                    </div>
                    <p className="text-xs text-ink/60 font-body">
                      {app.contactName} • {app.targetEventTitle}
                    </p>
                  </div>

                  <Button asChild size="sm" variant="primary" className="text-xs h-8 gap-1">
                    <Link href="/admin/vendors">
                      Review
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Real-time Waiver Legal Log (1 col) */}
        <div className="space-y-6">
          <div className="border-2 border-ink/15 bg-white p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-gold" />
                <h3 className="font-headline text-sm uppercase tracking-wider text-ink">
                  Latest Signed Waivers
                </h3>
              </div>
              <Link
                href="/admin/waivers"
                className="text-xs font-headline uppercase text-gold hover:text-ink transition-colors"
              >
                Full Audit Log
              </Link>
            </div>

            <div className="space-y-3">
              {recentWaivers.map((waiver) => (
                <div
                  key={waiver.id}
                  className="p-3 border border-ink/10 bg-ink/[0.01] text-xs font-body"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-ink">{waiver.signerName}</span>
                    <span className="text-[10px] font-mono text-ink/40">
                      {format(new Date(waiver.signedAt), "h:mm a")}
                    </span>
                  </div>
                  <p className="text-ink/60 text-[11px] mb-1.5 truncate">
                    {waiver.targetEntity}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-ink/40 font-mono">
                    <span>IP: {waiver.ipAddress}</span>
                    <span className="text-green-700 font-semibold uppercase">Verified v1</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-ink/10 text-center">
              <Button asChild variant="outline" size="sm" className="w-full text-xs">
                <Link href="/admin/waivers">
                  Download Full CSV Audit Log
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
