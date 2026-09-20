import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { VendorApplicationForm } from "@/components/vendors/vendor-application-form";
import {
  getVendorCategories,
  VENDOR_SUBCATEGORIES,
  getVendorAcceptingEvents,
} from "@/lib/vendors/data";
import { ArrowLeft, Store } from "lucide-react";

export const metadata: Metadata = {
  title: "Apply as a Vendor — GAMEDAY",
  description:
    "Apply to become an official vendor at GAMEDAY tournaments. Free submission, curated selection, single-category exclusivity guaranteed.",
};

interface ApplyPageProps {
  searchParams: Promise<{ event?: string; cancelled?: string }>;
}

export default async function VendorApplyPage({ searchParams }: ApplyPageProps) {
  const resolvedParams = await searchParams;
  const initialEventId = resolvedParams.event;
  const wasCancelled = resolvedParams.cancelled === "true";

  const categories = getVendorCategories();
  const events = getVendorAcceptingEvents();

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-ivory min-h-screen">
      <div className="max-w-stadium mx-auto px-4 sm:px-6 lg:px-12">
        {/* Navigation / Header */}
        <div className="mb-8 sm:mb-10">
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 text-xs font-headline uppercase tracking-wider text-ink/70 hover:text-ink mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vendor Marketplace
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ink/15 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-ink/5 px-3 py-1 border border-ink/10 mb-3 text-ink/70">
                <Store className="w-3.5 h-3.5 text-gold" />
                <span className="text-[11px] font-headline uppercase tracking-widest">
                  Vendor Application Pipeline
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline uppercase tracking-tight text-ink">
                APPLY FOR A VENDOR SLOT
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-ink/60 font-body max-w-sm sm:text-right">
              Free to submit. 48h payment hold upon curation approval. Single-category exclusivity guaranteed.
            </p>
          </div>
        </div>

        {wasCancelled && (
          <div className="mb-8 p-4 bg-amber-50 border-2 border-amber-400 text-amber-900 text-xs sm:text-sm font-body">
            <strong>Payment Session Cancelled:</strong> Your checkout session was cancelled. If you still wish to secure a slot, you can re-apply below or use your emailed payment link.
          </div>
        )}

        {/* Application Wizard */}
        <Suspense fallback={<div className="text-center py-20 font-body text-ink/50">Loading application...</div>}>
          <VendorApplicationForm
            categories={categories}
            subcategories={VENDOR_SUBCATEGORIES}
            events={events}
            initialEventId={initialEventId}
          />
        </Suspense>
      </div>
    </div>
  );
}
