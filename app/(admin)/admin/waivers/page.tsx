import type { Metadata } from "next";
import { getWaiverAuditLogs } from "@/lib/admin/data";
import { WaiverAuditTable } from "@/components/admin/waiver-audit-table";

export const metadata: Metadata = {
  title: "Waiver Audit Log — GAMEDAY Console",
};

export default function AdminWaiversPage() {
  const records = getWaiverAuditLogs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-ink/15 pb-6">
        <div>
          <span className="text-xs font-headline uppercase tracking-widest text-gold block mb-1">
            Legal Compliance & Risk Management
          </span>
          <h1 className="text-3xl sm:text-4xl font-headline uppercase tracking-tight text-ink">
            WAIVER AUDIT LOG & REPOSITORY
          </h1>
        </div>

        <p className="text-xs text-ink/60 font-body max-w-sm sm:text-right">
          Immutable electronic signatures with client IP addresses and user-agent strings. Compliant with ESIGN and UETA standards.
        </p>
      </div>

      <WaiverAuditTable initialRecords={records} />
    </div>
  );
}
