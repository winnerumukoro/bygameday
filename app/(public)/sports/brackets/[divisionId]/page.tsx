import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DIVISIONS,
  getDivisionById,
  getBracketByDivisionId,
} from "@/lib/sports/data";
import { BracketView } from "@/components/sports/bracket-view";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  GitBranch,
  Radio,
  Clock,
} from "lucide-react";

interface BracketPageProps {
  params: Promise<{ divisionId: string }>;
}

export async function generateStaticParams() {
  return DIVISIONS.map((d) => ({
    divisionId: d.id,
  }));
}

export async function generateMetadata({
  params,
}: BracketPageProps): Promise<Metadata> {
  const { divisionId } = await params;
  const division = getDivisionById(divisionId);

  return {
    title: division ? `${division.name} Bracket — GAMEDAY` : "Tournament Bracket — GAMEDAY",
    description: "Live tournament bracket, scores, court schedules, and match progression on GAMEDAY.",
  };
}

export default async function BracketPage({ params }: BracketPageProps) {
  const { divisionId } = await params;
  const division = getDivisionById(divisionId);

  if (!division) {
    notFound();
  }

  const bracket = getBracketByDivisionId(divisionId);
  if (!bracket) {
    notFound();
  }

  const is1v1 = division.format === "1v1";
  const registerHref = is1v1
    ? `/sports/register/individual?division=${division.id}`
    : `/sports/register/team?division=${division.id}`;

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/sports"
            className="inline-flex items-center gap-2 text-xs font-headline uppercase tracking-wider text-ink/70 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Divisions
          </Link>

          <Button asChild variant="primary" size="sm" className="text-xs">
            <Link href={registerHref}>
              {is1v1 ? "Register for 1v1" : "Register a Team"}
            </Link>
          </Button>
        </div>

        {/* Tournament Meta Header */}
        <div className="border-b border-ink/15 pb-6 mb-8">
          <div className="inline-flex items-center gap-2 bg-ink text-ivory px-3 py-1 mb-3 text-xs font-headline uppercase tracking-wider">
            <GitBranch className="w-3.5 h-3.5 text-gold" />
            <span>Tournament Draw</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-headline uppercase tracking-tight text-ink">
                {division.name}
              </h1>
              <div className="flex items-center gap-3 text-xs font-body text-ink/70 mt-1">
                <span>{division.sportName}</span>
                <span>•</span>
                <span>{division.courtType}</span>
                {division.eventTitle && (
                  <>
                    <span>•</span>
                    <span className="truncate">{division.eventTitle}</span>
                  </>
                )}
              </div>
            </div>

            <div className="text-xs font-body text-ink/60 sm:text-right">
              <span className="block">Draw Size: <strong>{division.capacity} Competitors</strong></span>
              <span>Rounds: <strong>{bracket.roundsCount} Single-Elimination Rounds</strong></span>
            </div>
          </div>
        </div>

        {/* Interactive Bracket Visualizer */}
        <BracketView bracket={bracket} />

        {/* Bracket Legend & Rule Strip */}
        <div className="mt-12 p-4 bg-white border-2 border-ink/10 flex flex-wrap items-center justify-between gap-4 text-xs font-body text-ink/70">
          <div className="flex items-center gap-6">
            <span className="font-headline uppercase tracking-wider text-ink text-[11px]">
              Status Legend:
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-red-600 font-bold uppercase text-[10px]">
                <Radio className="w-2.5 h-2.5" /> Live Now
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ink/60 uppercase text-[10px]">Final (Completed)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-ink/60 uppercase text-[10px]">
                <Clock className="w-2.5 h-2.5" /> Scheduled
              </span>
            </div>
          </div>

          <p className="text-[11px] text-ink/50">
            Top seeds receive automatic round 1 byes in uneven draws. Scores update in real time.
          </p>
        </div>
      </div>
    </div>
  );
}
