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
  if (!authHeader.includes(serviceKey)) {
    return json({ error: "Unauthorized" }, 401);
  }

  try {
    const { class_code, student_id, new_pin } = await req.json();
    const admin = createClient(Deno.env.get("SUPABASE_URL") ?? "", serviceKey);

    const { data: player } = await admin
      .from("players")
      .select("auth_user_id")
      .eq("class_section", class_code)
      .eq("student_id", String(student_id))
      .maybeSingle();

    if (!player?.auth_user_id) {
      return json({ error: "Student not found" }, 404);
    }

    const { error } = await admin.auth.admin.updateUserById(player.auth_user_id, {
      password: String(new_pin)
    });

    if (error) return json({ error: error.message }, 400);

    await admin
      .from("players")
      .update({ failed_login_count: 0 })
      .eq("auth_user_id", player.auth_user_id);

    return json({ ok: true });
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
