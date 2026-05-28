# Single-Player 2D Multiverse Platformer Strategy Document — Version 1

## Project Title
**Class 2D Multiverse Platformer Hub**

## Version
**Version 1 — Single-Player 2D HTML5 Canvas First, Phaser-Ready Architecture**

## Purpose
This document defines the coding and production strategy for building a **single-player 2D** shared class game system where each student creates a personal platformer world connected through one central 2D overworld hub.

This is **not a live multiplayer game**. The “multiverse” means the player can visit many student-created worlds from one connected hub. Each student’s world exists as a module inside the same browser-based game.

The entire game will use 2D presentation:
- **Overworld:** 2D top-down JRPG-style map
- **Home areas:** 2D top-down JRPG-style interiors or small themed zones
- **Platformer levels:** 2D side-view platformer stages

The overworld and home areas should visually reference the structure and readability of NES/SNES-era JRPGs such as **Dragon Warrior/Dragon Quest, early Final Fantasy, and Chrono Trigger**. These references are for design inspiration only. Students should create original assets, layouts, and world designs.

The goal is to begin with plain HTML5, CSS, JavaScript, and Canvas so students understand the core systems underneath a game engine. The structure will intentionally use patterns that transfer smoothly into Phaser later.

## Version 1 Multiplayer Decision

Version 1 will be **single-player only**.

Real multiplayer is intentionally out of scope because it would require server-side systems such as:
- hosting
- player synchronization
- real-time networking
- shared state management
- online testing
- connection handling
- security and moderation considerations

Instead, Version 1 will create a **class showcase world** where the player can visit classmates’ homes, enter their platformer levels, earn rewards, and see progress across the class multiverse.

## Version 1 Visual Direction Decision

Version 1 will be **fully 2D**.

The previous 2.5D/isometric idea is removed from the main plan to make the project more manageable for 100+ students. A fully 2D approach reduces complexity in:
- movement
- collision
- map design
- asset creation
- student onboarding
- debugging
- Phaser migration

---

# 1. Big Picture Vision

The class project will function like a small **single-player 2D multiverse game**.

The player enters a shared 2D top-down overworld hub. Each student has a personal “home” space connected to the overworld. That home contains a portal, doorway, object, NPC, or interaction point that launches the student’s 2D side-view platformer level.

When the player completes a student platformer, they return to the hub and unlock a reward, bonus, skill, key, or upgrade.

## Core Flow

```text
Start Screen
   ↓
Shared Multiverse Hub
   ↓
Student Home / Portal
   ↓
Student Platformer Level
   ↓
Completion Reward
   ↓
Return to Hub
   ↓
New skill opens more access
```

## Design Goal
The project should feel like one connected single-player class showcase, not a folder of unrelated games.

The player should feel like they are traveling through a student-made 2D RPG-style world, even though only one player is active in the browser at a time.

## Teaching Goal
Students should learn:
- game loops
- top-down movement
- side-view platformer movement
- collision detection
- platformer physics
- scene/state management
- modular coding
- scope control
- playtesting
- debugging
- asset organization
- production workflows
- how game engines like Phaser organize projects

---

# 2. Guiding Principles

## Principle 1 — Build the Engine Before the Worlds
The teacher/class should first build a shared framework:
- canvas setup
- scene manager
- player controller
- collision system
- game state
- asset loader
- world registry

Students should not each create totally separate code structures.

## Principle 2 — Students Design Content, Not the Whole Engine
Each student should customize:
- visual theme
- level layout
- platform placement
- collectibles
- hazards
- story intro
- reward
- challenge pattern

The shared system should handle:
- loading scenes
- switching between hub and levels
- storing progress
- player controls
- collision basics
- rewards
- UI/HUD

## Principle 3 — HTML5 First, Phaser Language Early
Even while coding in Canvas, use terms that will later transfer to Phaser:
- scene
- preload
- create
- update
- sprite
- player
- world
- camera
- physics
- collision
- tile
- state

## Principle 4 — Small Finished Game Over Huge Unfinished Game
Each student world should be small enough to complete, test, revise, and present.

Recommended first platformer size:
- 1 short level
- 1 main mechanic
- 1 win condition
- 1 reward
- 3–5 hazards or challenges
- 5–10 collectibles or objectives

