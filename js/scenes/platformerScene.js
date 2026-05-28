const platformerScene = {
  name: "platformer",
  level: null,
  player: null,
  pendingLevelId: null,
  pendingRewardId: null,
  returnScene: "overworld",
  completed: false,

  create() {
    const levelId = this.pendingLevelId || "sample_platformer";
    this.level = getPlatformerLevel(levelId);
    if (!this.level) {
      console.warn("Missing platformer level:", levelId);
      sceneManager.changeSceneImmediate("overworld");
      return;
    }
    this.player = new Player(this.level.spawn.x, this.level.spawn.y);
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.onGround = false;
    this.player.jumpCount = 0;
    this.completed = false;
    gameState.currentScene = "platformer";
    if (typeof logEvent === "function") {
      logEvent("started_platformer", levelId, {});
    }
  },

  update() {
    if (isTransitionBlockingInput()) return;
    this.player.updatePlatformer(this.level);
    const goal = this.level.goal;
    if (
      !this.completed &&
      isColliding(this.player, goal)
    ) {
      this.completed = true;
      markLevelCompleted(this.level.id);
      const rewardId = this.pendingRewardId || this.level.rewardId;
      if (rewardId) {
        unlockReward(rewardId);
      }
      if (typeof logEvent === "function") {
        logEvent("completed_level", this.level.id, { rewardId: rewardId });
      }
      saveGameProgress();
      sceneManager.changeScene(this.returnScene || "overworld");
    }
  },

  draw(ctx) {
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const solids = this.level.solids || [];
    ctx.fillStyle = "#5d4e37";
    for (let i = 0; i < solids.length; i++) {
      const s = solids[i];
      ctx.fillRect(s.x, s.y, s.width, s.height);
    }

    const hazards = this.level.hazards || [];
    ctx.fillStyle = "#c0392b";
    for (let h = 0; h < hazards.length; h++) {
      const hz = hazards[h];
      ctx.fillRect(hz.x, hz.y, hz.width, hz.height);
    }

    ctx.fillStyle = "#f39c12";
    ctx.fillRect(
      this.level.goal.x,
      this.level.goal.y,
      this.level.goal.width,
      this.level.goal.height
    );

    ctx.fillStyle = "#3a7bd5";
    ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

    drawInteractionPrompt(ctx, "Reach the gold goal!  Esc: quit level");

    if (input.isPressed("Escape")) {
      sceneManager.changeScene(this.returnScene || "overworld");
    }

    drawDebugOverlay(ctx, {
      sceneName: this.name,
      playerX: this.player.x,
      playerY: this.player.y,
      cameraX: 0,
      cameraY: 0,
      collisionCount: solids.length,
      homeCount: homeRegistry.length
    });
  },

  exit() {
    this.pendingLevelId = null;
  }
};
