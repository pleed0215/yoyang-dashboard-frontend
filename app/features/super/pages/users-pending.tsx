import { Route } from './+types/users-pending';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { RETRIEVE_PENDING_USERS_QUERY } from '~/graphql/queries';
import { RetrievePendingUsersOutput, RetrievePendingUsersQuery } from '~/graphql/types';
import { contextWithToken } from '~/lib/apollo';
export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const { data } = await serverApolloClient.query<RetrievePendingUsersQuery>({
      query: RETRIEVE_PENDING_USERS_QUERY,
      context: contextWithToken(request),
    });
    console.log(data);
  } catch (e) {}
};
export default function UsersPendingPage() {
  return <div>Users Pending</div>;
}
