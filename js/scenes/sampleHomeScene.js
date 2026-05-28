// Small home room: world coordinates match screen (camera stays at 0,0).
function buildSampleHomeRoom() {
  const tileSize = 32;
  const width = 20;
  const height = 12;
  const ground = [];
  const collision = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const isBorder = x === 0 || y === 0 || x === width - 1 || y === height - 1;
      ground.push(isBorder ? 6 : 2);
      collision.push(isBorder ? 6 : 0);
    }
  }

  return {
    tileSize: tileSize,
    width: width,
    height: height,
    pixelWidth: width * tileSize,
    pixelHeight: height * tileSize,
    layers: { ground: ground, collision: collision },
    spawn: { x: 5 * tileSize + 2, y: 8 * tileSize + 2 }
  };
}

const sampleHomeScene = {
  name: "sampleHome",
  room: null,
  player: null,
  collisionObjects: [],
  interactables: [],
  currentInteractable: null,
  dialogue: {
    active: false,
    key: null,
    lineIndex: 0
  },

  create() {
    this.room = buildSampleHomeRoom();
    this.collisionObjects = buildCollisionFromMap(this.room);
    this.player = new Player(this.room.spawn.x, this.room.spawn.y);

    const tileSize = this.room.tileSize;
    this.interactables = [
      {
        type: INTERACTABLE_TYPES.NPC,
        id: "sample_npc",
        name: "Guide",
        dialogueKey: "sampleNpcIntro",
        x: 4 * tileSize,
        y: 2 * tileSize,
        width: 32,
        height: 32
      },
      {
        type: INTERACTABLE_TYPES.PORTAL,
        id: "sample_portal",
        name: "Platformer Portal",
        dialogueKey: "samplePortal",
        x: 14 * tileSize,
        y: 4 * tileSize,
        width: 48,
        height: 48
      },
      {
        type: INTERACTABLE_TYPES.EXIT,
        id: "home_exit",
        name: "Exit",
        x: 4 * tileSize,
        y: 9 * tileSize,
        width: 64,
        height: 32
      }
    ];

    gameState.currentScene = "sampleHome";
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

    if (
      interactable.type === INTERACTABLE_TYPES.NPC ||
      interactable.type === INTERACTABLE_TYPES.PORTAL ||
      interactable.type === INTERACTABLE_TYPES.SIGN
    ) {
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

    this.currentInteractable = findClosestInteractable(
      this.player,
      this.interactables
    );

    if (this.currentInteractable && input.isPressed("KeyE")) {
      this.handleInteract(this.currentInteractable);
    }
  },

  drawRoom(ctx) {
    const layer = this.room.layers.ground;
    const tileSize = this.room.tileSize;
    const offsetX = (canvas.width - this.room.pixelWidth) / 2;
    const offsetY = (canvas.height - this.room.pixelHeight) / 2;

    for (let y = 0; y < this.room.height; y++) {
      for (let x = 0; x < this.room.width; x++) {
        const tileId = layer[y * this.room.width + x];
        const color = getTileColor(tileId);
        if (!color) {
          continue;
        }
        ctx.fillStyle = color;
        ctx.fillRect(
          offsetX + x * tileSize,
          offsetY + y * tileSize,
          tileSize,
          tileSize
        );
      }
    }

    return { offsetX: offsetX, offsetY: offsetY };
  },

  drawInteractables(ctx, offsets) {
    for (let i = 0; i < this.interactables.length; i++) {
      const item = this.interactables[i];
      let color = "#cccccc";

      if (item.type === INTERACTABLE_TYPES.NPC) {
        color = "#f1c40f";
      } else if (item.type === INTERACTABLE_TYPES.PORTAL) {
        color = "#8e44ad";
      } else if (item.type === INTERACTABLE_TYPES.EXIT) {
        color = "#e74c3c";
      }

      ctx.fillStyle = color;
      ctx.fillRect(
        offsets.offsetX + item.x,
        offsets.offsetY + item.y,
        item.width,
        item.height
      );
    }
  },

  draw(ctx) {
    ctx.fillStyle = "#0d0d1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const offsets = this.drawRoom(ctx);
    this.drawInteractables(ctx, offsets);

    const drawPlayer = {
      x: offsets.offsetX + this.player.x,
      y: offsets.offsetY + this.player.y,
      width: this.player.width,
      height: this.player.height,
      facing: this.player.facing,
      state: this.player.state,
      draw: function (context) {
        context.fillStyle = "#3a7bd5";
        context.fillRect(this.x, this.y, this.width, this.height);

        context.fillStyle = "#cce5ff";
        const indicatorSize = 8;
        let indicatorX = this.x + (this.width - indicatorSize) / 2;
        let indicatorY = this.y + (this.height - indicatorSize) / 2;

        if (this.facing === "up") {
          indicatorY = this.y;
        } else if (this.facing === "down") {
          indicatorY = this.y + this.height - indicatorSize;
        } else if (this.facing === "left") {
          indicatorX = this.x;
        } else if (this.facing === "right") {
          indicatorX = this.x + this.width - indicatorSize;
        }

        context.fillRect(indicatorX, indicatorY, indicatorSize, indicatorSize);
      }
    };

    drawPlayer.draw(ctx);

    if (this.currentInteractable && !this.dialogue.active) {
      let promptText = "Press E to interact";

      if (this.currentInteractable.type === INTERACTABLE_TYPES.EXIT) {
        promptText = "Press E to exit to overworld";
      } else if (this.currentInteractable.type === INTERACTABLE_TYPES.NPC) {
        promptText = "Press E to talk to " + this.currentInteractable.name;
      } else if (this.currentInteractable.type === INTERACTABLE_TYPES.PORTAL) {
        promptText = "Press E to inspect portal";
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
        const rect = this.collisionObjects[i];
        drawCollisionBox(ctx, {
          x: offsets.offsetX + rect.x,
          y: offsets.offsetY + rect.y,
          width: rect.width,
          height: rect.height
        }, null);
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
