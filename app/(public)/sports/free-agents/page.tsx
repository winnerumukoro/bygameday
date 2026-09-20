import type { Metadata } from "next";
import Link from "next/link";
import { getSports, getFreeAgents } from "@/lib/sports/data";
import { FreeAgentBrowser } from "@/components/sports/free-agent-browser";
import { ArrowLeft, UserPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Agent Pool — GAMEDAY",
  description:
    "Join the GAMEDAY free agent pool as a solo athlete or scout available players for your intramural tournament team.",
};

export default function FreeAgentsPage() {
  const sports = getSports();
  const freeAgents = getFreeAgents();

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-ivory min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/sports"
            className="inline-flex items-center gap-2 text-xs font-headline uppercase tracking-wider text-ink/70 hover:text-ink mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sports & Tournaments
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ink/15 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-ink text-ivory px-3 py-1 mb-3">
                <UserPlus className="w-3.5 h-3.5 text-gold" />
                <span className="text-[11px] font-headline uppercase tracking-widest font-bold">
                  Player Recruitment
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-headline uppercase tracking-tight text-ink">
                FREE AGENT POOL
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-ink/60 font-body max-w-sm sm:text-right">
              Don&apos;t have a team? Register below. Team captains browse this pool to fill open roster spots.
            </p>
          </div>
        </div>

        {/* Free Agent Explorer & Form */}
        <FreeAgentBrowser sports={sports} initialFreeAgents={freeAgents} />
      </div>
    </div>
  );
}
