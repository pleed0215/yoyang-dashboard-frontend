import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import type { Route } from './+types/login';
import { LOGIN_MUTATION } from '~/graphql/queries';
import { LabelInput } from '~/components/common/label-input';
import { SubmitButton } from '~/components/common/submit-button';
import { useMutation } from '@apollo/client';
import { LoginMutation, LoginMutationVariables } from '~/graphql/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Alert, AlertDescription } from '~/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { updateLoginStatus } from '~/lib/apollo';

interface LoginFormData {
  email: string;
  password: string;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {
      error: '이메일과 비밀번호를 입력해주세요',
    };
  }

  return { ok: true };
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const [login, { loading }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
    onCompleted: data => {
      if (data.login.success) {
        updateLoginStatus(true);
        navigate('/');
      } else {
        updateLoginStatus(false);
        setError(data.login.message || '로그인에 실패했습니다');
      }
    },
    onError: error => {
      setError(error.message || '로그인 중 오류가 발생했습니다');
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const { email, password } = formData;
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요');
      return;
    }

    await login({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 antialiased dark:bg-neutral-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">로그인</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            계정에 로그인하여 대시보드에 접근하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <LabelInput
              id="email"
              name="email"
              type="email"
              label="이메일"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="dark:border-neutral-800"
            />

            <LabelInput
              id="password"
              name="password"
              type="password"
              label="비밀번호"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="dark:border-neutral-800"
            />

            <SubmitButton
              loading={loading}
              loadingText="로그인 중..."
              className="w-full dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              로그인
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
