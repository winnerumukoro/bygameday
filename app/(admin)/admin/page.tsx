import Link from "next/link";
import { format } from "date-fns";
import {
  getAdminKPIs,
  getAdminVendorApplications,
  getWaiverAuditLogs,
  getBroadcastAlerts,
  getFinancialReport,
} from "@/lib/admin/data";
import type { FinancialReport } from "@/lib/admin/data";
import { formatCurrency } from "@/lib/vendors/data";
import { getAllPublishedEvents } from "@/lib/events/data";
import { SEED_BRACKET } from "@/lib/sports/data";
import { CourtsideLiveTicker } from "@/components/admin/courtside-live-ticker";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  Store,
  FileCheck2,
  Trophy,
  Radio,
  AlertTriangle,
  ChevronRight,
  Users,
  DollarSign,
  ArrowUpRight,
  CreditCard,
  MapPin,
  CheckCircle2,
} from "lucide-react";

/*
 * Tiles show the stored figure and nothing else. The trend deltas, fill
 * percentages and stream sparkbars that used to sit under each number were
 * invented — there is no history to compute any of them from.
 */
function MetricTile({
  label,
  value,
  note,
  icon: Icon,
}: {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
}) {
  return (
    <div className="border-2 border-ink/15 bg-white p-5 flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-headline uppercase tracking-widest text-ink/50">
          {label}
        </span>
        <Icon className="w-4 h-4 text-gold shrink-0" />
      </div>

      <span className="font-headline text-3xl sm:text-4xl text-ink tracking-tight block font-mono font-bold">
        {value}
      </span>

      <p className="mt-auto pt-3 text-[11px] text-ink/50 font-body">{note}</p>
    </div>
  );
}

/*
 * Revenue shares are derived from the stored totals. They used to be typed in
 * by hand (38.1 / 35.0 / 13.6 / 13.3) and did not move when the figures did.
 */
const REVENUE_STREAMS = [
  { label: "Spectator Tickets", barClass: "bg-ink", amountOf: (f: FinancialReport) => f.ticketSalesCents },
  { label: "Team Entry Fees", barClass: "bg-gold", amountOf: (f: FinancialReport) => f.teamFeesCents },
  { label: "Vendor Permits", barClass: "bg-amber-600", amountOf: (f: FinancialReport) => f.vendorFeesCents },
  { label: "Sponsorships", barClass: "bg-emerald-700", amountOf: (f: FinancialReport) => f.sponsorshipCents },
];

