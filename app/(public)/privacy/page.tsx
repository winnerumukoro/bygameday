import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
        Legal & Compliance
      </span>
      <h1 className="text-4xl sm:text-6xl font-headline uppercase tracking-tight text-ink mb-6">
        PRIVACY POLICY
      </h1>
      <p className="text-xs text-ink/50 uppercase tracking-wider font-headline mb-12">
        Last Updated: September 2026
      </p>

      <div className="prose prose-neutral max-w-none flex flex-col gap-8 text-sm sm:text-base text-ink/80 font-body leading-relaxed">
        <section>
          <h2 className="text-xl font-headline uppercase text-ink mb-3">1. Information We Collect</h2>
          <p>
            GAMEDAY collects information when you interact with our platform, including registering for tournaments, applying as a vendor, signing athletic liability waivers, or subscribing to our priority dispatch. This includes your name, email address, phone number, team affiliation, and payment details processed through our authorized payment processor, Stripe.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline uppercase text-ink mb-3">2. How We Use Your Information</h2>
          <p>
            We use your data strictly to organize tournaments, verify participant eligibility, administer single-elimination brackets, process vendor permits, issue transactional notifications (such as schedule changes and game alerts), and comply with venue safety requirements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline uppercase text-ink mb-3">3. Payments & Security</h2>
          <p>
            All financial transactions are conducted directly through Stripe. GAMEDAY does not store full credit card numbers or banking secrets on our servers. All communications are encrypted in transit via SSL/TLS.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline uppercase text-ink mb-3">4. Waiver Signatures</h2>
          <p>
            When signing an athletic or vendor liability waiver, we record the signer&apos;s name, email, IP address, user agent, and timestamp to establish an immutable, legally binding digital record.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline uppercase text-ink mb-3">5. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy, please contact our legal team at{" "}
            <a href="mailto:privacy@bygameday.com" className="text-ink font-bold underline hover:text-gold">
              privacy@bygameday.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
