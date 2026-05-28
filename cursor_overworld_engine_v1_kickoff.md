# Cursor Kickoff File: Version 1 Overworld Engine

**Project:** Class Multiverse Overworld Engine  
**Course:** Fundamentals of Video Game Design  
**Version:** 1.0  
**Recommended Tool:** Cursor  
**Stack:** Plain HTML, CSS, JavaScript, HTML5 Canvas  
**Frameworks:** None for Version 1  

---

## 0. Purpose of This File

This Markdown file is designed to be placed directly into a Cursor project and used as the primary development guide for building the first version of the class Overworld Engine.

Cursor should use this document as the source of truth for:

- Project structure
- Development order
- Coding style
- Feature scope
- Acceptance criteria
- Manual testing
- Student-content boundaries
- Teacher-owned engine responsibilities

The goal is to build a stable, readable, beginner-friendly 2D top-down overworld that will later connect student-created homes and platformer levels.

---

# 1. Project Vision

Build a single-player 2D class overworld where students can eventually plug in their own:

- Home icons
- Home interiors
- NPC dialogue
- Platformer levels
- Assets
- Story content
- Gameplay content

The first version should feel like a small JRPG-style classroom hub.

The player should be able to:

1. Open the game in a browser.
2. See a title screen.
3. Press Enter to enter the overworld.
4. Move around a 2D top-down map.
5. Collide with blocked tiles.
6. Approach a sample home.
7. See an interaction prompt.
8. Press E to enter the sample home.
9. Talk to a sample NPC or inspect a sign.
10. Inspect a placeholder platformer portal.
11. Exit back to the overworld.
12. See debug information while testing.

---

# 2. Version 1 Scope

## 2.1 Included in Version 1

Build these systems:

- Canvas setup
- Main game loop
- Scene manager
- Title scene
- Overworld scene
- Sample home scene
- Global game state
- Keyboard input manager
- Top-down player movement
- Rectangle collision
- Tilemap rendering
- Camera follow
- Home registry
- Interaction prompts
- Basic dialogue
- Basic fade transitions
- Debug overlay
- Documentation files

## 2.2 Not Included in Version 1

Do **not** build these yet:

- Student platformer engine
- Full platformer physics
- Real student submissions
- Inventory
- Combat
- Random encounters
- Multiplayer
- Online features
- Complex save menu
- Advanced animation
- Advanced asset loader
- Full audio system
- Phaser migration
- React/Vite/npm tooling

Version 1 should stay small and stable.

---

# 3. Core Development Rules for Cursor

## Rule 1: Plain JavaScript Only

Use:

- HTML
- CSS
- JavaScript
- HTML5 Canvas

Do not use:

- React
- Phaser
- Pixi
- Vite
- npm dependencies
- TypeScript
- Webpack
- build tools

## Rule 2: Prioritize Student Readability

Write code that high school students can read.

Prefer this:

```js
function drawPlayer(ctx, player) {
  ctx.fillRect(player.x, player.y, player.width, player.height);
}
```

Avoid overly abstract or advanced patterns unless they are clearly explained.

## Rule 3: Use Modular Files

Keep engine systems separate from scenes, entities, and data.

## Rule 4: Comment Why, Not Every Line

Good comment:

```js
// The scene manager keeps only one scene active at a time.
// This prevents the title screen and overworld from updating together.
```

Less useful comment:

```js
// Add 1 to x
x = x + 1;
```

## Rule 5: One System at a Time

Do not build collision, camera, dialogue, and transitions in one step.

Build in this order:

1. Canvas setup
2. Game loop
3. Scene manager
4. Input
5. Player movement
6. Collision
7. Tilemap
8. Camera
9. Home registry
10. Interaction
11. UI
12. Sample home
13. Dialogue
14. Transitions
15. Debug tools
16. Documentation

## Rule 6: Do Not Let Students Edit Engine Core Later

Students should eventually modify content files, not engine files.

Teacher-owned engine files include:

```text
js/engine/
js/scenes/overworldScene.js
js/engine/sceneManager.js
js/engine/gameLoop.js
js/engine/collision.js
js/engine/input.js
js/engine/gameState.js
```

---

# 4. Required Folder Structure

Cursor should create this structure:

```text
overworld-engine/
│
├── index.html
├── style.css
├── README.md
│
├── js/
│   ├── main.js
│   │
│   ├── engine/
│   │   ├── canvas.js
│   │   ├── gameLoop.js
│   │   ├── sceneManager.js
│   │   ├── input.js
│   │   ├── collision.js
│   │   ├── camera.js
│   │   ├── gameState.js
│   │   ├── ui.js
│   │   ├── transition.js
│   │   └── debug.js
│   │
│   ├── entities/
│   │   ├── player.js
│   │   ├── npc.js
│   │   ├── portal.js
│   │   └── interactable.js
│   │
│   ├── scenes/
│   │   ├── titleScene.js
│   │   ├── overworldScene.js
│   │   ├── homeSceneTemplate.js
│   │   └── sampleHomeScene.js
│   │
│   └── data/
│       ├── overworldMap.js
│       ├── homeRegistry.js
│       └── dialogueData.js
│
├── assets/
│   ├── shared/
│   │   ├── tiles/
│   │   ├── player/
│   │   ├── ui/
│   │   └── audio/
│   │
│   └── students/
│       └── sample/
│           ├── icon.png
│           └── placeholder.txt
│
└── docs/
    ├── build-plan.md
    ├── student-content-guide.md
    ├── bug-log.md
    └── teacher-notes.md
```

