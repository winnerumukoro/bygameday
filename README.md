# GAMEDAY Web Platform

The premier community sports, tournament brackets, and curated event operations platform. Built with a Nike-inspired monochrome visual language, scoreboard typography, and high-energy athletics photography.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components, Server Actions)
- **Language:** TypeScript strict mode
- **Styling:** Tailwind CSS with custom design tokens (`ink`, `ivory`, `gold`)
- **Database & Auth:** Supabase (PostgreSQL, Row Level Security on every table)
- **Payments:** Stripe (Checkout Sessions + Webhook confirmation)
- **Email:** Resend + React Email templates
- **Forms & Validation:** React Hook Form + Zod
- **Typography:** `Anton` (condensed heavy uppercase headlines) & `Inter` (body)

---

## Design System Rules

| Token | Hex Value | Permitted Usage |
|---|---|---|
| `ink` | `#000000` | Primary text, dark stadium sections, headers over dark hero |
| `ivory` | `#F5F4EB` | Default page background, light text on dark sections |
| `gold` | `#C89A2B` | **Functional accent ONLY:** Primary CTA buttons, active nav states, active filter chips, focus rings, progress indicators, form submit buttons |

> **Strict Rule:** Gold is NEVER used for section backgrounds, decorative fills, gradients, card borders, or body text.

---

## Project Structure

```
bygameday/
├── app/
│   ├── (public)/              # Public-facing views (Home, Events, Sports, Vendors, etc.)
│   ├── (admin)/admin/         # Admin operations portal
│   ├── api/                   # Stripe webhooks & Vercel cron endpoints
│   ├── layout.tsx             # Root layout with Anton/Inter fonts
│   └── globals.css            # Base Tailwind & design tokens
├── components/
│   ├── brand/                 # Logo, Header, Footer, Hero, EventCard, SectionHeader
│   ├── ui/                    # Restyled shadcn/ui primitives
│   └── forms/                 # Form fields & multi-step wrappers
├── lib/
│   ├── supabase/              # Browser, server, and service role clients
│   ├── stripe/                # Stripe checkout & webhook helpers
│   └── utils.ts               # Class merging utilities
├── supabase/
│   ├── migrations/            # Version-controlled SQL migrations with RLS
│   └── seed.sql               # Production-grade seed data
└── public/
    └── brand/                 # Canonical SVG wordmarks (dark & light)
```

---

## Local Development Setup

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and configure your API keys:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the platform.

### 4. Database Setup (Supabase)
Run migrations and seed data in your Supabase SQL editor or via Supabase CLI:
```bash
supabase db push
# or execute supabase/migrations/20260917000001_initial_schema.sql
# followed by supabase/seed.sql
```

---

## Deploying to Vercel

1. Push your repository to GitHub or GitLab.
2. Import project into Vercel.
3. Configure the environment variables specified in `.env.example`.
4. Deploy! Next.js will build statically and optimize all assets.
