"use client";

import { useState } from "react";
import Link from "next/link";
import type { Bracket, Match } from "@/lib/sports/data";
import { LiveScoreModal } from "./live-score-modal";
import { Button } from "@/components/ui/button";
import {
  Radio,
  Trophy,
  Flame,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CourtsideLiveTickerProps {
  initialBracket: Bracket;
}

export function CourtsideLiveTicker({ initialBracket }: CourtsideLiveTickerProps) {
  const [bracket, setBracket] = useState<Bracket>(initialBracket);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isScorerOpen, setIsScorerOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "live" | "scheduled">("all");

  const liveMatches = bracket.matches.filter((m) => m.status === "in_progress");
  const scheduledMatches = bracket.matches.filter((m) => m.status === "scheduled");

  const displayedMatches = bracket.matches.filter((m) => {
    if (filter === "live") return m.status === "in_progress";
    if (filter === "scheduled") return m.status === "scheduled";
    return m.status === "in_progress" || m.status === "scheduled";
  });

  const handleOpenScorer = (match: Match) => {
    setSelectedMatch(match);
    setIsScorerOpen(true);
  };

  const handleScoreSaved = (
    matchId: string,
    score1: number,
    score2: number,
    status: "in_progress" | "completed"
  ) => {
    setBracket((prev) => ({
      ...prev,
      matches: prev.matches.map((m) => {
        if (m.id !== matchId) return m;
        return {
          ...m,
          status,
          participant1: { ...m.participant1, score: score1 },
          participant2: m.participant2 ? { ...m.participant2, score: score2 } : undefined,
          winnerId:
            status === "completed"
              ? score1 > score2
                ? m.participant1.id
                : m.participant2?.id
              : m.winnerId,
        };
      }),
    }));
  };

  return (
    <div className="border-2 border-ink/15 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-ink/10">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 bg-ink text-gold">
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-headline text-base sm:text-lg uppercase tracking-wider text-ink">
                Courtside Live Match Center
              </h3>
              <span className="px-2 py-0.5 bg-red-100 border border-red-300 text-red-800 text-[10px] font-headline uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                {liveMatches.length} Underway
              </span>
            </div>
            <p className="text-xs text-ink/60 font-body">
              Real-time point scoring & bracket advancement for Rucker Park
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Quick Filter Tabs */}
          <div className="flex items-center bg-ink/5 p-0.5 border border-ink/10">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "px-2.5 py-1 text-[10px] font-headline uppercase tracking-wider transition-colors",
                filter === "all" ? "bg-ink text-ivory" : "text-ink/60 hover:text-ink"
              )}
            >
              Active ({liveMatches.length + scheduledMatches.length})
            </button>
            <button
              onClick={() => setFilter("live")}
              className={cn(
                "px-2.5 py-1 text-[10px] font-headline uppercase tracking-wider transition-colors",
                filter === "live" ? "bg-red-600 text-white" : "text-ink/60 hover:text-ink"
              )}
            >
              Live ({liveMatches.length})
            </button>
            <button
              onClick={() => setFilter("scheduled")}
              className={cn(
                "px-2.5 py-1 text-[10px] font-headline uppercase tracking-wider transition-colors",
                filter === "scheduled" ? "bg-ink text-ivory" : "text-ink/60 hover:text-ink"
              )}
            >
              Upcoming ({scheduledMatches.length})
            </button>
          </div>

          <Button asChild size="sm" variant="outline" className="text-xs h-7 gap-1 border-ink/20">
            <Link href="/admin/tournaments">
              <span>All Brackets</span>
              <ArrowRight className="w-3 h-3 text-gold" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Match Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedMatches.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-ink/[0.02] border border-dashed border-ink/20">
            <Trophy className="w-8 h-8 text-ink/30 mx-auto mb-2" />
            <p className="font-headline uppercase text-sm text-ink/60">No matches matching filter</p>
            <span className="text-xs text-ink/40">Select &quot;Active&quot; to inspect all scheduled court times</span>
          </div>
        ) : (
          displayedMatches.map((match) => {
            const isLive = match.status === "in_progress";
            const score1 = match.participant1.score ?? 0;
            const score2 = match.participant2?.score ?? 0;
            const diff = Math.abs(score1 - score2);

            return (
              <div
                key={match.id}
                className={cn(
                  "border-2 transition-all p-4 flex flex-col justify-between relative",
                  isLive
                    ? "border-ink bg-white shadow-sm hover:border-gold"
                    : "border-ink/15 bg-ink/[0.015] hover:border-ink/30"
                )}
              >
                {/* Status Bar */}
                <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-ink/10">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[10px] font-headline uppercase tracking-widest text-ink/70 truncate">
                      {match.courtName}
                    </span>
                  </div>

                  {isLive ? (
                    <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-headline uppercase tracking-wider inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Live • Q4
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-ink/10 text-ink/70 text-[10px] font-headline uppercase tracking-wider">
                      {match.scheduledTime}
                    </span>
                  )}
                </div>

                {/* Teams & Scoreboard Display */}
                <div className="space-y-2 mb-4">
                  {/* Team 1 */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-ink/5 border border-ink/10 text-ink/60 font-mono">
                        #{match.participant1.seed}
                      </span>
                      <span className={cn(
                        "font-headline uppercase text-sm truncate tracking-tight",
                        isLive && score1 >= score2 ? "text-ink font-bold" : "text-ink/80"
                      )}>
                        {match.participant1.name}
                      </span>
                    </div>

                    <div className="font-headline text-2xl font-bold tracking-tight text-ink font-mono min-w-[32px] text-right">
                      {isLive ? score1 : "—"}
                    </div>
                  </div>

                  {/* Team 2 */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {match.participant2 ? (
                        <>
                          <span className="w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-ink/5 border border-ink/10 text-ink/60 font-mono">
                            #{match.participant2.seed}
                          </span>
                          <span className={cn(
                            "font-headline uppercase text-sm truncate tracking-tight",
                            isLive && score2 >= score1 ? "text-ink font-bold" : "text-ink/80"
                          )}>
                            {match.participant2.name}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs text-ink/40 italic">TBD (Awaiting Round 1)</span>
                      )}
                    </div>

                    <div className="font-headline text-2xl font-bold tracking-tight text-ink font-mono min-w-[32px] text-right">
                      {isLive && match.participant2 ? score2 : "—"}
                    </div>
                  </div>
                </div>

                {/* Match Footer Info & Action */}
                <div className="pt-3 border-t border-ink/10 flex items-center justify-between gap-2">
                  <div className="text-[11px] font-body text-ink/60">
                    {isLive ? (
                      diff === 0 ? (
                        <span className="text-amber-700 font-semibold inline-flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-600" />
                          Deadlocked
                        </span>
                      ) : (
                        <span className="text-ink/70">
                          Spread: <strong className="text-ink">+{diff} pts</strong>
                        </span>
                      )
                    ) : (
                      <span>{match.roundName}</span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant={isLive ? "primary" : "secondary"}
                    onClick={() => handleOpenScorer(match)}
                    className={cn(
                      "text-xs h-7.5 px-3 font-headline uppercase tracking-wider",
                      isLive ? "bg-ink text-ivory hover:bg-gold hover:text-ink" : "border-ink/20"
                    )}
                  >
                    <SlidersHorizontal className="w-3 h-3 mr-1 text-gold" />
                    {isLive ? "Score Now" : "Pre-game"}
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Live Scorer Modal Dialog */}
      <LiveScoreModal
        match={selectedMatch}
        isOpen={isScorerOpen}
        onClose={() => setIsScorerOpen(false)}
        onScoreSaved={handleScoreSaved}
      />
    </div>
  );
}
