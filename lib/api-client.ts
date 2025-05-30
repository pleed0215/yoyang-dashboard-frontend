// lib/api-client.ts
import axios from 'axios';
import { NextResponse } from 'next/server';

export function createApiClient(isServer: boolean) {
  const api = axios.create({
    baseURL: isServer
      ? process.env.BACKEND_URL
      : process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
  });

  api.interceptors.request.use(async (config) => {
    if (isServer) {
      // 서버 사이드 로직
      const { cookies } = await import('next/headers');
      const cookieStorage = await cookies();

      config.headers.cookie = cookieStorage
        .getAll()
        .map((v) => `${v.name}=${v.value}`)
        .join('; ');
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        if (isServer) {
          const { cookies } = await import('next/headers');
          const cookieStorage = await cookies();
          const refreshToken = cookieStorage.get('refresh_token');
          const cookieHeader = cookieStorage
            .getAll()
            .map((v) => `${v.name}=${v.value}`)
            .join('; ');
          try {
            const response = await axios.post(
              '/auth/refresh',
              {
                refresh_token: refreshToken,
              },
              {
                baseURL: process.env.BACKEND_URL,
                withCredentials: true,
                headers: {
                  cookie: cookieHeader,
                },
              }
            );
            if (response.data.access_token) {
              const originalRequest = error.config;
              const newResponse = NextResponse.next();

              newResponse.cookies.set(
                'access_token',
                response.data.access_token,
                {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'lax',
                  path: '/',
                }
              );
              const existingCookies: string = originalRequest.headers.cookie;
              const cookies = existingCookies
                .split(';')
                .map((c) => c.trim())
                .filter((c) => !c.startsWith('access_token'));
              cookies.push(`access_token=${response.data.access_token}`);
              originalRequest.headers.cookie = cookies.join('; ');
              return axios(originalRequest);
            }
          } catch (e) {
            console.error('refreshing token failed', e);
            return await axios.post(
              '/api/auth/logout',
              {},
              { withCredentials: true }
            );
          }
        } else {
          try {
            await axios.post(
              '/auth/refresh',
              {},
              { withCredentials: true, method: 'post' }
            );
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
          } catch (logoutError) {
            console.error('logout failed', logoutError);
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

// 사용 예시
export const serverApi = createApiClient(true);
export const clientApi = createApiClient(false);
