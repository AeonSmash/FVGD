# Student Content Guide

This guide explains what students **may** customize later and what they **must not** edit in Version 1.

## What Students May Eventually Create

- Home icon image (32x32 recommended)
- Manifest data describing their home
- Home interior map layout
- NPC dialogue text
- Platformer level data
- Art and audio assets
- Gameplay content inside approved templates

## What Students Must Not Edit (Teacher-Owned)

Do not modify these engine files unless you are the teacher or have explicit permission:

- `js/engine/` (all files)
- `js/scenes/overworldScene.js`
- `js/scenes/titleScene.js`
- `js/main.js`
- `js/engine/sceneManager.js`
- `js/engine/gameLoop.js`
- `js/engine/collision.js`
- `js/engine/input.js`
- `js/engine/gameState.js`
- `js/engine/camera.js`
- `js/engine/ui.js`
- `js/engine/transition.js`
- `js/engine/debug.js`

## Safe Student Content Areas (Future)

Students will work inside templates and data folders, for example:

```text
student_name/
├── manifest.json
├── overworld/
│   └── homeIcon.png
├── home/
│   ├── homeMap.js
│   └── dialogue.js
├── platformer/
│   └── levelData.js
└── assets/
    ├── images/
    └── audio/
```

Version 2 includes a reference pack at `js/students/sample/` (`pack.js` + `manifest.json`).

## How to Add Your Home (student pack)

1. Copy `js/students/sample/` to `js/students/your_id/`.
2. Edit `manifest.json` (id, name, position on overworld, `platformerLevelId`, `rewardId`).
3. Edit `pack.js` — room layout and interactables (NPC, portal, save point, submit, exit).
4. Add dialogue keys to `js/data/dialogueData.js`.
5. Add platformer level to `js/data/platformerLevels.js`.
6. Register your pack: add `<script src="js/students/your_id/pack.js"></script>` in `index.html` **before** `homeRegistry.js`.
7. Do **not** edit `overworldScene.js` or engine files.

## Submit for grading

Use the **Submit Work** interactable (teal tile) in your home when logged in with Supabase. Your teacher reviews submissions in `admin/index.html`.

## How to Learn From the Sample Home

1. Open `js/students/sample/pack.js` and read the room + interactable layout.
2. Open `js/data/dialogueData.js` for dialogue text.
3. See how `registerStudentPack` feeds `homeRegistry` automatically.

## Rules for Safe Extensions

- Keep dialogue text in `js/data/dialogueData.js` (or your own dialogue file loaded by a template).
- Do not hard-code home positions inside `overworldScene.js`; use `homeRegistry.js`.
- Do not change collision or scene manager code to fix content bugs—fix your map data instead.
- Test in the browser after every change and check the console for warnings.
