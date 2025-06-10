import { Button } from '~/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Badge } from '~/components/ui/badge';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { Route } from './+types/super-users-pending';
import { RETRIEVE_PENDING_USERS_QUERY } from '~/graphql/queries';
import { RetrievePendingUsersQuery, CommonState } from '~/graphql/types';
import { useApolloClient } from '@apollo/client';
import { contextWithToken } from '~/lib/apollo';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

// 상태에 따른 배지 스타일 매핑
const stateBadgeVariant: Record<CommonState, 'default' | 'warning' | 'secondary' | 'destructive'> =
  {
    [CommonState.Active]: 'default',
    [CommonState.Pending]: 'warning',
    [CommonState.Denied]: 'destructive',
    [CommonState.Inactive]: 'secondary',
    [CommonState.Accepted]: 'default',
    [CommonState.PendingDeletion]: 'destructive',
  };

// 상태 한글 표시
const stateLabel: Record<CommonState, string> = {
  [CommonState.Active]: '활성',
  [CommonState.Pending]: '대기중',
  [CommonState.Denied]: '거절됨',
  [CommonState.Inactive]: '비활성',
  [CommonState.Accepted]: '승인됨',
  [CommonState.PendingDeletion]: '삭제대기중',
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const intPage = parseInt(page);
    const { data } = await serverApolloClient.query<RetrievePendingUsersQuery>({
      query: RETRIEVE_PENDING_USERS_QUERY,
      context: { ...contextWithToken(request) },
      variables: {
        page: !isNaN(intPage) ? intPage : 1,
      },
    });
    return {
      data: data.superOnlyRetrievePendingUsers.data,
      pageInfo: data.superOnlyRetrievePendingUsers.pageInfo,
      apolloState: serverApolloClient.extract(),
    };
  } catch (e) {
    return { data: [], pageInfo: null };
  }
};

export default function UsersPendingPage({ loaderData }: Route.ComponentProps) {
  const { data, apolloState, pageInfo } = loaderData;
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  apolloClient.cache.restore(apolloState ?? {});

  const handleApprove = (id: number) => {
    toast.success('사용자가 승인되었습니다.');
  };

  const handleReject = (id: number) => {
    toast.error('사용자가 거절되었습니다.');
  };

  const handlePageChange = (page: number) => {
    navigate(`?page=${page}`);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="*:text-center">
              <TableHead>ID</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>사용자명</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="*:text-center">
            {data?.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Badge variant={stateBadgeVariant[user.state]}>{stateLabel[user.state]}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      className="cursor-pointer"
                      variant="default"
                      size="sm"
                      onClick={() => handleApprove(user.id)}
                      disabled={user.state === CommonState.Active}
                    >
                      승인
                    </Button>
                    <Button
                      className="cursor-pointer"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleReject(user.id)}
                      disabled={user.state === CommonState.Denied}
                    >
                      거절
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {pageInfo && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!pageInfo.hasPreviousPage}
            onClick={() => handlePageChange(pageInfo.currentPage - 1)}
          >
            이전
          </Button>
          <span className="flex items-center">
            {pageInfo.currentPage} / {pageInfo.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={!pageInfo.hasNextPage}
            onClick={() => handlePageChange(pageInfo.currentPage + 1)}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
}
