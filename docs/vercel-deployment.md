# Vercel Deployment

## Connect GitHub (one-time)

1. Open [Vercel fvgd project](https://vercel.com/aeonsmashs-projects/fvgd).
2. **Connect Git Repository** → `AeonSmash/FVGD`.
3. Framework: **Other**
4. Root directory: `/`
5. Build command: `node scripts/inject-config.js`
6. Output directory: `.`
7. Install command: (leave empty or `echo skip`)

## Environment variables

Set in Vercel → Settings → Environment Variables:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ixpfcghaorhidmrtnaez.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

Redeploy after adding variables so `js/config.js` is generated with `supabaseEnabled: true`.

## Local development

Copy `js/config.example.js` to `js/config.js` and paste your anon key, or keep `supabaseEnabled: false` for offline play.

## Verify

Production URL should show the title screen and log `Canvas ready.` in the browser console.
