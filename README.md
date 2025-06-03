# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

## GraphQL with Apollo Client

This project uses Apollo Client for GraphQL operations. TypeScript types for GraphQL operations are automatically generated using GraphQL Code Generator.

### GraphQL Code Generation

The project is configured to generate TypeScript types from your GraphQL schema and operations. This provides type safety for your GraphQL queries, mutations, and fragments.

#### Generate Types

To generate types once:

```bash
yarn codegen
```

#### Watch Mode

To automatically regenerate types when your GraphQL files change:

```bash
yarn codegen:watch
```

### Using GraphQL

1. Define your queries, mutations, and fragments in your component files using the `gql` tag from Apollo Client:

```tsx
import { gql } from "@apollo/client";

export const MY_QUERY = gql`
  query MyQuery {
    someField
  }
`;
```

2. After running the codegen, you can import and use the generated hooks:

```tsx
import { useMyQueryQuery } from "../graphql/graphql";

function MyComponent() {
  const { data, loading, error } = useMyQueryQuery();
  // ...
}
```

---

Built with ❤️ using React Router.
