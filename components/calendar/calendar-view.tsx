"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { GamedayEvent } from "@/lib/events/data";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

// Dynamically import FullCalendar to prevent any SSR hydration mismatch
const FullCalendar = dynamic(
  () => import("@fullcalendar/react"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center bg-ink/5 border border-ink/10">
        <span className="text-xs font-headline uppercase tracking-widest text-ink/60 animate-pulse">
          Loading Tournament Calendar...
        </span>
      </div>
    ),
  }
);

interface CalendarViewProps {
  events: GamedayEvent[];
}

export function CalendarView({ events }: CalendarViewProps) {
  const router = useRouter();
  const [isCompact, setIsCompact] = React.useState(false);

  // Below sm the month grid cells are too narrow to read — fall back to the
  // agenda list and drop the view buttons that will not fit the toolbar.
  React.useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const apply = () => setIsCompact(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const calendarEvents = React.useMemo(() => {
    return events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.startsAt,
      end: event.endsAt,
      extendedProps: {
        slug: event.slug,
        type: event.type,
        venue: event.venueName,
      },
    }));
  }, [events]);

  return (
    <div className="w-full bg-ivory border border-ink/15 p-4 sm:p-6 overflow-hidden gameday-fullcalendar">
      <style jsx global>{`
        .gameday-fullcalendar .fc {
          font-family: var(--font-inter), sans-serif;
          --fc-border-color: rgba(0, 0, 0, 0.12);
          --fc-button-bg-color: #000000;
          --fc-button-border-color: #000000;
          --fc-button-hover-bg-color: #C89A2B;
          --fc-button-hover-border-color: #C89A2B;
          --fc-button-active-bg-color: #C89A2B;
          --fc-button-active-border-color: #C89A2B;
          --fc-today-bg-color: rgba(200, 154, 43, 0.08);
          --fc-event-bg-color: #000000;
          --fc-event-border-color: #000000;
          --fc-event-text-color: #F5F4EB;
        }

        .gameday-fullcalendar .fc-toolbar-title {
          font-family: var(--font-anton), Impact, sans-serif !important;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          font-size: 1.5rem !important;
          color: #000000;
        }

        @media (min-width: 640px) {
          .gameday-fullcalendar .fc-toolbar-title {
            font-size: 2rem !important;
          }
        }

        .gameday-fullcalendar .fc-toolbar.fc-header-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem !important;
        }

        @media (max-width: 639px) {
          .gameday-fullcalendar .fc-toolbar.fc-header-toolbar {
            justify-content: space-between;
          }

          .gameday-fullcalendar .fc-toolbar-chunk {
            flex: 0 0 auto;
          }

          /* Title takes its own row so the controls never crush it */
          .gameday-fullcalendar .fc-toolbar-chunk:nth-child(2) {
            order: -1;
            flex: 1 0 100%;
          }

          .gameday-fullcalendar .fc-button {
            font-size: 0.65rem !important;
            padding: 0.45rem 0.6rem !important;
          }

          .gameday-fullcalendar .fc-list-event-title {
            font-size: 0.85rem;
          }
        }

        .gameday-fullcalendar .fc-button {
          font-family: var(--font-anton), Impact, sans-serif !important;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.75rem !important;
          padding: 0.5rem 0.85rem !important;
          border-radius: 0px !important;
          min-height: 38px;
        }

        .gameday-fullcalendar .fc-col-header-cell-cushion {
          font-family: var(--font-anton), Impact, sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(0, 0, 0, 0.6);
          font-size: 0.8rem;
          padding: 8px 0 !important;
        }

        .gameday-fullcalendar .fc-daygrid-day-number {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.75);
          padding: 6px 8px !important;
        }

        .gameday-fullcalendar .fc-event {
          border-radius: 0px !important;
          padding: 2px 4px !important;
          cursor: pointer;
          transition: transform 0.15s ease, background-color 0.15s ease;
        }

        .gameday-fullcalendar .fc-event:hover {
          background-color: #C89A2B !important;
          border-color: #C89A2B !important;
          transform: scale(1.02);
        }

        .gameday-fullcalendar .fc-event-title {
          font-family: var(--font-anton), Impact, sans-serif;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.02em;
        }

        .gameday-fullcalendar .fc-list-event {
          cursor: pointer;
        }

        .gameday-fullcalendar .fc-list-event:hover td {
          background-color: rgba(200, 154, 43, 0.15) !important;
        }

        .gameday-fullcalendar .fc-list-event-title {
          font-family: var(--font-anton), Impact, sans-serif;
          text-transform: uppercase;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
        }

        .gameday-fullcalendar .fc-list-day-text {
          font-family: var(--font-anton), Impact, sans-serif;
          text-transform: uppercase;
        }
      `}</style>

      <FullCalendar
        // Unavoidable external type conflict: @fullcalendar/core types PluginDef.premiumReleaseDate as Date while @fullcalendar/react types PluginInput as string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin] as any}
        key={isCompact ? "compact" : "wide"}
        initialView={isCompact ? "listMonth" : "dayGridMonth"}
        headerToolbar={
          isCompact
            ? { left: "prev,next", center: "title", right: "dayGridMonth,listMonth" }
            : { left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,listMonth" }
        }

        events={calendarEvents}
        eventClick={(info) => {
          const slug = info.event.extendedProps.slug;
          if (slug) {
            router.push(`/events/${slug}`);
          }
        }}
        height="auto"
        aspectRatio={1.5}
        dayMaxEvents={3}
      />
    </div>
  );
}
