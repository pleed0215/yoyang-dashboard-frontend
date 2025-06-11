import { gql, useApolloClient } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { LabelInput } from '~/components/common/label-input';
import { Button } from '~/components/ui/button';
import { Alert, AlertDescription } from '~/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from '~/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Form } from 'react-router';
// import type { Route } from '~/graphql/types';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { contextWithToken } from '~/lib/apollo';
import { RetrieveHospitalListQuery, RetrieveHospitalListQueryVariables } from '~/graphql/types';
import { SubmitButton } from '~/components/common/submit-button';

const RETRIEVE_HOSPITAL_LIST_QUERY = gql`
  query RetrieveHospitalList($name: String!) {
    retrieveHospitalList(hospitalName: $name) {
      success
      message
      data {
        ykiho
        name
        telno
        located
        addr
        registered
      }
    }
  }
`;

const searchSchema = z.object({
  name: z.string().min(2, '병원명은 2글자 이상 입력해주세요.'),
});
type SearchFormData = z.infer<typeof searchSchema>;

export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const name = url.searchParams.get('name');
  if (!name) return { data: null, apolloState: null };
  const { data } = await serverApolloClient.query<RetrieveHospitalListQuery, RetrieveHospitalListQueryVariables>({
    query: RETRIEVE_HOSPITAL_LIST_QUERY,
    variables: { name },
    context: { ...contextWithToken(request) },
    fetchPolicy: 'no-cache',
  });
  console.log(data);
  return {
    data: data?.retrieveHospitalList?.data ?? [],
    apolloState: serverApolloClient.extract(),
  };
};

export default function StaffHospitalFindPage({ loaderData }: any) {
  const { data, apolloState } = loaderData ?? {};
  const apolloClient = useApolloClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState<string | null>(null);

  useEffect(() => {
    if (apolloState) apolloClient.cache.restore(apolloState);
  }, [apolloState]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { name: searchParams.get('name') ?? '' },
  });

  // 더 간단한 폼 제출 핸들러
  const handleFormSubmit = (form: SearchFormData) => {
    setSearchParams({ name: form.name });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 antialiased dark:bg-neutral-950">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">병원 검색</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="get" className="space-y-4 mb-8" onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <LabelInput
                id="name"
                label="병원명"
                placeholder="병원명을 입력하세요"
                {...register('name')}
              />
              {errors.name && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.name.message}</AlertDescription>
                </Alert>
              )}
            </div>
            <SubmitButton className="w-full">검색</SubmitButton>
          </Form>

          <Table>
            <TableHeader>
              <TableRow className="*:text-center">
                <TableHead>병원명</TableHead>
                <TableHead>지역</TableHead>
                <TableHead>전화번호</TableHead>
                <TableHead>등록 여부</TableHead>
                <TableHead>액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((hospital: any) => (
                  <TableRow key={hospital.ykiho} className="*:text-center">
                    <TableCell>{hospital.name}</TableCell>
                    <TableCell>{hospital.located}</TableCell>
                    <TableCell>{hospital.telno}</TableCell>
                    <TableCell>{hospital.registered ? '등록됨' : '미등록'}</TableCell>
                    <TableCell>
                      {hospital.registered ? (
                        <Dialog open={dialogOpen === hospital.ykiho} onOpenChange={open => setDialogOpen(open ? hospital.ykiho : null)}>
                          <DialogTrigger asChild>
                            <Button variant="outline">가입신청</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>병원 가입 신청</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                              정말로 <b>{hospital.name}</b>에 가입 신청하시겠습니까?
                            </DialogDescription>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="secondary">아니오</Button>
                              </DialogClose>
                              <Button variant="destructive" onClick={() => { setDialogOpen(null); navigate(`/staff/hospitals/join-request/${hospital.ykiho}`); }}>예</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Dialog open={dialogOpen === hospital.ykiho} onOpenChange={open => setDialogOpen(open ? hospital.ykiho : null)}>
                          <DialogTrigger asChild>
                            <Button variant="outline">등록신청</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>병원 등록 신청</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                              정말로 <b>{hospital.name}</b>을(를) 등록 신청하시겠습니까?
                            </DialogDescription>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="secondary">아니오</Button>
                              </DialogClose>
                              <Button variant="destructive" onClick={() => { setDialogOpen(null); navigate(`/staff/hospitals/request/${hospital.ykiho}`); }}>예</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">검색 결과가 없습니다.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
