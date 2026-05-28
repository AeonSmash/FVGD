async function logEvent(eventType, worldId, metadata) {
  const client = getSupabase();
  if (!client || !authState.playerId) {
    return;
  }

  const { error } = await client.from("level_events").insert({
    player_id: authState.playerId,
    event_type: eventType,
    world_id: worldId || null,
    metadata: metadata || {}
  });

  if (error) {
    console.warn("logEvent failed:", error.message);
  }
}
