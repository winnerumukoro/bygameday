-- GAMEDAY Platform - Auth profile provisioning
-- Migration: 20260928000001_auth_profiles.sql
-- Description: Create a profiles row for every new auth user, backfill existing
-- users, and pin search_path on SECURITY DEFINER functions.

-- 1. Harden is_admin(): SECURITY DEFINER functions must not resolve names
--    through the caller's search_path.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- 2. New sign-ups get a profile. Role always starts as 'user'; admins are
--    promoted by hand (see README / handover notes).
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data ->> 'full_name'), ''), SPLIT_PART(NEW.email, '@', 1)),
    NULLIF(TRIM(NEW.raw_user_meta_data ->> 'phone'), '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Backfill anyone who signed up before this trigger existed.
INSERT INTO public.profiles (id, full_name)
SELECT u.id, COALESCE(NULLIF(TRIM(u.raw_user_meta_data ->> 'full_name'), ''), SPLIT_PART(u.email, '@', 1))
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL;
