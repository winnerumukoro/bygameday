import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink text-ivory flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Background grain texture */}
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Vertical hairlines */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none" aria-hidden="true">
        <div className="max-w-stadium mx-auto h-full px-12 grid grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-l border-ivory/[0.05] h-full" />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo variant="light" className="h-8 w-auto" />
        </div>

        {/* 404 Scoreboard Number */}
        <div className="relative">
          <span className="font-headline text-[12rem] sm:text-[16rem] leading-none tracking-tighter text-ivory/[0.06] select-none block">
            404
          </span>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-headline uppercase tracking-[0.3em] text-gold mb-2">
              Technical Ruling
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline uppercase tracking-tight text-ivory">
              OUT OF BOUNDS
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-ivory/60 font-body max-w-md mx-auto leading-relaxed">
          The play you&apos;re looking for has ended or the route was never called.
          Check the URL or head back to the main court.
        </p>

        {/* Recovery Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button asChild variant="primary" className="gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Return to Home Court
            </Link>
          </Button>

          <Button asChild variant="secondary" className="gap-2 border-ivory/30 text-ivory hover:bg-ivory/10">
            <Link href="/events">
              <Calendar className="w-4 h-4" />
              Explore Events
            </Link>
          </Button>

          <Button asChild variant="secondary" className="gap-2 border-ivory/30 text-ivory hover:bg-ivory/10">
            <Link href="/sports">
              <Trophy className="w-4 h-4" />
              Enter a Bracket
            </Link>
          </Button>
        </div>

        {/* Court line decoration */}
        <div className="pt-12 flex items-center justify-center gap-4 text-ivory/20">
          <div className="w-16 h-px bg-ivory/20" />
          <span className="text-[10px] font-headline uppercase tracking-widest">
            End of Play
          </span>
          <div className="w-16 h-px bg-ivory/20" />
        </div>
      </div>
    </div>
  );
}
