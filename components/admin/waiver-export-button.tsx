"use client";

import { useState } from "react";
import type { WaiverAuditRecord } from "@/lib/admin/data";
import { Button } from "@/components/ui/button";
import { Download, Check } from "lucide-react";

interface WaiverExportButtonProps {
  records: WaiverAuditRecord[];
}

export function WaiverExportButton({ records }: WaiverExportButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleExportCSV = () => {
    // Generate CSV contents
    const headers = [
      "Record ID",
      "Signer Name",
      "Signer Email",
      "Role",
      "Target Entity",
      "Waiver Version",
      "IP Address",
      "Timestamp (UTC)",
      "User Agent",
    ];

    const rows = records.map((r) => [
      `"${r.id}"`,
      `"${r.signerName.replace(/"/g, '""')}"`,
      `"${r.signerEmail}"`,
      `"${r.role}"`,
      `"${r.targetEntity.replace(/"/g, '""')}"`,
      `"${r.waiverVersion}"`,
      `"${r.ipAddress}"`,
      `"${r.signedAt}"`,
      `"${r.userAgent.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `gameday-waivers-audit-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <Button
      onClick={handleExportCSV}
      variant="primary"
      size="sm"
      className="gap-2 text-xs font-headline uppercase tracking-wider"
    >
      {downloaded ? (
        <>
          <Check className="w-3.5 h-3.5" />
          CSV Downloaded!
        </>
      ) : (
        <>
          <Download className="w-3.5 h-3.5" />
          Export Audit Log (CSV)
        </>
      )}
    </Button>
  );
}
