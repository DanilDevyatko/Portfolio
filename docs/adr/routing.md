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
- `/projects` -> Projects page

`AppShell` is the layout route element and renders active page content via `Outlet`.

## Consequences

Positive:

- URL is the single source of navigation state.
- Pages are directly linkable/bookmarkable.
- Layout route cleanly supports persistent shell architecture.

Negative:

- Requires SPA fallback rewrites in hosting environments.
- No SSR benefits (initial HTML is minimal and client-rendered).
