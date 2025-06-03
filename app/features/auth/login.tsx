import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/login";
import { LOGIN_MUTATION } from "~/graphql/queries";
import { LabelInput } from "~/components/common/label-input";
import { SubmitButton } from "~/components/common/submit-button";
import { useMutation } from "@apollo/client";
import { LoginMutation, LoginMutationVariables } from "~/graphql/types";

interface LoginFormData {
  email: string;
  password: string;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      error: "이메일과 비밀번호를 입력해주세요",
    };
  }

  return { ok: true };
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const [login, { loading }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.login.success) {
        navigate("/");
      } else {
        setError(data.login.message || "로그인에 실패했습니다");
      }
    },
    onError: (error) => {
      setError(error.message || "로그인 중 오류가 발생했습니다");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const { email, password } = formData;
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요");
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            로그인
          </h1>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <LabelInput
              id="email"
              name="email"
              type="email"
              label="이메일"
              placeholder="이메일을 입력해주세요"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <LabelInput
              id="password"
              name="password"
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <SubmitButton
              loading={loading}
              loadingText="로그인 중..."
              className="w-full"
            >
              로그인
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}