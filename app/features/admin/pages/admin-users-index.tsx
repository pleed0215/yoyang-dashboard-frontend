import { Route } from './+types/admin-users-index';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Badge } from '~/components/ui/badge';
import { Checkbox } from '~/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { serverApolloClient } from '~/lib/apollo-client-server';
import { RETRIEVE_HOSPITAL_USER_QUERY,  } from '~/graphql/queries';
import { CommonState, RetrieveHospitalUsersQuery, RetrieveHospitalUsersQueryVariables, UserRole } from '~/graphql/types';
import { useApolloClient } from '@apollo/client';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { roleLabel, stateLabel, stateBadgeVariant } from '~/lib/enum-mapping';
import PageInfo from '~/components/common/page-info';
import { contextWithToken } from '~/lib/apollo';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useUpdateManyUserStatusMutation, useUnlinkManyUserFromHospitalForAdminMutation, useUnlinkUserFromHospitalForAdminMutation, useMeQuery } from '~/graphql/operations';
import { SubmitButton } from '~/components/common/submit-button';
import { Skeleton } from '~/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const role = url.searchParams.get('role');
    const intPage = parseInt(page);

    const variables: any = {
      page: !isNaN(intPage) ? intPage : 1,
    };
    if (role && role !== 'ALL') {
      variables.role = role;
    }

    const { data } = await serverApolloClient.query<RetrieveHospitalUsersQuery, RetrieveHospitalUsersQueryVariables>({
      query: RETRIEVE_HOSPITAL_USER_QUERY,
      context: { ...contextWithToken(request) },
      fetchPolicy: 'no-cache',
      variables,
    });

    return {
      data: data.retrieveHospitalUsersForAdmin.data,
      pageInfo: data.retrieveHospitalUsersForAdmin.pageInfo,
      apolloState: serverApolloClient.extract(),
    };
  } catch (e) {
    console.error(e);
    return { data: [], pageInfo: null };
  }
};

