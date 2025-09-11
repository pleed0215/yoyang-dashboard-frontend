import { ApolloClient } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';
import { HttpLink } from '@apollo/client/link/http';
import { from, ApolloLink } from '@apollo/client/link/core';
import { onError } from '@apollo/client/link/error';

// Type import
import type { NormalizedCacheObject } from '@apollo/client';

// Server-side cache configuration (동일한 캐시 정책 사용)
const serverCacheConfig = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        retrievePatientList: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        retrieveMyHospitalWardsAndRooms: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        retrieveHospitalList: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
    Patient: {
      fields: {
        enterDate: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        leaveDate: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
    Hospital: {
      keyFields: ["ykiho"],
    },
    Ward: {
      keyFields: ["id"],
      fields: {
        rooms: {
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
    Room: {
      keyFields: ["id"],
    },
  },
  resultCaching: true,
});

// Get the backend URL from environment variables for server-side
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// Create an error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Create an HTTP link to the GraphQL server
const createHttpLink = (req?: Request) =>
  new HttpLink({
    uri: `${BACKEND_URL}/graphql`,
    credentials: 'include', // Include cookies for authentication if needed
    headers: {
      Cookie: req?.headers.get('cookie') || '',
    },
  });

let _serverApolloClient: InstanceType<typeof ApolloClient<NormalizedCacheObject>> | undefined;
const createCookieContext = () =>
  new ApolloLink((operation, forward) => {
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
  const apolloClient =
    _serverApolloClient ??
    new ApolloClient({
      ssrMode: true, // Always true for server-side
      link: from([errorLink, createCookieContext(), createHttpLink()]),
      cache: serverCacheConfig.restore(initialState),
      // 서버사이드에서는 항상 fresh 데이터를 가져오도록 설정
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
      },
    });

  if (!_serverApolloClient) _serverApolloClient = apolloClient;

  return apolloClient;
}

export const serverApolloClient = createServerApolloClient();
