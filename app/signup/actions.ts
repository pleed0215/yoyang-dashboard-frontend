'use server';

import { signupSchema } from '@/app/signup/signup-form-schema';
import backend from '@/lib/backend';

export async function signupAction(prevState: unknown, formData: FormData) {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };
  const result = await signupSchema.safeParseAsync(raw);
  if (!result.success) {
    return {
      errors: result.error.flatten(),
      data: Object.fromEntries(formData.entries()),
    };
  }

  // server action required.
  try {
    const response = await backend('/users/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: result.data.email,
        password: result.data.password,
      }),
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
      message: e as string,
      data: Object.fromEntries(formData.entries()),
    };
  }
}
