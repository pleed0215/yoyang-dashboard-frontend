// Re-export from client and server Apollo Client files
import { createServerApolloClient } from './apollo-client-server';
import { createClientApolloClient, clientApolloClient } from './apollo-client-client';
import { DefaultContext } from '@apollo/client';

// For backward compatibility
export const createApolloClient =
  typeof window === 'undefined' ? createServerApolloClient : createClientApolloClient;

export const apolloClient = typeof window !== 'undefined' ? clientApolloClient : undefined;

const contextWithToken = (request: Request): DefaultContext => ({
  headers: {
    credentials: 'include',
    cookie: request.headers.get('cookie') || '',
  },
});

export { createServerApolloClient, createClientApolloClient, clientApolloClient, contextWithToken };
