import React, { useState } from 'react';
import { Route } from './+types/employee-detail';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { ArrowLeft, Check, X } from 'lucide-react';
import { gql } from '@apollo/client';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { RETRIEVE_MY_HOSPITAL_COMMITTEES_QUERY, RETRIEVE_MY_HOSPITAL_DUTIES_QUERY, RETRIEVE_MY_HOSPITAL_POSITIONS_QUERY, RETRIEVE_MY_HOSPITAL_WARDS_QUERY } from '~/graphql/queries';
import { RetrieveMyHospitalCommitteesQuery, RetrieveMyHospitalDutiesQuery, RetrieveMyHospitalPositionsQuery, RetrieveMyHospitalWardsQuery, EmployeeState } from '~/graphql/types';
import { contextWithToken } from '~/lib/apollo';
import { useGetEmployeeQuery, useUpdateEmployeeMutation } from '~/graphql/operations';
import DateInput from '~/components/common/date-input';
import PhoneInput from '~/components/common/phone-input';

export const GET_EMPLOYEE_QUERY = gql`
  query GetEmployee($employeeId: Int!) {
    getEmployee(employeeId: $employeeId) {
        success
        message
        data {
            id
            name
            createdAt
            updatedAt
            enterDate
            leaveDate
            state
            birthDate
            cellPhone
            position {
                id
                name
            }
            duty {
                id
                name
            }
            ward {
                id
                name
            }
            committees {
                id
                name
            }
            rooms {
                id
                name
            }
            parts {
                id
                name
            }
        }
    }
  }
`;

export const loader = async ({ request }: Route.LoaderArgs) => {
    try{
        const {data: positionsData} = await serverApolloClient.query<RetrieveMyHospitalPositionsQuery>({
            query: RETRIEVE_MY_HOSPITAL_POSITIONS_QUERY,context: contextWithToken(request)   });
        const {data: dutiesData} = await serverApolloClient.query<RetrieveMyHospitalDutiesQuery>({
            query: RETRIEVE_MY_HOSPITAL_DUTIES_QUERY,context: contextWithToken(request)   });
        const {data: wardsData} = await serverApolloClient.query<RetrieveMyHospitalWardsQuery>({
            query: RETRIEVE_MY_HOSPITAL_WARDS_QUERY,context: contextWithToken(request)   });
        const {data: committeesData} = await serverApolloClient.query<RetrieveMyHospitalCommitteesQuery>({
            query: RETRIEVE_MY_HOSPITAL_COMMITTEES_QUERY,context: contextWithToken(request)   });
        
        return {
            positions: positionsData.retrieveMyHospitalPositions.data,
            duties: dutiesData.retrieveMyHospitalDuties.data,
            wards: wardsData.retrieveMyHospitalWards.data,
            committees: committeesData.retrieveMyHospitalCommittees.data,
            apolloState: serverApolloClient.cache.extract(),
        };
    }catch(e) {
        return {
            positions: [],
            duties: [],
            wards: [],
            committees: [],
            apolloState: serverApolloClient.cache.extract(),
        };
    }
}

interface EmployeeFormData {
  name: string;
  positionId: string;
  dutyId: string;
  wardId: string;
  state: EmployeeState;
  enterDate: string;
  leaveDate: string;
  cellPhone: string;
  birthDate: string;
  committeeIds: string[];
  roomIds: string[];
  partIds: string[];
}

