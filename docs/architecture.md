# Architecture

This document describes the current architecture of the portfolio app in this repository.

## 1) Scope

- App: `apps/portfolioWeb`
- Runtime: client-side React + Vite
- Purpose: personal portfolio with app-shell navigation and markdown-driven content

## 2) High-Level Model

The app is a single-page application with a persistent shell. Route pages are rendered inside the shell via React Router `Outlet`.

```text
ReactDOM.createRoot
  -> RouterProvider(router)
     -> AppShell (persistent)
        -> Header/intro markdown
        -> BottomNav (persistent)
        -> Animated Outlet content (route pages)
        -> Visual widgets (Crowd simulator, mouse follower)
```

Key behavior:

- `AppShell` stays mounted across route changes.
- Route page content swaps in/out with `framer-motion` animations.
- A timed preloader overlays first paint (`Danylos Deviatko Portfolio`, word-by-word animation).

## 3) Routing

Defined in `apps/portfolioWeb/src/app/router.tsx`.

Current route map:

- `/` -> redirect to `/home`
- `/home` -> `HomePage`
- `/projects` -> `ProjectsPage`
- `/info` -> `InfoPage`

Notes:

- Navigation state is URL-driven through `NavLink` active state.
- The router is browser-history based (`createBrowserRouter`).

## 4) Source Layout and Responsibilities

Location: `apps/portfolioWeb/src`

```text
app/
  AppShell.tsx             # persistent layout + transition orchestration + preloader
  AppShell.module.css      # shell/layout styles
  router.tsx               # route tree
  styles/
    tokens.css             # design tokens (CSS variables)
    globals.css            # global reset/base rules

pages/
  HomePage.tsx
  ProjectsPage.tsx
  InfoPage.tsx             # route-level composition only

content/
  appShell.md
  home.md
  projects.md
  info.md                  # markdown source of page content

shared/content/
  appShell.ts
  home.ts
  projects.ts
  info.ts                  # markdown accessors

widgets/
  Nav/
  CrowdSimulator/
  MouseFollower/           # reusable UI widgets

assets/
  crowed.png               # sprite sheet/image assets
```

Boundary rules (current intent):

- `app/` composes the application and can import from other layers.
- `pages/` should stay thin; mostly render markdown/content.
- `widgets/` contain reusable UI behavior and visuals.
- `shared/` contains low-level content helpers.

## 5) Content Architecture

Content is markdown-first:

- Raw markdown lives under `src/content/*.md`.
- Pages consume markdown via typed accessor functions in `src/shared/content/*.ts`.
- Markdown rendering is done with `react-markdown`.
- In `ProjectsPage`, links are explicitly rendered with `target="_blank" rel="noopener noreferrer"`.

This keeps copy editable without changing page component structure.

## 6) Styling Strategy

- Global style foundation:
  - `tokens.css` for shared design variables
  - `globals.css` for base element styles and layout defaults
- Component styles:
  - CSS Modules (`*.module.css`) for shell and widgets

Current notable layout decisions:

- `AppShell` owns primary spacing, outlet container, and simulator placement.
- `CrowdSimulator` visual area is constrained via module CSS.
- Overflow/viewport behavior is tuned for mobile and desktop differences.

## 7) Animation and Interaction

- Route transitions: `framer-motion` (`AnimatePresence` + `motion.div`) in `AppShell`.
- Background crowd animation: `gsap` in `widgets/CrowdSimulator/CrowdSimulator.tsx`.
- Mouse follower: enabled only for fine pointer/hover-capable devices (`matchMedia('(hover: hover) and (pointer: fine)')`).

## 8) Tooling and Quality Gates

From `apps/portfolioWeb/package.json`:

- Package manager: `pnpm` (workspace root managed by `pnpm-workspace.yaml`)
- Build: `tsc -b && vite build`
- Dev server: `vite`
- Lint: `eslint .`
- TypeScript: strict compiler settings (see `tsconfig*.json`)

Commands:

```bash
pnpm --filter portfolioweb dev
pnpm --filter portfolioweb lint
pnpm --filter portfolioweb build
```

## 9) Current Tradeoffs / Follow-Ups

- `CrowedSimulator` export alias exists for backward compatibility with existing imports; canonical naming should be standardized to `CrowdSimulator`.
- Preloader is currently timer-driven; if needed, it can be switched to asset-readiness-driven completion.
- Markdown is local and static; no CMS/backend integration is currently in scope.

## 10) Architectural Summary

The current project is a clean client-side SPA with:

- URL-driven navigation
- a persistent animated app shell
- markdown-managed content
- isolated widget effects
- modern React + TypeScript + Vite tooling

This structure is suitable for iterative portfolio growth without introducing backend or heavy framework complexity.
