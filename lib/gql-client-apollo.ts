// Client-side GraphQL client
import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

let clientApolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export function getClientApolloClient() {
  // Create the client only once in the client
  if (typeof window === 'undefined') return null;

  if (!clientApolloClient) {
    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_BACKEND_URL + '/graphql',
      credentials: 'include',
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

    clientApolloClient = new ApolloClient({
      link: from([errorLink, httpLink]),
      cache: new InMemoryCache(),
      ssrMode: false,
    });
  }

  return clientApolloClient;
}
