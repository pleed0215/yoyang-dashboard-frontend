import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { createServerApolloClient, serverApolloClient } from './lib/apollo-client-server';
import { clientApolloClient, createClientApolloClient } from './lib/apollo-client-client';

import type { Route } from './+types/root';
import './app.css';
import AppearanceSwitch from '~/components/common/appearance-switch';
import { useEffect } from 'react';
import { ThemeProvider } from '~/components/common/theme-provider';
import { isLoggedInVar, updateLoginStatus } from '~/lib/apollo';
import { ME_QUERY } from '~/graphql/queries';
import { MeQuery, UserRole } from '~/graphql/types';
import { Toaster } from '~/components/ui/sonner';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      <link rel="preload" as="font" type="font/woff2" href="/fonts/d2coding.woff2" crossOrigin="anonymous" />
      <link rel="preload" as="font" type="font/woff2" href="/fonts/d2coding-bold.woff2" crossOrigin="anonymous" />
        <title></title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Define the loader to provide initial state for Apollo Client
export async function loader() {
  // Create a new Apollo Client for server-side rendering
  const initialState = serverApolloClient.cache.extract();

  return { apolloState: initialState };
}

export default function App() {
  const { apolloState } = useLoaderData<{ apolloState: any }>();
  const client = clientApolloClient;
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 서버에 토큰 유효성을 확인하는 요청을 보냄
    (async () => {
      try {
        const result = await client.query<MeQuery>({
          query: ME_QUERY, // 사용자 정보를 가져오는 쿼리
          fetchPolicy: 'network-only', // 캐시를 무시하고 항상 서버에 요청
        });

        if (result.data?.me && result.data?.me.data) {
          const { role } = result.data?.me.data;
          updateLoginStatus(true);
          if (pathname.startsWith('/super') && role !== UserRole.Super) {
            window.location.href = '/dashboard';
          }
          if (pathname.startsWith('/admin') && role !== UserRole.Admin) {
            window.location.href = '/dashboard';
          }
          if (pathname.startsWith('/staff') && role !== UserRole.Staff) {
            window.location.href = '/dashboard';
          }
        } else {
          updateLoginStatus(false);
          navigate('/');
        }
      } catch (error) {
        updateLoginStatus(false);
        navigate('/');
      }
    })();
  }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <main className="relative min-w-screen min-h-screen font-d2coding">
          <Outlet />
          <Toaster />
          <AppearanceSwitch />
        </main>
      </ThemeProvider>
    </ApolloProvider>
  );}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
