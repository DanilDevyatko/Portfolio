# ADR: Persistent App Shell with Bottom Navigation

## Status

Accepted

## Context

The portfolio is designed to behave like a mobile application rather than a traditional multi-page website.

Requirements:

- Navigation must feel stable and app-like on mobile
- Layout should not be redefined per page
- Global UI elements (navigation) must persist across screens
- Route-level pages should remain simple and focused on content

Implementing layout independently in each page would lead to duplication, inconsistent behavior, and harder refactoring.

## Decision

Introduce a persistent **App Shell** component that:

- Remains mounted across route changes
- Renders route content via React Router’s `<Outlet />`
- Owns global layout concerns
- Contains a fixed bottom navigation for primary routes

All route-level pages render _inside_ the App Shell rather than defining their own layout.

## Consequences

### Positive

- Layout logic is centralized and predictable
- Pages remain thin and focused on composition
- Navigation state aligns directly with routing state
- Mobile UX feels closer to a native app

### Negative

- Requires careful spacing to avoid content being hidden behind navigation
- Slightly more upfront structure compared to per-page layouts
