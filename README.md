# GAMEDAY — Community Sports & Tournament Operations Platform

The premier community sports, tournament brackets, and curated event operations platform. Built with a Nike-inspired monochrome visual language, scoreboard typography, and high-energy athletics photography.

---

## ⚡ Platform Capabilities Overview

GAMEDAY is a production-grade full-stack operations platform supporting:

1. **Public Marketing & Event Discovery:**
   - Scoreboard hero with ken-burns visuals and dynamic registration status.
   - Filterable events calendar (List & FullCalendar views) with real-time sport, date, and venue filters.
   - Dynamic iCal feed (`/calendar.ics`) and single-event calendar downloads.
   - Photography gallery with category filters and full-screen lightbox.
   - Multi-tier corporate sponsorship hub with structured inquiry routing.
   - Versioned legal waiver system (`/waiver/v1`) with full ESIGN/UETA compliance.

2. **Vendor Marketplace & Turnkey Concessions:**
   - 3 main categories (*Food & Beverage, Merchandise & Apparel, Services & Experiences*) across 11 subcategories.
   - Strict category exclusivity engine enforcing `max_slots` limits per specialty.
   - Multi-step vendor application wizard with business verification and instant agreement signing.
   - Single-use 48-hour payment links powered by Stripe Checkout with automatic slot expiration.
   - Stripe webhook integration (`checkout.session.completed`) with HMAC signature verification.

3. **Athletic Competitions & Tournament Engine:**
   - Dual competition formats: **1v1 King of the Court** showdowns & **Intramural Team Brackets**.
   - Captain-led squad registration with unique shareable invite codes (`/teams/join/[inviteCode]`).
   - Roster eligibility gate: requires min player counts and 100% signed athletic liability releases before tournament draw.
   - Public Free Agent pool allowing unattached athletes to register and get recruited by team captains.
   - Interactive single-elimination tournament bracket engine with automated bye calculation for non-powers-of-two draws.
   - Responsive bracket visualizer: horizontal tree for desktop, round-by-round switcher for mobile.

4. **Internal Admin Operations Console (`/admin`):**
   - High-contrast courtside operations dashboard engineered for laptops and tablets courtside.
   - Executive telemetry: Gross Revenue, Rostered Athletes, Active Tournaments, Pending Vendor Queue, and Signed Waiver Compliance %.
   - Event operations table with instant publish/unpublish toggles.
   - Vendor pipeline manager with category slot allocation visualizer and one-click 48h payment approvals.
   - Tournament control panel with live match scorekeepers (+1, +2, +3, -1) and automatic bracket advancement.
   - Searchable legal waiver audit log with client IP addresses, user agents, and instant CSV export.
   - Financial reporting breakdown across ticket sales, team fees, vendor permits, and sponsorships, with audited refund controls.
   - Role-based route guard middleware with demo persona switcher (*Tournament Director, Courtside Scorer, Venue Lead*).

---

## 🎨 Design System Standards

| Token | Hex Value | Permitted Usage |
|---|---|---|
| `ink` | `#000000` | Primary text, dark stadium sections, scoreboard cards, headers over dark hero |
| `ivory` | `#F5F4EB` | Default page background, light text on dark sections |
| `gold` | `#C89A2B` | **Functional accent ONLY:** Primary CTA buttons, active nav states, active filter chips, focus rings, progress bars, form submit buttons |

> **Strict Brand Rule:** Gold is NEVER used for section backgrounds, decorative fills, gradients, card borders, or body text.

### Typography
- **Headlines:** `Anton` (condensed heavy uppercase, tracking tight, athletic scoreboard display).
- **Body & Controls:** `Inter` (neutral, high legibility, clean tabular figures for scoreboards and timers).
- **Logomark:** The `<Logo variant="dark|light" />` component is the single source of truth. The word "GAMEDAY" is never manually styled as raw text.

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components, Server Actions)
- **Language:** Strict TypeScript (0 errors)
- **Styling:** Tailwind CSS with custom design tokens
- **Database & Auth:** Supabase (PostgreSQL, 28 normalized tables, Row Level Security on every table)
- **Payments:** Stripe (`stripe` SDK with API version `2026-08-26.dahlia`, Checkout Sessions, Webhooks)
- **Forms & Validation:** React Hook Form + Zod
- **Icons:** Lucide React
- **Dates & Calendars:** `date-fns`, FullCalendar with dynamic SSR loading
- **OpenGraph:** Dynamic social cards generated via `@vercel/og` (`ImageResponse`)

---

## 📁 Repository Structure

