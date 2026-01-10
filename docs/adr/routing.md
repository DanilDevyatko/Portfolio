# ADR: Client-side routing with React Router

## Status

Accepted

## Context

The portfolio is designed as a product-like, mobile-first web application.
Navigation must support:

- Deep links (shareable URLs)
- Browser back/forward behavior
- Page refresh without losing state
- A persistent layout (App Shell)

**_Simple scroll-based navigation or conditional rendering would not satisfy these requirements._**

## Decision

We use client-side routing via `react-router-dom`, specifically:

- `createBrowserRouter`
- A layout route that renders a persistent App Shell
- Route-driven navigation state

URLs represent application state, and the active screen is rendered inside `<Outlet />`.

## Consequences

**Positive**

- Navigation state is explicit and predictable
- Pages are addressable and shareable
- Layout logic is centralized
- Bottom navigation can rely on route state

**Negative**

- Application is client-side only (no SSR initially)
- Routing logic adds a small amount of structural complexity