---

# 3. Recommended Project Folder Structure

```text
MultiverseGame/
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
│   │   ├── physics.js
│   │   ├── assetLoader.js
│   │   ├── gameState.js
│   │   └── ui.js
│   │
│   ├── entities/
│   │   ├── player.js
│   │   ├── platform.js
│   │   ├── collectible.js
│   │   ├── hazard.js
│   │   ├── portal.js
│   │   └── npc.js
│   │
│   ├── scenes/
│   │   ├── startScene.js
│   │   ├── hubScene.js
│   │   ├── homeSceneTemplate.js
│   │   ├── platformerSceneTemplate.js
│   │   └── studentWorlds/
│   │       ├── alexWorld.js
│   │       ├── jordanWorld.js
│   │       └── sampleWorld.js
│   │
│   └── data/
│       ├── studentWorldRegistry.js
│       ├── rewards.js
│       └── hubMap.js
│
├── assets/
│   ├── shared/
│   │   ├── player/
│   │   ├── ui/
│   │   ├── tiles/
│   │   ├── audio/
│   │   └── backgrounds/
│   │
│   └── students/
│       ├── alex/
│       ├── jordan/
│       └── sample/
│
├── docs/
│   ├── planning/
│   ├── bug_logs/
│   ├── sprint_logs/
│   └── reflections/
│
└── backups/
```

---

# 4. Core Technical Architecture

## 4.1 Main Game Loop

Version 1 uses one browser, one canvas, one active player, and one active scene at a time.

The Canvas version should use one master loop.

```js
function gameLoop(timestamp) {
  update(timestamp);
  draw();
  requestAnimationFrame(gameLoop);
}
```

The master loop should not contain all game logic. It should delegate to the active scene.

```js
function update(timestamp) {
  sceneManager.currentScene.update(timestamp);
}

function draw() {
  sceneManager.currentScene.draw(ctx);
}
```

## Phaser Connection
This maps directly to Phaser’s `update()` method inside each Scene.

---

# 5. Scene System

## Why Scenes Matter
Scenes allow the game to move between different modes:
- start screen
- hub
- student home
- platformer level
- game over
- reward screen
- credits/showcase

## Canvas Scene Pattern
Each scene should follow the same structure:

```js
const sampleScene = {
  name: "sampleScene",

  preload() {
    // optional asset loading
  },

  create() {
    // runs when scene begins
  },

  update(deltaTime) {
    // game logic
  },

  draw(ctx) {
    // rendering
  },

  exit() {
    // cleanup before leaving scene
  }
};
```

## Required Scene Types

### 1. Start Scene
Purpose:
- title screen
- instructions
- begin game

### 2. Hub Scene
Purpose:
- shared multiverse overworld
- access to homes/portals
- display unlocked skills
- track completed worlds

### 3. Home Scene
Purpose:
- student identity space
- NPC/sign introduction
- portal into student platformer

### 4. Platformer Scene
Purpose:
- student’s main playable level
- includes movement, jumping, platforms, hazards, collectibles, win condition

### 5. Reward Scene
Purpose:
- show what skill/bonus was earned
- return to hub

---

# 6. Game State System

Game state stores progress across scenes.

## Example Game State

```js
const gameState = {
  currentScene: "hub",
  completedWorlds: [],
  unlockedRewards: [],
  playerStats: {
    coins: 0,
    lives: 3,
    health: 100
  },
  hubPosition: {
    x: 400,
    y: 300
  }
};
```

## What Game State Should Track
- completed student worlds
- unlocked skills
- player hub position
- total collectibles
- badges/achievements
- current active world
- optional class showcase progress

## Save System — Later Version
Version 1 can store progress only while the page is open.

Version 2 can use `localStorage`:

```js
localStorage.setItem("multiverseSave", JSON.stringify(gameState));
```

---

# 7. Student World Registry

The registry is the master list of student worlds.

## Purpose
The hub should not manually hard-code every student portal. Instead, it should read from a data file.

## Example Registry

