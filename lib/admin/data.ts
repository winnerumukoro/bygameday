/* ─────────────────────────── Types ─────────────────────────── */

export interface AdminKPIs {
  activeEventsCount: number;
  totalAthletes: number;
  grossRevenueCents: number;
  pendingVendorApps: number;
  waiverCompletionRate: number;
  liveMatchesNow: number;
}

export type VendorPipelineStatus =
  | "submitted"
  | "reviewing"
  | "approved_pending_payment"
  | "confirmed"
  | "rejected"
  | "waitlisted";

export interface AdminVendorApplication {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  categoryName: string;
  subcategoryId: string;
  subcategoryName: string;
  targetEventId: string;
  targetEventTitle: string;
  feeCents: number;
  status: VendorPipelineStatus;
  submittedAt: string;
  paymentDeadline?: string;
  rejectionReason?: string;
}

export interface WaiverAuditRecord {
  id: string;
  signerName: string;
  signerEmail: string;
  role: "athlete" | "captain" | "vendor";
  targetEntity: string;
  waiverVersion: string;
  ipAddress: string;
  userAgent: string;
  signedAt: string;
}

export interface FinancialTransaction {
  id: string;
  customerName: string;
  email: string;
  purpose: "team_fee" | "individual_fee" | "vendor_fee" | "sponsorship";
  amountCents: number;
  status: "succeeded" | "refunded";
  stripeSessionId: string;
  date: string;
}

export interface FinancialReport {
  totalGrossCents: number;
  ticketSalesCents: number;
  vendorFeesCents: number;
  teamFeesCents: number;
  sponsorshipCents: number;
  recentTransactions: FinancialTransaction[];
}

export interface BroadcastAlert {
  id: string;
  message: string;
  severity: "info" | "warning" | "emergency";
  active: boolean;
  postedAt: string;
}

/* ─────────────────────────── Seed Data ─────────────────────────── */

const NOW = Date.now();
const HOUR = 60 * 60 * 1000;

export const SEED_ADMIN_KPIS: AdminKPIs = {
  activeEventsCount: 8,
  totalAthletes: 1840,
  grossRevenueCents: 6425000, // $64,250.00
  pendingVendorApps: 4,
  waiverCompletionRate: 98.2,
  liveMatchesNow: 3,
};

export const SEED_VENDOR_APPLICATIONS: AdminVendorApplication[] = [
  {
    id: "app-v-001",
    businessName: "Gotham Smash Burgers",
    contactName: "Derrick Bell",
    email: "derrick@gothamsmash.com",
    phone: "(555) 301-4422",
    city: "New York, NY",
    categoryName: "Food & Beverage",
    subcategoryId: "c1000000-0000-0000-0000-000000000001",
    subcategoryName: "Smash Burgers",
    targetEventId: "b0000000-0000-0000-0000-000000000001",
    targetEventTitle: "Interhouse 5v5 Basketball Championship",
    feeCents: 35000,
    status: "submitted",
    submittedAt: new Date(NOW - 3 * HOUR).toISOString(),
  },
  {
    id: "app-v-002",
    businessName: "Cortado Craft Coffee & Cold Brew",
    contactName: "Maya Lin",
    email: "maya@cortadocraft.com",
    phone: "(555) 412-8899",
    city: "Brooklyn, NY",
    categoryName: "Food & Beverage",
    subcategoryId: "c1000000-0000-0000-0000-000000000003",
    subcategoryName: "Coffee & Beverage Bar",
    targetEventId: "b0000000-0000-0000-0000-000000000001",
    targetEventTitle: "Interhouse 5v5 Basketball Championship",
    feeCents: 25000,
    status: "reviewing",
    submittedAt: new Date(NOW - 14 * HOUR).toISOString(),
  },
  {
    id: "app-v-003",
    businessName: "Courtside Athletics Apparel Co.",
    contactName: "Andre Santos",
    email: "andre@courtsidebrand.com",
    phone: "(555) 789-2231",
    city: "Queens, NY",
    categoryName: "Merchandise & Apparel",
    subcategoryId: "c1000000-0000-0000-0000-000000000005",
    subcategoryName: "Sportswear & Athleisure",
    targetEventId: "b0000000-0000-0000-0000-000000000002",
    targetEventTitle: "Midnight 1v1 Streetball Showcase",
    feeCents: 30000,
    status: "approved_pending_payment",
    submittedAt: new Date(NOW - 28 * HOUR).toISOString(),
    paymentDeadline: new Date(NOW + 20 * HOUR).toISOString(),
  },
  {
    id: "app-v-004",
    businessName: "Empire Recovery Cryo & Massage",
    contactName: "Dr. Rachel Kim",
    email: "rachel@empirerecovery.com",
    phone: "(555) 902-1144",
    city: "New York, NY",
    categoryName: "Services & Experiences",
    subcategoryId: "c1000000-0000-0000-0000-000000000009",
    subcategoryName: "Athlete Recovery & Physical Therapy",
    targetEventId: "b0000000-0000-0000-0000-000000000001",
    targetEventTitle: "Interhouse 5v5 Basketball Championship",
    feeCents: 20000,
    status: "confirmed",
    submittedAt: new Date(NOW - 48 * HOUR).toISOString(),
  },
  {
    id: "app-v-005",
    businessName: "Harlem Taco Lab",
    contactName: "Carlos Reyes",
    email: "carlos@tacolab.com",
    phone: "(555) 888-3412",
    city: "Harlem, NY",
    categoryName: "Food & Beverage",
    subcategoryId: "c1000000-0000-0000-0000-000000000002",
    subcategoryName: "Artisanal Pizza & Italian",
    targetEventId: "b0000000-0000-0000-0000-000000000001",
    targetEventTitle: "Interhouse 5v5 Basketball Championship",
    feeCents: 35000,
    status: "waitlisted",
    submittedAt: new Date(NOW - 36 * HOUR).toISOString(),
  },
  {
    id: "app-v-006",
    businessName: "Brooklyn Hoop Kicks LLC",
    contactName: "Jason Reed",
    email: "jason@hoopkicks.com",
    phone: "(555) 123-9999",
    city: "Brooklyn, NY",
    categoryName: "Merchandise & Apparel",
    subcategoryId: "c1000000-0000-0000-0000-000000000007",
    subcategoryName: "Sneaker Care & Customization",
    targetEventId: "b0000000-0000-0000-0000-000000000002",
    targetEventTitle: "Midnight 1v1 Streetball Showcase",
    feeCents: 25000,
    status: "rejected",
    submittedAt: new Date(NOW - 72 * HOUR).toISOString(),
    rejectionReason: "Conflict with official tournament footwear title sponsor guidelines.",
  },
];

