-- FVGD Multiverse schema (run in Supabase SQL editor or via CLI)

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  class_section text not null,
  student_id text not null,
  display_name text not null,
  student_ref text,
  role text not null default 'student',
  active boolean not null default true,
  failed_login_count int not null default 0,
  created_at timestamptz default now(),
  last_seen_at timestamptz,
  unique (class_section, student_id)
);

create table if not exists public.save_states (
  player_id uuid primary key references public.players(id) on delete cascade,
  visited_homes jsonb not null default '[]'::jsonb,
  completed_levels jsonb not null default '[]'::jsonb,
  unlocked_rewards jsonb not null default '[]'::jsonb,
  overworld_position jsonb not null default '{"x":160,"y":160}'::jsonb,
  settings jsonb not null default '{}'::jsonb,
  schema_version int not null default 1,
  updated_at timestamptz default now()
);

create table if not exists public.student_submissions (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  world_id text not null,
  submission_type text not null,
  status text not null default 'draft',
  manifest jsonb,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  reviewer_notes text,
  rubric_scores jsonb,
  playtest_passed boolean,
  created_at timestamptz default now()
);

create table if not exists public.level_events (
  id bigserial primary key,
  player_id uuid not null references public.players(id) on delete cascade,
  event_type text not null,
  world_id text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists level_events_player_created
  on public.level_events (player_id, created_at desc);

create table if not exists public.reward_definitions (
  id text primary key,
  type text not null,
  label text not null,
  color text,
  description text
);
