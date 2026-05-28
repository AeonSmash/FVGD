async function saveCloud() {
  const client = getSupabase();
  if (!client || !authState.playerId) {
    return false;
  }

  const payload = buildSavePayload();
  const row = {
    player_id: authState.playerId,
    visited_homes: payload.visitedHomes,
    completed_levels: payload.completedLevels,
    unlocked_rewards: payload.unlockedRewards,
    overworld_position: payload.overworldPlayerPosition,
    settings: payload.settings,
    schema_version: payload.schema_version,
    updated_at: new Date().toISOString()
  };

  const { error } = await client.from("save_states").upsert(row);
  if (error) {
    console.warn("saveCloud failed:", error.message);
    return false;
  }
  return true;
}

async function loadCloud() {
  const client = getSupabase();
  if (!client || !authState.playerId) {
    return false;
  }

  const { data, error } = await client
    .from("save_states")
    .select("*")
    .eq("player_id", authState.playerId)
    .maybeSingle();

  if (error || !data) {
    return false;
  }

  return applySavePayload({
    visitedHomes: data.visited_homes,
    completedLevels: data.completed_levels,
    unlockedRewards: data.unlocked_rewards,
    overworldPlayerPosition: data.overworld_position,
    settings: data.settings,
    schema_version: data.schema_version
  });
}

async function loadGameProgress() {
  const hadLocal = loadLocal();
  if (authState.playerId) {
    const hadCloud = await loadCloud();
    return hadLocal || hadCloud;
  }
  return hadLocal;
}
