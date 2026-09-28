-- GAMEDAY Seed Data
-- Reference data only: event types, vendor taxonomy, sports, sponsor tiers,
-- waiver text and site settings. Events, divisions and any figures are left
-- empty until there is a real schedule to load.

-- 1. EVENT TYPES
INSERT INTO event_types (id, name, slug, sort_order) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Interhouse', 'interhouse', 1),
  ('a0000000-0000-0000-0000-000000000002', '1v1 Showdown', '1v1', 2),
  ('a0000000-0000-0000-0000-000000000003', 'Viewing Party', 'viewing-party', 3),
  ('a0000000-0000-0000-0000-000000000004', 'Community Event', 'community', 4)
ON CONFLICT (slug) DO NOTHING;

-- 2. EVENTS
-- No events are seeded. The calendar that used to live here was invented
-- (New York venues, made-up dates). Insert the real Austin schedule before
-- this file is run against a live project.

-- 3. VENDOR CATEGORIES & SUBCATEGORIES
INSERT INTO vendor_categories (id, name, slug, sort_order, is_active) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'Food & Beverage', 'food', 1, true),
  ('c0000000-0000-0000-0000-000000000002', 'Merchandise & Apparel', 'merch', 2, true),
  ('c0000000-0000-0000-0000-000000000003', 'Services & Experiences', 'services', 3, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO vendor_subcategories (id, category_id, name, slug, is_active) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Tacos & Mexican', 'tacos', true),
  ('c1000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'Smash Burgers', 'burgers', true),
  ('c1000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'Wings & BBQ', 'wings', true),
  ('c1000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 'Artisan Desserts & Ice Cream', 'desserts', true),
  ('c1000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000001', 'Craft Beverages & Boba', 'drinks', true),
  ('c1000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000001', 'Vegan & Plant-Based', 'vegan', true),
  ('c1000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000002', 'Streetwear & Athletic Apparel', 'apparel', true),
  ('c1000000-0000-0000-0000-000000000008', 'c0000000-0000-0000-0000-000000000002', 'Sporting Goods & Accessories', 'accessories', true),
  ('c1000000-0000-0000-0000-000000000009', 'c0000000-0000-0000-0000-000000000003', 'Event Photography & Media', 'photography', true),
  ('c1000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000003', 'Pop-Up Barber & Grooming', 'barber', true),
  ('c1000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000003', 'Face Paint & Fan Art', 'face-paint', true)
ON CONFLICT (category_id, slug) DO NOTHING;

-- 4. VENDOR CAPACITY PER EVENT
-- Capacity rows point at event ids, so they are added alongside the real
-- events above (one row per event + subcategory, with its slot count and fee).

-- 5. SPORTS & DIVISIONS
INSERT INTO sports (id, name, slug, image_path, is_active) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'Basketball', 'basketball', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop', true),
  ('d0000000-0000-0000-0000-000000000002', 'Volleyball', 'volleyball', 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop', true),
  ('d0000000-0000-0000-0000-000000000003', 'Soccer / Futsal', 'soccer', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop', true),
  ('d0000000-0000-0000-0000-000000000004', 'Flag Football', 'flag-football', 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=800&auto=format&fit=crop', true),
  ('d0000000-0000-0000-0000-000000000005', 'Pickleball', 'pickleball', 'https://images.unsplash.com/photo-1628891435222-065925dcb365?q=80&w=800&auto=format&fit=crop', true)
ON CONFLICT (slug) DO NOTHING;

-- Divisions belong to real events and registration windows, so they are
-- seeded with the schedule rather than invented here.

-- 6. SPONSOR TIERS
INSERT INTO sponsor_tiers (id, name, price_cents, benefits, sort_order) VALUES
  ('f0000000-0000-0000-0000-000000000001', 'Official Supporter', 150000, 'Logo placement on website, physical banner at 2 tournaments, 5 VIP event passes', 1),
  ('f0000000-0000-0000-0000-000000000002', 'Community Partner', 400000, 'All Supporter perks + dedicated 10x10 booth activation space, social media spotlight, branded division jerseys', 2),
  ('f0000000-0000-0000-0000-000000000003', 'Title Partner', 1000000, 'Full season naming rights, court center-circle branding, primary jersey crest, VIP championship suite, dedicated livestream segment', 3)
ON CONFLICT (id) DO NOTHING;

-- 7. WAIVERS (v1)
INSERT INTO waiver_versions (id, version, applies_to, body_markdown, is_current) VALUES
  (
    'w0000000-0000-0000-0000-000000000001',
    'v1',
    'vendor',
    '# GAMEDAY VENDOR PARTICIPATION AGREEMENT & RELEASE OF LIABILITY (v1)

[REPLACE WITH CLIENT-APPROVED WAIVER]

By signing this agreement, the Vendor acknowledges and agrees to abide by all GAMEDAY venue safety guidelines, local health department regulations, and load-in / load-out schedules. Vendor agrees to indemnify and hold harmless GAMEDAY, its event hosts, venues, and affiliates against any and all claims, liabilities, damages, or losses arising out of the vendor''s operations or product sales at the event.',
    true
  ),
  (
    'w0000000-0000-0000-0000-000000000002',
    'v1',
    'sports',
    '# GAMEDAY ATHLETIC PARTICIPATION & LIABILITY WAIVER (v1)

[REPLACE WITH CLIENT-APPROVED WAIVER]

I acknowledge that participating in competitive sports and tournament events carries inherent risks of physical injury. In consideration of being permitted to participate in GAMEDAY tournaments, leagues, or 1v1 events, I hereby release, waive, and forever discharge GAMEDAY, its tournament directors, referees, volunteers, and facility partners from any claims, actions, or damages resulting from my participation.',
    true
  )
ON CONFLICT (version, applies_to) DO NOTHING;

-- 8. SITE SETTINGS
INSERT INTO site_settings (key, value) VALUES
  (
    'banner',
    '{"enabled": false, "text": "", "link": "/#events"}'::jsonb
  ),
  (
    'operations',
    '{"vendor_hold_hours": 48, "individual_hold_minutes": 30, "default_currency": "usd", "admin_notification_email": "admin@bygameday.com"}'::jsonb
  )
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
