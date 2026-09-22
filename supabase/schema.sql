-- ============================================================================
-- StudyPulse — Initial Database Schema
--
-- Run manually: Supabase Dashboard → SQL Editor → paste this file → Run.
-- Safe to re-run: tables use IF NOT EXISTS, policies are dropped before
-- they are recreated, and index/constraint additions are guarded.
--
-- Mirrors what the app displays:
--   Dashboard — readiness %, lessons completed, mock exam average, daily
--   focus hours, subject mastery breakdown, exam history, AI
--   recommendations, study goals checklist, and the revision timetable.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- profiles — one row per authenticated user, keyed to auth.users(id).
-- Created by the signup flow (src/pages/signup.tsx) right after
-- supabase.auth.signUp succeeds. Stores display identity and academic
-- context (grade level, term) plus the study streak shown on the Dashboard.
--
-- NOTE: this table's user-id column is `id` itself (it IS the auth user),
-- so its RLS policies compare auth.uid() = id rather than user_id.
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  grade_level text,
  academic_term text,
  streak_days integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Without a DELETE policy, RLS default-denies deletes: they would succeed
-- with 0 rows affected and no error. This lets users delete their own row.
drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own"
  on public.profiles
  for delete
  to authenticated
  using (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- subjects — shared reference data (no user_id): the catalog of academic
-- subjects powering the mastery breakdown, lessons, and AI recommendations.
-- Read-only for authenticated users; no INSERT/UPDATE policies — only the
-- app owner manages rows directly via the Supabase dashboard for now.
-- ----------------------------------------------------------------------------
create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text,
  category text
);

alter table public.subjects enable row level security;

drop policy if exists "subjects_select_authenticated" on public.subjects;
create policy "subjects_select_authenticated"
  on public.subjects
  for select
  to authenticated
  using (true);

-- ----------------------------------------------------------------------------
-- subject_mastery — per-user mastery percentage and solved-question counts
-- per subject; drives the Dashboard's subject mastery breakdown and the
-- overall readiness percentage.
-- ----------------------------------------------------------------------------
create table if not exists public.subject_mastery (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  subject_id uuid not null references public.subjects (id) on delete cascade,
  mastery_pct numeric,
  questions_solved integer,
  updated_at timestamptz not null default now()
);

alter table public.subject_mastery enable row level security;

drop policy if exists "subject_mastery_select_own" on public.subject_mastery;
create policy "subject_mastery_select_own"
  on public.subject_mastery
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "subject_mastery_insert_own" on public.subject_mastery;
create policy "subject_mastery_insert_own"
  on public.subject_mastery
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "subject_mastery_update_own" on public.subject_mastery;
create policy "subject_mastery_update_own"
  on public.subject_mastery
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "subject_mastery_delete_own" on public.subject_mastery;
create policy "subject_mastery_delete_own"
  on public.subject_mastery
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- One mastery row per user per subject. Without this, duplicate rows are
-- possible (e.g. React StrictMode double-invokes effects in development).
-- Guarded DO block so this applies even if the table already exists.
do $$
begin
  alter table public.subject_mastery
    add constraint subject_mastery_user_subject_unique unique (user_id, subject_id);
exception
  when duplicate_object then null; -- constraint already exists (re-run)
end $$;

-- Postgres does not auto-index FK columns. The unique constraint above
-- already covers user_id-prefix lookups; this index covers subject joins.
create index if not exists idx_subject_mastery_subject_id
  on public.subject_mastery (subject_id);

-- ----------------------------------------------------------------------------
-- lessons — shared reference data (no user_id): the ordered lesson catalog
-- per subject used by the Lessons page and the revision timetable.
-- Read-only for authenticated users; managed via the Supabase dashboard.
-- ----------------------------------------------------------------------------
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects (id) on delete cascade,
  title text,
  lesson_order integer,
  total_lessons integer
);

alter table public.lessons enable row level security;

drop policy if exists "lessons_select_authenticated" on public.lessons;
create policy "lessons_select_authenticated"
  on public.lessons
  for select
  to authenticated
  using (true);

-- ----------------------------------------------------------------------------
-- lesson_progress — per-user completion percentage per lesson; powers the
-- "lessons completed" metric and progress bars on Dashboard/Lessons.
-- ----------------------------------------------------------------------------
create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  progress_pct numeric,
  updated_at timestamptz not null default now()
);

alter table public.lesson_progress enable row level security;

