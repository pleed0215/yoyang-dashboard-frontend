import { Route } from './+types/employee-detail';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { employeeStateBadgeVariant, employeeStateLabel } from '~/lib/enum-mapping';
import { EmployeeState } from '~/graphql/types';

export default function EmployeeDetailPage({ params }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { employeeId } = params;

  // TODO: 직원 상세 정보를 가져오는 쿼리 구현
  // const { data: employeeData, loading, error } = useGetEmployeeQuery({
  //   variables: { employeeId: parseInt(employeeId) }
  // });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR');
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
        <h1 className="text-2xl font-bold">직원 상세 정보</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>직원 ID: {employeeId}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            직원 상세 정보 페이지가 준비 중입니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 