---

# 5. Recommended Script Loading Order

Because Version 1 avoids bundlers, scripts should be loaded in `index.html` in dependency order.

Suggested order:

```html
<script src="js/engine/canvas.js"></script>
<script src="js/engine/gameState.js"></script>
<script src="js/engine/input.js"></script>
<script src="js/engine/collision.js"></script>
<script src="js/engine/camera.js"></script>
<script src="js/engine/ui.js"></script>
<script src="js/engine/transition.js"></script>
<script src="js/engine/debug.js"></script>

<script src="js/data/overworldMap.js"></script>
<script src="js/data/homeRegistry.js"></script>
<script src="js/data/dialogueData.js"></script>

<script src="js/entities/player.js"></script>
<script src="js/entities/interactable.js"></script>
<script src="js/entities/npc.js"></script>
<script src="js/entities/portal.js"></script>

<script src="js/engine/sceneManager.js"></script>
<script src="js/scenes/titleScene.js"></script>
<script src="js/scenes/overworldScene.js"></script>
<script src="js/scenes/homeSceneTemplate.js"></script>
<script src="js/scenes/sampleHomeScene.js"></script>

<script src="js/engine/gameLoop.js"></script>
<script src="js/main.js"></script>
```

---

# 6. Phase 0 — Project Initialization

## Goal

Create the basic project and confirm the browser can display the canvas.

## Files to Create

```text
index.html
style.css
js/main.js
js/engine/canvas.js
```

## Requirements

`index.html` should:

- Load `style.css`
- Contain `<canvas id="gameCanvas"></canvas>`
- Load JavaScript files in the correct order
- Use a 960x640 canvas

`style.css` should:

- Center the canvas
- Use a dark page background
- Add `image-rendering: pixelated;`
- Keep the layout simple

`canvas.js` should:

- Find the canvas
- Get the 2D context
- Set canvas width and height
- Log `Canvas ready.`

## Acceptance Criteria

- Canvas appears.
- Browser console says `Canvas ready.`
- No console errors.

## Cursor Prompt

```text
Create a beginner-friendly HTML5 Canvas project for a 2D educational game engine.

Use plain HTML, CSS, and JavaScript only.

Create:
- index.html
- style.css
- js/main.js
- js/engine/canvas.js

Requirements:
- Canvas ID should be gameCanvas.
- Canvas size should be 960x640.
- Canvas should be centered on a dark page.
- CSS should include pixel-art-friendly image rendering.
- canvas.js should get the canvas and 2D context and log "Canvas ready."
- Keep the code simple and readable for high school students.
- Do not add frameworks, npm, modules, bundlers, or TypeScript.

After creating the files, explain what each file does and what I should test in the browser.
```

---

# 7. Phase 1 — Main Game Loop

## Goal

Create one master loop using `requestAnimationFrame`.

## Files to Create or Update

```text
js/engine/gameLoop.js
js/main.js
```

## Requirements

The loop should:

- Track `lastTime`
- Calculate `deltaTime`
- Call `update(deltaTime)`
- Call `draw()`
- Use `requestAnimationFrame(gameLoop)`

Suggested pattern:

```js
let lastTime = 0;

function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  update(deltaTime);
  draw();

  requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
  sceneManager.update(deltaTime);
}

function draw() {
  sceneManager.draw(ctx);
}
```

## Acceptance Criteria

- The canvas updates every frame.
- The loop delegates to the scene manager.
- No repeated console spam.

## Cursor Prompt

```text
Create a simple requestAnimationFrame game loop for this Canvas project.

Requirements:
- Create js/engine/gameLoop.js.
- Track lastTime and calculate deltaTime.
- Add update(deltaTime) and draw() functions.
- update(deltaTime) should delegate to sceneManager.update(deltaTime).
- draw() should delegate to sceneManager.draw(ctx).
- Start the loop from main.js.
- Keep the code simple and readable for students.
- Do not add gameplay logic directly to the game loop.

After updating, explain what changed and what I should test.
```

---

# 8. Phase 2 — Scene Manager

## Goal

Create a scene system that can switch between title, overworld, and sample home scenes.

## Files to Create

```text
js/engine/sceneManager.js
js/scenes/titleScene.js
js/scenes/overworldScene.js
js/scenes/sampleHomeScene.js
```

## Scene Pattern

Each scene should look like this:

```js
const someScene = {
  name: "someScene",

  create() {
    // runs when the scene starts
  },

  update(deltaTime) {
    // scene logic
  },

  draw(ctx) {
    // scene rendering
  },

  exit() {
    // cleanup before leaving scene
  }
};
```

