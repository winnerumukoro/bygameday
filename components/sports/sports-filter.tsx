"use client";

import { cn } from "@/lib/utils";
import type { Sport } from "@/lib/sports/data";
import { Trophy, Activity } from "lucide-react";

interface SportsFilterProps {
  sports: Sport[];
  activeSportSlug: string;
  onSelectSport: (slug: string) => void;
  totalDivisionsCount?: number;
}

export function SportsFilter({
  sports,
  activeSportSlug,
  onSelectSport,
}: SportsFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
      {/* All Sports Pill */}
      <button
        onClick={() => onSelectSport("all")}
        className={cn(
          "inline-flex items-center gap-2 px-5 py-2.5 font-headline uppercase text-xs tracking-wider border-2 transition-all whitespace-nowrap",
          activeSportSlug === "all"
            ? "bg-ink text-ivory border-ink shadow-none"
            : "bg-white text-ink/70 border-ink/15 hover:border-ink/40 hover:text-ink"
        )}
      >
        <Trophy className={cn("w-3.5 h-3.5", activeSportSlug === "all" ? "text-gold" : "text-ink/40")} />
        <span>All Sports</span>
      </button>

      {/* Individual Sports Pills */}
      {sports.map((sport) => {
        const isActive = activeSportSlug === sport.slug;

        return (
          <button
            key={sport.id}
            onClick={() => onSelectSport(sport.slug)}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 font-headline uppercase text-xs tracking-wider border-2 transition-all whitespace-nowrap",
              isActive
                ? "bg-ink text-ivory border-ink shadow-none"
                : "bg-white text-ink/70 border-ink/15 hover:border-ink/40 hover:text-ink"
            )}
          >
            <Activity className={cn("w-3.5 h-3.5", isActive ? "text-gold" : "text-ink/40")} />
            <span>{sport.name}</span>
          </button>
        );
      })}
    </div>
  );
}
