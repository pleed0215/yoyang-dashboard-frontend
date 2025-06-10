import { gql, useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Alert, AlertDescription } from '~/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { contextWithToken } from '~/lib/apollo';
import { SubmitButton } from '~/components/common/submit-button';
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table';
import { stateLabel } from '~/lib/enum-mapping';
import { GET_REQUEST_HOSPITAL_QUERY, GET_HOSPITAL_INFO_QUERY, CREATE_HOSPITAL_REQUEST_MUTATION } from '~/graphql/queries';


export const loader = async ({ request, params }: any) => {
  const ykiho = params?.ykiho;
  if (!ykiho) return { mode: 'error', message: '병원 정보가 없습니다.' };
  // 1. 먼저 request가 있는지 확인
  const { data: reqData } = await serverApolloClient.query({
    query: GET_REQUEST_HOSPITAL_QUERY,
    variables: { ykiho },
    context: { ...contextWithToken(request) },
    fetchPolicy: 'no-cache',
  });
  const requestInfo = reqData?.getRegisterRequest;
  if (requestInfo?.data) {
    return {
      mode: 'request',
      message: requestInfo.message,
      state: requestInfo.data.state,
    };
  }
  // 2. 없으면 병원 정보 조회
  const { data: hospData } = await serverApolloClient.query({
    query: GET_HOSPITAL_INFO_QUERY,
    variables: { ykiho },
    context: { ...contextWithToken(request) },
    fetchPolicy: 'no-cache',
  });
  const hospital = hospData?.getHospitalInfoByYkiho?.data;
  if (!hospital) {
    return { mode: 'error', message: '병원 정보를 찾을 수 없습니다.' };
  }
  return {
    mode: 'info',
    hospital,
  };
};

export default function StaffHospitalRequestPage() {
  const loaderData = useLoaderData() as any;
  const apolloClient = useApolloClient();
  const { ykiho } = useParams();
  const [loading, setLoading] = useState(false);

  // toast는 등록 mutation 성공 시에만
  useEffect(() => {
    if (loaderData.mode === 'request' && loaderData.message) {
      toast.info(loaderData.message);
    }
  }, [loaderData.mode, loaderData.message]);

  const handleRegisterRequest = async () => {
    if (!ykiho) return;
    setLoading(true);
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_HOSPITAL_REQUEST_MUTATION,
        variables: { ykiho },
      });
      if (data?.requestCreateHospital?.success) {
        toast.success(data.requestCreateHospital.message || '등록신청이 완료되었습니다.');
        window.location.reload();
      } else {
        toast.error(data?.requestCreateHospital?.message || '등록신청에 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight text-center">
            병원 등록 신청
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loaderData.mode === 'error' && loaderData.message && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{loaderData.message}</AlertDescription>
            </Alert>
          )}
          {loaderData.mode === 'request' && (
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="text-lg font-medium">등록 신청이 진행 중입니다.</div>
              {loaderData.state && (
                <div>
                  <span className="font-medium">현재 상태: </span>
                  <span>{stateLabel[loaderData.state] || loaderData.state}</span>
                </div>
              )}
              {loaderData.message && (
                <div className="text-sm text-muted-foreground">{loaderData.message}</div>
              )}
            </div>
          )}
          {loaderData.mode === 'info' && loaderData.hospital && (
            <div className="flex flex-col items-center gap-4 mb-4 w-full">
              <div className="text-lg font-medium">신청 병원 정보</div>
              <Table className="border border-border" style={{ width: 'auto' }}>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold bg-muted border border-border w-24">
                      병원명
                    </TableCell>
                    <TableCell className="border border-border pl-4">
                      {loaderData.hospital.name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold bg-muted border border-border w-24">
                      주소
                    </TableCell>
                    <TableCell className="border border-border pl-4 break-words whitespace-pre-line">
                      {loaderData.hospital.addr}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold bg-muted border border-border w-24">
                      전화번호
                    </TableCell>
                    <TableCell className="border border-border pl-4">
                      {loaderData.hospital.telno}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold bg-muted border border-border w-24">
                      지역
                    </TableCell>
                    <TableCell className="border border-border pl-4">
                      {loaderData.hospital.located || '-'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <SubmitButton onClick={handleRegisterRequest} loading={loading} className="w-full">
                등록 신청
              </SubmitButton>
            </div>
          )}
          <Button variant="secondary" onClick={() => window.history.back()} className="w-full mt-2">
            돌아가기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