drop policy if exists "lesson_progress_select_own" on public.lesson_progress;
create policy "lesson_progress_select_own"
  on public.lesson_progress
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "lesson_progress_insert_own" on public.lesson_progress;
create policy "lesson_progress_insert_own"
  on public.lesson_progress
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "lesson_progress_update_own" on public.lesson_progress;
create policy "lesson_progress_update_own"
  on public.lesson_progress
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "lesson_progress_delete_own" on public.lesson_progress;
create policy "lesson_progress_delete_own"
  on public.lesson_progress
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- One progress row per user per lesson (see subject_mastery note above
-- regarding duplicates and StrictMode). Guarded so it is re-run safe.
do $$
begin
  alter table public.lesson_progress
    add constraint lesson_progress_user_lesson_unique unique (user_id, lesson_id);
exception
  when duplicate_object then null; -- constraint already exists (re-run)
end $$;

-- The unique constraint above covers user_id-prefix lookups; this index
-- covers joins from the lessons side.
create index if not exists idx_lesson_progress_lesson_id
  on public.lesson_progress (lesson_id);

-- ----------------------------------------------------------------------------
-- exam_results — per-user mock/past exam attempts with score, max score,
-- timestamp, and an optional diagnostic note; powers the Dashboard's mock
-- exam average, exam history list, and score-trend charts.
-- ----------------------------------------------------------------------------
create table if not exists public.exam_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text,
  score numeric,
  max_score numeric not null default 100,
  taken_at timestamptz,
  diagnostic_note text
);

alter table public.exam_results enable row level security;

drop policy if exists "exam_results_select_own" on public.exam_results;
create policy "exam_results_select_own"
  on public.exam_results
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "exam_results_insert_own" on public.exam_results;
create policy "exam_results_insert_own"
  on public.exam_results
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "exam_results_update_own" on public.exam_results;
create policy "exam_results_update_own"
  on public.exam_results
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "exam_results_delete_own" on public.exam_results;
create policy "exam_results_delete_own"
  on public.exam_results
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Supports the Dashboard's per-user exam history, newest first.
create index if not exists idx_exam_results_user_taken
  on public.exam_results (user_id, taken_at);

-- ----------------------------------------------------------------------------
-- study_goals — per-user goal checklist items (the Dashboard's goal
-- checkboxes with the "X of Y done" counter), each with a target date.
-- ----------------------------------------------------------------------------
create table if not exists public.study_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  description text,
  is_complete boolean not null default false,
  target_date date not null default current_date
);

alter table public.study_goals enable row level security;

drop policy if exists "study_goals_select_own" on public.study_goals;
create policy "study_goals_select_own"
  on public.study_goals
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "study_goals_insert_own" on public.study_goals;
create policy "study_goals_insert_own"
  on public.study_goals
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "study_goals_update_own" on public.study_goals;
create policy "study_goals_update_own"
  on public.study_goals
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "study_goals_delete_own" on public.study_goals;
create policy "study_goals_delete_own"
  on public.study_goals
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Supports the Dashboard's per-user goal checklist queries.
create index if not exists idx_study_goals_user_id
  on public.study_goals (user_id);

-- ----------------------------------------------------------------------------
-- ai_recommendations — per-user AI-generated study suggestions (optionally
-- tied to a subject); powers the Dashboard's AI recommendations panel and
-- the AI Study Assistant page.
-- ----------------------------------------------------------------------------
create table if not exists public.ai_recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  subject_id uuid references public.subjects (id) on delete cascade,
  message text,
  created_at timestamptz not null default now()
);

alter table public.ai_recommendations enable row level security;

drop policy if exists "ai_recommendations_select_own" on public.ai_recommendations;
create policy "ai_recommendations_select_own"
  on public.ai_recommendations
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "ai_recommendations_insert_own" on public.ai_recommendations;
create policy "ai_recommendations_insert_own"
  on public.ai_recommendations
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "ai_recommendations_update_own" on public.ai_recommendations;
create policy "ai_recommendations_update_own"
  on public.ai_recommendations
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "ai_recommendations_delete_own" on public.ai_recommendations;
create policy "ai_recommendations_delete_own"
  on public.ai_recommendations
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Supports the Dashboard's per-user recommendations feed, newest first.
create index if not exists idx_ai_recommendations_user_created
  on public.ai_recommendations (user_id, created_at);


 create or replace function public.handle_new_user()
 returns trigger
 language plpgsql
 security definer
 set search_path = public
 as $$
 begin
   insert into public.profiles (id, full_name)
   values (
     new.id,
     coalesce(new.raw_user_meta_data ->> 'full_name', '')
   )
   on conflict (id) do nothing;
   return new;
 end;
 $$;

 create trigger on_auth_user_created
   after insert on auth.users
   for each row
   execute function public.handle_new_user();
