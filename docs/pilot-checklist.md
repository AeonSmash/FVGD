# Pilot Checklist (5 students, one class period)

Run this **before** rolling out to all four sections.

## Teacher prep

- [ ] Vercel production URL loads title screen
- [ ] Supabase migrations `001`–`003` applied
- [ ] Edge Functions `login`, `enroll_student`, `reset_pin` deployed
- [ ] Vercel env vars set (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- [ ] Five pilot students enrolled via [admin/index.html](../admin/index.html)

## Student flow (each pilot)

- [ ] Login with class code + student ID + PIN
- [ ] Enter overworld, move without diagonal drift
- [ ] Enter Sample Studio home
- [ ] Save at green save point; refresh browser; progress restored
- [ ] Enter platformer from purple portal; reach gold goal
- [ ] Return to overworld; Yellow Key appears in rewards bar
- [ ] Try yellow door with/without key (dialogue correct)
- [ ] Submit work at teal submit point (row appears in admin queue)
- [ ] Teacher approves submission in admin

## Insight

- [ ] `level_events` shows save and completion rows for pilot IDs
- [ ] Export CSV from admin downloads expected columns

## Triage

Log issues in [bug-log.md](bug-log.md). Fix blockers before full rollout.

## Sign-off

| Date | Section | Teacher | Ready for full rollout? |
|------|---------|---------|------------------------|
| | | | Yes / No |
