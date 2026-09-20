"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { WaiverAuditRecord } from "@/lib/admin/data";
import { WaiverExportButton } from "./waiver-export-button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface WaiverAuditTableProps {
  initialRecords: WaiverAuditRecord[];
}

export function WaiverAuditTable({ initialRecords }: WaiverAuditTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "athlete" | "captain" | "vendor">("all");

  const filteredRecords = initialRecords.filter((r) => {
    const matchesRole = roleFilter === "all" || r.role === roleFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      r.signerName.toLowerCase().includes(term) ||
      r.signerEmail.toLowerCase().includes(term) ||
      r.targetEntity.toLowerCase().includes(term) ||
      r.ipAddress.includes(term);
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search & Export Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-2 border-ink/15 bg-white">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search bar */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-ink/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by signer name, email, team or IP address..."
              className="w-full pl-9 pr-4 py-2 border-2 border-ink/15 text-xs font-body focus:outline-none focus:border-gold"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-1 bg-ink/5 p-1 border border-ink/10">
            <button
              onClick={() => setRoleFilter("all")}
              className={cn(
                "px-2.5 py-1 text-[11px] font-headline uppercase tracking-wider transition-colors",
                roleFilter === "all" ? "bg-ink text-ivory" : "text-ink/60 hover:text-ink"
              )}
            >
              All
            </button>
            <button
              onClick={() => setRoleFilter("athlete")}
              className={cn(
                "px-2.5 py-1 text-[11px] font-headline uppercase tracking-wider transition-colors",
                roleFilter === "athlete" ? "bg-ink text-ivory" : "text-ink/60 hover:text-ink"
              )}
            >
              Athletes
            </button>
            <button
              onClick={() => setRoleFilter("captain")}
              className={cn(
                "px-2.5 py-1 text-[11px] font-headline uppercase tracking-wider transition-colors",
                roleFilter === "captain" ? "bg-ink text-ivory" : "text-ink/60 hover:text-ink"
              )}
            >
              Captains
            </button>
            <button
              onClick={() => setRoleFilter("vendor")}
              className={cn(
                "px-2.5 py-1 text-[11px] font-headline uppercase tracking-wider transition-colors",
                roleFilter === "vendor" ? "bg-ink text-ivory" : "text-ink/60 hover:text-ink"
              )}
            >
              Vendors
            </button>
          </div>
        </div>

        {/* CSV Export Button */}
        <WaiverExportButton records={filteredRecords} />
      </div>

      {/* Audit Log Table */}
      <div className="border-2 border-ink/15 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-xs font-body">
            <thead className="bg-ink/[0.03] border-b border-ink/10 uppercase font-headline tracking-wider text-[11px] text-ink/60">
              <tr>
                <th className="py-3 px-4">Signer Name & Email</th>
                <th className="py-3 px-4">Role & Entity</th>
                <th className="py-3 px-4">Version</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Signed Timestamp (EST)</th>
                <th className="py-3 px-4">Client Device / UA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-ink/[0.01] transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-ink block">{r.signerName}</span>
                    <span className="text-[11px] text-ink/50">{r.signerEmail}</span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-[10px] font-headline uppercase bg-ink/5 px-2 py-0.5 text-ink/70 inline-block mb-0.5">
                      {r.role}
                    </span>
                    <span className="text-xs text-ink/70 block truncate max-w-[200px]">
                      {r.targetEntity}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-green-700">
                    {r.waiverVersion.toUpperCase()}
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-ink/70">
                    {r.ipAddress}
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap text-ink/70">
                    <span className="block font-medium">
                      {format(new Date(r.signedAt), "MMM d, yyyy")}
                    </span>
                    <span className="text-[11px] text-ink/40 font-mono">
                      {format(new Date(r.signedAt), "h:mm:ss a")}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-[11px] text-ink/50 truncate max-w-[220px]">
                    {r.userAgent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
