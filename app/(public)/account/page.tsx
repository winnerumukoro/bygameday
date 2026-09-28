import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthShell, FormNotice } from "@/components/auth/auth-ui";
import { requireUser } from "@/lib/auth/session";
import { signOut } from "@/lib/auth/actions";

export const metadata: Metadata = {
  title: "Your Account",
  robots: { index: false },
};

interface AccountPageProps {
  searchParams: Promise<{ updated?: string }>;
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const { updated } = await searchParams;
  const session = await requireUser("/account");

  return (
    <AuthShell eyebrow="Your account" title={session.fullName}>
      <div className="flex flex-col gap-6">
        {updated === "password" && <FormNotice tone="success">Your password has been updated.</FormNotice>}

        <dl className="grid grid-cols-[auto,1fr] gap-x-6 gap-y-3 text-sm font-body">
          <dt className="text-ink/50 uppercase text-xs tracking-wider pt-0.5">Email</dt>
          <dd className="text-ink break-all">{session.email}</dd>
          {session.phone && (
            <>
              <dt className="text-ink/50 uppercase text-xs tracking-wider pt-0.5">Phone</dt>
              <dd className="text-ink">{session.phone}</dd>
            </>
          )}
        </dl>

        <div className="flex flex-col gap-3 pt-4 border-t border-ink/10">
          {session.role === "admin" && (
            <Button asChild variant="primary" className="w-full">
              <Link href="/admin">Open Admin Dashboard</Link>
            </Button>
          )}
          <Button asChild variant="secondary" className="w-full">
            <Link href="/reset-password">Change Password</Link>
          </Button>
          <form action={signOut}>
            <Button type="submit" variant="outline" className="w-full">
              Log Out
            </Button>
          </form>
        </div>
      </div>
    </AuthShell>
  );
}