```js
const studentWorldRegistry = [
  {
    id: "alexWorld",
    owner: "Alex",
    title: "Sky Ruins",
    homeTheme: "floating island",
    portalPosition: { x: 250, y: 180 },
    rewardId: "doubleJump",
    scene: alexWorldScene
  },
  {
    id: "jordanWorld",
    owner: "Jordan",
    title: "Neon Subway",
    homeTheme: "cyberpunk station",
    portalPosition: { x: 520, y: 240 },
    rewardId: "dash",
    scene: jordanWorldScene
  }
];
```

## Student Responsibility
Each student submits:
- world ID
- title
- theme
- platformer scene file
- reward idea
- level layout
- asset folder
- short intro text

---

# 8. 2D JRPG-Style Overworld Strategy

## Important Clarification
The overworld will be fully 2D, not isometric and not 3D.

The map should use a top-down JRPG-style layout inspired by NES/SNES-era RPG readability:
- tile-based paths
- towns or houses
- forests
- mountains
- water
- roads
- signs
- gates
- NPCs
- portals

## Why This Is Better for 100+ Students
A fully 2D overworld is easier to scale because:
- movement uses simple x/y coordinates
- collisions use rectangles or tiles
- maps can be built from reusable tiles
- student homes can follow one template
- debugging is easier
- asset expectations are clearer
- Phaser migration is more direct

## Recommended Overworld Style
Use a readable 16-bit-inspired style:
- square tiles
- simple color-coded areas
- clear paths
- small homes or portals
- readable signs
- limited animation
- consistent scale

## Overworld Design Rules
The overworld should be a navigation map, not a full RPG.

The overworld should include:
- player movement in four directions
- collision with buildings, trees, water, and walls
- student home entrances
- signs or labels
- visible progress markers
- reward-gated paths if desired

The overworld should not include in Version 1:
- random battles
- complex NPC dialogue trees
- inventory systems
- large quests
- multiplayer
- large scrolling world maps unless needed

## Map Strategy
For 100+ students, use one of these structures:

### Option A — District Map
Divide the overworld into districts.

Example:
```text
North District: Student Homes 1–25
East District: Student Homes 26–50
South District: Student Homes 51–75
West District: Student Homes 76–100+
```

### Option B — Multiple Connected Maps
Use several smaller maps instead of one huge overworld.

Example:
```text
Main Plaza
  ↓
Arcade District
  ↓
Forest District
  ↓
Space District
  ↓
Castle District
```

### Recommendation for Version 1
Use **Option B: multiple connected 2D maps**.

This avoids one giant cluttered map and makes it easier to assign groups of students to themed zones.

## Overworld Features for Version 1
- player can move around
- student homes are visible
- each home has a door, portal, or sign
- pressing a key enters the home
- completed worlds display a badge/checkmark
- locked paths may require rewards later

---

# 9. Student Home Design

Each student home should be a small 2D top-down JRPG-style identity space.

## Required Home Elements
- student name or studio name
- game title
- visual theme
- doorway, portal, console, shrine, or object that launches the platformer
- short NPC or sign text
- reward preview

## Example Home Data

```js
const alexHome = {
  owner: "Alex",
  title: "Sky Ruins",
  description: "A floating platformer about restoring broken islands.",
  portalText: "Enter Sky Ruins",
  rewardPreview: "Reward: Double Jump"
};
```

## Home Scope Rule
The home should not become a second full game.

Recommended home size:
- 1 small top-down room or outdoor area
- 1 entrance/exit back to the overworld
- 1 platformer launch object
- 1 sign or NPC
- 1 visual theme
- no combat
- no complex mechanics
- no large quest system

---

# 10. Platformer Level Template

Each student platformer should begin from the same base template.

## Required Platformer Features
- player movement
- jump
- gravity
- platforms
- collision
- hazard or enemy
- collectible or objective
- win condition
- fail condition
- restart
- return to hub
- reward unlock

## Platformer Scene Structure

