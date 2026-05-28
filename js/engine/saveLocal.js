const SAVE_SCHEMA_VERSION = 1;
const SAVE_STORAGE_KEY = "fvgd.save";

function buildSavePayload() {
  return {
    schema_version: SAVE_SCHEMA_VERSION,
    visitedHomes: gameState.visitedHomes.slice(),
    completedLevels: gameState.completedLevels.slice(),
    unlockedRewards: gameState.unlockedRewards.slice(),
    overworldPlayerPosition: {
      x: gameState.overworldPlayerPosition.x,
      y: gameState.overworldPlayerPosition.y
    },
    settings: {
      volume: gameState.settings.volume,
      debugMode: gameState.settings.debugMode,
      showCollision: gameState.settings.showCollision
    },
    playerName: gameState.playerName
  };
}

function applySavePayload(payload) {
  if (!payload) return false;
  gameState.visitedHomes = payload.visitedHomes || [];
  gameState.completedLevels = payload.completedLevels || [];
  gameState.unlockedRewards = payload.unlockedRewards || [];
  gameState.overworldPlayerPosition = payload.overworldPlayerPosition || { x: 160, y: 160 };
  if (payload.settings) {
    gameState.settings.volume = payload.settings.volume ?? gameState.settings.volume;
    gameState.settings.debugMode = payload.settings.debugMode ?? gameState.settings.debugMode;
    gameState.settings.showCollision = payload.settings.showCollision ?? gameState.settings.showCollision;
  }
  if (payload.playerName) {
    gameState.playerName = payload.playerName;
  }
  return true;
}

function saveLocal() {
  try {
    localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(buildSavePayload()));
    return true;
  } catch (err) {
    console.warn("saveLocal failed:", err);
    return false;
  }
}

function loadLocal() {
  try {
    const raw = localStorage.getItem(SAVE_STORAGE_KEY);
    if (!raw) return false;
    return applySavePayload(JSON.parse(raw));
  } catch (err) {
    console.warn("loadLocal failed:", err);
    return false;
  }
}

function clearLocal() {
  localStorage.removeItem(SAVE_STORAGE_KEY);
}

function saveGameProgress() {
  saveLocal();
  if (typeof saveCloud === "function") {
    saveCloud();
  }
}
