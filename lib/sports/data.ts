/* ─────────────────────────── Types ─────────────────────────── */

export interface Sport {
  id: string;
  name: string;
  slug: string;
  imagePath: string;
  isActive: boolean;
  tagline: string;
  description: string;
}

export interface Division {
  id: string;
  sportId: string;
  sportSlug: string;
  sportName: string;
  eventId?: string;
  eventSlug?: string;
  eventTitle?: string;
  name: string;
  format: "1v1" | "intramural";
  capacity: number;
  registeredCount: number;
  rosterMin: number;
  rosterMax: number;
  feeCents: number;
  feeModel: "per_team" | "per_player";
  registrationOpensAt: string;
  registrationClosesAt: string;
  status: "open" | "closed" | "full";
  courtType: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  name: string;
  email: string;
  phone?: string;
  role: "captain" | "player";
  status: "invited" | "accepted" | "removed";
  waiverSigned: boolean;
  jerseyNumber?: string;
  joinedAt: string;
}

export interface Team {
  id: string;
  divisionId: string;
  divisionName: string;
  name: string;
  captainName: string;
  captainEmail: string;
  captainPhone: string;
  status: "pending" | "waitlisted" | "confirmed" | "cancelled";
  waitlistPosition?: number;
  inviteCode: string;
  feePaid: boolean;
  members: TeamMember[];
  createdAt: string;
}

export interface FreeAgent {
  id: string;
  sportId: string;
  sportName: string;
  name: string;
  email: string;
  phone: string;
  skillLevel: "recreational" | "intermediate" | "competitive" | "elite";
  preferredPosition: string;
  notes: string;
  status: "available" | "placed" | "withdrawn";
  waiverSigned: boolean;
  createdAt: string;
}

export interface IndividualRegistration {
  id: string;
  divisionId: string;
  name: string;
  email: string;
  phone: string;
  skillLevel: string;
  status: "confirmed" | "waitlisted";
  seed?: number;
  waiverSigned: boolean;
  paymentStatus: "paid" | "pending";
  createdAt: string;
}

export interface MatchParticipant {
  id: string;
  name: string;
  seed: number;
  score?: number;
  isBye?: boolean;
}

export interface Match {
  id: string;
  bracketId: string;
  round: number;
  roundName: string;
  matchNumber: number;
  participant1: MatchParticipant;
  participant2?: MatchParticipant;
  winnerId?: string;
  courtName?: string;
  scheduledTime?: string;
  status: "scheduled" | "in_progress" | "completed" | "bye";
}

export interface Bracket {
  id: string;
  divisionId: string;
  divisionName: string;
  sportName: string;
  type: "single_elimination";
  status: "draft" | "published" | "completed";
  roundsCount: number;
  matches: Match[];
}

/* ─────────────────────────── Seed Data ─────────────────────────── */

export const SPORTS: Sport[] = [
  {
    id: "d0000000-0000-0000-0000-000000000001",
    name: "Basketball",
    slug: "basketball",
    imagePath: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
    isActive: true,
    tagline: "5v5 Intramural Showdowns & 1v1 Streetball Battles",
    description: "Hardwood championships and midnight court duels under floodlights with live DJ commentary.",
  },
  {
    id: "d0000000-0000-0000-0000-000000000002",
    name: "Volleyball",
    slug: "volleyball",
    imagePath: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200&auto=format&fit=crop",
    isActive: true,
    tagline: "4v4 Co-Ed Sand Classic & Competitive Court Series",
    description: "Waterfront sand volleyball tournament with electronic scoring and spectator lounge.",
  },
  {
    id: "d0000000-0000-0000-0000-000000000003",
    name: "Soccer / Futsal",
    slug: "soccer",
    imagePath: "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1200&auto=format&fit=crop",
    isActive: true,
    tagline: "5v5 High-Speed Turf & Futsal Derby",
    description: "Enclosed court cage soccer tournament prioritizing flair, quick feet, and fast transitions.",
  },
  {
    id: "d0000000-0000-0000-0000-000000000004",
    name: "Flag Football",
    slug: "flag-football",
    imagePath: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1200&auto=format&fit=crop",
    isActive: true,
    tagline: "7v7 Non-Contact Summer Championship",
    description: "Turf field passing league with timed possessions, referee crews, and trophy ceremony.",
  },
  {
    id: "d0000000-0000-0000-0000-000000000005",
    name: "Pickleball",
    slug: "pickleball",
    imagePath: "https://images.unsplash.com/photo-1628891435222-065925dcb365?q=80&w=1200&auto=format&fit=crop",
    isActive: true,
    tagline: "Singles King of Court & Doubles Open",
    description: "Fast rallies, sharp kitchen play, and single-day double-elimination brackets.",
  },
];

