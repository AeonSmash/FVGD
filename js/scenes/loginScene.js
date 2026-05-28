const loginScene = {
  name: "login",
  classCode: "P1",
  studentId: "",
  pin: "",
  message: "",
  loading: false,

  create() {
    this.message = "Enter class code, student ID, and PIN.";
    this.loading = false;
    const saved = localStorage.getItem("fvgd.auth.session");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.classCode = parsed.classCode || "P1";
        this.studentId = parsed.studentId || "";
      } catch (e) {
        /* ignore */
      }
    }
  },

  cycleClassCode() {
    const codes = ["P1", "P2", "P3", "P4"];
    const idx = codes.indexOf(this.classCode);
    this.classCode = codes[(idx + 1) % codes.length];
  },

  async tryLogin() {
    if (this.loading) return;
    this.loading = true;
    this.message = "Logging in...";
    const result = await loginWithClassPin(
      this.classCode,
      this.studentId,
      this.pin
    );
    this.loading = false;
    if (result.ok) {
      await loadCloud();
      sceneManager.changeScene("overworld");
    } else {
      this.message = result.error || "Login failed";
    }
  },

  update() {
    if (isTransitionBlockingInput()) return;

    if (input.isPressed("Tab")) {
      this.cycleClassCode();
    }

    if (input.isPressed("Enter")) {
      this.tryLogin();
    }

    if (input.isPressed("Escape")) {
      sceneManager.changeScene("overworld");
    }

    const digits = "0123456789";
    for (let i = 0; i < digits.length; i++) {
      const d = digits[i];
      if (input.isPressed("Digit" + d) || input.isPressed("Numpad" + d)) {
        if (this.studentId.length < 4) {
          this.studentId += d;
        } else if (this.pin.length < 6) {
          this.pin += d;
        }
      }
    }

    if (input.isPressed("Backspace")) {
      if (this.pin.length > 0) this.pin = this.pin.slice(0, -1);
      else if (this.studentId.length > 0) this.studentId = this.studentId.slice(0, -1);
    }
  },

  draw(ctx) {
    ctx.fillStyle = "#0d0d1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "28px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Class Login", canvas.width / 2, 80);

    ctx.font = "16px monospace";
    ctx.textAlign = "left";
    const left = 280;
    ctx.fillText("Class (Tab to change): " + this.classCode, left, 160);
    ctx.fillText("Student ID (0-9): " + (this.studentId || "—"), left, 200);
    ctx.fillText("PIN (0-9): " + (this.pin ? "*".repeat(this.pin.length) : "—"), left, 240);
    ctx.fillText(this.message, left, 300);

    ctx.textAlign = "center";
    ctx.fillText("Enter = login   Esc = play offline", canvas.width / 2, 380);
    ctx.fillText("Backspace = delete last digit", canvas.width / 2, 410);
  },

  exit() {
    this.pin = "";
  }
};