## Scene Manager Requirements

The scene manager should support:

- `register(scene)`
- `changeScene(sceneName)`
- `update(deltaTime)`
- `draw(ctx)`
- `getCurrentSceneName()`

## Initial Scenes

### Title Scene

Displays:

- `Class Multiverse Overworld`
- `Press Enter to Start`

Pressing Enter should eventually load the overworld.

### Overworld Scene

For now, displays:

- Placeholder background
- Text: `Overworld Scene`

### Sample Home Scene

For now, displays:

- Placeholder background
- Text: `Sample Home Scene`

## Acceptance Criteria

- Title scene appears first.
- Scene manager stores the active scene.
- Scenes follow the same structure.
- No duplicate update/draw behavior.

## Cursor Prompt

```text
Build a simple scene manager for this Canvas game.

Requirements:
- Create js/engine/sceneManager.js.
- Each scene should have name, create, update, draw, and exit methods.
- The scene manager should register scenes, change scenes by name, update the active scene, draw the active scene, and report the current scene name.
- Create titleScene, overworldScene, and sampleHomeScene.
- The title scene should display "Class Multiverse Overworld" and "Press Enter to Start".
- The overworld scene should display a placeholder background and label.
- The sample home scene should display a placeholder background and label.
- Keep the code beginner-friendly and well-commented.
- Do not add player movement, collision, camera, dialogue, or home registry yet.

After updating, explain what changed and what I should test.
```

---

# 9. Phase 3 — Global Game State

## Goal

Create one shared object for persistent game data.

## File to Create

```text
js/engine/gameState.js
```

## Required State

```js
const gameState = {
  currentScene: "title",
  playerName: "",
  visitedHomes: [],
  completedLevels: [],
  unlockedRewards: [],
  settings: {
    volume: 0.8,
    debugMode: true,
    showCollision: false
  },
  overworldPlayerPosition: {
    x: 160,
    y: 160
  }
};
```

## Required Helper Functions

```js
function markHomeVisited(homeId) {}
function isHomeVisited(homeId) {}
function markLevelCompleted(levelId) {}
function isLevelCompleted(levelId) {}
function unlockReward(rewardId) {}
function hasReward(rewardId) {}
```

## Acceptance Criteria

- `gameState` is globally accessible.
- Helper functions prevent duplicate entries.
- The structure is ready for future `localStorage`.

## Cursor Prompt

```text
Create a simple global gameState system for this educational Canvas engine.

Requirements:
- Create js/engine/gameState.js.
- Track currentScene, playerName, visitedHomes, completedLevels, unlockedRewards, settings, and overworldPlayerPosition.
- Include helper functions:
  - markHomeVisited(homeId)
  - isHomeVisited(homeId)
  - markLevelCompleted(levelId)
  - isLevelCompleted(levelId)
  - unlockReward(rewardId)
  - hasReward(rewardId)
- Helper functions should prevent duplicate entries.
- Prepare the structure for future localStorage, but do not implement saving yet.
- Keep the code readable and easy to expand later.

After updating, explain what changed and what I should test.
```

---

# 10. Phase 4 — Keyboard Input System

## Goal

Create one input manager shared across all scenes.

## File to Create

```text
js/engine/input.js
```

## Controls

```text
WASD / Arrow Keys = Move
E = Interact
Enter = Confirm
Esc = Pause / Close
Space = Future jump
Shift = Future dash
F1 = Toggle debug overlay
F2 = Toggle collision boxes
```

## Required API

```js
input.isDown("ArrowUp")
input.isDown("KeyW")
input.isPressed("Enter")
input.isPressed("KeyE")
input.update()
```

## Important Behavior

`isDown` should remain true while the key is held.

`isPressed` should only be true once per key press.

## Acceptance Criteria

- Holding movement keys works.
- Pressing Enter triggers only once.
- Pressing E triggers only once.
- Input state updates every frame.

## Cursor Prompt

```text
Create a reusable keyboard input manager for this Canvas game.

Requirements:
- Create js/engine/input.js.
- Track keys that are currently held.
- Track keys that were just pressed this frame.
- Include helper methods:
  - input.isDown(code)
  - input.isPressed(code)
  - input.update()
- Support WASD, Arrow Keys, Enter, E, Escape, Space, Shift, F1, and F2.
- isPressed should only be true once per key press.
- Keep the system simple and educational.
- Update titleScene so pressing Enter changes to overworldScene.

After updating, explain what changed and what I should test.
```

---

# 11. Phase 5 — Top-Down Player Controller

## Goal

Create player movement for top-down overworld and home areas.

## File to Create

```text
js/entities/player.js
```

## Player Class

```js
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 28;
    this.height = 28;
    this.speed = 2.5;
    this.facing = "down";
    this.state = "idle";
  }

  updateTopDown(input, collisionObjects) {}

  draw(ctx, camera) {}
}
```

## Movement Rules

Use four-direction movement.

For Version 1, prevent diagonal movement.

Suggested priority:

