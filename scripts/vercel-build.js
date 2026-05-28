const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const out = path.join(root, "public");

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function rmDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) rmDir(p);
    else fs.unlinkSync(p);
  }
  fs.rmdirSync(dir);
}

rmDir(out);
fs.mkdirSync(out, { recursive: true });

fs.copyFileSync(path.join(root, "index.html"), path.join(out, "index.html"));
fs.copyFileSync(path.join(root, "style.css"), path.join(out, "style.css"));
copyRecursive(path.join(root, "js"), path.join(out, "js"));
copyRecursive(path.join(root, "admin"), path.join(out, "admin"));
copyRecursive(path.join(root, "assets"), path.join(out, "assets"));

require("./inject-config.js");

const generatedConfig = fs.readFileSync(path.join(root, "js", "config.js"), "utf8");
fs.writeFileSync(path.join(out, "js", "config.js"), generatedConfig, "utf8");

console.log("Vercel build: prepared public/ output");