```js
const sampleWorldScene = {
  name: "sampleWorld",

  create() {
    this.player = new Player(50, 300);
    this.platforms = [];
    this.collectibles = [];
    this.hazards = [];
    this.goal = { x: 700, y: 250, width: 40, height: 80 };
  },

  update(deltaTime) {
    this.player.update(input, deltaTime);
    applyGravity(this.player);
    handlePlatformCollisions(this.player, this.platforms);
    checkCollectibles(this.player, this.collectibles);
    checkHazards(this.player, this.hazards);
    checkGoal(this.player, this.goal, "sampleReward");
  },

  draw(ctx) {
    drawBackground(ctx);
    this.platforms.forEach(platform => platform.draw(ctx));
    this.collectibles.forEach(item => item.draw(ctx));
    this.hazards.forEach(hazard => hazard.draw(ctx));
    drawGoal(ctx, this.goal);
    this.player.draw(ctx);
    drawHUD(ctx);
  }
};
```

---

# 11. Reward and Skill System

Completing a student platformer should unlock a reward.

## Reward Design Rule
Rewards should enhance the hub or future levels without breaking the entire game.

## Safe Reward Types

| Reward | Use |
|---|---|
| Double Jump | Access higher hub areas |
| Dash | Cross gaps or move faster |
| Key | Open a themed gate |
| Lantern | Reveal hidden portals |
| Shield | Survive one hazard |
| Glide | Float across gaps |
| Bridge Token | Build a bridge in hub |
| Color Lens | Reveal invisible paths |

## Reward Data Example

```js
const rewards = {
  doubleJump: {
    name: "Double Jump",
    description: "Press jump again while in the air.",
    appliesTo: "playerMovement",
    activeInHub: true
  },

  dash: {
    name: "Dash",
    description: "Press Shift to dash forward.",
    appliesTo: "playerMovement",
    activeInHub: true
  }
};
```

## Unlock Function

```js
function unlockReward(worldId, rewardId) {
  if (!gameState.completedWorlds.includes(worldId)) {
    gameState.completedWorlds.push(worldId);
  }

  if (!gameState.unlockedRewards.includes(rewardId)) {
    gameState.unlockedRewards.push(rewardId);
  }
}
```

---

# 12. Player Controller Strategy

The project uses two main player movement styles:

1. **Top-down movement** for the overworld and homes
2. **Side-view platformer movement** for student levels

The same input manager can support both, but the movement logic should be separated.

## Overworld/Home Player
The overworld and home player uses top-down movement:
- up
- down
- left
- right
- interact

## Platformer Player
The platformer player uses side-view movement:
- left
- right
- jump
- optional unlocked ability

## Shared Player Properties

```js
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.vx = 0;
    this.vy = 0;
    this.speed = 3;
    this.jumpPower = -12;
    this.onGround = false;
    this.facing = "down";
  }
}
```

For top-down maps, the player can be 32x32 pixels to match tile size. For platformers, the same class can be extended or configured to use a taller collision box if desired.

## Ability Checks

```js
function hasReward(rewardId) {
  return gameState.unlockedRewards.includes(rewardId);
}
```

Example:

```js
if (hasReward("doubleJump")) {
  // allow double jump behavior
}
```

---

# 13. Collision Strategy

Version 1 should use rectangle collision.

## Why Rectangle Collision
- beginner friendly
- easy to debug visually
- works with platforms, portals, collectibles, and hazards
- transfers well to Phaser Arcade Physics concepts

## Collision Function

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

## Debug Mode
Create a debug mode that draws hitboxes.

```js
const DEBUG = true;

function drawHitbox(ctx, obj) {
  if (!DEBUG) return;
  ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
}
```

---

# 14. Asset Strategy

## Visual Style Direction

Version 1 should use a consistent 2D tile-based style.

Recommended visual scale:
- 16x16 or 32x32 tiles
- 32x32 top-down player sprite
- simple platformer tiles
- limited animation frames
- clear silhouettes

The overworld and homes should feel like classic 8-bit/16-bit JRPG maps. The platformers can be side-view but should still use simple, readable 2D assets.

## Shared Assets
Shared assets should include:
- default top-down player sprite
- default platformer player sprite
- overworld tiles
- home/interior tiles
- platform tiles
- default portal/door
- default UI panels
- placeholder sounds
- generic backgrounds

## Student Assets
Each student gets a folder:

```text
assets/students/alex/
  home_tiles.png
  home_object.png
  platformer_player.png
  background.png
  platform.png
  collectible.png
  hazard.png
  portal.png
  music.mp3
```

