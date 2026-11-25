SomeThink is a footwear comparison app for the Czech market, built on affiliate product feeds.

I built it alone, end to end — a pnpm monorepo with a Next.js (App Router) web app and a separate worker that imports retailer feeds into PostgreSQL through Prisma.

Every import runs as a dry run first and produces a report. Nothing goes into the catalog before I review it.

This is the project where I go beyond the browser — data modeling, ingestion, Docker, deployment.
