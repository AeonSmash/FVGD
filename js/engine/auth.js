const authState = {
  playerId: null,
  authUserId: null,
  displayName: "",
  classSection: "",
  studentId: "",
  role: "student"
};

const AUTH_SESSION_KEY = "fvgd.auth.session";

function shouldShowLogin() {
  const cfg = window.FVGD_CONFIG || {};
  return cfg.supabaseEnabled && !authState.authUserId;
}

function buildSyntheticEmail(classCode, studentId) {
  return (
    String(classCode).trim().toLowerCase() +
    "." +
    String(studentId).trim().toLowerCase() +
    "@fvgd.local"
  );
}

async function loginWithClassPin(classCode, studentId, pin) {
  const client = getSupabase();
  if (!client) {
    return { ok: false, error: "Supabase not configured" };
  }

  const fnUrl = getFunctionsUrl() + "/login";
  try {
    const response = await fetch(fnUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.FVGD_CONFIG.supabaseAnonKey,
        apikey: window.FVGD_CONFIG.supabaseAnonKey
      },
      body: JSON.stringify({
        class_code: classCode,
        student_id: studentId,
        pin: pin
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return { ok: false, error: data.error || "Login failed" };
    }

    if (data.access_token && data.refresh_token) {
      await client.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token
      });
    }

    authState.playerId = data.player_id;
    authState.authUserId = data.auth_user_id;
    authState.displayName = data.display_name || studentId;
    authState.classSection = classCode;
    authState.studentId = studentId;
    authState.role = data.role || "student";
    gameState.playerName = authState.displayName;

    localStorage.setItem(
      AUTH_SESSION_KEY,
      JSON.stringify({
        classCode: classCode,
        studentId: studentId
      })
    );

    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

async function restoreAuthSession() {
  const client = getSupabase();
  if (!client) return false;

  const { data } = await client.auth.getSession();
  if (!data || !data.session) return false;

  const { data: playerRows, error } = await client
    .from("players")
    .select("id, display_name, class_section, student_id, role")
    .eq("auth_user_id", data.session.user.id)
    .maybeSingle();

  if (error || !playerRows) return false;

  authState.playerId = playerRows.id;
  authState.authUserId = data.session.user.id;
  authState.displayName = playerRows.display_name;
  authState.classSection = playerRows.class_section;
  authState.studentId = playerRows.student_id;
  authState.role = playerRows.role || "student";
  gameState.playerName = authState.displayName;
  return true;
}

async function logoutAuth() {
  const client = getSupabase();
  if (client) await client.auth.signOut();
  authState.playerId = null;
  authState.authUserId = null;
  authState.displayName = "";
  authState.classSection = "";
  authState.studentId = "";
  authState.role = "student";
  localStorage.removeItem(AUTH_SESSION_KEY);
}

function getCurrentPlayer() {
  return authState.playerId ? { ...authState } : null;
}
