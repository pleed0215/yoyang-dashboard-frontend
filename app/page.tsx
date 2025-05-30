import { Button } from '@/components/ui/button';
import { getServerApolloClient } from '@/lib/gql-server-apollo';
import { GET_USER } from '@/lib/graphql/queries';
import ClientGraphQLExample from '@/components/client-graphql-example';
import { GetUserQuery } from '@/lib/graphql/generated/graphql';

// Server-side GraphQL fetching example
const getUser = async () => {
  const client = getServerApolloClient();
  const { data } = await client.query<GetUserQuery>({
    query: GET_USER,
  });
  return data.me;
};

export default async function Home() {
  const userInfo = await getUser();
  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold">GraphQL in Next.js Examples</h1>

      <div className="bg-background text-foreground mb-4">Hello 안녕하세요</div>
      <div className="bg-foreground mb-4 size-20 rounded-2xl" />
      <Button className="mb-4">Hello</Button>

      {/* Server-side GraphQL example */}
      {userInfo && (
        <div className="mt-4 rounded border p-4">
          <h2 className="mb-2 text-lg font-bold">
            Server-side GraphQL Example
          </h2>
          <p>This data was fetched using GraphQL in a Server Component:</p>
          <div className="mt-2 rounded bg-gray-100 p-3">
            {userInfo && userInfo.data && (
              <div>
                <p>
                  <strong>ID:</strong> {userInfo.data.id}
                </p>
                <p>
                  <strong>Email:</strong> {userInfo.data.email}
                </p>
                <p>
                  <strong>Name:</strong> {userInfo.data.username}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Client-side GraphQL example */}
      <ClientGraphQLExample />
    </div>
  );
}
