import { serverApolloClient } from '~/lib/apollo-client-server';
import { contextWithToken } from '~/lib/apollo';
import { GET_JOIN_REQUEST_BY_CURRENT_USER_QUERY } from '~/graphql/queries';
import { GetJoinRequestByCurrentUserQuery } from '~/graphql/types';
import { useDeleteJoinRequestForCurrentUserMutation } from '~/graphql/operations';
import { stateLabel, stateBadgeVariant } from '~/lib/enum-mapping';
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '~/components/ui/dialog';
import { toast } from 'sonner';
import { useState } from 'react';
import { SubmitButton } from '~/components/common/submit-button';
import { useLoaderData, useNavigate } from 'react-router';

export const loader = async ({ request }: any) => {
  try {
    const { data } = await serverApolloClient.query<GetJoinRequestByCurrentUserQuery>({
      query: GET_JOIN_REQUEST_BY_CURRENT_USER_QUERY,
      context: { ...contextWithToken(request) },
      fetchPolicy: 'no-cache',
    });
    return {
      joinRequest: data?.getJoinRequestByCurrentUser?.data || null,
      apolloState: serverApolloClient.extract(),
    };
  } catch (e) {
    console.error(e);
    return {
      joinRequest: null,
      apolloState: serverApolloClient.extract(),
    };
  }
};

export default function StaffHospitalJoinRequestPendingPage() {
  const { joinRequest } = useLoaderData() as { joinRequest: any };
  const [deleteJoinRequest, { loading: mutationLoading }] =
    useDeleteJoinRequestForCurrentUserMutation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleCancel = async () => {
    try {
      const { data } = await deleteJoinRequest();
      if (data?.deleteJoinRequestForCurrentUser?.success) {
        toast.success(data.deleteJoinRequestForCurrentUser.message || '가입신청이 취소되었습니다.');
        setDialogOpen(false);
        setTimeout(() => navigate(0), 500);
      } else {
        toast.error(data?.deleteJoinRequestForCurrentUser?.message || '취소에 실패했습니다.');
      }
    } catch (e) {
      toast.error('취소에 실패했습니다.');
    }
  };

  if (!joinRequest) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight text-center">
              가입신청 정보 없음
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">현재 가입신청 내역이 없습니다.</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight text-center">
            가입신청 정보
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="border border-border w-full mb-4">
            <TableBody>
              <TableRow>
                <TableCell className="font-bold bg-muted border border-border w-24">
                  병원명
                </TableCell>
                <TableCell className="border border-border pl-4">
                  {joinRequest.hospital.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold bg-muted border border-border w-24">지역</TableCell>
                <TableCell className="border border-border pl-4">
                  {joinRequest.hospital.located || '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold bg-muted border border-border w-24">
                  병원상태
                </TableCell>
                <TableCell className="border border-border pl-4">
                  <Badge variant={stateBadgeVariant[joinRequest.hospital.state]}>
                    {stateLabel[joinRequest.hospital.state]}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold bg-muted border border-border w-24">
                  신청상태
                </TableCell>
                <TableCell className="border border-border pl-4">
                  <Badge variant={stateBadgeVariant[joinRequest.state]}>
                    {stateLabel[joinRequest.state]}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button variant="destructive" className="w-full" onClick={() => setDialogOpen(true)}>
            가입신청 취소
          </Button>
        </CardContent>
      </Card>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>가입신청 취소</DialogTitle>
          </DialogHeader>
          <DialogDescription>정말로 가입신청을 취소하시겠습니까?</DialogDescription>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setDialogOpen(false)}
              disabled={mutationLoading}
            >
              아니오
            </Button>
            <SubmitButton
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={handleCancel}
              loading={mutationLoading}
              type="button"
            >
              네, 취소합니다
            </SubmitButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
