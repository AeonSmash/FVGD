import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MAX_FAILED = 5;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
      }
    });
  }

  try {
    const { class_code, student_id, pin } = await req.json();
    if (!class_code || !student_id || !pin) {
      return json({ error: "Missing class_code, student_id, or pin" }, 400);
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const email = `${String(class_code).trim().toLowerCase()}.${String(student_id).trim().toLowerCase()}@fvgd.local`;

    const { data: player, error: playerError } = await admin
      .from("players")
      .select("id, auth_user_id, display_name, class_section, student_id, role, active, failed_login_count")
      .eq("class_section", class_code)
      .eq("student_id", String(student_id))
      .maybeSingle();

    if (playerError || !player) {
      return json({ error: "Student not found" }, 401);
    }

    if (!player.active) {
      return json({ error: "Account inactive" }, 403);
    }

    if (player.failed_login_count >= MAX_FAILED) {
      return json({ error: "Too many failed attempts. Ask your teacher to reset PIN." }, 403);
    }

    const { data: signInData, error: signInError } = await admin.auth.signInWithPassword({
      email,
      password: String(pin)
    });

    if (signInError) {
      await admin
        .from("players")
        .update({ failed_login_count: (player.failed_login_count || 0) + 1 })
        .eq("id", player.id);
      return json({ error: "Invalid PIN" }, 401);
    }

    await admin
      .from("players")
      .update({ failed_login_count: 0, last_seen_at: new Date().toISOString() })
      .eq("id", player.id);

    return json({
      access_token: signInData.session?.access_token,
      refresh_token: signInData.session?.refresh_token,
      player_id: player.id,
      auth_user_id: signInData.user?.id,
      display_name: player.display_name,
      role: player.role
    });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
