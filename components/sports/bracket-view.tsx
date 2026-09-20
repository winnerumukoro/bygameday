"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Bracket } from "@/lib/sports/data";
import { MatchCard } from "./match-card";
import { Radio, Trophy } from "lucide-react";

interface BracketViewProps {
  bracket: Bracket;
}

export function BracketView({ bracket }: BracketViewProps) {
  // Group matches by round number
  const roundsMap = new Map<number, typeof bracket.matches>();
  bracket.matches.forEach((m) => {
    const list = roundsMap.get(m.round) ?? [];
    list.push(m);
    roundsMap.set(m.round, list);
  });

  const roundNumbers = Array.from(roundsMap.keys()).sort((a, b) => a - b);
  const [activeMobileRound, setActiveMobileRound] = useState<number>(roundNumbers[0] || 1);

  const liveMatches = bracket.matches.filter((m) => m.status === "in_progress");

  return (
    <div className="w-full">
      {/* Bracket Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 bg-ink text-ivory mb-6 sm:mb-8 border-2 border-ink">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold text-ink flex items-center justify-center font-headline">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-headline uppercase tracking-widest text-gold">
                Single Elimination Draw
              </span>
              {liveMatches.length > 0 && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-red-600/90 text-white px-2 py-0.5 font-bold uppercase animate-pulse">
                  <Radio className="w-2.5 h-2.5" />
                  {liveMatches.length} Live
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-headline uppercase tracking-tight text-ivory">
              {bracket.divisionName} Bracket
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-headline uppercase tracking-wider text-ivory/70">
          <span>{roundNumbers.length} Rounds</span>
          <span>•</span>
          <span>{bracket.matches.length} Total Matches</span>
        </div>
      </div>

      {/* Mobile Round Switcher (<md) */}
      <div className="md:hidden mb-6 flex overflow-x-auto gap-2 pb-2">
        {roundNumbers.map((rNum) => {
          const roundMatches = roundsMap.get(rNum) || [];
          const roundName = roundMatches[0]?.roundName || `Round ${rNum}`;
          const isSelected = activeMobileRound === rNum;

          return (
            <button
              key={rNum}
              onClick={() => setActiveMobileRound(rNum)}
              className={cn(
                "px-4 py-2 border-2 text-xs font-headline uppercase tracking-wider whitespace-nowrap transition-colors",
                isSelected
                  ? "bg-gold border-gold text-ink font-bold"
                  : "bg-white border-ink/15 text-ink/70 hover:border-ink/40"
              )}
            >
              {roundName}
            </button>
          );
        })}
      </div>

      {/* Mobile Bracket View (<md) */}
      <div className="md:hidden space-y-4">
        {(roundsMap.get(activeMobileRound) || []).map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      {/* Desktop Horizontal Bracket Tree (>=md) */}
      <div className="hidden md:block overflow-x-auto pb-8">
        <div
          className="grid gap-8 items-center min-w-[760px]"
          style={{
            gridTemplateColumns: `repeat(${roundNumbers.length}, minmax(240px, 1fr))`,
          }}
        >
          {roundNumbers.map((rNum, roundIndex) => {
            const roundMatches = roundsMap.get(rNum) || [];
            const roundTitle = roundMatches[0]?.roundName || `Round ${rNum}`;

            return (
              <div key={rNum} className="flex flex-col h-full">
                {/* Round Title Header */}
                <div className="text-center py-2 mb-6 border-b-2 border-ink/20">
                  <span className="text-xs font-headline uppercase tracking-widest text-gold block">
                    Round {rNum} of {roundNumbers.length}
                  </span>
                  <h3 className="font-headline text-lg uppercase tracking-tight text-ink">
                    {roundTitle}
                  </h3>
                </div>

                {/* Match Nodes column */}
                <div className="flex flex-col justify-around flex-grow gap-6">
                  {roundMatches.map((match) => (
                    <div key={match.id} className="relative group">
                      <MatchCard match={match} />

                      {/* Connecting Line to next round if not the championship final */}
                      {roundIndex < roundNumbers.length - 1 && (
                        <div
                          className="absolute -right-8 top-1/2 w-8 h-[2px] bg-ink/15 pointer-events-none group-hover:bg-gold transition-colors"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