```
bygameday/
├── app/
│   ├── (admin)/admin/         # Internal operations console & staff tools
│   │   ├── events/            # Event operations & publishing toggles
│   │   ├── financials/        # Stripe reconciliation & revenue breakdown
│   │   ├── login/             # Staff authentication & demo role switcher
│   │   ├── tournaments/       # Courtside live scoring & bracket advancement
│   │   ├── vendors/           # Vendor curation queue & 48h hold approvals
│   │   ├── waivers/           # Legal waiver compliance & CSV audit export
│   │   ├── layout.tsx         # Dedicated high-contrast courtside shell
│   │   └── page.tsx           # Executive KPI dashboard
│   ├── (public)/              # Consumer-facing public application
│   │   ├── events/            # Calendar & event detail pages
│   │   ├── sports/            # Sports hub, 1v1 registration, team registration, free agents
│   │   ├── teams/             # Captain dashboard & teammate join pages
│   │   ├── vendors/           # Vendor hub, multi-step application wizard, payment portal
│   │   ├── sponsors/          # Sponsorship packages & inquiry form
│   │   ├── gallery/           # Masonry photography gallery with lightbox
│   │   ├── waiver/            # Versioned legal waiver viewer
│   │   └── page.tsx           # Scoreboard landing page
│   ├── api/                   # Stripe webhooks & calendar feeds
│   ├── error.tsx              # Branded error boundary ("Technical Foul On The Play")
│   ├── not-found.tsx          # Branded 404 screen ("Out Of Bounds")
│   ├── opengraph-image.tsx    # Dynamic OpenGraph social card (1200x630)
│   ├── robots.ts              # Search engine directives (disallowing /admin and /api)
│   ├── sitemap.ts             # Automated dynamic XML sitemap
│   ├── layout.tsx             # Root layout with fonts & SEO metadataBase
│   └── globals.css            # Design tokens & athletic utility styles
├── components/
│   ├── admin/                 # Courtside operations components & modals
│   ├── brand/                 # Logo, Hero, Header, Footer, EventCard, SectionHeader
│   ├── sports/                # Bracket visualizer, match cards, roster manager, waivers
│   ├── vendors/               # Application wizard steps, category browser
│   ├── calendar/              # FullCalendar wrapper & list view
│   └── ui/                    # CVA button primitives
├── lib/
│   ├── admin/                 # Admin data layer, state mutators & server actions
│   ├── sports/                # Sports data, Zod schemas, single-elimination bracket engine
│   ├── vendors/               # Vendor categories, validation schemas & server actions
│   ├── events/                # Calendar events data & filtering engine
│   ├── stripe/                # Stripe client & checkout session helpers
│   ├── supabase/              # Browser, server, and service-role clients
│   └── utils.ts               # Class merging utilities
├── middleware.ts              # Route protection middleware for /admin/*
├── supabase/
│   ├── migrations/            # Version-controlled SQL schema (28 tables + RLS + functions)
│   └── seed.sql               # Production seed data (events, sports, divisions, vendors)
├── DECISIONS.md               # Architectural decision record across all 6 phases
└── README.md                  # Project documentation & handover guide
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js 20+ (tested on Node v24.13.0)
- npm 10+ (tested on npm 11.6.2)

### 2. Installation
```bash
git clone https://github.com/winnerumukoro/bygameday.git
cd bygameday
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Required keys:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Email
RESEND_API_KEY=re_...
```
*(Note: If Stripe or Supabase keys are not set, the platform operates in a seamless, graceful fallback mode with mock data and zero build or runtime crashes).*

### 4. Start Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to view the operations console.

### 5. Database Setup (Supabase)
Run the migration and seed data in your Supabase SQL Editor:
1. Execute `supabase/migrations/20260917000001_initial_schema.sql` (creates 28 tables, custom enums, RLS policies, and triggers).
2. Execute `supabase/seed.sql` (seeds 10 events, 3 vendor categories, 11 subcategories, 5 sports, 6 divisions, sponsor tiers, and legal waivers).

---

## 🔒 Admin Console Demo Access

The admin console at `/admin` is guarded by Next.js middleware.

For local development and stakeholder demonstrations, visit `/admin/login` and use the **Demo Staff Switcher**:
- **Tournament Director (Admin):** Full control over financials, event publishing, vendor curation, and tournament brackets.
- **Courtside Scorer (Scorekeeper):** Fast scorekeeping interface with +1/+2/+3 point buttons and live winner advancement.
- **Venue Operations Lead:** Access to signed waiver audit logs and emergency announcement broadcasts.

---

## 🧪 Quality Verification & Testing

The project adheres to strict automated quality gates:

```bash
# 1. Strict TypeScript check (0 errors)
npx tsc --noEmit

# 2. Next.js ESLint validation (0 warnings, 0 errors)
npm run lint

# 3. Production build (compiles all 48+ routes and dynamic OG image)
npm run build
```

---

## 🚢 Production Deployment (Vercel)

The repository is configured for automated CI/CD on Vercel:

1. Push to `origin/main`.
2. Vercel detects Next.js 15 App Router and executes `npm run build`.
3. Configure environment variables in the Vercel project dashboard.
4. Setup Stripe Webhook endpoint pointing to `https://your-domain.com/api/stripe/webhooks` listening for `checkout.session.completed`.

---

© 2026 GAMEDAY Technologies LLC. All rights reserved.
