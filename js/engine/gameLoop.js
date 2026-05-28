let lastTime = 0;

function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  updateDebugStats(deltaTime);
  handleDebugInput();

  updateTransition();

  if (!isTransitionBlockingInput()) {
    sceneManager.update(deltaTime);
  }

  draw();
  input.update();

  requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
  sceneManager.update(deltaTime);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sceneManager.draw(ctx);
  drawTransition(ctx);
}
