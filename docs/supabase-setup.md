# Supabase Setup

Project: [ixpfcghaorhidmrtnaez](https://supabase.com/dashboard/project/ixpfcghaorhidmrtnaez)

## 1. Run migrations

In Supabase Dashboard → SQL Editor, run in order:

1. [supabase/migrations/001_schema.sql](../supabase/migrations/001_schema.sql)
2. [supabase/migrations/002_rls.sql](../supabase/migrations/002_rls.sql)
3. [supabase/migrations/003_seed_rewards.sql](../supabase/migrations/003_seed_rewards.sql)

Or with Supabase CLI: `supabase db push`

## 2. Deploy Edge Functions

```bash
supabase functions deploy login --project-ref ixpfcghaorhidmrtnaez
supabase functions deploy enroll_student --project-ref ixpfcghaorhidmrtnaez
supabase functions deploy reset_pin --project-ref ixpfcghaorhidmrtnaez
```

Functions use `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from the project automatically.

## 3. Vercel environment variables

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon public key |

Redeploy after setting variables.

## 4. Enroll students

Open `/admin/index.html` on your deployed site (or locally). Paste service role key, enroll CSV rows:

```text
P1,15,Jordan Smith,123456
```

## 5. Verify login

Student enters class `P1`, ID `15`, PIN `123456` on login screen.
