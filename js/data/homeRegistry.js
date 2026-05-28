const HOME_ICON_COLORS = {
  purple: "#9b59b6",
  blue: "#3498db",
  orange: "#e67e22",
  gray: "#7f8c8d",
  green: "#27ae60"
};

const homeRegistry = [
  {
    id: "sample_home",
    name: "Sample Studio",
    author: "Teacher",
    description: "A sample student home used to test the overworld system.",
    iconColor: "purple",
    position: { x: 320, y: 256 },
    width: 32,
    height: 32,
    homeScene: "sampleHome",
    locked: false
  },
  {
    id: "locked_home",
    name: "Locked Home",
    author: "Future Student",
    description: "Placeholder home for a future student submission.",
    iconColor: "gray",
    position: { x: 768, y: 256 },
    width: 32,
    height: 32,
    homeScene: "sampleHome",
    locked: true
  },
  {
    id: "plot_home_a",
    name: "Home Plot A",
    author: "Future Student",
    description: "Reserved home plot.",
    iconColor: "blue",
    position: { x: 320, y: 640 },
    width: 32,
    height: 32,
    homeScene: "sampleHome",
    locked: true
  },
  {
    id: "plot_home_b",
    name: "Home Plot B",
    author: "Future Student",
    description: "Reserved home plot.",
    iconColor: "orange",
    position: { x: 768, y: 640 },
    width: 32,
    height: 32,
    homeScene: "sampleHome",
    locked: true
  },
  {
    id: "plot_home_c",
    name: "Home Plot C",
    author: "Future Student",
    description: "Reserved home plot.",
    iconColor: "green",
    position: { x: 544, y: 448 },
    width: 32,
    height: 32,
    homeScene: "sampleHome",
    locked: true
  }
];

function validateHomeRegistry(registry) {
  const seenIds = {};

  for (let i = 0; i < registry.length; i++) {
    const home = registry[i];
    const label = "Home registry entry " + i;

    if (!home.id) {
      console.warn(label + ": missing id");
      continue;
    }

    if (seenIds[home.id]) {
      console.warn(label + ": duplicate id '" + home.id + "'");
    }
    seenIds[home.id] = true;

    if (!home.name) {
      console.warn(label + " (" + home.id + "): missing name");
    }

    if (!home.homeScene) {
      console.warn(label + " (" + home.id + "): missing homeScene");
    }

    if (!home.position) {
      console.warn(label + " (" + home.id + "): missing position");
    }

    if (!home.width || !home.height || home.width <= 0 || home.height <= 0) {
      console.warn(label + " (" + home.id + "): invalid dimensions");
    }
  }
}

function drawHomeIcons(ctx, registry, camera) {
  const camX = camera ? camera.x : 0;
  const camY = camera ? camera.y : 0;

  for (let i = 0; i < registry.length; i++) {
    const home = registry[i];
    const color = HOME_ICON_COLORS[home.iconColor] || "#ffffff";

    ctx.fillStyle = color;
    ctx.fillRect(
      home.position.x - camX,
      home.position.y - camY,
      home.width,
      home.height
    );

    if (home.locked) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
      ctx.fillRect(
        home.position.x - camX,
        home.position.y - camY,
        home.width,
        home.height
      );
    }
  }
}

function buildHomeInteractables(registry) {
  const interactables = [];

  for (let i = 0; i < registry.length; i++) {
    const home = registry[i];
    interactables.push({
      type: INTERACTABLE_TYPES.HOME_ENTRANCE,
      id: home.id,
      name: home.name,
      homeScene: home.homeScene,
      locked: !!home.locked,
      x: home.position.x,
      y: home.position.y,
      width: home.width,
      height: home.height
    });
  }

  interactables.push({
    type: INTERACTABLE_TYPES.SIGN,
    id: "hub_sign",
    name: "Class Hub Sign",
    dialogueKey: "hubSign",
    x: overworldMap.signPosition.x,
    y: overworldMap.signPosition.y,
    width: overworldMap.signPosition.width,
    height: overworldMap.signPosition.height
  });

  return interactables;
}
