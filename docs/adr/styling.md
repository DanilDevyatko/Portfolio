# ADR: CSS Modules with Global Tokens

## Status

Accepted

## Context

The project needs predictable styling with low runtime complexity.
Requirements:

- avoid global selector collisions
- keep component ownership clear
- keep theme primitives centralized
- avoid runtime CSS-in-JS overhead

## Decision

Use a two-layer styling approach:

1. Global foundation
- `src/app/styles/tokens.css` for design tokens (color, spacing, typography, nav sizing)
- `src/app/styles/globals.css` for reset/base element styles

2. Component-local styles
- CSS Modules (`*.module.css`) for `AppShell` and widgets

## Consequences

Positive:

- Scoped class names reduce accidental style leakage.
- Shared tokens keep look-and-feel consistent.
- Styling has no extra runtime engine.

Negative:

- Slightly more file coordination (global vs module files).
- Cross-component visual refactors require touching multiple module files.
