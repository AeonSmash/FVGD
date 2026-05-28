// Boot sequence: register scenes, start on title, run the game loop.
sceneManager.register(titleScene);
sceneManager.register(overworldScene);
sceneManager.register(sampleHomeScene);

sceneManager.changeSceneImmediate("title");
requestAnimationFrame(gameLoop);
