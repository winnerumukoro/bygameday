"use server";

import {
  individualRegistrationSchema,
  teamRegistrationSchema,
  joinTeamSchema,
  freeAgentSchema,
  type IndividualRegistrationData,
  type TeamRegistrationData,
  type JoinTeamData,
  type FreeAgentData,
} from "./schemas";
import {
  addTeam,
  addPlayerToTeam,
  addFreeAgent,
  getTeamByInviteCode,
  getDivisionById,
  getSportBySlug,
  type Team,
  type TeamMember,
  type FreeAgent,
} from "./data";

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

/**
 * 1v1 Showdown Individual Athlete Registration
 */
export async function registerIndividual(
  data: IndividualRegistrationData
): Promise<ActionResult<{ registrationId: string }>> {
  const parsed = individualRegistrationSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const division = getDivisionById(data.divisionId);
  if (!division) {
    return { success: false, error: "Division not found." };
  }

  const registrationId = `reg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  // In production:
  // 1. SELECT count(*) FROM individual_registrations WHERE division_id = ...
  // 2. If under capacity -> INSERT status 'pending_payment'
  // 3. INSERT waiver_signatures
  // 4. Return Stripe checkout session

  return {
    success: true,
    data: { registrationId },
  };
}

/**
 * Intramural Team Registration by Captain
 */
export async function registerTeam(
  data: TeamRegistrationData
): Promise<ActionResult<{ teamId: string; inviteCode: string }>> {
  const parsed = teamRegistrationSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const division = getDivisionById(data.divisionId);
  if (!division) {
    return { success: false, error: "Division not found." };
  }

  const teamId = `team-${Date.now()}`;
  // Generate random readable uppercase invite code (e.g. MONSTARS-491)
  const cleanTeamPrefix = data.teamName
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, 6)
    .toUpperCase() || "TEAM";
  const inviteCode = `${cleanTeamPrefix}-${Math.floor(100 + Math.random() * 900)}`;

  const captainMember: TeamMember = {
    id: `m-cap-${Date.now()}`,
    teamId,
    name: data.captainName,
    email: data.captainEmail,
    phone: data.captainPhone,
    role: "captain",
    status: "accepted",
    waiverSigned: true,
    joinedAt: new Date().toISOString(),
  };

  const newTeam: Team = {
    id: teamId,
    divisionId: division.id,
    divisionName: division.name,
    name: data.teamName,
    captainName: data.captainName,
    captainEmail: data.captainEmail,
    captainPhone: data.captainPhone,
    status: "confirmed",
    inviteCode,
    feePaid: true,
    members: [captainMember],
    createdAt: new Date().toISOString(),
  };

  addTeam(newTeam);

  return {
    success: true,
    data: { teamId, inviteCode },
  };
}

/**
 * Teammate joins an existing team using captain's invite code
 */
export async function joinTeamWithInviteCode(
  inviteCode: string,
  data: JoinTeamData
): Promise<ActionResult<{ memberId: string }>> {
  const parsed = joinTeamSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const team = getTeamByInviteCode(inviteCode);
  if (!team) {
    return { success: false, error: "Invalid team invite code." };
  }

  const division = getDivisionById(team.divisionId);
  if (division && team.members.length >= division.rosterMax) {
    return {
      success: false,
      error: `This team roster is full (max ${division.rosterMax} players).`,
    };
  }

  const memberId = `m-${Date.now()}`;
  const newMember: TeamMember = {
    id: memberId,
    teamId: team.id,
    name: data.playerName,
    email: data.playerEmail,
    phone: data.playerPhone,
    jerseyNumber: data.jerseyNumber,
    role: "player",
    status: "accepted",
    waiverSigned: true,
    joinedAt: new Date().toISOString(),
  };

  addPlayerToTeam(inviteCode, newMember);

  return {
    success: true,
    data: { memberId },
  };
}

/**
 * Free Agent Pool Registration
 */
export async function registerFreeAgent(
  data: FreeAgentData
): Promise<ActionResult<{ agentId: string }>> {
  const parsed = freeAgentSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const sport = getSportBySlug(data.sportId) || { name: "Sports" };
  const agentId = `fa-${Date.now()}`;

  const newAgent: FreeAgent = {
    id: agentId,
    sportId: data.sportId,
    sportName: sport.name,
    name: data.name,
    email: data.email,
    phone: data.phone,
    skillLevel: data.skillLevel,
    preferredPosition: data.preferredPosition,
    notes: data.notes || "",
    status: "available",
    waiverSigned: true,
    createdAt: new Date().toISOString(),
  };

  addFreeAgent(newAgent);

  return {
    success: true,
    data: { agentId },
  };
}
