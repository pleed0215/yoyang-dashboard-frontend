import { Route } from './+types/logout';
import { useLogoutMutation } from '~/graphql/operations';
import { useEffect } from 'react';
import { redirect, useNavigate } from 'react-router';
import { useApolloClient } from '@apollo/client';
import { serverApolloClient } from '~/lib/apollo-client-server';

export const loader = async () => {
  try {
    await serverApolloClient.clearStore();
  } catch (e) {
    console.error(e);
  }
  return {};
};

export default function LogoutPage({}: Route.ComponentProps) {
  const apolloClient = useApolloClient();
  const [logout] = useLogoutMutation({
    onCompleted: async () => {
      await apolloClient.clearStore();
    },
  });
  const navigator = useNavigate();

  useEffect(() => {
    (async () => {
      await logout();
      navigator('/', { replace: true });
    })();
  }, []);
  return null;
}
