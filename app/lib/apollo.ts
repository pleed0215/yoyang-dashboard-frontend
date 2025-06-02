// Re-export from client and server Apollo Client files
import { createServerApolloClient } from './apollo-client-server';
import { createClientApolloClient, clientApolloClient } from './apollo-client-client';

// For backward compatibility
export const createApolloClient = typeof window === 'undefined' 
  ? createServerApolloClient 
  : createClientApolloClient;

export const apolloClient = typeof window !== 'undefined' 
  ? clientApolloClient 
  : undefined;

export { createServerApolloClient, createClientApolloClient, clientApolloClient };