"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  type VendorCategory,
  type VendorSubcategory,
  type VendorAcceptingEvent,
} from "@/lib/vendors/data";
import { UtensilsCrossed, ShoppingBag, Camera, ArrowRight, CheckCircle2 } from "lucide-react";

interface VendorCategoryBrowserProps {
  categories: VendorCategory[];
  subcategories: VendorSubcategory[];
  events: VendorAcceptingEvent[];
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  food: UtensilsCrossed,
  merch: ShoppingBag,
  services: Camera,
};

export function VendorCategoryBrowser({
  categories,
  subcategories,
  events,
}: VendorCategoryBrowserProps) {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(
    categories[0]?.slug || "food"
  );

  const activeCategory = categories.find((c) => c.slug === activeCategorySlug);
  const activeSubs = subcategories.filter(
    (s) => s.categoryId === activeCategory?.id
  );

  return (
    <div className="w-full">
      {/* Category selector pills / tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 border-b border-ink/15 pb-4 mb-8">
        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.slug] ?? ShoppingBag;
          const isActive = cat.slug === activeCategorySlug;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategorySlug(cat.slug)}
              className={cn(
                "inline-flex items-center gap-2.5 px-5 py-3 font-headline uppercase text-xs sm:text-sm tracking-wider border transition-all duration-150",
                isActive
                  ? "bg-ink text-ivory border-ink"
                  : "bg-white text-ink/70 border-ink/15 hover:border-ink/40 hover:text-ink"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-gold" : "text-ink/50")} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Subcategories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeSubs.map((sub) => {
          // Calculate total available slots across all upcoming events for this subcategory
          let totalAvailableSlots = 0;
          let matchingEventCount = 0;

          events.forEach((evt) => {
            const slot = evt.slots.find((s) => s.subcategoryId === sub.id);
            if (slot) {
              matchingEventCount += 1;
              totalAvailableSlots += slot.available;
            }
          });

          return (
            <div
              key={sub.id}
              className="border-2 border-ink/15 bg-white p-5 flex flex-col justify-between hover:border-ink/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="font-headline text-base uppercase tracking-wider text-ink">
                    {sub.name}
                  </h4>
                  {totalAvailableSlots > 0 ? (
                    <span className="text-[10px] font-headline uppercase tracking-widest bg-gold/15 text-ink px-2 py-0.5 border border-gold/30">
                      {totalAvailableSlots} Open Slot{totalAvailableSlots === 1 ? "" : "s"}
                    </span>
                  ) : (
                    <span className="text-[10px] font-headline uppercase tracking-widest bg-ink/10 text-ink/60 px-2 py-0.5">
                      Waitlist
                    </span>
                  )}
                </div>

                <p className="text-xs text-ink/60 font-body mb-4 leading-relaxed">
                  Strict single-vendor exclusivity per event. Verified load-in access, 10x10 activation footprint, and social spotlight.
                </p>

                <div className="text-[11px] text-ink/70 font-body flex items-center gap-1.5 mb-5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>Eligible across {matchingEventCount} scheduled tournament{matchingEventCount === 1 ? "" : "s"}</span>
                </div>
              </div>

              <Link
                href={`/vendors/apply`}
                className="group inline-flex items-center justify-between text-xs font-headline uppercase tracking-wider text-ink pt-3 border-t border-ink/10 hover:text-gold transition-colors"
              >
                <span>Apply for this specialty</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
