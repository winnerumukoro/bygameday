import Link from "next/link";
import { format } from "date-fns";
import {
  getAdminKPIs,
  getAdminVendorApplications,
  getWaiverAuditLogs,
  getBroadcastAlerts,
  getFinancialReport,
} from "@/lib/admin/data";
import { formatCurrency } from "@/lib/vendors/data";
import { getAllPublishedEvents } from "@/lib/events/data";
import { SEED_BRACKET } from "@/lib/sports/data";
import { CourtsideLiveTicker } from "@/components/admin/courtside-live-ticker";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Store,
  FileCheck2,
  Trophy,
  Radio,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  MapPin,
  Flame,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function AdminDashboardPage() {
  const kpis = getAdminKPIs();
  const pendingVendors = getAdminVendorApplications().filter(
    (a) => a.status === "submitted" || a.status === "reviewing"
  );
  const recentWaivers = getWaiverAuditLogs().slice(0, 5);
  const activeEvents = getAllPublishedEvents({ includePast: false }).slice(0, 4);
  const alerts = getBroadcastAlerts().filter((a) => a.active);
  const financials = getFinancialReport();

  return (
    <div className="space-y-8">
      {/* ────────────── 1. COMMAND CONSOLE HEADER & TELEMETRY ────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-ink/15 pb-6">
        <div>
          {/* Status Gateway Pill Ribbon */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] font-headline uppercase tracking-[0.2em] text-gold bg-gold/15 px-2 py-0.5 border border-gold/30">
              REAL-TIME COURTSIDE TELEMETRY
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 border border-green-300 text-[10px] font-body text-green-900">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
              <span>Stripe Gateway Active</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-ink/5 border border-ink/15 text-[10px] font-body text-ink/70">
              <ShieldCheck className="w-3 h-3 text-gold" />
              <span>ESIGN Gate Pass Enforced</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline uppercase tracking-tight text-ink">
            EXECUTIVE OPS CONSOLE
          </h1>
          <p className="text-xs sm:text-sm text-ink/60 font-body max-w-2xl mt-1">
            Tournament operations cockpit, real-time match scoring, vendor permit allocation, and legal waiver compliance.
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
                  Posted {format(new Date(alerts[0].postedAt), "h:mm a")} EST
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

      {/* ────────────── 3. REDESIGNED KPI TELEMETRY GRID ────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Metric 1: Gross Revenue */}
        <div className="border-2 border-ink/15 bg-white p-5 flex flex-col justify-between hover:border-gold transition-colors group shadow-xs">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-headline uppercase tracking-widest text-ink/50">
                Gross Revenue
              </span>
              <DollarSign className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-headline text-3xl sm:text-4xl text-ink tracking-tight block font-mono font-bold">
              {formatCurrency(kpis.grossRevenueCents)}
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-ink/10 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +18.4% YoY
              </span>
              <span className="text-ink/40 font-mono text-[10px]">Stripe Live</span>
            </div>
            {/* Visual Stream Sparkbar */}
            <div className="w-full h-1.5 bg-ink/10 flex overflow-hidden">
              <div className="h-full bg-ink" style={{ width: "38%" }} title="Tickets" />
              <div className="h-full bg-gold" style={{ width: "35%" }} title="Teams" />
              <div className="h-full bg-amber-600" style={{ width: "14%" }} title="Vendors" />
              <div className="h-full bg-emerald-700" style={{ width: "13%" }} title="Sponsors" />
            </div>
          </div>
        </div>

        {/* Metric 2: Athletes Rostered */}
        <div className="border-2 border-ink/15 bg-white p-5 flex flex-col justify-between hover:border-gold transition-colors group shadow-xs">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-headline uppercase tracking-widest text-ink/50">
                Athletes Rostered
              </span>
              <Users className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-headline text-3xl sm:text-4xl text-ink tracking-tight block font-mono font-bold">
              {kpis.totalAthletes.toLocaleString()}
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-ink/10 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-ink/70 font-medium">5 Tournament Sports</span>
              <span className="text-gold font-bold font-mono text-[10px]">92% Roster Min</span>
            </div>
            <div className="w-full h-1.5 bg-ink/10 overflow-hidden">
              <div className="h-full bg-gold" style={{ width: "92%" }} />
            </div>
          </div>
        </div>

        {/* Metric 3: Active Events */}
        <div className="border-2 border-ink/15 bg-white p-5 flex flex-col justify-between hover:border-gold transition-colors group shadow-xs">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-headline uppercase tracking-widest text-ink/50">
                Active Events
              </span>
              <Calendar className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-headline text-3xl sm:text-4xl text-ink tracking-tight block font-mono font-bold">
              {kpis.activeEventsCount}
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-ink/10 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-ink/70">Capacity Average</span>
              <span className="font-semibold text-ink font-mono text-[10px]">84% Fill</span>
            </div>
            <div className="w-full h-1.5 bg-ink/10 overflow-hidden">
              <div className="h-full bg-ink" style={{ width: "84%" }} />
            </div>
          </div>
        </div>

        {/* Metric 4: Vendor Queue */}
        <div className="border-2 border-ink/15 bg-white p-5 flex flex-col justify-between hover:border-gold transition-colors group shadow-xs">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-headline uppercase tracking-widest text-ink/50">
                Vendor Queue
              </span>
              <Store className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-headline text-3xl sm:text-4xl text-gold tracking-tight block font-mono font-bold">
              {kpis.pendingVendorApps}
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-ink/10 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-amber-700 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                48h Pay Lock
              </span>
              <span className="text-ink/50 font-mono text-[10px]">1/Cat Rule</span>
            </div>
            <div className="w-full h-1.5 bg-amber-100 overflow-hidden">
              <div className="h-full bg-amber-500" style={{ width: "65%" }} />
            </div>
          </div>
        </div>

        {/* Metric 5: Waiver Compliance */}
        <div className="border-2 border-ink/15 bg-white p-5 flex flex-col justify-between hover:border-gold transition-colors group shadow-xs">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-headline uppercase tracking-widest text-ink/50">
                Waiver Gate Pass
              </span>
              <FileCheck2 className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-headline text-3xl sm:text-4xl text-emerald-700 tracking-tight block font-mono font-bold">
              {kpis.waiverCompletionRate}%
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-ink/10 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-emerald-800 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified ESIGN
              </span>
              <span className="text-ink/40 font-mono text-[10px]">Gate Clr</span>
            </div>
            <div className="w-full h-1.5 bg-emerald-100 overflow-hidden">
              <div className="h-full bg-emerald-600" style={{ width: `${kpis.waiverCompletionRate}%` }} />
            </div>
          </div>
        </div>

        {/* Metric 6: Live Courtside Matches */}
        <div className="border-2 border-red-600 bg-red-50/50 p-5 flex flex-col justify-between hover:bg-red-50 transition-colors group shadow-xs">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-headline uppercase tracking-widest text-red-700 font-bold">
                Courtside Live
              </span>
              <Radio className="w-4 h-4 text-red-600 animate-pulse" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-3xl sm:text-4xl text-red-600 tracking-tight block font-mono font-bold">
                {kpis.liveMatchesNow}
              </span>
              <span className="text-xs font-headline uppercase text-red-700">Matches Active</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-red-200 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-red-700 font-semibold">Rucker Park Courts</span>
              <Link
                href="/admin/tournaments"
                className="text-[10px] font-headline uppercase text-red-800 hover:text-black font-bold flex items-center gap-0.5"
              >
                Score <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="w-full h-1.5 bg-red-200 overflow-hidden">
              <div className="h-full bg-red-600 animate-pulse" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
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

                  {/* Right side metrics and actions */}
                  <div className="flex items-center justify-between md:justify-end gap-5 border-t md:border-t-0 pt-3 md:pt-0 border-ink/10 shrink-0">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] font-headline uppercase tracking-wider text-ink/40 block">
                        Gate Capacity
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-ink/10 overflow-hidden">
                          <div className="h-full bg-gold" style={{ width: "78%" }} />
                        </div>
                        <span className="font-headline text-xs text-ink font-mono">78%</span>
                      </div>
                    </div>

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

            {/* Stacked stream bar */}
            <div className="w-full h-3.5 bg-ink/10 flex overflow-hidden">
              <div className="h-full bg-ink" style={{ width: "38.1%" }} title="Tickets (38.1%)" />
              <div className="h-full bg-gold" style={{ width: "35.0%" }} title="Team Fees (35.0%)" />
              <div className="h-full bg-amber-600" style={{ width: "13.6%" }} title="Vendors (13.6%)" />
              <div className="h-full bg-emerald-700" style={{ width: "13.3%" }} title="Sponsors (13.3%)" />
            </div>

            <div className="space-y-1.5 text-[11px] font-body">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-ink/70">
                  <span className="w-2.5 h-2.5 bg-ink inline-block shrink-0" />
                  Spectator Tickets
                </span>
                <span className="font-mono font-semibold">{formatCurrency(financials.ticketSalesCents)} (38.1%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-ink/70">
                  <span className="w-2.5 h-2.5 bg-gold inline-block shrink-0" />
                  Team Entry Fees
                </span>
                <span className="font-mono font-semibold">{formatCurrency(financials.teamFeesCents)} (35.0%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-ink/70">
                  <span className="w-2.5 h-2.5 bg-amber-600 inline-block shrink-0" />
                  Vendor Permits
                </span>
                <span className="font-mono font-semibold">{formatCurrency(financials.vendorFeesCents)} (13.6%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-ink/70">
                  <span className="w-2.5 h-2.5 bg-emerald-700 inline-block shrink-0" />
                  Sponsorships
                </span>
                <span className="font-mono font-semibold">{formatCurrency(financials.sponsorshipCents)} (13.3%)</span>
              </div>
            </div>
          </div>

          {/* Courtside Operational Readiness Card */}
          <div className="border-2 border-ink/15 bg-white p-6 space-y-3.5 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-ink/10">
              <Flame className="w-4 h-4 text-gold" />
              <h3 className="font-headline text-sm uppercase tracking-wider text-ink">
                Courtside Readiness Hotlist
              </h3>
            </div>

            <ul className="space-y-2 text-xs font-body text-ink/80">
              <li className="flex items-center justify-between p-2 bg-ink/[0.02] border border-ink/10">
                <span className="font-medium">EMT / Medical Station</span>
                <span className="text-[10px] font-headline uppercase bg-green-100 text-green-800 px-1.5 py-0.5">
                  Court 1 Standby
                </span>
              </li>
              <li className="flex items-center justify-between p-2 bg-ink/[0.02] border border-ink/10">
                <span className="font-medium">Scorer Table Clock Sync</span>
                <span className="text-[10px] font-headline uppercase bg-green-100 text-green-800 px-1.5 py-0.5">
                  Synchronized
                </span>
              </li>
              <li className="flex items-center justify-between p-2 bg-ink/[0.02] border border-ink/10">
                <span className="font-medium">Staff Radio Channel</span>
                <span className="text-[10px] font-headline uppercase bg-ink/10 text-ink px-1.5 py-0.5 font-mono">
                  CH-04 COURTSIDE
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
