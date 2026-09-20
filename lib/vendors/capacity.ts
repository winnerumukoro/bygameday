import {
  EVENT_VENDOR_CAPACITY,
  VENDOR_SUBCATEGORIES,
  VENDOR_CATEGORIES,
  type VendorSlotAvailability,
} from "./data";

/* ────────────────────────────────────────────────────────────
   Capacity Engine — Pure Functions
   
   In production these would be atomic Postgres queries with
   row-level locks (SELECT ... FOR UPDATE). The in-memory
   implementation here mirrors the exact interface.
   ──────────────────────────────────────────────────────────── */

/** In-memory slot tracking — simulates vendor_event_slots table */
const filledSlots = new Map<string, number>();

/** In-memory waitlist — simulates waitlist_position column */
const waitlists = new Map<string, string[]>(); // key → applicationId[]

export interface SlotCheckResult {
  available: boolean;
  total: number;
  filled: number;
  remaining: number;
  waitlistPosition?: number;
}

export interface SlotRequestResult {
  success: boolean;
  status: "requested" | "waitlisted";
  waitlistPosition?: number;
  slotId: string;
}

export interface SlotConfirmResult {
  success: boolean;
  slotId: string;
}

/**
 * Check if a slot is available for a given event + subcategory.
 */
export function checkSlotAvailability(
  eventId: string,
  subcategoryId: string
): SlotCheckResult {
  const cap = EVENT_VENDOR_CAPACITY.find(
    (c) => c.eventId === eventId && c.subcategoryId === subcategoryId
  );

  if (!cap) {
    return { available: false, total: 0, filled: 0, remaining: 0 };
  }

  const key = `${eventId}:${subcategoryId}`;
  const filled = filledSlots.get(key) ?? 0;
  const remaining = Math.max(0, cap.maxSlots - filled);

  return {
    available: remaining > 0,
    total: cap.maxSlots,
    filled,
    remaining,
  };
}

/**
 * Request a slot for an application. If capacity is full, adds to waitlist.
 */
export function requestSlot(
  applicationId: string,
  eventId: string,
  subcategoryId: string
): SlotRequestResult {
  const key = `${eventId}:${subcategoryId}`;
  const check = checkSlotAvailability(eventId, subcategoryId);

  const slotId = `slot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  if (check.available) {
    // Assign the slot
    filledSlots.set(key, (filledSlots.get(key) ?? 0) + 1);
    return { success: true, status: "requested", slotId };
  }

  // Add to waitlist
  const waitlist = waitlists.get(key) ?? [];
  waitlist.push(applicationId);
  waitlists.set(key, waitlist);

  return {
    success: true,
    status: "waitlisted",
    waitlistPosition: waitlist.length,
    slotId,
  };
}

/**
 * Confirm a slot after payment — marks as confirmed.
 * In production: UPDATE vendor_event_slots SET status = 'confirmed' WHERE id = slotId
 */
export function confirmSlotPayment(
  slotId: string,
  _paymentId: string
): SlotConfirmResult {
  void _paymentId;
  // In production this would update the slot record
  return { success: true, slotId };
}

/**
 * Expire unpaid slots past the hold window and promote waitlisted applicants.
 * In production: called by a cron job.
 */
export function expireUnpaidSlots(_holdHours: number = 48): {
  expired: number;
  promoted: number;
} {
  void _holdHours;
  // In production:
  // 1. SELECT * FROM vendor_event_slots WHERE status = 'approved_pending_payment' AND payment_deadline < NOW()
  // 2. UPDATE those to 'expired'
  // 3. For each, find next waitlisted and promote to 'approved_pending_payment'
  return { expired: 0, promoted: 0 };
}

/**
 * Release a slot (cancellation) and promote the next waitlisted applicant.
 */
export function releaseSlot(
  eventId: string,
  subcategoryId: string,
  _slotId: string
): { released: boolean; promotedApplicationId?: string } {
  void _slotId;
  const key = `${eventId}:${subcategoryId}`;
  const current = filledSlots.get(key) ?? 0;

  if (current > 0) {
    filledSlots.set(key, current - 1);
  }

  // Check waitlist for promotion
  const waitlist = waitlists.get(key) ?? [];
  if (waitlist.length > 0) {
    const nextApp = waitlist.shift()!;
    waitlists.set(key, waitlist);
    filledSlots.set(key, (filledSlots.get(key) ?? 0) + 1);
    return { released: true, promotedApplicationId: nextApp };
  }

  return { released: true };
}

/**
 * Get full slot availability for display — enriched with names.
 */
export function getEnrichedSlotAvailability(
  eventId: string,
  subcategoryId: string
): VendorSlotAvailability {
  const check = checkSlotAvailability(eventId, subcategoryId);
  const sub = VENDOR_SUBCATEGORIES.find((s) => s.id === subcategoryId);
  const cat = sub
    ? VENDOR_CATEGORIES.find((c) => c.id === sub.categoryId)
    : undefined;

  const cap = EVENT_VENDOR_CAPACITY.find(
    (c) => c.eventId === eventId && c.subcategoryId === subcategoryId
  );

  return {
    subcategoryId,
    subcategoryName: sub?.name ?? "Unknown",
    categoryName: cat?.name ?? "Unknown",
    total: check.total,
    filled: check.filled,
    available: check.remaining,
    feeCents: cap?.feeCents ?? 0,
  };
}
