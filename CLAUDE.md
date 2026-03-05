# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build to `dist/`
- `npm run lint` — ESLint (zero warnings allowed: `--max-warnings 0`)
- `npm run preview` — Preview production build locally

No test framework is configured.

## Architecture

This is a **Minecraft-themed personal portfolio** built with React 18 + Vite. It uses a single-page app structure with manual screen navigation (no router library).

### Navigation & State

`App.jsx` manages all screen state via `useState` across 5 screens: `menu`, `projects`, `contact`, `options`, `education`. Screen transitions go through `LoadingScreen` with a 500ms minimum display. There is no React Router — navigation is state-driven.

### Key Directories

- `src/components/` — All UI components (MainMenu is the main hub page)
- `src/data/` — Static data for projects (`projects.js`) and resume (`resume.js`)
- `src/styles/theme.css` — Minecraft-themed UI styles (beveled buttons, custom scrollbars)

### 3D & Visual Effects

- **Three.js** renders rotating Minecraft blocks in `ProjectBlockIcon.jsx` for project selection
- **Framer Motion** handles animations throughout
- **CursorTrail.jsx** replaces the default cursor with an ink blot trail effect (restricted to content areas)
- Block textures loaded from GitHub CDN URLs

### Contact Form

Uses **EmailJS** (`@emailjs/browser`) for sending emails. Credentials are in env vars prefixed with `VITE_EMAILJS_*`.

### Deployment

- **Vercel** with SPA rewrites configured in `vercel.json`
- **GitHub Pages** via `.github/workflows/deploy.yml` (Node 20, triggers on push to main)
- `public/.nojekyll` and an SPA redirect script in `index.html` support GitHub Pages routing

### Fonts & Theming

- Mojangles font (Minecraft official) loaded in `index.css`
- VT323 Google Font as fallback
- Responsive breakpoint at 640px for mobile; safe area insets for notched devices
