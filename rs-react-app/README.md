# RS React App

React SPA created as part of the RS School React course.

## Features

- Character search using the Rick and Morty API
- Pagination with page state reflected in the URL
- Master-detail view with React Router `Outlet`
- About and 404 pages
- Error boundary and loading states

## Tech Stack

React, TypeScript, Vite, React Router, Tailwind CSS, Vitest, Redux Toolkit (RTK Query).

## Environment

Copy `.env.example` to `.env` and set `VITE_CACHE_TTL` — RTK Query cache TTL in seconds (`keepUnusedDataFor`).

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
```
