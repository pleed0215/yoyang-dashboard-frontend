'use client';

import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { signupAction } from './actions';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LabelInput from '@/components/common/label-input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';

export default function SignupPage() {
  const [state, dispatch] = useActionState(signupAction, null);
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
              name="email"
              type="email"
              placeholder="example@mail.com"
              defaultValue={state?.data?.email as string}
              required
              errors={state?.errors?.fieldErrors.email}
            />

            <LabelInput
              label="패스워드"
              id="password"
              name="password"
              type="password"
              placeholder="********"
              defaultValue={state?.data?.password as string}
              required
              errors={state?.errors?.fieldErrors.password}
            />

            <LabelInput
              label="패스워드 확인"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="********"
              defaultValue={state?.data?.confirmPassword as string}
              required
              errors={state?.errors?.fieldErrors.confirmPassword}
            />

            <Button type="submit" className="mt-2 w-full">
              가입하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
