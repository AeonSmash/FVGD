registerStudentPack({
  manifest: {
    id: "sample_home",
    name: "Sample Studio",
    author: "Teacher",
    description: "Reference student home for the class multiverse.",
    iconColor: "purple",
    position: { x: 320, y: 256 },
    width: 32,
    height: 32,
    locked: false,
    platformerLevelId: "sample_platformer",
    rewardId: "yellow_key"
  },
  home: {
    tileSize: 32,
    width: 20,
    height: 12,
    spawnTile: { x: 5, y: 8 },
    interactables: [
      {
        type: "npc",
        id: "sample_npc",
        name: "Guide",
        dialogueKey: "sampleNpcIntro",
        tileX: 4,
        tileY: 2,
        width: 32,
        height: 32
      },
      {
        type: "portal",
        id: "sample_portal",
        name: "Platformer Portal",
        platformerLevelId: "sample_platformer",
        tileX: 14,
        tileY: 4,
        width: 48,
        height: 48
      },
      {
        type: "savePoint",
        id: "sample_save",
        name: "Save Point",
        tileX: 12,
        tileY: 8,
        width: 32,
        height: 32
      },
      {
        type: "submitPoint",
        id: "sample_submit",
        name: "Submit Work",
        tileX: 16,
        tileY: 8,
        width: 32,
        height: 32
      },
      {
        type: "exit",
        id: "home_exit",
        name: "Exit",
        tileX: 4,
        tileY: 9,
        width: 64,
        height: 32
      }
    ]
  }
});
