import { Route } from './+types/super-users-index';
import { Button } from '~/components/ui/button';
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
import { RETRIEVE_USER_LIST_QUERY } from '~/graphql/queries';
import { CommonState, RetrieveUserListQuery, UserRole } from '~/graphql/types';
import { useApolloClient } from '@apollo/client';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router';
import { Suspense, useEffect, useState, useTransition } from 'react';
import { roleLabel, stateLabel, stateBadgeVariant } from '~/lib/enum-mapping';
import PageInfo from '~/components/common/page-info';
import { contextWithToken } from '~/lib/apollo';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useUpdateManyUserStatusMutation } from '~/graphql/operations';
import { SubmitButton } from '~/components/common/submit-button';
import { Skeleton } from '~/components/ui/skeleton';

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const role = (url.searchParams.get('role') as UserRole) || UserRole.Staff;
    const state = (url.searchParams.get('state') as CommonState) || CommonState.Active;
    const intPage = parseInt(page);

    const { data } = await serverApolloClient.query<RetrieveUserListQuery>({
      query: RETRIEVE_USER_LIST_QUERY,
      context: { ...contextWithToken(request) },
      fetchPolicy: 'no-cache',
      variables: {
        page: !isNaN(intPage) ? intPage : 1,
        role,
        state,
      },
    });

    return {
      data: data.superOnlyRetrieveUserList.data,
      pageInfo: data.superOnlyRetrieveUserList.pageInfo,
      apolloState: serverApolloClient.extract(),
    };
  } catch (e) {
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

export default function SuperUsersPage({ loaderData }: Route.ComponentProps) {
  const { data, apolloState, pageInfo } = loaderData;
  const apolloClient = useApolloClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [updateManyUsersStatus, { loading }] = useUpdateManyUserStatusMutation({});
  const navigate = useNavigate();

  const filterRole = (searchParams.get('role') as UserRole) || UserRole.Staff;
  const filterState = (searchParams.get('state') as CommonState) || CommonState.Active;
  const paramPage = searchParams.get('page') || '1';

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.Staff);
  const [selectedState, setSelectedState] = useState<CommonState>(CommonState.Active);

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
    searchParams.set('role', value);
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

    const result = await updateManyUsersStatus({
      variables: {
        input: {
          users: selectedUsers.map(userId => ({
            userId: +userId,
            role: selectedRole,
            state: selectedState,
          })),
        },
      },
      onCompleted: () => {
        toast('업데이트 완료되었습니다.');
        setSelectedUsers([]);
        setSearchParams(searchParams, { preventScrollReset: true });
      },
      // fetchPolicy: 'network-only',
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
                value={selectedRole}
                onValueChange={(value: UserRole) => setSelectedRole(value)}
                disabled={selectedUsers.length === 0}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="역할 변경" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleLabel).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
                    {Object.entries(roleLabel).map(([value, label]) => (
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
                    />
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{roleLabel[user.role]}</TableCell>
                  <TableCell>
                    <Badge variant={stateBadgeVariant[user.state]}>{stateLabel[user.state]}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>데이터가 없습니다.</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
      {!!data && data.length > 0 && pageInfo && <PageInfo totalPages={pageInfo.totalPages} />}
    </div>
  );
}
