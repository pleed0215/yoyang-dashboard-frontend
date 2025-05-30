import { cookies } from 'next/headers';

export async function backend(
  reqInfo: RequestInfo | string,
  reqInit: RequestInit = {}
) {
  if (typeof reqInfo === 'string') {
    try {
      const url = new URL(reqInfo, process.env.BACKEND_URL);
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((v) => `${v.name}=${v.value}`)
        .join('; ');
      const response = await fetch(url, {
        ...reqInit,
        headers: {
          Cookie: cookieHeader,
          ...reqInit.headers,
        },
        credentials: 'include',
      });

      return response;
    } catch (e) {
      console.error(e);
      return null;
    }
  } else {
    return fetch(reqInfo, reqInit);
  }
}
