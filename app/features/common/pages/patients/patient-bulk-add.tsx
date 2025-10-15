import type { Route } from './+types/patient-bulk-add';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { ArrowLeft, Check, Upload, X } from 'lucide-react';
import { Label } from '~/components/ui/label';
import { useMeQuery, useBulkCreatePatientsMutation } from '~/graphql/operations';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  PatientGender,
  RetrieveMyHospitalWardsAndRoomsQuery,
  DuplicateHandlingStrategy,
} from '~/graphql/types';
import { contextWithToken } from '~/lib/apollo';
import { RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY } from '~/graphql/queries';
import { serverApolloClient } from '~/lib/apollo-client-server';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '~/components/ui/table';

const REQUIRED_COLUMNS = ['이름', '차트ID', '성별', '병동', '병실', '입원일', '퇴원일', '생년월일'];

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const { data } = await serverApolloClient.query<RetrieveMyHospitalWardsAndRoomsQuery>({
      query: RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY,
      context: contextWithToken(request),
      fetchPolicy: 'network-only',
    });

    // Extract apollo state for SSR hydration
    const apolloState = serverApolloClient.cache.extract();
    return {
      success: true,
      data: data?.retrieveMyHospitalWards.data,
      apolloState,
    };
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : '환자 일괄 등록 페이지 로딩 실패',
      data: [],
      apolloState: {},
    };
  }
};

// 병동 이름으로 id 찾기
function findWardIdByName(wardName: string, wards: any[]): number | undefined {
  const ward = wards.find(w => w.name === wardName);
  return ward ? Number(ward.id) : undefined;
}

// 병실 이름으로 id 찾기 (병동 id도 필요)
function findRoomIdByName(roomName: string, wardName: string, wards: any[]): number | undefined {
  const ward = wards.find(w => w.name === wardName);
  if (!ward) return undefined;
  const room = ward.rooms.find((r: any) => r.name === roomName);
  return room ? Number(room.id) : undefined;
}

// 파일에서 읽은 성별 값을 PatientGender로 변환
function getPatientGenderFromString(value: string): PatientGender | undefined {
  if (!value) return undefined;
  const v = value.trim();
  if (v === '남' || v === '남성' || v.toUpperCase() === 'MALE') return PatientGender.Male;
  if (v === '여' || v === '여성' || v.toUpperCase() === 'FEMALE') return PatientGender.Female;
  return undefined;
}

