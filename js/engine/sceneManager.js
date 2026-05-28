// Only one scene is active at a time so title and overworld never update together.
const sceneManager = {
  scenes: {},
  currentScene: null,

  register(scene) {
    this.scenes[scene.name] = scene;
  },

  changeScene(sceneName) {
    if (transition.active) {
      return;
    }
    startTransition(sceneName);
  },

  changeSceneImmediate(sceneName) {
    const nextScene = this.scenes[sceneName];
    if (!nextScene) {
      console.warn("Scene not found:", sceneName);
      return;
    }

    if (this.currentScene && this.currentScene.exit) {
      this.currentScene.exit();
    }

    this.currentScene = nextScene;
    gameState.currentScene = sceneName;

    if (this.currentScene.create) {
      this.currentScene.create();
    }
  },

  update(deltaTime) {
    if (this.currentScene && this.currentScene.update) {
      this.currentScene.update(deltaTime);
    }
  },

  draw(ctx) {
    if (this.currentScene && this.currentScene.draw) {
      this.currentScene.draw(ctx);
    }
  },

  getCurrentSceneName() {
    return this.currentScene ? this.currentScene.name : "none";
  }
};
