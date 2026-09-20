"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import type { GamedayEvent } from "@/lib/events/data";
import { toggleEventPublishStatus } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ExternalLink,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EventOperationsTableProps {
  initialEvents: GamedayEvent[];
}

export function EventOperationsTable({ initialEvents }: EventOperationsTableProps) {
  const [events, setEvents] = useState<GamedayEvent[]>(initialEvents);
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredEvents = events.filter((e) => {
    if (statusFilter === "all") return true;
    return e.status === statusFilter;
  });

  const handleToggle = async (eventId: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    const res = await toggleEventPublishStatus(eventId, newStatus === "published");
    if (res.success) {
      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, status: newStatus as typeof e.status } : e))
      );
      setFeedback(`Event status updated to ${newStatus}.`);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 border-b border-ink/15 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={cn(
              "px-4 py-2 text-xs font-headline uppercase tracking-wider border-2 transition-colors",
              statusFilter === "all"
                ? "bg-ink text-ivory border-ink"
                : "bg-white text-ink/70 border-ink/15 hover:border-ink/40"
            )}
          >
            All Events ({events.length})
          </button>
          <button
            onClick={() => setStatusFilter("published")}
            className={cn(
              "px-4 py-2 text-xs font-headline uppercase tracking-wider border-2 transition-colors",
              statusFilter === "published"
                ? "bg-gold text-ink border-gold font-bold"
                : "bg-white text-ink/70 border-ink/15 hover:border-ink/40"
            )}
          >
            Published ({events.filter((e) => e.status === "published").length})
          </button>
          <button
            onClick={() => setStatusFilter("draft")}
            className={cn(
              "px-4 py-2 text-xs font-headline uppercase tracking-wider border-2 transition-colors",
              statusFilter === "draft"
                ? "bg-ink/60 text-ivory border-ink/60 font-bold"
                : "bg-white text-ink/70 border-ink/15 hover:border-ink/40"
            )}
          >
            Drafts ({events.filter((e) => e.status === "draft").length})
          </button>
        </div>

        {feedback && (
          <div className="text-xs text-green-700 font-body flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>{feedback}</span>
          </div>
        )}
      </div>

      {/* Events Table */}
      <div className="border-2 border-ink/15 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-xs font-body">
            <thead className="bg-ink/[0.03] border-b border-ink/10 uppercase font-headline tracking-wider text-[11px] text-ink/60">
              <tr>
                <th className="py-3.5 px-4">Event Details</th>
                <th className="py-3.5 px-4">Type & Venue</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Vendors</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {filteredEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-ink/[0.01] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-ink">
                    <span className="font-headline uppercase text-sm block tracking-wide">
                      {evt.title}
                    </span>
                    <span className="text-[11px] text-ink/50 block mt-0.5 truncate max-w-xs">
                      {evt.description}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-headline uppercase bg-ink/5 px-2 py-0.5 text-ink/70 inline-block mb-1">
                      {evt.type}
                    </span>
                    <span className="text-xs text-ink/70 block truncate max-w-[180px]">
                      {evt.venueName}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-ink/70 whitespace-nowrap">
                    <span className="block font-medium">
                      {format(new Date(evt.startsAt), "MMM d, yyyy")}
                    </span>
                    <span className="text-[11px] text-ink/50">
                      {format(new Date(evt.startsAt), "h:mm a")}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    {evt.acceptsVendors ? (
                      <span className="inline-flex items-center gap-1 text-green-700 font-medium text-[11px]">
                        <Store className="w-3 h-3 text-green-600" />
                        Enabled
                      </span>
                    ) : (
                      <span className="text-ink/40 text-[11px]">Disabled</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    {evt.status === "published" ? (
                      <span className="px-2.5 py-1 bg-green-100 border border-green-300 text-green-900 text-[10px] font-headline uppercase tracking-wider">
                        Published
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-ink/10 text-ink/70 text-[10px] font-headline uppercase tracking-wider">
                        Draft
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleToggle(evt.id, evt.status)}
                        className="text-[11px] h-8 border-ink/20"
                      >
                        {evt.status === "published" ? "Unpublish" : "Publish"}
                      </Button>

                      <Button asChild size="sm" variant="outline" className="text-[11px] h-8">
                        <Link href={`/events/${evt.slug}`} target="_blank">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
