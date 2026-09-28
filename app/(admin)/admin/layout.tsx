import type { Metadata } from "next";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth/session";
import { signOut } from "@/lib/auth/actions";

export const metadata: Metadata = {
  title: "GAMEDAY Operations Console",
  description: "Courtside event operations, tournament control, vendor curation, and financial telemetry.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware already bounces signed-out visitors; this enforces the role.
  const session = await requireUser("/admin");

  if (session.role !== "admin") {
    return (
      <div className="min-h-screen bg-ink text-ivory flex items-center justify-center p-6">
        <div className="max-w-md text-center flex flex-col items-center gap-4">
          <h1 className="text-3xl font-headline uppercase tracking-tight">No admin access</h1>
          <p className="text-sm text-ivory/70 font-body">
            You&apos;re signed in as {session.email}, but this account isn&apos;t a GAMEDAY admin.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild variant="primary">
              <Link href="/">Back to site</Link>
            </Button>
            <form action={signOut}>
              <Button type="submit" variant="secondaryLight">
                Log out
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F4EB] flex flex-col md:flex-row font-body text-ink antialiased selection:bg-gold selection:text-ink">
      {/* Pinned Courtside Sidebar */}
      <AdminSidebar currentRole={session.fullName} />

      {/* Main Operations Canvas */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F5F4EB]">
        <AdminTopbar currentRole={session.fullName} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-[1520px] w-full mx-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
