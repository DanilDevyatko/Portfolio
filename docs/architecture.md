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
        -> Nav (Home, Projects)
        -> outletWrapper (scroll container)
           -> animated route page
        -> MouseFollower (desktop/fine-pointer only)
        -> CrowdSimulator (canvas background strip)
```

## 3. Routing

Source: `src/app/router.tsx`

- `/` -> `<Navigate to="/home" replace />`
- `/home` -> `HomePage`
- `/projects` -> `ProjectsPage`

Router type: `createBrowserRouter`.

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
  ProjectsPage.tsx

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
  projects.md

shared/content/
  appShell.ts
  socials.ts
  home.ts
  projects.ts

assets/
  logo.png
  crowed.png
```

## 5. Content Flow

- Raw copy is authored in `src/content/*.md`.
- Content accessors in `src/shared/content/*.ts` expose markdown to pages/shell.
- Rendering is done by `react-markdown`.
- `ProjectsPage` overrides `<a>` rendering to force `target="_blank"` and `rel="noopener noreferrer"`.

## 6. UI Composition

- `AppShell` orchestrates persistent layout and route transitions.
- `Nav` reflects route state via `NavLink` active styles.
- `HomePage` transforms `home.md` into sentence chunks and renders them through `RotatingSentences`.
- `ProjectsPage` renders markdown project entries.
- `Preloader` overlays initial render for 3200ms.

## 7. Styling System

- Global tokens: `app/styles/tokens.css`
- Global element rules/reset: `app/styles/globals.css`
- Local component styles: CSS Modules (`*.module.css`)

Important layout behavior:

- `.main` is a flex column container with hidden outer overflow.
- `.outletWrapper` is the scroll container (`overflow-y: auto`, `min-height: 0`).
- `CrowdSimulator` is kept as a separate flex item so content scrolling does not push it out.

## 8. Motion and Interaction

- Route transitions: `framer-motion` (`AnimatePresence` + `motion.div`) in `AppShell`.
- Crowd animation: `gsap` ticker rendering sprite peeps on canvas.
- Mouse follower: enabled only when `(hover: hover) and (pointer: fine)` matches.

## 9. Tooling

App package scripts (`apps/portfolioWeb/package.json`):

- `dev`: `vite`
- `build`: `tsc -b && vite build`
- `lint`: `eslint .`
- `preview`: `vite preview`

TypeScript:

- strict mode enabled in `tsconfig.app.json`
- no emit in app config (`noEmit: true`)

## 10. Current Tradeoffs

- `CrowedSimulator` is still exported as a compatibility alias for existing imports; canonical component name is `CrowdSimulator`.
- Preloader completion is timer-based, not tied to asset readiness.
- Content is local markdown; there is no CMS/backend layer.
