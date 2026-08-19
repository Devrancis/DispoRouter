# DispoRouter

Automates property-to-buyer matching for real estate wholesale operations. Disposition managers submit inbound land deals through a form; the matching engine validates them against active buyer profiles server-side and flags qualifying matches on the dashboard.

Replaces the manual spreadsheet workflow where deals get cross-referenced against buyer criteria — budget ceiling, minimum square footage, flood zone, seawall requirements — one by one.

---

## How it works

A submitted property is marked as a match when it satisfies all of a buyer's constraints simultaneously:

| Field | Rule |
|---|---|
| Price | Asking price ≤ buyer's budget ceiling |
| Size | Property sqft ≥ buyer's minimum |
| Flood zone | Exact match (X, X500, AE, etc.) |
| Seawall | If buyer requires one, property must have one |

All four must pass. Partial matches are not surfaced.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router, Server Actions) |
| Database | Neon serverless Postgres |
| ORM | Prisma |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Deployment | Vercel |

---

## Project structure

dispo-router/
├── prisma/
│ ├── schema.prisma # Buyer and PropertySubmission models
│ └── seed.ts # Seed script for mock buyer profiles
└── src/app/
├── dashboard/page.tsx # Admin view — match evaluation and deal log
├── submit/page.tsx # Public property submission form
├── actions.ts # Server actions and matching logic
├── globals.css
└── layout.tsx


---

## Getting started

**Prerequisites:** Node.js 18.17+ and a [Neon](https://neon.tech) database instance.

```bash
git clone <your-repo-url>
cd dispo-router
npm install
```

**Configure environment variables:**

```bash
cp .env.example .env
```

```env
# Pooled connection — used at runtime
DATABASE_URL="postgresql://user:password@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true"

# Direct connection — used by Prisma for migrations
DIRECT_URL="postgresql://user:password@ep-sample.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

**Push schema and seed buyers:**

```bash
npx prisma db push
npm run prisma db seed
```

**Run locally:**

```bash
npm run dev
```

- Submission form: `http://localhost:3000/submit`
- Admin dashboard: `http://localhost:3000/dashboard`

---

## Deploying to Vercel

Push to GitHub, import the repo into Vercel, and add `DATABASE_URL` and `DIRECT_URL` to your project's environment variables. Prisma Client generates automatically via the `postinstall` script on build.

---

## Known limitations

- **Flood zone matching is exact-string.** `X` and `X500` are treated as different zones. Make sure your buyer profiles and submission form use the same zone nomenclature, or matches will silently fail.
- **Seed data is destructive.** Running `npm run prisma db seed` more than once will duplicate buyer records. Add a `deleteMany` guard at the top of `seed.ts` if you're iterating on buyer profiles during development.
- **No authentication on the dashboard.** The admin route is publicly accessible. Fine for a local prototype, but add middleware before sharing a deployed link with anyone outside your team.
- **Matching runs per-submission, not retroactively.** If you add a new buyer profile, existing submissions won't be re-evaluated against them. That would need a backfill job or a manual re-trigger.
