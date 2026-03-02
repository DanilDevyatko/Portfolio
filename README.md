# Portfolio

Personal portfolio SPA built with React, TypeScript, and Vite.
The app uses a persistent shell, lazy-loaded route pages, markdown-driven content, and interactive visual widgets.

## Current Scope

- One app in this repo: `apps/portfolioWeb`
- Pages: `Home`, `About`, `Projects`, and `Project Detail`
- Route map:
  - `/` -> redirect to `/home`
  - `/home`
  - `/about`
  - `/projects`
  - `/projects/:slug`
- Client-only runtime (no SSR)
- Project detail pages are URL-driven by `slug` and rendered from markdown files in `src/content/projects/*.md`

## Tech Stack

- React 19
- TypeScript (strict mode)
- Vite 7
- React Router 7
- Framer Motion (page transitions)
- GSAP (crowd canvas animation)
- React Markdown (content rendering)
- CSS Modules + global CSS tokens
- ESLint 9
- Vitest + Testing Library
- pnpm workspace

## Repository Layout

- `apps/portfolioWeb` - web app source and config
- `docs/architecture.md` - architecture overview
- `docs/adr` - architecture decision records

## Run Locally

From repository root:

```bash
pnpm install
pnpm --filter portfolioweb dev
```

Alternative (from app directory):

```bash
pnpm install
pnpm dev
```

## Build and Lint

```bash
pnpm lint
pnpm build
pnpm --filter portfolioweb preview
```

## Test

```bash
pnpm test
```

## Notes

- Route pages are lazy-loaded in `src/app/router.tsx`.
- Invalid project slugs redirect to `/projects`.
- Motion-heavy visuals are disabled when `prefers-reduced-motion: reduce` is active.
- See `BEST_PRACTICES_REPORT.md` for a detailed change report.
