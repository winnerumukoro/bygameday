import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/supabase/types";

export interface SessionProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: UserRole;
}

/** The signed-in user with their profile row, or null. */
export async function getSessionProfile(): Promise<SessionProfile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, role")
    .eq("id", user.id)
    .maybeSingle();

  return {
    id: user.id,
    email: user.email ?? "",
    fullName: profile?.full_name ?? user.email ?? "",
    phone: profile?.phone ?? null,
    role: (profile?.role as UserRole | undefined) ?? "user",
  };
}

/** For server actions: true only for a signed-in admin. */
export async function isAdmin(): Promise<boolean> {
  const session = await getSessionProfile();
  return session?.role === "admin";
}

/** Redirects to login when signed out. */
export async function requireUser(next: string): Promise<SessionProfile> {
  const session = await getSessionProfile();
  if (!session) redirect(`/login?next=${encodeURIComponent(next)}`);
  return session;
}

/** Only accept same-site relative paths as a post-login destination. */
export function safeNextPath(next: FormDataEntryValue | string | null | undefined, fallback = "/account"): string {
  if (typeof next !== "string") return fallback;
  if (!next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return fallback;
  return next;
}
