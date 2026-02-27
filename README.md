# Portfolio

Personal portfolio SPA built with React, TypeScript, and Vite.
The app uses a persistent shell, route transitions, markdown-driven content, and interactive visual widgets.

## Current Scope

- One app in this repo: `apps/portfolioWeb`
- Pages: `Home` and `Projects`
- Route map: `/` -> redirect to `/home`, plus `/home` and `/projects`
- Client-only runtime (no SSR)

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
pnpm --filter portfolioweb lint
pnpm --filter portfolioweb build
pnpm --filter portfolioweb preview
```
