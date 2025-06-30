import { gql, useMutation } from '@apollo/client';
import { Route } from './+types/employee-index';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { contextWithToken } from '~/lib/apollo';
import { RETRIEVE_MY_HOSPITAL_DUTIES_QUERY, RETRIEVE_MY_HOSPITAL_POSITIONS_QUERY } from '~/graphql/queries';
import { RetrieveMyHospitalDutiesQuery, RetrieveMyHospitalPositionsQuery } from '~/graphql/types';
import { useRetrieveMyHospitalEmployeesQuery, useRetrieveMyHospitalDutiesQuery as useRetrieveMyHospitalDutiesQueryClient, useRetrieveMyHospitalPositionsQuery as useRetrieveMyHospitalPositionsQueryClient, useUpdateEmployeeMutation } from '~/graphql/operations';
import { useNavigate, useSearchParams } from 'react-router';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '~/components/ui/table';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Checkbox } from '~/components/ui/checkbox';
import { Plus, Eye, Save } from 'lucide-react';
import { employeeStateBadgeVariant, employeeStateLabel } from '~/lib/enum-mapping';
import { EmployeeState } from '~/graphql/types';
import { toast } from 'sonner';
import PageInfo from '~/components/common/page-info';

const RETRIEVE_MY_HOSPITAL_EMPLOYEES_QUERY = gql`
  query RetrieveMyHospitalEmployees {
    retrieveMyHospitalEmployees {
      success
      message
      data {
        id
        name
        state
        enterDate
        leaveDate
        cellPhone
        birthDate
        state
        position {
          name
        }
        duty {
          name
        }
      }
    }
  }
`;

