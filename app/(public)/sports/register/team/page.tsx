import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getDivisions } from "@/lib/sports/data";
import { TeamRegistrationForm } from "@/components/sports/team-registration-form";
import { ArrowLeft, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Register a Team — GAMEDAY",
  description:
    "Register an intramural team for GAMEDAY tournaments across basketball, sand volleyball, futsal, and flag football.",
};

interface TeamRegisterPageProps {
  searchParams: Promise<{ division?: string }>;
}

export default async function TeamRegisterPage({
  searchParams,
}: TeamRegisterPageProps) {
  const resolvedParams = await searchParams;
  const initialDivisionId = resolvedParams.division;

  // Filter divisions to only intramural formats
  const allDivisions = getDivisions();
  const intramuralDivisions = allDivisions.filter((d) => d.format === "intramural");

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-ivory min-h-screen">
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
              <div className="inline-flex items-center gap-2 bg-ink text-ivory px-3 py-1 mb-3">
                <Users className="w-3.5 h-3.5 text-gold" />
                <span className="text-[11px] font-headline uppercase tracking-widest font-bold">
                  Captain Portal
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-headline uppercase tracking-tight text-ink">
                REGISTER AN INTRAMURAL TEAM
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-ink/60 font-body max-w-xs sm:text-right">
              Pay team fee, generate private player invite code, and manage your squad roster.
            </p>
          </div>
        </div>

        <Suspense fallback={<div className="text-center py-20 font-body text-ink/50">Loading registration...</div>}>
          <TeamRegistrationForm
            divisions={intramuralDivisions}
            initialDivisionId={initialDivisionId}
          />
        </Suspense>
      </div>
    </div>
  );
}
