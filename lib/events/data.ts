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
    title: "Austin 5v5 Basketball Championship",
    description:
      "The flagship 16-team double-elimination basketball tournament. High stakes, live commentary, DJ sets, courtside VIP lounge, and a street food market featuring local Austin food trucks.",
    type: "Interhouse",
    typeSlug: "interhouse",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 24 * DAY).toISOString(),
    endsAt: new Date(NOW + 24 * DAY + 8 * 3600 * 1000).toISOString(),
    timezone: "America/Chicago",
    venueName: "Austin Sports Center",
    address: "425 Woodward St, Austin, TX 78704",
    mapUrl: "https://maps.google.com/?q=Austin+Sports+Center",
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
      "Under the floodlights. 32 ballers enter a single-elimination king-of-the-court battle. One trophy, winner-take-all bracket with live streaming and guest judges.",
    type: "1v1 Showdown",
    typeSlug: "1v1",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 37 * DAY).toISOString(),
    endsAt: new Date(NOW + 37 * DAY + 5 * 3600 * 1000).toISOString(),
    timezone: "America/Chicago",
    venueName: "Pan Am Neighborhood Park Courts",
    address: "2100 E 3rd St, Austin, TX 78702",
    mapUrl: "https://maps.google.com/?q=Pan+Am+Park+Austin",
    coverImagePath:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: false,
    sportsDivisionId: "e0000000-0000-0000-0000-000000000002",
    sportsDivisionName: "1v1 Streetball Clash",
  },
  {
    id: "b0000000-0000-0000-0000-000000000003",
    slug: "spring-tailgate-viewing-party",
    title: "Spring Championship Viewing Party & Market",
    description:
      "Massive outdoor LED screens, local Austin food trucks, craft beverage gardens, DJ sets, and lawn viewing on the lake.",
    type: "Viewing Party",
    typeSlug: "viewing-party",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 46 * DAY).toISOString(),
    endsAt: new Date(NOW + 46 * DAY + 7 * 3600 * 1000).toISOString(),
    timezone: "America/Chicago",
    venueName: "Mueller Lake Park Amphitheater",
    address: "4550 Mueller Blvd, Austin, TX 78723",
    mapUrl: "https://maps.google.com/?q=Mueller+Lake+Park+Austin",
    coverImagePath:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
    vendorOpenCategories: ["Artisan Desserts", "Craft Beverages", "Vegan", "Photography"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000004",
    slug: "metro-volleyball-classic",
    title: "Zilker Sand Volleyball Classic",
    description:
      "Co-ed sand volleyball tournament with 24 teams competing across competitive and social divisions. Includes music, food concessions, and sunset finals.",
    type: "Interhouse",
    typeSlug: "interhouse",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 59 * DAY).toISOString(),
    endsAt: new Date(NOW + 59 * DAY + 6 * 3600 * 1000).toISOString(),
    timezone: "America/Chicago",
    venueName: "Zilker Metropolitan Park Sand Courts",
    address: "2207 Lou Neff Rd, Austin, TX 78746",
    mapUrl: "https://maps.google.com/?q=Zilker+Park+Austin",
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
    title: "Austin Open Pickleball Championship",
    description:
      "Singles and doubles brackets on dedicated courts. Fast rallies, cold drinks, referee supervision, and customized winner paddles.",
    type: "1v1 Showdown",
    typeSlug: "1v1",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 70 * DAY).toISOString(),
    endsAt: new Date(NOW + 70 * DAY + 8 * 3600 * 1000).toISOString(),
    timezone: "America/Chicago",
    venueName: "South Austin Recreation Center",
    address: "1100 Cumberland Rd, Austin, TX 78704",
    mapUrl: "https://maps.google.com/?q=South+Austin+Recreation+Center",
    coverImagePath:
      "https://images.unsplash.com/photo-1628891435222-065925dcb365?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
    vendorOpenCategories: ["Accessories", "Beverages"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000006",
    slug: "harlem-flag-football-bowl",
    title: "Austin 7v7 Flag Football Summer Bowl",
    description:
      "Non-contact, fast-paced flag football tournament. Trophies, cash prize for winners, high-definition game film, and family-friendly side competitions.",
    type: "Interhouse",
    typeSlug: "interhouse",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 85 * DAY).toISOString(),
    endsAt: new Date(NOW + 85 * DAY + 8 * 3600 * 1000).toISOString(),
    timezone: "America/Chicago",
    venueName: "Krieg Softball & Athletic Complex",
    address: "515 S Pleasant Valley Rd, Austin, TX 78741",
    mapUrl: "https://maps.google.com/?q=Krieg+Fields+Austin",
    coverImagePath:
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
    vendorOpenCategories: ["BBQ", "Burgers", "Apparel"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000007",
    slug: "downtown-5k-community-run",
    title: "Lady Bird Lake 5K & Community Festival",
    description:
      "Community run along the scenic Lady Bird Lake trail finishing in a park gathering with live local music, finisher medals, and food stalls.",
    type: "Community Event",
    typeSlug: "community",
    source: "community",
    status: "published",
    startsAt: new Date(NOW + 98 * DAY).toISOString(),
    endsAt: new Date(NOW + 98 * DAY + 4 * 3600 * 1000).toISOString(),
    timezone: "America/Chicago",
    venueName: "Vic Mathias Shores at Lady Bird Lake",
    address: "900 W Riverside Dr, Austin, TX 78704",
    mapUrl: "https://maps.google.com/?q=Vic+Mathias+Shores+Austin",
    coverImagePath:
      "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
    vendorOpenCategories: ["Recovery Drinks", "Snacks"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000008",
    slug: "queens-cup-futsal-derby",
    title: "Austin Futsal Cup 5v5 Derby",
    description:
      "Fast-paced turf soccer championship. 16 squads competing for the cup with regulation futsal goals and licensed referees.",
    type: "Interhouse",
    typeSlug: "interhouse",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 112 * DAY).toISOString(),
    endsAt: new Date(NOW + 112 * DAY + 7 * 3600 * 1000).toISOString(),
    timezone: "America/Chicago",
    venueName: "Round Rock Sports Center",
    address: "2400 Chisholm Trail, Round Rock, TX 78681",
    mapUrl: "https://maps.google.com/?q=Round+Rock+Sports+Center",
    coverImagePath:
      "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
    vendorOpenCategories: ["Latin Food", "Jerseys"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000009",
    slug: "finals-viewing-bash-2026",
    title: "Championship Watch Party & Concourse",
    description:
      "Massive outdoor projection screens, half-court shootouts, sports trivia giveaways, and food truck row.",
    type: "Viewing Party",
    typeSlug: "viewing-party",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 125 * DAY).toISOString(),
    endsAt: new Date(NOW + 125 * DAY + 5 * 3600 * 1000).toISOString(),
    timezone: "America/Chicago",
    venueName: "Pease District Park Terrace",
    address: "1100 Kingsbury St, Austin, TX 78703",
    mapUrl: "https://maps.google.com/?q=Pease+District+Park+Austin",
    coverImagePath:
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: true,
    vendorOpenCategories: ["Wings", "Burgers", "Craft Beverages"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000010",
    slug: "all-city-dodgeball-classic",
    title: "All-Austin Glow-in-the-Dark Dodgeball",
    description:
      "Foam balls, blacklights, throwback jerseys, weekend tournament with 20 teams battling under neon lighting.",
    type: "Interhouse",
    typeSlug: "interhouse",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW + 140 * DAY).toISOString(),
    endsAt: new Date(NOW + 140 * DAY + 6 * 3600 * 1000).toISOString(),
    timezone: "America/Chicago",
    venueName: "Givens Recreation Center",
    address: "3811 E 12th St, Austin, TX 78721",
    mapUrl: "https://maps.google.com/?q=Givens+Recreation+Center+Austin",
    coverImagePath:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1200&auto=format&fit=crop",
    acceptsVendors: false,
  },
  // Past event for testing the past events toggle
  {
    id: "b0000000-0000-0000-0000-000000000099",
    slug: "winter-kickoff-classic-2026",
    title: "Winter Kickoff 3v3 Basketball Classic",
    description:
      "The inaugural winter indoor 3v3 tournament that kicked off the 2026 Austin circuit. Recap footage available in the media gallery.",
    type: "Interhouse",
    typeSlug: "interhouse",
    source: "gameday",
    status: "published",
    startsAt: new Date(NOW - 30 * DAY).toISOString(),
    endsAt: new Date(NOW - 30 * DAY + 8 * 3600 * 1000).toISOString(),
    timezone: "America/Chicago",
    venueName: "Austin Sports Center",
    address: "425 Woodward St, Austin, TX 78704",
    mapUrl: "https://maps.google.com/?q=Austin+Sports+Center",
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
