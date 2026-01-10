# ADR: Styling with CSS Modules and Global Design Tokens

## Status

Accepted

## Context

The project requires predictable, maintainable styling with clear ownership and minimal runtime overhead.

Constraints:

- Avoid global CSS collisions
- Avoid runtime styling solutions
- Enable safe refactoring as the app grows
- Keep styling boring and explicit

Pure global CSS would scale poorly, while runtime CSS-in-JS solutions introduce unnecessary complexity for this project.

## Decision

Use a two-layer styling approach:

1. **Global styles**

   - `tokens.css` for design tokens (spacing, colors, typography)
   - `globals.css` for base rules (reset, body defaults)

2. **Local styles**
   - CSS Modules (`*.module.css`) for component-level styling

Class names are scoped at build time, and tokens provide a shared visual language across the app.

## Consequences

### Positive

- No global class name collisions
- Clear style ownership per component
- Zero runtime styling cost
- Easy refactoring and deletion of components
- Tokens enable consistent visual language

### Negative

- Requires discipline in file naming and imports
- Slight verbosity compared to utility-first approaches
