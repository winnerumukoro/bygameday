"use client";

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
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-headline uppercase tracking-widest text-gold">
                Live Development Preview
              </span>
            </div>
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

          {/* Mailing List Mini-Block */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-headline tracking-widest text-ivory/50 uppercase mb-2">
              Stay In The Game
            </h4>
            <p className="text-xs text-ivory/70 leading-relaxed font-body">
              Be the first to know when tournament registrations, vendor windows, and tickets drop.
            </p>
            {/* Stacks until lg — the column is only 4/12 wide at md and cannot fit a row */}
            <form className="flex flex-col lg:flex-row gap-2 mt-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full min-w-0 flex-grow bg-ivory/10 border border-ivory/20 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:ring-2 focus:ring-gold min-h-[48px] rounded-none"
                aria-label="Email address for updates"
              />
              <Button type="submit" variant="primary" size="default" className="shrink-0 whitespace-nowrap">
                Subscribe
              </Button>
            </form>
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
