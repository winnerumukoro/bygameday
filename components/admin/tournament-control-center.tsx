"use client";

import { useState } from "react";
import type { Bracket, Match } from "@/lib/sports/data";
import { LiveScoreModal } from "./live-score-modal";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Radio,
  Clock,
  CheckCircle2,
  Edit3,
} from "lucide-react";

interface TournamentControlCenterProps {
  initialBracket: Bracket;
}

export function TournamentControlCenter({
  initialBracket,
}: TournamentControlCenterProps) {
  const [bracket, setBracket] = useState<Bracket>(initialBracket);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isScorerOpen, setIsScorerOpen] = useState(false);

  const liveMatches = bracket.matches.filter((m) => m.status === "in_progress");

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
    <div className="space-y-8">
      {/* Courtside Live Strip */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-600 animate-pulse" />
            <h3 className="font-headline text-sm uppercase tracking-wider text-ink">
              Live Courtside Action ({liveMatches.length} Underway)
            </h3>
          </div>
          <span className="text-xs text-ink/50 font-body">Rucker Park Active Courts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveMatches.map((match) => (
            <div
              key={match.id}
              className="border-2 border-gold bg-white p-5 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-gold text-ink text-[10px] font-headline uppercase tracking-wider px-2.5 py-0.5 font-bold">
                Live Now
              </div>

              <span className="text-[11px] font-headline uppercase tracking-wide text-ink/60 block mb-1">
                {match.courtName} • {match.roundName}
              </span>

              {/* Head to Head Scoreboard */}
              <div className="my-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-headline text-base uppercase text-ink">
                    {match.participant1.name}
                  </span>
                  <span className="font-mono text-2xl font-bold text-ink">
                    {match.participant1.score ?? 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-headline text-base uppercase text-ink">
                    {match.participant2?.name ?? "TBD"}
                  </span>
                  <span className="font-mono text-2xl font-bold text-ink">
                    {match.participant2?.score ?? 0}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => handleOpenScorer(match)}
                variant="primary"
                size="sm"
                className="w-full gap-2 text-xs font-headline uppercase"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Score This Court
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Complete Tournament Match Matrix */}
      <div className="border-2 border-ink/15 bg-white p-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-gold" />
            <h3 className="font-headline text-sm uppercase tracking-wider text-ink">
              All Tournament Matches ({bracket.matches.length})
            </h3>
          </div>
          <span className="text-xs text-ink/60 font-body">Single Elimination Progression</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-xs font-body">
            <thead className="bg-ink/[0.03] border-b border-ink/10 uppercase font-headline tracking-wider text-[11px] text-ink/60">
              <tr>
                <th className="py-3 px-4">Match #</th>
                <th className="py-3 px-4">Round</th>
                <th className="py-3 px-4">Court & Time</th>
                <th className="py-3 px-4">Competitors</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {bracket.matches.map((m) => {
                const isLive = m.status === "in_progress";
                const isFinal = m.status === "completed";

                return (
                  <tr key={m.id} className="hover:bg-ink/[0.01] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-ink">
                      #{m.matchNumber}
                    </td>

                    <td className="py-3 px-4 font-headline uppercase text-xs text-ink/80">
                      {m.roundName}
                    </td>

                    <td className="py-3 px-4 text-ink/60">
                      <span>{m.courtName || "Unassigned"}</span>
                      {m.scheduledTime && (
                        <span className="block text-[11px] text-ink/40 font-mono">
                          {m.scheduledTime}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-ink">
                        {m.participant1.name}{" "}
                        <span className="text-ink/40 text-[11px] font-normal">
                          (Seed #{m.participant1.seed})
                        </span>
                      </div>
                      <div className="text-ink/70">
                        {m.participant2?.name ?? "TBD"}{" "}
                        {m.participant2 && (
                          <span className="text-ink/40 text-[11px] font-normal">
                            (Seed #{m.participant2.seed})
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-sm">
                      {m.participant1.score !== undefined && m.participant2?.score !== undefined ? (
                        <span>
                          {m.participant1.score} – {m.participant2.score}
                        </span>
                      ) : (
                        <span className="text-ink/30">—</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      {isLive && (
                        <span className="inline-flex items-center gap-1 text-red-600 font-bold uppercase text-[10px]">
                          <Radio className="w-2.5 h-2.5 animate-pulse" /> Live Now
                        </span>
                      )}
                      {isFinal && (
                        <span className="inline-flex items-center gap-1 text-green-700 font-medium uppercase text-[10px]">
                          <CheckCircle2 className="w-3 h-3 text-green-600" /> Final
                        </span>
                      )}
                      {!isLive && !isFinal && (
                        <span className="inline-flex items-center gap-1 text-ink/50 uppercase text-[10px]">
                          <Clock className="w-2.5 h-2.5" /> Scheduled
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <Button
                        size="sm"
                        variant={isLive ? "primary" : "secondary"}
                        onClick={() => handleOpenScorer(m)}
                        className="text-[11px] h-8 border-ink/20"
                      >
                        {isLive ? "Update Score" : "Score Match"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Scorer Modal */}
      <LiveScoreModal
        match={selectedMatch}
        isOpen={isScorerOpen}
        onClose={() => {
          setIsScorerOpen(false);
          setSelectedMatch(null);
        }}
        onScoreSaved={handleScoreSaved}
      />
    </div>
  );
}
