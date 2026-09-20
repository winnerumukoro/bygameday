"use server";

import { vendorApplicationSchema, type VendorApplicationData } from "./schemas";
import { requestSlot } from "./capacity";

/* ────────────────────────────────────────────────────────────
   Vendor Application — Server Actions
   
   These run on the server (RSC Server Actions). In production
   they will create records in Supabase. For now they validate
   and return mock confirmation data.
   ──────────────────────────────────────────────────────────── */

export interface ApplicationResult {
  success: boolean;
  applicationId?: string;
  slots?: Array<{
    slotId: string;
    eventId: string;
    status: "requested" | "waitlisted";
    waitlistPosition?: number;
  }>;
  errors?: Record<string, string[]>;
}

/**
 * Submit a complete vendor application.
 * Validates all fields, creates waiver signature, and requests event slots.
 */
export async function submitVendorApplication(
  data: VendorApplicationData
): Promise<ApplicationResult> {
  // 1. Validate with Zod
  const parsed = vendorApplicationSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const validated = parsed.data;

  // 2. Generate application ID (in production: Supabase INSERT returning id)
  const applicationId = `app-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // 3. Create waiver signature record (in production: INSERT into waiver_signatures)

  // 4. Request slots for each selected event
  const slots = validated.eventIds.map((eventId) => {
    const result = requestSlot(applicationId, eventId, validated.subcategoryId);
    return {
      slotId: result.slotId,
      eventId,
      status: result.status,
      waitlistPosition: result.waitlistPosition,
    };
  });

  // 5. In production: INSERT into vendor_applications with status = 'submitted'
  // 6. In production: Send confirmation email via Resend

  return {
    success: true,
    applicationId,
    slots,
  };
}

export interface ApplicationStatus {
  applicationId: string;
  businessName: string;
  categoryName: string;
  subcategoryName: string;
  status: "submitted" | "under_review" | "approved_pending_payment" | "confirmed" | "rejected";
  events: Array<{
    eventId: string;
    eventTitle: string;
    slotStatus: string;
  }>;
  submittedAt: string;
}

/**
 * Get the status of a vendor application.
 * In production: SELECT from vendor_applications JOIN vendor_event_slots
 */
export async function getApplicationStatus(
  applicationId: string
): Promise<ApplicationStatus | null> {
  // Mock: return a submitted status for any ID
  if (!applicationId || applicationId === "undefined") return null;

  return {
    applicationId,
    businessName: "Your Business",
    categoryName: "Pending Review",
    subcategoryName: "Pending Review",
    status: "submitted",
    events: [],
    submittedAt: new Date().toISOString(),
  };
}
