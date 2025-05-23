'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LabelInput from '@/components/common/label-input';
import { useActionState } from 'react';
import { signupAction } from '@/app/signup/actions';
import { signupSchema } from './signup-form-schema';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import LoadingButton from '@/components/common/loading-button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type SignUpFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [state, dispatch] = useActionState(signupAction, null);
  const { pending } = useFormStatus();
  const { register, formState } = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const router = useRouter();
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      {state?.success && (
        <Dialog open>
          <DialogContent>
            <DialogDescription className="py-4">
              <DialogTitle>가입 성공</DialogTitle>
              회원 가입이 완료되었습니다. 로그인 하여 서비스를 이용하실 수
              있습니다.
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => router.push('/login')}>
                로그인으로 이동
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>회원 가입</CardTitle>
          <CardDescription>
            계정을 생성하여 서비스를 이용하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="space-y-4">
            <LabelInput
              label="이메일 주소"
              id="email"
              {...register('email')}
              type="email"
              placeholder="example@mail.com"
              defaultValue={state?.data?.email as string}
              required
              errors={state?.errors?.fieldErrors.email}
            />

            <LabelInput
              label="패스워드"
              id="password"
              {...register('password')}
              type="password"
              placeholder="대문자, 소문자, 특수문자 최소 한 개씩 포함해야 합니다."
              defaultValue={state?.data?.password as string}
              required
              errors={state?.errors?.fieldErrors.password}
            />

            <LabelInput
              label="패스워드 확인"
              id="confirmPassword"
              {...register('confirmPassword')}
              type="password"
              placeholder="패스워드를 확인해주세요"
              defaultValue={state?.data?.confirmPassword as string}
              required
              errors={state?.errors?.fieldErrors.confirmPassword}
            />
            {state && !state.success && <span>{state.message}</span>}
            <LoadingButton
              loading={pending}
              disabled={!formState.isValid || pending}
              type="submit"
              className="mt-2 w-full"
            >
              가입하기
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
