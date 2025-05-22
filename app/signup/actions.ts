'use server';

import { z } from 'zod';
import { PASSWORD_REGEX } from '@/lib/constants';

const signupSchema = z
  .object({
    email: z.string().email('유효한 이메일을 입력하세요.'),
    password: z
      .string()
      .min(8, '패스워드는 최소 8자 이상이어야 합니다.')
      .max(50, '패스워드는 최대 50자까지 허용됩니다.')
      .regex(
        PASSWORD_REGEX,
        '패스워드는 대문자, 숫자, 특수 문자를 포함해야 합니다.'
      ),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: '비밀번호가 일치하지 않습니다.',
        fatal: true,
      });
    }
  });

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

  return { success: true };
}
