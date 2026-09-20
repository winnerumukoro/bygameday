import type { Metadata } from "next";
import { getFinancialReport } from "@/lib/admin/data";
import { formatCurrency } from "@/lib/vendors/data";
import { FinancialTransactionsTable } from "@/components/admin/financial-transactions-table";
import { ShieldCheck, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Financials & Stripe — GAMEDAY Console",
};

export default function AdminFinancialsPage() {
  const report = getFinancialReport();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-ink/15 pb-6">
        <div>
          <span className="text-xs font-headline uppercase tracking-widest text-gold block mb-1">
            Revenue & Payout Settlement
          </span>
          <h1 className="text-3xl sm:text-4xl font-headline uppercase tracking-tight text-ink">
            FINANCIAL REPORTING & STRIPE
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-body text-ink/60 bg-white border border-ink/15 px-3 py-1.5">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span>Stripe Connect Gateway Active</span>
        </div>
      </div>

      {/* ────────────── REVENUE STREAMS METRIC CARDS ────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stream 1: Ticket Sales */}
        <div className="border-2 border-ink/15 bg-white p-5">
          <span className="text-[11px] font-headline uppercase tracking-wider text-ink/50 block mb-1">
            Spectator Tickets
          </span>
          <span className="font-headline text-2xl text-ink block">
            {formatCurrency(report.ticketSalesCents)}
          </span>
          <span className="text-[11px] text-ink/60 font-body block mt-1">
            38.1% of Gross Revenue
          </span>
        </div>

        {/* Stream 2: Team Fees */}
        <div className="border-2 border-ink/15 bg-white p-5">
          <span className="text-[11px] font-headline uppercase tracking-wider text-ink/50 block mb-1">
            Intramural Team Fees
          </span>
          <span className="font-headline text-2xl text-ink block">
            {formatCurrency(report.teamFeesCents)}
          </span>
          <span className="text-[11px] text-ink/60 font-body block mt-1">
            35.0% of Gross Revenue
          </span>
        </div>

        {/* Stream 3: Vendor Fees */}
        <div className="border-2 border-ink/15 bg-white p-5">
          <span className="text-[11px] font-headline uppercase tracking-wider text-ink/50 block mb-1">
            Vendor Concession Permits
          </span>
          <span className="font-headline text-2xl text-gold block">
            {formatCurrency(report.vendorFeesCents)}
          </span>
          <span className="text-[11px] text-ink/60 font-body block mt-1">
            13.6% of Gross Revenue
          </span>
        </div>

        {/* Stream 4: Sponsorships */}
        <div className="border-2 border-ink/15 bg-white p-5">
          <span className="text-[11px] font-headline uppercase tracking-wider text-ink/50 block mb-1">
            Corporate Sponsorships
          </span>
          <span className="font-headline text-2xl text-ink block">
            {formatCurrency(report.sponsorshipCents)}
          </span>
          <span className="text-[11px] text-ink/60 font-body block mt-1">
            13.3% of Gross Revenue
          </span>
        </div>
      </div>

      {/* Visual Revenue Stack Bar */}
      <div className="border-2 border-ink/15 bg-white p-6 space-y-3">
        <div className="flex justify-between items-center text-xs font-body">
          <span className="font-headline uppercase tracking-wider text-ink">
            Revenue Stream Distribution
          </span>
          <span className="font-headline text-base text-ink">
            Total Gross: {formatCurrency(report.totalGrossCents)}
          </span>
        </div>

        <div className="w-full h-4 bg-ink/10 flex overflow-hidden">
          <div className="h-full bg-ink" style={{ width: "38.1%" }} title="Tickets (38.1%)" />
          <div className="h-full bg-gold" style={{ width: "35.0%" }} title="Team Fees (35.0%)" />
          <div className="h-full bg-amber-600" style={{ width: "13.6%" }} title="Vendors (13.6%)" />
          <div className="h-full bg-emerald-700" style={{ width: "13.3%" }} title="Sponsors (13.3%)" />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] text-ink/70 font-body pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-ink inline-block" />
            <span>Tickets (38.1%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-gold inline-block" />
            <span>Team Fees (35.0%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-amber-600 inline-block" />
            <span>Vendor Permits (13.6%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-700 inline-block" />
            <span>Sponsorships (13.3%)</span>
          </div>
        </div>
      </div>

      {/* ────────────── STRIPE TRANSACTIONS LEDGER ────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-ink/10">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gold" />
            <h3 className="font-headline text-sm uppercase tracking-wider text-ink">
              Recent Stripe Transactions & Refunds
            </h3>
          </div>
          <span className="text-xs text-ink/50 font-body">Live Payout Status</span>
        </div>

        <FinancialTransactionsTable initialTransactions={report.recentTransactions} />
      </div>
    </div>
  );
}