function TableSkeletonRows({ rowCount = 8 }) {
  return (
    <TableBody>
      {Array.from({ length: rowCount }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4 w-4 mx-auto" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default function AdminUsersIndexPage({ loaderData }: Route.ComponentProps) {
  const { data, apolloState, pageInfo } = loaderData;
  const apolloClient = useApolloClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [updateManyUsersStatus, { loading }] = useUpdateManyUserStatusMutation({});
  const [unlinkMany, { loading: unlinkManyLoading }] = useUnlinkManyUserFromHospitalForAdminMutation();
  const [unlinkOne, { loading: unlinkOneLoading }] = useUnlinkUserFromHospitalForAdminMutation();
  const navigate = useNavigate();
  const { data: meData } = useMeQuery();
  const myId = meData?.me?.data?.id;

  const filterRole = searchParams.get('role') || 'ALL';
  const filterState = (searchParams.get('state') as CommonState) || CommonState.Active;
  const paramPage = searchParams.get('page') || '1';

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedState, setSelectedState] = useState<CommonState>(CommonState.Active);
  const [unlinkDialogOpen, setUnlinkDialogOpen] = useState(false);
  const [unlinkTarget, setUnlinkTarget] = useState<number | null>(null);
  const [unlinkManyDialogOpen, setUnlinkManyDialogOpen] = useState(false);

  const handleSelectAll = (checked: CheckedState) => {
    if (checked === true) {
      setSelectedUsers(data?.map((user: { id: any }) => user.id) ?? []);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (checked: CheckedState, userId: number) => {
    if (checked === true) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const handleFilterRole = (value: string) => {
    if (value === 'ALL') {
      searchParams.delete('role');
    } else {
      searchParams.set('role', value);
    }
    setSearchParams(searchParams, { preventScrollReset: true });
  };
  const handleFilterState = (value: string) => {
    searchParams.set('state', value);
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  const handleSave = async () => {
    if (selectedUsers.length === 0) {
      toast.error('선택된 사용자가 없습니다.');
      return;
    }
    await updateManyUsersStatus({
      variables: {
        input: {
          users: selectedUsers.map(userId => ({
            userId: +userId,
            state: selectedState,
          })),
        },
      },
      onCompleted: () => {
        toast('업데이트 완료되었습니다.');
        setSelectedUsers([]);
        setSearchParams(searchParams, { preventScrollReset: true });
      },
    });
  };

  const handleUnlinkMany = async () => {
    if (selectedUsers.length === 0) return;
    await unlinkMany({
      variables: { input: { userIds: selectedUsers } },
      onCompleted: (res) => {
        if (res.unlinkManyUserForAdmin.success) {
          toast.success(res.unlinkManyUserForAdmin.message || '연결 해제 완료');
          setUnlinkManyDialogOpen(false);
          setSelectedUsers([]);
          setTimeout(() => navigate(0), 500);
        } else {
          toast.error(res.unlinkManyUserForAdmin.message || '연결 해제 실패');
        }
      },
    });
  };

  const handleUnlinkOne = async () => {
    if (!unlinkTarget) return;
    await unlinkOne({
      variables: { input: { userId: unlinkTarget } },
      onCompleted: (res) => {
        if (res.unlinkUserForAdmin.success) {
          toast.success(res.unlinkUserForAdmin.message || '연결 해제 완료');
          setUnlinkDialogOpen(false);
          setTimeout(() => navigate(0), 500);
        } else {
          toast.error(res.unlinkUserForAdmin.message || '연결 해제 실패');
        }
      },
    });
  };

  useEffect(() => {
    apolloClient.cache.restore(apolloState ?? {});
  }, []);

  return (
    <div className="space-y-4 p-4">
      <div className="rounded-md border">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">사용자 목록</h2>
            <div className="flex items-center gap-4">
              <Select
                value={selectedState}
                onValueChange={(value: CommonState) => setSelectedState(value)}
                disabled={selectedUsers.length === 0}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="상태 변경" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(stateLabel).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <SubmitButton
                loading={loading}
                onClick={handleSave}
                disabled={selectedUsers.length === 0}
              >
                선택 항목 저장 ({selectedUsers.length}개)
              </SubmitButton>
              <Button
                variant="destructive"
                onClick={() => setUnlinkManyDialogOpen(true)}
                disabled={selectedUsers.length === 0 || unlinkManyLoading}
              >
                선택 항목 연결 해제
              </Button>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="*:text-center">
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={!!data && selectedUsers.length === data.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>사용자명</TableHead>
              <TableHead>
                <Select
                  value={filterRole}
                  defaultValue={filterRole}
                  onValueChange={handleFilterRole}
                >
                  <SelectTrigger className="min-w-[100px] mx-auto">역할</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">모두</SelectItem>
                    {Object.entries(roleLabel)
                      .filter(([value]) => value !== 'SUPER')
                      .map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </TableHead>
              <TableHead>
                <Select
                  value={filterState}
                  defaultValue={filterState}
                  onValueChange={handleFilterState}
                >
                  <SelectTrigger className="min-w-[100px] mx-auto ">상태</SelectTrigger>
                  <SelectContent>
                    {Object.entries(stateLabel).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableHead>
              <TableHead>액션</TableHead>
            </TableRow>
          </TableHeader>
          {data === undefined ? (
            <TableSkeletonRows rowCount={8} />
          ) : !!data && data.length > 0 ? (
            <TableBody className="*:text-center">
              {data.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={checked => handleSelectUser(checked, user.id)}
                      disabled={String(user.id) === String(myId)}
                    />
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {user.email}
                    {String(user.id) === String(myId) && (
                      <Badge variant="secondary" className="ml-2 text-xs px-2 py-0.5 align-middle" >Me</Badge>
                    )}
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{roleLabel[user.role]}</TableCell>
                  <TableCell>
                    <Badge variant={stateBadgeVariant[user.state]}>{stateLabel[user.state]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => { setUnlinkTarget(user.id); setUnlinkDialogOpen(true); }}
                      disabled={unlinkOneLoading || String(user.id) === String(myId)}
                    >
                      연결 해제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={7}>데이터가 없습니다.</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
      {!!data && data.length > 0 && pageInfo && <PageInfo totalPages={pageInfo.totalPages} />}

      {/* 여러 명 연결 해제 다이얼로그 */}
      <Dialog open={unlinkManyDialogOpen} onOpenChange={setUnlinkManyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>선택 항목 연결 해제</DialogTitle>
          </DialogHeader>
          <DialogDescription>정말로 선택한 {selectedUsers.length}명의 연결을 해제하시겠습니까?</DialogDescription>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setUnlinkManyDialogOpen(false)} disabled={unlinkManyLoading}>아니오</Button>
            <SubmitButton className="bg-destructive text-white hover:bg-destructive/90" onClick={handleUnlinkMany} loading={unlinkManyLoading} type="button">
              네, 연결 해제
            </SubmitButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* 단일 연결 해제 다이얼로그 */}
      <Dialog open={unlinkDialogOpen} onOpenChange={setUnlinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>연결 해제</DialogTitle>
          </DialogHeader>
          <DialogDescription>정말로 이 사용자의 연결을 해제하시겠습니까?</DialogDescription>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setUnlinkDialogOpen(false)} disabled={unlinkOneLoading}>아니오</Button>
            <SubmitButton className="bg-destructive text-white hover:bg-destructive/90" onClick={handleUnlinkOne} loading={unlinkOneLoading} type="button">
              네, 연결 해제
            </SubmitButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