export default function EmployeeDetailPage({ params, loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { employeeId } = params;
  const { positions, duties, wards, committees } = loaderData;

  const { data: employeeData, loading, error } = useGetEmployeeQuery({
    variables: { employeeId: parseInt(employeeId) }
  });
  
  const [updateEmployee] = useUpdateEmployeeMutation();
  
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    positionId: '',
    dutyId: '',
    wardId: '',
    state: EmployeeState.Active,
    enterDate: '',
    leaveDate: '',
    cellPhone: '',
    birthDate: '',
    committeeIds: [],
    roomIds: [],
    partIds: [],
  });

  const [originalData, setOriginalData] = useState<EmployeeFormData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  // 직원 데이터가 로드되면 폼 데이터 초기화
  React.useEffect(() => {
    if (employeeData?.getEmployee?.data) {
      const employee = employeeData.getEmployee.data;
      const initialData = {
        name: employee.name || '',
        positionId: employee.position?.id || '',
        dutyId: employee.duty?.id || '',
        wardId: employee.ward?.id || '',
        state: employee.state || EmployeeState.Active,
        enterDate: employee.enterDate || '',
        leaveDate: employee.leaveDate || '',
        cellPhone: employee.cellPhone || '',
        birthDate: employee.birthDate || '',
        committeeIds: employee.committees?.map(c => c.id) || [],
        roomIds: employee.rooms?.map(r => r.id) || [],
        partIds: employee.parts?.map(p => p.id) || [],
      };
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [employeeData]);

  // 변경사항이 있는지 확인
  const hasChanges = React.useMemo(() => {
    if (!originalData) return false;
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  }, [formData, originalData]);

  const handleInputChange = (field: keyof EmployeeFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      const result = await updateEmployee({
        variables: {
          employeeId: parseInt(employeeId),
          input: {
            name: formData.name,
            positionId: formData.positionId ? parseInt(formData.positionId) : undefined,
            dutyId: formData.dutyId ? parseInt(formData.dutyId) : undefined,
            wardId: formData.wardId ? parseInt(formData.wardId) : undefined,
            state: formData.state,
            enterDate: formData.enterDate || undefined,
            leaveDate: formData.leaveDate || undefined,
            cellPhone: formData.cellPhone || undefined,
            birthDate: formData.birthDate || undefined,
          }
        },
        refetchQueries: ['GetEmployee']
      });

      if (result.data?.updateEmployee?.success) {
        setModalMessage('직원 정보가 성공적으로 수정되었습니다.');
        setModalType('success');
        setShowModal(true);
      } else {
        setModalMessage(result.data?.updateEmployee?.message || '직원 정보 수정에 실패했습니다.');
        setModalType('error');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Update employee error:', error);
      setModalMessage('직원 정보 수정 중 오류가 발생했습니다.');
      setModalType('error');
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setModalMessage('변경사항이 취소되었습니다.');
    setModalType('success');
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/employees');
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    try {
      // 날짜 문자열에 시간이 포함되어 있으면 날짜 부분만 추출
      const dateOnly = dateString.split('T')[0];
      const date = new Date(dateOnly + 'T00:00:00');
      return date.toLocaleDateString('ko-KR');
    } catch (error) {
      return '-';
    }
  };

  if (loading) {
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
          <h1 className="text-2xl font-bold">직원 상세 정보</h1>
        </div>
        <div className="text-center py-8">로딩 중...</div>
      </div>
    );
  }

  if (error) {
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
          <h1 className="text-2xl font-bold">직원 상세 정보</h1>
        </div>
        <div className="text-center py-8 text-red-500">오류가 발생했습니다: {error.message}</div>
      </div>
    );
  }

  const employee = employeeData?.getEmployee?.data;
  if (!employee) {
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
          <h1 className="text-2xl font-bold">직원 상세 정보</h1>
        </div>
        <div className="text-center py-8 text-red-500">직원을 찾을 수 없습니다.</div>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold">직원 상세 정보</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>직원 정보 수정</CardTitle>
        </CardHeader>
        <CardContent>
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
              <Label htmlFor="position">직책</Label>
              <Select
                value={formData.positionId}
                onValueChange={(value) => handleInputChange('positionId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="직책을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {positions?.map((position) => (
                    <SelectItem key={position.id} value={position.id.toString()}>
                      {position.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 직위 */}
            <div className="space-y-2">
              <Label htmlFor="duty">직위</Label>
              <Select
                value={formData.dutyId}
                onValueChange={(value) => handleInputChange('dutyId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="직위를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {duties?.map((duty) => (
                    <SelectItem key={duty.id} value={duty.id.toString()}>
                      {duty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 병동 */}
            <div className="space-y-2">
              <Label htmlFor="ward">병동</Label>
              <Select
                value={formData.wardId}
                onValueChange={(value) => handleInputChange('wardId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="병동을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {wards?.map((ward) => (
                    <SelectItem key={ward.id} value={ward.id.toString()}>
                      {ward.name}
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
              <DateInput
                id="enterDate"
                value={formData.enterDate}
                onChange={(value) => handleInputChange('enterDate', value)}
              />
            </div>

            {/* 퇴사일 */}
            <div className="space-y-2">
              <Label htmlFor="leaveDate">퇴사일</Label>
              <DateInput
                id="leaveDate"
                value={formData.leaveDate}
                onChange={(value) => handleInputChange('leaveDate', value)}
              />
            </div>

            {/* 휴대전화 */}
            <div className="space-y-2">
              <Label htmlFor="cellPhone">휴대전화</Label>
              <PhoneInput
                id="cellPhone"
                value={formData.cellPhone}
                onChange={(value) => handleInputChange('cellPhone', value)}
              />
            </div>

            {/* 생년월일 */}
            <div className="space-y-2">
              <Label htmlFor="birthDate">생년월일</Label>
              <DateInput
                id="birthDate"
                value={formData.birthDate}
                onChange={(value) => handleInputChange('birthDate', value)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button
              type="button"
              onClick={handleSave}
              disabled={!hasChanges}
              className="cursor-pointer"
            >
              저장
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="cursor-pointer"
            >
              취소
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 모달 */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {modalType === 'success' ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <X className="h-5 w-5 text-red-500" />
              )}
              <span>{modalType === 'success' ? '완료' : '오류'}</span>
            </DialogTitle>
            <DialogDescription>
              {modalMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              onClick={handleModalClose}
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