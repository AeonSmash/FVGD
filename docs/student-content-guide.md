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

Version 1 includes a reference sample at `assets/students/sample/` and a playable sample in `js/scenes/sampleHomeScene.js`.

## How to Learn From the Sample Home

1. Open `js/scenes/sampleHomeScene.js` and read how the room, interactables, and dialogue are defined.
2. Open `js/data/dialogueData.js` and see how dialogue lines are stored separately from scene logic.
3. Open `js/data/homeRegistry.js` and see how overworld home icons are registered.

## Rules for Safe Extensions

- Keep dialogue text in `js/data/dialogueData.js` (or your own dialogue file loaded by a template).
- Do not hard-code home positions inside `overworldScene.js`; use `homeRegistry.js`.
- Do not change collision or scene manager code to fix content bugs—fix your map data instead.
- Test in the browser after every change and check the console for warnings.
