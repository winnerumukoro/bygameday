import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell, FormNotice } from "@/components/auth/auth-ui";
import { getSessionProfile } from "@/lib/auth/session";
import { ResetPasswordForm } from "./reset-password-form";

export const metadata: Metadata = {
  title: "Choose a New Password",
  robots: { index: false },
};

export default async function ResetPasswordPage() {
  // The reset email link signs the user in (via /auth/confirm) before landing here.
  const session = await getSessionProfile();

  return (
    <AuthShell
      eyebrow="Your account"
      title="New Password"
      intro={session ? `Choose a new password for ${session.email}.` : undefined}
    >
      {session ? (
        <ResetPasswordForm />
      ) : (
        <div className="flex flex-col gap-4">
          <FormNotice tone="error">This reset link is invalid or has expired.</FormNotice>
          <Link href="/forgot-password" className="text-sm font-bold text-ink underline hover:text-gold">
            Request a new link
          </Link>
        </div>
      )}
    </AuthShell>
  );
}
