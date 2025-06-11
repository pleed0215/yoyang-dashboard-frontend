import { Route } from './+types/staff-hospital-join-request';
import { useApolloClient } from '@apollo/client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Alert, AlertDescription } from '~/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { SubmitButton } from '~/components/common/submit-button';
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table';
import { GET_HOSPITAL_BY_YKIHO_QUERY, REQUEST_JOIN_HOSPITAL_MUTATION } from '~/graphql/queries';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { contextWithToken } from '~/lib/apollo';
import { GetHospitalByYkihoQuery, GetHospitalByYkihoQueryVariables } from '~/graphql/types';
import { useNavigate } from 'react-router';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '~/components/ui/dialog';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const ykiho = params?.ykiho;
  if (!ykiho) return { error: '병원 정보가 없습니다.' };
  const { data } = await serverApolloClient.query<
    GetHospitalByYkihoQuery,
    GetHospitalByYkihoQueryVariables
  >({
    query: GET_HOSPITAL_BY_YKIHO_QUERY,
    variables: { ykiho },
    context: { ...contextWithToken(request) },
    fetchPolicy: 'no-cache',
  });
  const hospital = data?.getHospitalByYkiho?.data;
  if (!hospital) return { error: '병원 정보를 찾을 수 없습니다.' };
  return { ykiho, hospital };
};

export default function StaffHospitalJoinRequestPage({ loaderData }: Route.ComponentProps) {
  const apolloClient = useApolloClient();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  if (loaderData.error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight text-center">
              병원 가입 신청
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{loaderData.error}</AlertDescription>
            </Alert>
            <Button
              variant="secondary"
              onClick={() => window.history.back()}
              className="w-full mt-2"
            >
              돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { hospital, ykiho } = loaderData;

  const handleJoinRequest = async () => {
    if (!hospital?.id) return;
    setLoading(true);
    try {
      const { data } = await apolloClient.mutate({
        mutation: REQUEST_JOIN_HOSPITAL_MUTATION,
        variables: { hospitalId: Number(hospital.id) },
      });
      if (data?.requestJoinHospital?.success) {
        setDialogMessage(data.requestJoinHospital.message || '가입신청이 완료되었습니다.');
      } else {
        setDialogMessage(data?.requestJoinHospital?.message || '가입신청에 실패했습니다.');
      }
      setDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight text-center">
            병원 가입 신청
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hospital && (
            <div className="flex flex-col items-center gap-4 mb-4 w-full">
              <div className="text-lg font-medium">신청 병원 정보</div>
              <Table className="border border-border w-full">
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold bg-muted border border-border w-24">
                      병원명
                    </TableCell>
                    <TableCell className="border border-border pl-4">{hospital.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold bg-muted border border-border w-24">
                      지역
                    </TableCell>
                    <TableCell className="border border-border pl-4">
                      {hospital.located || '-'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <SubmitButton onClick={handleJoinRequest} loading={loading} className="w-full">
                가입 신청
              </SubmitButton>
            </div>
          )}
          <Button variant="secondary" onClick={() => navigate(-1)} className="w-full mt-2">
            돌아가기
          </Button>
        </CardContent>
      </Card>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>알림</DialogTitle>
          </DialogHeader>
          <DialogDescription>{dialogMessage}</DialogDescription>
          <DialogFooter>
            <Button onClick={() => navigate('/staff/hospitals/pending')}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
