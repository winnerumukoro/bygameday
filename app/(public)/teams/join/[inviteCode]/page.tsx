import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeamByInviteCode, getDivisionById } from "@/lib/sports/data";
import { JoinTeamForm } from "@/components/sports/join-team-form";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JoinTeamPageProps {
  params: Promise<{ inviteCode: string }>;
}

export async function generateMetadata({
  params,
}: JoinTeamPageProps): Promise<Metadata> {
  const { inviteCode } = await params;
  const team = getTeamByInviteCode(inviteCode);

  return {
    title: team ? `Join ${team.name} — GAMEDAY` : "Team Invitation — GAMEDAY",
    description: "Join your team roster and sign the athletic liability waiver for GAMEDAY.",
  };
}

export default async function JoinTeamPage({ params }: JoinTeamPageProps) {
  const { inviteCode } = await params;
  const team = getTeamByInviteCode(inviteCode);

  if (!team) {
    return (
      <div className="pt-32 pb-24 max-w-xl mx-auto px-4 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-headline uppercase text-ink mb-2">
          Invalid Invite Code
        </h1>
        <p className="text-sm font-body text-ink/70 mb-6">
          The team invite link with code &ldquo;{inviteCode}&rdquo; could not be found or has expired.
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
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
              <div className="inline-flex items-center gap-2 bg-gold/15 text-ink border border-gold/30 px-3 py-1 mb-3">
                <Users className="w-3.5 h-3.5 text-gold" />
                <span className="text-[11px] font-headline uppercase tracking-widest font-bold">
                  Official Team Invitation
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-headline uppercase tracking-tight text-ink">
                JOIN {team.name}
              </h1>
              <p className="text-sm text-ink/60 font-body mt-1">
                {division.sportName} • {division.name} • Captain: {team.captainName}
              </p>
            </div>

            <div className="text-xs font-body text-ink/60 sm:text-right">
              <span>Roster: <strong>{team.members.length} of {division.rosterMax} Players</strong></span>
            </div>
          </div>
        </div>

        {/* Join & Waiver Form */}
        <JoinTeamForm team={team} division={division} />
      </div>
    </div>
  );
}
