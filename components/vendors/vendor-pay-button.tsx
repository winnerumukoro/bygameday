"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, ArrowRight, AlertCircle } from "lucide-react";

interface VendorPayButtonProps {
  paymentToken: string;
  slotId: string;
  applicationId: string;
  email: string;
  eventTitle: string;
  subcategoryName: string;
  feeCents: number;
}

export function VendorPayButton({
  paymentToken,
  slotId,
  applicationId,
  email,
  eventTitle,
  subcategoryName,
  feeCents,
}: VendorPayButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProceedToPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/vendors/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentToken,
          slotId,
          applicationId,
          email,
          eventTitle,
          subcategoryName,
          feeCents,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.checkoutUrl) {
        setError(
          data.error ||
            "Unable to generate checkout session. Please ensure Stripe keys are configured."
        );
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.checkoutUrl;
    } catch {
      setError("Network communication error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-xs font-body text-red-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <Button
        onClick={handleProceedToPayment}
        disabled={loading}
        variant="primary"
        size="lg"
        className="w-full gap-2 font-headline uppercase tracking-wider text-base"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Connecting to Stripe...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Secure Stripe Checkout
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  );
}
