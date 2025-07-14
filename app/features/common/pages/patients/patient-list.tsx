import type { Route } from './+types/patient-list';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import DateInput from '~/components/common/date-input';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY } from '~/graphql/queries';
import { contextWithToken } from '~/lib/apollo';
import { RetrieveMyHospitalWardsAndRoomsQuery } from '~/graphql/types';
import { useMeQuery, useRetrievePatientsOnThatDateQuery } from '~/graphql/operations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function getToday() {
  const today = new Date();
  return today.toISOString().slice(0, 10);
}

function addDays(dateStr: string, days: number) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}


export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const { data } = await serverApolloClient.query<RetrieveMyHospitalWardsAndRoomsQuery>({
      query: RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY,
      context: contextWithToken(request),
    });
    return {
      success: true,
      wardRoomData: data?.retrieveMyHospitalWards.data,
    };
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : '병동/병실 정보 조회 실패',
      wardRoomData: [],
    };
  }
};

export default function PatientListPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const {wardRoomData} = loaderData;
  const [date, setDate] = useState(() => searchParams.get('date') || getToday());

  // 날짜 searchParam 연동
  useEffect(() => {
    setDate(searchParams.get('date') || getToday());
  }, [searchParams]);

  const handleDateChange = (newDate: string) => {
    searchParams.set('date', newDate);
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  const handlePrevDay = () => {
    handleDateChange(addDays(date, -1));
  };
  const handleNextDay = () => {
    handleDateChange(addDays(date, 1));
  };

  // 내 병원 정보
  const { data: meData, loading: meLoading } = useMeQuery();
  const hospitalId = meData?.me?.data?.hospitalId;
  const validHospitalId = typeof hospitalId === 'number' && !isNaN(hospitalId) ? hospitalId : undefined;

  // 환자 데이터 쿼리
  const { data, loading, error } = useRetrievePatientsOnThatDateQuery({
    variables: {
      date,
      hospitalId: validHospitalId!,
    },
    skip: !validHospitalId,
    fetchPolicy: 'cache-and-network',
  });

  const patients = data?.retrievePatientsOnThatDate?.data ?? [];
  // 병동/병실 정보
  const wards = wardRoomData || [];

  // 병동별로 환자 분류
  const wardMap: Record<number, any[]> = {};
  for (const ward of wards) {
    wardMap[ward.id] = [];
  }
  for (const patient of patients) {
    if (patient.wardId && wardMap[patient.wardId]) {
      wardMap[patient.wardId].push(patient);
    }
  }

  // 전체 입원 환자 수
  const totalPatientCount = patients.length;

  if (meLoading || loading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">오류가 발생했습니다: {error.message}</div>;
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="sm" onClick={handlePrevDay} className="cursor-pointer"><ChevronLeft /></Button>
        <DateInput id="date" value={date} onChange={d => handleDateChange(d)} label="조회일" />
        <Button variant="outline" size="sm" onClick={handleNextDay} className="cursor-pointer"><ChevronRight /></Button>
      </div>
      {/* 전체 입원 환자 수 (date input 아래) */}
      <div className="text-lg font-semibold mb-2">총 입원: {totalPatientCount}명</div>
      {wards.map((ward: any) => (
        <Card key={ward.id} className="mb-6">
          <CardHeader>
            <CardTitle >
              {ward.name}
              {/* 병동별 입원 환자 수 */}
              <span className="ml-2 text-sm text-gray-500 font-normal">입원: {wardMap[ward.id]?.length ?? 0}명</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ward.rooms.length === 0 ? (
              <div className="text-gray-500">등록된 병실이 없습니다.</div>
            ) : (
              <div className="flex flex-col gap-4">
                {ward.rooms.map((room: any) => {
                  const roomPatients = patients.filter((p: any) => p.roomId === room.id);
                  return (
                    <Card key={room.id} className="border border-gray-100">
                      <CardHeader className="py-1 px-2 border-b border-gray-100 flex flex-row items-center">
                        <CardTitle className="text-sm font-normal text-foreground text-left p-0 m-0">
                          {room.name}
                        </CardTitle>
                        <div className="text-xs text-muted-foreground font-normal text-right whitespace-nowrap ml-2">
                          {room.size ? `${room.size}인실, ` : ''}{roomPatients.length}명 입원 중
                        </div>
                      </CardHeader>
                      <CardContent>
                        {roomPatients.length === 0 ? (
                          <div className="text-gray-400 text-center">환자 없음</div>
                        ) : (
                          <div className="flex flex-row flex-wrap gap-1 justify-start">
                            {roomPatients.map((patient: any) => {
                              // 나이 계산 (생년월일이 있다면)
                              let age = '-';
                              if (patient.birth) {
                                const birth = new Date(patient.birth);
                                const today = new Date(date);
                                let years = today.getFullYear() - birth.getFullYear();
                                const m = today.getMonth() - birth.getMonth();
                                if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) years--;
                                age = years.toString();
                              }
                              return (
                                <Card key={patient.id} className="w-32 min-w-[7rem] border border-gray-100 p-0 overflow-hidden">
                                  <CardContent className="py-1 px-2 flex flex-col justify-center items-center h-24">
                                    <div className="text-[10px] text-gray-400 font-normal leading-tight w-full text-center mb-0.5">차트번호 {patient.chartId ?? '-'}</div>
                                    <div className="font-semibold text-xs mb-0.5 w-full text-center">{patient.name}</div>
                                    <div className="text-[10px] text-gray-500 mb-0.5 w-full text-center">
                                      ({patient.gender ?? '-'}{patient.birth ? `, ${age}세` : ''})
                                    </div>
                                    <div className="text-[10px] text-gray-400 w-full text-center">
                                      입원일: {patient.enterDate ? new Date(patient.enterDate).toISOString().slice(0, 10) : '-'}
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 