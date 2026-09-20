"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { FinancialTransaction } from "@/lib/admin/data";
import { formatCurrency } from "@/lib/vendors/data";
import { RefundModal } from "./refund-modal";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface FinancialTransactionsTableProps {
  initialTransactions: FinancialTransaction[];
}

export function FinancialTransactionsTable({
  initialTransactions,
}: FinancialTransactionsTableProps) {
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(initialTransactions);
  const [selectedTx, setSelectedTx] = useState<FinancialTransaction | null>(null);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  const handleOpenRefund = (tx: FinancialTransaction) => {
    setSelectedTx(tx);
    setIsRefundModalOpen(true);
  };

  const handleRefundCompleted = (transactionId: string) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === transactionId ? { ...tx, status: "refunded" } : tx))
    );
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-ink/15 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-xs font-body">
            <thead className="bg-ink/[0.03] border-b border-ink/10 uppercase font-headline tracking-wider text-[11px] text-ink/60">
              <tr>
                <th className="py-3 px-4">Transaction Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Revenue Stream</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Audit Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {transactions.map((tx) => {
                const isRefunded = tx.status === "refunded";

                return (
                  <tr key={tx.id} className="hover:bg-ink/[0.01] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-ink">
                      <span>{tx.id}</span>
                      <span className="block text-[10px] text-ink/40 font-normal truncate max-w-[140px]">
                        {tx.stripeSessionId}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-ink block">{tx.customerName}</span>
                      <span className="text-[11px] text-ink/50">{tx.email}</span>
                    </td>

                    <td className="py-3.5 px-4 font-headline uppercase text-xs text-ink/70">
                      {tx.purpose.replace(/_/g, " ")}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-sm">
                      <span className={isRefunded ? "line-through text-ink/40" : "text-ink"}>
                        {formatCurrency(tx.amountCents)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-ink/70">
                      <span>{format(new Date(tx.date), "MMM d, yyyy")}</span>
                      <span className="block text-[11px] text-ink/40 font-mono">
                        {format(new Date(tx.date), "h:mm a")}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {isRefunded ? (
                        <span className="px-2 py-0.5 bg-red-100 border border-red-300 text-red-700 text-[10px] font-headline uppercase tracking-wider">
                          Refunded
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-green-100 border border-green-300 text-green-800 text-[10px] font-headline uppercase tracking-wider">
                          Succeeded
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {!isRefunded ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleOpenRefund(tx)}
                          className="text-[11px] h-8 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-400"
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Refund
                        </Button>
                      ) : (
                        <span className="text-[11px] text-ink/40 italic">Settled</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <RefundModal
        transaction={selectedTx}
        isOpen={isRefundModalOpen}
        onClose={() => {
          setIsRefundModalOpen(false);
          setSelectedTx(null);
        }}
        onRefundCompleted={handleRefundCompleted}
      />
    </div>
  );
}
