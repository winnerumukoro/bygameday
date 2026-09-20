import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/brand/section-header";
import { VendorCategoryBrowser } from "@/components/vendors/vendor-category-browser";
import {
  getVendorCategories,
  VENDOR_SUBCATEGORIES,
  getVendorAcceptingEvents,
  formatCurrency,
} from "@/lib/vendors/data";
import {
  ShieldCheck,
  Zap,
  Users,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Vendor Marketplace — GAMEDAY",
  description:
    "Apply for curated vendor slots at GAMEDAY tournaments and events. Category exclusivity guaranteed — food trucks, apparel, and experiential brands.",
};

export default function VendorsPage() {
  const categories = getVendorCategories();
  const vendorEvents = getVendorAcceptingEvents();

  return (
    <div className="pt-24 pb-24 bg-ivory">
      {/* ────────────── HERO SECTION ────────────── */}
      <section className="relative overflow-hidden bg-ink text-ivory py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-12">
        {/* Subtle decorative stadium grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative max-w-stadium mx-auto">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-headline uppercase tracking-tight leading-tighter text-ivory max-w-5xl">
            SELL AT <span className="text-gold">GAMEDAY</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-ivory/80 font-body max-w-2xl leading-relaxed">
            Bring your food truck, coffee cart, or local brand to weekend tournaments in Austin. We take one vendor per food category per event, so you&apos;re never parked next to someone selling the same thing.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href="/vendors/apply">Apply For A Slot</Link>
            </Button>
            <Button asChild variant="secondaryLight" size="lg">
              <a href="#categories">Browse Specialties</a>
            </Button>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-16 sm:mt-20 pt-8 border-t border-ivory/15 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <span className="block text-3xl sm:text-4xl font-headline text-gold">1 per type</span>
              <span className="text-xs font-headline uppercase tracking-wider text-ivory/60 mt-1 block">
                No Duplicate Menus
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-headline text-gold">$0</span>
              <span className="text-xs font-headline uppercase tracking-wider text-ivory/60 mt-1 block">
                Free To Apply
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-headline text-gold">48h</span>
              <span className="text-xs font-headline uppercase tracking-wider text-ivory/60 mt-1 block">
                Hold Window If Selected
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-headline text-gold">10x10</span>
              <span className="text-xs font-headline uppercase tracking-wider text-ivory/60 mt-1 block">
                Pitch Space
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── HOW IT WORKS ────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-12 max-w-stadium mx-auto border-b border-ink/15">
        <SectionHeader
          subtitle="Simple 4-Step Pipeline"
          title="HOW THE MARKETPLACE WORKS"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="border-2 border-ink/15 p-6 bg-white relative">
            <div className="w-8 h-8 bg-ink text-ivory font-headline flex items-center justify-center text-sm mb-4">
              01
            </div>
            <h3 className="font-headline text-xl uppercase tracking-wider text-ink mb-2">
              Apply Online
            </h3>
            <p className="text-sm text-ink/70 font-body leading-relaxed">
              Submit your brand profile, signature products, and select one or more target tournament dates. No fee is required to apply.
            </p>
          </div>

          <div className="border-2 border-ink/15 p-6 bg-white relative">
            <div className="w-8 h-8 bg-ink text-ivory font-headline flex items-center justify-center text-sm mb-4">
              02
            </div>
            <h3 className="font-headline text-xl uppercase tracking-wider text-ink mb-2">
              Curated Review
            </h3>
            <p className="text-sm text-ink/70 font-body leading-relaxed">
              Our event committee reviews submissions to ensure category fit, aesthetic alignment, and strict single-category exclusivity.
            </p>
          </div>

          <div className="border-2 border-ink/15 p-6 bg-white relative">
            <div className="w-8 h-8 bg-gold text-ink font-headline flex items-center justify-center text-sm mb-4">
              03
            </div>
            <h3 className="font-headline text-xl uppercase tracking-wider text-ink mb-2">
              Lock In & Pay
            </h3>
            <p className="text-sm text-ink/70 font-body leading-relaxed">
              Approved vendors receive a private, single-use payment link valid for 48 hours to lock in their slot via secure Stripe checkout.
            </p>
          </div>

          <div className="border-2 border-ink/15 p-6 bg-white relative">
            <div className="w-8 h-8 bg-ink text-ivory font-headline flex items-center justify-center text-sm mb-4">
              04
            </div>
            <h3 className="font-headline text-xl uppercase tracking-wider text-ink mb-2">
              Load In & Sell
            </h3>
            <p className="text-sm text-ink/70 font-body leading-relaxed">
              Receive your load-in packet, designated booth spot, electrical access, and on-site staff support on tournament day.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────── CATEGORIES EXPLORER ────────────── */}
      <section id="categories" className="py-20 md:py-28 px-4 sm:px-6 lg:px-12 max-w-stadium mx-auto border-b border-ink/15">
        <SectionHeader
          subtitle="Explore Specialties"
          title="MARKETPLACE CATEGORIES"
          viewAllHref="/vendors/apply"
          viewAllText="APPLY NOW"
        />

        <VendorCategoryBrowser
          categories={categories}
          subcategories={VENDOR_SUBCATEGORIES}
          events={vendorEvents}
        />
      </section>

      {/* ────────────── OPEN EVENTS FOR VENDORS ────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-12 max-w-stadium mx-auto border-b border-ink/15">
        <SectionHeader
          subtitle="Upcoming Tournament Dates"
          title="EVENTS ACCEPTING VENDORS"
          viewAllHref="/events"
          viewAllText="ALL EVENTS"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendorEvents.map((evt) => {
            const openSlots = evt.slots.reduce((acc, curr) => acc + curr.available, 0);

            return (
              <div
                key={evt.id}
                className="border-2 border-ink/15 bg-white flex flex-col justify-between overflow-hidden group hover:border-ink transition-colors"
              >
                <div>
                  {/* Event thumbnail */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={evt.coverImagePath}
                      alt={evt.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-ink text-ivory text-[10px] font-headline uppercase px-2.5 py-1 tracking-wider">
                      {evt.type}
                    </div>
                    {openSlots > 0 ? (
                      <div className="absolute top-3 right-3 bg-gold text-ink text-[10px] font-headline uppercase px-2.5 py-1 tracking-wider font-bold">
                        {openSlots} Slots Open
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 bg-ink/80 text-ivory text-[10px] font-headline uppercase px-2.5 py-1 tracking-wider">
                        Waitlist Only
                      </div>
                    )}
                  </div>

                  {/* Event content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-ink/60 font-body mb-2">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        {format(new Date(evt.startsAt), "MMM d, yyyy")}
                      </span>
                      <span className="inline-flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-gold" />
                        {evt.venueName}
                      </span>
                    </div>

                    <h3 className="text-xl font-headline uppercase tracking-tight text-ink mb-3 line-clamp-1">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-ink/70 font-body mb-4 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>

                    {/* Fees summary */}
                    <div className="py-3 px-3.5 bg-ink/[0.03] border border-ink/10 flex items-center justify-between text-xs font-body mb-4">
                      <span className="text-ink/60">Permit Fee Range:</span>
                      <span className="font-headline text-ink text-sm">
                        {formatCurrency(evt.feeRange.min)} – {formatCurrency(evt.feeRange.max)}
                      </span>
                    </div>

                    {/* Open subcategories tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {evt.slots.slice(0, 3).map((slot) => (
                        <span
                          key={slot.subcategoryId}
                          className="text-[10px] font-body bg-white border border-ink/15 px-2 py-0.5 text-ink/70"
                        >
                          {slot.subcategoryName} ({slot.available})
                        </span>
                      ))}
                      {evt.slots.length > 3 && (
                        <span className="text-[10px] font-body text-ink/50 px-1 py-0.5">
                          +{evt.slots.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Button asChild variant="secondary" className="w-full gap-2">
                    <Link href={`/vendors/apply?event=${evt.id}`}>
                      Apply For This Event
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ────────────── VENDOR BENEFITS ────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-12 max-w-stadium mx-auto">
        <SectionHeader
          subtitle="The GAMEDAY Advantage"
          title="WHY PARTNER WITH US"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border-2 border-ink/15 p-6 bg-white">
            <div className="w-10 h-10 bg-gold/15 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-ink" />
            </div>
            <h4 className="font-headline text-lg uppercase tracking-wider text-ink mb-2">
              Category Exclusivity
            </h4>
            <p className="text-xs text-ink/70 font-body leading-relaxed">
              We never double-book subcategories. If you sell smash burgers, you are the only burger vendor on the court concourse.
            </p>
          </div>

          <div className="border-2 border-ink/15 p-6 bg-white">
            <div className="w-10 h-10 bg-gold/15 flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-ink" />
            </div>
            <h4 className="font-headline text-lg uppercase tracking-wider text-ink mb-2">
              Concentrated Footprint
            </h4>
            <p className="text-xs text-ink/70 font-body leading-relaxed">
              Our tournaments are intense 4-to-8 hour high-traffic events where athletes and crowds remain on-site throughout the day.
            </p>
          </div>

          <div className="border-2 border-ink/15 p-6 bg-white">
            <div className="w-10 h-10 bg-gold/15 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-ink" />
            </div>
            <h4 className="font-headline text-lg uppercase tracking-wider text-ink mb-2">
              Digital Spotlight
            </h4>
            <p className="text-xs text-ink/70 font-body leading-relaxed">
              Every confirmed vendor is featured on our official event guide, tournament program, and social story shoutouts leading up to the game.
            </p>
          </div>

          <div className="border-2 border-ink/15 p-6 bg-white">
            <div className="w-10 h-10 bg-gold/15 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-ink" />
            </div>
            <h4 className="font-headline text-lg uppercase tracking-wider text-ink mb-2">
              Zero Friction Setup
            </h4>
            <p className="text-xs text-ink/70 font-body leading-relaxed">
              Dedicated load-in managers, clear vehicle arrival windows, waste disposal management, and reliable electrical distribution.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────── BOTTOM CALL TO ACTION ────────────── */}
      <section className="bg-ink text-ivory py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-stadium mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-xs font-headline uppercase tracking-widest text-gold block mb-2">
              Spring 2026 Slots Open
            </span>
            <h2 className="text-3xl sm:text-5xl font-headline uppercase tracking-tight text-ivory">
              READY TO BRING YOUR BRAND COURTSIDE?
            </h2>
            <p className="text-sm text-ivory/70 font-body max-w-xl mt-2">
              Applications are reviewed on a rolling basis. Due to exclusivity rules, slots fill rapidly.
            </p>
          </div>

          <Button asChild variant="primary" size="lg" className="flex-shrink-0">
            <Link href="/vendors/apply">Apply Now — Free Submission</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
