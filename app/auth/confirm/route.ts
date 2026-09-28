import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/auth/session";

/**
 * Landing route for links in Supabase auth emails (sign-up confirmation,
 * password reset). Accepts both link styles:
 *  - ?token_hash=...&type=...  (recommended templates; works on any device)
 *  - ?code=...                 (default PKCE templates; same browser only)
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"), "/account");

  const supabase = await createClient();

  let ok = false;
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    ok = !error;
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    ok = !error;
  }

  if (ok) {
    // A recovery link always lands on the new-password form.
    const destination = type === "recovery" ? "/reset-password" : next;
    return NextResponse.redirect(new URL(destination, origin));
  }

  const failUrl = new URL("/login", origin);
  failUrl.searchParams.set("error", "link");
  return NextResponse.redirect(failUrl);
}