1. Up/down movement
2. Left/right movement only if no vertical input is active

## Placeholder Drawing

Draw the player as:

- Blue body rectangle
- Smaller light rectangle showing facing direction

## Acceptance Criteria

- Player appears in overworld.
- Player moves with WASD and arrow keys.
- Player cannot move diagonally.
- Player tracks facing direction.
- Player state changes between `idle` and `walk`.

## Cursor Prompt

```text
Create a beginner-friendly Player class for top-down movement in a Canvas game.

Requirements:
- Create js/entities/player.js.
- Add x, y, width, height, speed, facing, and state.
- Implement updateTopDown(input, collisionObjects).
- Support movement with WASD and Arrow Keys.
- Prevent diagonal movement for now.
- Track facing direction: up, down, left, right.
- Track state: idle or walk.
- Draw the player as a simple blue placeholder rectangle with a smaller facing indicator.
- Add the player to overworldScene.
- Do not implement platformer physics yet.
- Do not implement collision yet unless a collisionObjects array is passed.

After updating, explain what changed and what I should test.
```

---

# 12. Phase 6 — Rectangle Collision

## Goal

Create reusable rectangle collision for maps, doors, homes, and future objects.

## File to Create

```text
js/engine/collision.js
```

## Required Functions

```js
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
```

```js
function moveWithCollision(entity, dx, dy, solids) {
  // Move horizontally, test, revert if blocked.
  // Move vertically, test, revert if blocked.
}
```

```js
function drawCollisionBox(ctx, rect, camera) {
  // Draw only if debug collision is enabled.
}
```

## Acceptance Criteria

- Player cannot pass through solid rectangles.
- Horizontal and vertical collision resolve separately.
- Collision boxes can be drawn later in debug mode.

## Cursor Prompt

```text
Create a reusable rectangle collision system for this Canvas game.

Requirements:
- Create js/engine/collision.js.
- Add isColliding(a, b).
- Add moveWithCollision(entity, dx, dy, solids).
- The movement helper should resolve horizontal and vertical movement separately.
- Add drawCollisionBox(ctx, rect, camera) for future debug drawing.
- Update Player.updateTopDown so it can use moveWithCollision when collision objects are provided.
- Keep the code readable for students.

After updating, explain what changed and what I should test.
```

---

# 13. Phase 7 — Tilemap Overworld

## Goal

Create a basic tile-based overworld map.

## Files to Create or Update

```text
js/data/overworldMap.js
js/scenes/overworldScene.js
```

## Tile Size

```js
const TILE_SIZE = 32;
```

## Tile IDs

```text
0 = empty
1 = grass
2 = path
3 = water
4 = tree
5 = building
6 = wall
```

## Map Format

```js
const overworldMap = {
  tileSize: 32,
  width: 30,
  height: 20,

  layers: {
    ground: [],
    collision: []
  },

  spawn: {
    x: 160,
    y: 160
  }
};
```

## Required Helper

```js
function buildCollisionFromMap(map) {
  // Convert blocked tiles into solid rectangles.
}
```

## Placeholder Colors

```text
grass = green
path = tan
water = blue
tree = dark green
building = brown
wall = gray
```

## Acceptance Criteria

- Overworld renders as tiles.
- Player spawns on the map.
- Collision layer blocks movement.
- Map is prepared for camera scrolling.

## Cursor Prompt

```text
Create a simple tilemap system for the overworld.

Requirements:
- Create js/data/overworldMap.js.
- Use 32x32 tiles.
- Use numeric tile IDs:
  - 0 empty
  - 1 grass
  - 2 path
  - 3 water
  - 4 tree
  - 5 building
  - 6 wall
- Add a ground layer and a collision layer.
- Create a Main Plaza style layout with grass, paths, walls/trees/water, and room for several homes.
- Render placeholder colored tiles on Canvas.
- Convert the collision layer into solid rectangles.
- Prevent the player from walking through blocked tiles.
- Keep world coordinates separate from screen coordinates.
- Do not add camera yet.

After updating, explain what changed and what I should test.
```

---

# 14. Phase 8 — Camera System

## Goal

Create a camera that follows the player and clamps to map boundaries.

## File to Create

```text
js/engine/camera.js
```

## Required Class

```js
class Camera {
  constructor(viewWidth, viewHeight, worldWidth, worldHeight) {
    this.x = 0;
    this.y = 0;
    this.width = viewWidth;
    this.height = viewHeight;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
  }

  follow(target) {}

  worldToScreenX(worldX) {}

  worldToScreenY(worldY) {}
}
```

## Drawing Rule

Do not change collision coordinates.

Only subtract camera position while drawing:

```js
const screenX = worldX - camera.x;
const screenY = worldY - camera.y;
```

## Acceptance Criteria

- Camera follows the player.
- Camera does not scroll outside world boundaries.
- Tile drawing, player drawing, and object drawing use camera offset.
- Collision still uses world coordinates.

## Cursor Prompt

