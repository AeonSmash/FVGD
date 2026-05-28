// One shared object for data that survives scene changes.
const gameState = {
  currentScene: "title",
  playerName: "",
  visitedHomes: [],
  completedLevels: [],
  unlockedRewards: [],
  settings: {
    volume: 0.8,
    debugMode: true,
    showCollision: false
  },
  overworldPlayerPosition: {
    x: 160,
    y: 160
  }
};

function markHomeVisited(homeId) {
  if (!isHomeVisited(homeId)) {
    gameState.visitedHomes.push(homeId);
  }
}

function isHomeVisited(homeId) {
  return gameState.visitedHomes.includes(homeId);
}

function markLevelCompleted(levelId) {
  if (!isLevelCompleted(levelId)) {
    gameState.completedLevels.push(levelId);
  }
}

function isLevelCompleted(levelId) {
  return gameState.completedLevels.includes(levelId);
}

function unlockReward(rewardId) {
  if (!hasReward(rewardId)) {
    gameState.unlockedRewards.push(rewardId);
  }
}

function hasReward(rewardId) {
  return gameState.unlockedRewards.includes(rewardId);
}