const NOW = Date.now();
const DAY = 24 * 60 * 60 * 1000;

export const DIVISIONS: Division[] = [
  {
    id: "e0000000-0000-0000-0000-000000000001",
    sportId: "d0000000-0000-0000-0000-000000000001",
    sportSlug: "basketball",
    sportName: "Basketball",
    eventId: "b0000000-0000-0000-0000-000000000001",
    eventSlug: "interhouse-basketball-2026",
    eventTitle: "Interhouse 5v5 Basketball Championship",
    name: "Men's Open 5v5 Intramural",
    format: "intramural",
    capacity: 16,
    registeredCount: 12,
    rosterMin: 5,
    rosterMax: 10,
    feeCents: 45000,
    feeModel: "per_team",
    registrationOpensAt: new Date(NOW - 10 * DAY).toISOString(),
    registrationClosesAt: new Date(NOW + 15 * DAY).toISOString(),
    status: "open",
    courtType: "Hardwood Full Court",
  },
  {
    id: "e0000000-0000-0000-0000-000000000002",
    sportId: "d0000000-0000-0000-0000-000000000001",
    sportSlug: "basketball",
    sportName: "Basketball",
    eventId: "b0000000-0000-0000-0000-000000000002",
    eventSlug: "midnight-1v1-streetball-clash",
    eventTitle: "Midnight 1v1 Streetball Showcase",
    name: "1v1 Elite Streetball Clash",
    format: "1v1",
    capacity: 32,
    registeredCount: 28,
    rosterMin: 1,
    rosterMax: 1,
    feeCents: 5000,
    feeModel: "per_player",
    registrationOpensAt: new Date(NOW - 5 * DAY).toISOString(),
    registrationClosesAt: new Date(NOW + 20 * DAY).toISOString(),
    status: "open",
    courtType: "Asphalt Floodlight Half Court",
  },
  {
    id: "e0000000-0000-0000-0000-000000000003",
    sportId: "d0000000-0000-0000-0000-000000000002",
    sportSlug: "volleyball",
    sportName: "Volleyball",
    eventId: "b0000000-0000-0000-0000-000000000004",
    eventSlug: "metro-volleyball-classic",
    eventTitle: "Metro Intramural Sand Volleyball Classic",
    name: "Co-Ed Sand Volleyball 4v4",
    format: "intramural",
    capacity: 12,
    registeredCount: 9,
    rosterMin: 4,
    rosterMax: 8,
    feeCents: 30000,
    feeModel: "per_team",
    registrationOpensAt: new Date(NOW - 2 * DAY).toISOString(),
    registrationClosesAt: new Date(NOW + 30 * DAY).toISOString(),
    status: "open",
    courtType: "Olympic Sand Pit",
  },
  {
    id: "e0000000-0000-0000-0000-000000000004",
    sportId: "d0000000-0000-0000-0000-000000000003",
    sportSlug: "soccer",
    sportName: "Soccer / Futsal",
    eventId: "b0000000-0000-0000-0000-000000000008",
    eventSlug: "queens-cup-futsal-derby",
    eventTitle: "Queens Cup 5v5 Futsal Derby",
    name: "Open 5v5 Turf Futsal Derby",
    format: "intramural",
    capacity: 16,
    registeredCount: 16,
    rosterMin: 5,
    rosterMax: 9,
    feeCents: 35000,
    feeModel: "per_team",
    registrationOpensAt: new Date(NOW - 15 * DAY).toISOString(),
    registrationClosesAt: new Date(NOW + 10 * DAY).toISOString(),
    status: "full",
    courtType: "Indoor Turf Pitch",
  },
  {
    id: "e0000000-0000-0000-0000-000000000005",
    sportId: "d0000000-0000-0000-0000-000000000004",
    sportSlug: "flag-football",
    sportName: "Flag Football",
    eventId: "b0000000-0000-0000-0000-000000000006",
    eventSlug: "harlem-flag-football-bowl",
    eventTitle: "Harlem 7v7 Flag Football Summer Bowl",
    name: "Competitive 7v7 Flag Bowl",
    format: "intramural",
    capacity: 12,
    registeredCount: 8,
    rosterMin: 7,
    rosterMax: 14,
    feeCents: 40000,
    feeModel: "per_team",
    registrationOpensAt: new Date(NOW).toISOString(),
    registrationClosesAt: new Date(NOW + 45 * DAY).toISOString(),
    status: "open",
    courtType: "Regulation Turf Field",
  },
  {
    id: "e0000000-0000-0000-0000-000000000006",
    sportId: "d0000000-0000-0000-0000-000000000005",
    sportSlug: "pickleball",
    sportName: "Pickleball",
    eventId: "b0000000-0000-0000-0000-000000000005",
    eventSlug: "brooklyn-pickleball-open",
    eventTitle: "Brooklyn Open Pickleball Championship",
    name: "Men's & Women's Singles 1v1",
    format: "1v1",
    capacity: 24,
    registeredCount: 18,
    rosterMin: 1,
    rosterMax: 1,
    feeCents: 4000,
    feeModel: "per_player",
    registrationOpensAt: new Date(NOW).toISOString(),
    registrationClosesAt: new Date(NOW + 35 * DAY).toISOString(),
    status: "open",
    courtType: "Dedicated Pickleball Court",
  },
];

