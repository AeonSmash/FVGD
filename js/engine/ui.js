const UI_FONT = "16px monospace";

function drawInteractionPrompt(ctx, text) {
  const boxWidth = 420;
  const boxHeight = 36;
  const x = (canvas.width - boxWidth) / 2;
  const y = canvas.height - 56;

  ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
  ctx.fillRect(x, y, boxWidth, boxHeight);

  ctx.fillStyle = "#ffffff";
  ctx.font = UI_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + boxWidth / 2, y + boxHeight / 2);
}

function drawDialogueBox(ctx, speaker, text) {
  const boxWidth = canvas.width - 80;
  const boxHeight = 100;
  const x = 40;
  const y = canvas.height - boxHeight - 24;

  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(x, y, boxWidth, boxHeight);

  ctx.fillStyle = "#ffffff";
  ctx.font = UI_FONT;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(speaker + ":", x + 16, y + 12);
  ctx.fillText(text, x + 16, y + 36);
  ctx.fillText("(Enter / E: next, Esc: close)", x + 16, y + 72);
}

function drawSceneLabel(ctx, sceneName) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(8, 8, 180, 24);
  ctx.fillStyle = "#ffffff";
  ctx.font = UI_FONT;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("Scene: " + sceneName, 16, 20);
}

function drawVisitedHomeCount(ctx) {
  const text = "Homes visited: " + gameState.visitedHomes.length;
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(8, 36, 200, 24);
  ctx.fillStyle = "#ffffff";
  ctx.font = UI_FONT;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 16, 48);
}

function drawRewardsBar(ctx) {
  if (!gameState.unlockedRewards || gameState.unlockedRewards.length === 0) {
    return;
  }
  const labels = gameState.unlockedRewards.map(function (id) {
    return getRewardLabel(id);
  });
  const text = "Rewards: " + labels.join(", ");
  ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
  ctx.fillRect(8, canvas.height - 32, Math.min(520, canvas.width - 16), 24);
  ctx.fillStyle = "#ffe66d";
  ctx.font = "14px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 16, canvas.height - 20);
}
