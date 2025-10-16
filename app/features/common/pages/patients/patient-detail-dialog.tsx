import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { toast } from 'sonner';
import { useGetPatientQuery, useUpdatePatientMutation } from '~/graphql/operations';
import { PatientGender, type UpdatePatientInput } from '~/graphql/types';
import { Loader2 } from 'lucide-react';
import DateInput from '~/components/common/date-input';
import { GET_PATIENT_DETAIL_QUERY } from '~/graphql/queries';

const patientSchema = z.object({
  name: z.string().min(1, '이름은 필수입니다'),
  chartId: z.number().int().min(1, '차트 ID는 필수입니다'),
  gender: z.nativeEnum(PatientGender).optional().nullable(),
  birthDate: z.string().optional().nullable(),
  wardId: z.number().int().optional(),
  roomId: z.number().int().optional(),
  enterDate: z.string().optional().nullable(),
  leaveDate: z.string().optional().nullable(),
});

type PatientFormData = z.infer<typeof patientSchema>;

interface PatientDetailDialogProps {
  patientId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  wardRoomData: {
    wards: Array<{
      id: number;
      name: string;
      rooms?: Array<{
        id: number;
        name: string;
      }>;
    }>;
  };
}

export default function PatientDetailDialog({ 
  patientId, 
  open, 
  onOpenChange,
  wardRoomData
}: PatientDetailDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedWardId, setSelectedWardId] = useState<number | undefined>();

  const { data, loading, error, refetch } = useGetPatientQuery({
    variables: { patientId },
    skip: !open || !patientId,
    fetchPolicy: 'network-only',
  });

  const [updatePatient, { loading: updating }] = useUpdatePatientMutation({
    onCompleted: () => {
      toast.success('환자 정보가 수정되었습니다.');
      setIsEditing(false);
      refetch();
    },
    onError: (error) => {
      toast.error(`수정 실패: ${error.message}`);
    },
  });

  const patient = data?.getPatient?.data;

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: '',
      chartId: 0,
      gender: null,
      birthDate: null,
      wardId: undefined,
      roomId: undefined,
      enterDate: null,
      leaveDate: null,
    },
  });

  // Dialog 열릴 때마다 데이터 새로 로드 및 편집 모드 초기화
  useEffect(() => {
    if (open && patientId) {
      setIsEditing(false);
      refetch();
    }
  }, [open, patientId, refetch]);

  // 환자 데이터 로드 시 폼 초기화
  useEffect(() => {
    if (patient && open) {
      // form.reset 대신 setValue로 개별 필드 설정 (shouldValidate와 shouldDirty 옵션 추가)
      const options = { shouldValidate: false, shouldDirty: false };
      form.setValue('name', patient.name || '', options);
      form.setValue('chartId', patient.chartId || 0, options);
      form.setValue('gender', patient.gender || null, options);
      form.setValue('birthDate', patient.birthDate ? new Date(patient.birthDate).toISOString().slice(0, 10) : null, options);
      form.setValue('wardId', patient.wardId || undefined, options);
      form.setValue('roomId', patient.roomId || undefined, options);
      form.setValue('enterDate', patient.enterDate ? new Date(patient.enterDate).toISOString().slice(0, 10) : null, options);
      form.setValue('leaveDate', patient.leaveDate ? new Date(patient.leaveDate).toISOString().slice(0, 10) : null, options);
      
      setSelectedWardId(patient.wardId || undefined);
    }
  }, [patient, open, form]);

  // 선택된 병동의 병실 목록 가져오기
  const watchedWardId = form.watch('wardId');
  const selectedWard = wardRoomData.wards.find(ward => ward.id === (watchedWardId || selectedWardId));
  const availableRooms = selectedWard?.rooms || [];

  const handleSubmit = async (data: PatientFormData) => {
    const input: UpdatePatientInput = {
      name: data.name,
      chartId: data.chartId,
      gender: data.gender || undefined,
      birthDate: data.birthDate || undefined,
      wardId: data.wardId,
      roomId: data.roomId,
      enterDate: data.enterDate || undefined,
      leaveDate: data.leaveDate || undefined,
    };

    await updatePatient({
      variables: {
        patientId,
        input,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>환자 상세 정보</DialogTitle>
          <DialogDescription>
            환자의 상세 정보를 확인하고 편집할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center p-8 text-red-500">
            <div>오류가 발생했습니다.</div>
            <div className="text-sm mt-2">{error.message}</div>
            <div className="text-sm mt-1">환자 ID: {patientId}</div>
          </div>
        ) : !patient ? (
          <div className="text-center p-8 text-gray-500">
            환자 정보를 불러올 수 없습니다.
            <div className="text-sm mt-2">환자 ID: {patientId}</div>
            <div className="text-sm mt-1">응답: {JSON.stringify(data?.getPatient)}</div>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름 *</Label>
                <Input
                  id="name"
                  {...form.register('name')}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="chartId">차트 ID *</Label>
                <Input
                  id="chartId"
                  type="number"
                  {...form.register('chartId', { valueAsNumber: true })}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
                {form.formState.errors.chartId && (
                  <p className="text-sm text-red-500">{form.formState.errors.chartId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">성별</Label>
                <Select
                  value={form.watch('gender') ?? undefined}
                  onValueChange={(value) => form.setValue('gender', value as PatientGender)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className={!isEditing ? 'bg-gray-50' : ''}>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PatientGender.Male}>남성</SelectItem>
                    <SelectItem value={PatientGender.Female}>여성</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">생년월일</Label>
                <DateInput
                  id="birthDate"
                  value={form.watch('birthDate') || ''}
                  onChange={(value) => form.setValue('birthDate', value)}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ward">병동</Label>
                <Select
                  value={form.watch('wardId')?.toString() ?? undefined}
                  onValueChange={(value) => {
                    const wardId = parseInt(value);
                    form.setValue('wardId', wardId);
                    setSelectedWardId(wardId);
                    form.setValue('roomId', undefined); // 병동 변경 시 병실 초기화
                  }}
                  disabled={!isEditing}
                >
                  <SelectTrigger className={!isEditing ? 'bg-gray-50' : ''}>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {wardRoomData.wards.map((ward) => (
                      <SelectItem key={ward.id} value={ward.id.toString()}>
                        {ward.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="room">병실</Label>
                <Select
                  value={form.watch('roomId')?.toString() ?? undefined}
                  onValueChange={(value) => form.setValue('roomId', parseInt(value))}
                  disabled={!isEditing || !selectedWardId}
                >
                  <SelectTrigger className={!isEditing ? 'bg-gray-50' : ''}>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRooms.map((room) => (
                      <SelectItem key={room.id} value={room.id.toString()}>
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="enterDate">입원일</Label>
                <DateInput
                  id="enterDate"
                  value={form.watch('enterDate') || ''}
                  onChange={(value) => form.setValue('enterDate', value)}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="leaveDate">퇴원일</Label>
                <DateInput
                  id="leaveDate"
                  value={form.watch('leaveDate') || ''}
                  onChange={(value) => form.setValue('leaveDate', value)}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              {!isEditing ? (
                <>
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    variant="default"
                  >
                    편집
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      닫기
                    </Button>
                  </DialogClose>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      // 원래 데이터로 되돌리기
                      if (patient) {
                        form.setValue('name', patient.name || '');
                        form.setValue('chartId', patient.chartId || 0);
                        form.setValue('gender', patient.gender || null);
                        form.setValue('birthDate', patient.birthDate ? new Date(patient.birthDate).toISOString().slice(0, 10) : null);
                        form.setValue('wardId', patient.wardId || undefined);
                        form.setValue('roomId', patient.roomId || undefined);
                        form.setValue('enterDate', patient.enterDate ? new Date(patient.enterDate).toISOString().slice(0, 10) : null);
                        form.setValue('leaveDate', patient.leaveDate ? new Date(patient.leaveDate).toISOString().slice(0, 10) : null);
                        setSelectedWardId(patient.wardId || undefined);
                      }
                    }}
                    disabled={updating}
                  >
                    취소
                  </Button>
                  <Button type="submit" disabled={updating}>
                    {updating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        저장 중...
                      </>
                    ) : (
                      '저장'
                    )}
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}