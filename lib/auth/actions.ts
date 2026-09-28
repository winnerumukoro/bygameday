"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/auth/session";

/* ────────────────────────────────────────────────────────────
   Auth server actions — used with React's useActionState.
   Each returns a FormState on failure and redirects on success.
   ──────────────────────────────────────────────────────────── */

export interface FormState {
  error?: string;
  message?: string;
  /** Echo back non-secret fields so the form keeps what the user typed. */
  values?: Record<string, string>;
}

const emailField = z.string().trim().toLowerCase().email("Enter a valid email address.");
const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(72, "Password must be 72 characters or fewer.");

/** Absolute origin for links in auth emails (confirm, reset). */
async function siteOrigin(): Promise<string> {
  const h = await headers();
  const origin = h.get("origin");
  if (origin) return origin;
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (host) {
    const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
    return `${proto}://${host}`;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || "https://bygameday.com";
}

function friendlyAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "Email or password is incorrect.";
  if (m.includes("email not confirmed")) return "Confirm your email first. Check your inbox for the link we sent.";
  if (m.includes("rate limit") || m.includes("too many")) return "Too many attempts. Wait a few minutes and try again.";
  if (m.includes("same_password") || m.includes("different from the old")) return "Choose a password you haven't used before.";
  if (m.includes("weak") || m.includes("pwned")) return "That password is too easy to guess. Try a longer one.";
  return "Something went wrong. Please try again.";
}

/* ─────────────────────────── Sign in ─────────────────────────── */

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const parsed = z
    .object({ email: emailField, password: z.string().min(1, "Enter your password.") })
    .safeParse({ email, password: formData.get("password") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message, values: { email } };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { error: friendlyAuthError(error.message), values: { email } };
  }

  redirect(safeNextPath(formData.get("next")));
}

/* ─────────────────────────── Sign up ─────────────────────────── */

export async function signUp(_prev: FormState, formData: FormData): Promise<FormState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "");
  const values = { fullName, email };

  const parsed = z
    .object({
      fullName: z.string().min(1, "Enter your name.").max(120),
      email: emailField,
      password: passwordField,
      confirmPassword: z.string(),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: "Passwords don't match.",
    })
    .safeParse({
      fullName,
      email,
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message, values };
  }

  const next = safeNextPath(formData.get("next"));
  const origin = await siteOrigin();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.fullName },
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(next)}`,
    },
  });
  if (error) {
    return { error: friendlyAuthError(error.message), values };
  }

  // Email confirmation turned off in Supabase: the user is signed in already.
  if (data.session) redirect(next);

  // Same message whether or not the address was already registered, so the
  // form can't be used to discover who has an account.
  return {
    message: `We sent a confirmation link to ${parsed.data.email}. Open it to finish creating your account.`,
  };
}

/* ─────────────────────── Forgot password ─────────────────────── */

export async function requestPasswordReset(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const parsed = emailField.safeParse(email);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message, values: { email } };
  }

  const origin = await siteOrigin();
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
    redirectTo: `${origin}/auth/confirm?next=/reset-password`,
  });
  if (error && /rate limit|too many/i.test(error.message)) {
    return { error: friendlyAuthError(error.message), values: { email } };
  }

  // Don't reveal whether the address has an account.
  return {
    message: `If ${parsed.data} has an account, we've emailed a link to reset the password. The link expires in one hour.`,
  };
}

/* ─────────────────────── Reset password ─────────────────────── */

export async function updatePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = z
    .object({ password: passwordField, confirmPassword: z.string() })
    .refine((d) => d.password === d.confirmPassword, { message: "Passwords don't match." })
    .safeParse({
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Your reset link has expired. Request a new one." };
  }

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) {
    return { error: friendlyAuthError(error.message) };
  }

  redirect("/account?updated=password");
}

/* ─────────────────────────── Sign out ─────────────────────────── */

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login?signedOut=1");
}
