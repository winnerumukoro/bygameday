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
    tagline: "Team brackets and 1v1",
    description: "Enter a team, or sign up for the 1v1 bracket on your own.",
  },
  {
    id: "d0000000-0000-0000-0000-000000000002",
    name: "Volleyball",
    slug: "volleyball",
    imagePath: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200&auto=format&fit=crop",
    isActive: true,
    tagline: "Team brackets",
    description: "Enter a team, or join the free agent pool and we will place you on one.",
  },
  {
    id: "d0000000-0000-0000-0000-000000000003",
    name: "Soccer / Futsal",
    slug: "soccer",
    imagePath: "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1200&auto=format&fit=crop",
    isActive: true,
    tagline: "Team brackets",
    description: "Enter a team, or join the free agent pool and we will place you on one.",
  },
  {
    id: "d0000000-0000-0000-0000-000000000004",
    name: "Flag Football",
    slug: "flag-football",
    imagePath: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1200&auto=format&fit=crop",
    isActive: true,
    tagline: "Non-contact team brackets",
    description: "Enter a team, or join the free agent pool and we will place you on one.",
  },
  {
    id: "d0000000-0000-0000-0000-000000000005",
    name: "Pickleball",
    slug: "pickleball",
    imagePath: "https://images.unsplash.com/photo-1628891435222-065925dcb365?q=80&w=1200&auto=format&fit=crop",
    isActive: true,
    tagline: "Singles and doubles",
    description: "Sign up on your own or with a partner.",
  },
];

export const DIVISIONS: Division[] = [];

/* Sample Team Rosters */
export const SEED_TEAMS: Team[] = [];

/* Sample Free Agents */
export const SEED_FREE_AGENTS: FreeAgent[] = [];

/* No bracket has been drawn yet — populated once a real division fills. */
export const SEED_BRACKET: Bracket = {
  id: "",
  divisionId: "",
  divisionName: "",
  sportName: "",
  type: "single_elimination",
  status: "draft",
  roundsCount: 0,
  matches: [],
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
  // Guard against the empty placeholder bracket matching an empty id
  if (SEED_BRACKET.divisionId && divisionId === SEED_BRACKET.divisionId) {
    return SEED_BRACKET;
  }

  const div = getDivisionById(divisionId);
  if (!div) return undefined;

  /*
   * An empty draw. This used to hand back three invented matches ("Seed 1
   * Squad" vs "Seed 4 Squad" on Main Court at 12:00 PM) for any division
   * asked for. A real draw is seeded from registered teams once there are
   * some, so until then the division has a bracket with no matches in it.
   */
  return {
    id: `bracket-${divisionId}`,
    divisionId: div.id,
    divisionName: div.name,
    sportName: div.sportName,
    type: "single_elimination",
    status: "draft",
    roundsCount: 0,
    matches: [],
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
