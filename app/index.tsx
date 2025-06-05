import { Route } from './+types/index';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { ME_QUERY } from '~/graphql/queries';
import { MeQuery, MeQueryVariables } from '~/graphql/types';
import { contextWithToken } from '~/lib/apollo';
import { redirect, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    if (request.headers.get('cookie')?.includes('refresh_token')) {
      return redirect('/dashboard');
    } else {
      return {};
    }
  } catch (e) {
    return {};
  }
};
export default function IndexPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <Card className="w-[400px] shadow-lg dark:border-neutral-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">요양병원 대시보드</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="default"
            size="lg"
            className="w-full"
            onClick={() => navigate('/register')}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            회원가입하기
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            onClick={() => navigate('/login')}
          >
            <LogIn className="mr-2 h-4 w-4" />
            로그인하러 가기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
