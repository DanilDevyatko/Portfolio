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
        -> body (column on mobile, nav + content row on >=1024px)
           -> Nav (Home, About, Projects)
           -> outletWrapper (clipping + hint overlay host)
        -> outlet (animated route page + scroll container)
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
- `*` -> `NotFoundPage` (rendered inside the shell)

All pages sit under a pathless layout route with `errorElement: <RouteErrorPage />`, so a thrown error or a failed lazy chunk (e.g. right after a deploy) shows a reload screen inside the shell instead of React Router's default developer error page.

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
  HomePage/
  AboutPage/
  ProjectsPage/
  ProjectDetailPage/
  NotFoundPage/        (NotFoundPage + RouteErrorPage)

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
  profile.ts           (intro, stats, experience, skills, education, contact)
  projects.ts          (projectMeta: client, role, period, stack, highlights, links)
  projects/
    *.md

shared/lib/
  canGoBack.ts

shared/ui/
  BackButton/
  Tags/

assets/
  crowed.png
  the-light-bulb.svg

public/
  logo.ico
  robots.txt
  sitemap.xml
  Danylo_Deviatko_CV.pdf
```

## 5. Content Flow

- Base copy is authored in `src/content/*.md`.
- Long-form prose is markdown; structured CV data (stats, experience, skills, project metadata) is typed TS in `src/content/profile.ts` and `src/content/projects.ts`.
- `HomePage` and `AboutPage` import markdown with `?raw`; `AppShell` and `ProjectDetailPage` use `import.meta.glob(..., { query: '?raw', import: 'default', eager: true })`.
- Project metadata (slug, title, client, role, period, summary, stack, highlights, live/repo URLs) is authored in `src/content/projects.ts` as `projectMeta`.
- Project detail markdown is resolved by slug from `src/content/projects/<slug>.md`.
- Markdown rendering is done by `react-markdown`.

## 6. UI Composition

- `AppShell` orchestrates persistent layout and route transitions.
- `Nav` reflects route state via `NavLink` active styles.
- `HomePage` renders `home.md` sentences through `RotatingSentences`, then the intro, key stats and CTAs (projects, CV, email).
- `AboutPage` renders `about.md` plus Experience, Skills, Education and Contact sections from `profile.ts`.
- `ProjectsPage` renders project cards (client, period, summary, stack) from `projectMeta`.
- `ProjectDetailPage` renders `BackButton`, meta header, markdown body, highlights and live/source links.
- Back navigation (`BackButton`, `useEscapeBackNavigation`) only calls `navigate(-1)` when `canGoBack()` sees an in-app history entry, so it never sends a visitor back to the referring site.
- `AboutPage`, `ProjectsPage`, and `ProjectDetailPage` use shared `useEscapeBackNavigation` hook for `Escape` key back navigation with fallback routes.
- `Preloader` overlays initial render for 3200ms, once per browser session (`sessionStorage`).
- Invalid project slug/content redirects to `/projects`.

## 7. Styling System

- Global tokens: `app/styles/tokens.css`
- Global element rules/reset: `app/styles/globals.css`
- Local component styles: CSS Modules (`*.module.css`)

Important layout behavior:

- `.main` is a flex column container with hidden outer overflow.
- `.outletWrapper` provides clipping and overlay positioning (`overflow: hidden`, `min-height: 0`).
- `.outlet` is the route content scroll container (`overflow-y: auto`) with hidden scrollbars.
- `AppShell` computes overflow with `ResizeObserver` + `MutationObserver`; when content is scrollable the outlet bottom fades out and a hint appears (`Swipe to scroll` on mobile, `Scroll for more` on wider screens).
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
- alias: `@shared-ui/*` -> `src/shared/ui/*`

## 10. Current Tradeoffs

- `CrowedSimulator` remains exported under its existing name for compatibility with current imports.
- Preloader completion is timer-based, not tied to asset readiness.
- Primary font (`Montserrat`) is not bundled in the repo; runtime falls back to system fonts when unavailable.
- Invalid project slugs still redirect to `/projects`; other unknown paths render `NotFoundPage`.
- SEO meta, Open Graph and JSON-LD live statically in `index.html`; per-route titles/descriptions are not set yet.
