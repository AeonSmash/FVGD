const platformerLevels = {
  sample_platformer: {
    id: "sample_platformer",
    name: "Sample Studio Level",
    width: 960,
    height: 640,
    spawn: { x: 80, y: 400 },
    goal: { x: 820, y: 360, width: 40, height: 80 },
    rewardId: "yellow_key",
    solids: [
      { x: 0, y: 560, width: 960, height: 80 },
      { x: 200, y: 480, width: 120, height: 24 },
      { x: 400, y: 420, width: 100, height: 24 },
      { x: 600, y: 360, width: 120, height: 24 },
      { x: 300, y: 300, width: 80, height: 24 }
    ],
    hazards: [
      { x: 500, y: 536, width: 64, height: 24 }
    ]
  }
};

function getPlatformerLevel(levelId) {
  return platformerLevels[levelId] || null;
}
