const titleScene = {
  name: "title",

  create() {
    gameState.currentScene = "title";
  },

  update() {
    if (isTransitionBlockingInput()) {
      return;
    }

    if (input.isPressed("Enter")) {
      if (typeof shouldShowLogin === "function" && shouldShowLogin()) {
        sceneManager.changeScene("login");
      } else {
        sceneManager.changeScene("overworld");
      }
    }
  },

  draw(ctx) {
    ctx.fillStyle = "#0d0d1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "32px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Class Multiverse Overworld", canvas.width / 2, canvas.height / 2 - 24);

    ctx.font = "18px monospace";
    ctx.fillText("Press Enter to Start", canvas.width / 2, canvas.height / 2 + 24);
  },

  exit() {}
};
