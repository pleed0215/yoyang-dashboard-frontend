# GraphQL in Next.js

이 문서는 Next.js 프로젝트에서 GraphQL을 사용하는 방법에 대한 가이드입니다. REST API에서 GraphQL로 전환하는 과정과 서버 사이드 및 클라이언트 사이드에서의 사용법을 설명합니다.

## 목차

1. [필요한 패키지 설치](#필요한-패키지-설치)
2. [GraphQL 클라이언트 설정](#graphql-클라이언트-설정)
3. [GraphQL 쿼리 정의](#graphql-쿼리-정의)
4. [서버 사이드에서 GraphQL 사용하기](#서버-사이드에서-graphql-사용하기)
5. [클라이언트 사이드에서 GraphQL 사용하기](#클라이언트-사이드에서-graphql-사용하기)
6. [인증 처리](#인증-처리)
7. [예제 코드](#예제-코드)

## 필요한 패키지 설치

GraphQL을 Next.js에서 사용하기 위해 다음 패키지를 설치해야 합니다:

```bash
npm install @apollo/client graphql @apollo/experimental-nextjs-app-support
# 또는
yarn add @apollo/client graphql @apollo/experimental-nextjs-app-support
```

## GraphQL 클라이언트 설정

GraphQL을 사용하기 위해 Apollo Client를 설정해야 합니다. 서버 사이드와 클라이언트 사이드에서 각각 다른 설정이 필요합니다.

### 클라이언트 설정 파일 생성

`lib/gql-server-apollo.ts` 파일을 생성하여 Apollo Client 설정을 구성합니다:

```typescript
// lib/gql-server-apollo.ts
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { cookies } from 'next/headers';

// 서버 사이드 GraphQL 클라이언트
export function createServerApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.BACKEND_URL + '/graphql',
    credentials: 'include',
  });

  const authLink = setContext(async (_, { headers }) => {
    // Next.js 헤더에서 쿠키 가져오기
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((v) => `${v.name}=${v.value}`)
      .join('; ');

    return {
      headers: {
        ...headers,
        cookie: cookieHeader,
      },
    };
  });

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

  return new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    ssrMode: true,
  });
}

// 클라이언트 사이드 GraphQL 클라이언트
let clientApolloClient = null;

export function getClientApolloClient() {
  // 클라이언트에서만 한 번 생성
  if (typeof window === 'undefined') return null;
  
  if (!clientApolloClient) {
    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_BACKEND_URL + '/graphql',
      credentials: 'include',
    });

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

    clientApolloClient = new ApolloClient({
      link: from([errorLink, httpLink]),
      cache: new InMemoryCache(),
      ssrMode: false,
    });
  }

  return clientApolloClient;
}

// RSC(React Server Components)용 Apollo Client 등록
export const { getClient: getServerApolloClient } = registerApolloClient(() => {
  return createServerApolloClient();
});
```

## GraphQL 쿼리 정의

GraphQL 쿼리와 뮤테이션을 정의하는 파일을 생성합니다:

```typescript
// lib/graphql/queries.ts
import { gql } from '@apollo/client';

// GraphQL 쿼리 정의
export const GET_USER = gql`
  query GetUser {
    me {
      id
      email
      name
      # 필요한 다른 필드 추가
    }
  }
`;

// 변수가 있는 쿼리 예제
export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      email
      name
      # 필요한 다른 필드 추가
    }
  }
`;

// 로그인 뮤테이션 예제
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
      user {
        id
        email
        name
      }
    }
  }
`;
```

## 서버 사이드에서 GraphQL 사용하기

Next.js의 서버 컴포넌트(RSC)에서 GraphQL을 사용하는 방법:

```tsx
// app/page.tsx 또는 다른 서버 컴포넌트
import { getServerApolloClient } from '@/lib/graphql-client';
import { GET_USER } from '@/lib/graphql/queries';

// 서버 사이드 GraphQL 데이터 가져오기 예제
const getUser = async () => {
  const client = getServerApolloClient();
  const { data } = await client.query({
    query: GET_USER,
  });
  return data.me;
};

export default async function Page() {
  const userInfo = await getUser();
  
  return (
    <div>
      <h1>서버 사이드 GraphQL 예제</h1>
      {userInfo && (
        <div>
          <p>ID: {userInfo.id}</p>
          <p>이메일: {userInfo.email}</p>
          <p>이름: {userInfo.name}</p>
        </div>
      )}
    </div>
  );
}
```

## 클라이언트 사이드에서 GraphQL 사용하기

클라이언트 컴포넌트에서 GraphQL을 사용하는 방법:

```tsx
'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER, GET_USER_BY_ID, LOGIN_MUTATION } from '@/lib/graphql/queries';
import { ApolloProvider } from '@apollo/client';
import { getClientApolloClient } from '@/lib/graphql-client';

// 클라이언트 사이드 GraphQL을 사용하는 컴포넌트
function ClientGraphQLContent() {
  const [userId, setUserId] = useState('');
  
  // 변수 없는 쿼리 예제
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER);
  
  // 변수가 있는 쿼리 예제
  const { 
    data: userByIdData, 
    loading: userByIdLoading, 
    error: userByIdError,
    refetch
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: !userId, // userId가 비어있으면 쿼리 건너뛰기
  });

  // 로그인 뮤테이션 예제
  const [login, { loading: loginLoading }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (email, password) => {
    try {
      const { data } = await login({ 
        variables: { email, password } 
      });
      console.log('로그인 성공:', data);
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div>
      <h2>클라이언트 사이드 GraphQL 예제</h2>
      
      {/* 현재 사용자 데이터 */}
      <div>
        <h3>현재 사용자</h3>
        {userLoading && <p>로딩 중...</p>}
        {userError && <p>에러: {userError.message}</p>}
        {userData?.me && (
          <div>
            <p>ID: {userData.me.id}</p>
            <p>이름: {userData.me.name}</p>
            <p>이메일: {userData.me.email}</p>
          </div>
        )}
      </div>
      
      {/* ID로 사용자 조회 예제 */}
      <div>
        <h3>ID로 사용자 조회</h3>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="사용자 ID 입력"
        />
        <button onClick={() => refetch()}>조회</button>
        
        {userByIdLoading && <p>로딩 중...</p>}
        {userByIdError && <p>에러: {userByIdError.message}</p>}
        {userByIdData?.user && (
          <div>
            <p>ID: {userByIdData.user.id}</p>
            <p>이름: {userByIdData.user.name}</p>
            <p>이메일: {userByIdData.user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Apollo Client를 제공하는 래퍼 컴포넌트
export default function ClientGraphQLExample() {
  const client = getClientApolloClient();
  
  if (!client) {
    return <div>Apollo Client는 브라우저에서만 사용 가능합니다</div>;
  }
  
  return (
    <ApolloProvider client={client}>
      <ClientGraphQLContent />
    </ApolloProvider>
  );
}
```

## 인증 처리

GraphQL에서 인증을 처리하는 방법:

### 로그인 구현

```tsx
// app/login/actions.ts
'use server';

import { cookies } from 'next/headers';
import { getServerApolloClient } from '@/lib/graphql-client';
import { LOGIN_MUTATION } from '@/lib/graphql/queries';
import { loginFormSchema } from '@/app/login/login-form-schema';

export async function loginAction(prevState: unknown, formData: FormData) {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const result = await loginFormSchema.safeParseAsync(raw);
    if (!result.success) {
      return {
        errors: result.error.flatten(),
        data: Object.fromEntries(formData.entries()),
      };
    }

    // GraphQL 로그인 뮤테이션 실행
    const client = getServerApolloClient();
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        email: result.data.email,
        password: result.data.password,
      },
    });

    if (data?.login) {
      const cookieStore = cookies();
      const { access_token, refresh_token } = data.login;

      // 로그인 성공 시 토큰을 쿠키에 저장
      cookieStore.set('access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      cookieStore.set('refresh_token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
      return { success: true };
    } else {
      return {
        success: false,
        message: '로그인에 실패했습니다.',
        data: Object.fromEntries(formData.entries()),
      };
    }
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.',
      data: Object.fromEntries(formData.entries()),
    };
  }
}
```

## 예제 코드

전체 예제 코드는 프로젝트의 다음 파일에서 확인할 수 있습니다:

1. GraphQL 클라이언트 설정: `lib/gql-server-apollo.ts`
2. GraphQL 쿼리 정의: `lib/graphql/queries.ts`
3. 서버 사이드 GraphQL 예제: `app/page.tsx`
4. GraphQL 인증 예제: `app/login/actions.ts`

## 결론

Next.js에서 GraphQL을 사용하면 다음과 같은 이점이 있습니다:

1. 필요한 데이터만 정확히 요청할 수 있어 오버페칭 문제를 해결합니다.
2. 여러 엔드포인트를 하나의 요청으로 통합할 수 있습니다.
3. 타입 안전성이 향상됩니다.
4. 클라이언트와 서버 간의 계약이 명확해집니다.

서버 사이드와 클라이언트 사이드 모두에서 GraphQL을 사용하여 더 효율적이고 유지보수하기 쉬운 애플리케이션을 구축할 수 있습니다.