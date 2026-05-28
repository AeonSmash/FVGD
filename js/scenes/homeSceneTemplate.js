// Template reference for future student home scenes.
// Students will copy sampleHomeScene.js and replace room data + dialogue keys.
//
// Required pieces:
// - Small top-down room with walls and floor
// - Player spawn
// - Exit interactable back to overworld
// - At least one NPC or sign
// - Optional portal placeholder (dialogue only in Version 1)

const homeSceneTemplate = {
  name: "homeTemplate",

  create() {
    console.log("homeSceneTemplate is documentation only in Version 1.");
  },

  update() {},
  draw(ctx) {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "18px monospace";
    ctx.fillText("Home Scene Template (not playable)", 40, 40);
  },
  exit() {}
};