```text
Create a simple 2D camera system for the Canvas overworld.

Requirements:
- Create js/engine/camera.js.
- The camera should follow the player.
- The camera should clamp to the map boundaries.
- Add helper methods worldToScreenX(worldX) and worldToScreenY(worldY).
- Update overworld drawing so tiles and player draw relative to the camera.
- Collision should continue using world coordinates.
- Avoid complex canvas transforms; use simple coordinate subtraction for student readability.

After updating, explain what changed and what I should test.
```

---

# 15. Phase 9 — Home Registry

## Goal

Create a data-driven list of homes so student homes can eventually be added without editing the overworld logic.

## File to Create

```text
js/data/homeRegistry.js
```

## Registry Format

```js
const homeRegistry = [
  {
    id: "sample_home",
    name: "Sample Studio",
    author: "Teacher",
    description: "A sample student home used to test the overworld system.",
    iconColor: "purple",
    position: {
      x: 320,
      y: 256
    },
    width: 32,
    height: 32,
    homeScene: "sampleHome"
  }
];
```

## Required Fields

Each home requires:

```text
id
name
author
description
position
width
height
homeScene
```

## Validation Function

```js
function validateHomeRegistry(homeRegistry) {}
```

Check for:

- Missing IDs
- Duplicate IDs
- Missing names
- Missing scene names
- Missing positions
- Invalid dimensions

For Version 1, log warnings instead of crashing.

## Acceptance Criteria

- Overworld reads from `homeRegistry`.
- Sample home icon appears.
- Home icon is not hard-coded into the scene.
- Registry validation runs once.

## Cursor Prompt

```text
Create a home registry system for this class overworld engine.

Requirements:
- Create js/data/homeRegistry.js.
- Add at least one sample home entry.
- Each home should have id, name, author, description, iconColor, position, width, height, and homeScene.
- Add validateHomeRegistry(homeRegistry).
- The validation function should warn about missing IDs, duplicate IDs, missing positions, missing scene names, and invalid dimensions.
- Update overworldScene to render home icons from the registry.
- Do not make homes interactive yet.
- Keep code readable and beginner-friendly.

After updating, explain what changed and what I should test.
```

---

# 16. Phase 10 — Interaction System

## Goal

Allow the player to interact with homes, signs, doors, NPCs, and portals.

## Files to Create or Update

```text
js/entities/interactable.js
js/scenes/overworldScene.js
js/scenes/sampleHomeScene.js
js/engine/ui.js
```

## Interaction Box

Use a simple expanded player box first:

```js
function getInteractionBox(player) {
  return {
    x: player.x - 4,
    y: player.y - 4,
    width: player.width + 8,
    height: player.height + 8
  };
}
```

## Interaction Types

Support:

```text
homeEntrance
door
sign
npc
portal
exit
```

## Behavior

When near an interactable:

- Show prompt.
- Press E to trigger action.

## Home Entrance Behavior

When entering a home:

1. Save overworld player position to `gameState.overworldPlayerPosition`.
2. Mark home as visited.
3. Change to the home scene.

## Acceptance Criteria

- Prompt appears near sample home.
- Pressing E enters the sample home.
- Game state records that the sample home was visited.
- Player returns to previous overworld position after exiting the home.

## Cursor Prompt

```text
Create a simple interaction system for the Canvas overworld.

Requirements:
- Create js/entities/interactable.js if useful.
- Add a getInteractionBox(player) helper.
- Add support for interactable types: homeEntrance, door, sign, npc, portal, exit.
- Update overworldScene so the player sees "Press E to enter" near the sample home icon.
- Pressing E near the sample home should:
  - save the current overworld player position
  - mark the sample home as visited
  - switch to sampleHomeScene
- Add or update js/engine/ui.js with drawInteractionPrompt(ctx, text).
- Keep the system simple and reusable.

After updating, explain what changed and what I should test.
```

---

# 17. Phase 11 — Basic UI System

## Goal

Create reusable UI drawing helpers.

## File to Create or Update

```text
js/engine/ui.js
```

## Required Functions

```js
function drawInteractionPrompt(ctx, text) {}
function drawDialogueBox(ctx, speaker, text) {}
function drawSceneLabel(ctx, sceneName) {}
function drawVisitedHomeCount(ctx) {}
```

## Visual Style

Use:

- Dark translucent rectangles
- White text
- Monospace font
- Large readable text
- Simple layout

## Acceptance Criteria

- Prompts are readable.
- Dialogue boxes have space for speaker and text.
- Scene label can display current scene.
- Visited home count can display progress.

## Cursor Prompt

```text
Create a simple UI helper file for this Canvas game.

Requirements:
- Create or update js/engine/ui.js.
- Include:
  - drawInteractionPrompt(ctx, text)
  - drawDialogueBox(ctx, speaker, text)
  - drawSceneLabel(ctx, sceneName)
  - drawVisitedHomeCount(ctx)
- Use readable text, simple rectangles, a dark translucent background, and a monospace font.
- Keep the style appropriate for a 2D JRPG-inspired educational game.
- Make the functions reusable across scenes.

After updating, explain what changed and what I should test.
```

