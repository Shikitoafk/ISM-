-- SQL Schema for Supabase - ISM Olympiad Team Registration
-- Safe to re-run: every statement is idempotent.

CREATE TABLE IF NOT EXISTS public.teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    team_name TEXT NOT NULL,
    captain_name TEXT NOT NULL,
    captain_email TEXT NOT NULL,
    captain_contact TEXT NOT NULL,
    leader_name TEXT NOT NULL,       -- ФИО Руководителя / Наставника
    leader_email TEXT NOT NULL,      -- Email Руководителя
    leader_contact TEXT NOT NULL,    -- Телефон / Telegram Руководителя
    school TEXT NOT NULL,
    city TEXT NOT NULL,
    grade TEXT NOT NULL,
    members JSONB NOT NULL DEFAULT '[]'::jsonb,
    consent_confirmed BOOLEAN NOT NULL DEFAULT TRUE,
    -- The registration form requires a separate lab-safety acknowledgement
    -- and sends it on every insert.
    lab_safety_confirmed BOOLEAN NOT NULL DEFAULT FALSE
);

-- For databases created before lab_safety_confirmed existed: without this
-- column every submission fails with "column not found".
ALTER TABLE public.teams
    ADD COLUMN IF NOT EXISTS lab_safety_confirmed BOOLEAN NOT NULL DEFAULT FALSE;

-- Index for fast queries
CREATE INDEX IF NOT EXISTS idx_teams_created_at ON public.teams (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_teams_captain_email ON public.teams (captain_email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- Allow anonymous public users to INSERT (register a team)
DROP POLICY IF EXISTS "Allow public team registration" ON public.teams;
CREATE POLICY "Allow public team registration"
ON public.teams
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Submissions are never readable by anonymous visitors: no SELECT policy is
-- granted here, so team data stays private to the service role / dashboard.


-- Site settings ---------------------------------------------------------
-- src/app/register/page.tsx reads registration_open from this table to
-- decide whether to show the form or the "registration closed" panel.
-- Missing table => the app falls back to "open".

CREATE TABLE IF NOT EXISTS public.site_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    registration_open BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    -- The app calls .single(), so exactly one row may exist.
    CONSTRAINT site_settings_single_row CHECK (id = 1)
);

INSERT INTO public.site_settings (id, registration_open)
VALUES (1, TRUE)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone may read the flag; only the dashboard / service role may change it.
DROP POLICY IF EXISTS "Allow public read of site settings" ON public.site_settings;
CREATE POLICY "Allow public read of site settings"
ON public.site_settings
FOR SELECT
TO anon, authenticated
USING (true);

-- To close registration later:
--   UPDATE public.site_settings SET registration_open = FALSE, updated_at = NOW() WHERE id = 1;
