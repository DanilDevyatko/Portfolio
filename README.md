# Portfolio

Personal portfolio SPA built with React, TypeScript, and Vite.
The app uses a persistent shell, lazy-loaded route pages, markdown-driven content, reusable shared UI, and interactive visual widgets.

## Current Scope

- One app in this repo: `apps/portfolioWeb`
- Pages: `Home`, `About`, `Projects`, `Project Detail`, and `Not Found`
- Route map:
  - `/` -> redirect to `/home`
  - `/home`
  - `/about`
  - `/projects`
  - `/projects/:slug`
  - `*` -> in-shell 404 page
- Client-only runtime (no SSR)
- Project detail pages are URL-driven by `slug` and rendered from markdown files in `src/content/projects/*.md`
- Back navigation is standardized through:
  - `useEscapeBackNavigation` (Escape key)
  - `BackButton` reusable component (`src/shared/ui/BackButton/BackButton.tsx`)

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
- The shell fades the content edge and shows a scroll hint only when route content actually overflows.
- CV data lives in `src/content/profile.ts` and `src/content/projects.ts`; replace `public/Danylo_Deviatko_CV.pdf` when the CV changes.
- Path alias `@shared-ui/*` resolves to `apps/portfolioWeb/src/shared/ui/*` (configured in Vite + TypeScript).
- See `docs/architecture.md` for deeper implementation details.
