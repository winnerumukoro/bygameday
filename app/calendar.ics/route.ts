import { NextRequest, NextResponse } from "next/server";
import ical, { ICalCalendarMethod } from "ical-generator";
import { getAllPublishedEvents } from "@/lib/events/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const typeParam = searchParams.get("type");
  const types = typeParam ? typeParam.split(",").map((t) => t.trim().toLowerCase()) : [];

  const events = getAllPublishedEvents({
    types: types.length > 0 ? types : undefined,
    includePast: false,
  });

  const calendar = ical({
    name: "GAMEDAY Tournament & Event Calendar",
    description: "Official schedule for GAMEDAY community sports, 1v1 showdowns, and viewing parties.",
    url: "https://bygameday.com/events",
    method: ICalCalendarMethod.PUBLISH,
    ttl: 3600, // 1 hour refresh
  });

  events.forEach((event) => {
    calendar.createEvent({
      id: event.id,
      start: new Date(event.startsAt),
      end: new Date(event.endsAt),
      summary: event.title,
      description: `${event.description}\n\nEvent Type: ${event.type}\nView details: https://bygameday.com/events/${event.slug}`,
      location: `${event.venueName}, ${event.address}`,
      url: `https://bygameday.com/events/${event.slug}`,
      timezone: event.timezone,
    });
  });

  return new NextResponse(calendar.toString(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="gameday-calendar.ics"',
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
