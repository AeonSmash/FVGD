// Finds the canvas and exposes it as a global for the rest of the engine.
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 640;

console.log("Canvas ready.");
