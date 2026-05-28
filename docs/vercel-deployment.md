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
**Production URL:** [https://fvgd-flax.vercel.app](https://fvgd-flax.vercel.app) (assigned to this project)

`https://fvgd.vercel.app` may show **404** until you add it under Vercel → **Domains** → assign to project **fvgd**, or use the alias command below.

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

## Dashboard settings (important)

In **Settings → General → Build & Development Settings**, either:

- Turn **Override** OFF for Build Command and Output Directory (recommended — use `vercel.json`), **or**
- Set them manually to match exactly:

| Setting | Value |
|---------|--------|
| Framework Preset | Other |
| Root Directory | `.` (repo root) |
| Build Command | `node scripts/vercel-build.js` |
| Output Directory | `public` |
| Install Command | `echo skip` |

If Output Directory is `public` but Build Command does not run `vercel-build.js`, you will see: *No Output Directory named "public" found*.

---

## Local development

```powershell
copy js\config.example.js js\config.js
# Edit js\config.js with your anon key and supabaseEnabled: true
```

Or keep defaults for offline play.

---

## Verify

1. Open **https://fvgd-flax.vercel.app** (this project's production URL).
2. Title screen: **Class Multiverse Overworld**.
3. Browser console (F12): `Canvas ready.`
4. Press **Enter** → overworld or login (if Supabase env is set).
5. Admin: **https://fvgd-flax.vercel.app/admin**

### If `fvgd.vercel.app` shows 404 but deploy is Ready

The game is deployed; that hostname is **not linked** to this project. Vercel assigned **fvgd-flax.vercel.app** instead.

**Fix options:**

1. **Use the working URL:** https://fvgd-flax.vercel.app (share this with students).
2. **Reclaim `fvgd.vercel.app`:** Vercel → Domains → find `fvgd.vercel.app` on another project → remove it → add it to project **fvgd** → Production.
3. Or add a custom domain (e.g. `fvgd.aeonsmash.com`) under project **fvgd**.

### If every URL shows 404

- Check **Deployments** for a failed build (red).
- Build logs should end with `Vercel build OK: public/ output ready`.
- **Build Command:** `node scripts/vercel-build.js` · **Output Directory:** `public`

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
