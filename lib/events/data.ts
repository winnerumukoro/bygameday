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

// Base timestamp reference for dynamic realistic upcoming schedules
const NOW = Date.now();
const DAY = 24 * 60 * 60 * 1000;

export const SEED_EVENTS: GamedayEvent[] = [
  {
    id: "b0000000-0000-0000-0000-000000000001",
    slug: "interhouse-basketball-2026",
    title: "Interhouse 5v5 Basketball Championship",
    description:
      "The flagship 16-team double-elimination basketball tournament. High stakes, live commentary, DJ sets, courtside VIP lounge, and a curated street food market featuring exclusive local vendors.",
    type: "Interhouse",
    typeSlug: "interhouse",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 24 * DAY).toISOString(),
    endsAt: new Date(NOW + 24 * DAY + 8 * 3600 * 1000).toISOString(),
    timezone: "America/New_York",
    venueName: "Rucker Fieldhouse",
    address: "280 W 155th St, New York, NY 10039",
    mapUrl: "https://maps.google.com/?q=Rucker+Park+NY",
    coverImagePath:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
    vendorOpenCategories: ["Tacos & Mexican", "Smash Burgers", "Wings & BBQ", "Apparel"],
    sportsDivisionId: "e0000000-0000-0000-0000-000000000001",
    sportsDivisionName: "Men's Open 5v5 Intramural",
  },
  {
    id: "b0000000-0000-0000-0000-000000000002",
    slug: "midnight-1v1-streetball-clash",
    title: "Midnight 1v1 Streetball Showcase",
    description:
      "Under the floodlights. 32 elite ballers enter a single-elimination king-of-the-court battle. One trophy, winner-take-all bracket with live streaming and guest judges.",
    type: "1v1 Showdown",
    typeSlug: "1v1",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 37 * DAY).toISOString(),
    endsAt: new Date(NOW + 37 * DAY + 5 * 3600 * 1000).toISOString(),
    timezone: "America/New_York",
    venueName: "West 4th Street Courts",
    address: "West 4th St & 6th Ave, New York, NY 10014",
    mapUrl: "https://maps.google.com/?q=The+Cage+West+4th",
    coverImagePath:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: false,
    sportsDivisionId: "e0000000-0000-0000-0000-000000000002",
    sportsDivisionName: "1v1 Elite Streetball Clash",
  },
  {
    id: "b0000000-0000-0000-0000-000000000003",
    slug: "spring-tailgate-viewing-party",
    title: "Spring Championship Viewing Party & Market",
    description:
      "Massive 30-foot outdoor LED screens, artisan food trucks, craft beverage gardens, DJ sets, and rooftop lounge viewing overlooking the Hudson River.",
    type: "Viewing Party",
    typeSlug: "viewing-party",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 46 * DAY).toISOString(),
    endsAt: new Date(NOW + 46 * DAY + 7 * 3600 * 1000).toISOString(),
    timezone: "America/New_York",
    venueName: "Pier 57 Rooftop Park",
    address: "25 11th Ave, New York, NY 10011",
    mapUrl: "https://maps.google.com/?q=Pier+57+NYC",
    coverImagePath:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
    vendorOpenCategories: ["Artisan Desserts", "Craft Beverages", "Vegan", "Photography"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000004",
    slug: "metro-volleyball-classic",
    title: "Metro Intramural Sand Volleyball Classic",
    description:
      "Co-ed sand volleyball tournament with 24 teams competing across competitive and social divisions. Includes music, food concessions, and sunset finals.",
    type: "Interhouse",
    typeSlug: "interhouse",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 59 * DAY).toISOString(),
    endsAt: new Date(NOW + 59 * DAY + 6 * 3600 * 1000).toISOString(),
    timezone: "America/New_York",
    venueName: "Hudson River Park Courts",
    address: "Pier 25, New York, NY 10013",
    mapUrl: "https://maps.google.com/?q=Pier+25+Hudson+River+Park",
    coverImagePath:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
    vendorOpenCategories: ["Drinks & Smoothies", "Sporting Goods"],
    sportsDivisionId: "e0000000-0000-0000-0000-000000000003",
    sportsDivisionName: "Co-Ed Sand Volleyball 4v4",
  },
  {
    id: "b0000000-0000-0000-0000-000000000005",
    slug: "brooklyn-pickleball-open",
    title: "Brooklyn Open Pickleball Championship",
    description:
      "Singles and doubles brackets on dedicated waterside courts. Quick rallies, cold drinks, referee supervision, and customized winner paddles.",
    type: "1v1 Showdown",
    typeSlug: "1v1",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 70 * DAY).toISOString(),
    endsAt: new Date(NOW + 70 * DAY + 8 * 3600 * 1000).toISOString(),
    timezone: "America/New_York",
    venueName: "Brooklyn Bridge Park Pier 2",
    address: "Furman St, Brooklyn, NY 11201",
    mapUrl: "https://maps.google.com/?q=Pier+2+Brooklyn",
    coverImagePath:
      "https://images.unsplash.com/photo-1628891435222-065925dcb365?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
    vendorOpenCategories: ["Accessories", "Beverages"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000006",
    slug: "harlem-flag-football-bowl",
    title: "Harlem 7v7 Flag Football Summer Bowl",
    description:
      "Non-contact, high-flying flag football tournament. Trophies, cash prize for winners, high-definition highlight reels, and family-friendly side competitions.",
    type: "Interhouse",
    typeSlug: "interhouse",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 85 * DAY).toISOString(),
    endsAt: new Date(NOW + 85 * DAY + 8 * 3600 * 1000).toISOString(),
    timezone: "America/New_York",
    venueName: "Riverbank State Park",
    address: "679 Riverside Dr, New York, NY 10031",
    mapUrl: "https://maps.google.com/?q=Riverbank+State+Park",
    coverImagePath:
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
    vendorOpenCategories: ["BBQ", "Burgers", "Apparel"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000007",
    slug: "downtown-5k-community-run",
    title: "Downtown Sunset 5K & Street Festival",
    description:
      "Community road race along the harbor finishing in a closed-street block festival with live brass band, finisher medals, and community food stalls.",
    type: "Community Event",
    typeSlug: "community",
    source: "community",
    status: "published",
    startsAt: new Date(NOW + 98 * DAY).toISOString(),
    endsAt: new Date(NOW + 98 * DAY + 4 * 3600 * 1000).toISOString(),
    timezone: "America/New_York",
    venueName: "Battery Park Esplanade",
    address: "State St & Battery Pl, New York, NY 10004",
    mapUrl: "https://maps.google.com/?q=Battery+Park",
    coverImagePath:
      "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
    vendorOpenCategories: ["Recovery Drinks", "Face Paint", "Snacks"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000008",
    slug: "queens-cup-futsal-derby",
    title: "Queens Cup 5v5 Futsal Derby",
    description:
      "Fast-paced turf soccer championship. 16 squads competing for the borough trophy with pro regulation futsal goals and licensed referees.",
    type: "Interhouse",
    typeSlug: "interhouse",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 112 * DAY).toISOString(),
    endsAt: new Date(NOW + 112 * DAY + 7 * 3600 * 1000).toISOString(),
    timezone: "America/New_York",
    venueName: "Flushing Meadows Park Arena",
    address: "Flushing Meadows Corona Park, Queens, NY 11368",
    mapUrl: "https://maps.google.com/?q=Flushing+Meadows",
    coverImagePath:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
    vendorOpenCategories: ["Latin Food", "Jerseys"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000009",
    slug: "finals-viewing-bash-2026",
    title: "NBA Finals Game 7 Mega Viewing Bash",
    description:
      "Massive indoor projection screens, half-court shootouts, basketball trivia giveaways, and hot wings eating competition.",
    type: "Viewing Party",
    typeSlug: "viewing-party",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 125 * DAY).toISOString(),
    endsAt: new Date(NOW + 125 * DAY + 5 * 3600 * 1000).toISOString(),
    timezone: "America/New_York",
    venueName: "Brooklyn Navy Yard Hall",
    address: "63 Flushing Ave, Brooklyn, NY 11205",
    mapUrl: "https://maps.google.com/?q=Brooklyn+Navy+Yard",
    coverImagePath:
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
    vendorOpenCategories: ["Wings", "Burgers", "Craft Beer"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000010",
    slug: "all-city-dodgeball-classic",
    title: "All-City Glow-in-the-Dark Dodgeball",
    description:
      "Foam balls, blacklights, throwback jerseys, full festival tournament with 20 teams battling under neon strobe lighting.",
    type: "Interhouse",
    typeSlug: "interhouse",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 140 * DAY).toISOString(),
    endsAt: new Date(NOW + 140 * DAY + 6 * 3600 * 1000).toISOString(),
    timezone: "America/New_York",
    venueName: "Chelsea Piers Fieldhouse",
    address: "62 Chelsea Piers, New York, NY 10011",
    mapUrl: "https://maps.google.com/?q=Chelsea+Piers",
    coverImagePath:
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: false,
  },
  // Past event for testing the past events toggle
  {
    id: "b0000000-0000-0000-0000-000000000099",
    slug: "winter-kickoff-classic-2026",
    title: "Winter Kickoff 3v3 Basketball Classic",
    description:
      "The inaugural winter indoor 3v3 showdown that kicked off the 2026 tournament circuit. Recap footage available in the media gallery.",
    type: "Interhouse",
    typeSlug: "interhouse",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW - 30 * DAY).toISOString(),
    endsAt: new Date(NOW - 30 * DAY + 8 * 3600 * 1000).toISOString(),
    timezone: "America/New_York",
    venueName: "Barclays Training Annex",
    address: "620 Atlantic Ave, Brooklyn, NY 11217",
    mapUrl: "https://maps.google.com/?q=Barclays+Center",
    coverImagePath:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
  },
];

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
