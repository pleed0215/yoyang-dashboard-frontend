import { Route } from './+types/index';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { ME_QUERY } from '~/graphql/queries';
import { MeQuery, MeQueryVariables } from '~/graphql/types';
import { contextWithToken } from '~/lib/apollo';

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const data = await serverApolloClient.query<MeQuery, MeQueryVariables>({
      query: ME_QUERY,
      context: {
        ...contextWithToken(request),
      },
    });
    return data;
  } catch (e) {
    return {};
  }
};
export default function IndexPage({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  console.log(data);
  return <div>This is index page</div>;
}
