"use client";

import { useState } from "react";
import type { Team, Division } from "@/lib/sports/data";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Check,
  Users,
  AlertTriangle,
  Share2,
  Clock,
} from "lucide-react";

interface RosterManagerProps {
  team: Team;
  division: Division;
}

export function RosterManager({ team, division }: RosterManagerProps) {
  const [copied, setCopied] = useState(false);

  const rosterCount = team.members.length;
  const isMinMet = rosterCount >= division.rosterMin;
  const isMaxReached = rosterCount >= division.rosterMax;

  // Check waivers for all team members
  const unsignedWaiversCount = team.members.filter((m) => !m.waiverSigned).length;
  const isFullyEligible = isMinMet && unsignedWaiversCount === 0;

  // Generate join URL
  const joinUrl = typeof window !== "undefined"
    ? `${window.location.origin}/teams/join/${team.inviteCode}`
    : `https://bygameday.com/teams/join/${team.inviteCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* ────────────── TEAM INVITE CODE BANNER ────────────── */}
      <div className="border-2 border-ink bg-ink text-ivory p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="w-4 h-4 text-gold" />
              <span className="text-xs font-headline uppercase tracking-widest text-gold">
                Teammate Invite Link
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline uppercase tracking-tight text-ivory">
              Share With Your Squad
            </h2>
            <p className="text-xs sm:text-sm text-ivory/70 font-body mt-1 max-w-lg">
              Players click this link to join your roster and electronically sign their required athletic participation waiver.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="bg-white/10 px-4 py-3 border border-white/20 font-mono text-sm sm:text-base text-gold font-bold tracking-wider text-center">
              {team.inviteCode}
            </div>
            <Button
              onClick={handleCopyLink}
              variant="primary"
              className="gap-2 font-headline uppercase text-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied To Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Invite Link
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* ────────────── ROSTER ELIGIBILITY STATUS ────────────── */}
      <div className="border-2 border-ink/15 bg-white p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-ink/10">
          <div>
            <span className="text-xs font-headline uppercase tracking-widest text-gold block">
              Division Roster Status
            </span>
            <h3 className="text-xl font-headline uppercase tracking-tight text-ink">
              {division.name}
            </h3>
          </div>

          <div>
            {isFullyEligible ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 border border-green-300 text-green-900 text-xs font-headline uppercase tracking-wider">
                <Check className="w-3.5 h-3.5 text-green-700" />
                Tournament Ready (Eligible)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-headline uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                Action Required
              </span>
            )}
          </div>
        </div>

        {/* Progress & Checklist Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-body mb-6">
          <div className="p-3 bg-ink/[0.02] border border-ink/10">
            <span className="text-ink/50 block">Roster Size</span>
            <span className="font-headline text-lg text-ink">
              {rosterCount} / {division.rosterMax} Players
            </span>
            <span className="text-[11px] text-ink/60 block mt-0.5">
              Minimum {division.rosterMin} required
            </span>
          </div>

          <div className="p-3 bg-ink/[0.02] border border-ink/10">
            <span className="text-ink/50 block">Waiver Compliance</span>
            <span className="font-headline text-lg text-ink">
              {rosterCount - unsignedWaiversCount} / {rosterCount} Signed
            </span>
            <span className="text-[11px] text-ink/60 block mt-0.5">
              {unsignedWaiversCount === 0 ? "100% Signed" : `${unsignedWaiversCount} pending`}
            </span>
          </div>

          <div className="p-3 bg-ink/[0.02] border border-ink/10">
            <span className="text-ink/50 block">Registration Fee</span>
            <span className="font-headline text-lg text-gold">
              Paid In Full
            </span>
            <span className="text-[11px] text-ink/60 block mt-0.5">
              Permit secured by Captain
            </span>
          </div>
        </div>

        {/* Action alerts */}
        {!isMinMet && (
          <div className="p-3 bg-amber-50 border-l-4 border-amber-500 text-xs font-body text-amber-900 mb-3 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              Your team needs at least <strong>{division.rosterMin - rosterCount} more player(s)</strong> to be placed into the tournament draw. Share your invite code above.
            </span>
          </div>
        )}

        {unsignedWaiversCount > 0 && (
          <div className="p-3 bg-amber-50 border-l-4 border-amber-500 text-xs font-body text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>{unsignedWaiversCount} player(s)</strong> have not completed their electronic athletic injury waiver. Athletes cannot enter the court without a signed release.
            </span>
          </div>
        )}
      </div>

      {/* ────────────── ACTIVE ROSTER MEMBER LIST ────────────── */}
      <div className="border-2 border-ink/15 bg-white overflow-hidden">
        <div className="p-5 border-b border-ink/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gold" />
            <h3 className="font-headline text-base uppercase tracking-wider text-ink">
              Confirmed Team Roster ({rosterCount})
            </h3>
          </div>
          {isMaxReached && (
            <span className="text-[10px] font-headline uppercase tracking-wider text-ink/60 bg-ink/10 px-2 py-0.5">
              Roster Cap Reached
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body">
            <thead className="bg-ink/[0.03] border-b border-ink/10 text-ink/60 uppercase font-headline tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Player Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Waiver Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {team.members.map((member, idx) => (
                <tr key={member.id} className="hover:bg-ink/[0.01] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-ink">
                    {member.jerseyNumber ? `#${member.jerseyNumber}` : idx + 1}
                  </td>
                  <td className="py-3 px-4 font-semibold text-ink">
                    {member.name}
                  </td>
                  <td className="py-3 px-4">
                    {member.role === "captain" ? (
                      <span className="px-2 py-0.5 bg-ink text-ivory text-[10px] font-headline uppercase tracking-wider">
                        Captain
                      </span>
                    ) : (
                      <span className="text-ink/60 text-xs">Player</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-ink/70">
                    {member.email}
                  </td>
                  <td className="py-3 px-4">
                    {member.waiverSigned ? (
                      <span className="inline-flex items-center gap-1 text-green-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        Signed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
