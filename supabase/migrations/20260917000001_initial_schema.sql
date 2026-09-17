-- GAMEDAY Platform - Core Database Schema Migration
-- Migration: 20260917000001_initial_schema.sql
-- Description: Complete 28-table schema with enums, indexes, triggers, and Row Level Security (RLS)

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE event_source AS ENUM ('gameday', 'community');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled');
CREATE TYPE submission_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE vendor_application_status AS ENUM ('draft', 'submitted', 'under_review', 'rejected', 'withdrawn');
CREATE TYPE vendor_slot_status AS ENUM ('requested', 'waitlisted', 'approved_pending_payment', 'confirmed', 'expired', 'cancelled', 'rejected');
CREATE TYPE division_format AS ENUM ('1v1', 'intramural');
CREATE TYPE fee_model AS ENUM ('per_team', 'per_player');
CREATE TYPE team_status AS ENUM ('pending', 'waitlisted', 'confirmed', 'cancelled');
CREATE TYPE team_member_role AS ENUM ('captain', 'player');
CREATE TYPE team_member_status AS ENUM ('invited', 'accepted', 'removed');
CREATE TYPE free_agent_status AS ENUM ('available', 'placed', 'withdrawn');
CREATE TYPE registration_status AS ENUM ('pending_payment', 'waitlisted', 'confirmed', 'cancelled');
CREATE TYPE bracket_type AS ENUM ('single_elimination');
CREATE TYPE bracket_status AS ENUM ('draft', 'published', 'completed');
CREATE TYPE match_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled');
CREATE TYPE participant_type AS ENUM ('individual', 'team');
CREATE TYPE sponsor_inquiry_status AS ENUM ('pending', 'approved', 'rejected', 'paid');
CREATE TYPE waiver_applies_to AS ENUM ('vendor', 'sports');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded', 'failed');
CREATE TYPE payment_purpose AS ENUM ('vendor_fee', 'sports_fee', 'sponsorship');
CREATE TYPE media_type AS ENUM ('image', 'video');

-- 3. HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. USERS & PROFILES
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function is_admin() used in RLS policies
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. EVENT TYPES & EVENTS
CREATE TABLE event_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_event_types_updated_at
  BEFORE UPDATE ON event_types
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_type_id UUID NOT NULL REFERENCES event_types(id) ON DELETE RESTRICT,
  source event_source NOT NULL DEFAULT 'gameday',
  status event_status NOT NULL DEFAULT 'draft',
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'America/New_York',
  venue_name TEXT NOT NULL,
  address TEXT NOT NULL,
  map_url TEXT,
  cover_image_path TEXT,
  accepts_vendors BOOLEAN NOT NULL DEFAULT FALSE,
  vendor_applications_open_at TIMESTAMPTZ,
  vendor_applications_close_at TIMESTAMPTZ,
  submitted_by_submission_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_events_status_dates ON events(status, starts_at);
CREATE INDEX idx_events_slug ON events(slug);

CREATE TRIGGER trg_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE event_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  title TEXT NOT NULL,
  description TEXT,
  event_type_id UUID REFERENCES event_types(id) ON DELETE SET NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  venue_name TEXT NOT NULL,
  address TEXT NOT NULL,
  image_path TEXT,
  link_url TEXT,
  status submission_status NOT NULL DEFAULT 'pending',
  admin_note TEXT,
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_event_submissions_updated_at
  BEFORE UPDATE ON event_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. VENDORS & CAPACITY
CREATE TABLE vendor_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE vendor_subcategories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES vendor_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(category_id, slug)
);

CREATE TABLE event_vendor_capacity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  subcategory_id UUID NOT NULL REFERENCES vendor_subcategories(id) ON DELETE RESTRICT,
  max_slots INT NOT NULL DEFAULT 1,
  fee_cents INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(event_id, subcategory_id)
);

