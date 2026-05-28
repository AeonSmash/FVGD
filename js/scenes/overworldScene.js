const overworldScene = {
  name: "overworld",
  player: null,
  camera: null,
  collisionObjects: [],
  interactables: [],
  currentInteractable: null,
  dialogue: {
    active: false,
    key: null,
    lineIndex: 0
  },

  create() {
    refreshHomeRegistry();
    validateHomeRegistry(homeRegistry);

    this.collisionObjects = buildCollisionFromMap(overworldMap);
    this.interactables = buildHomeInteractables(homeRegistry);

    const spawn = gameState.overworldPlayerPosition;
    this.player = new Player(spawn.x, spawn.y);

    const worldWidth = overworldMap.width * overworldMap.tileSize;
    const worldHeight = overworldMap.height * overworldMap.tileSize;
    this.camera = new Camera(canvas.width, canvas.height, worldWidth, worldHeight);

    gameState.currentScene = "overworld";
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
    if (interactable.type === INTERACTABLE_TYPES.HOME_ENTRANCE) {
      if (interactable.locked) {
        this.openDialogue("lockedHome");
        return;
      }

      gameState.overworldPlayerPosition = {
        x: this.player.x,
        y: this.player.y
      };
      markHomeVisited(interactable.id);
      sceneManager.changeScene(interactable.homeScene);
      return;
    }

    if (interactable.type === INTERACTABLE_TYPES.SIGN) {
      this.openDialogue(interactable.dialogueKey);
      return;
    }

    if (interactable.type === INTERACTABLE_TYPES.COLORED_DOOR) {
      if (hasReward(interactable.requires)) {
        this.openDialogue("doorUnlocked");
      } else {
        this.openDialogue(interactable.dialogueKeyLocked || "doorLocked");
      }
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
    this.camera.follow(this.player);

    this.currentInteractable = findClosestInteractable(
      this.player,
      this.interactables
    );

    if (this.currentInteractable && input.isPressed("KeyE")) {
      this.handleInteract(this.currentInteractable);
    }
  },

  draw(ctx) {
    drawTilemapLayer(ctx, overworldMap, this.camera);
    drawHomeIcons(ctx, homeRegistry, this.camera);
    this.drawColoredDoors(ctx);
    this.player.draw(ctx, this.camera);
    drawRewardsBar(ctx);

    if (this.currentInteractable && !this.dialogue.active) {
      let promptText = "Press E to interact";

      if (this.currentInteractable.type === INTERACTABLE_TYPES.HOME_ENTRANCE) {
        if (this.currentInteractable.locked) {
          promptText = "Press E to read notice (home locked)";
        } else {
          promptText = "Press E to enter " + this.currentInteractable.name;
        }
      } else if (this.currentInteractable.type === INTERACTABLE_TYPES.SIGN) {
        promptText = "Press E to read sign";
      } else if (this.currentInteractable.type === INTERACTABLE_TYPES.COLORED_DOOR) {
        promptText = "Press E to try door";
      }

      drawInteractionPrompt(ctx, promptText);
    }

    if (this.dialogue.active) {
      const data = dialogueData[this.dialogue.key];
      if (data) {
        drawDialogueBox(ctx, data.speaker, data.lines[this.dialogue.lineIndex]);
      }
    }

    if (gameState.settings.showCollision) {
      for (let i = 0; i < this.collisionObjects.length; i++) {
        drawCollisionBox(ctx, this.collisionObjects[i], this.camera);
      }
    }

    drawDebugOverlay(ctx, {
      sceneName: this.name,
      playerX: this.player.x,
      playerY: this.player.y,
      cameraX: this.camera.x,
      cameraY: this.camera.y,
      collisionCount: this.collisionObjects.length,
      homeCount: homeRegistry.length
    });
  },

  drawColoredDoors(ctx) {
    if (typeof overworldDoors === "undefined") return;
    const camX = this.camera.x;
    const camY = this.camera.y;
    for (let i = 0; i < overworldDoors.length; i++) {
      const door = overworldDoors[i];
      const reward = rewardRegistry[door.requires];
      const color = reward && reward.color ? reward.color : "#888";
      ctx.fillStyle = color;
      ctx.fillRect(door.x - camX, door.y - camY, door.width, door.height);
      if (!hasReward(door.requires)) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(door.x - camX, door.y - camY, door.width, door.height);
      }
    }
  },

  exit() {}
};