## Asset Rules
- file names should be lowercase
- avoid spaces in filenames
- use PNG for sprites
- use JPG or PNG for backgrounds
- use MP3 or WAV for audio
- keep file sizes reasonable
- maintain consistent visual style

---

# 15. UI and HUD Strategy

## Hub UI
The hub should show:
- player location or current area name
- completed worlds
- unlocked rewards
- interaction prompt

Example:
```text
Press E to enter Maya's Crystal Cavern
Rewards: Double Jump, Lantern
Worlds Complete: 3 / 18
```

## Platformer HUD
Each student world should show:
- title
- lives or health
- score/collectibles
- objective
- restart instruction

Example:
```text
Crystal Cavern
Gems: 4 / 8
Lives: 3
Goal: Reach the portal
```

---

# 16. Development Phases

## Phase 1 — Shared Canvas Foundation
Build:
- canvas setup
- main loop
- scene manager
- input manager
- rectangle collision
- simple player
- start scene

Success Criteria:
- page loads
- player appears
- active scene updates/draws
- keyboard input works

## Phase 2 — 2D Overworld Prototype
Build:
- tile-based 2D overworld map
- top-down player movement
- simple wall/building/tree/water collision
- 3 sample student homes
- door/portal interaction
- registry-driven home loading

Success Criteria:
- player can walk around the overworld
- player can enter a sample home
- player can return to the overworld

## Phase 3 — 2D Home Template
Build:
- small top-down home scene
- entrance/exit back to overworld
- sign or NPC text
- platformer launch object
- reward preview

Success Criteria:
- player can enter a home from the overworld
- player can read basic text
- player can launch a platformer from the home
- player can return to the overworld

## Phase 4 — Platformer Template
Build:
- side-view movement
- gravity
- jump
- platforms
- hazards
- collectibles
- goal
- restart

Success Criteria:
- sample platformer can be completed
- reward unlocks
- player returns to hub

## Phase 5 — Student World Production
Students customize:
- title
- theme
- level layout
- assets
- hazards
- collectibles
- reward

Success Criteria:
- each student level launches from registry
- each level can be completed
- each reward unlocks correctly

## Phase 6 — Polish and QA
Add:
- UI/HUD improvements
- sound effects
- simple animation
- bug logs
- playtesting
- balance revisions

Success Criteria:
- games are playable by others
- major bugs are documented and fixed
- students can explain design decisions

## Phase 7 — Phaser Migration
Rebuild structure using Phaser:
- Canvas scenes become Phaser Scenes
- draw functions become Phaser game objects
- rectangle collisions become Arcade Physics
- manual asset loading becomes Phaser preload
- world registry remains mostly the same conceptually

Success Criteria:
- hub loads as Phaser Scene
- one sample student world loads as Phaser Scene
- reward system transfers

---

# 17. HTML5 to Phaser Mapping

| HTML5 Canvas Version | Phaser Version |
|---|---|
| `index.html` canvas element | Phaser injects game canvas |
| `gameLoop()` | Phaser internal loop |
| `update()` function | Scene `update()` |
| `draw(ctx)` | `this.add.image`, `this.add.sprite`, tilemaps |
| manual keyboard events | `this.input.keyboard` |
| rectangle collision function | Arcade Physics collider/overlap |
| top-down overworld map | Phaser Tilemap or grid-based scene |
| home scene | Phaser Scene |
| platformer scene | Phaser Scene with Arcade Physics |
| arrays of objects | Phaser Groups |
| current scene variable | Phaser Scene Manager |
| custom asset loader | Scene `preload()` |
| global gameState | shared registry/data object |

---

# 18. Student Deliverables

Each student should submit:
- platformer world file
- home/world data entry
- asset folder
- short Game Design Document
- reward description
- bug log
- playtest feedback
- reflection

## Student GDD Mini Template

```text
Student Name:
World Title:
Genre:
Theme:
Target Player Experience:
Core Mechanic:
Objective:
Win Condition:
Lose Condition:
Reward Earned:
Assets Needed:
Known Bugs:
What changed after playtesting?
```

---

# 19. Teacher Deliverables