/* Sample Team Rosters */
export const SEED_TEAMS: Team[] = [
  {
    id: "team-001",
    divisionId: "e0000000-0000-0000-0000-000000000001",
    divisionName: "Men's Open 5v5 Intramural",
    name: "Uptown Monstars",
    captainName: "Marcus Vance",
    captainEmail: "marcus@uptown.com",
    captainPhone: "(555) 234-5678",
    status: "confirmed",
    inviteCode: "UPTOWN-882",
    feePaid: true,
    createdAt: new Date(NOW - 5 * DAY).toISOString(),
    members: [
      { id: "m-1", teamId: "team-001", name: "Marcus Vance", email: "marcus@uptown.com", role: "captain", status: "accepted", waiverSigned: true, jerseyNumber: "23", joinedAt: new Date(NOW - 5 * DAY).toISOString() },
      { id: "m-2", teamId: "team-001", name: "Tariq Owens", email: "tariq@uptown.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "3", joinedAt: new Date(NOW - 4 * DAY).toISOString() },
      { id: "m-3", teamId: "team-001", name: "Darius King", email: "darius@uptown.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "11", joinedAt: new Date(NOW - 3 * DAY).toISOString() },
      { id: "m-4", teamId: "team-001", name: "Kofi Boateng", email: "kofi@uptown.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "7", joinedAt: new Date(NOW - 3 * DAY).toISOString() },
      { id: "m-5", teamId: "team-001", name: "Jalen Cruz", email: "jalen@uptown.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "15", joinedAt: new Date(NOW - 2 * DAY).toISOString() },
      { id: "m-6", teamId: "team-001", name: "Zack Miller", email: "zack@uptown.com", role: "player", status: "accepted", waiverSigned: false, jerseyNumber: "32", joinedAt: new Date(NOW - 1 * DAY).toISOString() },
    ],
  },
  {
    id: "team-002",
    divisionId: "e0000000-0000-0000-0000-000000000001",
    divisionName: "Men's Open 5v5 Intramural",
    name: "Brooklyn Flight Squad",
    captainName: "Deon Jackson",
    captainEmail: "deon@flight.com",
    captainPhone: "(555) 345-6789",
    status: "confirmed",
    inviteCode: "FLIGHT-314",
    feePaid: true,
    createdAt: new Date(NOW - 6 * DAY).toISOString(),
    members: [
      { id: "m-7", teamId: "team-002", name: "Deon Jackson", email: "deon@flight.com", role: "captain", status: "accepted", waiverSigned: true, jerseyNumber: "0", joinedAt: new Date(NOW - 6 * DAY).toISOString() },
      { id: "m-8", teamId: "team-002", name: "Amir Cole", email: "amir@flight.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "8", joinedAt: new Date(NOW - 5 * DAY).toISOString() },
      { id: "m-9", teamId: "team-002", name: "Terrence Hayes", email: "terrence@flight.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "21", joinedAt: new Date(NOW - 4 * DAY).toISOString() },
      { id: "m-10", teamId: "team-002", name: "Isaiah Rivers", email: "isaiah@flight.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "12", joinedAt: new Date(NOW - 3 * DAY).toISOString() },
      { id: "m-11", teamId: "team-002", name: "Malik Grant", email: "malik@flight.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "5", joinedAt: new Date(NOW - 2 * DAY).toISOString() },
    ],
  },
  {
    id: "team-003",
    divisionId: "e0000000-0000-0000-0000-000000000001",
    divisionName: "Men's Open 5v5 Intramural",
    name: "Harlem Renaissance",
    captainName: "Anthony Sterling",
    captainEmail: "anthony@harlem.com",
    captainPhone: "(555) 456-7890",
    status: "confirmed",
    inviteCode: "HARLEM-105",
    feePaid: true,
    createdAt: new Date(NOW - 4 * DAY).toISOString(),
    members: [
      { id: "m-12", teamId: "team-003", name: "Anthony Sterling", email: "anthony@harlem.com", role: "captain", status: "accepted", waiverSigned: true, jerseyNumber: "1", joinedAt: new Date(NOW - 4 * DAY).toISOString() },
      { id: "m-13", teamId: "team-003", name: "Brandon Bell", email: "brandon@harlem.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "24", joinedAt: new Date(NOW - 3 * DAY).toISOString() },
      { id: "m-14", teamId: "team-003", name: "Christian Gray", email: "chris@harlem.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "13", joinedAt: new Date(NOW - 2 * DAY).toISOString() },
      { id: "m-15", teamId: "team-003", name: "Elijah Washington", email: "elijah@harlem.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "9", joinedAt: new Date(NOW - 2 * DAY).toISOString() },
      { id: "m-16", teamId: "team-003", name: "Jordan Banks", email: "jordan@harlem.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "4", joinedAt: new Date(NOW - 1 * DAY).toISOString() },
    ],
  },
  {
    id: "team-004",
    divisionId: "e0000000-0000-0000-0000-000000000001",
    divisionName: "Men's Open 5v5 Intramural",
    name: "Lower East Side Lobsters",
    captainName: "Leo Rossi",
    captainEmail: "leo@lobsters.com",
    captainPhone: "(555) 567-8901",
    status: "confirmed",
    inviteCode: "LES-LOB-919",
    feePaid: true,
    createdAt: new Date(NOW - 3 * DAY).toISOString(),
    members: [
      { id: "m-17", teamId: "team-004", name: "Leo Rossi", email: "leo@lobsters.com", role: "captain", status: "accepted", waiverSigned: true, jerseyNumber: "33", joinedAt: new Date(NOW - 3 * DAY).toISOString() },
      { id: "m-18", teamId: "team-004", name: "Nico Moretti", email: "nico@lobsters.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "2", joinedAt: new Date(NOW - 2 * DAY).toISOString() },
      { id: "m-19", teamId: "team-004", name: "Samir Patel", email: "samir@lobsters.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "10", joinedAt: new Date(NOW - 2 * DAY).toISOString() },
      { id: "m-20", teamId: "team-004", name: "Andre Silva", email: "andre@lobsters.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "77", joinedAt: new Date(NOW - 1 * DAY).toISOString() },
      { id: "m-21", teamId: "team-004", name: "Kevin Zhang", email: "kevin@lobsters.com", role: "player", status: "accepted", waiverSigned: true, jerseyNumber: "22", joinedAt: new Date(NOW - 1 * DAY).toISOString() },
    ],
  },
];

/* Sample Free Agents */
export const SEED_FREE_AGENTS: FreeAgent[] = [
  {
    id: "fa-001",
    sportId: "d0000000-0000-0000-0000-000000000001",
    sportName: "Basketball",
    name: "Cameron Wright",
    email: "cameron.w@gmail.com",
    phone: "(555) 912-3456",
    skillLevel: "competitive",
    preferredPosition: "Point Guard / Shooting Guard",
    notes: "Played D3 college ball. Sharp shooter, pass-first floor general with high motor.",
    status: "available",
    waiverSigned: true,
    createdAt: new Date(NOW - 2 * DAY).toISOString(),
  },
  {
    id: "fa-002",
    sportId: "d0000000-0000-0000-0000-000000000001",
    sportName: "Basketball",
    name: "David Okafor",
    email: "david.o@yahoo.com",
    phone: "(555) 823-4567",
    skillLevel: "elite",
    preferredPosition: "Power Forward / Center",
    notes: "6'7\" rim protector, strong rebounder, sets solid screens and rolls hard.",
    status: "available",
    waiverSigned: true,
    createdAt: new Date(NOW - 3 * DAY).toISOString(),
  },
  {
    id: "fa-003",
    sportId: "d0000000-0000-0000-0000-000000000002",
    sportName: "Volleyball",
    name: "Elena Rostova",
    email: "elena.r@outlook.com",
    phone: "(555) 734-5678",
    skillLevel: "competitive",
    preferredPosition: "Outside Hitter / Setter",
    notes: "5 years club experience in sand & indoor. Strong jump serve and court communication.",
    status: "available",
    waiverSigned: true,
    createdAt: new Date(NOW - 1 * DAY).toISOString(),
  },
  {
    id: "fa-004",
    sportId: "d0000000-0000-0000-0000-000000000003",
    sportName: "Soccer / Futsal",
    name: "Mateo Fernandez",
    email: "mateo.f@gmail.com",
    phone: "(555) 645-6789",
    skillLevel: "elite",
    preferredPosition: "Midfielder / Pivot",
    notes: "High technical dribbling in tight spaces. Played academy soccer in Madrid.",
    status: "available",
    waiverSigned: true,
    createdAt: new Date(NOW - 4 * DAY).toISOString(),
  },
  {
    id: "fa-005",
    sportId: "d0000000-0000-0000-0000-000000000004",
    sportName: "Flag Football",
    name: "Xavier Bennett",
    email: "xavier.b@gmail.com",
    phone: "(555) 556-7890",
    skillLevel: "intermediate",
    preferredPosition: "Wide Receiver / Safety",
    notes: "4.5 40-yd speed, reliable hands, can play both sides of the ball.",
    status: "available",
    waiverSigned: true,
    createdAt: new Date(NOW - 2 * DAY).toISOString(),
  },
];

/* Sample Tournament Bracket Seed */
export const SEED_BRACKET: Bracket = {
  id: "bracket-5v5-interhouse",
  divisionId: "e0000000-0000-0000-0000-000000000001",
  divisionName: "Men's Open 5v5 Intramural",
  sportName: "Basketball",
  type: "single_elimination",
  status: "published",
  roundsCount: 3,
  matches: [
    // Round 1 (Quarterfinals - 4 matches)
    {
      id: "m-qf-1",
      bracketId: "bracket-5v5-interhouse",
      round: 1,
      roundName: "Quarterfinals",
      matchNumber: 1,
      courtName: "Court 1 (Rucker North)",
      scheduledTime: "11:00 AM",
      status: "completed",
      participant1: { id: "team-001", name: "Uptown Monstars", seed: 1, score: 68 },
      participant2: { id: "team-008", name: "Queens Royalty", seed: 8, score: 54 },
      winnerId: "team-001",
    },
    {
      id: "m-qf-2",
      bracketId: "bracket-5v5-interhouse",
      round: 1,
      roundName: "Quarterfinals",
      matchNumber: 2,
      courtName: "Court 2 (Rucker South)",
      scheduledTime: "11:00 AM",
      status: "completed",
      participant1: { id: "team-004", name: "LES Lobsters", seed: 4, score: 62 },
      participant2: { id: "team-005", name: "Bronx Bombers", seed: 5, score: 59 },
      winnerId: "team-004",
    },
    {
      id: "m-qf-3",
      bracketId: "bracket-5v5-interhouse",
      round: 1,
      roundName: "Quarterfinals",
      matchNumber: 3,
      courtName: "Court 1 (Rucker North)",
      scheduledTime: "12:15 PM",
      status: "completed",
      participant1: { id: "team-002", name: "Brooklyn Flight Squad", seed: 2, score: 74 },
      participant2: { id: "team-007", name: "Tribeca Titans", seed: 7, score: 61 },
      winnerId: "team-002",
    },
    {
      id: "m-qf-4",
      bracketId: "bracket-5v5-interhouse",
      round: 1,
      roundName: "Quarterfinals",
      matchNumber: 4,
      courtName: "Court 2 (Rucker South)",
      scheduledTime: "12:15 PM",
      status: "completed",
      participant1: { id: "team-003", name: "Harlem Renaissance", seed: 3, score: 71 },
      participant2: { id: "team-006", name: "Staten Island Surge", seed: 6, score: 65 },
      winnerId: "team-003",
    },

    // Round 2 (Semifinals - 2 matches)
    {
      id: "m-sf-1",
      bracketId: "bracket-5v5-interhouse",
      round: 2,
      roundName: "Semifinals",
      matchNumber: 5,
      courtName: "Championship Court",
      scheduledTime: "02:00 PM",
      status: "in_progress",
      participant1: { id: "team-001", name: "Uptown Monstars", seed: 1, score: 48 },
      participant2: { id: "team-004", name: "LES Lobsters", seed: 4, score: 46 },
    },
    {
      id: "m-sf-2",
      bracketId: "bracket-5v5-interhouse",
      round: 2,
      roundName: "Semifinals",
      matchNumber: 6,
      courtName: "Championship Court",
      scheduledTime: "03:15 PM",
      status: "scheduled",
      participant1: { id: "team-002", name: "Brooklyn Flight Squad", seed: 2 },
      participant2: { id: "team-003", name: "Harlem Renaissance", seed: 3 },
    },

    // Round 3 (Championship Final - 1 match)
    {
      id: "m-fn-1",
      bracketId: "bracket-5v5-interhouse",
      round: 3,
      roundName: "Championship",
      matchNumber: 7,
      courtName: "Championship Court",
      scheduledTime: "05:00 PM",
      status: "scheduled",
      participant1: { id: "tbd-1", name: "Winner SF 1", seed: 0 },
      participant2: { id: "tbd-2", name: "Winner SF 2", seed: 0 },
    },
  ],
};

/* In-memory mutable states for interactive simulation */
const inMemoryTeams = [...SEED_TEAMS];
const inMemoryFreeAgents = [...SEED_FREE_AGENTS];

/* ────────────────────────── Data Queries ────────────────────────── */

export function getSports(): Sport[] {
  return SPORTS.filter((s) => s.isActive);
}

export function getSportBySlug(slug: string): Sport | undefined {
  return SPORTS.find((s) => s.slug === slug);
}

export function getDivisions(sportSlug?: string): Division[] {
  if (!sportSlug || sportSlug === "all") {
    return DIVISIONS;
  }
  return DIVISIONS.filter((d) => d.sportSlug === sportSlug);
}

export function getDivisionById(id: string): Division | undefined {
  return DIVISIONS.find((d) => d.id === id);
}

export function getTeamsByDivision(divisionId: string): Team[] {
  return inMemoryTeams.filter((t) => t.divisionId === divisionId);
}

export function getTeamByInviteCode(inviteCode: string): Team | undefined {
  return inMemoryTeams.find(
    (t) => t.inviteCode.toUpperCase() === inviteCode.toUpperCase()
  );
}

export function getFreeAgents(sportId?: string): FreeAgent[] {
  if (!sportId || sportId === "all") {
    return inMemoryFreeAgents;
  }
  return inMemoryFreeAgents.filter((f) => f.sportId === sportId);
}

export function getBracketByDivisionId(divisionId: string): Bracket | undefined {
  if (divisionId === SEED_BRACKET.divisionId) {
    return SEED_BRACKET;
  }

  // Generate an automated dynamic bracket for any other division
  const div = getDivisionById(divisionId);
  if (!div) return undefined;

  return {
    id: `bracket-${divisionId}`,
    divisionId: div.id,
    divisionName: div.name,
    sportName: div.sportName,
    type: "single_elimination",
    status: "published",
    roundsCount: 2,
    matches: [
      {
        id: `m-${divisionId}-1`,
        bracketId: `bracket-${divisionId}`,
        round: 1,
        roundName: "Semifinals",
        matchNumber: 1,
        courtName: "Main Court",
        scheduledTime: "12:00 PM",
        status: "scheduled",
        participant1: { id: "t1", name: "Seed 1 Squad", seed: 1 },
        participant2: { id: "t4", name: "Seed 4 Squad", seed: 4 },
      },
      {
        id: `m-${divisionId}-2`,
        bracketId: `bracket-${divisionId}`,
        round: 1,
        roundName: "Semifinals",
        matchNumber: 2,
        courtName: "Main Court",
        scheduledTime: "01:00 PM",
        status: "scheduled",
        participant1: { id: "t2", name: "Seed 2 Squad", seed: 2 },
        participant2: { id: "t3", name: "Seed 3 Squad", seed: 3 },
      },
      {
        id: `m-${divisionId}-3`,
        bracketId: `bracket-${divisionId}`,
        round: 2,
        roundName: "Championship",
        matchNumber: 3,
        courtName: "Main Court",
        scheduledTime: "03:00 PM",
        status: "scheduled",
        participant1: { id: "tbd-1", name: "Winner Semifinal 1", seed: 0 },
        participant2: { id: "tbd-2", name: "Winner Semifinal 2", seed: 0 },
      },
    ],
  };
}

export function addTeam(team: Team): void {
  inMemoryTeams.push(team);
}

export function addPlayerToTeam(inviteCode: string, member: TeamMember): boolean {
  const team = getTeamByInviteCode(inviteCode);
  if (!team) return false;
  team.members.push(member);
  return true;
}

export function addFreeAgent(agent: FreeAgent): void {
  inMemoryFreeAgents.unshift(agent);
}
