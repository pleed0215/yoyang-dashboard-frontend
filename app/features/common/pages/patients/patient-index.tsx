import type { Route } from './+types/patient-index';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import DateInput from '~/components/common/date-input';
import { Button } from '~/components/ui/button';
import PageInfo from '~/components/common/page-info';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '~/components/ui/table';
import { Plus } from 'lucide-react';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY } from '~/graphql/queries';
import { contextWithToken } from '~/lib/apollo';
import { RetrieveMyHospitalWardsAndRoomsQuery } from '~/graphql/types';
import { useMeQuery, useRetrievePatientListQuery } from '~/graphql/operations';

function getToday() {
  const today = new Date();
  return today.toISOString().slice(0, 10);
}

function getDateBefore(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
}

function getDateBeforeMonth(month: number) {
  const date = new Date();
  date.setMonth(date.getMonth() - month);
  return date.toISOString().slice(0, 10);
}

export const loader = async ({ request }: Route.LoaderArgs) => {
    try{
        const { data } = await serverApolloClient.query<RetrieveMyHospitalWardsAndRoomsQuery>({
            query: RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY,
            context: contextWithToken(request),
        })
        return {
            success: true,
            data: data?.retrieveMyHospitalWards.data,
        }
    }catch(e){
        return {
            success: false,
            message: e instanceof Error ? e.message : '환자 목록 조회 실패',
            data: [],
        }
    }
    
}

export default function PatientIndexPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: wardRoomData } = loaderData;

  // 날짜 상태
  const [startDate, setStartDate] = useState(getDateBefore(7)); // 기본 1주일 전
  const [endDate, setEndDate] = useState(getToday());

  // 페이지네이션 상태
  const page = Number(searchParams.get('page') ?? 1);
  const pageSize = 10;

  // 내 병원 정보
  const { data: meData, loading: meLoading } = useMeQuery();
  const hospitalId = meData?.me?.data?.hospitalId;
  const validHospitalId = typeof hospitalId === 'number' && !isNaN(hospitalId) ? hospitalId : undefined;

  // 환자 목록 쿼리
  const { data, loading, error } = useRetrievePatientListQuery({
    variables: {
      hospitalId: validHospitalId!, // undefined일 때는 skip
      page,
      pageSize,
      startDate,
      endDate,
    },
    skip: !validHospitalId,
    fetchPolicy: 'cache-and-network',
  });

  // 그룹 버튼 핸들러
  const handleDateGroup = (type: 'week' | 'month' | '6month' | 'year') => {
    switch (type) {
      case 'week':
        setStartDate(getDateBefore(7));
        setEndDate(getToday());
        break;
      case 'month':
        setStartDate(getDateBeforeMonth(1));
        setEndDate(getToday());
        break;
      case '6month':
        setStartDate(getDateBeforeMonth(6));
        setEndDate(getToday());
        break;
      case 'year':
        setStartDate(getDateBeforeMonth(12));
        setEndDate(getToday());
        break;
    }
  };

  // 환자 데이터
  const patients = data?.retrievePatientList?.data ?? [];
  const pageInfo = data?.retrievePatientList?.pageInfo;
  const totalPages = pageInfo?.totalPages ?? 1;

  if (meLoading || loading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">오류가 발생했습니다: {error.message}</div>;
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">환자 관리</h1>
        <Button onClick={() => navigate('/patients/add')} className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          환자 추가
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <DateInput id="start-date" value={startDate} onChange={setStartDate} label="조회 시작일" />
          <span>~</span>
          <DateInput id="end-date" value={endDate} onChange={setEndDate} label="조회 종료일" />
          <div className="flex gap-2 ml-2">
            <Button variant="outline" size="sm" onClick={() => handleDateGroup('week')}>1주일</Button>
            <Button variant="outline" size="sm" onClick={() => handleDateGroup('month')}>1개월</Button>
            <Button variant="outline" size="sm" onClick={() => handleDateGroup('6month')}>6개월</Button>
            <Button variant="outline" size="sm" onClick={() => handleDateGroup('year')}>1년</Button>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>환자 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">ID</TableHead>
                <TableHead className="text-center">이름</TableHead>
                <TableHead className="text-center">성별</TableHead>
                <TableHead className="text-center">병동</TableHead>
                <TableHead className="text-center">병실</TableHead>
                <TableHead className="text-center">입원일</TableHead>
                <TableHead className="text-center">퇴원일</TableHead>
                <TableHead className="text-center">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.length === 0 ? (
                <TableRow>
                  <TableCell className="text-center" colSpan={8}>데이터 없음</TableCell>
                </TableRow>
              ) : (
                patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="text-center">{patient.id}</TableCell>
                    <TableCell className="text-center">{patient.name}</TableCell>
                    <TableCell className="text-center">{patient.gender ?? '-'}</TableCell>
                    <TableCell className="text-center">{patient.wardId ?? '-'}</TableCell>
                    <TableCell className="text-center">{patient.roomId ?? '-'}</TableCell>
                    <TableCell className="text-center">{patient.enterDate ? new Date(patient.enterDate).toLocaleDateString() : '-'}</TableCell>
                    <TableCell className="text-center">{patient.leaveDate ? new Date(patient.leaveDate).toLocaleDateString() : '-'}</TableCell>
                    <TableCell className="text-center">-</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex justify-center mt-4">
        <PageInfo totalPages={totalPages} />
      </div>
    </div>
  );
} 