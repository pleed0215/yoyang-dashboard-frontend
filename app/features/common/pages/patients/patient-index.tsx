import type { Route } from './+types/patient-index';
import { useState, useEffect } from 'react';
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
import { toast } from 'sonner';

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
  const [queryStartDate, setQueryStartDate] = useState(startDate);
  const [queryEndDate, setQueryEndDate] = useState(endDate);

  // 페이지네이션 상태
  const page = Number(searchParams.get('page') ?? 1);
  const pageSize = 10;

  // 내 병원 정보
  const { data: meData, loading: meLoading } = useMeQuery();
  const hospitalId = meData?.me?.data?.hospitalId;
  const validHospitalId = typeof hospitalId === 'number' && !isNaN(hospitalId) ? hospitalId : undefined;

  // 병동/병실 상태 및 searchParams 연동
  const wards = wardRoomData || [];
  const wardNames = wards.map((w: any) => w.name);
  const wardParam = searchParams.get('ward') || '';
  const roomParam = searchParams.get('room') || '';
  const [selectedWard, setSelectedWard] = useState(wardParam);
  const [selectedRoom, setSelectedRoom] = useState(roomParam);
  const selectedWardObj = wards.find((w: any) => w.name === selectedWard);
  const rooms = selectedWardObj?.rooms || [];
  const roomNames = rooms.map((r: any) => r.name);

  // 병동이 바뀌면 병실도 초기화
  useEffect(() => {
    setSelectedRoom('');
  }, [selectedWard]);

  // 조회 버튼 클릭 시 명칭→id 변환 후 쿼리 실행
  const handleSearch = () => {
    // 날짜 유효성 검사 (생략, 기존 코드 유지)
    if (!startDate || !endDate) {
      toast.error('조회 시작일과 종료일을 모두 입력해주세요.');
      return;
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      toast.error('날짜 형식이 올바르지 않습니다. (예: 2024-01-01)');
      return;
    }
    if (startDate > endDate) {
      toast.error('조회 시작일이 종료일보다 늦을 수 없습니다.');
      return;
    }
    if (endDate < startDate) {
      toast.error('조회 종료일이 시작일보다 빠를 수 없습니다.');
      return;
    }
    // 명칭 → id 변환
    const wardId = selectedWard ? wards.find((w: any) => w.name === selectedWard)?.id : undefined;
    const roomId = selectedRoom ? rooms.find((r: any) => r.name === selectedRoom)?.id : undefined;
    setQueryStartDate(startDate);
    setQueryEndDate(endDate);
    setQueryWardId(typeof wardId === 'number' ? wardId : undefined);
    setQueryRoomId(typeof roomId === 'number' ? roomId : undefined);
    // ward/room 명칭을 searchParams에 반영 (선택된 경우만)
    if (selectedWard) {
      searchParams.set('ward', selectedWard);
    } else {
      searchParams.delete('ward');
    }
    if (selectedRoom) {
      searchParams.set('room', selectedRoom);
    } else {
      searchParams.delete('room');
    }
    searchParams.set('page', '1');
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  // 쿼리용 wardId/roomId 상태
  const [queryWardId, setQueryWardId] = useState<number | undefined>(undefined);
  const [queryRoomId, setQueryRoomId] = useState<number | undefined>(undefined);

  // 환자 목록 쿼리
  const patientQueryVars: any = {
    hospitalId: validHospitalId!,
    page,
    pageSize,
    startDate: queryStartDate,
    endDate: queryEndDate,
  };
  if (typeof queryWardId === 'number') patientQueryVars.wardId = queryWardId;
  if (typeof queryRoomId === 'number') patientQueryVars.roomId = queryRoomId;
  const { data, loading, error } = useRetrievePatientListQuery({
    variables: patientQueryVars,
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

  console.log(wards);
  console.log(patients);

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
          <div className="flex ml-2">
            <Button variant="outline" size="sm" className="rounded-r-none" onClick={() => handleDateGroup('week')}>1주일</Button>
            <Button variant="outline" size="sm" className="rounded-none border-l-0" onClick={() => handleDateGroup('month')}>1개월</Button>
            <Button variant="outline" size="sm" className="rounded-none border-l-0" onClick={() => handleDateGroup('6month')}>6개월</Button>
            <Button variant="outline" size="sm" className="rounded-l-none border-l-0" onClick={() => handleDateGroup('year')}>1년</Button>
            <div className="w-2" />
            <Button variant="default" size="sm" onClick={handleSearch}>조회</Button>
          </div>
        </div>
      </div>
      {/* 병동/병실 select UI */}
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-2">
          <label htmlFor="ward-select" className="text-sm font-medium">병동</label>
          <select
            id="ward-select"
            className="border rounded px-2 py-1"
            value={selectedWard}
            onChange={e => setSelectedWard(e.target.value)}
          >
            <option value="">전체</option>
            {wardNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="room-select" className="text-sm font-medium">병실</label>
          <select
            id="room-select"
            className="border rounded px-2 py-1"
            value={selectedRoom}
            onChange={e => setSelectedRoom(e.target.value)}
            disabled={!selectedWard}
          >
            <option value="">전체</option>
            {roomNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
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
                    <TableCell className="text-center">{wards.find((w: any) => w.id === patient.wardId)?.name ?? '-'}</TableCell>
                    <TableCell className="text-center">{wards.flatMap((w: any) => w.rooms).find((r: any) => r.id === patient.roomId)?.name ?? '-'}</TableCell>
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