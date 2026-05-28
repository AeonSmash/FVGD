# Class Multiverse Overworld Engine (Version 1)

**Version:** 2.0.0  
**Repository:** [https://github.com/AeonSmash/FVGD](https://github.com/AeonSmash/FVGD)  
See [CHANGELOG.md](CHANGELOG.md) for release history.

Educational HTML5 Canvas overworld for the **Fundamentals of Video Game Design** course. Students will eventually add their own homes, dialogue, and platformer levels. Version 1 delivers the teacher-owned engine plus one sample home.

## How to Run

1. Open this folder on your computer.
2. Double-click `index.html`, or right-click it and open with Chrome or Firefox.
3. No build step, npm install, or server is required.

## Controls

| Input | Action |
|-------|--------|
| WASD / Arrow keys | Move (four directions, no diagonals) |
| E | Interact (homes, signs, NPCs, portal, exit) |
| Enter | Confirm / start game / advance dialogue |
| Escape | Close dialogue |
| F1 | Toggle debug overlay |
| F2 | Toggle collision box outlines |

## Current Features (Version 2)

- Everything in Version 1, plus:
- **Student home packs** via `js/students/<id>/pack.js` + manifest
- **Platformer levels** launched from home portals (sample level included)
- **Rewards** (keys/skills) and colored doors on the overworld
- **Save point** in homes (localStorage; cloud when Supabase enabled)
- **Submit for review** interactable (Supabase submissions table)
- **Login** with class code + student PIN (optional cloud)
- **Teacher admin** at `/admin/index.html` (roster, submissions, CSV export)
- Vercel deploy with config injection — see [docs/vercel-deployment.md](docs/vercel-deployment.md)
- Supabase backend — see [docs/supabase-setup.md](docs/supabase-setup.md)

## Folder Structure

```text
index.html, style.css, README.md
js/main.js
js/engine/     — teacher-owned engine systems
js/scenes/     — title, overworld, sample home
js/entities/   — player, interactables
js/data/       — maps, home registry, dialogue
assets/        — art/audio placeholders
docs/          — guides and bug log
```

## Known Limitations

- Placeholder colored rectangles instead of final art
- No save/load (`localStorage` prepared in `gameState` only)
- No platformer engine or active portals
- No audio, inventory, combat, or multiplayer
- Locked homes show a notice dialogue only

## Next Planned Features

- **V1.1** — More sample homes, locked/unlocked visuals, checkmarks
- **V1.2** — Reusable student home template and manifest import
- **V1.3** — Platformer graybox (gravity, platforms, goal)
- **V1.4** — Rewards and completed-level tracking UI
- **V1.5** — Local save with `localStorage`
- **V2.0** — Student submission pipeline and teacher review tools

## Manual Test Checklist

See [docs/teacher-notes.md](docs/teacher-notes.md) for the full classroom testing checklist.

Quick smoke test:

1. Open `index.html` — title screen appears, console shows `Canvas ready.`
2. Press Enter — fade to overworld
3. Move with WASD — player moves, no diagonals, walls block movement
4. Walk to purple **Sample Studio** home — press E to enter
5. Talk to Guide (yellow), inspect portal (purple), exit (red) with E
6. Press F1 / F2 to verify debug tools
7. Exit home — return to same overworld position

## Source Documents

- [cursor_overworld_engine_v1_kickoff.md](cursor_overworld_engine_v1_kickoff.md) — original build specification
