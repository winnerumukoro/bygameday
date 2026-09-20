import { cn } from "@/lib/utils";
import type { Match } from "@/lib/sports/data";
import { Check, Clock, Radio } from "lucide-react";

interface MatchCardProps {
  match: Match;
  className?: string;
}

export function MatchCard({ match, className }: MatchCardProps) {
  const p1 = match.participant1;
  const p2 = match.participant2;

  const isLive = match.status === "in_progress";
  const isCompleted = match.status === "completed";
  const isBye = match.status === "bye";

  const p1Winner = isCompleted && match.winnerId === p1.id;
  const p2Winner = isCompleted && p2 && match.winnerId === p2.id;

  return (
    <div
      className={cn(
        "border-2 bg-white transition-all text-xs font-body shadow-none",
        isLive ? "border-gold ring-1 ring-gold" : "border-ink/15 hover:border-ink/40",
        className
      )}
    >
      {/* Match Meta Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-ink/[0.03] border-b border-ink/10 text-[10px] uppercase font-headline tracking-wider text-ink/60">
        <span className="truncate">
          {match.courtName || `Match ${match.matchNumber}`}
        </span>

        <div className="flex items-center gap-1.5">
          {isLive && (
            <span className="inline-flex items-center gap-1 text-red-600 font-bold animate-pulse">
              <Radio className="w-3 h-3" />
              Live
            </span>
          )}
          {isCompleted && (
            <span className="text-ink/50">Final</span>
          )}
          {!isLive && !isCompleted && !isBye && (
            <span className="inline-flex items-center gap-1 text-ink/50">
              <Clock className="w-2.5 h-2.5" />
              {match.scheduledTime || "TBD"}
            </span>
          )}
          {isBye && <span className="text-ink/40">Automatic Bye</span>}
        </div>
      </div>

      {/* Competitors Slot */}
      <div className="divide-y divide-ink/10">
        {/* Participant 1 */}
        <div
          className={cn(
            "flex items-center justify-between px-3 py-2 transition-colors",
            p1Winner && "bg-gold/10 font-semibold text-ink",
            !p1Winner && isCompleted && "text-ink/40"
          )}
        >
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="w-4 text-[10px] text-ink/40 font-mono text-center flex-shrink-0">
              {p1.seed > 0 ? p1.seed : "-"}
            </span>
            <span className="font-headline uppercase tracking-wide truncate text-xs">
              {p1.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {p1.score !== undefined && (
              <span className={cn("font-mono text-sm font-bold", p1Winner ? "text-ink" : "text-ink/60")}>
                {p1.score}
              </span>
            )}
            {p1Winner && <Check className="w-3.5 h-3.5 text-gold stroke-[3]" />}
          </div>
        </div>

        {/* Participant 2 */}
        <div
          className={cn(
            "flex items-center justify-between px-3 py-2 transition-colors",
            p2Winner && "bg-gold/10 font-semibold text-ink",
            !p2Winner && isCompleted && "text-ink/40"
          )}
        >
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="w-4 text-[10px] text-ink/40 font-mono text-center flex-shrink-0">
              {p2 && p2.seed > 0 ? p2.seed : "-"}
            </span>
            <span className="font-headline uppercase tracking-wide truncate text-xs">
              {p2 ? p2.name : "TBD"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {p2?.score !== undefined && (
              <span className={cn("font-mono text-sm font-bold", p2Winner ? "text-ink" : "text-ink/60")}>
                {p2.score}
              </span>
            )}
            {p2Winner && <Check className="w-3.5 h-3.5 text-gold stroke-[3]" />}
          </div>
        </div>
      </div>
    </div>
  );
}
