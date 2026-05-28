let supabase = null;

function initSupabase() {
  const cfg = window.FVGD_CONFIG || {};
  if (!cfg.supabaseEnabled || !cfg.supabaseUrl || !cfg.supabaseAnonKey) {
    return null;
  }
  if (typeof window.supabase === "undefined" || !window.supabase.createClient) {
    console.warn("Supabase JS library not loaded.");
    return null;
  }
  supabase = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
  return supabase;
}

function getSupabase() {
  return supabase;
}

function getFunctionsUrl() {
  const cfg = window.FVGD_CONFIG || {};
  return cfg.supabaseUrl ? cfg.supabaseUrl.replace(/\/$/, "") + "/functions/v1" : "";
}
