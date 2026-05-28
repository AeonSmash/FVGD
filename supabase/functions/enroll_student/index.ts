import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
      }
    });
  }

  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const authHeader = req.headers.get("Authorization") || "";
  if (!authHeader.includes(serviceKey) && authHeader !== `Bearer ${serviceKey}`) {
    return json({ error: "Unauthorized" }, 401);
  }

  try {
    const { class_code, student_id, display_name, pin, student_ref, role } = await req.json();
    if (!class_code || !student_id || !display_name || !pin) {
      return json({ error: "Missing required fields" }, 400);
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      serviceKey
    );

    const email = `${String(class_code).trim().toLowerCase()}.${String(student_id).trim().toLowerCase()}@fvgd.local`;

    const { data: authUser, error: authError } = await admin.auth.admin.createUser({
      email,
      password: String(pin),
      email_confirm: true
    });

    if (authError) {
      return json({ error: authError.message }, 400);
    }

    const { data: player, error: playerError } = await admin
      .from("players")
      .insert({
        auth_user_id: authUser.user.id,
        class_section: class_code,
        student_id: String(student_id),
        display_name,
        student_ref: student_ref || null,
        role: role || "student"
      })
      .select("id")
      .single();

    if (playerError) {
      return json({ error: playerError.message }, 400);
    }

    await admin.from("save_states").upsert({ player_id: player.id });

    return json({ ok: true, player_id: player.id, email });
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
