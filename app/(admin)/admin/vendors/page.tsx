import type { Metadata } from "next";
import { getAdminVendorApplications } from "@/lib/admin/data";
import { VendorPipelineKanban } from "@/components/admin/vendor-pipeline-kanban";

export const metadata: Metadata = {
  title: "Vendor Pipeline — GAMEDAY Console",
};

export default function AdminVendorsPage() {
  const applications = getAdminVendorApplications();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-ink/15 pb-6">
        <div>
          <span className="text-xs font-headline uppercase tracking-widest text-gold block mb-1">
            Category Exclusivity Curation
          </span>
          <h1 className="text-3xl sm:text-4xl font-headline uppercase tracking-tight text-ink">
            VENDOR PIPELINE & ALLOCATION
          </h1>
        </div>

        <p className="text-xs text-ink/60 font-body max-w-sm sm:text-right">
          Review brand menus, enforce single-vendor per subcategory rules, and trigger 48-hour secure Stripe payment links.
        </p>
      </div>

      <VendorPipelineKanban initialApplications={applications} />
    </div>
  );
}
