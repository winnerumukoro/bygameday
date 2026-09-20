"use client";

import { useState } from "react";
import type { Sport, Division } from "@/lib/sports/data";
import { SportsFilter } from "./sports-filter";
import { DivisionCard } from "./division-card";
import { Users, User, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SportsHubBrowserProps {
  sports: Sport[];
  divisions: Division[];
  initialSportSlug?: string;
}

export function SportsHubBrowser({
  sports,
  divisions,
  initialSportSlug = "all",
}: SportsHubBrowserProps) {
  const [activeSportSlug, setActiveSportSlug] = useState<string>(initialSportSlug);
  const [activeFormat, setActiveFormat] = useState<"all" | "1v1" | "intramural">("all");

  const filteredDivisions = divisions.filter((d) => {
    const matchesSport = activeSportSlug === "all" || d.sportSlug === activeSportSlug;
    const matchesFormat = activeFormat === "all" || d.format === activeFormat;
    return matchesSport && matchesFormat;
  });

  return (
    <div className="space-y-8">
      {/* Top Filter Bar: Sports Tabs + Format Pills */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ink/15 pb-4">
        {/* Sports filter tabs */}
        <SportsFilter
          sports={sports}
          activeSportSlug={activeSportSlug}
          onSelectSport={setActiveSportSlug}
        />

        {/* Format Selector (All, 1v1, Intramural) */}
        <div className="flex items-center gap-1.5 self-start md:self-auto bg-ink/5 p-1 border border-ink/10">
          <button
            onClick={() => setActiveFormat("all")}
            className={cn(
              "px-3 py-1.5 text-xs font-headline uppercase tracking-wider transition-colors",
              activeFormat === "all"
                ? "bg-ink text-ivory"
                : "text-ink/60 hover:text-ink"
            )}
          >
            All Formats
          </button>
          <button
            onClick={() => setActiveFormat("1v1")}
            className={cn(
              "inline-flex items-center gap-1 px-3 py-1.5 text-xs font-headline uppercase tracking-wider transition-colors",
              activeFormat === "1v1"
                ? "bg-gold text-ink font-bold"
                : "text-ink/60 hover:text-ink"
            )}
          >
            <User className="w-3 h-3" />
            1v1 Showdowns
          </button>
          <button
            onClick={() => setActiveFormat("intramural")}
            className={cn(
              "inline-flex items-center gap-1 px-3 py-1.5 text-xs font-headline uppercase tracking-wider transition-colors",
              activeFormat === "intramural"
                ? "bg-ink text-ivory"
                : "text-ink/60 hover:text-ink"
            )}
          >
            <Users className="w-3 h-3" />
            Intramural Teams
          </button>
        </div>
      </div>

      {/* Divisions Grid */}
      {filteredDivisions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDivisions.map((division) => (
            <DivisionCard key={division.id} division={division} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-ink/15 bg-white p-8">
          <AlertCircle className="w-8 h-8 text-ink/30 mx-auto mb-3" />
          <h4 className="font-headline text-lg uppercase text-ink mb-1">
            No Active Divisions Match Your Filter
          </h4>
          <p className="text-xs text-ink/60 font-body max-w-sm mx-auto mb-4">
            Try switching sports or clearing your format filter to explore other competitive divisions.
          </p>
          <button
            onClick={() => {
              setActiveSportSlug("all");
              setActiveFormat("all");
            }}
            className="text-xs font-headline uppercase tracking-wider text-gold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
