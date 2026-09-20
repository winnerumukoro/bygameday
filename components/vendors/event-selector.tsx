"use client";

import { cn } from "@/lib/utils";
import { Calendar, MapPin, Check, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import type { VendorAcceptingEvent } from "@/lib/vendors/data";
import { formatCurrency } from "@/lib/vendors/data";

interface EventSelectorProps {
  events: VendorAcceptingEvent[];
  selectedEventIds: string[];
  selectedSubcategoryId: string;
  onToggleEvent: (eventId: string) => void;
}

export function EventSelector({
  events,
  selectedEventIds,
  selectedSubcategoryId,
  onToggleEvent,
}: EventSelectorProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-ink/10">
        <AlertCircle className="w-8 h-8 text-ink/30 mx-auto mb-3" />
        <p className="text-sm text-ink/50 font-body">
          No events are currently accepting vendor applications.
        </p>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-headline uppercase tracking-wider text-ink/70 mb-3">
        Select Events to Apply For
      </label>
      <p className="text-xs text-ink/50 font-body mb-4">
        Choose one or more events. Availability and fees shown per event.
      </p>

      <div className="space-y-3">
        {events.map((event) => {
          const isSelected = selectedEventIds.includes(event.id);

          // Find slot availability for the selected subcategory at this event
          const subcatSlot = selectedSubcategoryId
            ? event.slots.find((s) => s.subcategoryId === selectedSubcategoryId)
            : null;

          const hasSlotForSubcat = !!subcatSlot;
          const isSoldOut = subcatSlot ? subcatSlot.available === 0 : false;
          const isDisabled = !hasSlotForSubcat || isSoldOut;

          return (
            <button
              key={event.id}
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) onToggleEvent(event.id);
              }}
              className={cn(
                "w-full flex items-start gap-4 p-4 border-2 text-left transition-all",
                isSelected && !isDisabled && "border-gold bg-gold/5",
                !isSelected && !isDisabled && "border-ink/10 bg-white hover:border-ink/30",
                isDisabled && "border-ink/5 bg-ink/[0.02] opacity-60 cursor-not-allowed"
              )}
            >
              {/* Cover thumbnail */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden bg-ink/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.coverImagePath}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Event details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-headline text-sm uppercase tracking-wider text-ink leading-tight line-clamp-2">
                    {event.title}
                  </h3>
                  {isSelected && !isDisabled && (
                    <div className="w-5 h-5 bg-gold flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-1.5 text-xs text-ink/50 font-body">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(event.startsAt), "MMM d, yyyy")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.venueName}
                  </span>
                </div>

                {/* Slot availability for selected subcategory */}
                {subcatSlot && (
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    {isSoldOut ? (
                      <span className="text-[10px] px-2 py-0.5 bg-ink/10 text-ink/60 font-headline uppercase tracking-wider">
                        SOLD OUT
                      </span>
                    ) : (
                      <>
                        <span className="text-[10px] px-2 py-0.5 bg-gold/10 text-gold font-headline uppercase tracking-wider">
                          {subcatSlot.available} of {subcatSlot.total} AVAILABLE
                        </span>
                        <span className="text-xs font-body font-medium text-ink/70">
                          {formatCurrency(subcatSlot.feeCents)}
                        </span>
                      </>
                    )}
                  </div>
                )}

                {!hasSlotForSubcat && selectedSubcategoryId && (
                  <p className="text-[10px] text-ink/40 mt-2 font-body">
                    This event doesn&apos;t have slots for your selected specialty
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
