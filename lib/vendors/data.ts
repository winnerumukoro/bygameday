import {
  type GamedayEvent,
  getAllPublishedEvents,
} from "@/lib/events/data";

/* ─────────────────────────── Types ─────────────────────────── */

export interface VendorCategory {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
}

export interface VendorSubcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export interface EventVendorCapacity {
  id: string;
  eventId: string;
  subcategoryId: string;
  maxSlots: number;
  feeCents: number;
}

export interface VendorSlotAvailability {
  subcategoryId: string;
  subcategoryName: string;
  categoryName: string;
  total: number;
  filled: number;
  available: number;
  feeCents: number;
}

export interface VendorAcceptingEvent extends GamedayEvent {
  slots: VendorSlotAvailability[];
  feeRange: { min: number; max: number };
}

/* ─────────────────────── Seed Data ──────────────────────── */

export const VENDOR_CATEGORIES: VendorCategory[] = [
  {
    id: "c0000000-0000-0000-0000-000000000001",
    name: "Food & Beverage",
    slug: "food",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "c0000000-0000-0000-0000-000000000002",
    name: "Merchandise & Apparel",
    slug: "merch",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "c0000000-0000-0000-0000-000000000003",
    name: "Services & Experiences",
    slug: "services",
    sortOrder: 3,
    isActive: true,
  },
];

export const VENDOR_SUBCATEGORIES: VendorSubcategory[] = [
  { id: "c1000000-0000-0000-0000-000000000001", categoryId: "c0000000-0000-0000-0000-000000000001", name: "Tacos & Mexican", slug: "tacos", isActive: true },
  { id: "c1000000-0000-0000-0000-000000000002", categoryId: "c0000000-0000-0000-0000-000000000001", name: "Smash Burgers", slug: "burgers", isActive: true },
  { id: "c1000000-0000-0000-0000-000000000003", categoryId: "c0000000-0000-0000-0000-000000000001", name: "Wings & BBQ", slug: "wings", isActive: true },
  { id: "c1000000-0000-0000-0000-000000000004", categoryId: "c0000000-0000-0000-0000-000000000001", name: "Artisan Desserts & Ice Cream", slug: "desserts", isActive: true },
  { id: "c1000000-0000-0000-0000-000000000005", categoryId: "c0000000-0000-0000-0000-000000000001", name: "Craft Beverages & Boba", slug: "drinks", isActive: true },
  { id: "c1000000-0000-0000-0000-000000000006", categoryId: "c0000000-0000-0000-0000-000000000001", name: "Vegan & Plant-Based", slug: "vegan", isActive: true },
  { id: "c1000000-0000-0000-0000-000000000007", categoryId: "c0000000-0000-0000-0000-000000000002", name: "Streetwear & Athletic Apparel", slug: "apparel", isActive: true },
  { id: "c1000000-0000-0000-0000-000000000008", categoryId: "c0000000-0000-0000-0000-000000000002", name: "Sporting Goods & Accessories", slug: "accessories", isActive: true },
  { id: "c1000000-0000-0000-0000-000000000009", categoryId: "c0000000-0000-0000-0000-000000000003", name: "Event Photography & Media", slug: "photography", isActive: true },
  { id: "c1000000-0000-0000-0000-000000000010", categoryId: "c0000000-0000-0000-0000-000000000003", name: "Pop-Up Barber & Grooming", slug: "barber", isActive: true },
  { id: "c1000000-0000-0000-0000-000000000011", categoryId: "c0000000-0000-0000-0000-000000000003", name: "Face Paint & Fan Art", slug: "face-paint", isActive: true },
];

/** Capacity configs matching seed.sql — expanded across more events */
// Slot counts and permit fees are set per real event; none are published yet.
export const EVENT_VENDOR_CAPACITY: EventVendorCapacity[] = [];

/**
 * In-memory slot tracking — simulates the `vendor_event_slots` table.
 * In production this would be atomic Postgres queries.
 */
const filledSlots = new Map<string, number>();

/* ────────────────────── Data Access ─────────────────────── */

export function getVendorCategories(): VendorCategory[] {
  return VENDOR_CATEGORIES.filter((c) => c.isActive).sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
}

export function getSubcategoriesByCategoryId(
  categoryId: string
): VendorSubcategory[] {
  return VENDOR_SUBCATEGORIES.filter(
    (s) => s.categoryId === categoryId && s.isActive
  );
}

export function getSubcategoryById(
  subcategoryId: string
): VendorSubcategory | undefined {
  return VENDOR_SUBCATEGORIES.find((s) => s.id === subcategoryId);
}

export function getCategoryById(
  categoryId: string
): VendorCategory | undefined {
  return VENDOR_CATEGORIES.find((c) => c.id === categoryId);
}

export function getEventVendorCapacity(
  eventId: string
): EventVendorCapacity[] {
  return EVENT_VENDOR_CAPACITY.filter((c) => c.eventId === eventId);
}

export function getSlotAvailability(
  eventId: string,
  subcategoryId: string
): VendorSlotAvailability {
  const cap = EVENT_VENDOR_CAPACITY.find(
    (c) => c.eventId === eventId && c.subcategoryId === subcategoryId
  );
  const sub = getSubcategoryById(subcategoryId);
  const cat = sub
    ? VENDOR_CATEGORIES.find((c) => c.id === sub.categoryId)
    : undefined;

  const key = `${eventId}:${subcategoryId}`;
  const filled = filledSlots.get(key) ?? 0;
  const total = cap?.maxSlots ?? 0;

  return {
    subcategoryId,
    subcategoryName: sub?.name ?? "Unknown",
    categoryName: cat?.name ?? "Unknown",
    total,
    filled,
    available: Math.max(0, total - filled),
    feeCents: cap?.feeCents ?? 0,
  };
}

/** Get all slot availability details for a vendor-accepting event */
export function getEventSlotsSummary(
  eventId: string
): VendorSlotAvailability[] {
  const caps = getEventVendorCapacity(eventId);
  return caps.map((cap) => getSlotAvailability(eventId, cap.subcategoryId));
}

/** Get all events that accept vendors with their slot summaries */
export function getVendorAcceptingEvents(): VendorAcceptingEvent[] {
  const allEvents = getAllPublishedEvents();
  const vendorEvents = allEvents.filter((e) => e.acceptsVendors);

  return vendorEvents.map((event) => {
    const slots = getEventSlotsSummary(event.id);
    const fees = slots.map((s) => s.feeCents).filter((f) => f > 0);
    return {
      ...event,
      slots,
      feeRange: {
        min: fees.length > 0 ? Math.min(...fees) : 0,
        max: fees.length > 0 ? Math.max(...fees) : 0,
      },
    };
  });
}

/** Format cents as USD — e.g. 35000 → "$350" */
export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
