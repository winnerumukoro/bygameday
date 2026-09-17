-- GAMEDAY Seed Data
-- Seed realistic tournaments, events, vendor categories, sports, divisions, and sponsor tiers

-- 1. EVENT TYPES
INSERT INTO event_types (id, name, slug, sort_order) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Interhouse', 'interhouse', 1),
  ('a0000000-0000-0000-0000-000000000002', '1v1 Showdown', '1v1', 2),
  ('a0000000-0000-0000-0000-000000000003', 'Viewing Party', 'viewing-party', 3),
  ('a0000000-0000-0000-0000-000000000004', 'Community Event', 'community', 4)
ON CONFLICT (slug) DO NOTHING;

-- 2. EVENTS (10 realistic events)
INSERT INTO events (
  id, slug, title, description, event_type_id, source, status, starts_at, ends_at, timezone,
  venue_name, address, map_url, cover_image_path, accepts_vendors, vendor_applications_open_at, vendor_applications_close_at
) VALUES
  (
    'b0000000-0000-0000-0000-000000000001',
    'interhouse-basketball-2026',
    'Interhouse 5v5 Basketball Championship',
    'The flagship 16-team double-elimination basketball tournament. High stakes, live commentary, DJ, and curated street food market.',
    'a0000000-0000-0000-0000-000000000001',
    'gameday', 'published',
    NOW() + INTERVAL '24 days', NOW() + INTERVAL '24 days 8 hours', 'America/New_York',
    'Rucker Fieldhouse', '280 W 155th St, New York, NY', 'https://maps.google.com/?q=Rucker+Park+NY',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    true, NOW() - INTERVAL '5 days', NOW() + INTERVAL '14 days'
  ),
  (
    'b0000000-0000-0000-0000-000000000002',
    'midnight-1v1-streetball-clash',
    'Midnight 1v1 Streetball Showcase',
    'Under the floodlights. 32 ballers enter single-elimination king of the court battle.',
    'a0000000-0000-0000-0000-000000000002',
    'gameday', 'published',
    NOW() + INTERVAL '37 days', NOW() + INTERVAL '37 days 5 hours', 'America/New_York',
    'West 4th Street Courts', 'West 4th St & 6th Ave, New York, NY', 'https://maps.google.com/?q=The+Cage+West+4th',
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
    false, NULL, NULL
  ),
  (
    'b0000000-0000-0000-0000-000000000003',
    'spring-tailgate-viewing-party',
    'Spring Championship Viewing Party & Market',
    'Massive LED walls, artisan food row, live DJ sets, and rooftop lounge viewing.',
    'a0000000-0000-0000-0000-000000000003',
    'gameday', 'published',
    NOW() + INTERVAL '46 days', NOW() + INTERVAL '46 days 7 hours', 'America/New_York',
    'Pier 57 Rooftop Park', '25 11th Ave, New York, NY', 'https://maps.google.com/?q=Pier+57+NYC',
    'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop',
    true, NOW() - INTERVAL '2 days', NOW() + INTERVAL '20 days'
  ),
  (
    'b0000000-0000-0000-0000-000000000004',
    'metro-volleyball-classic',
    'Metro Intramural Sand Volleyball Classic',
    'Co-ed sand volleyball tournament with 24 teams across competitive and social divisions.',
    'a0000000-0000-0000-0000-000000000001',
    'gameday', 'published',
    NOW() + INTERVAL '59 days', NOW() + INTERVAL '59 days 6 hours', 'America/New_York',
    'Hudson River Park Courts', 'Pier 25, New York, NY', 'https://maps.google.com/?q=Pier+25+Hudson+River+Park',
    'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop',
    true, NOW(), NOW() + INTERVAL '30 days'
  ),
  (
    'b0000000-0000-0000-0000-000000000005',
    'brooklyn-pickleball-open',
    'Brooklyn Open Pickleball Championship',
    'Singles and doubles brackets. Quick rallies, cold drinks, community vibes.',
    'a0000000-0000-0000-0000-000000000002',
    'gameday', 'published',
    NOW() + INTERVAL '70 days', NOW() + INTERVAL '70 days 8 hours', 'America/New_York',
    'Brooklyn Bridge Park Pier 2', 'Furman St, Brooklyn, NY', 'https://maps.google.com/?q=Pier+2+Brooklyn',
    'https://images.unsplash.com/photo-1628891435222-065925dcb365?q=80&w=800&auto=format&fit=crop',
    true, NOW(), NOW() + INTERVAL '40 days'
  ),
  (
    'b0000000-0000-0000-0000-000000000006',
    'harlem-flag-football-bowl',
    'Harlem 7v7 Flag Football Summer Bowl',
    'Non-contact high-flying flag football tournament. Trophies, cash prize for winners.',
    'a0000000-0000-0000-0000-000000000001',
    'gameday', 'published',
    NOW() + INTERVAL '85 days', NOW() + INTERVAL '85 days 8 hours', 'America/New_York',
    'Riverbank State Park', '679 Riverside Dr, New York, NY', 'https://maps.google.com/?q=Riverbank+State+Park',
    'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=800&auto=format&fit=crop',
    true, NOW(), NOW() + INTERVAL '50 days'
  ),
  (
    'b0000000-0000-0000-0000-000000000007',
    'downtown-5k-community-run',
    'Downtown Sunset 5K & Street Festival',
    'Community road race finishing in a closed-street block party with live music and local food.',
    'a0000000-0000-0000-0000-000000000004',
    'community', 'published',
    NOW() + INTERVAL '98 days', NOW() + INTERVAL '98 days 4 hours', 'America/New_York',
    'Battery Park Esplanade', 'State St, New York, NY', 'https://maps.google.com/?q=Battery+Park',
    'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=800&auto=format&fit=crop',
    true, NOW(), NOW() + INTERVAL '60 days'
  ),
  (
    'b0000000-0000-0000-0000-000000000008',
    'queens-cup-futsal-derby',
    'Queens Cup 5v5 Futsal Derby',
    'Fast-paced turf soccer championship. 16 squads competing for the borough trophy.',
    'a0000000-0000-0000-0000-000000000001',
    'gameday', 'published',
    NOW() + INTERVAL '112 days', NOW() + INTERVAL '112 days 7 hours', 'America/New_York',
    'Flushing Meadows Park Arena', 'Flushing, NY', 'https://maps.google.com/?q=Flushing+Meadows',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
    true, NOW(), NOW() + INTERVAL '75 days'
  ),
  (
    'b0000000-0000-0000-0000-000000000009',
    'finals-viewing-bash-2026',
    'NBA Finals Game 7 Mega Viewing Bash',
    '30-foot projection screens, court games, trivia, hot wings competition.',
    'a0000000-0000-0000-0000-000000000003',
    'gameday', 'published',
    NOW() + INTERVAL '125 days', NOW() + INTERVAL '125 days 5 hours', 'America/New_York',
    'Brooklyn Navy Yard Hall', '63 Flushing Ave, Brooklyn, NY', 'https://maps.google.com/?q=Brooklyn+Navy+Yard',
    'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=800&auto=format&fit=crop',
    true, NOW(), NOW() + INTERVAL '80 days'
  ),
  (
    'b0000000-0000-0000-0000-000000000010',
    'all-city-dodgeball-classic',
    'All-City Glow-in-the-Dark Dodgeball',
    'Foam balls, blacklights, throwback jerseys, full festival tournament.',
    'a0000000-0000-0000-0000-000000000001',
    'gameday', 'published',
    NOW() + INTERVAL '140 days', NOW() + INTERVAL '140 days 6 hours', 'America/New_York',
    'Chelsea Piers Fieldhouse', '62 Chelsea Piers, New York, NY', 'https://maps.google.com/?q=Chelsea+Piers',
    'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop',
    false, NULL, NULL
  )
