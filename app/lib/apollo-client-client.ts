import {InMemoryCache} from "@apollo/client/cache"
import {ApolloClient, } from "@apollo/client/core"
import {from} from "@apollo/client/link/core"
import {onError} from '@apollo/client/link/error';
import {HttpLink} from "@apollo/client/link/http"
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"

// Type import
import type { NormalizedCacheObject } from '@apollo/client';

// Cache configuration with optimized policies
const cacheConfig = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // 환자 목록 캐시 정책
        retrievePatientList: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        // 병동 및 병실 정보 캐시 정책 - 자주 변경되지 않으므로 캐시 유지
        retrieveMyHospitalWardsAndRooms: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        // 병원 목록 캐시 정책
        retrieveHospitalList: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
    Patient: {
      fields: {
        // 환자 관련 필드 캐시 정책
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
      keyFields: ["ykiho"], // ykiho를 unique key로 사용
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
  // 전체 캐시 크기 제한 (메모리 최적화)
  resultCaching: true,
});

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
    link: from([errorLink, createHttpLink() ]),
    cache: cacheConfig.restore(initialState),
    connectToDevTools: import.meta.env.DEV, // Enable DevTools in development
    // 기본 fetch 정책을 cache-first로 설정
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
    },
  });

  // Create the Apollo Client only once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

// Initialize the client (for client-side)
export const clientApolloClient = createClientApolloClient();
