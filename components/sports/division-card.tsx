import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Division } from "@/lib/sports/data";
import { formatCurrency } from "@/lib/vendors/data";
import { Button } from "@/components/ui/button";
import {
  Users,
  User,
  GitBranch,
  ArrowRight,
} from "lucide-react";

interface DivisionCardProps {
  division: Division;
}

export function DivisionCard({ division }: DivisionCardProps) {
  const is1v1 = division.format === "1v1";
  const isFull = division.status === "full" || division.registeredCount >= division.capacity;
  const capacityPct = Math.min(100, Math.round((division.registeredCount / division.capacity) * 100));

  const registerHref = is1v1
    ? `/sports/register/individual?division=${division.id}`
    : `/sports/register/team?division=${division.id}`;

  return (
    <div className="border-2 border-ink/15 bg-white flex flex-col justify-between hover:border-ink transition-colors group">
      <div>
        {/* Top Header Tag Strip */}
        <div className="p-5 pb-0 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[10px] font-headline uppercase tracking-wider px-2.5 py-0.5",
                is1v1
                  ? "bg-gold text-ink font-bold"
                  : "bg-ink text-ivory"
              )}
            >
              {is1v1 ? (
                <>
                  <User className="w-3 h-3" />
                  1v1 King of Court
                </>
              ) : (
                <>
                  <Users className="w-3 h-3" />
                  Intramural League
                </>
              )}
            </span>

            <span className="text-[10px] font-headline uppercase tracking-wider px-2 py-0.5 bg-ink/5 text-ink/70">
              {division.courtType}
            </span>
          </div>

          {isFull ? (
            <span className="text-[10px] font-headline uppercase tracking-wider text-ink/60 bg-ink/10 px-2 py-0.5">
              Waitlist
            </span>
          ) : (
            <span className="text-[10px] font-headline uppercase tracking-wider text-gold bg-gold/10 border border-gold/30 px-2 py-0.5 font-semibold">
              Open Registration
            </span>
          )}
        </div>

        {/* Division Core Info */}
        <div className="p-5">
          {division.eventTitle && (
            <span className="text-xs text-ink/50 font-body block mb-1 truncate">
              {division.eventTitle}
            </span>
          )}

          <h3 className="text-xl sm:text-2xl font-headline uppercase tracking-tight text-ink mb-3 group-hover:text-gold transition-colors">
            {division.name}
          </h3>

          {/* Roster & Fee Grid */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-ink/[0.03] border border-ink/10 mb-4 text-xs font-body">
            <div>
              <span className="text-ink/50 block text-[11px]">Roster Limits</span>
              <span className="font-semibold text-ink">
                {is1v1 ? "Solo (1 Player)" : `${division.rosterMin} – ${division.rosterMax} Players`}
              </span>
            </div>
            <div>
              <span className="text-ink/50 block text-[11px]">Registration Fee</span>
              <span className="font-headline text-sm text-gold">
                {formatCurrency(division.feeCents)}{" "}
                <span className="text-[10px] text-ink/60 font-body normal-case">
                  /{division.feeModel === "per_team" ? "team" : "player"}
                </span>
              </span>
            </div>
          </div>

          {/* Capacity Progress Bar */}
          <div className="space-y-1.5 mb-2">
            <div className="flex justify-between text-xs font-body">
              <span className="text-ink/60">Spots Filled</span>
              <span className="font-semibold text-ink">
                {division.registeredCount} of {division.capacity} {is1v1 ? "Athletes" : "Teams"}
              </span>
            </div>
            <div className="w-full h-1.5 bg-ink/10 overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-300"
                style={{ width: `${capacityPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-5 pt-0 flex flex-col sm:flex-row gap-2">
        <Button
          asChild
          variant={isFull ? "outline" : "primary"}
          className="flex-1 gap-2 text-xs"
        >
          <Link href={registerHref}>
            {isFull ? (
              "Join Waitlist"
            ) : is1v1 ? (
              <>
                Register As Player
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                Register Team
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </Link>
        </Button>

        <Button
          asChild
          variant="secondary"
          className="gap-2 text-xs"
        >
          <Link href={`/sports/brackets/${division.id}`}>
            <GitBranch className="w-3.5 h-3.5 text-gold" />
            Bracket
          </Link>
        </Button>
      </div>
    </div>
  );
}
