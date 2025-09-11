# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Router v7 hospital dashboard frontend application that uses GraphQL with Apollo Client for data management. The app implements role-based access control with three user types: super, admin, and staff.

## Development Commands

```bash
# Install dependencies
npm install

# Development server (uses React Router dev mode)
npm run dev

# Build production bundle
npm run build

# Type checking (generates React Router types + TypeScript check)
npm run typecheck

# Generate GraphQL types from backend schema
npm run codegen

# Watch mode for GraphQL codegen
npm run codegen:watch

# Start production server
npm start
```

## Architecture

### Tech Stack
- **Framework**: React Router v7 with SSR support
- **UI Components**: Custom components built with Radix UI primitives
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite
- **State Management**: Apollo Client with GraphQL
- **Form Handling**: React Hook Form with Zod validation
- **Data Tables**: TanStack Table v8

### Project Structure
- `/app/features/` - Feature-based modules organized by user role
  - `/admin/` - Admin dashboard pages
  - `/staff/` - Staff dashboard pages  
  - `/super/` - Super admin pages
  - `/common/` - Shared pages (hospitals, employees, patients)
  - `/auth/` - Authentication pages
- `/app/components/` - Reusable UI components
  - `/ui/` - Base UI components (button, dialog, etc.)
  - `/common/` - App-specific shared components
- `/app/graphql/` - Generated GraphQL types and operations
- `/app/lib/` - Core utilities and Apollo setup
- `/app/hooks/` - Custom React hooks

### Routing
Routes are defined in `/app/routes.ts` using React Router's new route configuration. The app uses layout-based routing with a dashboard layout wrapping authenticated pages.

### GraphQL Integration
- Apollo Client is configured for both SSR and client-side rendering
- Separate client instances in `apollo-client-server.ts` and `apollo-client-client.ts`
- GraphQL operations are auto-generated from `.tsx` and `.ts` files using GraphQL Code Generator
- Backend URL configured via `VITE_BACKEND_URL` environment variable (defaults to `http://localhost:3000`)

### Authentication
Cookie-based authentication using `refresh_token`. Login state is managed through Apollo reactive variables (`isLoggedInVar`).

### Naming Conventions

**Pages**: Role-based prefix pattern
- Super pages: `super-{feature}-{action}.tsx` (e.g., `super-users-index.tsx`)
- Admin pages: `admin-{feature}-{action}.tsx` 
- Staff pages: `staff-{feature}-{action}.tsx`
- Common pages: `{feature}-{action}.tsx` (e.g., `patient-index.tsx`)

**Components**: PascalCase for component files and exports

**GraphQL**: Operations defined inline in components, types generated to `/app/graphql/`

## Performance Optimizations Applied

### Security Improvements
- Environment variables properly configured with `.env.example` template
- localStorage usage replaced with safe storage wrapper (`~/lib/safe-storage.ts`)
- All `console.log` statements removed from production code

### Performance Enhancements
- **React Optimizations**: `useMemo`, `useCallback`, and `React.memo` applied to key components
- **Apollo Client Caching**: Configured type policies and fetch strategies for optimal caching
- **Code Splitting**: Vite configured with manual chunks for better bundle splitting
- **Loading States**: Skeleton loading components for better user experience

### Architecture Improvements
- **DataTable Component**: Fully optimized with memoization and efficient event handlers
- **Patient Lists**: O(1) lookup performance using Map data structures instead of array.find()
- **Cache Policies**: Separate cache configurations for client/server with appropriate fetch policies

## Important Notes

- Path aliases configured: `~/*` maps to `./app/*`
- TypeScript strict mode is enabled
- The project uses React 19 with the new JSX transform
- Environment variables should be configured using `.env` (not tracked) based on `.env.example`
- Use `safeStorage` utility instead of direct localStorage access