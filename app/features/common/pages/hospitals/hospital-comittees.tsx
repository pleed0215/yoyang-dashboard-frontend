import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '~/components/ui/table';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { toast } from 'sonner';
import {
  useRetrieveMyHospitalCommitteesQuery,
  useCreateMyHospitalCommitteeMutation,
  useUpdateHospitalCommitteeMutation,
  useDeleteHospitalCommitteeMutation,
} from '~/graphql/operations';

export default function HospitalComitteesPage() {
  const {
    data,
    loading: queryLoading,
    refetch,
  } = useRetrieveMyHospitalCommitteesQuery({ fetchPolicy: 'network-only' });
  const committees = data?.retrieveMyHospitalCommittees?.data ?? [];

  const [newCommitteeName, setNewCommitteeName] = useState('');
  const [editCommitteeId, setEditCommitteeId] = useState<string | null>(null);
  const [editCommitteeName, setEditCommitteeName] = useState('');
  const [mutationLoading, setMutationLoading] = useState(false);

  const [createCommittee] = useCreateMyHospitalCommitteeMutation();
  const [updateCommittee] = useUpdateHospitalCommitteeMutation();
  const [deleteCommittee] = useDeleteHospitalCommitteeMutation();

  const handleAddCommittee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommitteeName.trim()) return;
    setMutationLoading(true);
    try {
      const { data } = await createCommittee({
        variables: { name: newCommitteeName.trim() },
      });
      if (data?.createMyHospitalCommittee?.success) {
        toast.success('위원회가 추가되었습니다.');
        setNewCommitteeName('');
        refetch();
      } else {
        toast.error(data?.createMyHospitalCommittee?.message || '추가 실패');
      }
    } finally {
      setMutationLoading(false);
    }
  };

  const handleEditCommittee = async (id: string) => {
    if (!editCommitteeName.trim()) return;
    setMutationLoading(true);
    try {
      const { data } = await updateCommittee({
        variables: { committeeId: Number(id), name: editCommitteeName.trim() },
      });
      if (data?.updateHospitalCommittee?.success) {
        toast.success('위원회 정보가 수정되었습니다.');
        setEditCommitteeId(null);
        setEditCommitteeName('');
        refetch();
      } else {
        toast.error(data?.updateHospitalCommittee?.message || '수정 실패');
      }
    } finally {
      setMutationLoading(false);
    }
  };

  const handleDeleteCommittee = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    setMutationLoading(true);
    try {
      const { data } = await deleteCommittee({
        variables: { committeeId: Number(id) },
      });
      if (data?.deleteHospitalCommittee?.success) {
        toast.success('위원회가 삭제되었습니다.');
        refetch();
      } else {
        toast.error(data?.deleteHospitalCommittee?.message || '삭제 실패');
      }
    } finally {
      setMutationLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-2 py-8 bg-neutral-50 dark:bg-neutral-950">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl text-center">병원 위원회 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCommittee} className="flex gap-2 mb-4 justify-center">
            <Input
              value={newCommitteeName}
              onChange={e => setNewCommitteeName(e.target.value)}
              placeholder="새 위원회명 입력"
              className="w-40"
              disabled={mutationLoading}
            />
            <Button
              type="submit"
              disabled={mutationLoading || !newCommitteeName.trim()}
              className="cursor-pointer"
            >
              추가
            </Button>
          </form>
          {queryLoading ? (
            <div className="text-center text-muted-foreground py-8">로딩 중...</div>
          ) : committees.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">위원회 정보가 없습니다.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/12 text-center">#</TableHead>
                  <TableHead>위원회명</TableHead>
                  <TableHead className="w-32 text-center">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {committees.map((item: { id: string; name: string }, idx: number) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{idx + 1}</TableCell>
                    <TableCell>
                      {editCommitteeId === item.id ? (
                        <Input
                          value={editCommitteeName}
                          onChange={e => setEditCommitteeName(e.target.value)}
                          className="w-32"
                          autoFocus
                        />
                      ) : (
                        <Badge variant="secondary" className="text-base px-3 py-1">
                          {item.name}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {editCommitteeId === item.id ? (
                        <>
                          <Button
                            size="sm"
                            type="button"
                            className="cursor-pointer"
                            onClick={() => handleEditCommittee(item.id)}
                            disabled={mutationLoading}
                          >
                            저장
                          </Button>
                          <Button
                            size="sm"
                            type="button"
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => {
                              setEditCommitteeId(null);
                              setEditCommitteeName('');
                            }}
                          >
                            취소
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mr-2 cursor-pointer"
                            onClick={() => {
                              setEditCommitteeId(item.id);
                              setEditCommitteeName(item.name);
                            }}
                          >
                            수정
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="cursor-pointer"
                            onClick={() => handleDeleteCommittee(item.id)}
                            disabled={mutationLoading}
                          >
                            삭제
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
