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


export const SEED_ADMIN_KPIS: AdminKPIs = {
  activeEventsCount: 0,
  totalAthletes: 0,
  grossRevenueCents: 0,
  pendingVendorApps: 0,
  waiverCompletionRate: 0,
  liveMatchesNow: 0,
};

export const SEED_VENDOR_APPLICATIONS: AdminVendorApplication[] = [];

export const SEED_WAIVER_AUDIT_LOGS: WaiverAuditRecord[] = [];

export const SEED_FINANCIAL_REPORT: FinancialReport = {
  totalGrossCents: 0,
  ticketSalesCents: 0,
  teamFeesCents: 0,
  vendorFeesCents: 0,
  sponsorshipCents: 0,
  recentTransactions: [],
};

export const SEED_BROADCAST_ALERTS: BroadcastAlert[] = [];

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
