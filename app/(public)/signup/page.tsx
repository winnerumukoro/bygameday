import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-ui";
import { getSessionProfile, safeNextPath } from "@/lib/auth/session";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Create Account",
  robots: { index: false },
};

interface SignupPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  const next = safeNextPath(params.next);

  if (await getSessionProfile()) redirect(next);

  return (
    <AuthShell
      eyebrow="Your account"
      title="Create Account"
      intro="One account for team registrations, 1v1 sign-ups and vendor applications."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href={next === "/account" ? "/login" : `/login?next=${encodeURIComponent(next)}`}
            className="font-bold text-ink underline hover:text-gold"
          >
            Log in
          </Link>
        </>
      }
    >
      <SignupForm next={next} />
    </AuthShell>
  );
}