---

# 18. Phase 12 — Sample Home Scene

## Goal

Build one complete sample home to prove the overworld can connect to student spaces.

## File to Update

```text
js/scenes/sampleHomeScene.js
```

## Required Home Elements

The sample home should include:

- Small top-down room
- Walls
- Floor
- Player spawn
- Exit back to overworld
- One NPC or sign
- One inactive platformer portal placeholder
- Interaction prompts
- Collision

## Suggested Layout

```text
####################
#..................#
#....NPC...........#
#..................#
#..........PORTAL..#
#..................#
#....PLAYER........#
#..................#
#....EXIT..........#
####################
```

## Portal Behavior

The portal should not launch a platformer yet.

Instead, show:

```text
Platformer levels will be added in a later phase.
```

## Acceptance Criteria

- Player can move in the home.
- Player cannot walk through walls.
- Player can inspect NPC/sign.
- Player can inspect platformer portal placeholder.
- Player can exit back to overworld.

## Cursor Prompt

```text
Build a sample student home scene for the Canvas overworld engine.

Requirements:
- Update js/scenes/sampleHomeScene.js.
- Create a small top-down room.
- Include walls, floor, player spawn, an exit, one NPC or sign, and one platformer portal placeholder.
- Add collision so the player cannot walk through walls.
- Add an exit that returns to the overworld when the player presses E nearby.
- The platformer portal should display a message only. It should not launch a platformer yet.
- The player should return to the overworld at the saved overworld position.
- Keep the code beginner-friendly and modular.

After updating, explain what changed and what I should test.
```

---

# 19. Phase 13 — Basic Dialogue

## Goal

Create a simple dialogue system for NPC/sign text.

## Files to Create or Update

```text
js/data/dialogueData.js
js/engine/ui.js
js/scenes/sampleHomeScene.js
```

## Dialogue Data Format

```js
const dialogueData = {
  sampleNpcIntro: {
    speaker: "Guide",
    lines: [
      "Welcome to the sample home.",
      "Later, each student will build a space like this.",
      "The portal will eventually launch a platformer level."
    ]
  },

  samplePortal: {
    speaker: "Portal",
    lines: [
      "This portal is not active yet.",
      "Platformer levels will be added in a later phase."
    ]
  }
};
```

## Dialogue Behavior

When dialogue is open:

- Player movement pauses.
- Enter advances.
- E advances.
- Escape closes.
- Dialogue closes after the final line.

## Acceptance Criteria

- NPC/sign opens dialogue.
- Portal opens dialogue.
- Dialogue has speaker name.
- Player cannot move while dialogue is open.
- Player can advance through multiple lines.

## Cursor Prompt

```text
Create a basic dialogue system for this Canvas game.

Requirements:
- Create js/data/dialogueData.js.
- Store dialogue as speaker plus an array of lines.
- Add dialogue behavior to sampleHomeScene.
- Interacting with the NPC/sign should open dialogue.
- Interacting with the portal should open dialogue.
- When dialogue is open:
  - player movement pauses
  - Enter advances to the next line
  - E advances to the next line
  - Escape closes dialogue
  - dialogue closes after the final line
- Use drawDialogueBox(ctx, speaker, text) from the UI helper.
- Keep the system simple and understandable.

After updating, explain what changed and what I should test.
```

---

# 20. Phase 14 — Fade Transitions

## Goal

Add basic fade transitions between scenes.

## File to Create or Update

```text
js/engine/transition.js
js/engine/sceneManager.js
```

## Behavior

When changing scenes:

1. Fade out to black.
2. Switch scene.
3. Fade in from black.

## Suggested State

```js
const transition = {
  active: false,
  alpha: 0,
  direction: "out",
  speed: 0.05,
  nextScene: null
};
```

## Acceptance Criteria

- Scene changes fade instead of snapping.
- Input is ignored during active transitions.
- Transition does not get stuck.
- Transition works both ways:
  - overworld to home
  - home to overworld

## Cursor Prompt

```text
Create a simple fade transition system for scene changes in this Canvas game.

Requirements:
- Create js/engine/transition.js.
- Add a transition object that tracks active, alpha, direction, speed, and nextScene.
- Update sceneManager so changing scenes can use fade out, switch scene, then fade in.
- Draw a black rectangle overlay with changing alpha.
- Input should be ignored while the transition is active.
- Ensure transitions do not get stuck.
- Keep the code simple and readable.

After updating, explain what changed and what I should test.
```

---

# 21. Phase 15 — Debug Overlay

## Goal

Create teacher debug tools for troubleshooting.

## File to Create

```text
js/engine/debug.js
```

## Debug Display

Show:

- FPS
- Current scene name
- Player x/y
- Camera x/y
- Collision object count
- Registered home count
- Visited home count
- Debug mode status
- Collision visibility status

## Debug Controls

```text
F1 = Toggle debug overlay
F2 = Toggle collision boxes
```

## Acceptance Criteria

- F1 toggles debug overlay.
- F2 toggles collision box drawing.
- Debug overlay shows useful information.
- Debug mode does not interfere with gameplay.

