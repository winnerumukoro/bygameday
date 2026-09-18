"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar as CalendarIcon, List, Download, Check, Copy } from "lucide-react";
import { EVENT_TYPES } from "@/lib/events/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalendarFiltersProps {
  currentView: "list" | "calendar";
  onViewChange: (view: "list" | "calendar") => void;
}

export function CalendarFilters({ currentView, onViewChange }: CalendarFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [copied, setCopied] = React.useState(false);
  const [subscribeModalOpen, setSubscribeModalOpen] = React.useState(false);

  // Active filters from URL
  const activeTypes = React.useMemo(() => {
    const t = searchParams.get("type");
    return t ? t.split(",").map((s) => s.trim().toLowerCase()) : [];
  }, [searchParams]);

  const activeSource = searchParams.get("source") || "all";
  const includePast = searchParams.get("past") === "true";

  const updateFilters = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.replace(`/events?${params.toString()}`, { scroll: false });
  };

  const toggleType = (slug: string) => {
    let next: string[];
    if (activeTypes.includes(slug)) {
      next = activeTypes.filter((t) => t !== slug);
    } else {
      next = [...activeTypes, slug];
    }
    updateFilters({ type: next.length > 0 ? next.join(",") : null });
  };

  const handleSourceChange = (src: string) => {
    updateFilters({ source: src === "all" ? null : src });
  };

  const togglePast = () => {
    updateFilters({ past: includePast ? null : "true" });
  };

  const calendarFeedUrl = typeof window !== "undefined"
    ? `${window.location.origin}/calendar.ics${activeTypes.length > 0 ? `?type=${activeTypes.join(",")}` : ""}`
    : "/calendar.ics";

  const copyFeedUrl = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(calendarFeedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full border-b border-ink/10 pb-8 mb-8">
      {/* Top Bar: View Switcher & Subscribe CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* View Toggle */}
        <div className="inline-flex border border-ink/20 bg-ivory p-1">
          <button
            type="button"
            onClick={() => onViewChange("list")}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 text-xs font-headline uppercase tracking-wider transition-colors min-h-[40px]",
              currentView === "list"
                ? "bg-ink text-ivory font-bold"
                : "text-ink/70 hover:text-ink hover:bg-ink/5"
            )}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
            <span>List View</span>
          </button>
          <button
            type="button"
            onClick={() => onViewChange("calendar")}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 text-xs font-headline uppercase tracking-wider transition-colors min-h-[40px]",
              currentView === "calendar"
                ? "bg-ink text-ivory font-bold"
                : "text-ink/70 hover:text-ink hover:bg-ink/5"
            )}
            aria-label="Calendar view"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Calendar View</span>
          </button>
        </div>

        {/* Subscribe Button */}
        <div className="relative">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setSubscribeModalOpen(!subscribeModalOpen)}
            className="inline-flex items-center gap-2 text-xs min-h-[44px]"
          >
            <Download className="w-3.5 h-3.5 text-gold" />
            <span>Subscribe to Calendar (.ics)</span>
          </Button>

          {/* Subscribe Popover / Dropdown */}
          {subscribeModalOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-ink text-ivory border border-ivory/20 p-5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-ivory/15">
                <span className="text-xs font-headline uppercase tracking-widest text-gold">
                  Sync GAMEDAY Calendar
                </span>
                <button
                  type="button"
                  onClick={() => setSubscribeModalOpen(false)}
                  className="text-ivory/60 hover:text-ivory text-sm"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-ivory/80 font-body my-3 leading-relaxed">
                Add this live calendar feed to Apple Calendar, Google Calendar, or Outlook to get automatic schedule updates.
              </p>

              <div className="flex items-center gap-2 bg-ivory/10 border border-ivory/20 px-3 py-2 text-xs text-ivory/80 font-mono truncate mb-4">
                <span className="truncate">{calendarFeedUrl}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={copyFeedUrl}
                  className="flex-1 min-h-[40px] text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5" />
                      Copied Feed URL
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy URL
                    </>
                  )}
                </Button>

                <a
                  href={calendarFeedUrl}
                  download="gameday-calendar.ics"
                  className="inline-flex items-center justify-center font-headline uppercase text-xs tracking-wider border border-ivory/40 text-ivory px-4 py-2 hover:bg-ivory hover:text-ink transition-colors min-h-[40px] flex-1 text-center"
                >
                  Download .ics
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Row: Type Chips + Source + Past Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        {/* Event Type Filter Chips */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by event type">
          <span className="text-xs font-headline uppercase tracking-widest text-ink/50 mr-1">
            Type:
          </span>
          {EVENT_TYPES.map((type) => {
            const active = activeTypes.includes(type.slug);
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => toggleType(type.slug)}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-headline uppercase tracking-wider transition-colors min-h-[38px] border",
                  active
                    ? "bg-gold text-ink border-gold font-bold"
                    : "bg-ivory text-ink/80 border-ink/20 hover:border-ink"
                )}
                aria-pressed={active}
              >
                {type.name}
              </button>
            );
          })}
          {activeTypes.length > 0 && (
            <button
              type="button"
              onClick={() => updateFilters({ type: null })}
              className="text-xs text-ink/60 hover:text-gold uppercase font-headline tracking-wider underline ml-2"
            >
              Reset
            </button>
          )}
        </div>

        {/* Source & Past Toggles */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-headline uppercase">
          {/* Source Filter */}
          <div className="flex items-center gap-1 border border-ink/20 p-1 bg-ivory">
            {[
              { id: "all", label: "All Sources" },
              { id: "gameday", label: "GAMEDAY" },
              { id: "community", label: "Community" },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSourceChange(s.id)}
                className={cn(
                  "px-2.5 py-1 text-[11px] font-headline tracking-wider transition-colors",
                  activeSource === s.id
                    ? "bg-ink text-ivory font-bold"
                    : "text-ink/70 hover:text-ink"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Past Events Toggle */}
          <label className="inline-flex items-center gap-2 cursor-pointer select-none text-ink/80 hover:text-ink">
            <input
              type="checkbox"
              checked={includePast}
              onChange={togglePast}
              className="w-4 h-4 rounded-none border-ink/40 text-gold focus:ring-gold"
            />
            <span className="tracking-wider">Include Past Events</span>
          </label>
        </div>
      </div>
    </div>
  );
}
