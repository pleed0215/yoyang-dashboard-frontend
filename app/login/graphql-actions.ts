'use server';

import { loginFormSchema } from '@/app/login/login-form-schema';
import { cookies } from 'next/headers';
import { getServerApolloClient } from '@/lib/gql-server-apollo';
import { LOGIN_MUTATION } from '@/lib/graphql/queries';
import {
  LoginMutation,
  LoginMutationVariables,
  MutationLoginArgs,
} from '@/lib/graphql/generated/graphql';

export async function loginWithGraphQL(prevState: unknown, formData: FormData) {
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
    const { data } = await client.mutate<LoginMutation, LoginMutationVariables>(
      {
        mutation: LOGIN_MUTATION,
        variables: {
          email: result.data.email,
          password: result.data.password,
        },
      }
    );

    if (data?.login) {
      const cookieStore = await cookies();
      if (!data.login.data)
        return {
          success: false,
          message: '로그인에 실패했습니다.',
          data: Object.fromEntries(formData.entries()),
        };
      const { accessToken, refreshToken } = data.login.data;

      // 로그인 성공 시 토큰을 쿠키에 저장
      cookieStore.set('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      cookieStore.set('refresh_token', refreshToken, {
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
      status: 500,
      message:
        e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.',
      data: Object.fromEntries(formData.entries()),
    };
  }
}
