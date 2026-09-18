import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RefundsPage() {
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
        Policies & Guidelines
      </span>
      <h1 className="text-4xl sm:text-6xl font-headline uppercase tracking-tight text-ink mb-6">
        REFUNDS & CANCELLATIONS
      </h1>
      <p className="text-xs text-ink/50 uppercase tracking-wider font-headline mb-12">
        Last Updated: September 2026
      </p>

      <div className="prose prose-neutral max-w-none flex flex-col gap-8 text-sm sm:text-base text-ink/80 font-body leading-relaxed">
        <section>
          <h2 className="text-xl font-headline uppercase text-ink mb-3">1. Tournament Registration Fees</h2>
          <p>
            Due to bracket generation, venue reservations, and referee staffing commitments, tournament entry fees (both 1v1 and intramural team fees) are non-refundable within 14 calendar days of the scheduled event start date. Prior to 14 days, cancellations are subject to a 10% administrative processing fee.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline uppercase text-ink mb-3">2. Inclement Weather & Rescheduling</h2>
          <p>
            In the event of severe weather or acts of God forcing venue closure, GAMEDAY will make every reasonable effort to reschedule the event. If an event cannot be rescheduled, participants and vendors will receive full credits valid for any tournament in the current or following calendar season.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline uppercase text-ink mb-3">3. Vendor Slot Releases</h2>
          <p>
            Vendor slots are held for 48 hours following approval. If payment is not completed within the hold window, the slot is automatically released to the next waitlisted applicant. Paid vendor permit fees are non-refundable after confirmation due to category exclusivity enforcement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline uppercase text-ink mb-3">4. How to Request a Refund</h2>
          <p>
            To submit an inquiry or formal refund request, please email{" "}
            <a href="mailto:support@bygameday.com" className="text-ink font-bold underline hover:text-gold">
              support@bygameday.com
            </a>{" "}
            with your team name, transaction reference ID, and reason for withdrawal.
          </p>
        </section>
      </div>
    </div>
  );
}
