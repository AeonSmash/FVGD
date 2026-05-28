# Teacher Notes

## Classroom Usage

Version 1 is a **navigation hub**, not a full RPG. Use it to demonstrate:

1. How a game loop and scene manager work
2. How data files (`homeRegistry`, `dialogueData`, `overworldMap`) separate content from engine code
3. How students will eventually plug in homes and platformer levels

Recommended demo flow in class:

1. Title screen → Enter
2. Walk the Main Plaza paths
3. Read the hub sign (gray wall tiles near center)
4. Enter **Sample Studio** (purple icon)
5. Talk to the Guide NPC and inspect the portal placeholder
6. Beat the sample platformer → earn Yellow Key → try yellow door
7. Save at green save point; submit at teal tile (Supabase)
8. Review submissions in `admin/index.html`

## Supabase and roster (Version 2)

1. Apply SQL migrations — [supabase-setup.md](supabase-setup.md)
2. Deploy Edge Functions (`login`, `enroll_student`, `reset_pin`)
3. Set Vercel env vars and redeploy
4. Enroll students via admin page (CSV: `class,student_id,display_name,pin`)
5. PIN reset: use `reset_pin` function or Supabase Auth admin

Pilot before full rollout: [pilot-checklist.md](pilot-checklist.md)

Privacy: [privacy.md](privacy.md)

## Student presentations

Share [student-world-and-platformer-prep.md](student-world-and-platformer-prep.md) as the comprehensive student reference (no built-in week schedule)—map its topic index into your 32-week plan.

## Student Milestone Order

Use this order so scope stays manageable:

```text
Icon Complete
→ Home Complete
→ NPC Dialogue Complete
→ Platformer Graybox Complete
→ Gameplay Features Complete
→ Art/Audio Polish Complete
→ Playtesting and Revision Complete
```

Do not let students jump to a full platformer before their home icon and home scene work.

## Manual Testing Checklist

### Startup

- [ ] Page loads without console errors
- [ ] Canvas appears centered
- [ ] Title screen appears
- [ ] Pressing Enter starts the game (with fade)

### Scene Management

- [ ] Title loads overworld
- [ ] Overworld loads sample home
- [ ] Sample home returns to overworld
- [ ] Scene transitions do not duplicate objects
- [ ] Input works after transitions

### Movement

- [ ] Player moves in four directions
- [ ] Player stops when keys released
- [ ] No diagonal movement
- [ ] Blocked tiles stop the player
- [ ] Player cannot leave the map bounds

### Camera

- [ ] Camera follows player on overworld
- [ ] Camera clamps at map edges
- [ ] Collision still works while camera moves

### Interaction

- [ ] Prompt near sample home
- [ ] E enters sample home
- [ ] Prompt near exit, NPC, portal in home
- [ ] E exits to overworld at saved position
- [ ] Locked home shows notice dialogue

### Dialogue

- [ ] Movement pauses during dialogue
- [ ] Enter advances lines
- [ ] E advances lines
- [ ] Escape closes dialogue
- [ ] Movement resumes after close

### Game State

- [ ] Visiting sample home updates `visitedHomes`
- [ ] Debug overlay shows visited count

### Debug

- [ ] F1 toggles overlay
- [ ] F2 toggles collision boxes
- [ ] FPS and coordinates update live

## Troubleshooting

| Problem | What to check |
|---------|----------------|
| Blank canvas | Browser console for 404 script errors; verify all `<script>` paths in `index.html` |
| `Canvas ready.` missing | `js/engine/canvas.js` loaded; canvas id is `gameCanvas` |
| Enter does nothing | `js/engine/input.js` loaded before scenes; `input.update()` runs each frame |
| Player falls through walls | `buildCollisionFromMap` and collision layer tile IDs |
| Wrong scene after transition | `sceneManager.changeScene` vs `changeSceneImmediate`; transition stuck? |
| Dialogue advances instantly | Dialogue update must run only while `dialogue.active` (not same frame as open) |

## Extending for Your Class

- Add student entries to `js/data/homeRegistry.js` (keep validation warnings enabled)
- Copy `sampleHomeScene.js` pattern for new homes
- Use `docs/bug-log.md` during playtesting weeks
