// Builds a playable home scene from student/teacher pack data.
function buildRoomFromConfig(homeConfig) {
  const tileSize = homeConfig.tileSize || 32;
  const width = homeConfig.width || 20;
  const height = homeConfig.height || 12;
  const ground = [];
  const collision = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const isBorder = x === 0 || y === 0 || x === width - 1 || y === height - 1;
      ground.push(isBorder ? 6 : 2);
      collision.push(isBorder ? 6 : 0);
    }
  }

  const spawnTile = homeConfig.spawnTile || { x: 5, y: 8 };

  return {
    tileSize: tileSize,
    width: width,
    height: height,
    pixelWidth: width * tileSize,
    pixelHeight: height * tileSize,
    layers: { ground: ground, collision: collision },
    spawn: {
      x: spawnTile.x * tileSize + 2,
      y: spawnTile.y * tileSize + 2
    }
  };
}

function buildInteractablesFromConfig(homeConfig, manifest) {
  const tileSize = homeConfig.tileSize || 32;
  const list = [];

  for (let i = 0; i < homeConfig.interactables.length; i++) {
    const item = homeConfig.interactables[i];
    const base = {
      id: item.id,
      name: item.name,
      x: item.tileX * tileSize,
      y: item.tileY * tileSize,
      width: item.width || 32,
      height: item.height || 32
    };

    if (item.type === "npc") {
      list.push({
        type: INTERACTABLE_TYPES.NPC,
        dialogueKey: item.dialogueKey,
        worldId: manifest.id,
        ...base
      });
    } else if (item.type === "portal") {
      list.push({
        type: INTERACTABLE_TYPES.PORTAL,
        platformerLevelId: item.platformerLevelId || manifest.platformerLevelId,
        rewardId: manifest.rewardId,
        worldId: manifest.id,
        ...base
      });
    } else if (item.type === "exit") {
      list.push({
        type: INTERACTABLE_TYPES.EXIT,
        ...base
      });
    } else if (item.type === "savePoint") {
      list.push({
        type: INTERACTABLE_TYPES.SAVE_POINT,
        worldId: manifest.id,
        ...base
      });
    } else if (item.type === "submitPoint") {
      list.push({
        type: INTERACTABLE_TYPES.SUBMIT_POINT,
        worldId: manifest.id,
        submissionType: item.submissionType || "full",
        ...base
      });
    }
  }

  return list;
}

