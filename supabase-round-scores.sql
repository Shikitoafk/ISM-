-- ISM Olympiad — per-round scores migration
--
-- Apply this to a database created before round scoring existed: Supabase
-- Dashboard -> SQL Editor -> paste -> Run. Every statement is idempotent, so
-- re-running it is safe. A fresh database can just run supabase-schema.sql,
-- which already contains everything below.
--
-- Run this BEFORE deploying the matching site build: the admin panel starts
-- sending round_assignments.score, and without this column saving a round
-- fails.

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

-- The team dashboard now returns the full round history alongside the current
-- round, so the cabinet can show a score per round.
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
        WHERE t.competition_status <> 'disqualified'
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
