# ADR: Client-side Routing with React Router

## Status

Accepted

## Context

The app needs:

- shareable URLs
- browser back/forward support
- stable shell with page swaps inside a single app runtime

The current project does not require SSR or server-side data loading.

## Decision

Use `react-router-dom` with `createBrowserRouter`.

Current routes:

- `/` -> redirect to `/home`
- `/home` -> Home page
- `/about` -> About page
- `/projects` -> Projects page
- `/projects/:slug` -> Project detail page (slug-driven)

`AppShell` is the layout route element and renders active page content via `Outlet`.
Route pages are loaded with `React.lazy` and wrapped in `Suspense`.
Invalid or missing project detail slugs are redirected to `/projects`.

## Consequences

Positive:

- URL is the single source of navigation state.
- Pages are directly linkable/bookmarkable.
- Layout route cleanly supports persistent shell architecture.
- Lazy route loading reduces initial bundle pressure.
- Redirect fallback for bad slugs avoids broken detail views.

Negative:

- Requires SPA fallback rewrites in hosting environments.
- No SSR benefits (initial HTML is minimal and client-rendered).
