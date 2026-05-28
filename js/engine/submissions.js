async function submitWorldForReview(manifest, submissionType) {
  const client = getSupabase();
  if (!client || !authState.playerId) {
    console.log("Submit (offline):", manifest.id, submissionType);
    return { ok: false, offline: true };
  }

  const snapshot = {
    manifest: manifest,
    gameState: {
      visitedHomes: gameState.visitedHomes,
      completedLevels: gameState.completedLevels,
      unlockedRewards: gameState.unlockedRewards
    },
    submittedAt: new Date().toISOString()
  };

  const { error } = await client.from("student_submissions").insert({
    player_id: authState.playerId,
    world_id: manifest.id,
    submission_type: submissionType || "full",
    status: "submitted",
    manifest: snapshot,
    submitted_at: new Date().toISOString()
  });

  if (error) {
    console.warn("submitWorldForReview failed:", error.message);
    return { ok: false, error: error.message };
  }

  if (typeof logEvent === "function") {
    logEvent("submitted_world", manifest.id, { submissionType: submissionType });
  }

  return { ok: true };
}
