# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [2.0.2] - 2026-05-28

### Fixed

- Blank screen on load: removed blocking Supabase CDN script from `index.html` (game scripts now always run)
- Supabase JS loads only when `supabaseEnabled` is true
- Boot no longer hangs indefinitely on auth restore (3s timeout); errors show on canvas if boot fails

## [2.0.1] - 2026-05-28

### Fixed

- Vercel production deploy: `vercel-build.js` now always generates `public/` and fails the build if `index.html` is missing
- Documented correct production URL **https://fvgd-flax.vercel.app** (`fvgd.vercel.app` was not assigned to this project)

### Changed

- `vercel.json` build command set to `node scripts/vercel-build.js`; removed deprecated `name` property
- [`docs/vercel-deployment.md`](docs/vercel-deployment.md) updated with dashboard override notes and 404 troubleshooting

## [2.0.0] - 2026-05-28

### Added

- Student home template factory (`createHomeScene`) and sample student pack
- Platformer graybox scene with teacher sample level and goal reward (`yellow_key`)
- Reward registry, rewards HUD, and yellow door on overworld
- localStorage save/load with locked JSON schema (`saveLocal.js`)
- Save point and submit-for-review interactables in homes
- Supabase schema, RLS policies, reward seed migrations
- Edge Functions: `login`, `enroll_student`, `reset_pin` (class code + PIN)
- Game client: auth, cloud save, telemetry, submissions
- Login scene; optional Supabase via `js/config.js` + Vercel inject script
- Teacher admin page (`admin/index.html`)
- Docs: `privacy.md`, `supabase-setup.md`, `pilot-checklist.md`, `vercel-deployment.md`

### Changed

- `homeRegistry` built from student manifests + plot placeholders
- Boot flow loads save, registers dynamic home scenes

## [1.0.0] - 2026-05-27

### Added

- HTML5 Canvas overworld engine (plain HTML, CSS, JavaScript; no frameworks)
- Game loop, scene manager, keyboard input, rectangle collision, camera follow
- Title screen, Main Plaza overworld (40x30 tilemap), and sample home scene
- Data-driven home registry with sample and locked placeholder homes
- Interaction prompts, dialogue system, fade scene transitions
- Debug overlay (F1) and collision box toggle (F2)
- Classroom documentation in `docs/`
- Teacher planning files: `cursor_overworld_engine_v1_kickoff.md`, `multiverse_platformer_strategy_v_1.md`

---

## Future releases (planned)

| Version | Scope |
|---------|--------|
| 1.1.0 | More sample homes, locked/unlocked visuals |
| 1.2.0 | Student home template and manifest import |
| 1.3.0 | Platformer graybox |
| 1.5.0 | localStorage save |

### Revision workflow

1. Update `VERSION`
2. Add a new section at the top of this file
3. Commit: `Release vX.Y.Z: short description`
4. Tag: `git tag -a vX.Y.Z -m "..."` then `git push origin main --tags`