export default function PatientBulkAddPage({ loaderData }: any) {
  const navigate = useNavigate();
  const { data: meData } = useMeQuery();
  const hospitalId = meData?.me?.data?.hospitalId;

  // Use query hook instead of loader data for real-time updates
  const { data: queryData, loading: queryLoading } = useQuery<RetrieveMyHospitalWardsAndRoomsQuery>(
    RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY,
    {
      fetchPolicy: 'network-only',
    }
  );

  // Use query data if available, otherwise fallback to loader data
  const wardRoomData = queryData?.retrieveMyHospitalWards?.data || loaderData?.data || [];

  const [bulkCreatePatients, { loading: bulkLoading }] = useBulkCreatePatientsMutation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [fileType, setFileType] = useState<'CSV' | 'EXCEL'>('EXCEL');
  const [filePreviewOpen, setFilePreviewOpen] = useState(false);
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [missingColumns, setMissingColumns] = useState<string[]>([]);
  const [fileError, setFileError] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<{ row: number; message: string }[]>([]);
  const [duplicateStrategy, setDuplicateStrategy] = useState<DuplicateHandlingStrategy>(
    DuplicateHandlingStrategy.Skip
  );

  const wards = wardRoomData || [];

  // 엑셀/CSV 업로드
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    setParsedRows([]);
    setMissingColumns([]);
    setValidationErrors([]);
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      const ext = f.name.split('.').pop()?.toLowerCase();
      const reader = new FileReader();
      reader.onload = evt => {
        try {
          let rows: any[] = [];
          if (ext === 'csv') {
            const parsed = Papa.parse(evt.target?.result as string, { header: true });
            rows = parsed.data as any[];
          } else if (ext === 'xlsx') {
            const data = new Uint8Array(evt.target?.result as ArrayBuffer);
            const wb = XLSX.read(data, { type: 'array', dateNF: 'yyyy-mm-dd', cellDates: true });
            const ws = wb.Sheets[wb.SheetNames[0]];
            rows = XLSX.utils.sheet_to_json(ws, { raw: false, defval: '' });
          } else {
            setFileError('지원하지 않는 파일 형식입니다.');
            return;
          }
          // 빈 행 필터링
          rows = rows.filter(row => row['이름'] || row['차트ID']);

          // 필수 컬럼 체크 (모든 행의 키 합집합)
          const columns = Array.from(new Set(rows.flatMap(row => Object.keys(row))));
          const missing = REQUIRED_COLUMNS.filter(col => !columns.includes(col));

          // 데이터 검증
          const errors: { row: number; message: string }[] = [];
          rows.forEach((row, index) => {
            const rowNum = index + 2; // 헤더 행 + 0-based index

            // 필수 필드 체크
            if (!row['이름']) errors.push({ row: rowNum, message: '이름이 없습니다' });
            if (!row['차트ID']) errors.push({ row: rowNum, message: '차트ID가 없습니다' });
            if (!row['성별']) errors.push({ row: rowNum, message: '성별이 없습니다' });
            if (!row['병동']) errors.push({ row: rowNum, message: '병동이 없습니다' });
            if (!row['병실']) errors.push({ row: rowNum, message: '병실이 없습니다' });

            // 병동/병실 매칭 체크
            if (row['병동']) {
              const wardId = findWardIdByName(row['병동'], wards);
              if (!wardId) {
                errors.push({ row: rowNum, message: `'${row['병동']}' 병동을 찾을 수 없습니다` });
              } else if (row['병실']) {
                const roomId = findRoomIdByName(row['병실'], row['병동'], wards);
                if (!roomId) {
                  errors.push({
                    row: rowNum,
                    message: `'${row['병동']}'의 '${row['병실']}' 병실을 찾을 수 없습니다`,
                  });
                }
              }
            }

            // 성별 체크
            if (row['성별']) {
              const gender = getPatientGenderFromString(row['성별']);
              if (!gender) {
                errors.push({
                  row: rowNum,
                  message: `'${row['성별']}' 는 올바른 성별 값이 아닙니다. (남성/여성만 가능)`,
                });
              }
            }
          });

          setParsedRows(rows);
          setMissingColumns(missing);
          setValidationErrors(errors);
          setFilePreviewOpen(true);
        } catch (err) {
          setFileError('파일 파싱 중 오류가 발생했습니다.');
        }
      };
      if (ext === 'csv') reader.readAsText(f);
      else if (ext === 'xlsx') reader.readAsArrayBuffer(f);
      else setFileError('지원하지 않는 파일 형식입니다.');
    }
  };

  // Dialog 내에서 업로드
  const handleDialogUpload = async () => {
    if (!parsedRows.length || !hospitalId) return;
    setFileError('');
    try {
      const patients = parsedRows
        .map(row => {
          const wardId = findWardIdByName(row['병동'], wards);
          const roomId = findRoomIdByName(row['병실'], row['병동'], wards);
          const gender = getPatientGenderFromString(row['성별']);
          if (!wardId || !roomId || !gender) return null;
          return {
            name: row['이름'],
            chartId: Number(row['차트ID']),
            gender,
            wardId,
            roomId,
            enterDate: row['입원일'] || undefined,
            leaveDate: row['퇴원일'] || undefined,
            birthDate: row['생년월일'] || undefined,
            hospitalId,
          };
        })
        .filter((x): x is (typeof patients)[0] => x !== null);
      const result = await bulkCreatePatients({
        variables: {
          input: {
            patients,
            duplicateStrategy,
          },
        },
      });
      if (result.data?.bulkCreatePatients?.success) {
        const response = result.data.bulkCreatePatients;
        setSuccessMessage(
          `파일 업로드가 성공적으로 완료되었습니다.\n\n총 ${response.totalCount}건 중:\n- 생성: ${response.createdCount}건\n- 건너뛴 항목: ${response.skippedCount}건\n- 덮어쓰기: ${response.overriddenCount}건\n- 실패: ${response.failedCount}건`
        );
        setShowSuccessModal(true);
        setFilePreviewOpen(false);
        // Clear file after successful upload
        setFile(null);
        setParsedRows([]);
        setMissingColumns([]);
        setValidationErrors([]);
        setFileError('');
        setFileInputKey(Date.now());
      } else {
        setFileError(result.data?.bulkCreatePatients?.message || '파일 업로드 실패');
      }
    } catch (error) {
      setFileError('업로드 중 오류가 발생했습니다.');
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/patients');
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate('/patients')} className="cursor-pointer">
          <ArrowLeft className="mr-2 h-4 w-4" />
          목록으로 돌아가기
        </Button>
        <h1 className="text-2xl font-bold">환자 일괄 등록</h1>
      </div>

      {/* 엑셀/CSV 업로드 */}
      <Card>
        <CardHeader>
          <CardTitle>엑셀/CSV로 환자 일괄 등록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-2 flex-1">
                <Input
                  key={fileInputKey}
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                {file && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFile(null);
                      setParsedRows([]);
                      setMissingColumns([]);
                      setValidationErrors([]);
                      setFileError('');
                      setFileInputKey(Date.now()); // Force input reset
                    }}
                    className="h-9 w-9 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Select value={fileType} onValueChange={v => setFileType(v as 'CSV' | 'EXCEL')}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSV">CSV</SelectItem>
                  <SelectItem value="EXCEL">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 중복 처리 전략 선택 */}
            <div className="space-y-2">
              <Label htmlFor="duplicateStrategy">중복 환자 처리 방식</Label>
              <Select
                value={duplicateStrategy}
                onValueChange={v => setDuplicateStrategy(v as DuplicateHandlingStrategy)}
              >
                <SelectTrigger id="duplicateStrategy">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DuplicateHandlingStrategy.Skip}>
                    건너뛰기 - 중복된 차트ID가 있으면 해당 환자를 건너뜁니다
                  </SelectItem>
                  <SelectItem value={DuplicateHandlingStrategy.Override}>
                    덮어쓰기 - 중복된 차트ID가 있으면 새 정보로 업데이트합니다
                  </SelectItem>
                  <SelectItem value={DuplicateHandlingStrategy.Cancel}>
                    취소 - 중복된 차트ID가 하나라도 있으면 전체 작업을 취소합니다
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                차트ID가 이미 존재하는 환자가 있을 때 어떻게 처리할지 선택하세요.
              </p>
            </div>
          </div>
          {/* 엑셀/CSV 업로드 필수 컬럼 안내 */}
          <div className="mt-4 text-sm text-muted-foreground">
            업로드 파일에는 반드시 아래의 한글 컬럼명이 포함되어야 합니다:
            <br />
            <b>이름</b>, <b>차트ID</b>, <b>성별</b>, <b>병동</b>, <b>병실</b>, <b>입원일</b>,{' '}
            <b>퇴원일</b>, <b>생년월일</b>
            <br />
            <span className="text-xs">
              ※ 첫 번째 행은 반드시 컬럼명이어야 하며, 성별은 남성/여성, 날짜는 YYYY-MM-DD
              형식이어야 합니다.
            </span>
          </div>
          {fileError && <div className="mt-2 text-sm text-red-500">{fileError}</div>}

          {/* 등록된 병동/병실 정보 표시 */}
          {wards.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800 mb-2">등록된 병동/병실 목록:</p>
              <div className="text-xs text-blue-700 space-y-1">
                {wards.map((ward: any) => (
                  <div key={ward.id}>
                    • <strong>{ward.name}</strong>:{' '}
                    {ward.rooms.map((room: any) => room.name).join(', ')}
                  </div>
                ))}
              </div>
              <p className="text-xs text-blue-600 mt-2">
                파일에 입력된 병동/병실명이 위 목록과 정확히 일치해야 합니다.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 샘플 파일 다운로드 */}
      <Card>
        <CardHeader>
          <CardTitle>샘플 파일 다운로드</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            환자 일괄 등록을 위한 샘플 파일을 다운로드하여 양식을 확인하세요.
          </p>
          <p className="text-xs text-amber-600">
            ⚠️ 샘플 파일의 병동/병실명은 예시입니다. 실제 등록 시에는 위에 표시된 등록된
            병동/병실명을 사용해주세요.
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const csvContent = `이름,차트ID,성별,병동,병실,입원일,퇴원일,생년월일
홍길동,12345,남성,A동,101호,2024-01-01,2024-01-10,1980-01-01
김영희,12346,여성,B동,202호,2024-02-01,,1990-05-15`;
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'patient_sample.csv';
                link.click();
              }}
              className="cursor-pointer"
            >
              CSV 샘플 다운로드
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const ws_data = [
                  ['이름', '차트ID', '성별', '병동', '병실', '입원일', '퇴원일', '생년월일'],
                  [
                    '홍길동',
                    '12345',
                    '남성',
                    'A동',
                    '101호',
                    '2024-01-01',
                    '2024-01-10',
                    '1980-01-01',
                  ],
                  ['김영희', '12346', '여성', 'B동', '202호', '2024-02-01', '', '1990-05-15'],
                ];
                const ws = XLSX.utils.aoa_to_sheet(ws_data);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Patients');
                XLSX.writeFile(wb, 'patient_sample.xlsx');
              }}
              className="cursor-pointer"
            >
              Excel 샘플 다운로드
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 파일 미리보기 Dialog */}
      <Dialog open={filePreviewOpen} onOpenChange={setFilePreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>파일 미리보기</DialogTitle>
            <DialogDescription>
              파일의 첫 5행을 미리 확인하세요. 필수 컬럼이 모두 포함되어야 업로드할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          {missingColumns.length > 0 ? (
            <div className="text-red-500 mb-2">
              필수 컬럼이 누락되었습니다: {missingColumns.join(', ')}
            </div>
          ) : null}
          {validationErrors.length > 0 && (
            <div className="mb-4 p-4 border border-red-200 bg-red-50 rounded-lg">
              <h4 className="text-red-800 font-semibold mb-2">데이터 검증 오류</h4>
              <div className="max-h-32 overflow-y-auto">
                <ul className="text-sm text-red-700 space-y-1">
                  {validationErrors.slice(0, 10).map((error, idx) => (
                    <li key={idx}>
                      {error.row}행: {error.message}
                    </li>
                  ))}
                  {validationErrors.length > 10 && (
                    <li className="font-semibold">...외 {validationErrors.length - 10}개의 오류</li>
                  )}
                </ul>
              </div>
              <p className="text-xs text-red-600 mt-2">
                오류를 수정한 후 다시 업로드해주세요. 등록된 병동/병실 목록을 확인하시기 바랍니다.
              </p>
            </div>
          )}
          <div className="overflow-x-auto max-h-64 mb-4">
            {parsedRows.length > 0 ? (
              <Table className="text-xs">
                <TableHeader>
                  <TableRow>
                    {Object.keys(parsedRows[0]).map(col => (
                      <TableHead key={col}>{col}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedRows.slice(0, 5).map((row, i) => (
                    <TableRow key={i}>
                      {Object.keys(parsedRows[0]).map(col => (
                        <TableCell key={col}>{row[col]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div>파일에 데이터가 없습니다.</div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setFilePreviewOpen(false)}
              className="cursor-pointer"
            >
              취소
            </Button>
            <Button
              onClick={handleDialogUpload}
              disabled={missingColumns.length > 0 || validationErrors.length > 0 || bulkLoading}
              className="cursor-pointer"
            >
              <Upload className="mr-2 h-4 w-4" />
              {bulkLoading ? '업로드 중...' : '업로드'}
            </Button>
          </div>
          {fileError && <div className="mt-2 text-sm text-red-500">{fileError}</div>}
        </DialogContent>
      </Dialog>

      {/* 성공 모달 */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>완료</span>
            </DialogTitle>
            <DialogDescription className="whitespace-pre-line">{successMessage}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button onClick={handleSuccessModalClose} className="cursor-pointer">
              목록으로 이동
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
