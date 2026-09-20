import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getDivisions } from "@/lib/sports/data";
import { IndividualRegistrationForm } from "@/components/sports/individual-registration-form";
import { ArrowLeft, User } from "lucide-react";

export const metadata: Metadata = {
  title: "1v1 Showdown Registration — GAMEDAY",
  description:
    "Register for 1v1 streetball and singles showdown tournaments. Single elimination king of the court under the floodlights.",
};

interface IndividualRegisterPageProps {
  searchParams: Promise<{ division?: string }>;
}

export default async function IndividualRegisterPage({
  searchParams,
}: IndividualRegisterPageProps) {
  const resolvedParams = await searchParams;
  const initialDivisionId = resolvedParams.division;

  // Filter divisions to only 1v1 formats
  const allDivisions = getDivisions();
  const oneOnOneDivisions = allDivisions.filter((d) => d.format === "1v1");

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
              <div className="inline-flex items-center gap-2 bg-gold/15 text-ink border border-gold/30 px-3 py-1 mb-3">
                <User className="w-3.5 h-3.5 text-gold" />
                <span className="text-[11px] font-headline uppercase tracking-widest font-bold">
                  Solo Competitor Portal
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-headline uppercase tracking-tight text-ink">
                1V1 SHOWDOWN ENTRY
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-ink/60 font-body max-w-xs sm:text-right">
              Single elimination draw. 30-minute spot hold. Signed liability waiver required.
            </p>
          </div>
        </div>

        <Suspense fallback={<div className="text-center py-20 font-body text-ink/50">Loading registration...</div>}>
          <IndividualRegistrationForm
            divisions={oneOnOneDivisions}
            initialDivisionId={initialDivisionId}
          />
        </Suspense>
      </div>
    </div>
  );
}