ON CONFLICT (slug) DO NOTHING;

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

-- 4. VENDOR CAPACITY FOR KEY EVENTS (Enforcing exclusivity with max_slots = 1)
INSERT INTO event_vendor_capacity (event_id, subcategory_id, max_slots, fee_cents) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 1, 35000),
  ('b0000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002', 1, 35000),
  ('b0000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000003', 1, 35000),
  ('b0000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000004', 1, 25000),
  ('b0000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000007', 2, 25000)
ON CONFLICT (event_id, subcategory_id) DO NOTHING;

-- 5. SPORTS & DIVISIONS
INSERT INTO sports (id, name, slug, image_path, is_active) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'Basketball', 'basketball', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop', true),
  ('d0000000-0000-0000-0000-000000000002', 'Volleyball', 'volleyball', 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop', true),
  ('d0000000-0000-0000-0000-000000000003', 'Soccer / Futsal', 'soccer', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop', true),
  ('d0000000-0000-0000-0000-000000000004', 'Flag Football', 'flag-football', 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=800&auto=format&fit=crop', true),
  ('d0000000-0000-0000-0000-000000000005', 'Pickleball', 'pickleball', 'https://images.unsplash.com/photo-1628891435222-065925dcb365?q=80&w=800&auto=format&fit=crop', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO divisions (
  id, sport_id, name, format, capacity, roster_min, roster_max, fee_cents, fee_model, registration_opens_at, registration_closes_at, status
) VALUES
  (
    'e0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000001',
    'Men''s Open 5v5 Intramural',
    'intramural', 16, 5, 10, 45000, 'per_team',
    NOW() - INTERVAL '10 days', NOW() + INTERVAL '15 days', 'open'
  ),
  (
    'e0000000-0000-0000-0000-000000000002',
    'd0000000-0000-0000-0000-000000000001',
    '1v1 Elite Streetball Clash',
    '1v1', 32, 1, 1, 5000, 'per_player',
    NOW() - INTERVAL '5 days', NOW() + INTERVAL '20 days', 'open'
  ),
  (
    'e0000000-0000-0000-0000-000000000003',
    'd0000000-0000-0000-0000-000000000002',
    'Co-Ed Sand Volleyball 4v4',
    'intramural', 12, 4, 8, 30000, 'per_team',
    NOW() - INTERVAL '2 days', NOW() + INTERVAL '30 days', 'open'
  )
ON CONFLICT (id) DO NOTHING;

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
    '{"enabled": true, "text": "Spring 2026 Tournament & Vendor Windows Are Now Live", "link": "/#events"}'::jsonb
  ),
  (
    'stat_counters',
    '{"events_hosted": 24, "vendors_active": 60, "rostered_athletes": 1800, "capacity_guarantee": "100%"}'::jsonb
  ),
  (
    'operations',
    '{"vendor_hold_hours": 48, "individual_hold_minutes": 30, "default_currency": "usd", "admin_notification_email": "admin@bygameday.com"}'::jsonb
  )
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
