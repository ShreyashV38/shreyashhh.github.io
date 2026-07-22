# Cyberpunk Developer Portfolio

A full-stack personal portfolio website with a cyberpunk visual theme, a tRPC API layer, a MySQL-backed peer review system, and dual deployment targets (Cloudflare Workers and Node.js).

**Live:** [shreyashh.me](https://shreyashh.me)

## Motivation

Most developer portfolios are static pages. This one is a full-stack application with real backend functionality: visitors can submit contact messages (persisted to a database and forwarded via email), leave peer reviews with ratings, and like content -- all through a type-safe API. The cyberpunk aesthetic is built entirely with CSS and GSAP, without any UI template or theme library.

## Key Features

- **Database-backed peer review system** -- visitors submit reviews with star ratings; other visitors can like them. All state is persisted to MySQL via Drizzle ORM.
- **Contact form with email delivery** -- form submissions are saved to the database and forwarded to the site owner via Resend.
- **Cyberpunk UI built from scratch** -- parallax city background (GSAP + ScrollTrigger), animated grid overlays, custom cursor, neon glow effects, and staggered scroll-reveal animations. No prebuilt theme.
- **End-to-end type safety** -- tRPC connects the React frontend to the Hono backend with shared TypeScript types and Zod input validation. No REST endpoint definitions or manual type wiring.
- **Dual deployment targets** -- a single Hono app (`api/boot.ts`) runs on both Cloudflare Workers (with Hyperdrive for database connection pooling) and a standard Node.js server.
- **Product analytics** -- PostHog integration tracks page views, CTA clicks, social link clicks, and form submissions.

## Tech Stack

| Layer       | Technologies                                                    |
| ----------- | --------------------------------------------------------------- |
| Frontend    | React 19, TypeScript, Vite 7, Tailwind CSS 3, GSAP, shadcn/ui  |
| Backend     | Hono, tRPC, Zod, Drizzle ORM, Resend                           |
| Database    | MySQL (via Drizzle ORM + Hyperdrive on Workers)                 |
| Deployment  | Cloudflare Workers (primary), Node.js (secondary)               |
| Analytics   | PostHog                                                         |
| Build tools | esbuild (Worker bundle), Vite (frontend), TypeScript            |

## Architecture

```
Browser (React SPA)
  │
  │  tRPC (HTTP batch, superjson)
  ▼
Hono Server  ──  api/boot.ts (shared entry)
  ├── api/worker.ts  →  Cloudflare Workers (static assets via Workers Assets)
  └── api/node.ts    →  Node.js (@hono/node-server, serves static files from dist/)
  │
  │  Drizzle ORM
  ▼
MySQL
  └── Hyperdrive connection pooling (Workers only)
```

The Hono app is the single source of truth for both runtimes. On Cloudflare Workers, a middleware bridges Worker bindings into `process.env` so application code (database connections, Resend, etc.) works identically in both environments. The esbuild-based `build-worker.mjs` script handles bundling for Workers, injecting a CJS `require()` shim so Node built-in imports resolve correctly under the `nodejs_compat` flag.

## Setup

### Prerequisites

- Node.js 20+
- A MySQL database (local or remote)
- (Optional) A [Resend](https://resend.com) API key for contact form emails
- (Optional) A [PostHog](https://posthog.com) project for analytics

### Install and run locally

```bash
cd app
cp .env.example .env
# Fill in DATABASE_URL (required), RESEND_API_KEY, and PostHog keys in .env

npm install
npm run db:push       # Apply schema to your database
npm run dev           # Starts Vite dev server + Hono API on http://localhost:3000
```

### Build for production

```bash
npm run build         # Builds frontend (Vite), Worker bundle (esbuild), and Node bundle (esbuild)

# Run with Node.js:
npm start             # NODE_ENV=production node dist/node.js

# Or deploy to Cloudflare Workers:
npx wrangler deploy
```

## Usage

Once running, the site is accessible at `http://localhost:3000`. The main sections are:

- **Hero** -- name, status badge, social links, resume download
- **About** -- bio with a `developer.json` code block and tech stack tags
- **Projects** -- filterable project cards with links to GitHub repos and live demos
- **Skills** -- categorized tech stack display
- **Timeline** -- education and experience timeline
- **Certificates** -- certifications with dedicated detail pages
- **Reviews** -- peer review submission form and live review feed
- **Contact** -- contact form with portfolio like button

The tRPC API is available at `/api/trpc/*`. You can verify the server is running:

```bash
curl http://localhost:3000/api/trpc/ping
# {"result":{"data":{"json":{"ok":true,"ts":1721000000000}}}}
```

## Notable Technical Challenges

- **Single codebase, two runtimes.** The Hono server runs unmodified on both Cloudflare Workers and Node.js. This required writing a custom esbuild pipeline (`build-worker.mjs`) that bundles the backend for the Workers runtime, marks all Node built-ins as external, and injects a `require()` polyfill shim so CJS dependencies (like `mysql2`) resolve correctly under Workers' `nodejs_compat` flag.
- **Cloudflare Hyperdrive cold-start handling.** Workers cold starts occasionally fail the first database query while Hyperdrive initializes the connection pool. The tRPC client is configured with `retry: 1` on mutations, and the Hono middleware bridges Hyperdrive's dynamic connection string into `process.env.DATABASE_URL` at request time (not module load time) so the same Drizzle ORM code works in both environments.
- **CSS-only cyberpunk aesthetic.** All visual effects -- neon glows, animated grid overlays, parallax backgrounds, clipped polygon buttons, staggered scroll reveals -- are implemented with raw CSS, GSAP, and IntersectionObserver. No theme library, no canvas, no WebGL. The parallax city background uses GSAP ScrollTrigger with mouse-tracking for a subtle 3D depth effect.
