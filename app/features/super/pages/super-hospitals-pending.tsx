import { useState } from 'react';
import { useLoaderData } from 'react-router';
import {
  RETRIEVE_CREATE_HOSPITAL_REQUEST_QUERY,
} from '~/graphql/queries';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Badge } from '~/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '~/components/ui/dialog';
import { SubmitButton } from '~/components/common/submit-button';
import { stateLabel, stateBadgeVariant } from '~/lib/enum-mapping';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { contextWithToken } from '~/lib/apollo';
import { useAcceptCreateHospitalRequestMutation, useDenyCreateHospitalRequestMutation, useGetHospitalInfoQuery } from '~/graphql/operations';

export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || '1';
  const pageSize = url.searchParams.get('pageSize') || '10';
  const { data } = await serverApolloClient.query({
    query: RETRIEVE_CREATE_HOSPITAL_REQUEST_QUERY,
    variables: { page: parseInt(page), pageSize: parseInt(pageSize) },
    context: { ...contextWithToken(request) },
    fetchPolicy: 'no-cache',
  });
  return {
    data: data?.retrieveCreateHospitalRequest?.data || [],
    apolloState: serverApolloClient.extract(),
  };
};

export default function SuperHospitalsPendingPage() {
  const loaderData = useLoaderData() as any;
  const requests = loaderData.data;

  // Dialog 상태
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null as null | { ykiho: string; requestId: number });

  // 병원 상세 fetch
  const { data: hospitalData, loading: hospitalLoading } = useGetHospitalInfoQuery(
    {
      variables: { ykiho: selected?.ykiho || '' },
      skip: !selected?.ykiho,
    }
  );
  const hospital = hospitalData?.getHospitalInfoByYkiho?.data;

  // 승인/거절 mutation
  const [accept, { loading: acceptLoading }] = useAcceptCreateHospitalRequestMutation({
    onCompleted: (res) => {
        console.log(res);
      if (res.acceptCreateHospitalRequest.success) {
        toast.success('승인되었습니다.');
        setOpen(false);
        setTimeout(() => window.location.reload(), 500);
      } else {
        toast.error(res.acceptCreateHospitalRequest.message || '승인 실패');
        setOpen(false);
      }
    },
  });
  const [deny, { loading: denyLoading }] = useDenyCreateHospitalRequestMutation({
    onCompleted: (res) => {
      if (res.denyCreateHospitalRequest.success) {
        toast.success('거절되었습니다.');
        setOpen(false);
        setTimeout(() => window.location.reload(), 500);
      } else {
        toast.error(res.denyCreateHospitalRequest.message || '거절 실패');
        setOpen(false);
      }
    },
  });

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold">병원 생성 요청 목록</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>요청ID</TableHead>
            <TableHead>YKIHO</TableHead>
            <TableHead>사용자ID</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>액션</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>요청이 없습니다.</TableCell>
            </TableRow>
          )}
          {requests.map((req: any) => (
            <TableRow key={req.id}>
              <TableCell>{req.id}</TableCell>
              <TableCell>
                <button
                  className="text-blue-600 underline hover:text-blue-800"
                  onClick={() => {
                    setSelected({ ykiho: req.ykiho, requestId: req.id });
                    setOpen(true);
                  }}
                >
                  {req.ykiho}
                </button>
              </TableCell>
              <TableCell>{req.userId}</TableCell>
              <TableCell>
                <Badge variant={stateBadgeVariant[req.state]}>{stateLabel[req.state]}</Badge>
              </TableCell>
              <TableCell>
                <button
                  className="text-blue-600 underline hover:text-blue-800"
                  onClick={() => {
                    setSelected({ ykiho: req.ykiho, requestId: req.id });
                    setOpen(true);
                  }}
                >
                  상세
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>병원 상세 정보</DialogTitle>
          </DialogHeader>
          {hospitalLoading ? (
            <div>로딩중...</div>
          ) : hospital ? (
            <div className="space-y-2 w-full">
              <div className="text-lg font-medium mb-2">신청 병원 정보</div>
              <Table className="border border-border w-full max-w-md mx-auto">
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold bg-muted border border-border w-24">병원명</TableCell>
                    <TableCell className="border border-border pl-4">{hospital.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold bg-muted border border-border w-24">주소</TableCell>
                    <TableCell className="border border-border pl-4 break-words whitespace-pre-line">{hospital.addr}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold bg-muted border border-border w-24">전화번호</TableCell>
                    <TableCell className="border border-border pl-4">{hospital.telno}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold bg-muted border border-border w-24">지역</TableCell>
                    <TableCell className="border border-border pl-4">{hospital.located || '-'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ) : (
            <div>병원 정보를 불러올 수 없습니다.</div>
          )}
          <DialogFooter>
            <SubmitButton
              loading={acceptLoading}
              onClick={() =>
                accept({ variables: { requestId: Number(selected?.requestId) } })
              }
              disabled={acceptLoading || denyLoading}
            >
              승인
            </SubmitButton>
            <Button
              variant="destructive"
              onClick={() =>
                deny({ variables: { requestId: Number(selected?.requestId) } })
              }
              disabled={acceptLoading || denyLoading}
            >
              {denyLoading ? '거절 중...' : '거절'}
            </Button>
            <DialogClose asChild>
              <button className="ml-2">닫기</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

