import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

interface WaiverPageProps {
  params: Promise<{ version: string }>;
}

export async function generateStaticParams() {
  return [{ version: "v1" }];
}

export default async function WaiverVersionPage({ params }: WaiverPageProps) {
  const { version } = await params;

  return (
    <div className="pt-32 sm:pt-40 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen text-ink">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-headline uppercase tracking-wider text-ink/70 hover:text-gold transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="flex items-center gap-2 text-xs font-headline uppercase tracking-widest text-gold mb-2">
        <Shield className="w-4 h-4 text-gold" />
        <span>Official Legal Instrument</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-headline uppercase tracking-tight text-ink mb-4">
        PARTICIPATION & LIABILITY WAIVER ({version.toUpperCase()})
      </h1>
      <p className="text-xs text-ink/50 uppercase tracking-wider font-headline mb-12">
        Version ID: {version.toLowerCase()} • Published for 2026 Season
      </p>

      <div className="flex flex-col gap-12 text-sm sm:text-base text-ink/80 font-body leading-relaxed">
        {/* Athletic Waiver */}
        <div className="p-6 sm:p-8 bg-ink/5 border border-ink/10 flex flex-col gap-4">
          <span className="text-xs font-headline uppercase tracking-widest text-gold">
            Section A
          </span>
          <h2 className="text-2xl font-headline uppercase text-ink">
            ATHLETIC PARTICIPATION & INJURY RELEASE (SPORTS)
          </h2>
          <p>
            I acknowledge that participating in competitive sports, 1v1 showdowns, intramural team matches, or related athletic activities organized by GAMEDAY involves inherent risks of physical injury, including but not limited to sprains, fractures, concussions, or other serious bodily harm.
          </p>
          <p>
            In consideration of being permitted to register and participate, I hereby voluntarily assume all risks associated with participation and forever release, waive, discharge, and hold harmless GAMEDAY, its tournament directors, referees, volunteers, facility owners, sponsors, and affiliates from any claims, demands, or liabilities arising out of negligence or ordinary tournament play.
          </p>
          <p>
            I certify that I am physically fit and possess adequate personal medical insurance. I consent to receive medical treatment in the event of emergency injury sustained during official tournament activities.
          </p>
        </div>

        {/* Vendor Waiver */}
        <div className="p-6 sm:p-8 bg-ink/5 border border-ink/10 flex flex-col gap-4">
          <span className="text-xs font-headline uppercase tracking-widest text-gold">
            Section B
          </span>
          <h2 className="text-2xl font-headline uppercase text-ink">
            VENDOR PARTICIPATION & INDEMNIFICATION AGREEMENT
          </h2>
          <p>
            By submitting an application or executing a vendor permit for a GAMEDAY event, the Vendor agrees to comply fully with all local municipal health department standards, venue fire safety ordinances, and scheduled load-in / load-out operating hours.
          </p>
          <p>
            The Vendor shall defend, indemnify, and hold harmless GAMEDAY and its partner facilities from any claims, liabilities, damages, penalties, or expenses (including reasonable legal fees) arising from the Vendor&apos;s products, food items, mechanical equipment, or on-site operations.
          </p>
          <p>
            Vendor permits are issued exclusively for the approved subcategory. Competing offerings or unauthorized product expansions will result in immediate termination of the vendor permit without fee refund.
          </p>
        </div>
      </div>
    </div>
  );
}
