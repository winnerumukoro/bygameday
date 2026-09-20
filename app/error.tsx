"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors for telemetry
    console.error("GAMEDAY Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-ink text-ivory flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 text-center max-w-lg mx-auto space-y-6">
        {/* Brand */}
        <div className="flex justify-center mb-4">
          <Logo variant="light" className="h-8 w-auto" />
        </div>

        {/* Warning Icon Badge */}
        <div className="inline-flex items-center justify-center w-14 h-14 bg-red-600/10 border-2 border-red-500/40 text-red-500 mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div>
          <span className="text-xs font-headline uppercase tracking-[0.25em] text-gold mb-1 block">
            Referee Stoppage
          </span>
          <h1 className="text-3xl sm:text-4xl font-headline uppercase tracking-tight text-ivory">
            TECHNICAL FOUL ON THE PLAY
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-ivory/60 font-body leading-relaxed max-w-md mx-auto">
          An unexpected interruption stopped this play from executing. Our courtside operations team has been notified.
        </p>

        {error.digest && (
          <div className="p-2 bg-white/5 border border-white/10 font-mono text-[10px] text-ivory/40">
            Error Digest: {error.digest}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            variant="primary"
            className="w-full sm:w-auto gap-2 text-xs font-headline uppercase tracking-wider"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Replay / Try Again
          </Button>

          <Button
            asChild
            variant="secondary"
            className="w-full sm:w-auto gap-2 border-ivory/30 text-ivory hover:bg-ivory/10 text-xs font-headline uppercase tracking-wider"
          >
            <Link href="/">
              <Home className="w-3.5 h-3.5" />
              Back to Home Court
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
