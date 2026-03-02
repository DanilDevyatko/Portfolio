# Architecture

This document describes the current architecture of `apps/portfolioWeb`.

## 1. Scope

- Runtime: client-side SPA (React + Vite)
- Domain: personal portfolio
- Hosting model: static app with SPA fallback rewrite (`vercel.json`)

## 2. High-Level Model

The app uses a persistent shell (`AppShell`) and URL-driven page content via React Router `Outlet`.

```text
main.tsx
  -> RouterProvider(router)
     -> AppShell (persistent)
        -> header markdown (name + role)
        -> socials markdown links
        -> Nav (Home, About, Projects)
        -> outletWrapper (scroll container)
        -> animated route page
        -> MouseFollower (desktop/fine-pointer + no reduced-motion)
        -> CrowdSimulator (canvas background strip, disabled for reduced-motion)
```

## 3. Routing

Source: `src/app/router.tsx`

- `/` -> `<Navigate to="/home" replace />`
- `/home` -> `HomePage`
- `/about` -> `AboutPage`
- `/projects` -> `ProjectsPage`
- `/projects/:slug` -> `ProjectDetailPage`

Router type: `createBrowserRouter`.
Pages are lazy-loaded via `React.lazy` + `Suspense`.

## 4. Source Layout

`apps/portfolioWeb/src`

```text
app/
  router.tsx
  AppShell.tsx
  AppShell.module.css
  styles/
    tokens.css
    globals.css

pages/
  HomePage.tsx
  AboutPage.tsx
  ProjectsPage.tsx
  ProjectDetailPage.tsx

widgets/
  Nav/
  RotatingSentences/
  CrowdSimulator/
  MouseFollower/
  preloader/

content/
  appShell.md
  socials.md
  home.md
  about.md
  projects.md
  projects.ts
  projects/
    *.md

shared/content/
  home.ts
  projects.ts

assets/
  logo.ico
  crowed.png
```

## 5. Content Flow

- Base copy is authored in `src/content/*.md`.
- `AppShell`, `HomePage`, `AboutPage`, and `ProjectDetailPage` load markdown through `import.meta.glob(..., { query: '?raw', import: 'default', eager: true })`.
- Project list metadata (slug, title, live URL) is authored in `src/content/projects.ts` as `projectMeta`.
- Project detail markdown is resolved by slug from `src/content/projects/<slug>.md`.
- Markdown rendering is done by `react-markdown`.

## 6. UI Composition

- `AppShell` orchestrates persistent layout and route transitions.
- `Nav` reflects route state via `NavLink` active styles.
- `HomePage` transforms `home.md` into sentence chunks and renders them through `RotatingSentences`.
- `ProjectsPage` renders project links from `projectMeta`.
- `ProjectDetailPage` renders a back button, linked title, and markdown body for the selected slug.
- `AboutPage`, `ProjectsPage`, and `ProjectDetailPage` use shared `useEscapeBackNavigation` hook for `Escape` key back navigation with fallback routes.
- `Preloader` overlays initial render for 3200ms.
- Invalid project slug/content redirects to `/projects`.

## 7. Styling System

- Global tokens: `app/styles/tokens.css`
- Global element rules/reset: `app/styles/globals.css`
- Local component styles: CSS Modules (`*.module.css`)

Important layout behavior:

- `.main` is a flex column container with hidden outer overflow.
- `.outletWrapper` is the scroll container (`overflow-y: auto`, `min-height: 0`).
- `.outlet` uses mobile-first top alignment to keep scroll start reachable on small screens, with centered alignment restored at `min-width: 768px`.
- `CrowdSimulator` is kept as a separate flex item so content scrolling does not push it out.

## 8. Motion and Interaction

- Route transitions: `framer-motion` (`AnimatePresence` + `motion.div`) in `AppShell`.
- Crowd animation: `gsap` ticker rendering sprite peeps on canvas.
- Mouse follower: enabled only when `(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)` matches.
- Global CSS includes `prefers-reduced-motion` fallback and explicit `:focus-visible` styles.

## 9. Tooling

App package scripts (`apps/portfolioWeb/package.json`):

- `dev`: `vite`
- `build`: `tsc -b && vite build`
- `lint`: `eslint .`
- `test`: `vitest run`
- `preview`: `vite preview`

Root package scripts (`/package.json`):

- `build`: `pnpm --filter portfolioweb build`
- `lint`: `pnpm --filter portfolioweb lint`
- `test`: `pnpm --filter portfolioweb test`

TypeScript:

- strict mode enabled in `tsconfig.app.json`
- no emit in app config (`noEmit: true`)

## 10. Current Tradeoffs

- `CrowedSimulator` remains exported under its existing name for compatibility with current imports.
- Preloader completion is timer-based, not tied to asset readiness.
- App still depends on a Google Fonts network request at startup.
- There is no dedicated 404 route yet (invalid project slug redirects to `/projects`).
