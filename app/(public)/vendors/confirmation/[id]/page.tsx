import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  Mail,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Application Received — GAMEDAY Vendors",
  description: "Your GAMEDAY vendor application has been received.",
};

interface ConfirmationPageProps {
  params: Promise<{ id: string }>;
}

export default async function VendorConfirmationPage({
  params,
}: ConfirmationPageProps) {
  const { id } = await params;

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-ivory min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Success Card */}
        <div className="border-2 border-ink/20 bg-white p-6 sm:p-10 shadow-none">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gold flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-headline uppercase tracking-widest text-gold block">
                Submission Confirmed
              </span>
              <h1 className="text-2xl sm:text-3xl font-headline uppercase tracking-tight text-ink">
                APPLICATION RECEIVED
              </h1>
            </div>
          </div>

          {/* Reference Banner */}
          <div className="p-4 bg-ink/[0.03] border border-ink/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
            <div>
              <span className="text-xs text-ink/50 block font-body">
                Application Reference Code
              </span>
              <span className="font-mono text-sm font-bold text-ink uppercase">
                {id}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-gold/15 text-ink px-2.5 py-1 text-xs font-headline uppercase tracking-wider self-start sm:self-auto border border-gold/30">
              <Clock className="w-3.5 h-3.5 text-gold" />
              Under Curation Review
            </div>
          </div>

          {/* Timeline / What happens next */}
          <div className="space-y-6 mb-8">
            <h2 className="text-sm font-headline uppercase tracking-wider text-ink/70 pb-2 border-b border-ink/10">
              What Happens Next
            </h2>

            <div className="space-y-4 text-sm font-body text-ink/80">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-none bg-ink text-ivory text-xs font-headline flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-semibold text-ink">48-Hour Curation Review</p>
                  <p className="text-xs text-ink/60 mt-0.5 leading-relaxed">
                    Our committee evaluates your product line to verify venue requirements and safeguard single-category exclusivity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-none bg-ink text-ivory text-xs font-headline flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-semibold text-ink">Payment Link Delivered Via Email</p>
                  <p className="text-xs text-ink/60 mt-0.5 leading-relaxed">
                    Upon approval, you will receive an official notification containing a private checkout link valid for 48 hours to confirm your spot.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-none bg-ink text-ivory text-xs font-headline flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-semibold text-ink">Load-In Guide & Event Credentials</p>
                  <p className="text-xs text-ink/60 mt-0.5 leading-relaxed">
                    Once payment is confirmed, your vendor pass, arrival window schedule, and parking passes will be dispatched.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notice box */}
          <div className="p-4 bg-ink text-ivory text-xs font-body mb-8 flex items-start gap-3">
            <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-headline uppercase tracking-wider text-gold mb-0.5">
                Check Your Inbox
              </p>
              <p className="text-ivory/70 leading-relaxed">
                A confirmation copy of your application and signed liability agreement has been queued to your registered email address.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-ink/10">
            <Button asChild variant="primary" className="flex-1 gap-2">
              <Link href="/vendors">
                Return to Vendor Hub
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" className="flex-1 gap-2">
              <Link href="/events">
                View Event Calendar
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