CREATE TABLE waiver_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  version TEXT NOT NULL,
  applies_to waiver_applies_to NOT NULL,
  body_markdown TEXT NOT NULL,
  is_current BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(version, applies_to)
);

CREATE TABLE waiver_signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  waiver_version_id UUID NOT NULL REFERENCES waiver_versions(id) ON DELETE RESTRICT,
  signer_name TEXT NOT NULL,
  signer_email TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  user_agent TEXT NOT NULL,
  signed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_checkout_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  amount_cents INT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status payment_status NOT NULL DEFAULT 'pending',
  purpose payment_purpose NOT NULL,
  reference_table TEXT NOT NULL,
  reference_id UUID NOT NULL,
  raw_event JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE vendor_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_path TEXT,
  category_id UUID NOT NULL REFERENCES vendor_categories(id) ON DELETE RESTRICT,
  subcategory_id UUID NOT NULL REFERENCES vendor_subcategories(id) ON DELETE RESTRICT,
  instagram TEXT,
  tiktok TEXT,
  website TEXT,
  portfolio_paths TEXT[] NOT NULL DEFAULT '{}',
  status vendor_application_status NOT NULL DEFAULT 'draft',
  admin_note TEXT,
  waiver_signature_id UUID REFERENCES waiver_signatures(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE vendor_event_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES vendor_applications(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  subcategory_id UUID NOT NULL REFERENCES vendor_subcategories(id) ON DELETE RESTRICT,
  status vendor_slot_status NOT NULL DEFAULT 'requested',
  waitlist_position INT,
  payment_token TEXT UNIQUE,
  payment_deadline TIMESTAMPTZ,
  payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(application_id, event_id)
);

CREATE INDEX idx_vendor_slots_capacity ON vendor_event_slots(event_id, subcategory_id, status);

-- 7. SPORTS & TOURNAMENTS
CREATE TABLE sports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image_path TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE divisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sport_id UUID NOT NULL REFERENCES sports(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  format division_format NOT NULL DEFAULT 'intramural',
  capacity INT NOT NULL,
  roster_min INT NOT NULL DEFAULT 1,
  roster_max INT NOT NULL DEFAULT 10,
  fee_cents INT NOT NULL DEFAULT 0,
  fee_model fee_model NOT NULL DEFAULT 'per_team',
  registration_opens_at TIMESTAMPTZ NOT NULL,
  registration_closes_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  division_id UUID NOT NULL REFERENCES divisions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  captain_profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  captain_email TEXT NOT NULL,
  status team_status NOT NULL DEFAULT 'pending',
  waitlist_position INT,
  invite_code TEXT UNIQUE NOT NULL,
  payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  role team_member_role NOT NULL DEFAULT 'player',
  status team_member_status NOT NULL DEFAULT 'invited',
  waiver_signature_id UUID REFERENCES waiver_signatures(id) ON DELETE RESTRICT,
  invite_token TEXT,
  invited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE free_agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sport_id UUID NOT NULL REFERENCES sports(id) ON DELETE CASCADE,
  preferred_division_ids UUID[] NOT NULL DEFAULT '{}',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  notes TEXT,
  waiver_signature_id UUID REFERENCES waiver_signatures(id) ON DELETE RESTRICT,
  status free_agent_status NOT NULL DEFAULT 'available',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE individual_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  division_id UUID NOT NULL REFERENCES divisions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  skill_level TEXT,
  status registration_status NOT NULL DEFAULT 'pending_payment',
  waitlist_position INT,
  seed INT,
  waiver_signature_id UUID REFERENCES waiver_signatures(id) ON DELETE RESTRICT,
  payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE brackets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  division_id UUID NOT NULL REFERENCES divisions(id) ON DELETE CASCADE,
  type bracket_type NOT NULL DEFAULT 'single_elimination',
  status bracket_status NOT NULL DEFAULT 'draft',
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bracket_id UUID NOT NULL REFERENCES brackets(id) ON DELETE CASCADE,
  round INT NOT NULL,
  position INT NOT NULL,
  participant_a_id UUID,
  participant_b_id UUID,
  participant_type participant_type NOT NULL,
  winner_id UUID,
  score_a INT,
  score_b INT,
  next_match_id UUID REFERENCES matches(id) ON DELETE SET NULL,
  scheduled_at TIMESTAMPTZ,
  status match_status NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. SPONSORS
CREATE TABLE sponsor_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price_cents INT,
  benefits TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sponsor_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  tier_id UUID REFERENCES sponsor_tiers(id) ON DELETE SET NULL,
  budget_range TEXT,
  message TEXT,
  status sponsor_inquiry_status NOT NULL DEFAULT 'pending',
  admin_note TEXT,
  payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. OPERATIONS, AUDITING & INFRASTRUCTURE
CREATE TABLE stripe_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE email_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  to_email TEXT NOT NULL,
  template TEXT NOT NULL,
  related_table TEXT,
  related_id UUID,
  status TEXT NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE mailing_list (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  interests TEXT[] DEFAULT '{}',
  source TEXT NOT NULL DEFAULT 'web',
  consented_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE media_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  type media_type NOT NULL DEFAULT 'image',
  storage_path TEXT NOT NULL,
  video_url TEXT,
  caption TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  diff JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_vendor_capacity ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_event_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE sports ENABLE ROW LEVEL SECURITY;
ALTER TABLE divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE free_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE individual_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE brackets ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE waiver_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE waiver_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE mailing_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Public READ policies
CREATE POLICY "Public can view published events" ON events FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view event types" ON event_types FOR SELECT USING (true);
CREATE POLICY "Public can view active vendor categories" ON vendor_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active vendor subcategories" ON vendor_subcategories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view vendor capacity limits" ON event_vendor_capacity FOR SELECT USING (true);
CREATE POLICY "Public can view active sports" ON sports FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active divisions" ON divisions FOR SELECT USING (status = 'open');
CREATE POLICY "Public can view published brackets" ON brackets FOR SELECT USING (status = 'published' OR status = 'completed');
CREATE POLICY "Public can view matches for published brackets" ON matches FOR SELECT USING (
  bracket_id IN (SELECT id FROM brackets WHERE status IN ('published', 'completed'))
);
CREATE POLICY "Public can view sponsor tiers" ON sponsor_tiers FOR SELECT USING (true);
CREATE POLICY "Public can view current waiver versions" ON waiver_versions FOR SELECT USING (is_current = true);
CREATE POLICY "Public can view media items" ON media_items FOR SELECT USING (true);
CREATE POLICY "Public can view public site settings" ON site_settings FOR SELECT USING (true);

-- Admin Full Access policies
CREATE POLICY "Admins full access on profiles" ON profiles FOR ALL USING (is_admin());
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins full access on events" ON events FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on event_types" ON event_types FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on event_submissions" ON event_submissions FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on vendor_categories" ON vendor_categories FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on vendor_subcategories" ON vendor_subcategories FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on event_vendor_capacity" ON event_vendor_capacity FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on vendor_applications" ON vendor_applications FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on vendor_event_slots" ON vendor_event_slots FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on sports" ON sports FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on divisions" ON divisions FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on teams" ON teams FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on team_members" ON team_members FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on free_agents" ON free_agents FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on individual_registrations" ON individual_registrations FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on brackets" ON brackets FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on matches" ON matches FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on sponsor_tiers" ON sponsor_tiers FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on sponsor_inquiries" ON sponsor_inquiries FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on waiver_versions" ON waiver_versions FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on waiver_signatures" ON waiver_signatures FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on payments" ON payments FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on stripe_events" ON stripe_events FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on email_log" ON email_log FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on mailing_list" ON mailing_list FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on media_items" ON media_items FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on site_settings" ON site_settings FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on audit_log" ON audit_log FOR ALL USING (is_admin());
