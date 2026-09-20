import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory pt-14 sm:pt-20 pb-10 sm:pb-12 border-t border-ink/40">
      <div className="max-w-stadium mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-10 sm:gap-y-12 md:gap-12 pb-12 sm:pb-16 border-b border-ivory/10">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-4 flex flex-col items-start gap-4">
            <Logo variant="light" />
            <p className="text-ivory/70 text-sm leading-relaxed max-w-sm font-body mt-2">
              The premier operations and community tournament platform. High-energy sports leagues, curated vendor markets, and championship events.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-headline tracking-widest text-ivory/50 uppercase mb-2">
              Platform
            </h4>
            <Link href="/events" className="text-sm text-ivory/80 hover:text-gold transition-colors">
              Events Calendar
            </Link>
            <Link href="/sports" className="text-sm text-ivory/80 hover:text-gold transition-colors">
              Sports & Leagues
            </Link>
            <Link href="/vendors" className="text-sm text-ivory/80 hover:text-gold transition-colors">
              Vendor Market
            </Link>
            <Link href="/sponsors" className="text-sm text-ivory/80 hover:text-gold transition-colors">
              Sponsorships
            </Link>
            <Link href="/gallery" className="text-sm text-ivory/80 hover:text-gold transition-colors">
              Media Gallery
            </Link>
          </div>

          {/* Connect / Actions */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-headline tracking-widest text-ivory/50 uppercase mb-2">
              Connect
            </h4>
            <Link href="/events/submit" className="text-sm text-ivory/80 hover:text-gold transition-colors">
              Submit Event
            </Link>
            <Link href="/vendors/apply" className="text-sm text-ivory/80 hover:text-gold transition-colors">
              Vendor Application
            </Link>
            <Link href="/calendar.ics" className="text-sm text-ivory/80 hover:text-gold transition-colors">
              iCal Feed (.ics)
            </Link>
            <Link href="/join" className="text-sm text-ivory/80 hover:text-gold transition-colors">
              Mailing List
            </Link>
          </div>

          {/* Email capture lives once on the page, in the closing panel */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-headline tracking-widest text-ivory/50 uppercase mb-2">
              Get the schedule
            </h4>
            <p className="text-xs text-ivory/70 leading-relaxed font-body max-w-sm">
              We email when registration opens for a tournament, and when vendor slots go live.
            </p>
            <Button asChild variant="primary" size="default" className="mt-2 self-start">
              <Link href="/join">Join the list</Link>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-ivory/50 font-body text-center sm:text-left">
          <p>© {new Date().getFullYear()} GAMEDAY. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-ivory transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ivory transition-colors">
              Terms of Service
            </Link>
            <Link href="/refunds" className="hover:text-ivory transition-colors">
              Refunds & Waivers
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
