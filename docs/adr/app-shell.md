# ADR: Persistent App Shell

## Status

Accepted

## Context

The portfolio has shared UI and behavior that must persist while users navigate between pages:

- top identity/header content
- social links
- navigation links
- crowd simulator visual strip
- route transition animations

Duplicating this structure in each route page would increase coupling and drift.

## Decision

Use a persistent `AppShell` as the layout route element in React Router.

- `AppShell` remains mounted across route changes.
- Route content is rendered through `useOutlet()`.
- Route transitions are orchestrated centrally with `AnimatePresence`.
- `AppShell` also owns first-load preloader behavior.

## Consequences

Positive:

- Shared layout and effects are implemented once.
- Route pages stay focused on content.
- Navigation behavior is consistent across pages.
- Transition logic is centralized and easier to tune.

Negative:

- Shell CSS must carefully manage scrolling and layering.
- Route transition orchestration adds lifecycle complexity.
