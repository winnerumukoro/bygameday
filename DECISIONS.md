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

---

## 4. Phase 4: Sports Registration, Team Rosters & Tournament Brackets Decisions
- **Dual Competitive Formats:** Platform supports two distinct competition models — *1v1 King of Court* (individual showdown, per-player fee, 30-minute checkout hold) and *Intramural Team Brackets* (captain-led squad registration, per-team fee, shareable invite code roster building).
- **Captain-Led Roster Model:** The team captain registers the squad, pays the team fee, and receives a unique invite code (e.g., `UPTOWN-882`). Teammates join via `/teams/join/[inviteCode]` and independently sign the athletic liability waiver.
- **Roster Eligibility Gating:** Teams are only tournament-eligible when three conditions are met: (1) team fee paid, (2) captain waiver signed, (3) division roster minimum met with all rostered players having signed waivers.
- **Athletic Waiver Enforcement:** Every competitor — 1v1 athletes, team captains, rostered players, and free agents — must electronically sign the versioned Athletic Participation & Injury Release (Section A, v1) before being eligible to compete.
- **Single-Elimination Bracket Engine:** Automatic bye calculation for non-powers-of-two using `nextPowerOfTwo()`. Top seeds receive round 1 byes. Standard round naming (Round of 16, Quarterfinals, Semifinals, Championship). Match states: Scheduled, In Progress (Live), Completed, Bye.
- **Free Agent Pool:** Solo athletes register into a public directory browsable by team captains. Free agents sign the athletic waiver at registration time so they are immediately game-ready when drafted.

---

## 5. Phase 5: Internal Admin Dashboard & Operations Decisions
- **Courtside Operational Shell:** Clean, high-contrast operations interface isolated from the consumer site layout. Employs large touch targets and instant state updates for tablet/laptop scorers courtside.
- **Role-Based Protection:** Route guard middleware protects all `/admin/*` routes (with the exception of `/admin/login`). Supports both Supabase Auth session tokens and zero-latency demo role switching (`gameday_staff_role` cookie) for stakeholder walkthroughs.
- **Vendor Curation & 48h Countdown:** Staff review brand menus against category exclusivity rules. One-click approvals automatically calculate and stamp a 48-hour expiration deadline (`paymentDeadline`), preparing the slot for payment token generation.
- **Courtside Live Match Scoring:** Modal scoring interface enables scorekeepers to record points (+1, +2, +3, -1) and mark matches completed, automatically assigning winners and advancing competitors through the bracket.
- **Legal Waiver Compliance & CSV Export:** Immutable audit log captures legal signatures with IP addresses and user-agent strings, supporting instantaneous on-demand client-side CSV downloads for venue authorities.
- **Financial Reconciliation & Stripe Refund Audit:** Displays revenue distribution across spectator tickets, team registrations, vendor concessions, and sponsorships, with manual refund modals that record reason codes for audit accountability.

---

## 6. Phase 6: Polish, Performance & Production Launch Decisions
- **Athletic Scoreboard 404 & Error Boundaries:** Replaces default browser and framework error screens with high-impact branded experiences: *"404: OUT OF BOUNDS"* and *"TECHNICAL FOUL ON THE PLAY"*, featuring contextual recovery buttons to return users directly to active calendar or bracket views.
- **Dynamic OpenGraph Social Generation:** Built using Next.js `ImageResponse` (`@vercel/og`) at `app/opengraph-image.tsx` (1200x630) to generate live, branded social sharing cards with Gold accents and dynamic season tags for WhatsApp, iMessage, Twitter/X, and LinkedIn previews.
- **SEO & Metadata Hierarchy:** Root layout defines `metadataBase`, Twitter large image summary cards, canonical link declarations, and explicit crawler rules (allowing public routes while strictly disallowing `/admin/` and `/api/`).
- **Production Performance Budget:** Enforces font preloading via `next/font/google` CSS variables (`fontAnton`, `fontInter`), zero runtime JavaScript bloat, dynamic chunk loading for heavier vendor/sports components, and automated static generation for all static & semi-dynamic tournament routes.




