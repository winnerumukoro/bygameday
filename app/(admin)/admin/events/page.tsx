import type { Metadata } from "next";
import { getAllPublishedEvents } from "@/lib/events/data";
import { EventOperationsTable } from "@/components/admin/event-operations-table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Event Operations — GAMEDAY Console",
};

export default function AdminEventsPage() {
  const events = getAllPublishedEvents({ includePast: true });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-ink/15 pb-6">
        <div>
          <span className="text-xs font-headline uppercase tracking-widest text-gold block mb-1">
            Tournament & Calendar Control
          </span>
          <h1 className="text-3xl sm:text-4xl font-headline uppercase tracking-tight text-ink">
            EVENT OPERATIONS MANAGEMENT
          </h1>
        </div>

        <Button variant="primary" size="sm" className="gap-2 text-xs">
          <Plus className="w-3.5 h-3.5" />
          Create New Event
        </Button>
      </div>

      <EventOperationsTable initialEvents={events} />
    </div>
  );
}
