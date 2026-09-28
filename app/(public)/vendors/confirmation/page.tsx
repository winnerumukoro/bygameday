import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Confirmed — GAMEDAY Vendors",
  description: "Your GAMEDAY vendor slot is confirmed.",
};

interface PaymentConfirmationProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function VendorPaymentConfirmationPage({
  searchParams,
}: PaymentConfirmationProps) {
  const { session_id } = await searchParams;

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-ivory min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="border-2 border-ink/20 bg-white p-6 sm:p-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gold flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-headline uppercase tracking-widest text-gold block">
                Payment received
              </span>
              <h1 className="text-2xl sm:text-3xl font-headline uppercase tracking-tight text-ink">
                VENDOR SLOT CONFIRMED
              </h1>
            </div>
          </div>

          <p className="text-sm font-body text-ink/80 leading-relaxed mb-6">
            Your payment went through and your slot is confirmed. You are the only vendor in your category at this event.
          </p>

          {/* Session verification pill */}
          {session_id && (
            <div className="p-3 bg-ink/[0.03] border border-ink/10 flex items-center justify-between text-xs font-mono mb-8">
              <span className="text-ink/50">Stripe Ref:</span>
              <span className="font-bold text-ink truncate max-w-[280px]">
                {session_id}
              </span>
            </div>
          )}

          <p className="text-sm font-body text-ink/80 leading-relaxed mb-8">
            Before the event we&apos;ll send you the arrival time, where you&apos;ll set up, and anything you need to bring.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-ink/10">
            <Button asChild variant="primary" className="flex-1 gap-2">
              <Link href="/events">
                Explore Tournament Calendar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" className="flex-1 gap-2">
              <Link href="/vendors">
                Vendor Hub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
