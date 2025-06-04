import {ApolloClient} from "@apollo/client/core"
import {InMemoryCache} from "@apollo/client/cache"
import {HttpLink} from "@apollo/client/link/http"
import {from, ApolloLink} from "@apollo/client/link/core"
import {onError} from '@apollo/client/link/error';

// Type import
import type { NormalizedCacheObject } from '@apollo/client';

// Get the backend URL from environment variables for server-side
const BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:3000';

// Create an error handling link
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

// Create an HTTP link to the GraphQL server
const createHttpLink = (req?: Request) => new HttpLink({
  uri: `${BACKEND_URL}/graphql`,
  credentials: 'include', // Include cookies for authentication if needed
  headers: {
    Cookie: req?.headers.get('cookie')||'',
  },
});

let _serverApolloClient:InstanceType<typeof ApolloClient<NormalizedCacheObject>>|undefined;
const createCookieContext = ()=>new ApolloLink( (operation, forward) => {
  const context = operation.getContext();
  const headers = context.headers || {};
  operation.setContext({
    headers: {
      cookie: headers.cookie || '',
    },
  });
  return forward(operation);
});

// Function to create a new Apollo Client instance for server-side rendering
export function createServerApolloClient(initialState = {}) {
  // Create a new Apollo Client for server-side rendering
  const apolloClient = _serverApolloClient ?? new ApolloClient({
    ssrMode: true, // Always true for server-side
    link: from([errorLink, createCookieContext(), createHttpLink()]),
    cache: new InMemoryCache().restore(initialState),
  });

  if(!_serverApolloClient) _serverApolloClient = apolloClient;

  return apolloClient;
}

export const serverApolloClient = createServerApolloClient();
