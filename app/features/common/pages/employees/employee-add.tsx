import React from "react";
import { Route } from './+types/employee-add';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { ArrowLeft, Calendar, Check } from 'lucide-react';
import { useMeQuery } from '~/graphql/operations';
import { useMutation } from '@apollo/client';
import { EmployeeState, CreateEmployeeMutation, CreateEmployeeMutationVariables } from '~/graphql/types';
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '~/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { serverApolloClient } from "~/lib/apollo-client-server";
import { RetrieveMyHospitalDutiesQuery, RetrieveMyHospitalPositionsQuery } from "~/graphql/types";
import { contextWithToken } from "~/lib/apollo";
import { RETRIEVE_MY_HOSPITAL_DUTIES_QUERY, RETRIEVE_MY_HOSPITAL_POSITIONS_QUERY } from "~/graphql/queries";
import { gql } from "@apollo/client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DateTime } from 'luxon';

const CREATE_EMPLOYEE_MUTATION = gql`
  mutation CreateEmployee($input: EmployeeCreateInput!) {
    createEmployee(input: $input) {
      success
      message
      data {
        id
      }
    }
  }
`;

// Zod 스키마 정의
const employeeSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  positionId: z.string().min(1, '직책을 선택해주세요'),
  dutyId: z.string().min(1, '직위를 선택해주세요'),
  state: z.nativeEnum(EmployeeState),
  enterDate: z.string().optional(),
  leaveDate: z.string().optional(),
  cellPhone: z.string().optional(),
  birthDate: z.string().optional(),
}).refine((data) => {
  // 입사일과 퇴사일 검증
  if (data.enterDate && data.leaveDate) {
    const enterDate = DateTime.fromISO(data.enterDate);
    const leaveDate = DateTime.fromISO(data.leaveDate);
    return enterDate.isValid && leaveDate.isValid && enterDate <= leaveDate;
  }
  return true;
}, {
  message: '퇴사일은 입사일 이후여야 합니다',
  path: ['leaveDate'],
}).refine((data) => {
  // 날짜 유효성 검증
  if (data.enterDate) {
    const date = DateTime.fromISO(data.enterDate);
    return date.isValid;
  }
  return true;
}, {
  message: '유효한 입사일을 입력해주세요',
  path: ['enterDate'],
}).refine((data) => {
  if (data.leaveDate) {
    const date = DateTime.fromISO(data.leaveDate);
    return date.isValid;
  }
  return true;
}, {
  message: '유효한 퇴사일을 입력해주세요',
  path: ['leaveDate'],
}).refine((data) => {
  if (data.birthDate) {
    const date = DateTime.fromISO(data.birthDate);
    return date.isValid;
  }
  return true;
}, {
  message: '유효한 생년월일을 입력해주세요',
  path: ['birthDate'],
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const { data: positionsData } = await serverApolloClient.query<RetrieveMyHospitalPositionsQuery>({
      query: RETRIEVE_MY_HOSPITAL_POSITIONS_QUERY,
      context: {
        ...contextWithToken(request),
      },
    });

    const { data: dutiesData } = await serverApolloClient.query<RetrieveMyHospitalDutiesQuery>({
      query: RETRIEVE_MY_HOSPITAL_DUTIES_QUERY,
      context: {
        ...contextWithToken(request),
      },
    });

    return {
      positions: positionsData?.retrieveMyHospitalPositions?.data ?? [],
      duties: dutiesData?.retrieveMyHospitalDuties?.data ?? [],
      apolloState: serverApolloClient.extract(),
    };
  } catch (e) {
    return {
      positions: [],
      duties: [],
      apolloState: serverApolloClient.extract(),
    };
  }
};

