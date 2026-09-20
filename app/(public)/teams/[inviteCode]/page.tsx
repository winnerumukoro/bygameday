import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeamByInviteCode, getDivisionById } from "@/lib/sports/data";
import { RosterManager } from "@/components/sports/roster-manager";
import { ArrowLeft, Users, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CaptainTeamPageProps {
  params: Promise<{ inviteCode: string }>;
}

export async function generateMetadata({
  params,
}: CaptainTeamPageProps): Promise<Metadata> {
  const { inviteCode } = await params;
  const team = getTeamByInviteCode(inviteCode);

  return {
    title: team ? `${team.name} — Captain Dashboard` : "Team Not Found — GAMEDAY",
    description: "Manage your team roster, invites, and tournament eligibility on GAMEDAY.",
  };
}

export default async function CaptainTeamPage({
  params,
}: CaptainTeamPageProps) {
  const { inviteCode } = await params;
  const team = getTeamByInviteCode(inviteCode);

  if (!team) {
    return (
      <div className="pt-32 pb-24 max-w-xl mx-auto px-4 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-headline uppercase text-ink mb-2">
          Team Not Found
        </h1>
        <p className="text-sm font-body text-ink/70 mb-6">
          No active tournament team was found with invite code &ldquo;{inviteCode}&rdquo;. Please verify the code or register a new team.
        </p>
        <Button asChild variant="primary">
          <Link href="/sports">Back to Sports Hub</Link>
        </Button>
      </div>
    );
  }

  const division = getDivisionById(team.divisionId);
  if (!division) {
    notFound();
  }

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumbs */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/sports"
            className="inline-flex items-center gap-2 text-xs font-headline uppercase tracking-wider text-ink/70 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sports & Tournaments
          </Link>

          <Button asChild variant="secondary" size="sm" className="gap-2 text-xs">
            <Link href={`/sports/brackets/${division.id}`}>
              <GitBranch className="w-3.5 h-3.5 text-gold" />
              View Division Bracket
            </Link>
          </Button>
        </div>

        {/* Team Banner Header */}
        <div className="mb-8 border-b border-ink/15 pb-6">
          <div className="inline-flex items-center gap-2 bg-ink/5 px-3 py-1 border border-ink/10 mb-3 text-ink/70">
            <Users className="w-3.5 h-3.5 text-gold" />
            <span className="text-[11px] font-headline uppercase tracking-widest font-semibold">
              Captain Team Operations
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-headline uppercase tracking-tight text-ink">
                {team.name}
              </h1>
              <p className="text-sm text-ink/60 font-body mt-1">
                {division.sportName} • {division.name}
              </p>
            </div>

            <div className="text-xs font-body text-ink/70 sm:text-right">
              <span className="block">Captain: <strong>{team.captainName}</strong></span>
              <span className="text-ink/50 text-[11px]">{team.captainEmail}</span>
            </div>
          </div>
        </div>

        {/* Interactive Roster Manager */}
        <RosterManager team={team} division={division} />
      </div>
    </div>
  );
}
