"use client";

import { useState } from "react";
import type { FinancialTransaction } from "@/lib/admin/data";
import { issueTransactionRefund } from "@/lib/admin/actions";
import { formatCurrency } from "@/lib/vendors/data";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X, CheckCircle2, Loader2, DollarSign } from "lucide-react";

interface RefundModalProps {
  transaction: FinancialTransaction | null;
  isOpen: boolean;
  onClose: () => void;
  onRefundCompleted?: (transactionId: string) => void;
}

export function RefundModal({
  transaction,
  isOpen,
  onClose,
  onRefundCompleted,
}: RefundModalProps) {
  const [reason, setReason] = useState("Team withdrawn prior to division bracket draw");
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !transaction) return null;

  const handleRefund = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const res = await issueTransactionRefund(transaction.id, reason);
      if (!res.success) {
        setError(res.error || "Failed to process refund.");
        setIsProcessing(false);
        return;
      }
      setSuccess(true);
      onRefundCompleted?.(transaction.id);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch {
      setError("Network or server communication error.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white border-2 border-red-500 max-w-md w-full p-6 text-ink relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink/50 hover:text-ink transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-red-600">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-xs font-headline uppercase tracking-widest text-ink">
            Audit-Controlled Financial Action
          </span>
        </div>

        <h3 className="text-xl font-headline uppercase tracking-tight text-ink mb-2">
          Confirm Stripe Refund
        </h3>

        {success ? (
          <div className="p-6 bg-green-50 border-2 border-green-500 text-center text-green-900 font-body">
            <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-headline uppercase text-base">Refund Issued</p>
            <p className="text-xs text-green-700 mt-1">Stripe transaction marked refunded.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-ink/[0.02] border border-ink/10 text-xs font-body space-y-1.5">
              <div className="flex justify-between">
                <span className="text-ink/60">Customer:</span>
                <strong>{transaction.customerName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/60">Purpose:</span>
                <span className="font-headline uppercase text-[11px]">{transaction.purpose.replace(/_/g, " ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/60">Stripe Session:</span>
                <span className="font-mono text-[11px] truncate max-w-[200px]">{transaction.stripeSessionId}</span>
              </div>
              <div className="pt-2 border-t border-ink/10 flex justify-between text-sm">
                <span className="font-semibold text-ink">Refund Amount:</span>
                <span className="font-headline text-red-600 font-bold text-base">
                  {formatCurrency(transaction.amountCents)}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-headline uppercase tracking-wider text-ink/70 mb-1">
                Reason For Audit Log *
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2.5 border-2 border-ink/15 text-xs font-body focus:outline-none focus:border-gold"
              >
                <option value="Team withdrawn prior to division bracket draw">
                  Team withdrawn prior to division bracket draw
                </option>
                <option value="Event rained out or cancelled by venue">
                  Event rained out or cancelled by venue
                </option>
                <option value="Duplicate payment or charge correction">
                  Duplicate payment or charge correction
                </option>
                <option value="Vendor category conflict identified during load-in">
                  Vendor category conflict identified during load-in
                </option>
              </select>
            </div>

            {error && (
              <div className="p-2.5 bg-red-50 text-xs text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-ink/10">
              <Button variant="secondary" onClick={onClose} disabled={isProcessing}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleRefund}
                disabled={isProcessing}
                className="gap-2 bg-red-600 text-white hover:bg-red-700 font-headline uppercase text-xs"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Refunding...
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4" />
                    Confirm & Refund
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
