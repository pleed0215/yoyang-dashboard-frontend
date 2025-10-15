import type { Route } from './+types/patient-list';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import DateInput from '~/components/common/date-input';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY } from '~/graphql/queries';
import { contextWithToken } from '~/lib/apollo';
import { RetrieveMyHospitalWardsAndRoomsQuery, RetrievePatientsOnThatDateQuery } from '~/graphql/types';
import { useMeQuery, useRetrievePatientsOnThatDateQuery } from '~/graphql/operations';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Separator } from '~/components/ui/separator';
import { DateTime } from 'luxon';
import { useQuery } from '@apollo/client';

function getToday() {
  return DateTime.now().toFormat('yyyy-MM-dd');
}

function addDays(dateStr: string, days: number) {
  return DateTime.fromISO(dateStr).plus({ days }).toFormat('yyyy-MM-dd');
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
  const [date, setDate] = useState(() => searchParams.get('date') || getToday());
  
  // Use query hook for real-time ward/room data
  const { data: wardRoomQueryData } = useQuery<RetrieveMyHospitalWardsAndRoomsQuery>(
    RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY,
    {
      fetchPolicy: 'network-only',
    }
  );
  
  // Use query data if available, otherwise fallback to loader data
  const wardRoomData = wardRoomQueryData?.retrieveMyHospitalWards?.data || loaderData?.wardRoomData;

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

  // 병동/병실 정보
  const wards = (wardRoomData ?? []) as NonNullable<RetrieveMyHospitalWardsAndRoomsQuery['retrieveMyHospitalWards']>['data'] ?? [];
  
  // 로딩/에러 체크를 먼저 해야 함
  if (meLoading || loading || !wardRoomData) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">오류가 발생했습니다: {error.message}</div>;
  }

  const patients = (data?.retrievePatientsOnThatDate?.data ?? []) as NonNullable<RetrievePatientsOnThatDateQuery['retrievePatientsOnThatDate']>['data'];

  // 병동별로 환자 분류
  const wardMap: Record<number, typeof patients> = {};
  // 병실별로 환자 분류 - 미리 계산
  const roomMap: Record<number, typeof patients> = {};
  
  for (const ward of wards ?? []) {
    wardMap[ward.id] = [];
    if (ward.rooms) {
      for (const room of ward.rooms) {
        roomMap[room.id] = [];
      }
    }
  }
  
  for (const patient of (patients ?? [])) {
    if (patient.wardId) {
      wardMap[patient.wardId] ??= [];
      (wardMap[patient.wardId]!).push(patient);
    }
    if (patient.roomId) {
      roomMap[patient.roomId] ??= [];
      (roomMap[patient.roomId]!).push(patient);
    }
  }

  // 전체 입원 환자 수
  const totalPatientCount = (patients ?? []).length;

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold mb-2">입원 현황</h1>
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="sm" onClick={handlePrevDay} className="cursor-pointer"><ChevronLeft /></Button>
        <DateInput id="date" value={date} onChange={d => handleDateChange(d)} label="조회일" />
        <Button variant="outline" size="sm" onClick={handleNextDay} className="cursor-pointer"><ChevronRight /></Button>
      </div>
      {/* 전체 입원 환자 수 (date input 아래) */}
      <div className="text-lg font-semibold mb-2">총 입원: {totalPatientCount}명</div>
      {(wards ?? []).map((ward) => (
        <Card key={ward.id} className="mb-6">
          <CardHeader>
            <CardTitle >
              {ward.name}
              {/* 병동별 입원 환자 수 */}
              <span className="ml-2 text-sm text-gray-500 font-normal">입원: {wardMap[ward.id]?.length ?? 0}명</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!(ward.rooms && ward.rooms.length > 0) ? (
              <div className="text-gray-500">등록된 병실이 없습니다.</div>
            ) : (
              <div className="flex flex-col gap-4">
                {(ward.rooms ?? []).map((room) => {
                  const roomPatients = roomMap[room.id] ?? [];
                  return (
                    <Card key={room.id} className="border border-gray-100">
                      <CardContent>
                        <div className="flex flex-row items-center justify-start mb-1">
                          <span className="text-sm font-normal text-foreground text-left">{room.name}</span>
                          <span className="text-xs text-muted-foreground font-normal text-right whitespace-nowrap ml-2">
                            {room.size ? `${room.size}인실, ` : ''}{roomPatients.length}명 입원 중
                          </span>
                        </div>
                        {roomPatients.length === 0 ? (
                          <div className="text-gray-400 text-center">환자 없음</div>
                        ) : (
                          <div className="flex flex-row flex-wrap gap-1 justify-start">
                            {/* 입원 환자 카드 */}
                            {roomPatients.map((patient) => {
                              const birthValue = patient.birthDate;
                              let age = '-';
                              if (birthValue) {
                                const birth = DateTime.fromISO(birthValue);
                                const today = DateTime.fromISO(date);
                                let years = today.year - birth.year;
                                if (
                                  today.month < birth.month ||
                                  (today.month === birth.month && today.day < birth.day)
                                ) {
                                  years--;
                                }
                                age = years.toString();
                              }
                              return (
                                <Card key={patient.id} className="w-32 min-w-[7rem] border border-gray-100 p-0 overflow-hidden">
                                  <CardContent className="py-1 px-2 flex flex-col justify-center items-center h-24">
                                    <div className="text-[10px] text-gray-400 font-normal leading-tight w-full text-center mb-0.5">차트번호 {patient.chartId ?? '-'}</div>
                                    <div className="font-semibold text-xs mb-0.5 w-full text-center">
                                      {patient.name}
                                      <span className="text-[10px] text-gray-500 ml-1 align-middle">
                                        ({patient.gender === 'MALE' ? '남' : patient.gender === 'FEMALE' ? '여' : '-'}{birthValue ? `, ${age}세` : ''})
                                      </span>
                                    </div>
                                    <div className="text-[10px] text-gray-400 w-full text-center">
                                      입원일: {patient.enterDate ? DateTime.fromISO(patient.enterDate).toFormat('yyyy-MM-dd') : '-'}
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })}
                            {/* 빈 침상 카드 */}
                            {room.size && room.size > roomPatients.length &&
                              Array.from({ length: room.size - roomPatients.length }).map((_, idx) => (
                                <Card key={`empty-bed-${room.id}-${idx}`} className="w-32 min-w-[7rem] border border-dashed border-gray-200 p-0 overflow-hidden bg-muted">
                                  <CardContent className="py-1 px-2 flex flex-col justify-center items-center h-24">
                                    <div className="flex-1 flex items-center justify-center w-full h-full text-xs text-gray-400">빈 병상</div>
                                  </CardContent>
                                </Card>
                              ))}
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