## Cursor Prompt

```text
Create a teacher debug overlay for this Canvas game.

Requirements:
- Create js/engine/debug.js.
- F1 should toggle the debug overlay.
- F2 should toggle collision box drawing.
- Debug overlay should show:
  - FPS
  - current scene name
  - player position
  - camera position
  - collision object count
  - registered home count
  - visited home count
  - debug mode status
  - collision visibility status
- Update scenes as needed so they can pass player, camera, collision, and registry information to the debug overlay.
- Keep the overlay readable and useful for classroom debugging.

After updating, explain what changed and give me a manual test checklist.
```

---

# 22. Phase 16 — Main Plaza Overworld Layout

## Goal

Improve the overworld from a test map into a readable first district.

## Main Plaza Should Include

- Player spawn
- Paths
- Grass
- Trees/walls/water boundaries
- 3 to 5 visible home locations
- One functional sample home
- One locked placeholder home
- One sign explaining the hub
- One district gate placeholder for future expansion

## Design Rules

The overworld should be a navigation hub, not a full RPG.

Do not add:

- Combat
- Random battles
- Inventory
- Complex quests
- Huge world map

## Acceptance Criteria

- The map feels like a small JRPG-style plaza.
- The player can clearly identify where to go.
- There is room for future home expansion.
- The sample home remains functional.

## Cursor Prompt

```text
Improve the overworld tilemap into a small JRPG-style Main Plaza.

Requirements:
- Update js/data/overworldMap.js.
- Include paths, grass, trees, walls or water, and several home locations.
- Include one functional sample home location.
- Include at least one locked placeholder home location.
- Include one sign explaining that this is the class multiverse hub.
- Include one district gate placeholder for future expansion.
- Keep the map readable and not cluttered.
- Do not add combat, inventory, random battles, or complex quests.

After updating, explain what changed and what I should test.
```

---

# 23. Phase 17 — Documentation

## Goal

Document how to run, test, and expand the project.

## Files to Create or Update

```text
README.md
docs/student-content-guide.md
docs/teacher-notes.md
docs/bug-log.md
```

## README Should Include

- Project purpose
- How to run the game
- Controls
- Folder structure
- Current features
- Known limitations
- Next planned features

## Student Content Guide Should Include

Students may eventually create:

- Home icon
- Manifest data
- Home map
- NPC dialogue
- Platformer level
- Art/audio assets
- Gameplay content

Students should not edit:

- Engine core
- Scene manager
- Save/game state system
- Overworld engine
- Collision engine
- Rendering pipeline

## Sample Student Submission Structure

```text
student_name/
│
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

## Bug Log Format

```md
| Date | Bug | Steps to Reproduce | Priority | Status | Notes |
|---|---|---|---|---|---|
```

## Cursor Prompt

```text
Create project documentation for this educational overworld engine.

Requirements:
- Update README.md with:
  - project purpose
  - setup instructions
  - controls
  - folder structure
  - current features
  - limitations
  - next planned features
- Create docs/student-content-guide.md explaining what students can and cannot modify.
- Create docs/teacher-notes.md with classroom usage notes, milestone order, and troubleshooting tips.
- Create docs/bug-log.md with a bug log table.
- Keep the documentation clear enough for a teacher or student to understand.

After updating, summarize the documentation files and explain how they should be used.
```

---

# 24. Final Manual Testing Checklist

Use this checklist before calling Version 1 complete.

## Startup

- [ ] Page loads without console errors.
- [ ] Canvas appears centered.
- [ ] Title screen appears.
- [ ] Pressing Enter starts the game.

## Scene Management

- [ ] Title scene loads overworld.
- [ ] Overworld loads sample home.
- [ ] Sample home returns to overworld.
- [ ] Scene transitions do not duplicate objects.
- [ ] Scene transitions do not break input.

## Movement

- [ ] Player moves up.
- [ ] Player moves down.
- [ ] Player moves left.
- [ ] Player moves right.
- [ ] Player stops when key is released.
- [ ] Player cannot move diagonally.
- [ ] Player cannot walk through blocked tiles.
- [ ] Player cannot leave the intended map area.

## Camera

- [ ] Camera follows player.
- [ ] Camera does not scroll outside map boundaries.
- [ ] Objects draw in correct screen positions.
- [ ] Collision still works when camera moves.

## Interaction

- [ ] Prompt appears near sample home.
- [ ] Pressing E enters sample home.
- [ ] Prompt appears near home exit.
- [ ] Pressing E exits to overworld.
- [ ] Prompt appears near NPC/sign.
- [ ] Prompt appears near portal placeholder.
- [ ] Dialogue opens correctly.

## Dialogue

- [ ] Dialogue pauses movement.
- [ ] Enter advances dialogue.
- [ ] E advances dialogue.
- [ ] Escape closes dialogue.
- [ ] Movement resumes after dialogue closes.

## Game State

- [ ] Visiting sample home updates `visitedHomes`.
- [ ] Returning to overworld keeps state.
- [ ] Returning to overworld restores player position.
- [ ] Debug overlay shows correct visited count.

## Debug

- [ ] F1 toggles debug overlay.
- [ ] F2 toggles collision boxes.
- [ ] FPS appears.
- [ ] Player coordinates appear.
- [ ] Camera coordinates appear.
- [ ] Current scene name appears.
- [ ] Collision count appears.
- [ ] Home count appears.

## Documentation

- [ ] README explains how to run the project.
- [ ] Student content guide explains boundaries.
- [ ] Teacher notes explain classroom usage.
- [ ] Bug log exists.

---

# 25. Definition of Done for Version 1

Version 1 is complete when the game supports this flow:

```text
Title Screen
    ↓
