"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDemoLogin = (role: string) => {
    setLoadingRole(role);
    // Set demo role cookie in client for fast seamless testing
    document.cookie = `gameday_staff_role=${encodeURIComponent(role)}; path=/; max-age=86400`;
    setTimeout(() => {
      router.push("/admin");
    }, 600);
  };

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingRole("email");
    document.cookie = `gameday_staff_role=${encodeURIComponent("Tournament Director")}; path=/; max-age=86400`;
    setTimeout(() => {
      router.push("/admin");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col justify-center items-center p-4 sm:p-6 text-ivory">
      <div className="w-full max-w-md space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Logo variant="light" className="h-8 w-auto" />
          </div>
          <span className="text-xs font-headline uppercase tracking-widest text-gold bg-gold/15 px-3 py-1 border border-gold/30 inline-block">
            Internal Operations Console
          </span>
          <h1 className="text-3xl sm:text-4xl font-headline uppercase tracking-tight text-ivory">
            STAFF ACCESS PORTAL
          </h1>
          <p className="text-xs text-ivory/60 font-body">
            Restricted to authorized event operations staff, venue leads, and court scorekeepers.
          </p>
        </div>

        {/* ────────────── DEMO ROLE QUICK SWITCHER ────────────── */}
        <div className="border-2 border-gold/40 bg-white/5 p-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-gold" />
            <span className="text-xs font-headline uppercase tracking-wider text-gold font-bold">
              Demo Staff Switcher
            </span>
          </div>
          <p className="text-[11px] text-ivory/60 font-body">
            Select a staff persona below to test courtside operational capabilities immediately:
          </p>

          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => handleDemoLogin("Tournament Director")}
              disabled={loadingRole !== null}
              className="w-full p-3 bg-white/10 hover:bg-white/15 border border-white/20 text-left flex items-center justify-between transition-colors group"
            >
              <div>
                <span className="font-headline text-xs uppercase tracking-wider text-ivory block group-hover:text-gold">
                  Tournament Director (Admin)
                </span>
                <span className="text-[10px] text-ivory/50 block">
                  Full control: Financials, Vendor approvals, Event toggles
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("Courtside Scorer")}
              disabled={loadingRole !== null}
              className="w-full p-3 bg-white/10 hover:bg-white/15 border border-white/20 text-left flex items-center justify-between transition-colors group"
            >
              <div>
                <span className="font-headline text-xs uppercase tracking-wider text-ivory block group-hover:text-gold">
                  Courtside Scorer (Scorekeeper)
                </span>
                <span className="text-[10px] text-ivory/50 block">
                  Match scorekeeping, live bracket progression
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("Venue Lead")}
              disabled={loadingRole !== null}
              className="w-full p-3 bg-white/10 hover:bg-white/15 border border-white/20 text-left flex items-center justify-between transition-colors group"
            >
              <div>
                <span className="font-headline text-xs uppercase tracking-wider text-ivory block group-hover:text-gold">
                  Venue Operations Lead
                </span>
                <span className="text-[10px] text-ivory/50 block">
                  Waiver compliance, check-in gates, emergency alerts
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* ────────────── STANDARD SUPABASE CREDENTIALS ────────────── */}
        <div className="border-2 border-ivory/15 bg-white/5 p-6">
          <h3 className="text-xs font-headline uppercase tracking-wider text-ivory/70 mb-4 pb-2 border-b border-ivory/10">
            Sign In with Staff Account
          </h3>

          <form onSubmit={handleStandardSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ivory/70 mb-1">
                Staff Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@bygameday.com"
                className="w-full px-3.5 py-2.5 bg-black/40 border-2 border-ivory/20 text-sm font-body text-ivory focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ivory/70 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-black/40 border-2 border-ivory/20 text-sm font-body text-ivory focus:outline-none focus:border-gold"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={loadingRole !== null}
              className="w-full gap-2 text-xs font-headline uppercase tracking-wider mt-2"
            >
              {loadingRole === "email" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  Sign In to Console
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs font-headline uppercase tracking-wider text-ivory/40 hover:text-gold transition-colors"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
