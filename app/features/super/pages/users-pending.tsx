import { serverApolloClient } from '~/lib/apollo-client-server';
import { Route } from './+types/users-pending';
import { RETRIEVE_PENDING_USERS_QUERY } from '~/graphql/queries';
import { RetrievePendingUsersQuery } from '~/graphql/types';
import { useApolloClient } from '@apollo/client';
import { contextWithToken } from '~/lib/apollo';

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const { data } = await serverApolloClient.query<RetrievePendingUsersQuery>({
      query: RETRIEVE_PENDING_USERS_QUERY,
      context: { ...contextWithToken(request) },
    });
    return {
      data: data.superOnlyRetrievePendingUsers.data,
      apolloState: serverApolloClient.extract(),
    };
  } catch (e) {
    return {};
  }
};

export default function UsersPendingPage({ loaderData }: Route.ComponentProps) {
  const { data, apolloState } = loaderData;
  const apolloClient = useApolloClient();
  apolloClient.cache.restore(apolloState ?? {});

  return <div>{data?.map(user => <p key={user.id}>{user.email}</p>)}</div>;
}
