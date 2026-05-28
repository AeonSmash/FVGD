// Tracks which keys are held and which were just pressed this frame.
const input = {
  held: {},
  pressed: {},

  isDown(code) {
    return !!this.held[code];
  },

  isPressed(code) {
    return !!this.pressed[code];
  },

  update() {
    this.pressed = {};
  }
};

const INPUT_CODES = [
  "KeyW", "KeyA", "KeyS", "KeyD",
  "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
  "Enter", "KeyE", "Escape", "Space", "Tab", "Backspace",
  "ShiftLeft", "ShiftRight", "F1", "F2",
  "Digit0", "Digit1", "Digit2", "Digit3", "Digit4",
  "Digit5", "Digit6", "Digit7", "Digit8", "Digit9",
  "Numpad0", "Numpad1", "Numpad2", "Numpad3", "Numpad4",
  "Numpad5", "Numpad6", "Numpad7", "Numpad8", "Numpad9"
];

window.addEventListener("keydown", function (event) {
  if (INPUT_CODES.includes(event.code)) {
    if (!input.held[event.code]) {
      input.pressed[event.code] = true;
    }
    input.held[event.code] = true;
  }

  if (event.code === "F1" || event.code === "F2" || event.code === "Space") {
    event.preventDefault();
  }
});

window.addEventListener("keyup", function (event) {
  if (INPUT_CODES.includes(event.code)) {
    input.held[event.code] = false;
  }
});

// Convenience helpers used by player movement.
function isMoveUp() {
  return input.isDown("KeyW") || input.isDown("ArrowUp");
}

function isMoveDown() {
  return input.isDown("KeyS") || input.isDown("ArrowDown");
}

function isMoveLeft() {
  return input.isDown("KeyA") || input.isDown("ArrowLeft");
}

function isMoveRight() {
  return input.isDown("KeyD") || input.isDown("ArrowRight");
}

function isConfirmPressed() {
  return input.isPressed("Enter") || input.isPressed("KeyE");
}
