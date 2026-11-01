# SERVORA

Urban Company–inspired **service aggregator** with original branding and five primary routes.

**Tagline:** Reliable services. Smarter choices. Less hassle.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4, Lucide React
- **Backend:** Route Handlers + JSON file store (`data/servora-db.json`)
- **Auth:** JWT session cookie (`jose` + `bcryptjs`)
- **Server Actions:** Assistant recommendations (`getRecommendations`)

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — search, categories, smart finder, trust |
| `/explore` | Browse, filter, sort, compare, service drawer (URL-synced `q` / `category`) |
| `/assistant` | Rule-based problem → service recommendations (server action) |
| `/book` | Professional match, schedule, pricing, confirm |
| `/dashboard` | My bookings (server when signed in, localStorage for guests) |

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Demo account:** `demo@servora.app` / `demo123`

**Why pages feel slow in dev:** Next.js compiles each route on first visit. For a snappy demo:

```bash
npm run build
npm start
```

## API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/logout` | Sign out |
| GET | `/api/auth/me` | Current user |
| GET/POST | `/api/bookings` | List / create bookings (auth required) |
| POST | `/api/bookings/sync` | Merge guest bookings after login |
| PATCH | `/api/bookings/[id]` | Update status or rating |

Set `SESSION_SECRET` in production.

## Demo data

Service catalogue and professionals remain **sample data** in `src/data/services.ts`. Payments are not processed.

Guest bookings persist in `localStorage` (`servora_bookings_v1`) until you sign in; then they sync to the server.

## Tests

```bash
npm run build
npm run test:e2e
```

Playwright starts `npm run start` automatically (see `playwright.config.ts`).

## Build

```bash
npm run build
npm start
```
