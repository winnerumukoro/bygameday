import type { Metadata } from "next";
import { SEED_BRACKET } from "@/lib/sports/data";
import { TournamentControlCenter } from "@/components/admin/tournament-control-center";

export const metadata: Metadata = {
  title: "Tournament Control — GAMEDAY Console",
};

export default function AdminTournamentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-ink/15 pb-6">
        <div>
          <span className="text-xs font-headline uppercase tracking-widest text-gold block mb-1">
            Real-Time Scoring & Bracket Operations
          </span>
          <h1 className="text-3xl sm:text-4xl font-headline uppercase tracking-tight text-ink">
            TOURNAMENT CONTROL CENTER
          </h1>
        </div>

        <div className="text-xs font-body text-ink/70 sm:text-right">
          <span className="block font-semibold">Active Tournament:</span>
          <span>Interhouse 5v5 Basketball (Men&apos;s Open)</span>
        </div>
      </div>

      <TournamentControlCenter initialBracket={SEED_BRACKET} />
    </div>
  );
}
