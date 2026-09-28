export interface GamedayEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  typeSlug: string;
  source: "gameday" | "community";
  status: "published" | "draft" | "cancelled";
  startsAt: string; // ISO UTC
  endsAt: string; // ISO UTC
  timezone: string;
  venueName: string;
  address: string;
  mapUrl: string;
  coverImagePath: string;
  acceptsVendors: boolean;
  vendorOpenCategories?: string[];
  sportsDivisionId?: string;
  sportsDivisionName?: string;
}

export const EVENT_TYPES = [
  { id: "interhouse", name: "Interhouse", slug: "interhouse" },
  { id: "1v1", name: "1v1 Showdown", slug: "1v1" },
  { id: "viewing-party", name: "Viewing Party", slug: "viewing-party" },
  { id: "community", name: "Community Event", slug: "community" },
] as const;

// No events are published yet. Populate from the real schedule
// before this list goes live — see the empty states in the events views.
export const SEED_EVENTS: GamedayEvent[] = [];

export interface EventFilterOptions {
  types?: string[];
  source?: "all" | "gameday" | "community";
  includePast?: boolean;
}

export function getAllPublishedEvents(options: EventFilterOptions = {}): GamedayEvent[] {
  const { types = [], source = "all", includePast = false } = options;
  const now = new Date().toISOString();

  return SEED_EVENTS.filter((event) => {
    if (event.status !== "published") return false;

    // Filter past events
    if (!includePast && event.endsAt < now) return false;

    // Filter by type
    if (types.length > 0 && !types.includes(event.typeSlug)) return false;

    // Filter by source
    if (source !== "all" && event.source !== source) return false;

    return true;
  }).sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
}

export function getEventBySlug(slug: string): GamedayEvent | undefined {
  return SEED_EVENTS.find((event) => event.slug === slug);
}

export function getUpcomingEvents(limit = 4): GamedayEvent[] {
  return getAllPublishedEvents({ includePast: false }).slice(0, limit);
}
