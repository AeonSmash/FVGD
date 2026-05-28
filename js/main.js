// Boot: config, optional Supabase, save load, register scenes, start loop.
async function bootGame() {
  initSupabase();
  await restoreAuthSession();
  await loadGameProgress();

  refreshHomeRegistry();

  sceneManager.register(titleScene);
  sceneManager.register(loginScene);
  sceneManager.register(overworldScene);
  sceneManager.register(platformerScene);
  registerStudentHomeScenes();

  sceneManager.changeSceneImmediate("title");
  requestAnimationFrame(gameLoop);
}

bootGame();
