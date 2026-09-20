"use server";

import {
  updateVendorApplication,
  recordRefund,
  addBroadcastAlert,
  type VendorPipelineStatus,
} from "./data";
import { SEED_BRACKET } from "@/lib/sports/data";

export interface AdminActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Update vendor application status (Approve 48h hold, Reject with reason, Waitlist)
 */
export async function updateVendorStatus(
  id: string,
  status: VendorPipelineStatus,
  reason?: string
): Promise<AdminActionResult> {
  const success = updateVendorApplication(id, status, reason);
  if (!success) {
    return { success: false, error: "Application record not found." };
  }

  // In production:
  // If status === 'approved_pending_payment':
  // 1. Generate single-use payment token in vendor_event_slots
  // 2. Dispatch email via Resend with /vendors/pay/[token] link
  // If status === 'rejected':
  // 1. Dispatch rejection notification with reason

  return {
    success: true,
    message: `Application status updated to ${status.replace(/_/g, " ")}.`,
  };
}

/**
 * Update live match score and advance winner in tournament bracket
 */
export async function updateMatchScore(
  bracketId: string,
  matchId: string,
  score1: number,
  score2: number,
  status: "in_progress" | "completed",
  winnerId?: string
): Promise<AdminActionResult> {
  // Find match in seed bracket
  const match = SEED_BRACKET.matches.find((m) => m.id === matchId);
  if (match) {
    match.participant1.score = score1;
    if (match.participant2) {
      match.participant2.score = score2;
    }
    match.status = status;
    if (status === "completed") {
      match.winnerId = winnerId || (score1 > score2 ? match.participant1.id : match.participant2?.id);
    }
  }

  return {
    success: true,
    message: `Score updated to ${score1} - ${score2}. Status: ${status}.`,
  };
}

/**
 * Toggle event publish/unpublish status
 */
export async function toggleEventPublishStatus(
  eventId: string,
  isPublished: boolean
): Promise<AdminActionResult> {
  // In production: UPDATE events SET status = isPublished ? 'published' : 'draft' WHERE id = eventId
  void eventId;
  return {
    success: true,
    message: isPublished ? "Event published to public calendar." : "Event moved to draft.",
  };
}

/**
 * Dispatch emergency courtside delay / weather announcement
 */
export async function dispatchBroadcastAlert(
  message: string,
  severity: "info" | "warning" | "emergency" = "warning"
): Promise<AdminActionResult> {
  if (!message || message.trim().length === 0) {
    return { success: false, error: "Message cannot be empty." };
  }

  addBroadcastAlert(message.trim(), severity);

  return {
    success: true,
    message: "Broadcast announcement dispatched.",
  };
}

/**
 * Issue refund for transaction and log audit record
 */
export async function issueTransactionRefund(
  transactionId: string,
  reason: string = "Requested by tournament staff"
): Promise<AdminActionResult> {
  const success = recordRefund(transactionId);
  if (!success) {
    return { success: false, error: "Transaction not found." };
  }

  // In production:
  // 1. Call stripe.refunds.create({ payment_intent: ... })
  // 2. UPDATE payments SET status = 'refunded'
  // 3. INSERT INTO audit_logs (action, reason, staff_id)
  void reason;

  return {
    success: true,
    message: "Refund processed successfully via Stripe audit channel.",
  };
}
