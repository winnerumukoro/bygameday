import { z } from "zod";

/* ─────────────── 1v1 Individual Registration Schema ──────────────── */

export const individualRegistrationSchema = z.object({
  divisionId: z.string().min(1, "Please select a tournament division"),
  name: z
    .string()
    .min(2, "Full name is required")
    .max(80, "Name must be 80 characters or fewer"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number is too long"),
  skillLevel: z.enum(["recreational", "intermediate", "competitive", "elite"], {
    errorMap: () => ({ message: "Please select your competitive skill level" }),
  }),
  emergencyContactName: z
    .string()
    .min(2, "Emergency contact name is required")
    .max(80, "Emergency contact name is too long"),
  emergencyContactPhone: z
    .string()
    .min(10, "Emergency contact phone number must be at least 10 digits"),
  signerName: z.string().min(2, "Full legal name required for electronic signature"),
  signerEmail: z.string().email("Valid email required for electronic signature"),
  agreed: z
    .boolean()
    .refine((val) => val === true, "You must agree to the athletic liability waiver"),
});

/* ─────────────── Intramural Team Registration Schema ──────────────── */

export const teamRegistrationSchema = z.object({
  divisionId: z.string().min(1, "Please select a tournament division"),
  teamName: z
    .string()
    .min(2, "Team name is required")
    .max(60, "Team name must be 60 characters or fewer"),
  captainName: z
    .string()
    .min(2, "Captain full name is required")
    .max(80, "Captain name must be 80 characters or fewer"),
  captainEmail: z.string().email("Please enter a valid captain email address"),
  captainPhone: z
    .string()
    .min(10, "Captain phone number must be at least 10 digits")
    .max(20, "Phone number is too long"),
  signerName: z.string().min(2, "Full legal name required for electronic signature"),
  signerEmail: z.string().email("Valid email required for electronic signature"),
  agreed: z
    .boolean()
    .refine((val) => val === true, "Captain must agree to the athletic liability waiver"),
});

/* ─────────────── Teammate Join with Invite Code Schema ──────────────── */

export const joinTeamSchema = z.object({
  playerName: z
    .string()
    .min(2, "Player name is required")
    .max(80, "Player name must be 80 characters or fewer"),
  playerEmail: z.string().email("Please enter a valid email address"),
  playerPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number is too long"),
  jerseyNumber: z.string().max(4, "Max 4 characters").optional().or(z.literal("")),
  signerName: z.string().min(2, "Full legal name required for electronic signature"),
  signerEmail: z.string().email("Valid email required for electronic signature"),
  agreed: z
    .boolean()
    .refine((val) => val === true, "You must agree to the athletic liability waiver"),
});

/* ─────────────── Free Agent Registration Schema ──────────────── */

export const freeAgentSchema = z.object({
  sportId: z.string().min(1, "Please select a sport"),
  name: z
    .string()
    .min(2, "Player name is required")
    .max(80, "Player name must be 80 characters or fewer"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number is too long"),
  skillLevel: z.enum(["recreational", "intermediate", "competitive", "elite"], {
    errorMap: () => ({ message: "Please select your skill level" }),
  }),
  preferredPosition: z
    .string()
    .min(2, "Preferred position or role is required")
    .max(80, "Position must be 80 characters or fewer"),
  notes: z.string().max(500, "Notes must be 500 characters or fewer").optional().or(z.literal("")),
  signerName: z.string().min(2, "Full legal name required for electronic signature"),
  signerEmail: z.string().email("Valid email required for electronic signature"),
  agreed: z
    .boolean()
    .refine((val) => val === true, "You must agree to the athletic liability waiver"),
});

export type IndividualRegistrationData = z.infer<typeof individualRegistrationSchema>;
export type TeamRegistrationData = z.infer<typeof teamRegistrationSchema>;
export type JoinTeamData = z.infer<typeof joinTeamSchema>;
export type FreeAgentData = z.infer<typeof freeAgentSchema>;