export default function AdminDashboardPage() {
  const kpis = getAdminKPIs();
  const pendingVendors = getAdminVendorApplications().filter(
    (a) => a.status === "submitted" || a.status === "reviewing"
  );
  const recentWaivers = getWaiverAuditLogs().slice(0, 5);
  const activeEvents = getAllPublishedEvents({ includePast: false }).slice(0, 4);
  const alerts = getBroadcastAlerts().filter((a) => a.active);
  const financials = getFinancialReport();
  const share = (cents: number) =>
    financials.totalGrossCents === 0
      ? "0.0"
      : ((cents / financials.totalGrossCents) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* ────────────── 1. COMMAND CONSOLE HEADER & TELEMETRY ────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-ink/15 pb-6">
        <div>
          {/*
            This console is not connected to a data source yet: there is no
            database, and Stripe has no live key. Say so plainly rather than
            showing green "active" pills over hardcoded values.
          */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-body px-2 py-0.5 bg-amber-50 border border-amber-300 text-amber-900">
              <AlertTriangle className="w-3 h-3 shrink-0" />
              <span>Not connected — no database or payment provider configured</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline uppercase tracking-tight text-ink">
            EXECUTIVE OPS CONSOLE
          </h1>
          <p className="text-xs sm:text-sm text-ink/60 font-body max-w-2xl mt-1">
            Event operations, match scoring, vendor permits and waiver records. Figures stay at zero until a data source is connected.
          </p>
        </div>

        {/* Quick Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Button asChild variant="primary" size="sm" className="gap-1.5 text-xs font-headline uppercase tracking-wider shadow-sm">
            <Link href="/admin/tournaments">
              <Trophy className="w-3.5 h-3.5" />
              <span>Tournament Control</span>
            </Link>
          </Button>

          <Button asChild variant="secondary" size="sm" className="gap-1.5 text-xs font-headline uppercase tracking-wider border-2 border-ink bg-white hover:bg-ink hover:text-ivory transition-colors">
            <Link href="/admin/vendors">
              <Store className="w-3.5 h-3.5 text-gold" />
              <span>Vendors</span>
              <span className="px-1.5 py-0.2 bg-gold/20 text-ink border border-gold/40 text-[10px]">
                {pendingVendors.length}
              </span>
            </Link>
          </Button>

          <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs font-headline uppercase tracking-wider border-ink/20 hover:border-ink">
            <Link href="/admin/waivers">
              <FileCheck2 className="w-3.5 h-3.5 text-gold" />
              <span>Waiver Logs</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* ────────────── 2. ACTIVE COURTSIDE BROADCAST BANNER ────────────── */}
      {alerts.length > 0 && (
        <div className="p-4 bg-amber-50 border-2 border-amber-500 text-ink flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-500 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline uppercase tracking-wider text-xs bg-amber-200 text-amber-950 px-1.5 py-0.5 font-bold">
                  Active Courtside Broadcast
                </span>
                <span className="text-[11px] font-mono text-amber-800">
                  Posted {format(new Date(alerts[0].postedAt), "h:mm a")} CT
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 font-body font-medium mt-1">
                {alerts[0].message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <Button asChild size="sm" variant="outline" className="text-xs h-7 border-amber-400 hover:bg-amber-100 text-amber-950">
              <Link href="/admin/tournaments">Inspect Courts</Link>
            </Button>
          </div>
        </div>
      )}

      {/* ────────────── 3. KPI TILES ────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricTile
          label="Gross Revenue"
          value={formatCurrency(kpis.grossRevenueCents)}
          note="No payment provider connected"
          icon={DollarSign}
        />
        <MetricTile
          label="Athletes Rostered"
          value={kpis.totalAthletes.toLocaleString()}
          note="No registrations recorded"
          icon={Users}
        />
        <MetricTile
          label="Active Events"
          value={String(kpis.activeEventsCount)}
          note="No events published"
          icon={Calendar}
        />
        <MetricTile
          label="Vendor Queue"
          value={String(kpis.pendingVendorApps)}
          note="48-hour pay window, one brand per category"
          icon={Store}
        />
        <MetricTile
          label="Waiver Gate Pass"
          value={recentWaivers.length > 0 ? `${kpis.waiverCompletionRate}%` : "—"}
          note="No signatures recorded"
          icon={FileCheck2}
        />
        <MetricTile
          label="Courtside Live"
          value={String(kpis.liveMatchesNow)}
          note="No matches in progress"
          icon={Radio}
        />
      </div>

      {/* ────────────── 4. COURTSIDE LIVE MATCH CENTER STRIP ────────────── */}
      <CourtsideLiveTicker initialBracket={SEED_BRACKET} />

      {/* ────────────── 5. TWO-COLUMN OPERATIONAL COMMAND CENTER ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── LEFT COLUMN (2 of 3 cols): Events & Vendor Pipeline ── */}
        <div className="lg:col-span-2 space-y-8">
          {/* Scheduled Events & Capacity Operations */}
          <div className="border-2 border-ink/15 bg-white p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-ink/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-ink text-gold flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-headline text-base uppercase tracking-wider text-ink">
                    Scheduled Events & Stadium Capacity
                  </h3>
                  <span className="text-xs text-ink/50 font-body">
                    Roster quotas, ticket gate status, and vendor permissions
                  </span>
                </div>
              </div>

              <Button asChild size="sm" variant="outline" className="text-xs h-7 gap-1 border-ink/20">
                <Link href="/admin/events">
                  <span>Manage All</span>
                  <ChevronRight className="w-3 h-3 text-gold" />
                </Link>
              </Button>
            </div>

            {activeEvents.length === 0 && (
              <p className="text-sm text-ink/50 font-body py-6 text-center border border-dashed border-ink/15">
                No events published yet. Add one from{" "}
                <Link href="/admin/events" className="underline hover:text-ink">
                  Event Operations
                </Link>
                .
              </p>
            )}

            <div className="grid grid-cols-1 gap-3.5">
              {activeEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 border-2 border-ink/10 bg-ink/[0.01] hover:border-ink/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-headline uppercase bg-ink text-ivory px-2 py-0.5">
                        {evt.type}
                      </span>
                      {evt.sportsDivisionName && (
                        <span className="text-[10px] font-headline uppercase bg-gold/15 text-ink border border-gold/30 px-1.5 py-0.5">
                          {evt.sportsDivisionName}
                        </span>
                      )}
                      <span className="text-xs text-ink/50 font-body flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gold" />
                        {evt.venueName} • {format(new Date(evt.startsAt), "MMM d, yyyy")}
                      </span>
                    </div>

                    <h4 className="font-headline text-base uppercase tracking-tight text-ink group-hover:text-gold transition-colors">
                      {evt.title}
                    </h4>

                    <p className="text-xs text-ink/60 font-body line-clamp-1 mt-0.5">
                      {evt.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-5 border-t md:border-t-0 pt-3 md:pt-0 border-ink/10 shrink-0">
                    <div className="flex items-center gap-2">
                      <Button asChild size="sm" variant="secondary" className="text-xs h-8 border-ink/20 hover:border-ink">
                        <Link href={`/events/${evt.slug}`} target="_blank">
                          Public
                          <ArrowUpRight className="w-3 h-3 ml-1 text-gold" />
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="text-xs h-8">
                        <Link href="/admin/events">Edit</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Vendor Curation Pipeline */}
          <div className="border-2 border-ink/15 bg-white p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-ink/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-ink text-gold flex items-center justify-center">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-headline text-base uppercase tracking-wider text-ink">
                    Vendor Curation & Permit Queue ({pendingVendors.length})
                  </h3>
                  <span className="text-xs text-ink/50 font-body">
                    Enforce single-brand category exclusivity & generate 48-hour Stripe pay links
                  </span>
                </div>
              </div>

              <Button asChild size="sm" variant="outline" className="text-xs h-7 gap-1 border-ink/20">
                <Link href="/admin/vendors">
                  <span>Full Pipeline</span>
                  <ChevronRight className="w-3 h-3 text-gold" />
                </Link>
              </Button>
            </div>

            {pendingVendors.length === 0 && (
              <p className="text-sm text-ink/50 font-body py-6 text-center border border-dashed border-ink/15">
                No applications waiting on review.
              </p>
            )}

            <div className="space-y-3">
              {pendingVendors.map((app) => (
                <div
                  key={app.id}
                  className="p-4 border-2 border-ink/10 bg-ink/[0.01] hover:border-ink/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-headline text-sm uppercase text-ink tracking-wide">
                        {app.businessName}
                      </span>
                      <span className="text-[10px] font-headline uppercase bg-gold/15 text-ink px-2 py-0.5 border border-gold/40">
                        {app.subcategoryName}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 border border-emerald-300">
                        {formatCurrency(app.feeCents)} Permit
                      </span>
                    </div>

                    <p className="text-xs text-ink/60 font-body">
                      {app.contactName} ({app.city}) • Applied for: <strong className="text-ink">{app.targetEventTitle}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <Button asChild size="sm" variant="primary" className="text-xs h-8 gap-1 shadow-2xs">
                      <Link href="/admin/vendors">
                        Review Brand
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (1 of 3 cols): Legal Waiver Stream & Financial Breakdown ── */}
        <div className="space-y-8">
          {/* Latest Signed Waivers Stream */}
          <div className="border-2 border-ink/15 bg-white p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-ink/10">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <h3 className="font-headline text-sm uppercase tracking-wider text-ink">
                  Waiver Gate Pass Feed
                </h3>
              </div>
              <Link
                href="/admin/waivers"
                className="text-xs font-headline uppercase text-gold hover:text-ink transition-colors flex items-center gap-0.5"
              >
                All Logs <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {recentWaivers.length === 0 && (
              <p className="text-xs text-ink/50 font-body py-5 text-center border border-dashed border-ink/15">
                No waivers signed yet.
              </p>
            )}

            <div className="space-y-2.5">
              {recentWaivers.map((waiver) => (
                <div
                  key={waiver.id}
                  className="p-3 border border-ink/10 bg-ink/[0.015] text-xs font-body hover:border-ink/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-ink flex items-center gap-1.5">
                      {waiver.signerName}
                      <span className="text-[9px] font-headline uppercase bg-ink/5 px-1 py-0.2 text-ink/60">
                        {waiver.role}
                      </span>
                    </span>
                    <span className="text-[10px] font-mono text-ink/40">
                      {format(new Date(waiver.signedAt), "h:mm a")}
                    </span>
                  </div>

                  <p className="text-ink/60 text-[11px] mb-1.5 truncate">
                    {waiver.targetEntity}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-ink/50 font-mono pt-1 border-t border-ink/5">
                    <span>IP: {waiver.ipAddress}</span>
                    <span className="text-emerald-700 font-semibold uppercase flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      ESIGN Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button asChild variant="outline" size="sm" className="w-full text-xs border-ink/20 hover:border-ink">
                <Link href="/admin/waivers">
                  Download Venue CSV Audit Log
                </Link>
              </Button>
            </div>
          </div>

          {/* Financial Revenue Streams Breakdown */}
          <div className="border-2 border-ink/15 bg-white p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-ink/10">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gold" />
                <h3 className="font-headline text-sm uppercase tracking-wider text-ink">
                  Revenue Distribution
                </h3>
              </div>
              <Link
                href="/admin/financials"
                className="text-xs font-headline uppercase text-gold hover:text-ink transition-colors flex items-center gap-0.5"
              >
                Ledger <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div>
              <span className="text-[10px] font-headline uppercase tracking-wider text-ink/50 block">
                Settled Season Gross
              </span>
              <span className="font-headline text-2xl text-ink font-mono font-bold">
                {formatCurrency(financials.totalGrossCents)}
              </span>
            </div>

            {financials.totalGrossCents === 0 ? (
              <p className="text-xs text-ink/50 font-body py-4 text-center border border-dashed border-ink/15">
                Nothing settled yet — the split appears once payments run through.
              </p>
            ) : (
              <>
                <div className="w-full h-3.5 bg-ink/10 flex overflow-hidden">
                  {REVENUE_STREAMS.map((stream) => (
                    <div
                      key={stream.label}
                      className={`h-full ${stream.barClass}`}
                      style={{ width: `${share(stream.amountOf(financials))}%` }}
                      title={`${stream.label} (${share(stream.amountOf(financials))}%)`}
                    />
                  ))}
                </div>

                <div className="space-y-1.5 text-[11px] font-body">
                  {REVENUE_STREAMS.map((stream) => (
                    <div key={stream.label} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-ink/70">
                        <span className={`w-2.5 h-2.5 inline-block shrink-0 ${stream.barClass}`} />
                        {stream.label}
                      </span>
                      <span className="font-mono font-semibold">
                        {formatCurrency(stream.amountOf(financials))} ({share(stream.amountOf(financials))}%)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