const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UpdateEmployee($employeeId: Int!,$input: EmployeeUpdateInput!) {
    updateEmployee(employeeId: $employeeId, input: $input) {
      success
      message
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

interface EmployeeEditState {
  [key: string]: {
    position: string;
    duty: string;
    state: string;
    hasChanges: boolean;
  };
}

export default function EmployeeIndexPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { positions, duties } = loaderData;
  
  const { data: employeesData, loading, error } = useRetrieveMyHospitalEmployeesQuery();
  const { data: positionsData } = useRetrieveMyHospitalPositionsQueryClient();
  const { data: dutiesData } = useRetrieveMyHospitalDutiesQueryClient();
  const [updateEmployee] = useUpdateEmployeeMutation();
  
  const [showRetired, setShowRetired] = useState(false);
  const [editState, setEditState] = useState<EmployeeEditState>({});

  const employees = employeesData?.retrieveMyHospitalEmployees?.data ?? [];
  const currentPositions = positionsData?.retrieveMyHospitalPositions?.data ?? positions;
  const currentDuties = dutiesData?.retrieveMyHospitalDuties?.data ?? duties;

  // 페이지네이션 설정
  const ITEMS_PER_PAGE = 10;
  const currentPage = Number(searchParams.get('page') ?? 1);

  // 퇴사자 필터링
  const filteredEmployees = showRetired 
    ? employees 
    : employees.filter(employee => !employee.leaveDate);

  // 페이지네이션된 직원 목록
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredEmployees.slice(startIndex, endIndex);
  }, [filteredEmployees, currentPage]);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  const handlePositionChange = (employeeId: string, position: string) => {
    setEditState(prev => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        position,
        hasChanges: true,
      }
    }));
  };

  const handleDutyChange = (employeeId: string, duty: string) => {
    setEditState(prev => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        duty,
        hasChanges: true,
      }
    }));
  };

  const handleStateChange = (employeeId: string, state: string) => {
    setEditState(prev => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        state,
        hasChanges: true,
      }
    }));
  };

  const handleSaveChanges = async (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    const changes = editState[employeeId];
    if (!changes) return;

    try {
      const input: any = {};
      
      // 변경된 필드만 input에 추가
      if (changes.position && changes.position !== employee.position?.name) {
        input.position = changes.position;
      }
      if (changes.duty && changes.duty !== employee.duty?.name) {
        input.duty = changes.duty;
      }
      if (changes.state && changes.state !== employee.state) {
        input.state = changes.state;
      }

      // 변경사항이 없으면 early return
      if (Object.keys(input).length === 0) {
        toast.error('변경사항이 없습니다.');
        return;
      }

      const result = await updateEmployee({
        variables: {
          employeeId: parseInt(employeeId),
          input
        }
      });

      if (result.data?.updateEmployee?.success) {
        toast.success('직원 정보가 성공적으로 수정되었습니다.');
        
        // 성공 시 editState에서 해당 직원의 변경사항 제거
        setEditState(prev => {
          const newState = { ...prev };
          delete newState[employeeId];
          return newState;
        });
      } else {
        toast.error(result.data?.updateEmployee?.message || '직원 정보 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Update employee error:', error);
      toast.error('직원 정보 수정 중 오류가 발생했습니다.');
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">직원 관리</h1>
        </div>
        <div className="text-center py-8">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">직원 관리</h1>
        </div>
        <div className="text-center py-8 text-red-500">오류가 발생했습니다: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">직원 관리</h1>
        <Button 
          onClick={() => navigate('/employees/add')}
          className="cursor-pointer"
        >
          <Plus className="mr-2 h-4 w-4" />
          직원 추가
        </Button>
      </div>

      {filteredEmployees.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">
              {showRetired ? '퇴사한 직원이 없습니다.' : '등록된 직원이 없습니다.'}
            </p>
            {!showRetired && (
              <Button 
                onClick={() => navigate('/employees/add')}
                className="cursor-pointer"
              >
                <Plus className="mr-2 h-4 w-4" />
                첫 번째 직원 추가하기
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showRetired"
                checked={showRetired}
                onCheckedChange={(checked) => setShowRetired(checked as boolean)}
              />
              <label htmlFor="showRetired" className="text-sm font-medium cursor-pointer">
                퇴사자 포함
              </label>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>직원 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">ID</TableHead>
                    <TableHead className="text-center">이름</TableHead>
                    <TableHead className="text-center w-36">직위</TableHead>
                    <TableHead className="text-center w-36">직책</TableHead>
                    <TableHead className="text-center">입사일</TableHead>
                    <TableHead className="text-center">퇴사일</TableHead>
                    <TableHead className="text-center w-36">상태</TableHead>
                    <TableHead className="text-center w-24">액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="text-center">{employee.id}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="link"
                          className="p-0 h-auto cursor-pointer"
                          onClick={() => navigate(`/employees/${employee.id}`)}
                        >
                          {employee.name}
                        </Button>
                      </TableCell>
                      <TableCell className="text-center w-36">
                        <Select
                          value={editState[employee.id]?.position || employee.position?.name || ''}
                          onValueChange={(value) => handlePositionChange(employee.id, value)}
                        >
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {currentPositions.map((position) => (
                              <SelectItem key={position.name} value={position.name}>
                                {position.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-center w-36">
                        <Select
                          value={editState[employee.id]?.duty || employee.duty?.name || ''}
                          onValueChange={(value) => handleDutyChange(employee.id, value)}
                        >
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {currentDuties.map((duty) => (
                              <SelectItem key={duty.name} value={duty.name}>
                                {duty.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-center">{formatDate(employee.enterDate)}</TableCell>
                      <TableCell className="text-center">{formatDate(employee.leaveDate)}</TableCell>
                      <TableCell className="text-center w-36">
                        <Select
                          value={editState[employee.id]?.state || employee.state || ''}
                          onValueChange={(value) => handleStateChange(employee.id, value)}
                        >
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(employeeStateLabel).map(([state, label]) => (
                              <SelectItem key={state} value={state}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-center w-24">
                        <div className="flex items-center space-x-2 w-20">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/employees/${employee.id}`)}
                            className="cursor-pointer"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleSaveChanges(employee.id)}
                            disabled={!editState[employee.id]?.hasChanges}
                            className="cursor-pointer"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-4">
            <PageInfo totalPages={totalPages} />
          </div>
        </>
      )}
    </div>
  );
}
