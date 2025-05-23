import { z } from 'zod';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REGEX,
} from '@/lib/constants';

export const signupSchema = z
  .object({
    email: z.string().email('유효한 이메일을 입력하세요.'),
    password: z
      .string()
      .min(
        MIN_PASSWORD_LENGTH,
        `패스워드는 최소 ${MIN_PASSWORD_LENGTH} 이상이어야 합니다.`
      )
      .max(
        MAX_PASSWORD_LENGTH,
        `패스워드는 최대 ${MAX_PASSWORD_LENGTH}자까지 허용됩니다.`
      )
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