Overworld Map
    ↓
Sample Student Home
    ↓
Return to Overworld
```

And includes:

- Working Canvas setup
- Working game loop
- Working scene manager
- Working input
- Working top-down player movement
- Working collision
- Working tilemap
- Working camera
- Working home registry
- Working interaction prompts
- Working sample home
- Working basic dialogue
- Working fade transitions
- Working debug overlay
- Clear documentation

Version 1 does **not** need:

- Polished art
- Audio
- Real student homes
- Platformer levels
- Save/load system
- Phaser
- Multiplayer

---

# 26. Future Version Roadmap

After Version 1 is stable, build in this order:

## Version 1.1 — Home Icon Expansion

- Add more sample homes.
- Add locked/unlocked visual states.
- Add completed checkmarks.
- Add registry-driven labels.

## Version 1.2 — Student Home Template

- Create reusable home template.
- Allow student home maps to load from data.
- Add sample manifest file.

## Version 1.3 — Platformer Graybox

- Add side-view player movement.
- Add gravity.
- Add platforms.
- Add hazard.
- Add goal.
- Return to overworld after completion.

## Version 1.4 — Rewards

- Add simple rewards:
  - keys
  - dash
  - double jump
  - bridge token
- Add reward display.
- Track completed levels.

## Version 1.5 — Local Save

- Add localStorage save/load.
- Save visited homes.
- Save completed levels.
- Save unlocked rewards.

## Version 2.0 — Student Submission Pipeline

- Student manifest validation
- Student asset folder rules
- Student home import checklist
- Platformer level data import checklist
- Teacher review process

---

# 27. Best First Prompt for Cursor

Paste this prompt into Cursor to begin:

```text
You are helping me build Version 1 of an educational HTML5 Canvas overworld engine for a high school Fundamentals of Video Game Design course.

Use this file as the source of truth for the project.

Build only the project foundation first.

Requirements:
- Use plain HTML, CSS, and JavaScript only.
- Do not use frameworks, bundlers, npm, React, Phaser, or TypeScript.
- Create a 960x640 centered canvas.
- Create this initial modular folder structure:
  - index.html
  - style.css
  - js/main.js
  - js/engine/canvas.js
  - js/engine/gameLoop.js
  - js/engine/sceneManager.js
  - js/scenes/titleScene.js
  - js/scenes/overworldScene.js
  - js/scenes/sampleHomeScene.js
- Implement a simple scene manager.
- Implement a title scene that says "Class Multiverse Overworld" and "Press Enter to Start".
- Implement an overworld scene that draws a placeholder background and text.
- Implement a sample home scene that draws a placeholder background and text.
- Pressing Enter on the title screen should switch to the overworld scene.
- Keep all code beginner-friendly and well-commented for students.
- Do not implement player movement, collision, camera, dialogue, home registry, transitions, or debug tools yet.

After creating the files:
1. Explain what each file does.
2. Tell me exactly what to test in the browser.
3. Tell me what phase I should ask you to build next.
```

---

# 28. Cursor Behavior Instructions

When Cursor modifies this project, it should:

1. Keep existing working features intact.
2. Explain any file it creates.
3. Explain any file it changes.
4. Avoid large rewrites unless necessary.
5. Keep functions short and readable.
6. Avoid hidden dependencies.
7. Avoid global complexity beyond what is necessary for a no-bundler classroom project.
8. Preserve the folder structure.
9. Ask before adding new libraries.
10. Provide browser testing steps after each phase.

---

# 29. Teacher Milestone Philosophy

Use this milestone order with students:

```text
Icon Complete
→ Home Complete
→ NPC Dialogue Complete
→ Platformer Graybox Complete
→ Gameplay Features Complete
→ Art/Audio Polish Complete
→ Playtesting and Revision Complete
```

Do not let students jump directly to complex platformers before their home icon and home scene work.

The engine should make early wins visible:

- Students see their home icon on the map.
- Students enter their home.
- Students add NPC dialogue.
- Students later connect their platformer.
- Students test, revise, and present.

This keeps scope manageable and supports a classroom studio workflow.

---

# 30. Final Note for Cursor

This project is an educational engine, not a commercial engine.

The best solution is not the most advanced solution.

The best solution is:

- stable
- readable
- modular
- easy to debug
- easy to teach
- easy for students to extend safely
