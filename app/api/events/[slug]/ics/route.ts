import { NextRequest, NextResponse } from "next/server";
import ical from "ical-generator";
import { getEventBySlug } from "@/lib/events/data";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const event = getEventBySlug(slug);

  if (!event) {
    return new NextResponse("Event not found", { status: 404 });
  }

  const calendar = ical({
    name: `GAMEDAY - ${event.title}`,
  });

  calendar.createEvent({
    id: event.id,
    start: new Date(event.startsAt),
    end: new Date(event.endsAt),
    summary: event.title,
    description: `${event.description}\n\nLocation: ${event.venueName}\nhttps://bygameday.com/events/${event.slug}`,
    location: `${event.venueName}, ${event.address}`,
    url: `https://bygameday.com/events/${event.slug}`,
    timezone: event.timezone,
  });

  return new NextResponse(calendar.toString(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.slug}.ics"`,
    },
  });
}
