# Repository Guidelines

## Project Structure & Module Organization
- `app/` contains the React Router entry (`app/index.tsx`), feature folders (e.g., `app/features/admin`), shared UI (`app/components/ui`), and reusable hooks under `app/hooks`.
- Generated GraphQL assets live in `app/graphql/`; keep custom logic in feature code so regeneration stays conflict-free.
- `public/` stores static assets, and `scripts/` holds schema/codegen helpers used by CI.
- Update root tooling files (`vite.config.ts`, `tsconfig.json`, `graphql.config.yml`, `schema.json`) when a feature alters build settings or API shape.

## Build, Test & Development Commands
- `npm install` installs dependencies (lockfile is npm-based; please avoid yarn/pnpm).
- `npm run dev` starts the React Router dev server with hot reload for dashboards.
- `npm run build` emits the production bundle in `build/`; `npm run start` serves that output for smoke tests.
- `npm run typecheck` generates router types then runs `tsc` to catch navigation and typing regressions.
- `npm run codegen` or `npm run codegen:watch` refresh GraphQL types from `schema.json`; rerun whenever queries or schema change.
- `scripts/test-schema-generation.sh` and `scripts/test-codegen.sh` guard against schema drift—run them before pushing backend-facing changes.

## Coding Style & Naming Conventions
- Run Prettier (`.prettierrc` → 2 spaces, semicolons, single quotes, 100-char width) with the Tailwind plugin so class names stay sorted.
- Keep components `PascalCase` (see `app/components/ui/sidebar.tsx`), hooks/utilities `camelCase`, and multi-word files `kebab-case` (e.g., `dropdown-menu.tsx`).
- Place shared styles in `app/app.css` and cross-feature helpers in `app/lib` to avoid scattering globals.

## Testing & Quality Gates
- Formal unit tests are pending; rely on `npm run typecheck` plus GraphQL codegen checks to keep regressions out.
- For complex flows, add playground routes in `app/routes.ts` or lightweight scripts in `scripts/` so others can replay scenarios.
- Commit regenerated `schema.json` and `app/graphql/types.ts` whenever API models move.

## Commit & Pull Request Guidelines
- Use short, imperative commits, optionally prefixed with context (`fix:`, `feat:`); e.g., `fix: resolve hook ordering`.
- Reference issues in the body or PR template; Korean or English is fine if concise.
- Attach UI screenshots/GIFs, mention schema updates, and list manual checks (typecheck, build, codegen) so reviewers can reproduce results.

## Environment & API Notes
- Copy `.env.example` to `.env`, fill in backend-supplied secrets, and keep credentials out of Git.
- Touch `apollo.config.js` or `graphql.config.yml` only when endpoints move, coordinating schema fetch changes with backend owners.

## Languages
- Answer me all in Korean.