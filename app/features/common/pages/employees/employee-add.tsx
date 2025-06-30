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

interface EmployeeFormData {
  name: string;
  positionId: string;
  dutyId: string;
  state: EmployeeState;
  enterDate: string;
  leaveDate: string;
  cellPhone: string;
  birthDate: string;
}

export default function EmployeeAddPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { positions, duties } = loaderData;
  
  const { data: userData } = useMeQuery();
  const [createEmployee, { loading }] = useMutation(CREATE_EMPLOYEE_MUTATION);
  
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    positionId: '',
    dutyId: '',
    state: EmployeeState.Active,
    enterDate: '',
    leaveDate: '',
    cellPhone: '',
    birthDate: '',
  });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{
    enterDate?: Date;
    leaveDate?: Date;
    birthDate?: Date;
  }>({});

  const handleInputChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateSelect = (field: 'enterDate' | 'leaveDate' | 'birthDate', date: Date | undefined) => {
    setSelectedDates(prev => ({
      ...prev,
      [field]: date
    }));
    
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setFormData(prev => ({
        ...prev,
        [field]: formattedDate
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: ''
      }));
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
      return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 8)}`;
    }
  };

  const handleDateInputChange = (field: 'enterDate' | 'leaveDate' | 'birthDate', value: string) => {
    const formattedValue = formatDateInput(value);
    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userData?.me?.data?.hospitalId) {
      alert('병원 정보를 찾을 수 없습니다.');
      return;
    }

    try {
      const result = await createEmployee({
        variables: {
          input: {
            name: formData.name,
            hospitalId: userData.me.data.hospitalId,
            positionId: formData.positionId ? parseInt(formData.positionId) : undefined,
            dutyId: formData.dutyId ? parseInt(formData.dutyId) : undefined,
            state: formData.state,
            enterDate: formData.enterDate || undefined,
            leaveDate: formData.leaveDate || undefined,
            cellPhone: formData.cellPhone || undefined,
            birthDate: formData.birthDate || undefined,
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 이름 */}
              <div className="space-y-2">
                <Label htmlFor="name">이름 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="직원 이름을 입력하세요"
                  required
                />
              </div>

              {/* 직책 */}
              <div className="space-y-2">
                <Label htmlFor="position">직책 *</Label>
                <Select
                  value={formData.positionId}
                  onValueChange={(value) => handleInputChange('positionId', value)}
                  required
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
              </div>

              {/* 직위 */}
              <div className="space-y-2">
                <Label htmlFor="duty">직위 *</Label>
                <Select
                  value={formData.dutyId}
                  onValueChange={(value) => handleInputChange('dutyId', value)}
                  required
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
              </div>

              {/* 상태 */}
              <div className="space-y-2">
                <Label htmlFor="state">상태 *</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleInputChange('state', value as EmployeeState)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={EmployeeState.Active}>재직중</SelectItem>
                    <SelectItem value={EmployeeState.Inactive}>퇴사</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 입사일 */}
              <div className="space-y-2">
                <Label htmlFor="enterDate">입사일</Label>
                <div className="flex space-x-2">
                  <Input
                    id="enterDate"
                    value={formData.enterDate}
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
              </div>

              {/* 퇴사일 */}
              <div className="space-y-2">
                <Label htmlFor="leaveDate">퇴사일</Label>
                <div className="flex space-x-2">
                  <Input
                    id="leaveDate"
                    value={formData.leaveDate}
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
              </div>

              {/* 휴대전화 */}
              <div className="space-y-2">
                <Label htmlFor="cellPhone">휴대전화</Label>
                <Input
                  id="cellPhone"
                  value={formData.cellPhone}
                  onChange={(e) => handleInputChange('cellPhone', e.target.value)}
                  placeholder="010-1234-5678"
                />
              </div>

              {/* 생년월일 */}
              <div className="space-y-2">
                <Label htmlFor="birthDate">생년월일</Label>
                <div className="flex space-x-2">
                  <Input
                    id="birthDate"
                    value={formData.birthDate}
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