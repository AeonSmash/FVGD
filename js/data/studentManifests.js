// Student packs push entries here from js/students/<id>/pack.js
const studentManifests = [];

function registerStudentPack(pack) {
  if (!pack || !pack.manifest || !pack.manifest.id) {
    console.warn("Invalid student pack:", pack);
    return;
  }
  studentManifests.push(pack);
}
