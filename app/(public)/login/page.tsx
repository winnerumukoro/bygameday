import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-ui";
import { getSessionProfile, safeNextPath } from "@/lib/auth/session";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log In",
  robots: { index: false },
};

interface LoginPageProps {
  searchParams: Promise<{ next?: string; error?: string; signedOut?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = safeNextPath(params.next);

  if (await getSessionProfile()) redirect(next);

  const notice =
    params.error === "link"
      ? { tone: "error" as const, text: "That link is invalid or has expired. Log in, or request a new link." }
      : params.signedOut
        ? { tone: "info" as const, text: "You've been signed out." }
        : undefined;

  return (
    <AuthShell
      eyebrow="Your account"
      title="Log In"
      footer={
        <>
          New here?{" "}
          <Link
            href={next === "/account" ? "/signup" : `/signup?next=${encodeURIComponent(next)}`}
            className="font-bold text-ink underline hover:text-gold"
          >
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm next={next} notice={notice} />
    </AuthShell>
  );
}
