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

  updateTopDown(collisionObjects, movementBlocked) {
    if (movementBlocked) {
      this.state = "idle";
      return;
    }

    let dx = 0;
    let dy = 0;

    // Vertical input wins so the player cannot move diagonally in Version 1.
    if (isMoveUp()) {
      dy = -this.speed;
      this.facing = "up";
    } else if (isMoveDown()) {
      dy = this.speed;
      this.facing = "down";
    } else if (isMoveLeft()) {
      dx = -this.speed;
      this.facing = "left";
    } else if (isMoveRight()) {
      dx = this.speed;
      this.facing = "right";
    }

    if (dx !== 0 || dy !== 0) {
      this.state = "walk";
      moveWithCollision(this, dx, dy, collisionObjects);
    } else {
      this.state = "idle";
    }
  }

  draw(ctx, camera) {
    const camX = camera ? camera.x : 0;
    const camY = camera ? camera.y : 0;
    const screenX = this.x - camX;
    const screenY = this.y - camY;

    ctx.fillStyle = "#3a7bd5";
    ctx.fillRect(screenX, screenY, this.width, this.height);

    ctx.fillStyle = "#cce5ff";
    const indicatorSize = 8;
    let indicatorX = screenX + (this.width - indicatorSize) / 2;
    let indicatorY = screenY + (this.height - indicatorSize) / 2;

    if (this.facing === "up") {
      indicatorY = screenY;
    } else if (this.facing === "down") {
      indicatorY = screenY + this.height - indicatorSize;
    } else if (this.facing === "left") {
      indicatorX = screenX;
    } else if (this.facing === "right") {
      indicatorX = screenX + this.width - indicatorSize;
    }

    ctx.fillRect(indicatorX, indicatorY, indicatorSize, indicatorSize);
  }
}