export default function EmployeeAddPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { positions, duties } = loaderData;
  
  const { data: userData } = useMeQuery();
  const [createEmployee, { loading }] = useMutation(CREATE_EMPLOYEE_MUTATION);
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{
    enterDate?: Date;
    leaveDate?: Date;
    birthDate?: Date;
  }>({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      positionId: '',
      dutyId: '',
      state: EmployeeState.Active,
      enterDate: '',
      leaveDate: '',
      cellPhone: '',
      birthDate: '',
    },
  });

  const handleDateSelect = (field: 'enterDate' | 'leaveDate' | 'birthDate', date: Date | undefined) => {
    setSelectedDates(prev => ({
      ...prev,
      [field]: date
    }));
    
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setValue(field, formattedDate);
    } else {
      setValue(field, '');
    }
  };

  const formatDateInput = (value: string) => {
    // 숫자만 입력받고 yyyy-mm-dd 형식으로 포맷팅
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    } else {
      const year = numbers.slice(0, 4);
      const month = numbers.slice(4, 6);
      const day = numbers.slice(6, 8);
      
      // 기본 포맷팅은 항상 수행하고, 유효성 검사는 별도로
      return `${year}-${month}-${day}`;
    }
  };

  const handleDateInputChange = (field: 'enterDate' | 'leaveDate' | 'birthDate', value: string) => {
    const formattedValue = formatDateInput(value);
    setValue(field, formattedValue);
  };

  const onSubmit = async (data: EmployeeFormData) => {
    if (!userData?.me?.data?.hospitalId) {
      alert('병원 정보를 찾을 수 없습니다.');
      return;
    }

    try {
      const result = await createEmployee({
        variables: {
          input: {
            name: data.name,
            hospitalId: userData.me.data.hospitalId,
            positionId: data.positionId ? parseInt(data.positionId) : undefined,
            dutyId: data.dutyId ? parseInt(data.dutyId) : undefined,
            state: data.state,
            enterDate: data.enterDate || undefined,
            leaveDate: data.leaveDate || undefined,
            cellPhone: data.cellPhone || undefined,
            birthDate: data.birthDate || undefined,
          }
        }
      });

      if (result.data?.createEmployee?.success) {
        setShowSuccessModal(true);
      } else {
        alert(result.data?.createEmployee?.message || '직원 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('직원 생성 중 오류가 발생했습니다.');
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/employees');
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => navigate('/employees')}
          className="cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          목록으로 돌아가기
        </Button>
        <h1 className="text-2xl font-bold">직원 추가</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>새 직원 등록</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 이름 */}
              <div className="space-y-2">
                <Label htmlFor="name">이름 *</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="직원 이름을 입력하세요"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* 직책 */}
              <div className="space-y-2">
                <Label htmlFor="position">직책 *</Label>
                <Select
                  value={watch('positionId')}
                  onValueChange={(value) => setValue('positionId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="직책을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position.id} value={position.id.toString()}>
                        {position.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.positionId && (
                  <p className="text-sm text-red-500">{errors.positionId.message}</p>
                )}
              </div>

              {/* 직위 */}
              <div className="space-y-2">
                <Label htmlFor="duty">직위 *</Label>
                <Select
                  value={watch('dutyId')}
                  onValueChange={(value) => setValue('dutyId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="직위를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {duties.map((duty) => (
                      <SelectItem key={duty.id} value={duty.id.toString()}>
                        {duty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.dutyId && (
                  <p className="text-sm text-red-500">{errors.dutyId.message}</p>
                )}
              </div>

              {/* 상태 */}
              <div className="space-y-2">
                <Label htmlFor="state">상태 *</Label>
                <Select
                  value={watch('state')}
                  onValueChange={(value) => setValue('state', value as EmployeeState)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={EmployeeState.Active}>재직중</SelectItem>
                    <SelectItem value={EmployeeState.Inactive}>퇴사</SelectItem>
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state.message}</p>
                )}
              </div>

              {/* 입사일 */}
              <div className="space-y-2">
                <Label htmlFor="enterDate">입사일</Label>
                <div className="flex space-x-2">
                  <Input
                    id="enterDate"
                    value={watch('enterDate')}
                    onChange={(e) => handleDateInputChange('enterDate', e.target.value)}
                    placeholder="YYYY-MM-DD"
                    maxLength={10}
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="cursor-pointer">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDates.enterDate}
                        onSelect={(date) => handleDateSelect('enterDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {errors.enterDate && (
                  <p className="text-sm text-red-500">{errors.enterDate.message}</p>
                )}
              </div>

              {/* 퇴사일 */}
              <div className="space-y-2">
                <Label htmlFor="leaveDate">퇴사일</Label>
                <div className="flex space-x-2">
                  <Input
                    id="leaveDate"
                    value={watch('leaveDate')}
                    onChange={(e) => handleDateInputChange('leaveDate', e.target.value)}
                    placeholder="YYYY-MM-DD"
                    maxLength={10}
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="cursor-pointer">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDates.leaveDate}
                        onSelect={(date) => handleDateSelect('leaveDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {errors.leaveDate && (
                  <p className="text-sm text-red-500">{errors.leaveDate.message}</p>
                )}
              </div>

              {/* 휴대전화 */}
              <div className="space-y-2">
                <Label htmlFor="cellPhone">휴대전화</Label>
                <Input
                  id="cellPhone"
                  {...register('cellPhone')}
                  placeholder="010-1234-5678"
                />
                {errors.cellPhone && (
                  <p className="text-sm text-red-500">{errors.cellPhone.message}</p>
                )}
              </div>

              {/* 생년월일 */}
              <div className="space-y-2">
                <Label htmlFor="birthDate">생년월일</Label>
                <div className="flex space-x-2">
                  <Input
                    id="birthDate"
                    value={watch('birthDate')}
                    onChange={(e) => handleDateInputChange('birthDate', e.target.value)}
                    placeholder="YYYY-MM-DD"
                    maxLength={10}
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="cursor-pointer">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDates.birthDate}
                        onSelect={(date) => handleDateSelect('birthDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {errors.birthDate && (
                  <p className="text-sm text-red-500">{errors.birthDate.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/employees')}
                className="cursor-pointer"
              >
                취소
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="cursor-pointer"
              >
                {loading ? '생성 중...' : '직원 생성'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 성공 모달 */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>직원 생성 완료</span>
            </DialogTitle>
            <DialogDescription>
              새로운 직원이 성공적으로 생성되었습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              onClick={handleSuccessModalClose}
              className="cursor-pointer"
            >
              목록으로 이동
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 