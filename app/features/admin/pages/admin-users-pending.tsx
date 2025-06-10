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
import { RETRIEVE_JOIN_REQUEST_QUERY, ACCEPT_JOIN_REQUEST_MUTATION, DENY_JOIN_REQUEST_MUTATION } from '~/graphql/queries';
import { useApolloClient, useMutation } from '@apollo/client';
import { contextWithToken } from '~/lib/apollo';
import { toast } from 'sonner';
import { useNavigate, useLoaderData, useSearchParams } from 'react-router';
import { stateBadgeVariant, stateLabel } from '~/lib/enum-mapping';
import { CommonState } from '~/graphql/types';
import PageInfo from '~/components/common/page-info';

export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || '1';
  const pageSize = url.searchParams.get('pageSize') || '10';
  const { data } = await serverApolloClient.query({
    query: RETRIEVE_JOIN_REQUEST_QUERY,
    variables: { page: parseInt(page), pageSize: parseInt(pageSize) },
    context: { ...contextWithToken(request) },
    fetchPolicy: 'no-cache',
  });
  return {
    data: data?.adminOnlyRetrieveJoinRequest?.data || [],
    pageInfo: data?.adminOnlyRetrieveJoinRequest?.pageInfo,
    apolloState: serverApolloClient.extract(),
  };
};

export default function AdminUsersPendingPage() {
  const { data, pageInfo, apolloState } = useLoaderData() as any;
  const apolloClient = useApolloClient();
  const [searchParams, setSearchParams] = useSearchParams();
  apolloClient.cache.restore(apolloState ?? {});

  const [acceptJoinRequest, { loading: acceptLoading }] = useMutation(ACCEPT_JOIN_REQUEST_MUTATION, {
    onCompleted: (res) => {
      if (res.acceptJoinRequest.success) {
        toast.success('사용자가 승인되었습니다.');
        setSearchParams(searchParams, { preventScrollReset: true });
      } else {
        toast.error(res.acceptJoinRequest.message || '승인 실패');
      }
    },
  });

  const [denyJoinRequest, { loading: denyLoading }] = useMutation(DENY_JOIN_REQUEST_MUTATION, {
    onCompleted: (res) => {
      if (res.denyJoinRequest.success) {
        toast.success('사용자가 거절되었습니다.');
        setSearchParams(searchParams, { preventScrollReset: true });
      } else {
        toast.error(res.denyJoinRequest.message || '거절 실패');
      }
    },
  });

  const handleApprove = (id: number) => {
    acceptJoinRequest({ variables: { requestId: Number(id) } });
  };

  const handleReject = (id: number) => {
    denyJoinRequest({ variables: { requestId: Number(id) } });
  };

  const handlePageChange = (page: number) => {
    searchParams.set('page', String(page));
    setSearchParams(searchParams, { preventScrollReset: true });
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
            {data?.map((req: any) => (
              <TableRow key={req.id}>
                <TableCell>{req.user.id}</TableCell>
                <TableCell>{req.user.email}</TableCell>
                <TableCell>{req.user.username}</TableCell>
                <TableCell>
                  <Badge variant="outline">{stateLabel[CommonState.Pending]}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      className="cursor-pointer"
                      variant="default"
                      size="sm"
                      onClick={() => handleApprove(req.id)}
                      disabled={acceptLoading}
                    >
                      승인
                    </Button>
                    <Button
                      className="cursor-pointer"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleReject(req.id)}
                      disabled={denyLoading}
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
      {!!data && data.length > 0 && pageInfo && (
        <PageInfo totalPages={pageInfo.totalPages} />
      )}
    </div>
  );
}
