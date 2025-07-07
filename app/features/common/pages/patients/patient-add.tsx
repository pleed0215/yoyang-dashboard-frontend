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

// 단일 환자 등록용 스키마
const patientSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  chartId: z.string().min(1, '차트ID를 입력해주세요'),
  gender: z.enum(['MALE', 'FEMALE'], { required_error: '성별을 선택해주세요' }),
  wardId: z.string().min(1, '병동을 선택해주세요'),
  roomId: z.string().min(1, '병실을 선택해주세요'),
  enterDate: z.string().optional(),
  leaveDate: z.string().optional(),
  birthDate: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

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

export default function PatientAddPage({ loaderData }: any) {
  const navigate = useNavigate();
  const { data: wardRoomData } = loaderData || { data: [] };
  const { data: meData } = useMeQuery();
  const hospitalId = meData?.me?.data?.hospitalId;
  const [createPatient, { loading }] = useCreatePatientMutation();
  const [bulkCreatePatientsFromFile, { loading: bulkLoading }] =
    useBulkCreatePatientsFromFileMutation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'CSV' | 'EXCEL'>('CSV');

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
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleBulkUpload = async () => {
    if (!file || !hospitalId) return;
    const reader = new FileReader();
    reader.onload = async e => {
      const fileContent = e.target?.result as string;
      try {
        const result = await bulkCreatePatientsFromFile({
          variables: {
            input: {
              file: fileContent,
              fileType: fileType === 'CSV' ? PatientFileType.Csv : PatientFileType.Excel,
              hospitalId,
            },
          },
        });
        if (result.data?.bulkCreatePatientsFromFile?.success) {
          setSuccessMessage('파일 업로드가 성공적으로 완료되었습니다.');
          setShowSuccessModal(true);
        } else {
          alert(result.data?.bulkCreatePatientsFromFile?.message || '파일 업로드 실패');
        }
      } catch (error) {
        alert('파일 업로드 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
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
                  onValueChange={v => setValue('gender', v as 'MALE' | 'FEMALE')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="성별을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">남성</SelectItem>
                    <SelectItem value="FEMALE">여성</SelectItem>
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
            <Button
              type="button"
              onClick={handleBulkUpload}
              disabled={!file || bulkLoading}
              className="cursor-pointer"
            >
              <Upload className="mr-2 h-4 w-4" />
              {bulkLoading ? '업로드 중...' : '업로드'}
            </Button>
          </div>
        </CardContent>
      </Card>
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