The teacher/class framework should include:
- working starter project
- sample world
- sample home
- documentation
- student template
- registry example
- coding checkpoints
- rubric
- debugging guide

---

# 20. Suggested Classroom Checkpoints

## Checkpoint 1 — Canvas Loads
Students can explain:
- what HTML does
- what CSS does
- what JavaScript does
- what Canvas does

## Checkpoint 2 — Scene Switching
Students can move from start screen to hub.

## Checkpoint 3 — Hub Portal
Students can enter a sample world from a portal.

## Checkpoint 4 — Platformer Movement
Students can move and jump.

## Checkpoint 5 — Collision
Students can land on platforms and collide with objects.

## Checkpoint 6 — Win/Loss
Student world has a complete objective.

## Checkpoint 7 — Reward Unlock
Completing the world adds a reward to game state.

## Checkpoint 8 — Return to Hub
The world returns the player to the hub after completion.

## Checkpoint 9 — Playtest and Revise
Students document at least three fixes or improvements.

## Checkpoint 10 — Portfolio Artifact
Students submit screenshots, code snippets, reflection, and playable build.

---

# 21. Scope Control Rules

## Multiplayer Scope Decision

Version 1 will not include:
- real-time multiplayer
- online player accounts
- shared online saves
- live chat
- player-versus-player systems
- networked co-op
- server-hosted world state

The game may still include multiplayer-inspired design elements such as:
- classmate NPCs
- student avatars
- portal homes
- leaderboards stored locally
- badges
- showcase galleries
- simulated visitors

These features create the feeling of a class multiverse without requiring a server.

## Allowed in Version 1
- one 2D overworld or several connected 2D overworld districts
- one small 2D home per student
- one 2D platformer level per student
- one reward per student
- rectangle collision
- simple sprites
- basic sound
- basic UI

## Not Recommended in Version 1
- multiplayer
- online accounts
- complex save systems
- giant single-map overworlds
- overly detailed home interiors
- advanced enemy AI
- full RPG inventory
- true 3D
- physics puzzles with many moving parts
- unlimited custom controls per student

---

# 22. Risks and Solutions

## Risk: Every student builds incompatible code
Solution:
Use one template and one registry format.

## Risk: Students overscope
Solution:
Limit each platformer to one short level and one main mechanic.

## Risk: Overworld becomes too complex
Solution:
Keep the overworld as a navigation space, not a full RPG. Use small districts instead of one giant map.

## Risk: Rewards break later worlds
Solution:
Make rewards mostly affect the hub first.

## Risk: Students focus on art before gameplay
Solution:
Require gray-box level completion before final assets.

## Risk: Phaser transition feels like starting over
Solution:
Use Phaser vocabulary, scene structure, sprites, tile concepts, and update loops from the Canvas version.

---

# 23. Version 1 Definition of Done

Version 1 is successful when:
- the shared 2D overworld loads
- at least one sample home exists
- at least one sample platformer level exists
- player can enter the platformer from the hub
- player can complete the level
- reward unlocks
- player returns to hub
- the structure supports adding more student worlds
- the code uses scene/update/draw patterns that can later become Phaser Scenes

---

# 24. Recommended First Build Target

Do not start by building every student home.

Start with one complete vertical slice:

```text
Start Screen
   ↓
2D Overworld
   ↓
Sample Home
   ↓
Sample Platformer
   ↓
Reward Unlock
   ↓
Return to Hub
```

Once that works, duplicate the pattern for students.

---

# 25. Final Version 1 Strategy Statement

The class should build a **single-player 2D** HTML5 Canvas multiverse framework that teaches students the core systems behind games while preparing them for Phaser. The project should use modular scenes, a student world registry, shared player and collision systems, simple tile-based overworld/home design, and reward-based progression. Students should customize platformer worlds inside a controlled template so the final product feels like one connected class showcase game instead of many disconnected projects.

The project should not attempt real multiplayer in Version 1. The multiverse should feel social through student homes, NPCs, portals, rewards, and showcase design, while remaining technically simple enough to run as a browser-based single-player game.

The long-term goal is not just to make a game. The long-term goal is to help students understand how game systems are organized, tested, revised, and eventually moved into a professional-style framework like Phaser.