function createHomeScene(pack) {
  const manifest = pack.manifest;
  const sceneName = "home_" + manifest.id;

  return {
    name: sceneName,
    pack: pack,
    room: null,
    player: null,
    collisionObjects: [],
    interactables: [],
    roomOffset: { x: 0, y: 0 },
    currentInteractable: null,
    dialogue: { active: false, key: null, lineIndex: 0 },
    lastSaveMessage: "",

    create() {
      this.room = buildRoomFromConfig(pack.home);
      this.collisionObjects = buildCollisionFromMap(this.room);
      this.player = new Player(this.room.spawn.x, this.room.spawn.y);
      this.interactables = buildInteractablesFromConfig(pack.home, manifest);
      this.roomOffset.x = (canvas.width - this.room.pixelWidth) / 2;
      this.roomOffset.y = (canvas.height - this.room.pixelHeight) / 2;
      this.lastSaveMessage = "";
      gameState.currentScene = sceneName;
    },

    openDialogue(dialogueKey) {
      this.dialogue.active = true;
      this.dialogue.key = dialogueKey;
      this.dialogue.lineIndex = 0;
    },

    closeDialogue() {
      this.dialogue.active = false;
      this.dialogue.key = null;
      this.dialogue.lineIndex = 0;
    },

    updateDialogue() {
      const data = dialogueData[this.dialogue.key];
      if (!data) {
        this.closeDialogue();
        return;
      }
      if (input.isPressed("Escape")) {
        this.closeDialogue();
        return;
      }
      if (input.isPressed("Enter") || input.isPressed("KeyE")) {
        this.dialogue.lineIndex += 1;
        if (this.dialogue.lineIndex >= data.lines.length) {
          this.closeDialogue();
        }
      }
    },

    handleInteract(interactable) {
      if (interactable.type === INTERACTABLE_TYPES.EXIT) {
        sceneManager.changeScene("overworld");
        return;
      }
      if (interactable.type === INTERACTABLE_TYPES.PORTAL) {
        if (interactable.platformerLevelId && getPlatformerLevel(interactable.platformerLevelId)) {
          platformerScene.pendingRewardId = interactable.rewardId || manifest.rewardId;
          platformerScene.pendingLevelId = interactable.platformerLevelId;
          platformerScene.returnScene = sceneName;
          sceneManager.changeScene("platformer");
        } else if (interactable.dialogueKey) {
          this.openDialogue(interactable.dialogueKey);
        } else {
          this.openDialogue("samplePortal");
        }
        return;
      }
      if (interactable.type === INTERACTABLE_TYPES.SAVE_POINT) {
        saveGameProgress();
        this.lastSaveMessage = "Game saved!";
        if (typeof logEvent === "function") {
          logEvent("save", interactable.worldId || manifest.id, {});
        }
        return;
      }
      if (interactable.type === INTERACTABLE_TYPES.SUBMIT_POINT) {
        if (typeof submitWorldForReview === "function") {
          submitWorldForReview(manifest, "full");
          this.lastSaveMessage = "Submitted for teacher review!";
        } else {
          this.lastSaveMessage = "Submit (connect Supabase to sync)";
        }
        return;
      }
      if (interactable.type === INTERACTABLE_TYPES.NPC && interactable.dialogueKey) {
        this.openDialogue(interactable.dialogueKey);
      }
    },

    update() {
      if (isTransitionBlockingInput()) {
        return;
      }
      if (this.dialogue.active) {
        this.updateDialogue();
        return;
      }
      this.player.updateTopDown(this.collisionObjects, false);
      this.currentInteractable = findClosestInteractable(this.player, this.interactables);
      if (this.currentInteractable && input.isPressed("KeyE")) {
        this.handleInteract(this.currentInteractable);
      }
      if (this.lastSaveMessage) {
        this._saveMsgTimer = (this._saveMsgTimer || 0) + 1;
        if (this._saveMsgTimer > 120) {
          this.lastSaveMessage = "";
          this._saveMsgTimer = 0;
        }
      }
    },

    draw(ctx) {
      ctx.fillStyle = "#0d0d1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const ox = this.roomOffset.x;
      const oy = this.roomOffset.y;
      const layer = this.room.layers.ground;
      const tileSize = this.room.tileSize;

      for (let y = 0; y < this.room.height; y++) {
        for (let x = 0; x < this.room.width; x++) {
          const tileId = layer[y * this.room.width + x];
          const color = getTileColor(tileId);
          if (!color) continue;
          ctx.fillStyle = color;
          ctx.fillRect(ox + x * tileSize, oy + y * tileSize, tileSize, tileSize);
        }
      }

      for (let i = 0; i < this.interactables.length; i++) {
        const item = this.interactables[i];
        let color = "#cccccc";
        if (item.type === INTERACTABLE_TYPES.NPC) color = "#f1c40f";
        else if (item.type === INTERACTABLE_TYPES.PORTAL) color = "#8e44ad";
        else if (item.type === INTERACTABLE_TYPES.EXIT) color = "#e74c3c";
        else if (item.type === INTERACTABLE_TYPES.SAVE_POINT) color = "#2ecc71";
        else if (item.type === INTERACTABLE_TYPES.SUBMIT_POINT) color = "#1abc9c";
        ctx.fillStyle = color;
        ctx.fillRect(ox + item.x, oy + item.y, item.width, item.height);
      }

      const px = ox + this.player.x;
      const py = oy + this.player.y;
      ctx.fillStyle = "#3a7bd5";
      ctx.fillRect(px, py, this.player.width, this.player.height);

      if (this.currentInteractable && !this.dialogue.active) {
        let prompt = "Press E to interact";
        const t = this.currentInteractable.type;
        if (t === INTERACTABLE_TYPES.EXIT) prompt = "Press E to exit to overworld";
        else if (t === INTERACTABLE_TYPES.NPC) prompt = "Press E to talk to " + this.currentInteractable.name;
        else if (t === INTERACTABLE_TYPES.PORTAL) prompt = "Press E to enter platformer";
        else if (t === INTERACTABLE_TYPES.SAVE_POINT) prompt = "Press E to save game";
        else if (t === INTERACTABLE_TYPES.SUBMIT_POINT) prompt = "Press E to submit for review";
        drawInteractionPrompt(ctx, prompt);
      }

      if (this.lastSaveMessage) {
        drawInteractionPrompt(ctx, this.lastSaveMessage);
      }

      if (this.dialogue.active) {
        const data = dialogueData[this.dialogue.key];
        if (data) {
          drawDialogueBox(ctx, data.speaker, data.lines[this.dialogue.lineIndex]);
        }
      }

      drawDebugOverlay(ctx, {
        sceneName: this.name,
        playerX: this.player.x,
        playerY: this.player.y,
        cameraX: 0,
        cameraY: 0,
        collisionCount: this.collisionObjects.length,
        homeCount: homeRegistry.length
      });
    },

    exit() {}
  };
}

const generatedHomeScenes = {};

function registerStudentHomeScenes() {
  for (let i = 0; i < studentManifests.length; i++) {
    const pack = studentManifests[i];
    const scene = createHomeScene(pack);
    generatedHomeScenes[scene.name] = scene;
    sceneManager.register(scene);
  }
}

function getHomeSceneNameForManifest(manifestId) {
  return "home_" + manifestId;
}
