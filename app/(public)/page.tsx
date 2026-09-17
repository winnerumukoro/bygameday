import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trophy, Store, Users, Calendar, Sparkles, CheckCircle2 } from "lucide-react";
import { Hero } from "@/components/brand/hero";
import { SectionHeader } from "@/components/brand/section-header";
import { EventCard } from "@/components/brand/event-card";
import { NewsletterForm } from "@/components/brand/newsletter-form";

const UPCOMING_EVENTS = [
  {
    slug: "interhouse-basketball-2026",
    title: "Interhouse 5v5 Basketball Championship",
    type: "Interhouse",
    dateDisplay: "Sat, Apr 11, 2026",
    locationDisplay: "Rucker Fieldhouse, NY",
    imageSrc:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
    acceptsVendors: true,
  },
  {
    slug: "midnight-1v1-streetball-clash",
    title: "Midnight 1v1 Streetball Showcase",
    type: "1v1 Clash",
    dateDisplay: "Fri, Apr 24, 2026",
    locationDisplay: "West 4th Courts, NY",
    imageSrc:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop",
    acceptsVendors: false,
  },
  {
    slug: "spring-tailgate-viewing-party",
    title: "Spring Championship Viewing Party & Market",
    type: "Viewing Party",
    dateDisplay: "Sun, May 3, 2026",
    locationDisplay: "Pier 57 Rooftop, NY",
    imageSrc:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop",
    acceptsVendors: true,
  },
  {
    slug: "metro-volleyball-classic",
    title: "Metro Intramural Sand Volleyball Classic",
    type: "Intramural",
    dateDisplay: "Sat, May 16, 2026",
    locationDisplay: "Hudson River Park, NY",
    imageSrc:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop",
    acceptsVendors: true,
  },
];

