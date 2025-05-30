'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  GET_USER,
  GET_USER_BY_ID,
  LOGIN_MUTATION,
} from '@/lib/graphql/queries';
import { Button } from '@/components/ui/button';
import { ApolloProvider } from '@apollo/client';
import { getClientApolloClient } from '@/lib/gql-client-apollo';
import {
  GetUserByIdQuery,
  GetUserByIdQueryResult,
  GetUserByIdQueryVariables,
  GetUserQuery,
  GetUserQueryVariables,
} from '@/lib/graphql/generated/graphql';

// Example component that uses client-side GraphQL
function ClientGraphQLContent() {
  const [userId, setUserId] = useState<string>('');

  // Example of a query without variables
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER);

  // Example of a query with variables
  // 변수가 있는 쿼리 예제
  const {
    data: userByIdData,
    loading: userByIdLoading,
    error: userByIdError,
    refetch,
  } = useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GET_USER_BY_ID, {
    variables: { id: +userId },
    skip: !userId, // userId가 비어있으면 쿼리 건너뛰기
  });

  // 로그인 뮤테이션 예제
  const [login, { loading: loginLoading }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (email, password) => {
    try {
      const { data } = await login({
        variables: { email, password },
      });
      console.log('로그인 성공:', data);
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const handleFetchUser = async () => {
    if (userId) {
      await refetch({ id: +userId });
    }
  };

  return (
    <div className="mt-8 rounded border p-4">
      <h2 className="mb-4 text-xl font-bold">Client-side GraphQL Example</h2>

      {/* Current user data from GraphQL */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Current User</h3>
        {userLoading && <p>Loading user data...</p>}
        {userError && (
          <p className="text-red-500">Error: {userError.message}</p>
        )}
        {userData?.me && (
          <div className="rounded bg-gray-100 p-3">
            <p>
              <strong>ID:</strong> {userData.me.id}
            </p>
            <p>
              <strong>Name:</strong> {userData.me.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.me.email}
            </p>
          </div>
        )}
      </div>

      {/* User by ID query example */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Fetch User by ID</h3>
        <div className="mb-3 flex gap-2">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            className="rounded border px-3 py-2"
          />
          <Button onClick={handleFetchUser}>Fetch User</Button>
        </div>
        {userByIdLoading && <p>로딩 중...</p>}
        {userByIdError && <p>에러: {userByIdError.message}</p>}
        {userByIdData && userByIdData.getUserById && (
          <div>
            <p>ID: {userByIdData.getUserById.id}</p>
            <p>이름: {userByIdData.getUserById.username}</p>
            <p>이메일: {userByIdData.getUserById.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Wrapper component that provides Apollo Client
export default function ClientGraphQLExample() {
  const client = getClientApolloClient();

  if (!client) {
    return <div>Apollo Client is only available in the browser</div>;
  }

  return (
    <ApolloProvider client={client}>
      <ClientGraphQLContent />
    </ApolloProvider>
  );
}
