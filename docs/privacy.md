# Privacy and Data (Supabase)

## What is stored

When Supabase is enabled, the game may store:

| Data | Purpose |
|------|---------|
| Class section + student ID | Login (synthetic email `class.id@fvgd.local`) |
| Display name | In-game label |
| Save progress (homes visited, levels, rewards, position) | Cloud save |
| Level events (save, platformer start/complete, submit) | Teacher insight |
| Submission snapshots | Grading and review |

Optional teacher-only field: `student_ref` for gradebook linkage (SIS id).

## What is not stored

- Passwords are handled by Supabase Auth (hashed). PINs are not stored in plain text in app tables.
- No live location, contacts, or social graph.
- No multiplayer session data.

## Access control

- **Row Level Security (RLS)** limits students to their own rows.
- **Service role key** is for teacher admin tools only — never embed in the public game or commit to Git.
- **Anon key** in the browser is acceptable when RLS is enabled.

## District guidance

Confirm with your school/district whether cloud storage of student display names and progress requires parent notice or a vendor agreement. Minimize PII: use roster numbers as `student_id` and keep legal names in `student_ref` (teacher-only) if allowed.

## Deletion

Teachers can deactivate a player (`active = false`) and remove auth users via Supabase Dashboard. Document your class retention policy (e.g. delete project data at end of semester).

## Offline mode

Students may press **Esc** on the login screen to play offline with `localStorage` only; no cloud rows are written until they log in.
