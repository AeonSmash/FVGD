const debugStats = {
  frameCount: 0,
  elapsed: 0,
  fps: 0
};

function updateDebugStats(deltaTime) {
  debugStats.frameCount += 1;
  debugStats.elapsed += deltaTime;
  if (debugStats.elapsed >= 500) {
    debugStats.fps = Math.round((debugStats.frameCount * 1000) / debugStats.elapsed);
    debugStats.frameCount = 0;
    debugStats.elapsed = 0;
  }
}

function handleDebugInput() {
  if (input.isPressed("F1")) {
    gameState.settings.debugMode = !gameState.settings.debugMode;
  }
  if (input.isPressed("F2")) {
    gameState.settings.showCollision = !gameState.settings.showCollision;
  }
}

function drawDebugOverlay(ctx, info) {
  if (!gameState.settings.debugMode) {
    return;
  }

  const lines = [
    "FPS: " + debugStats.fps,
    "Scene: " + (info.sceneName || "unknown"),
    "Player: " + Math.round(info.playerX || 0) + ", " + Math.round(info.playerY || 0),
    "Camera: " + Math.round(info.cameraX || 0) + ", " + Math.round(info.cameraY || 0),
    "Collision count: " + (info.collisionCount || 0),
    "Homes registered: " + (info.homeCount || 0),
    "Homes visited: " + gameState.visitedHomes.length,
    "Debug overlay: " + (gameState.settings.debugMode ? "ON" : "OFF"),
    "Collision boxes: " + (gameState.settings.showCollision ? "ON" : "OFF")
  ];

  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(8, 8, 280, lines.length * 18 + 12);

  ctx.fillStyle = "#00ff88";
  ctx.font = "14px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], 16, 16 + i * 18);
  }
}
