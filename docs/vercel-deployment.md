# Vercel Deployment

## Status

| Step | Status |
|------|--------|
| GitHub repo `AeonSmash/FVGD` | Done |
| Vercel Git connected | Done (you connected in dashboard) |
| `vercel.json` build settings | In repo — triggers on each push to `main` |
| Supabase env vars | **You must add** (see below) |
| Production URL live | Redeploy after env vars; see [Verify](#verify) |

**Project:** [aeonsmashs-projects/fvgd](https://vercel.com/aeonsmashs-projects/fvgd)  
**Likely URL:** `https://fvgd.vercel.app` (or the domain shown under Vercel → Domains)

---

## What happens on each `git push` to `main`

1. Vercel pulls the repo.
2. Runs `npm run build` → `node scripts/inject-config.js` writes `js/config.js` from environment variables.
3. Serves the project root (`index.html`, `js/`, `admin/`, etc.).

No manual deploy needed after Git is connected — **push to `main`** redeploys.

---

## Environment variables (required for Supabase login)

In Vercel → **fvgd** → **Settings** → **Environment Variables**, add for **Production** (and Preview if you want):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ixpfcghaorhidmrtnaez.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API → **anon public** key |

Then **Deployments** → latest deployment → **Redeploy** (so `js/config.js` is rebuilt with `supabaseEnabled: true`).

Without these, the game still runs **offline** (login skipped; local save only).

---

## Dashboard settings (confirm once)

If a deploy fails, open **Settings → General** and confirm:

| Setting | Value |
|---------|--------|
| Framework Preset | Other |
| Root Directory | `./` (empty or root) |
| Build Command | `npm run build` (or leave empty — `vercel.json` sets it) |
| Output Directory | `public` (set by `vercel.json` after build) |
| Install Command | `echo skip` or empty |

---

## Local development

```powershell
copy js\config.example.js js\config.js
# Edit js\config.js with your anon key and supabaseEnabled: true
```

Or keep defaults for offline play.

---

## Verify

1. Open your production URL (Vercel → Domains).
2. Title screen: **Class Multiverse Overworld**.
3. Browser console (F12): `Canvas ready.`
4. Press **Enter** → overworld or login (if Supabase env is set).
5. Admin: `https://<your-domain>/admin`

### If you see 404

- Check **Deployments** tab for a failed build (red).
- Open build logs; fix any `node scripts/inject-config.js` error.
- Confirm **Output Directory** is not set to a subfolder like `dist` or `public`.
- Push a new commit to `main` to redeploy.

---

## CLI (optional)

```powershell
npx vercel login
npx vercel link
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
npx vercel --prod
```

The `.vercel` folder is gitignored; do not commit it.
