# GAMEDAY Architectural & Operational Decisions Log

This document records architectural, design, and business logic decisions made across the GAMEDAY platform.

---

## 1. Design & Typography Decisions
- **Headline Font:** Google Fonts `Anton` loaded via `next/font/google` with CSS variable `--font-anton`. Used in UPPERCASE with line height `0.9` to `0.95` to evoke stadium scoreboards.
- **Body Font:** Google Fonts `Inter` loaded via `next/font/google` with CSS variable `--font-inter`. 16px base, relaxed line height.
- **Color Discipline:**
  - `ink` (`#000000`): Primary background for hero, footer, and dark stadium sections. Primary text on ivory.
  - `ivory` (`#F5F4EB`): Default page background. Text on dark backgrounds.
  - `gold` (`#C89A2B`): Strictly functional accent (primary CTAs, active nav indicators, focus rings, progress bars, active filter chips, small tags). Never used for large section backgrounds or body text.
- **Corner Radii:** Strictly 0px to 4px (square corners / athletic stadium feel). Rounded-none by default. No bubbly cards or drop shadows.
- **Wordmark Identity:** Canonical `<Logo variant="dark|light" />` component reading official vector assets from `/public/brand/` via `next/image`. Never styled text.

---

## 2. Default Business Logic & Engine Decisions (Section 12 Alignment)
- **Vendor Payment Timing:** Vendors submit applications for free. Payment happens AFTER admin review and slot approval via a single-use token link.
- **Vendor Payment Hold Window:** 48 hours default (admin configurable via `site_settings`). Expired holds release the slot to the next waitlisted applicant.
- **1v1 Checkout Hold Window:** 30 minutes. Abandoned checkout releases the spot back to the pool.
- **Intramural Fee Model:** Default is per-team fee (configurable per division). Team confirmation requires: fee paid, captain waiver signed, and division roster minimum met.
- **Refund Policy:** Handled manually in Stripe dashboard by admin, accompanied by an explicit "Mark refunded" audit action in the GAMEDAY admin panel.
- **Public User Identity:** No mandatory account creation for general participants/applicants. Email serves as the canonical identity. Team captains receive magic-link authentication to manage rosters.
- **Media / Gallery:** Admin-curated uploads only.
- **Currency & Timezone:** Currency is USD (amounts stored in cents). Event timezone stored per event (default `America/New_York`), with UTC timestamps in database.
- **Tournament Brackets:** Single elimination with automatic bye calculation for non-powers-of-two (top seeds receive round 1 byes).
- **Waivers:** Versioned in `waiver_versions`. Immutable signature records captured in `waiver_signatures` with IP address, user-agent, and timestamp.

---

## 3. Phase 3: Vendor Marketplace & Payments Decisions
- **Multi-Step Progressive Validation:** 4-step wizard (Business Info → Category & Tournament Selection → Inline Legal Waiver → Summary & Submit) using Zod schemas split per step with client-side error reflection before moving forward.
- **Upfront Fee Transparency:** Permit fees are displayed directly on tournament cards and in the event selector ($150 - $350 based on event scale and subcategory) so vendors know operating costs before curation review.
- **Single-Category Exclusivity Engine:** Strict `max_slots` per subcategory per event. When slots are full, applicants are automatically placed into the in-memory/database waitlist with queue position tracking.
- **Single-Use Payment Links:** Following curation approval, vendors receive a dedicated payment URL (`/vendors/pay/[token]`) with a 48-hour deadline countdown, initiating a Stripe Checkout session with line items and metadata tags (`slot_id`, `application_id`, `purpose: vendor_fee`).
- **Webhook Slot Confirmation:** Stripe `checkout.session.completed` events are received at `/api/stripe/webhooks`, verifying the Stripe signature and confirming the vendor's tournament slot with audit logging.
- **Graceful Stripe Fallback:** If `STRIPE_SECRET_KEY` is not present in `.env.local` or is set to placeholder values, payment routes return actionable configuration notices rather than breaking Next.js runtime execution.

