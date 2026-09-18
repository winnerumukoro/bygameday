import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="pt-32 sm:pt-40 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen text-ink">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-headline uppercase tracking-wider text-ink/70 hover:text-gold transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <span className="text-xs font-headline tracking-widest uppercase text-gold block mb-2">
        Platform Governance
      </span>
      <h1 className="text-4xl sm:text-6xl font-headline uppercase tracking-tight text-ink mb-6">
        TERMS OF SERVICE
      </h1>
      <p className="text-xs text-ink/50 uppercase tracking-wider font-headline mb-12">
        Last Updated: September 2026
      </p>

      <div className="prose prose-neutral max-w-none flex flex-col gap-8 text-sm sm:text-base text-ink/80 font-body leading-relaxed">
        <section>
          <h2 className="text-xl font-headline uppercase text-ink mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the GAMEDAY platform, registering for any tournament, submitting an event, or participating as a vendor, you agree to be bound by these Terms of Service and all venue safety policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline uppercase text-ink mb-3">2. Participant Code of Conduct</h2>
          <p>
            GAMEDAY enforces strict sportsmanlike conduct. Physical violence, unsanctioned altercations, verbal abuse of tournament officials, referees, or attendees will result in immediate disqualification and removal from all future tournament circuits without refund.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline uppercase text-ink mb-3">3. Team Roster Requirements</h2>
          <p>
            A team registration is confirmed only when the team fee is paid, the captain has completed their roster declaration, and all rostered athletes have submitted an individual, executed digital liability waiver before the division registration deadline.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline uppercase text-ink mb-3">4. Vendor Exclusivity & Compliance</h2>
          <p>
            Approved vendor permits are strictly non-transferable. Vendors must operate only within their assigned subcategory and maintain all necessary local municipal health permits, insurance, and equipment standards.
          </p>
        </section>
      </div>
    </div>
  );
}
