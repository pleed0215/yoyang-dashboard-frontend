import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

// Server-side GraphQL client
export function createServerApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.BACKEND_URL + '/graphql',
    credentials: 'include',
  });

  const authLink = setContext(async (_, { headers }) => {
    const { cookies } = await import('next/headers');
    if (typeof window === 'undefined') {
      // Get cookies from Next.js headers
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((v) => `${v.name}=${v.value}`)
        .join('; ');

      return {
        headers: {
          ...headers,
          cookie: cookieHeader,
        },
      };
    }
    return { headers };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  return new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    ssrMode: true,
  });
}
// Export a registered Apollo Client for RSC (React Server Components)
export const { getClient: getServerApolloClient } = registerApolloClient(() => {
  return createServerApolloClient();
});
