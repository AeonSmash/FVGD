alter table public.players enable row level security;
alter table public.save_states enable row level security;
alter table public.student_submissions enable row level security;
alter table public.level_events enable row level security;
alter table public.reward_definitions enable row level security;

create policy players_self_read on public.players
  for select using (auth.uid() = auth_user_id);

create policy players_self_update_last_seen on public.players
  for update using (auth.uid() = auth_user_id)
  with check (auth.uid() = auth_user_id);

create policy save_states_self_rw on public.save_states
  for all using (
    player_id in (select id from public.players where auth_user_id = auth.uid())
  )
  with check (
    player_id in (select id from public.players where auth_user_id = auth.uid())
  );

create policy submissions_self_read on public.student_submissions
  for select using (
    player_id in (select id from public.players where auth_user_id = auth.uid())
  );

create policy submissions_self_insert on public.student_submissions
  for insert with check (
    player_id in (select id from public.players where auth_user_id = auth.uid())
    and status in ('draft', 'submitted')
  );

create policy events_self_insert on public.level_events
  for insert with check (
    player_id in (select id from public.players where auth_user_id = auth.uid())
  );

create policy rewards_public_read on public.reward_definitions
  for select using (true);
