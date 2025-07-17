import type { Route } from './+types/patient-status';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { DateTime } from 'luxon';
import { useMeQuery, useGetHospitalAdmissionReportOnDateRangeQuery } from '~/graphql/operations';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY } from '~/graphql/queries';
import { contextWithToken } from '~/lib/apollo';
import { RetrieveMyHospitalWardsAndRoomsQuery } from '~/graphql/types';
import { Button } from '~/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '~/components/ui/table';

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

function getMonthRange(isoMonth: string) {
  // isoMonth: '2024-06'
  const start = DateTime.fromISO(isoMonth + '-01').startOf('month');
  const end = start.endOf('month');
  return { start, end };
}

export default function PatientStatusPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const wardRoomData = (loaderData as unknown as { wardRoomData?: any[] })?.wardRoomData ?? [];
  const [month, setMonth] = useState(() => searchParams.get('month') || DateTime.now().toFormat('yyyy-MM'));

  // 날짜 searchParam 연동
  useEffect(() => {
    setMonth(searchParams.get('month') || DateTime.now().toFormat('yyyy-MM'));
  }, [searchParams]);

  const handleMonthChange = (newMonth: string) => {
    searchParams.set('month', newMonth);
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  // 내 병원 정보
  const { data: meData, loading: meLoading } = useMeQuery();
  const hospitalId = meData?.me?.data?.hospitalId;
  const validHospitalId = typeof hospitalId === 'number' && !isNaN(hospitalId) ? hospitalId : undefined;

  // 월별 날짜 범위 계산
  const { start, end } = getMonthRange(month);

  // 쿼리
  const { data, loading, error } = useGetHospitalAdmissionReportOnDateRangeQuery({
    variables: {
      startDate: start.toISODate(),
      endDate: end.toISODate(),
      hospitalId: validHospitalId!,
    },
    skip: !validHospitalId,
    fetchPolicy: 'cache-and-network',
  });

  const report = data?.getHospitalAdmissionReportOnDateRange ?? [];
  const wards = wardRoomData;
  const wardIdToName: Record<number, string> = {};
  for (const ward of wards) {
    wardIdToName[ward.id] = ward.name;
  }
  // 병동 id 정렬
  const wardIds = wards.map((w: any) => w.id);

  if (meLoading || loading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">오류가 발생했습니다: {error.message}</div>;
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold mb-2">월별 입원/퇴원/재원 현황</h1>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="month"
          value={month}
          onChange={e => handleMonthChange(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        />
        <Button size="sm" variant="outline" onClick={() => handleMonthChange(DateTime.fromISO(month + '-01').minus({ months: 1 }).toFormat('yyyy-MM'))}>이전달</Button>
        <Button size="sm" variant="outline" onClick={() => handleMonthChange(DateTime.fromISO(month + '-01').plus({ months: 1 }).toFormat('yyyy-MM'))}>다음달</Button>
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        <Table className="min-w-3xl max-w-6xl w-full text-xs">
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              <TableHead className="border px-0.5 py-0.5 text-center w-24 whitespace-nowrap text-xs" rowSpan={2}>날짜</TableHead>
              <TableHead className="border px-0.5 py-0.5 text-center text-xs w-10 whitespace-nowrap" rowSpan={2}>전체 재원</TableHead>
              <TableHead className="border px-0.5 py-0.5 text-center text-xs w-10 whitespace-nowrap" rowSpan={2}>입원</TableHead>
              <TableHead className="border px-0.5 py-0.5 text-center text-xs w-10 whitespace-nowrap" rowSpan={2}>퇴원</TableHead>
              {wardIds.map(wardId => (
                <TableHead key={wardId} className="border px-0.5 py-0.5 text-center text-xs" colSpan={3}>{wardIdToName[wardId]}</TableHead>
              ))}
            </TableRow>
            <TableRow className="bg-muted hover:bg-muted">
              {wardIds.map(wardId => [
                <TableHead key={wardId + '-current'} className="border px-0.5 py-1 text-center text-xs w-10 whitespace-nowrap">재원</TableHead>,
                <TableHead key={wardId + '-enter'} className="border px-0.5 py-1 text-center text-xs w-10 whitespace-nowrap">입원</TableHead>,
                <TableHead key={wardId + '-leave'} className="border px-0.5 py-1 text-center text-xs w-10 whitespace-nowrap">퇴원</TableHead>,
              ])}
            </TableRow>
          </TableHeader>
          <TableBody>
            {report.map((row: any) => (
              <TableRow key={row.date}>
                <TableCell className="border px-0.5 py-1 text-center w-20 whitespace-nowrap text-xs">{DateTime.fromISO(row.date).toFormat('yyyy-MM-dd')}</TableCell>
                <TableCell className="border px-0.5 py-1 text-center text-xs w-10 whitespace-nowrap">{row.currentCount}</TableCell>
                <TableCell className="border px-0.5 py-1 text-center text-xs w-10 whitespace-nowrap">{row.enterCount}</TableCell>
                <TableCell className="border px-0.5 py-1 text-center text-xs w-10 whitespace-nowrap">{row.leaveCount}</TableCell>
                {wardIds.map(wardId => {
                  const wardRow = (row.ward ?? []).find((w: any) => w.wardInfo?.id === wardId);
                  return [
                    <TableCell key={wardId + '-current'} className="border px-0.5 py-1 text-center text-xs">{wardRow?.currentCount ?? '-'}</TableCell>,
                    <TableCell key={wardId + '-enter'} className="border px-0.5 py-1 text-center text-xs">{wardRow?.enterCount ?? '-'}</TableCell>,
                    <TableCell key={wardId + '-leave'} className="border px-0.5 py-1 text-center text-xs">{wardRow?.leaveCount ?? '-'}</TableCell>,
                  ];
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 