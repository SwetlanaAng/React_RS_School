# RS React App

Rick and Morty character search app built for the RS School React course (Next.js SSR module).

## Features

- Character search via the Rick and Morty API with server-side rendering
- Pagination and search state in the URL (`?name=`, `?page=`, `?details=`)
- Master-detail view with a server-driven details panel
- Internationalization (EN / RU) with next-intl
- Server actions for search, card selection, and CSV export
- Redux Toolkit for selected characters, React Context for theme
- About and 404 pages, error boundary, loading states

## Tech Stack

Next.js (App Router), React, TypeScript, next-intl, Tailwind CSS, Redux Toolkit, Vitest.

## Environment

Copy `.env.example` to `.env` and set `NEXT_PUBLIC_CACHE_TTL` — fetch revalidation interval in seconds for server-side API requests.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
npm run test:coverage
```