const GALLERY_PREVIEW = [
  {
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop",
    alt: "Game intensity",
  },
  {
    src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop",
    alt: "Scoreboard moment",
  },
  {
    src: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=600&auto=format&fit=crop",
    alt: "Crowd celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop",
    alt: "Sideline energy",
  },
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop",
    alt: "Artisan food vendor",
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop",
    alt: "Tailgate festival vibes",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-ivory text-ink">
      {/* 1. Live Construction & Client Progress Announcement Banner */}
      <aside aria-label="Build Status" className="w-full bg-ink text-ivory border-b border-ivory/15 py-2.5 px-4 text-center z-40 relative">
        <div className="max-w-stadium mx-auto flex items-center justify-center gap-2 sm:gap-4 text-xs font-headline uppercase tracking-wider flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-gold">
            <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
            <span className="font-bold">LIVE PREVIEW</span>
          </span>
          <span className="hidden sm:inline text-ivory/40">•</span>
          <span className="text-ivory/90">PLATFORM IN ACTIVE DEVELOPMENT — REGULAR UPDATES ROLLING OUT</span>
          <span className="hidden sm:inline text-ivory/40">•</span>
          <span className="text-gold font-bold">NEXT UP: CALENDAR & VENDOR ENGINE</span>
        </div>
      </aside>

      {/* 2. Full-bleed Hero */}
      <Hero
        title="COMPETE. CONNECT. CELEBRATE."
        subtitle="High-octane sports tournaments, single-elimination brackets, and curated community markets. Built for athletes, creators, and fans."
        ctaText="EXPLORE CALENDAR"
        ctaHref="#events"
      />

      {/* 3. Progress / Client Roadmap Bar */}
      <section className="bg-ink text-ivory border-y border-ivory/15 py-8 px-4 sm:px-6 lg:px-12">
        <div className="max-w-stadium mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/20 border border-gold flex items-center justify-center text-gold">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div>
                <span className="text-xs font-headline uppercase tracking-widest text-gold">
                  Client Project Tracker
                </span>
                <h2 className="text-xl sm:text-2xl font-headline uppercase text-ivory leading-tight">
                  GAMEDAY Web Platform Deployment
                </h2>
              </div>
            </div>

            {/* Phase chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-headline uppercase">
              <div className="border border-gold bg-gold/10 px-3 py-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span className="text-gold">Phase 1: Foundation</span>
              </div>
              <div className="border border-ivory/20 bg-ivory/5 px-3 py-2 flex items-center gap-2 text-ivory/70">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                <span>Phase 2: Calendar</span>
              </div>
              <div className="border border-ivory/10 px-3 py-2 text-ivory/40">
                <span>Phase 3: Vendors & Pay</span>
              </div>
              <div className="border border-ivory/10 px-3 py-2 text-ivory/40">
                <span>Phase 4: Brackets</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Upcoming Events Section */}
      <section id="events" className="py-20 md:py-32 max-w-stadium mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <SectionHeader
          title="UPCOMING CALENDAR"
          subtitle="Tournaments, Showdowns & Viewing Parties"
          viewAllHref="/events"
          viewAllText="FULL 2026 SCHEDULE"
        />

        {/* Product Tile Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {UPCOMING_EVENTS.map((event) => (
            <EventCard key={event.slug} {...event} />
          ))}
        </div>
      </section>

      {/* 5. Split Feature Blocks (Nike Style: Big Image + Heavy Headline + Link) */}
      <section className="bg-ink text-ivory py-20 md:py-32 w-full border-t border-ink">
        <div className="max-w-stadium mx-auto px-4 sm:px-6 lg:px-12">
          <div className="mb-16 md:mb-24">
            <span className="text-xs font-headline tracking-widest uppercase text-gold">
              Core Operations
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-headline uppercase tracking-tight text-ivory mt-2">
              BUILT FOR GAME DAY EXCELLENCE
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Feature 1: Sports & Tournaments */}
            <Link
              href="/sports"
              className="group flex flex-col bg-ivory/5 border border-ivory/10 p-6 md:p-8 justify-between min-h-[480px] relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <div className="relative z-10">
                <Trophy className="w-10 h-10 text-gold mb-6" />
                <span className="text-xs font-headline tracking-widest uppercase text-ivory/60">
                  Competitive Leagues
                </span>
                <h3 className="text-3xl sm:text-4xl font-headline uppercase text-ivory mt-2 leading-tighter">
                  1V1 & INTRAMURAL BRACKETS
                </h3>
                <p className="text-sm text-ivory/70 font-body mt-4 leading-relaxed">
                  Single-elimination live brackets, captain team management, seed calculations, and automated waitlist promotions.
                </p>
              </div>

              <div className="relative z-10 pt-8 border-t border-ivory/10 flex items-center justify-between">
                <span className="text-xs font-headline uppercase tracking-wider text-gold group-hover:underline">
                  Explore Sports & Divisions
                </span>
                <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Feature 2: Vendor Marketplace */}
            <Link
              href="/vendors"
              className="group flex flex-col bg-ivory/5 border border-ivory/10 p-6 md:p-8 justify-between min-h-[480px] relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <div className="relative z-10">
                <Store className="w-10 h-10 text-gold mb-6" />
                <span className="text-xs font-headline tracking-widest uppercase text-ivory/60">
                  Zero Competing Offerings
                </span>
                <h3 className="text-3xl sm:text-4xl font-headline uppercase text-ivory mt-2 leading-tighter">
                  CURATED VENDOR MARKET
                </h3>
                <p className="text-sm text-ivory/70 font-body mt-4 leading-relaxed">
                  Subcategory-locked capacity engine guarantees exclusivity. Multi-step applications, photo portfolios, automated approval holds, and Stripe checkout.
                </p>
              </div>

              <div className="relative z-10 pt-8 border-t border-ivory/10 flex items-center justify-between">
                <span className="text-xs font-headline uppercase tracking-wider text-gold group-hover:underline">
                  Vendor Application Portal
                </span>
                <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Feature 3: Sponsorships & Community */}
            <Link
              href="/sponsors"
              className="group flex flex-col bg-ivory/5 border border-ivory/10 p-6 md:p-8 justify-between min-h-[480px] relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <div className="relative z-10">
                <Users className="w-10 h-10 text-gold mb-6" />
                <span className="text-xs font-headline tracking-widest uppercase text-ivory/60">
                  Sponsors & Community
                </span>
                <h3 className="text-3xl sm:text-4xl font-headline uppercase text-ivory mt-2 leading-tighter">
                  SPONSOR PARTNERSHIPS
                </h3>
                <p className="text-sm text-ivory/70 font-body mt-4 leading-relaxed">
                  Custom tiered partner activation, audience analytics, community event submission pipelines, and branded media coverage.
                </p>
              </div>

              <div className="relative z-10 pt-8 border-t border-ivory/10 flex items-center justify-between">
                <span className="text-xs font-headline uppercase tracking-wider text-gold group-hover:underline">
                  Partner With Us
                </span>
                <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. High-Impact Stat Counters */}
      <section className="py-20 md:py-28 bg-ivory border-b border-ink/10">
        <div className="max-w-stadium mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl md:text-7xl font-headline text-ink leading-none">
                24+
              </span>
              <span className="text-xs sm:text-sm font-headline uppercase tracking-widest text-ink/60 mt-2">
                Events & Tournaments
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl md:text-7xl font-headline text-ink leading-none">
                60+
              </span>
              <span className="text-xs sm:text-sm font-headline uppercase tracking-widest text-ink/60 mt-2">
                Curated Vendors
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl md:text-7xl font-headline text-ink leading-none">
                1,800+
              </span>
              <span className="text-xs sm:text-sm font-headline uppercase tracking-widest text-ink/60 mt-2">
                Rostered Athletes
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl md:text-7xl font-headline text-ink leading-none">
                100%
              </span>
              <span className="text-xs sm:text-sm font-headline uppercase tracking-widest text-ink/60 mt-2">
                Capacity Guaranteed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Gallery Strip (Atmosphere & Energy) */}
      <section className="py-20 md:py-32 max-w-stadium mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <SectionHeader
          title="THE ATMOSPHERE"
          subtitle="Gameday Moments & Community Energy"
          viewAllHref="/gallery"
          viewAllText="VIEW ALL MEDIA"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {GALLERY_PREVIEW.map((item, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden bg-ink/10 group cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      {/* 8. VIP Access / Mailing List Banner */}
      <section className="bg-ink text-ivory py-20 md:py-32 border-t border-ivory/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 bg-ivory/10 px-3 py-1.5 border border-ivory/20">
            <Calendar className="w-4 h-4 text-gold" />
            <span className="text-xs font-headline uppercase tracking-widest text-gold">
              Priority Launch Access
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-headline uppercase tracking-tight text-ivory leading-tighter">
            NEVER MISS A TOURNAMENT DROP
          </h2>

          <p className="text-sm sm:text-base text-ivory/75 font-body max-w-xl leading-relaxed">
            Team rosters fill within hours. Join the official GAMEDAY dispatch for early registration windows, bracket reveals, and exclusive vendor drops.
          </p>

          <div className="w-full max-w-md mt-4">
            <NewsletterForm buttonText="GET NOTIFIED" />
          </div>

          <p className="text-xs text-ivory/40 uppercase tracking-wider">
            No spam. Strictly tournament drops and schedule alerts.
          </p>
        </div>
      </section>
    </div>
  );
}
