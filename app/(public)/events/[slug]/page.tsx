import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { getEventBySlug, getAllPublishedEvents } from "@/lib/events/data";
import { Button } from "@/components/ui/button";
import { EventShareButton } from "@/components/events/event-share-button";
import { AddToCalendarDropdown } from "@/components/events/add-to-calendar-dropdown";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Store,
  Trophy,
  ArrowLeft,
} from "lucide-react";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const events = getAllPublishedEvents({ includePast: true });
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | GAMEDAY",
    };
  }

  return {
    title: `${event.title} | GAMEDAY Calendar`,
    description: event.description,
    openGraph: {
      title: `${event.title} | GAMEDAY`,
      description: event.description,
      images: [
        {
          url: event.coverImagePath,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // Format dates in the event's specific timezone
  const startDate = parseISO(event.startsAt);
  const endDate = parseISO(event.endsAt);
  const formattedDate = formatInTimeZone(startDate, event.timezone, "EEEE, MMMM d, yyyy");
  const formattedStartTime = formatInTimeZone(startDate, event.timezone, "h:mm a");
  const formattedEndTime = formatInTimeZone(endDate, event.timezone, "h:mm a");

  // JSON-LD Structured Data for Google Event Search Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: event.title,
    description: event.description,
    startDate: event.startsAt,
    endDate: event.endsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.venueName,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.address,
      },
    },
    image: [event.coverImagePath],
    organizer: {
      "@type": "Organization",
      name: "GAMEDAY",
      url: "https://bygameday.com",
    },
  };

  return (
    <div className="bg-ivory text-ink min-h-screen">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Full-Bleed Image Hero */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] w-full flex items-end overflow-hidden bg-ink">
        <div className="absolute inset-0 z-0">
          <Image
            src={event.coverImagePath}
            alt={event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-stadium mx-auto px-4 sm:px-6 lg:px-12 pb-12 md:pb-16 pt-32">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-headline uppercase tracking-wider text-ivory/70 hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Calendar
          </Link>

          <div className="max-w-4xl flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-gold text-ink text-xs font-headline uppercase tracking-widest px-2.5 py-1 font-bold">
                {event.type}
              </span>
              <span className="bg-ivory/20 text-ivory text-xs font-headline uppercase tracking-widest px-2.5 py-1 border border-ivory/30">
                {event.source === "gameday" ? "Official GAMEDAY" : "Community Host"}
              </span>
              {event.acceptsVendors && (
                <span className="bg-ink/80 text-gold text-xs font-headline uppercase tracking-widest px-2.5 py-1 border border-gold/40">
                  Vendor Market Active
                </span>
              )}
            </div>

            <h1
              className="text-ivory font-headline uppercase leading-tighter tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content & Operations Grid */}
      <section className="max-w-stadium mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details & Description */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Quick Meta Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-ink/5 border border-ink/10">
              {/* Date */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-headline uppercase tracking-widest text-ink/50 block">
                    Date
                  </span>
                  <span className="text-sm font-semibold text-ink block mt-0.5">
                    {formattedDate}
                  </span>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-headline uppercase tracking-widest text-ink/50 block">
                    Time & Timezone
                  </span>
                  <span className="text-sm font-semibold text-ink block mt-0.5">
                    {formattedStartTime} – {formattedEndTime} ({event.timezone})
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-headline uppercase tracking-widest text-ink/50 block">
                    Venue
                  </span>
                  <span className="text-sm font-semibold text-ink block mt-0.5">
                    {event.venueName}
                  </span>
                  <span className="text-xs text-ink/60 block mt-0.5">
                    {event.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl sm:text-3xl font-headline uppercase text-ink tracking-tight">
                ABOUT THIS EVENT
              </h2>
              <p className="text-base sm:text-lg text-ink/80 font-body leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Venue & Map Link */}
            <div className="flex flex-col gap-4 border-t border-ink/10 pt-8">
              <h3 className="text-xl font-headline uppercase text-ink tracking-tight">
                LOCATION & DIRECTIONS
              </h3>
              <div className="p-6 bg-ink text-ivory flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-headline uppercase text-ivory">
                    {event.venueName}
                  </h4>
                  <p className="text-sm text-ivory/70 font-body mt-1">
                    {event.address}
                  </p>
                </div>
                {event.mapUrl && (
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-headline uppercase tracking-wider bg-gold text-ink px-4 py-2.5 font-bold hover:bg-gold-hover transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Actions, Registration, Vendor CTAs & Share */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Action Box */}
            <div className="bg-ink text-ivory p-6 sm:p-8 border border-ivory/20 flex flex-col gap-6 sticky top-28">
              <h3 className="text-xl font-headline uppercase text-ivory tracking-tight border-b border-ivory/15 pb-4">
                EVENT ACCESS & REGISTRATION
              </h3>

              {/* Sports Registration CTA (if sports division linked) */}
              {event.sportsDivisionId && (
                <div className="flex flex-col gap-2 p-4 bg-ivory/10 border border-ivory/20">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-gold" />
                    <span className="text-xs font-headline uppercase tracking-widest text-gold">
                      Tournament Registration
                    </span>
                  </div>
                  <p className="text-xs text-ivory/80 font-body">
                    Official division: <strong>{event.sportsDivisionName}</strong>. Spots limited.
                  </p>
                  <Button asChild variant="primary" size="default" className="mt-2 w-full">
                    <Link href={`/sports/intramural/basketball`}>
                      Register Team / Player
                    </Link>
                  </Button>
                </div>
              )}

              {/* Vendor Application CTA (if event accepts vendors) */}
              {event.acceptsVendors ? (
                <div className="flex flex-col gap-3 p-4 bg-ivory/10 border border-ivory/20">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-gold" />
                    <span className="text-xs font-headline uppercase tracking-widest text-gold">
                      Vendor Opportunities
                    </span>
                  </div>
                  <p className="text-xs text-ivory/80 font-body">
                    Applications open now. Category exclusivity strictly enforced (max 1 slot per food/merch offering).
                  </p>

                  {event.vendorOpenCategories && event.vendorOpenCategories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 my-1">
                      {event.vendorOpenCategories.map((cat) => (
                        <span
                          key={cat}
                          className="text-[10px] font-headline uppercase tracking-wider bg-ivory/15 px-2 py-0.5 text-ivory/90"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}

                  <Button asChild variant="primary" size="default" className="mt-1 w-full">
                    <Link href="/vendors/apply">Apply for Vendor Permit</Link>
                  </Button>
                </div>
              ) : (
                <div className="p-3 bg-ivory/5 text-xs text-ivory/50 font-body border border-ivory/10">
                  Vendor applications are closed or not applicable for this event showcase.
                </div>
              )}

              {/* Add to Calendar Dropdown */}
              <div className="pt-2 border-t border-ivory/15 flex flex-col gap-2">
                <span className="text-xs font-headline uppercase tracking-widest text-ivory/60">
                  Calendar Sync
                </span>
                <AddToCalendarDropdown event={event} />
              </div>

              {/* Share Bar */}
              <div className="pt-4 border-t border-ivory/15 flex items-center justify-between">
                <span className="text-xs font-headline uppercase tracking-widest text-ivory/60">
                  Share Event
                </span>
                <EventShareButton title={event.title} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
