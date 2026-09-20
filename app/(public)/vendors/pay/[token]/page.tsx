import type { Metadata } from "next";
import Link from "next/link";
import { VendorPayButton } from "@/components/vendors/vendor-pay-button";
import { formatCurrency } from "@/lib/vendors/data";
import { getAllPublishedEvents } from "@/lib/events/data";
import {
  Clock,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  MapPin,
  Store,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Complete Vendor Payment — GAMEDAY",
  description: "Secure your approved vendor slot for GAMEDAY.",
};

interface VendorPayPageProps {
  params: Promise<{ token: string }>;
}

export default async function VendorPayPage({ params }: VendorPayPageProps) {
  const { token } = await params;

  // Check for expired token test simulation
  const isExpired = token === "expired";

  // In production: Look up slot by payment_token from vendor_event_slots table
  // Fallback / mock data for showcase:
  const events = getAllPublishedEvents();
  const sampleEvent = events[0];
  const subcategoryName = "Smash Burgers";
  const feeCents = 35000;
  const mockSlotId = `slot-${token}`;
  const mockAppId = `app-${token}`;
  const mockEmail = "vendor@brand.com";

  if (isExpired) {
    return (
      <div className="pt-28 sm:pt-36 pb-24 bg-ivory min-h-screen">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="border-2 border-red-500 bg-white p-6 sm:p-10 text-center">
            <div className="w-12 h-12 bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-headline uppercase tracking-tight text-ink mb-2">
              Payment Window Expired
            </h1>
            <p className="text-sm font-body text-ink/70 leading-relaxed mb-6">
              The 48-hour reserved hold for this vendor slot has passed. In accordance with our category exclusivity rules, the spot has been offered to the next waitlisted brand.
            </p>
            <div className="pt-4 border-t border-ink/10">
              <Link
                href="/vendors"
                className="inline-flex items-center gap-2 text-xs font-headline uppercase tracking-wider text-ink hover:text-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Vendor Marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-ivory min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 text-xs font-headline uppercase tracking-wider text-ink/70 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vendor Marketplace
          </Link>
        </div>

        {/* Payment Card */}
        <div className="border-2 border-ink/20 bg-white p-6 sm:p-10">
          {/* Card Header */}
          <div className="flex items-center justify-between gap-4 pb-6 mb-6 border-b border-ink/15">
            <div>
              <span className="text-[11px] font-headline uppercase tracking-widest text-gold block">
                Curation Approved
              </span>
              <h1 className="text-2xl sm:text-3xl font-headline uppercase tracking-tight text-ink">
                SECURE YOUR VENDOR PERMIT
              </h1>
            </div>

            <div className="w-12 h-12 bg-ink flex items-center justify-center flex-shrink-0">
              <Store className="w-6 h-6 text-gold" />
            </div>
          </div>

          {/* Reserved Hold Warning */}
          <div className="p-4 bg-amber-50 border-l-4 border-amber-500 mb-8 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs font-body text-amber-900 leading-relaxed">
              <strong className="font-headline uppercase tracking-wider block mb-0.5 text-amber-950">
                48-Hour Reserved Hold Active
              </strong>
              Your category exclusivity is temporarily locked. Complete payment before the hold window expires to permanently confirm your slot.
            </div>
          </div>

          {/* Slot Breakdown */}
          <div className="space-y-4 mb-8">
            <h2 className="text-xs font-headline uppercase tracking-wider text-ink/60">
              Permit Summary
            </h2>

            <div className="border border-ink/10 bg-ink/[0.02] p-4 sm:p-5 space-y-3">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-headline text-base uppercase tracking-tight text-ink">
                    {sampleEvent.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-ink/60 font-body mt-1">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      {format(new Date(sampleEvent.startsAt), "MMMM d, yyyy")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      {sampleEvent.venueName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-ink/10 flex items-center justify-between text-xs font-body">
                <span className="text-ink/60">Assigned Specialty:</span>
                <span className="font-headline uppercase tracking-wider text-ink bg-gold/15 px-2 py-0.5 border border-gold/30">
                  {subcategoryName}
                </span>
              </div>

              <div className="pt-3 border-t border-ink/10 flex items-center justify-between text-sm font-body">
                <span className="font-semibold text-ink">Total Permit Fee:</span>
                <span className="font-headline text-2xl text-gold">
                  {formatCurrency(feeCents)}
                </span>
              </div>
            </div>
          </div>

          {/* Stripe Pay Button */}
          <div className="mb-6">
            <VendorPayButton
              paymentToken={token}
              slotId={mockSlotId}
              applicationId={mockAppId}
              email={mockEmail}
              eventTitle={sampleEvent.title}
              subcategoryName={subcategoryName}
              feeCents={feeCents}
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-body text-ink/50">
            <ShieldCheck className="w-4 h-4 text-ink/40" />
            <span>Encrypted 256-bit payment processing via Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
}
