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
    lab_safety_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    -- Scans of the signed consent forms, uploaded to the 'consents' storage
    -- bucket. See supabase-consents.sql for the bucket and its policies.
    consent_folder TEXT,
    consent_files JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- Olympiad and science-competition results the captain listed at registration,
-- one per line. The other members carry theirs inside the members JSONB, but
-- the captain is stored in columns of their own.
ALTER TABLE public.teams
    ADD COLUMN IF NOT EXISTS captain_achievements TEXT;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

ALTER TABLE public.teams
    ADD COLUMN IF NOT EXISTS access_code_hash TEXT,
    ADD COLUMN IF NOT EXISTS victory_points NUMERIC(8,2) NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS total_score NUMERIC(10,2) NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS yellow_cards INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS arrived BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS competition_status TEXT NOT NULL DEFAULT 'registered';

CREATE UNIQUE INDEX IF NOT EXISTS idx_teams_access_code_hash
    ON public.teams (access_code_hash) WHERE access_code_hash IS NOT NULL;

CREATE TABLE IF NOT EXISTS public.round_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    round_number INTEGER NOT NULL,
    room TEXT,
    team_role TEXT,
    judges TEXT[] NOT NULL DEFAULT '{}',
    opponents TEXT[] NOT NULL DEFAULT '{}',
    starts_at TIMESTAMPTZ,
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (team_id, round_number)
);

-- Score a team earned in this round. NULL means "not judged yet", which is
-- different from a scored zero and is what keeps an unplayed round out of the
-- total below.
ALTER TABLE public.round_assignments
    ADD COLUMN IF NOT EXISTS score NUMERIC(10,2);

-- teams.total_score is derived: it is the sum of the team's round scores, kept
-- in step by this trigger so the aggregate can never drift from the rounds it
-- is made of. Organizers enter scores per round; the total is not editable.
CREATE OR REPLACE FUNCTION public.recalc_team_total_score()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_team_id UUID;
BEGIN
    v_team_id := COALESCE(NEW.team_id, OLD.team_id);
    UPDATE public.teams t
       SET total_score = COALESCE((
               SELECT SUM(r.score) FROM public.round_assignments r
               WHERE r.team_id = v_team_id AND r.score IS NOT NULL
           ), 0)
     WHERE t.id = v_team_id;
    RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_recalc_team_total_score ON public.round_assignments;
CREATE TRIGGER trg_recalc_team_total_score
AFTER INSERT OR DELETE OR UPDATE OF score, team_id ON public.round_assignments
FOR EACH ROW EXECUTE FUNCTION public.recalc_team_total_score();

-- Backfill, guarded so a team with no scored rounds keeps whatever total was
-- entered by hand before this trigger existed.
UPDATE public.teams t
   SET total_score = COALESCE((
           SELECT SUM(r.score) FROM public.round_assignments r
           WHERE r.team_id = t.id AND r.score IS NOT NULL
       ), 0)
 WHERE EXISTS (
     SELECT 1 FROM public.round_assignments r
     WHERE r.team_id = t.id AND r.score IS NOT NULL
 );

