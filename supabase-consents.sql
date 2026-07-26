-- ISM Olympiad — consent scan uploads.
--
-- Run in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.
-- Safe to re-run, and safe on a table that already holds registrations:
-- nothing is dropped and both columns are added with defaults.

-- 1. Columns on the registration table --------------------------------------
-- consent_folder: the per-submission folder inside the storage bucket.
-- consent_files:  [{ name, path, size, type }, ...] as uploaded by the form.

ALTER TABLE public.teams
    ADD COLUMN IF NOT EXISTS consent_folder TEXT,
    ADD COLUMN IF NOT EXISTS consent_files  JSONB NOT NULL DEFAULT '[]'::jsonb;

CREATE INDEX IF NOT EXISTS idx_teams_consent_folder ON public.teams (consent_folder);


-- 2. Storage bucket ---------------------------------------------------------
-- Private: scans carry minors' names and their parents' signatures, so the
-- bucket must never be public. Files are read from the dashboard or with the
-- service role key.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'consents',
    'consents',
    FALSE,
    10485760,                                            -- 10 MB, matches the form
    ARRAY['application/pdf', 'image/jpeg', 'image/png']
)
ON CONFLICT (id) DO UPDATE
SET public             = FALSE,
    file_size_limit    = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;


-- 3. Storage policies -------------------------------------------------------
-- Applicants may upload only. No SELECT, UPDATE or DELETE policy is granted
-- to anon, so nobody can list or read other applicants' documents — not even
-- by guessing a path.

DROP POLICY IF EXISTS "Allow public consent upload" ON storage.objects;
CREATE POLICY "Allow public consent upload"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'consents');


-- 4. Refresh PostgREST ------------------------------------------------------
-- Without this the API can keep serving the old column list and the form
-- fails with "Could not find the 'consent_files' column ... in the schema cache".
NOTIFY pgrst, 'reload schema';


-- Handy afterwards ----------------------------------------------------------
-- Teams and how many scans each attached:
--   SELECT created_at, team_name, city, school,
--          jsonb_array_length(consent_files) AS files,
--          consent_folder
--   FROM public.teams
--   ORDER BY created_at DESC;
--
-- Every uploaded file with its storage path:
--   SELECT t.team_name, f->>'name' AS file_name, f->>'path' AS storage_path
--   FROM public.teams t, jsonb_array_elements(t.consent_files) AS f
--   ORDER BY t.created_at DESC;
--
-- A time-limited download link (dashboard: Storage -> consents -> file ->
-- "Get signed URL"), or from SQL with the service role key via the API.
