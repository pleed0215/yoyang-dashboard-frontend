'use server';

import { loginFormSchema } from '@/app/login/login-form-schema';
import backend from '@/lib/backend';

export async function loginAction(prevState: unknown, formData: FormData) {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = await loginFormSchema.safeParseAsync(raw);
  if (!result.success) {
    return {
      errors: result.error.flatten(),
      data: Object.fromEntries(formData.entries()),
    };
  }

  try {
    const response = await backend('/auth/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.data),
      method: 'POST',
    });

    if (response.ok) {
      return { success: true };
    } else {
      const responseData = await response.json();
      return {
        success: false,
        status: response.status,
        message: responseData.message,
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
