"use client";

import * as React from "react";
import { Calendar, Download, ExternalLink } from "lucide-react";
import { GamedayEvent } from "@/lib/events/data";
import { Button } from "@/components/ui/button";

interface AddToCalendarDropdownProps {
  event: GamedayEvent;
}

export function AddToCalendarDropdown({ event }: AddToCalendarDropdownProps) {
  const [open, setOpen] = React.useState(false);

  // Format UTC dates for Google Calendar URL: YYYYMMDDTHHmmssZ
  const formatUtcForGoogle = (isoString: string) => {
    return isoString.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  };

  const googleStart = formatUtcForGoogle(new Date(event.startsAt).toISOString());
  const googleEnd = formatUtcForGoogle(new Date(event.endsAt).toISOString());

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&dates=${googleStart}/${googleEnd}&details=${encodeURIComponent(
    `${event.description}\n\nEvent Type: ${event.type}\nView details: https://bygameday.com/events/${event.slug}`
  )}&location=${encodeURIComponent(`${event.venueName}, ${event.address}`)}`;

  const icsDownloadUrl = `/api/events/${event.slug}/ics`;

  return (
    <div className="relative w-full">
      <Button
        type="button"
        variant="secondaryLight"
        size="default"
        onClick={() => setOpen(!open)}
        className="w-full justify-between min-h-[44px] text-xs"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gold" />
          <span>Add to Calendar</span>
        </span>
        <span className="text-xs">▾</span>
      </Button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-ink border border-ivory/20 p-2 z-40 shadow-xl flex flex-col gap-1">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 text-xs text-ivory hover:bg-ivory/10 transition-colors font-headline uppercase tracking-wider"
          >
            <span>Google Calendar</span>
            <ExternalLink className="w-3.5 h-3.5 text-gold" />
          </a>

          <a
            href={icsDownloadUrl}
            download={`${event.slug}.ics`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 text-xs text-ivory hover:bg-ivory/10 transition-colors font-headline uppercase tracking-wider"
          >
            <span>Apple / Outlook (.ics)</span>
            <Download className="w-3.5 h-3.5 text-gold" />
          </a>
        </div>
      )}
    </div>
  );
}
