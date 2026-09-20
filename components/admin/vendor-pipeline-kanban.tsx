"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { AdminVendorApplication, VendorPipelineStatus } from "@/lib/admin/data";
import { updateVendorStatus } from "@/lib/admin/actions";
import { formatCurrency } from "@/lib/vendors/data";
import { Button } from "@/components/ui/button";
import {
  Store,
  CheckCircle2,
  Clock,
  Send,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VendorPipelineKanbanProps {
  initialApplications: AdminVendorApplication[];
}

export function VendorPipelineKanban({
  initialApplications,
}: VendorPipelineKanbanProps) {
  const [applications, setApplications] = useState<AdminVendorApplication[]>(initialApplications);
  const [activeFilter, setActiveFilter] = useState<VendorPipelineStatus | "all">("all");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const filtered = applications.filter((app) => {
    if (activeFilter === "all") return true;
    return app.status === activeFilter;
  });

  const handleStatusChange = async (
    id: string,
    newStatus: VendorPipelineStatus,
    reason?: string
  ) => {
    setProcessingId(id);
    setActionSuccess(null);

    try {
      const res = await updateVendorStatus(id, newStatus, reason);
      if (res.success) {
        setApplications((prev) =>
          prev.map((app) => {
            if (app.id !== id) return app;
            return {
              ...app,
              status: newStatus,
              paymentDeadline:
                newStatus === "approved_pending_payment"
                  ? new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
                  : app.paymentDeadline,
              rejectionReason: reason || app.rejectionReason,
            };
          })
        );
        setActionSuccess(`Application updated to ${newStatus.replace(/_/g, " ")}`);
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Slot Allocation Visualizer Strip */}
      <div className="p-5 border-2 border-ink/15 bg-white">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-ink/10">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-gold" />
            <h4 className="font-headline text-xs uppercase tracking-wider text-ink">
              Category Exclusivity Allocation — Interhouse 5v5 Basketball
            </h4>
          </div>
          <span className="text-[11px] text-ink/50 font-body">10x10 Concourse Footprints</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-body">
          <div className="p-2.5 bg-ink/[0.02] border border-ink/10">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-ink truncate">Smash Burgers</span>
              <span className="text-[10px] font-headline uppercase text-red-600 bg-red-100 px-1.5 py-0.5">
                Locked (1/1)
              </span>
            </div>
            <span className="text-[11px] text-ink/50">Empire Burgers Co.</span>
          </div>

          <div className="p-2.5 bg-ink/[0.02] border border-ink/10">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-ink truncate">Coffee & Drinks</span>
              <span className="text-[10px] font-headline uppercase text-amber-700 bg-amber-100 px-1.5 py-0.5">
                48h Hold (1/1)
              </span>
            </div>
            <span className="text-[11px] text-ink/50">Cortado Craft Bar</span>
          </div>

          <div className="p-2.5 bg-ink/[0.02] border border-ink/10">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-ink truncate">Recovery / Cryo</span>
              <span className="text-[10px] font-headline uppercase text-green-700 bg-green-100 px-1.5 py-0.5">
                Confirmed (1/1)
              </span>
            </div>
            <span className="text-[11px] text-ink/50">Empire Cryo Care</span>
          </div>

          <div className="p-2.5 bg-gold/10 border border-gold/30">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-ink truncate">Sportswear Drop</span>
              <span className="text-[10px] font-headline uppercase text-ink bg-gold px-1.5 py-0.5 font-bold">
                Open (0/1)
              </span>
            </div>
            <span className="text-[11px] text-ink/70">Awaiting Curation</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-ink/15">
        <button
          onClick={() => setActiveFilter("all")}
          className={cn(
            "px-3.5 py-1.5 text-xs font-headline uppercase tracking-wider border-2 transition-colors",
            activeFilter === "all"
              ? "bg-ink text-ivory border-ink"
              : "bg-white text-ink/70 border-ink/15 hover:border-ink/40"
          )}
        >
          All Applications ({applications.length})
        </button>

        <button
          onClick={() => setActiveFilter("submitted")}
          className={cn(
            "px-3.5 py-1.5 text-xs font-headline uppercase tracking-wider border-2 transition-colors",
            activeFilter === "submitted"
              ? "bg-gold text-ink border-gold font-bold"
              : "bg-white text-ink/70 border-ink/15 hover:border-ink/40"
          )}
        >
          New Submissions ({applications.filter((a) => a.status === "submitted").length})
        </button>

        <button
          onClick={() => setActiveFilter("approved_pending_payment")}
          className={cn(
            "px-3.5 py-1.5 text-xs font-headline uppercase tracking-wider border-2 transition-colors",
            activeFilter === "approved_pending_payment"
              ? "bg-amber-500 text-white border-amber-500 font-bold"
              : "bg-white text-ink/70 border-ink/15 hover:border-ink/40"
          )}
        >
          48h Payment Holds ({applications.filter((a) => a.status === "approved_pending_payment").length})
        </button>

        <button
          onClick={() => setActiveFilter("confirmed")}
          className={cn(
            "px-3.5 py-1.5 text-xs font-headline uppercase tracking-wider border-2 transition-colors",
            activeFilter === "confirmed"
              ? "bg-green-600 text-white border-green-600 font-bold"
              : "bg-white text-ink/70 border-ink/15 hover:border-ink/40"
          )}
        >
          Confirmed (Paid) ({applications.filter((a) => a.status === "confirmed").length})
        </button>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-green-50 border border-green-300 text-xs font-body text-green-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Applications Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((app) => {
          const isProcessing = processingId === app.id;

          return (
            <div
              key={app.id}
              className="border-2 border-ink/15 bg-white p-5 flex flex-col justify-between hover:border-ink transition-colors"
            >
              <div>
                {/* Status tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-headline uppercase tracking-wider bg-ink/5 px-2 py-0.5 text-ink/60">
                    {app.categoryName}
                  </span>

                  {app.status === "submitted" && (
                    <span className="text-[10px] font-headline uppercase tracking-wider bg-gold/20 text-ink px-2 py-0.5 font-semibold">
                      New Submission
                    </span>
                  )}
                  {app.status === "approved_pending_payment" && (
                    <span className="text-[10px] font-headline uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 font-semibold">
                      48h Hold Active
                    </span>
                  )}
                  {app.status === "confirmed" && (
                    <span className="text-[10px] font-headline uppercase tracking-wider bg-green-100 text-green-900 border border-green-300 px-2 py-0.5 font-semibold">
                      Confirmed & Paid
                    </span>
                  )}
                  {app.status === "waitlisted" && (
                    <span className="text-[10px] font-headline uppercase tracking-wider bg-ink/10 text-ink/60 px-2 py-0.5">
                      Waitlisted
                    </span>
                  )}
                  {app.status === "rejected" && (
                    <span className="text-[10px] font-headline uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5">
                      Declined
                    </span>
                  )}
                </div>

                <h3 className="font-headline text-lg uppercase tracking-tight text-ink mb-0.5">
                  {app.businessName}
                </h3>
                <span className="text-xs font-semibold text-gold block mb-3">
                  {app.subcategoryName}
                </span>

                <div className="space-y-1 text-xs font-body text-ink/70 mb-4 p-3 bg-ink/[0.02] border border-ink/10">
                  <div>
                    <span className="text-ink/40">Contact:</span> <strong>{app.contactName}</strong>
                  </div>
                  <div>
                    <span className="text-ink/40">Email:</span> {app.email}
                  </div>
                  <div>
                    <span className="text-ink/40">City:</span> {app.city}
                  </div>
                  <div>
                    <span className="text-ink/40">Event:</span> {app.targetEventTitle}
                  </div>
                  <div>
                    <span className="text-ink/40">Permit Fee:</span>{" "}
                    <strong className="text-ink">{formatCurrency(app.feeCents)}</strong>
                  </div>
                </div>

                {app.paymentDeadline && app.status === "approved_pending_payment" && (
                  <div className="mb-4 p-2.5 bg-amber-50 border border-amber-200 text-[11px] font-body text-amber-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>
                      Hold expires: <strong>{format(new Date(app.paymentDeadline), "MMM d, h:mm a")}</strong>
                    </span>
                  </div>
                )}

                {app.rejectionReason && (
                  <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-[11px] font-body text-red-900">
                    <span className="font-semibold block mb-0.5">Reason:</span>
                    {app.rejectionReason}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-ink/10 flex flex-wrap gap-2">
                {app.status === "submitted" && (
                  <>
                    <Button
                      size="sm"
                      variant="primary"
                      disabled={isProcessing}
                      onClick={() => handleStatusChange(app.id, "approved_pending_payment")}
                      className="flex-1 text-[11px] gap-1.5 h-9"
                    >
                      {isProcessing ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-3 h-3" />
                          Approve (Send 48h Link)
                        </>
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={isProcessing}
                      onClick={() => handleStatusChange(app.id, "rejected", "Category slot reached maximum capacity.")}
                      className="text-[11px] h-9 border-ink"
                    >
                      Decline
                    </Button>
                  </>
                )}

                {app.status === "approved_pending_payment" && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isProcessing}
                    onClick={() => handleStatusChange(app.id, "confirmed")}
                    className="w-full text-[11px] gap-1.5 h-9"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    Manually Mark Paid & Confirmed
                  </Button>
                )}

                {app.status === "confirmed" && (
                  <span className="text-[11px] font-body text-green-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    Slot Locked. Turnkey load-in packet issued.
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
