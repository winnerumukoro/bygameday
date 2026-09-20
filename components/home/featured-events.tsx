import { format, parseISO } from "date-fns";
import { SectionHeader } from "@/components/brand/section-header";
import { EventCard } from "@/components/brand/event-card";
import { Reveal } from "@/components/motion/reveal";
import { getUpcomingEvents } from "@/lib/events/data";

/**
 * Next four fixtures. Swipeable snap rail on phones so the cards keep their
 * 4:5 crop instead of shrinking, then a four-up grid from lg.
 */
export function FeaturedEvents() {
  const upcomingEvents = getUpcomingEvents(4);

  return (
    <section
      id="events"
      className="relative w-full py-16 sm:py-20 md:py-32 max-w-stadium mx-auto px-4 sm:px-6 lg:px-12"
    >
      <SectionHeader
        title="UPCOMING CALENDAR"
        subtitle="Tournaments, Showdowns & Viewing Parties"
        description="Brackets open weeks ahead and close the moment rosters fill. Lock your slot early."
        viewAllHref="/events"
        viewAllText="FULL 2026 SCHEDULE"
      />

      <div className="-mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto no-scrollbar snap-x snap-mandatory sm:overflow-visible">
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 min-w-max sm:min-w-0">
          {upcomingEvents.map((event, index) => (
            <Reveal
              key={event.slug}
              variant="up"
              delay={index * 110}
              className="w-[74vw] xs:w-[66vw] sm:w-auto shrink-0 snap-start"
            >
              <EventCard
                slug={event.slug}
                title={event.title}
                type={event.type}
                dateDisplay={format(parseISO(event.startsAt), "EEE, MMM d, yyyy")}
                locationDisplay={event.venueName}
                imageSrc={event.coverImagePath}
                acceptsVendors={event.acceptsVendors}
                index={index}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Swipe affordance, phones only */}
      <p className="sm:hidden mt-4 text-[10px] font-headline uppercase tracking-[0.25em] text-ink/40">
        Swipe for more fixtures →
      </p>
    </section>
  );
}
