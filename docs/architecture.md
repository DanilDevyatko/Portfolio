# Architecture

This document describes the architecture of the portfolio project as a small product: the system goals, boundaries, routing model, styling approach, tooling, and key decisions.

---

## 1) Purpose

This project is a mobile-first portfolio built as a product-like web app. The goal is to demonstrate system-level frontend engineering: clear boundaries, explicit decisions, maintainability, and reproducible tooling.

---

## 2) Goals and constraints

### Goals

- **App-like UX on mobile**: persistent shell + bottom navigation.
- **URL-driven navigation**: deep links, refresh-safe routes, correct back/forward behavior.
- **Clear boundaries**: predictable folder responsibilities and low coupling.
- **Scalable content**: allow adding projects/notes without rewriting the structure.
- **Low friction**: boring, proven solutions; minimal runtime magic.

### Constraints (intentional)

- No backend/auth in the initial stage.
- No heavy animation/polish before structure is stable.
- Prefer explicit architecture over “one-file quick hacks”.

---

## 3) High-level design

The app is a client-side React application with a persistent layout and route-driven content rendering.

### Render model

```
RouterProvider
  └─ AppShell (persistent)
       ├─ Main content (Outlet: changes by route)
       └─ BottomNav (persistent)
```

Key idea:

- `AppShell` stays mounted.
- Only the active page changes inside `<Outlet />`.

This produces an “installed app” feeling on mobile.

---

## 4) Routing and navigation

### Route map (current)

- `/home`
- `/work`
- `/me`

`/` redirects to `/home`.

### Why routing is a first-class concept

Routing is treated as application state:

- URLs are shareable (deep links).
- Refresh does not lose context.
- Browser history works (back/forward).
- Bottom navigation becomes a reflection of route state (active link), not custom state.

### Planned extension

- `/work/:projectId` for case studies.
- Nested routes as sections grow (only when needed).

---

## 5) Source code boundaries

Location: `apps/portfolioWeb/src`

Recommended structure:

```
src/
  app/        # app wiring (router, shell, providers, global styles)
  pages/      # route-level screens (thin composition)
  widgets/    # reusable large UI blocks (e.g., BottomNav)
  shared/     # low-level reusable utilities and primitives
```

### Responsibilities and rules

#### `app/` — application composition

Owns: router creation, shell layout, global providers, global styles.

- Can import from anywhere (it composes the app).
- Should contain minimal “business logic”.

#### `pages/` — route-level screens

Owns: composition for a specific route.

- Pages should stay thin.
- Avoid reusable logic here.

#### `widgets/` — reusable UI blocks

Owns: large reusable parts of UI used in multiple places.

- Can keep UI state local.
- Should not depend on specific pages.

#### `shared/` — primitives and utilities

Owns: reusable low-level building blocks.

- Must not import from `app/`, `pages/`, or `widgets/`.

### Import direction

```
app → pages → widgets → shared
```

---

## 6) Styling approach

### Global layer

- `tokens.css` — design tokens (CSS variables).
- `globals.css` — base rules.

### Local layer

- CSS Modules (`*.module.css`) for component-level styles.

---

## 7) Tooling and reproducibility

- pnpm workspace with committed lockfile.
- Strict TypeScript.
- ESLint + Prettier.
- EditorConfig for editor consistency.

---

## 8) Key decisions

### Client-side routing

React Router with layout routes for persistent shell.

### App Shell

Centralized layout with `<Outlet />` and bottom navigation.

### Styling

CSS Modules + global tokens for predictable styling.

---

## 9) Evolution plan

- Content as data (Markdown/JSON).
- Case studies with `/work/:projectId`.
- CI quality gates (typecheck, lint, format).

---

## 10) Glossary

- **App Shell**  
  The persistent layout of the application that remains mounted while route content changes.

- **Outlet**  
  A placeholder component provided by React Router where the active child route renders.

- **Page**  
  A route-level screen mapped directly to a URL and responsible for composing UI for that route.

- **Widget**  
  A reusable UI block composed of smaller elements and used across multiple pages.

- **Shared**  
  The lowest-level layer containing reusable utilities and primitives with no knowledge of app structure.

- **Design Tokens**  
  CSS variables that define shared visual values such as spacing, colors, and typography.