export const SEED_WAIVER_AUDIT_LOGS: WaiverAuditRecord[] = [
  {
    id: "w-rec-001",
    signerName: "Marcus Vance",
    signerEmail: "marcus@uptown.com",
    role: "captain",
    targetEntity: "Uptown Monstars (5v5 Basketball)",
    waiverVersion: "v1",
    ipAddress: "72.229.28.185",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)",
    signedAt: new Date(NOW - 2 * HOUR).toISOString(),
  },
  {
    id: "w-rec-002",
    signerName: "Kyrie Mitchell",
    signerEmail: "kyrie@email.com",
    role: "athlete",
    targetEntity: "Midnight 1v1 Streetball Clash",
    waiverVersion: "v1",
    ipAddress: "108.35.241.90",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/122.0.0.0",
    signedAt: new Date(NOW - 5 * HOUR).toISOString(),
  },
  {
    id: "w-rec-003",
    signerName: "Derrick Bell",
    signerEmail: "derrick@gothamsmash.com",
    role: "vendor",
    targetEntity: "Gotham Smash Burgers (Vendor Permit)",
    waiverVersion: "v1",
    ipAddress: "68.198.112.44",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/122.0.0.0",
    signedAt: new Date(NOW - 8 * HOUR).toISOString(),
  },
  {
    id: "w-rec-004",
    signerName: "Elena Rostova",
    signerEmail: "elena.r@outlook.com",
    role: "athlete",
    targetEntity: "Free Agent Pool (Volleyball)",
    waiverVersion: "v1",
    ipAddress: "173.68.14.205",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X)",
    signedAt: new Date(NOW - 12 * HOUR).toISOString(),
  },
  {
    id: "w-rec-005",
    signerName: "Deon Jackson",
    signerEmail: "deon@flight.com",
    role: "captain",
    targetEntity: "Brooklyn Flight Squad (5v5 Basketball)",
    waiverVersion: "v1",
    ipAddress: "96.250.88.19",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3) Safari/605.1.15",
    signedAt: new Date(NOW - 24 * HOUR).toISOString(),
  },
  {
    id: "w-rec-006",
    signerName: "Tariq Owens",
    signerEmail: "tariq@uptown.com",
    role: "athlete",
    targetEntity: "Uptown Monstars (Rostered Player)",
    waiverVersion: "v1",
    ipAddress: "74.108.192.11",
    userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro)",
    signedAt: new Date(NOW - 26 * HOUR).toISOString(),
  },
];

