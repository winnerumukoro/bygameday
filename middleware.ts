import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Pages that need a signed-in user. Admin role is checked in the admin layout.
const PROTECTED_PREFIXES = ["/admin", "/account"];

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname, search } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtected && !user && pathname !== "/admin/login") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

// Session refresh costs a round trip to Supabase, so it only runs where a
// server-rendered page reads the session. The header reads auth state on
// the client and refreshes its own token.
export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/reset-password"],
};
