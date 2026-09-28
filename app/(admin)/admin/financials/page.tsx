import type { Metadata } from "next";
import { getFinancialReport } from "@/lib/admin/data";
import type { FinancialReport } from "@/lib/admin/data";
import { formatCurrency } from "@/lib/vendors/data";
import { FinancialTransactionsTable } from "@/components/admin/financial-transactions-table";
import { AlertTriangle, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Financials & Stripe — GAMEDAY Console",
};

const STREAMS = [
  { label: "Tickets", barClass: "bg-ink", amountOf: (r: FinancialReport) => r.ticketSalesCents },
  { label: "Team Fees", barClass: "bg-gold", amountOf: (r: FinancialReport) => r.teamFeesCents },
  { label: "Vendor Permits", barClass: "bg-amber-600", amountOf: (r: FinancialReport) => r.vendorFeesCents },
  { label: "Sponsorships", barClass: "bg-emerald-700", amountOf: (r: FinancialReport) => r.sponsorshipCents },
];

export default function AdminFinancialsPage() {
  const report = getFinancialReport();

  /*
   * Shares are derived from the totals. They were previously typed in by hand
   * (38.1 / 35.0 / 13.6 / 13.3) and stayed put no matter what the figures said.
   */
  const share = (cents: number) =>
    report.totalGrossCents === 0
      ? "0.0"
      : ((cents / report.totalGrossCents) * 100).toFixed(1);

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

        <div className="flex items-center gap-2 text-xs font-body text-amber-900 bg-amber-50 border border-amber-300 px-3 py-1.5">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Not connected — no payment provider configured</span>
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
            {share(report.ticketSalesCents)}% of gross revenue
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
            {share(report.teamFeesCents)}% of gross revenue
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
            {share(report.vendorFeesCents)}% of gross revenue
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
            {share(report.sponsorshipCents)}% of gross revenue
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

        {report.totalGrossCents === 0 ? (
          <p className="text-xs text-ink/50 font-body py-4 text-center border border-dashed border-ink/15">
            Nothing settled yet — the split appears once payments run through.
          </p>
        ) : (
          <>
            <div className="w-full h-4 bg-ink/10 flex overflow-hidden">
              {STREAMS.map((stream) => (
                <div
                  key={stream.label}
                  className={`h-full ${stream.barClass}`}
                  style={{ width: `${share(stream.amountOf(report))}%` }}
                  title={`${stream.label} (${share(stream.amountOf(report))}%)`}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-ink/70 font-body pt-1">
              {STREAMS.map((stream) => (
                <div key={stream.label} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 inline-block ${stream.barClass}`} />
                  <span>
                    {stream.label} ({share(stream.amountOf(report))}%)
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
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
        </div>

        <FinancialTransactionsTable initialTransactions={report.recentTransactions} />
      </div>
    </div>
  );
}
