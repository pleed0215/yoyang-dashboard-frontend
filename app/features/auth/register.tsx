// register.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router';
import { SIGNUP_MUTATION } from '~/graphql/queries';
import { LabelInput } from '~/components/common/label-input';
import { SubmitButton } from '~/components/common/submit-button';
import { useMutation } from '@apollo/client';
import { SignupMutation, SignupMutationVariables } from '~/graphql/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Alert, AlertDescription } from '~/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const registerSchema = z
  .object({
    email: z.string().email('올바른 이메일 주소를 입력해주세요'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
        '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다'
      ),
    passwordConfirm: z.string(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const [registerMutation, { data, loading }] = useMutation<
    SignupMutation,
    SignupMutationVariables
  >(SIGNUP_MUTATION, {
    onCompleted: data => {
      if (data.signup.success) {
        navigate('/login');
      }
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registerMutation({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 antialiased dark:bg-neutral-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">회원가입</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            새로운 계정을 만들어 서비스를 이용하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <LabelInput
                id="email"
                label="이메일"
                type="email"
                placeholder="name@company.com"
                {...register('email')}
              />
              {errors.email && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.email.message}</AlertDescription>
                </Alert>
              )}
            </div>

            <div>
              <LabelInput
                id="password"
                label="비밀번호"
                type="password"
                placeholder="비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다."
                {...register('password')}
              />
              {errors.password && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.password.message}</AlertDescription>
                </Alert>
              )}
            </div>

            <div>
              <LabelInput
                id="passwordConfirm"
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 한 번 더 입력해주세요."
                {...register('passwordConfirm')}
              />
              {errors.passwordConfirm && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.passwordConfirm.message}</AlertDescription>
                </Alert>
              )}
            </div>
            {data && !data.signup.success && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{data.signup.message}</AlertDescription>
              </Alert>
            )}
            <SubmitButton
              loading={loading}
              loadingText="가입 중..."
              className="w-full dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              회원가입
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
