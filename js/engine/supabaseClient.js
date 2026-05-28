let supabase = null;
let supabaseScriptPromise = null;

function loadSupabaseScript() {
  if (window.supabase && window.supabase.createClient) {
    return Promise.resolve();
  }
  if (supabaseScriptPromise) {
    return supabaseScriptPromise;
  }

  supabaseScriptPromise = new Promise(function (resolve, reject) {
    const tag = document.createElement("script");
    tag.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js";
    tag.async = true;
    tag.onload = function () {
      resolve();
    };
    tag.onerror = function () {
      console.warn("Supabase library failed to load. Cloud features disabled.");
      reject(new Error("Supabase script load failed"));
    };
    document.head.appendChild(tag);
  });

  return supabaseScriptPromise;
}

async function initSupabase() {
  const cfg = window.FVGD_CONFIG || {};
  if (!cfg.supabaseEnabled || !cfg.supabaseUrl || !cfg.supabaseAnonKey) {
    return null;
  }

  try {
    await loadSupabaseScript();
  } catch (err) {
    return null;
  }

  if (!window.supabase || !window.supabase.createClient) {
    console.warn("Supabase createClient not available.");
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
