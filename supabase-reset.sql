-- ISM Olympiad — full reset of the registration schema.
--
-- WARNING: this DROPS public.teams and every row in it. Existing
-- registrations are lost. If you need to keep them, do not run this file —
-- run supabase-schema.sql instead, which only adds what is missing.
--
-- Run in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.

BEGIN;

-- 1. Registrations -------------------------------------------------------

DROP TABLE IF EXISTS public.teams CASCADE;

CREATE TABLE public.teams (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Team & institution
    team_name            TEXT NOT NULL,
    school               TEXT NOT NULL,
    city                 TEXT NOT NULL,
    grade                TEXT NOT NULL,

    -- Captain (member #1)
    captain_name         TEXT NOT NULL,
    captain_email        TEXT NOT NULL,
    captain_contact      TEXT NOT NULL,

    -- Supervisor / advisor
    leader_name          TEXT NOT NULL,
    leader_email         TEXT NOT NULL,
    leader_contact       TEXT NOT NULL,

    -- Members 2..5: [{ full_name, grade, role_or_notes }, ...]
    members              JSONB NOT NULL DEFAULT '[]'::jsonb,

    -- Both checkboxes on the form; the app refuses to submit without them.
    consent_confirmed    BOOLEAN NOT NULL DEFAULT FALSE,
    lab_safety_confirmed BOOLEAN NOT NULL DEFAULT FALSE,

    -- Scans of the signed consent forms, uploaded to the 'consents' storage
    -- bucket. See supabase-consents.sql for the bucket and its policies.
    consent_folder       TEXT,
    consent_files        JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE INDEX idx_teams_created_at ON public.teams (created_at DESC);
CREATE INDEX idx_teams_captain_email ON public.teams (captain_email);

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- Anonymous visitors may register a team...
CREATE POLICY "Allow public team registration"
ON public.teams
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- ...but no SELECT/UPDATE/DELETE policy is granted, so submitted data is
-- readable only from the dashboard or with the service role key. Do not add
-- a public SELECT policy here: it would expose every applicant's contacts.


-- 2. Site settings -------------------------------------------------------
-- src/app/register/page.tsx reads registration_open to decide between the
-- form and the "registration closed" panel.

DROP TABLE IF EXISTS public.site_settings CASCADE;

CREATE TABLE public.site_settings (
    id                INTEGER PRIMARY KEY DEFAULT 1,
    registration_open BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    -- The app calls .single(), so exactly one row may ever exist.
    CONSTRAINT site_settings_single_row CHECK (id = 1)
);

INSERT INTO public.site_settings (id, registration_open) VALUES (1, TRUE);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read of site settings"
ON public.site_settings
FOR SELECT
TO anon, authenticated
USING (true);

COMMIT;

-- 3. Refresh PostgREST -------------------------------------------------
-- Without this the API can keep serving the old column list and you get
-- "Could not find the '<column>' column of 'teams' in the schema cache".
NOTIFY pgrst, 'reload schema';


-- Handy afterwards -------------------------------------------------------
-- Close registration:
--   UPDATE public.site_settings SET registration_open = FALSE, updated_at = NOW() WHERE id = 1;
-- Read submissions:
--   SELECT created_at, team_name, city, school, captain_name, captain_email, members
--   FROM public.teams ORDER BY created_at DESC;