CREATE TABLE IF NOT EXISTS public.team_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'available',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.round_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_challenges ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.get_team_dashboard(p_code TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_team public.teams%ROWTYPE;
    v_hash TEXT;
BEGIN
    v_hash := encode(digest(upper(trim(p_code)), 'sha256'), 'hex');
    SELECT * INTO v_team FROM public.teams WHERE access_code_hash = v_hash LIMIT 1;
    IF v_team.id IS NULL THEN RETURN NULL; END IF;

    RETURN jsonb_build_object(
        'team', jsonb_build_object(
            'id', v_team.id, 'team_name', v_team.team_name, 'school', v_team.school,
            'city', v_team.city, 'grade', v_team.grade, 'members', v_team.members,
            'victory_points', v_team.victory_points, 'total_score', v_team.total_score,
            'yellow_cards', v_team.yellow_cards, 'arrived', v_team.arrived,
            'competition_status', v_team.competition_status,
            'rank', (SELECT rank FROM (
                SELECT id, rank() OVER (ORDER BY victory_points DESC, total_score DESC) AS rank
                FROM public.teams
            ) ranked WHERE ranked.id = v_team.id)
        ),
        'ranking', COALESCE((
            SELECT jsonb_agg(jsonb_build_object(
                'rank', ranked.rank, 'team_name', ranked.team_name,
                'victory_points', ranked.victory_points, 'total_score', ranked.total_score
            ) ORDER BY ranked.rank)
            FROM (
                SELECT team_name, victory_points, total_score,
                       rank() OVER (ORDER BY victory_points DESC, total_score DESC) AS rank
                FROM public.teams
            ) ranked
        ), '[]'::jsonb),
        'round', (SELECT to_jsonb(r) - 'team_id' FROM public.round_assignments r
                  WHERE r.team_id = v_team.id AND r.is_current = TRUE
                  ORDER BY r.round_number DESC LIMIT 1),
        'rounds', COALESCE((
            SELECT jsonb_agg(jsonb_build_object(
                'round_number', r.round_number, 'room', r.room,
                'team_role', r.team_role, 'score', r.score,
                'starts_at', r.starts_at, 'is_current', r.is_current
            ) ORDER BY r.round_number)
            FROM public.round_assignments r WHERE r.team_id = v_team.id
        ), '[]'::jsonb),
        'challenges', COALESCE((SELECT jsonb_agg(to_jsonb(c) - 'team_id' ORDER BY c.created_at)
                               FROM public.team_challenges c WHERE c.team_id = v_team.id), '[]'::jsonb)
    );
END;
$$;

CREATE OR REPLACE FUNCTION public.confirm_team_arrival(p_code TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
    UPDATE public.teams SET arrived = TRUE
    WHERE access_code_hash = encode(digest(upper(trim(p_code)), 'sha256'), 'hex');
    RETURN FOUND;
END;
$$;

-- Public scoreboard -----------------------------------------------------
-- Read by /results without any access code. This is a function rather than a
-- SELECT policy on public.teams on purpose: that table holds captain and
-- supervisor emails and phone numbers, and a read policy would expose them to
-- anonymous visitors. Only the columns below ever leave the database.
-- Only teams the organizers have admitted are listed: 'approved', plus the
-- 'active' and 'finished' states an admitted team moves through later. Teams
-- still sitting at 'registered' and disqualified ones never appear, so the
-- board stays empty until the committee approves the first team.
CREATE OR REPLACE FUNCTION public.get_public_scoreboard()
RETURNS JSONB
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    WITH ranked AS (
        SELECT t.id, t.team_name, t.city, t.victory_points, t.total_score,
               rank() OVER (ORDER BY t.victory_points DESC, t.total_score DESC) AS rank
        FROM public.teams t
        WHERE t.competition_status IN ('approved', 'active', 'finished')
    )
    SELECT jsonb_build_object(
        'rounds', COALESCE((
            SELECT jsonb_agg(DISTINCT r.round_number ORDER BY r.round_number)
            FROM public.round_assignments r
            JOIN ranked ON ranked.id = r.team_id
            WHERE r.score IS NOT NULL
        ), '[]'::jsonb),
        'teams', COALESCE((
            SELECT jsonb_agg(jsonb_build_object(
                'rank', ranked.rank, 'team_name', ranked.team_name, 'city', ranked.city,
                'victory_points', ranked.victory_points, 'total_score', ranked.total_score,
                'scores', COALESCE((
                    SELECT jsonb_object_agg(r.round_number::text, r.score)
                    FROM public.round_assignments r
                    WHERE r.team_id = ranked.id AND r.score IS NOT NULL
                ), '{}'::jsonb)
            ) ORDER BY ranked.rank, ranked.team_name)
            FROM ranked
        ), '[]'::jsonb)
    );
$$;

REVOKE ALL ON FUNCTION public.get_public_scoreboard() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_scoreboard() TO anon, authenticated;

REVOKE ALL ON FUNCTION public.get_team_dashboard(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.confirm_team_arrival(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_team_dashboard(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.confirm_team_arrival(TEXT) TO anon, authenticated;

-- Organizer administration ---------------------------------------------
-- Admins authenticate with Supabase Auth. The first admin is bootstrapped
-- with the SQL snippet at the end of this file; that admin can then grant
-- access to other already-created Auth users from the web dashboard.

CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    display_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin(p_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = p_user_id);
$$;

REVOKE ALL ON FUNCTION public.is_admin(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO authenticated;

DROP POLICY IF EXISTS "Admins can read admin list" ON public.admin_users;
CREATE POLICY "Admins can read admin list" ON public.admin_users
FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can read teams" ON public.teams;
CREATE POLICY "Admins can read teams" ON public.teams
FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update teams" ON public.teams;
CREATE POLICY "Admins can update teams" ON public.teams
FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete teams" ON public.teams;
CREATE POLICY "Admins can delete teams" ON public.teams
FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Admins manage rounds" ON public.round_assignments;
CREATE POLICY "Admins manage rounds" ON public.round_assignments
FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins manage challenges" ON public.team_challenges;
CREATE POLICY "Admins manage challenges" ON public.team_challenges
FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE OR REPLACE FUNCTION public.add_admin_by_email(p_email TEXT, p_display_name TEXT DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE v_user_id UUID;
BEGIN
    IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Admin access required'; END IF;
    SELECT id INTO v_user_id FROM auth.users WHERE lower(email) = lower(trim(p_email)) LIMIT 1;
    IF v_user_id IS NULL THEN RETURN FALSE; END IF;
    INSERT INTO public.admin_users (user_id, email, display_name)
    VALUES (v_user_id, lower(trim(p_email)), nullif(trim(p_display_name), ''))
    ON CONFLICT (user_id) DO UPDATE SET display_name = EXCLUDED.display_name, email = EXCLUDED.email;
    RETURN TRUE;
END;
$$;

CREATE OR REPLACE FUNCTION public.remove_admin(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_count INTEGER;
BEGIN
    IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Admin access required'; END IF;
    SELECT count(*) INTO v_count FROM public.admin_users;
    IF v_count <= 1 OR p_user_id = auth.uid() THEN RETURN FALSE; END IF;
    DELETE FROM public.admin_users WHERE user_id = p_user_id;
    RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION public.add_admin_by_email(TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.remove_admin(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.add_admin_by_email(TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.remove_admin(UUID) TO authenticated;

-- FIRST ADMIN SETUP (run once after creating the user in Authentication -> Users):
-- INSERT INTO public.admin_users (user_id, email, display_name)
-- SELECT id, email, 'Главный администратор' FROM auth.users
-- WHERE lower(email) = lower('YOUR_EMAIL@example.com')
-- ON CONFLICT (user_id) DO NOTHING;

-- For databases created before lab_safety_confirmed existed: without this
-- column every submission fails with "column not found".
ALTER TABLE public.teams
    ADD COLUMN IF NOT EXISTS lab_safety_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS consent_folder TEXT,
    ADD COLUMN IF NOT EXISTS consent_files JSONB NOT NULL DEFAULT '[]'::jsonb;

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
