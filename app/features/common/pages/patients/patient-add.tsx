import type { Route } from './+types/patient-add';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
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
import { ArrowLeft, Check, Upload } from 'lucide-react';
import {
  useMeQuery,
  useCreatePatientMutation,
  useBulkCreatePatientsFromFileMutation,
  useBulkCreatePatientsMutation,
} from '~/graphql/operations';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateTime } from 'luxon';
import {
  PatientGender,
  PatientFileType,
  RetrieveMyHospitalWardsAndRoomsQuery,
} from '~/graphql/types';
import { contextWithToken } from '~/lib/apollo';
import { RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY } from '~/graphql/queries';
import { serverApolloClient } from '~/lib/apollo-client-server';
import DateInput from '~/components/common/date-input';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '~/components/ui/table';

// 단일 환자 등록용 스키마
const patientSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  chartId: z.string().min(1, '차트ID를 입력해주세요'),
  gender: z.nativeEnum(PatientGender, { required_error: '성별을 선택해주세요' }),
  wardId: z.string().min(1, '병동을 선택해주세요'),
  roomId: z.string().min(1, '병실을 선택해주세요'),
  enterDate: z.string().optional(),
  leaveDate: z.string().optional(),
  birthDate: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

const REQUIRED_COLUMNS = [
  '이름',
  '차트ID',
  '성별',
  '병동',
  '병실',
  '입원일',
  '퇴원일',
  '생년월일',
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const { data } = await serverApolloClient.query<RetrieveMyHospitalWardsAndRoomsQuery>({
      query: RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY,
      context: contextWithToken(request),
    });
    return {
      success: true,
      data: data?.retrieveMyHospitalWards.data,
    };
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : '환자 추가 페이지 로딩 실패',
      data: [],
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

export default function PatientAddPage({ loaderData }: any) {
  const navigate = useNavigate();
  const { data: wardRoomData } = loaderData || { data: [] };
  const { data: meData } = useMeQuery();
  const hospitalId = meData?.me?.data?.hospitalId;
  const [createPatient, { loading }] = useCreatePatientMutation();
  const [bulkCreatePatients, { loading: bulkLoading }] = useBulkCreatePatientsMutation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'CSV' | 'EXCEL'>(
    'EXCEL'
  );
  const [filePreviewOpen, setFilePreviewOpen] = useState(false);
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [missingColumns, setMissingColumns] = useState<string[]>([]);
  const [fileError, setFileError] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: '',
      chartId: '',
      gender: undefined,
      wardId: '',
      roomId: '',
      enterDate: '',
      leaveDate: '',
      birthDate: '',
    },
  });

  // 병동/병실 선택
  const wards = wardRoomData || [];
  const selectedWardId = watch('wardId');
  const rooms = wards.find((w: any) => w.id.toString() === selectedWardId)?.rooms || [];

  // 단일 환자 등록
  const onSubmit = async (data: PatientFormData) => {
    if (!hospitalId) {
      alert('병원 정보를 찾을 수 없습니다.');
      return;
    }
    try {
      const result = await createPatient({
        variables: {
          input: {
            name: data.name,
            chartId: parseInt(data.chartId),
            gender: data.gender === 'MALE' ? PatientGender.Male : PatientGender.Female,
            wardId: parseInt(data.wardId),
            roomId: parseInt(data.roomId),
            hospitalId,
            enterDate: data.enterDate || undefined,
            leaveDate: data.leaveDate || undefined,
            birthDate: data.birthDate || undefined,
          },
        },
      });
      if (result.data?.createPatient?.success) {
        setSuccessMessage('환자가 성공적으로 등록되었습니다.');
        setShowSuccessModal(true);
      } else {
        alert(result.data?.createPatient?.message || '환자 등록에 실패했습니다.');
      }
    } catch (error) {
      alert('환자 등록 중 오류가 발생했습니다.');
    }
  };

  // 엑셀/CSV 업로드
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    setParsedRows([]);
    setMissingColumns([]);
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
          // 필수 컬럼 체크 (모든 행의 키 합집합)
          const columns = Array.from(new Set(rows.flatMap(row => Object.keys(row))));
          console.log(columns);
          const missing = REQUIRED_COLUMNS.filter(col => !columns.includes(col));
          setParsedRows(rows);
          setMissingColumns(missing);
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
        .filter((x): x is typeof patients[0] => x !== null);
      const result = await bulkCreatePatients({
        variables: { inputs: patients },
      });
      if (result.data?.bulkCreatePatients?.success) {
        setSuccessMessage('파일 업로드가 성공적으로 완료되었습니다.');
        setShowSuccessModal(true);
        setFilePreviewOpen(false);
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
        <h1 className="text-2xl font-bold">환자 추가</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>새 환자 등록</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 이름 */}
              <div className="space-y-2">
                <Label htmlFor="name">이름 *</Label>
                <Input id="name" {...register('name')} placeholder="환자 이름을 입력하세요" />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              {/* 차트ID */}
              <div className="space-y-2">
                <Label htmlFor="chartId">차트ID *</Label>
                <Input id="chartId" {...register('chartId')} placeholder="차트ID를 입력하세요" />
                {errors.chartId && <p className="text-sm text-red-500">{errors.chartId.message}</p>}
              </div>
              {/* 성별 */}
              <div className="space-y-2">
                <Label htmlFor="gender">성별 *</Label>
                <Select
                  value={watch('gender')}
                  onValueChange={v => setValue('gender', v as PatientGender)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="성별을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PatientGender.Male}>남성</SelectItem>
                    <SelectItem value={PatientGender.Female}>여성</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
              </div>
              {/* 병동 */}
              <div className="space-y-2">
                <Label htmlFor="wardId">병동 *</Label>
                <Select
                  value={watch('wardId')}
                  onValueChange={v => {
                    setValue('wardId', v);
                    setValue('roomId', '');
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="병동을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {wards.map((ward: any) => (
                      <SelectItem key={ward.id} value={ward.id.toString()}>
                        {ward.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.wardId && <p className="text-sm text-red-500">{errors.wardId.message}</p>}
              </div>
              {/* 병실 */}
              <div className="space-y-2">
                <Label htmlFor="roomId">병실 *</Label>
                <Select
                  value={watch('roomId')}
                  onValueChange={v => setValue('roomId', v)}
                  disabled={!selectedWardId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="병실을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room: any) => (
                      <SelectItem key={room.id} value={room.id.toString()}>
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.roomId && <p className="text-sm text-red-500">{errors.roomId.message}</p>}
              </div>
              {/* 입원일 */}
              <div className="space-y-2">
                <Label htmlFor="enterDate">입원일</Label>
                <DateInput
                  id="enterDate"
                  value={watch('enterDate') ?? ''}
                  onChange={v => setValue('enterDate', v)}
                  placeholder="YYYY-MM-DD"
                />
                {errors.enterDate && (
                  <p className="text-sm text-red-500">{errors.enterDate.message}</p>
                )}
              </div>
              {/* 퇴원일 */}
              <div className="space-y-2">
                <Label htmlFor="leaveDate">퇴원일</Label>
                <DateInput
                  id="leaveDate"
                  value={watch('leaveDate') ?? ''}
                  onChange={v => setValue('leaveDate', v)}
                  placeholder="YYYY-MM-DD"
                />
                {errors.leaveDate && (
                  <p className="text-sm text-red-500">{errors.leaveDate.message}</p>
                )}
              </div>
              {/* 생년월일 */}
              <div className="space-y-2">
                <Label htmlFor="birthDate">생년월일</Label>
                <DateInput
                  id="birthDate"
                  value={watch('birthDate') ?? ''}
                  onChange={v => setValue('birthDate', v)}
                  placeholder="YYYY-MM-DD"
                />
                {errors.birthDate && (
                  <p className="text-sm text-red-500">{errors.birthDate.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/patients')}
                className="cursor-pointer"
              >
                취소
              </Button>
              <Button type="submit" disabled={loading} className="cursor-pointer">
                {loading ? '생성 중...' : '환자 생성'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* 엑셀/CSV 업로드 */}
      <Card>
        <CardHeader>
          <CardTitle>엑셀/CSV로 환자 일괄 등록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Input
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleFileChange}
            />
            <Select value={fileType} onValueChange={v => setFileType(v as 'CSV' | 'EXCEL')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSV">CSV</SelectItem>
                <SelectItem value="EXCEL">Excel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* 엑셀/CSV 업로드 필수 컬럼 안내 (아래로 이동) */}
          <div className="mt-4 text-sm text-muted-foreground">
            업로드 파일에는 반드시 아래의 한글 컬럼명이 포함되어야 합니다:<br />
            <b>이름</b>, <b>차트ID</b>, <b>성별</b>, <b>병동</b>, <b>병실</b>, <b>입원일</b>, <b>퇴원일</b>, <b>생년월일</b><br />
            <span className="text-xs">※ 첫 번째 행은 반드시 컬럼명이어야 하며, 성별은 남성/여성, 날짜는 YYYY-MM-DD 형식이어야 합니다.</span>
          </div>
          {fileError && <div className="mt-2 text-sm text-red-500">{fileError}</div>}
        </CardContent>
      </Card>
      {/* 파일 미리보기 Dialog */}
      <Dialog open={filePreviewOpen} onOpenChange={setFilePreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>파일 미리보기</DialogTitle>
            <DialogDescription>
              파일의 첫 5행을 미리 확인하세요. 필수 컬럼이 모두 포함되어야 업로드할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          {missingColumns.length > 0 ? (
            <div className="text-red-500 mb-2">필수 컬럼이 누락되었습니다: {missingColumns.join(', ')}</div>
          ) : null}
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
            ) : <div>파일에 데이터가 없습니다.</div>}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setFilePreviewOpen(false)} className="cursor-pointer">취소</Button>
            <Button onClick={handleDialogUpload} disabled={missingColumns.length > 0 || bulkLoading} className="cursor-pointer">
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
            <DialogDescription>{successMessage}</DialogDescription>
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
