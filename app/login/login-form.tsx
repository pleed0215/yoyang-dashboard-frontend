'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginAction } from '@/app/login/actions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LabelInput from '@/components/common/label-input';
import { loginFormSchema, LoginFormType } from './login-form-schema';
import LoadingButton from '@/components/common/loading-button';
import { useFormStatus } from 'react-dom';
import { loginWithGraphQL } from '@/app/login/graphql-actions';

export default function LoginForm() {
  const router = useRouter();
  const [state, action] = useActionState(loginWithGraphQL, null);
  const { pending } = useFormStatus();

  const { register, formState } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { errors } = formState;

  useEffect(() => {
    if (state?.success) {
      router.push('/');
    }
  }, [state?.success, router]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">로그인</CardTitle>
        <CardDescription className="text-center">
          이메일과 비밀번호를 입력하여 로그인하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          {state?.message && (
            <div className="text-destructive bg-destructive/10 rounded-md p-3 text-sm">
              {state.message}
            </div>
          )}

          <LabelInput
            label="이메일"
            type="email"
            {...register('email')}
            placeholder="name@example.com"
            autoComplete="email"
            defaultValue={state?.data?.email as string}
            errors={errors.email?.message ? [errors.email.message] : undefined}
          />

          <LabelInput
            label="비밀번호"
            type="password"
            {...register('password')}
            autoComplete="current-password"
            defaultValue={state?.data?.password as string}
            errors={
              errors.password?.message ? [errors.password.message] : undefined
            }
          />

          <LoadingButton
            loading={pending}
            loadingText="로그인 중..."
            disabled={!formState.isValid || pending}
            className="w-full"
            type="submit"
          >
            로그인
          </LoadingButton>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        계정이 없으신가요?&nbsp;
        <Link
          href="/signup"
          className="text-primary text-sm font-bold hover:underline"
        >
          회원가입
        </Link>
      </CardFooter>
    </Card>
  );
}