export const SEED_FINANCIAL_REPORT: FinancialReport = {
  totalGrossCents: 6425000,
  ticketSalesCents: 2450000, // $24,500
  teamFeesCents: 2250000,    // $22,500
  vendorFeesCents: 875000,   // $8,750
  sponsorshipCents: 850000,  // $8,500
  recentTransactions: [
    {
      id: "tx-1001",
      customerName: "Marcus Vance",
      email: "marcus@uptown.com",
      purpose: "team_fee",
      amountCents: 45000,
      status: "succeeded",
      stripeSessionId: "cs_live_9921_monstars",
      date: new Date(NOW - 2 * HOUR).toISOString(),
    },
    {
      id: "tx-1002",
      customerName: "Andre Santos",
      email: "andre@courtsidebrand.com",
      purpose: "vendor_fee",
      amountCents: 30000,
      status: "succeeded",
      stripeSessionId: "cs_live_8841_courtside",
      date: new Date(NOW - 6 * HOUR).toISOString(),
    },
    {
      id: "tx-1003",
      customerName: "Deon Jackson",
      email: "deon@flight.com",
      purpose: "team_fee",
      amountCents: 45000,
      status: "succeeded",
      stripeSessionId: "cs_live_7712_flight",
      date: new Date(NOW - 18 * HOUR).toISOString(),
    },
    {
      id: "tx-1004",
      customerName: "Leo Rossi",
      email: "leo@lobsters.com",
      purpose: "team_fee",
      amountCents: 45000,
      status: "succeeded",
      stripeSessionId: "cs_live_6623_lobsters",
      date: new Date(NOW - 26 * HOUR).toISOString(),
    },
    {
      id: "tx-1005",
      customerName: "Jordan Smith",
      email: "jordan@example.com",
      purpose: "individual_fee",
      amountCents: 5000,
      status: "refunded",
      stripeSessionId: "cs_live_5514_refunded",
      date: new Date(NOW - 48 * HOUR).toISOString(),
    },
  ],
};

export const SEED_BROADCAST_ALERTS: BroadcastAlert[] = [
  {
    id: "alert-001",
    message: "Court 2 matches delayed 15 minutes for floor moisture dry-down. Scorer table holds game clock.",
    severity: "warning",
    active: true,
    postedAt: new Date(NOW - 10 * 60 * 1000).toISOString(),
  },
];

/* ────────────────────────── State Stores ────────────────────────── */

const inMemoryApplications = [...SEED_VENDOR_APPLICATIONS];
const inMemoryWaivers = [...SEED_WAIVER_AUDIT_LOGS];
const inMemoryFinancials = { ...SEED_FINANCIAL_REPORT };
const inMemoryAlerts = [...SEED_BROADCAST_ALERTS];

/* ────────────────────────── Query Methods ────────────────────────── */

export function getAdminKPIs(): AdminKPIs {
  return {
    ...SEED_ADMIN_KPIS,
    pendingVendorApps: inMemoryApplications.filter((a) => a.status === "submitted" || a.status === "reviewing").length,
  };
}

export function getAdminVendorApplications(): AdminVendorApplication[] {
  return inMemoryApplications;
}

export function getWaiverAuditLogs(): WaiverAuditRecord[] {
  return inMemoryWaivers;
}

export function getFinancialReport(): FinancialReport {
  return inMemoryFinancials;
}

export function getBroadcastAlerts(): BroadcastAlert[] {
  return inMemoryAlerts;
}

export function updateVendorApplication(
  id: string,
  newStatus: VendorPipelineStatus,
  reason?: string
): boolean {
  const app = inMemoryApplications.find((a) => a.id === id);
  if (!app) return false;

  app.status = newStatus;
  if (newStatus === "approved_pending_payment") {
    app.paymentDeadline = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
  }
  if (reason) {
    app.rejectionReason = reason;
  }
  return true;
}

export function recordRefund(transactionId: string): boolean {
  const tx = inMemoryFinancials.recentTransactions.find((t) => t.id === transactionId);
  if (!tx) return false;
  tx.status = "refunded";
  return true;
}

export function addBroadcastAlert(message: string, severity: "info" | "warning" | "emergency"): BroadcastAlert {
  const alert: BroadcastAlert = {
    id: `alert-${Date.now()}`,
    message,
    severity,
    active: true,
    postedAt: new Date().toISOString(),
  };
  inMemoryAlerts.unshift(alert);
  return alert;
}
