// Camera scrolls the view without changing world positions used by collision.
class Camera {
  constructor(viewWidth, viewHeight, worldWidth, worldHeight) {
    this.x = 0;
    this.y = 0;
    this.width = viewWidth;
    this.height = viewHeight;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
  }

  follow(target) {
    this.x = target.x + target.width / 2 - this.width / 2;
    this.y = target.y + target.height / 2 - this.height / 2;
    this.x = Math.max(0, Math.min(this.x, this.worldWidth - this.width));
    this.y = Math.max(0, Math.min(this.y, this.worldHeight - this.height));
  }

  worldToScreenX(worldX) {
    return worldX - this.x;
  }

  worldToScreenY(worldY) {
    return worldY - this.y;
  }
}
