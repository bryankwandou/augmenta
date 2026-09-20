# Augmenta Institute

Augmenta Institute is a high-performance biotech atelier showcase web application built for the Adaptive Line. It demonstrates modern web engineering with TanStack Start, React 19, TailwindCSS v4, GSAP, and Nitro on Vercel.

## Architecture and Stack

- Framework: TanStack Start (Fullstack React with SSR)
- UI Library: React 19, Radix UI primitives, Lucide icons
- Styling: Tailwind CSS v4, tw-animate-css
- Animation and Smooth Scroll: GSAP 3, Lenis
- Deployment Engine: Nitro preset for Vercel Build Output API v3
- Database and Migrations: Embedded PGLite fallback with optional PostgreSQL migration runner

## Project Structure

```
augmenta/
├── public/          Static public assets, icons, and media
├── server/          Nitro server middleware and PWA handlers
├── src/
│   ├── components/  Landing page, UI primitives, and design system components
│   ├── lib/         Database helpers, auth provider, and app utilities
│   ├── routes/      File-based routes (__root.tsx, index.tsx)
│   └── styles.css   Design tokens, base styles, and animations
├── scripts/         Environment loader, migration runner, and build helpers
├── migrations/      SQL migration files
└── vite.config.ts   Vite, Nitro, and Tailwind configuration
```

## Getting Started

### Prerequisites

- Node.js 20+ (Node.js 24 recommended)
- npm 10+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Type Checking and Tests

```bash
npm run typecheck
npm test
```

## Deployment

The project builds directly to the Vercel Build Output API v3 (`.vercel/output`) and is deployed to Vercel and GitHub.
