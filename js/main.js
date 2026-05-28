// Boot: config, optional Supabase, save load, register scenes, start loop.
async function bootGame() {
  try {
    await initSupabase();
    await Promise.race([
      restoreAuthSession(),
      new Promise(function (resolve) {
        setTimeout(resolve, 3000);
      })
    ]);
    await loadGameProgress();
  } catch (err) {
    console.warn("Boot warning (continuing offline):", err);
  }

  refreshHomeRegistry();

  sceneManager.register(titleScene);
  sceneManager.register(loginScene);
  sceneManager.register(overworldScene);
  sceneManager.register(platformerScene);
  registerStudentHomeScenes();

  sceneManager.changeSceneImmediate("title");
  requestAnimationFrame(gameLoop);
}

bootGame().catch(function (err) {
  console.error("Boot failed:", err);
  const ctx = document.getElementById("gameCanvas");
  if (ctx && ctx.getContext) {
    const c = ctx.getContext("2d");
    c.fillStyle = "#0d0d1a";
    c.fillRect(0, 0, ctx.width, ctx.height);
    c.fillStyle = "#ffffff";
    c.font = "18px monospace";
    c.fillText("Game failed to start. Check browser console (F12).", 40, 80);
  }
});
