import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export const metadata: Metadata = {
  title: "GAMEDAY Operations Console",
  description: "Courtside event operations, tournament control, vendor curation, and financial telemetry.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F4EB] flex flex-col md:flex-row font-body text-ink antialiased selection:bg-gold selection:text-ink">
      {/* Pinned Courtside Sidebar */}
      <AdminSidebar currentRole="Tournament Director" />

      {/* Main Operations Canvas */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F5F4EB]">
        <AdminTopbar currentRole="Tournament Director" />
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-[1520px] w-full mx-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
