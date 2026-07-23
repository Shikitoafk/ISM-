-- SQL Schema for Supabase - ISM Olympiad Team Registration

-- 1. Create teams table
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    team_name TEXT NOT NULL,
    captain_name TEXT NOT NULL,
    captain_email TEXT NOT NULL,
    captain_contact TEXT NOT NULL,
    school TEXT NOT NULL,
    city TEXT NOT NULL,
    grade TEXT NOT NULL,
    members JSONB NOT NULL DEFAULT '[]'::jsonb,
    consent_confirmed BOOLEAN NOT NULL DEFAULT TRUE
);

-- 2. Index for faster queries in admin panel
CREATE INDEX IF NOT EXISTS idx_teams_created_at ON public.teams (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_teams_captain_email ON public.teams (captain_email);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Allow anonymous public users to INSERT (register a team)
CREATE POLICY "Allow public team registration" 
ON public.teams 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Note: SELECT, UPDATE, and DELETE policies are intentionally omitted for anon users.
-- This ensures registered team data remains strictly private and accessible only via Supabase Dashboard or Service Role Key.
