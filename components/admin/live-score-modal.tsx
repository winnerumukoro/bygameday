"use client";

import { useState } from "react";
import type { Match } from "@/lib/sports/data";
import { updateMatchScore } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  X,
  Minus,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface LiveScoreModalProps {
  match: Match | null;
  isOpen: boolean;
  onClose: () => void;
  onScoreSaved?: (matchId: string, s1: number, s2: number, status: "in_progress" | "completed") => void;
}

export function LiveScoreModal({
  match,
  isOpen,
  onClose,
  onScoreSaved,
}: LiveScoreModalProps) {
  const [score1, setScore1] = useState<number>(match?.participant1.score ?? 0);
  const [score2, setScore2] = useState<number>(match?.participant2?.score ?? 0);
  const [status, setStatus] = useState<"in_progress" | "completed">(
    match?.status === "completed" ? "completed" : "in_progress"
  );
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !match) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const winnerId =
        status === "completed"
          ? score1 > score2
            ? match.participant1.id
            : match.participant2?.id
          : undefined;

      const res = await updateMatchScore(
        match.bracketId,
        match.id,
        score1,
        score2,
        status,
        winnerId
      );

      if (res.success) {
        setSavedSuccess(true);
        onScoreSaved?.(match.id, score1, score2, status);
        setTimeout(() => {
          setSavedSuccess(false);
          onClose();
        }, 800);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white border-2 border-ink max-w-md w-full p-6 text-ink relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink/50 hover:text-ink transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-gold">
          <Trophy className="w-4 h-4" />
          <span className="text-xs font-headline uppercase tracking-widest text-ink">
            Courtside Live Scorer Console
          </span>
        </div>

        <h3 className="text-xl font-headline uppercase tracking-tight text-ink mb-1">
          {match.courtName || `Match ${match.matchNumber}`}
        </h3>
        <p className="text-xs text-ink/60 font-body mb-6">
          {match.roundName} • Point adjustments update live scoreboards immediately.
        </p>

        {savedSuccess ? (
          <div className="p-6 bg-green-50 border-2 border-green-500 text-center text-green-900 font-body">
            <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-headline uppercase text-base">Score Recorded</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Team 1 Control */}
            <div className="p-4 bg-ink/[0.02] border-2 border-ink/10 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-headline uppercase tracking-wider text-ink/50 block">
                  Seed #{match.participant1.seed}
                </span>
                <span className="font-headline text-base uppercase text-ink">
                  {match.participant1.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setScore1((prev) => prev + 1)}
                      className="w-7 h-7 bg-gold text-ink font-bold text-xs flex items-center justify-center hover:bg-gold-hover"
                    >
                      +1
                    </button>
                    <button
                      type="button"
                      onClick={() => setScore1((prev) => prev + 2)}
                      className="w-7 h-7 bg-ink text-ivory font-bold text-xs flex items-center justify-center hover:bg-ink/80"
                    >
                      +2
                    </button>
                    <button
                      type="button"
                      onClick={() => setScore1((prev) => prev + 3)}
                      className="w-7 h-7 bg-ink text-ivory font-bold text-xs flex items-center justify-center hover:bg-ink/80"
                    >
                      +3
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScore1((prev) => Math.max(0, prev - 1))}
                    className="w-full h-6 bg-ink/10 text-ink text-xs flex items-center justify-center hover:bg-ink/20"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                </div>

                <span className="font-mono text-3xl font-bold text-ink w-12 text-center">
                  {score1}
                </span>
              </div>
            </div>

            {/* Team 2 Control */}
            <div className="p-4 bg-ink/[0.02] border-2 border-ink/10 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-headline uppercase tracking-wider text-ink/50 block">
                  Seed #{match.participant2?.seed ?? "-"}
                </span>
                <span className="font-headline text-base uppercase text-ink">
                  {match.participant2?.name ?? "TBD"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setScore2((prev) => prev + 1)}
                      className="w-7 h-7 bg-gold text-ink font-bold text-xs flex items-center justify-center hover:bg-gold-hover"
                    >
                      +1
                    </button>
                    <button
                      type="button"
                      onClick={() => setScore2((prev) => prev + 2)}
                      className="w-7 h-7 bg-ink text-ivory font-bold text-xs flex items-center justify-center hover:bg-ink/80"
                    >
                      +2
                    </button>
                    <button
                      type="button"
                      onClick={() => setScore2((prev) => prev + 3)}
                      className="w-7 h-7 bg-ink text-ivory font-bold text-xs flex items-center justify-center hover:bg-ink/80"
                    >
                      +3
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScore2((prev) => Math.max(0, prev - 1))}
                    className="w-full h-6 bg-ink/10 text-ink text-xs flex items-center justify-center hover:bg-ink/20"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                </div>

                <span className="font-mono text-3xl font-bold text-ink w-12 text-center">
                  {score2}
                </span>
              </div>
            </div>

            {/* Match Status Toggle */}
            <div className="flex items-center justify-between p-3 border border-ink/15 bg-white text-xs font-body">
              <span className="text-ink/70">Match State:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStatus("in_progress")}
                  className={`px-3 py-1 font-headline uppercase text-xs ${
                    status === "in_progress"
                      ? "bg-red-600 text-white font-bold"
                      : "bg-ink/5 text-ink/60"
                  }`}
                >
                  Live (In Progress)
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("completed")}
                  className={`px-3 py-1 font-headline uppercase text-xs ${
                    status === "completed"
                      ? "bg-green-600 text-white font-bold"
                      : "bg-ink/5 text-ink/60"
                  }`}
                >
                  Final (Completed)
                </button>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex justify-end gap-2 pt-2 border-t border-ink/10">
              <Button variant="secondary" onClick={onClose} disabled={isSaving}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={isSaving}
                className="gap-2 font-headline uppercase"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Trophy className="w-4 h-4" />
                    Publish Live Score
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
