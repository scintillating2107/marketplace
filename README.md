# SERVORA

Urban Company–inspired **service aggregator prototype** with original branding and five primary routes.

**Tagline:** Reliable services. Smarter choices. Less hassle.

## Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS v4, Lucide React, Framer Motion (available)

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — search, categories, smart finder, trust |
| `/explore` | Browse, filter, sort, compare, service drawer |
| `/assistant` | Rule-based problem → service recommendations |
| `/book` | Professional match, schedule, pricing, confirm |
| `/dashboard` | My bookings (localStorage), cancel, rebook, rate |

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Why pages feel slow in dev:** Next.js compiles each route on first visit (often 10–30s on Windows). That is normal for `npm run dev`. For a snappy demo, use production mode:

```bash
npm run build
npm start
```

`npm run dev` uses Turbopack for faster recompiles. Use `npm run dev:webpack` if you need the classic bundler.

## Demo data

All professionals, availability, and payments are **sample/demo only**. Bookings persist in `localStorage` under `servora_bookings_v1`.

## Build

```bash
npm run build
npm start
```
