# Portfolio

This repository contains a mobile-first web app portfolio built as a small product.
The goal is to demonstrate engineering thinking (architecture, decisions, scalability).

## Goals

- App-like mobile experience (routing, persistent shell)
- Clear structure and boundaries (app / pages / widgets / shared)
- Documentation-first development (architecture + ADRs)

## Tech stack

**Core**

- React
- TypeScript (strict)
- Vite
- React Router

**Styling**

- CSS Modules
- Global design tokens (CSS variables)

**Tooling**

- pnpm (workspace-ready)
- ESLint
- Prettier

**Architecture**

- App Shell pattern
- Client-side routing with layout routes
- Mobile-first design

## Repository structure

- `apps/portfolioWeb` — the portfolio web application
- `packages/*` — shared packages
- `docs/` — project documentation
  - `architecture.md` — system overview
  - `adr/` — architecture decision records

## Run locally

From repo root:

```bash
pnpm -C apps/portfolioWeb install
pnpm -C apps/portfolioWeb dev
```
