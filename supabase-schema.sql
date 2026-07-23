-- SQL Schema for Supabase - ISM Olympiad Team Registration

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
    consent_confirmed BOOLEAN NOT NULL DEFAULT TRUE
);

-- Index for fast queries
CREATE INDEX IF NOT EXISTS idx_teams_created_at ON public.teams (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_teams_captain_email ON public.teams (captain_email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- Allow anonymous public users to INSERT (register a team)
CREATE POLICY "Allow public team registration" 
ON public.teams 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);
