"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import { CalendarFilters } from "@/components/calendar/calendar-filters";
import { CalendarView } from "@/components/calendar/calendar-view";
import { EventCard } from "@/components/brand/event-card";
import { Button } from "@/components/ui/button";
import { getAllPublishedEvents, GamedayEvent } from "@/lib/events/data";
import { CalendarX, Plus } from "lucide-react";

function EventsContent() {
  const searchParams = useSearchParams();
  const [currentView, setCurrentView] = React.useState<"list" | "calendar">("list");

  // Read URL filter params
  const activeTypes = React.useMemo(() => {
    const t = searchParams.get("type");
    return t ? t.split(",").map((s) => s.trim().toLowerCase()) : [];
  }, [searchParams]);

  const activeSource = (searchParams.get("source") as "all" | "gameday" | "community") || "all";
  const includePast = searchParams.get("past") === "true";

  // Filter events dynamically
  const filteredEvents = React.useMemo(() => {
    return getAllPublishedEvents({
      types: activeTypes.length > 0 ? activeTypes : undefined,
      source: activeSource,
      includePast,
    });
  }, [activeTypes, activeSource, includePast]);

  // Group events by Month & Year for List View
  const groupedEvents = React.useMemo(() => {
    const groups: Record<string, GamedayEvent[]> = {};
    filteredEvents.forEach((event) => {
      const monthKey = format(parseISO(event.startsAt), "MMMM yyyy");
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(event);
    });
    return groups;
  }, [filteredEvents]);

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-stadium mx-auto px-4 sm:px-6 lg:px-12 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-ink/15 pb-8">
        <div>
          <span className="text-xs font-headline uppercase tracking-widest text-gold block mb-2">
            Schedule of Play & Gatherings
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-headline uppercase text-ink tracking-tight leading-tighter">
            EVENT CALENDAR
          </h1>
          <p className="text-sm sm:text-base text-ink/70 font-body max-w-2xl mt-4 leading-relaxed">
            Discover championship tournaments, midnight 1v1 showdowns, viewing parties, and community events across the region.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="secondary" size="default">
            <Link href="/events/submit" className="inline-flex items-center gap-2">
              <Plus className="w-4 h-4 text-gold" />
              <span>Submit Event</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <CalendarFilters currentView={currentView} onViewChange={setCurrentView} />

      {/* Active View Container */}
      {currentView === "calendar" ? (
        <CalendarView events={filteredEvents} />
      ) : (
        /* List View (Grouped by Month) */
        <div className="flex flex-col gap-16">
          {Object.keys(groupedEvents).length > 0 ? (
            Object.entries(groupedEvents).map(([month, monthEvents]) => (
              <section key={month} className="flex flex-col gap-8">
                {/* Month Group Header */}
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline uppercase text-ink tracking-tight">
                    {month}
                  </h2>
                  <span className="text-xs font-headline tracking-widest uppercase text-ink/40 bg-ink/5 px-2.5 py-1">
                    {monthEvents.length} {monthEvents.length === 1 ? "Event" : "Events"}
                  </span>
                  <div className="flex-grow h-px bg-ink/10" />
                </div>

                {/* Event Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {monthEvents.map((event) => {
                    const formattedDate = format(parseISO(event.startsAt), "EEE, MMM d, yyyy");
                    return (
                      <EventCard
                        key={event.slug}
                        slug={event.slug}
                        title={event.title}
                        type={event.type}
                        dateDisplay={formattedDate}
                        locationDisplay={event.venueName}
                        imageSrc={event.coverImagePath}
                        acceptsVendors={event.acceptsVendors}
                      />
                    );
                  })}
                </div>
              </section>
            ))
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-ink/20 p-8">
              <div className="w-14 h-14 bg-ink/5 border border-ink/10 flex items-center justify-center text-ink/40 mb-4">
                <CalendarX className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-headline uppercase text-ink">
                No Events Match Your Filters
              </h3>
              <p className="text-sm text-ink/60 font-body max-w-md mt-2 mb-6">
                Try deselecting some categories or toggling on past events to see previous tournament schedules.
              </p>
              <Button
                variant="primary"
                size="default"
                onClick={() => {
                  window.location.href = "/events";
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function EventsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="pt-28 sm:pt-36 pb-24 max-w-stadium mx-auto px-4 sm:px-6 lg:px-12 min-h-screen">
          <div className="animate-pulse flex flex-col gap-8">
            <div className="h-16 bg-ink/10 w-2/3" />
            <div className="h-8 bg-ink/5 w-1/3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[4/5] bg-ink/10" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <EventsContent />
    </React.Suspense>
  );
}
