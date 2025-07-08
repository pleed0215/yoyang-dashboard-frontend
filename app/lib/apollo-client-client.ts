import {InMemoryCache} from "@apollo/client/cache"
import {ApolloClient, } from "@apollo/client/core"
import {from} from "@apollo/client/link/core"
import {onError} from '@apollo/client/link/error';
import {HttpLink} from "@apollo/client/link/http"
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"

// Type import
import type { NormalizedCacheObject } from '@apollo/client';

// Get the backend URL from environment variables for client-side
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

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
const createHttpLink = () => new HttpLink({
  uri: `${BACKEND_URL}/graphql`,
  credentials: 'include', // Include cookies for authentication if needed
});
// const httpLink = createHttpLink({
//   uri: `${BACKEND_URL}/graphql`,
//   credentials: 'include',
// })

// For client-side rendering, we need to maintain a singleton
let apolloClient: InstanceType<typeof ApolloClient<NormalizedCacheObject>> | undefined;

// Function to create a new Apollo Client instance for client-side rendering
export function createClientApolloClient(initialState = {}) {
  // If there's no existing client, create a new one
  const _apolloClient = apolloClient ?? new ApolloClient({
    ssrMode: false, // Always false for client-side
    link: from([errorLink, createHttpLink(), createUploadLink({uri: `${BACKEND_URL}/graphql`, credentials: 'include'})]),
    cache: new InMemoryCache().restore(initialState),
    connectToDevTools: import.meta.env.DEV, // Enable DevTools in development
  });

  // Create the Apollo Client only once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

// Initialize the client (for client-side)
export const clientApolloClient = createClientApolloClient();
