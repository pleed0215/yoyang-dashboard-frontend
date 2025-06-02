import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/login";
import { LOGIN_MUTATION } from "~/graphql/queries";
import { LabelInput } from "~/components/common/label-input";
import { SubmitButton } from "~/components/common/submit-button";
import { useMutation } from "@apollo/client";

interface LoginFormData {
  username: string;
  password: string;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // This is just for server-side validation
  if (!username || !password) {
    return {
      error: "Username and password are required",
    };
  }

  // The actual login will be handled client-side with Apollo Client
  return { ok: true };
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.login.success) {
        // Redirect to dashboard or home page after successful login
        navigate("/");
      } else {
        setError(data.login.message || "Login failed");
      }
    },
    onError: (error) => {
      setError(error.message || "An error occurred during login");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const { username, password } = formData;
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    await login({
      variables: {
        input: {
          username,
          password,
        },
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Login to your account
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
              id="username"
              name="username"
              type="text"
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <LabelInput
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <SubmitButton
              loading={loading}
              loadingText="Logging in..."
              className="w-full"
            >
              Sign in
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
