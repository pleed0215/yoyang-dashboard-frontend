import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import {
  useRetrieveMyHospitalWardsQuery,
  useCreateMyHospitalWardMutation,
  useUpdateHospitalWardMutation,
  useDeleteHospitalWardMutation,
} from "~/graphql/operations";

export default function HospitalWardsPage() {
  const { data, loading: queryLoading, refetch } = useRetrieveMyHospitalWardsQuery({ fetchPolicy: "network-only" });
  const wards = data?.retrieveMyHospitalWards?.data ?? [];

  const [newWardName, setNewWardName] = useState("");
  const [editWardId, setEditWardId] = useState<number | null>(null);
  const [editWardName, setEditWardName] = useState("");
  const [mutationLoading, setMutationLoading] = useState(false);

  const [createWard] = useCreateMyHospitalWardMutation();
  const [updateWard] = useUpdateHospitalWardMutation();
  const [deleteWard] = useDeleteHospitalWardMutation();

  const handleAddWard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWardName.trim()) return;
    setMutationLoading(true);
    try {
      const { data } = await createWard({
        variables: { name: newWardName.trim() },
      });
      if (data?.createMyHospitalWard?.success) {
        toast.success("병동이 추가되었습니다.");
        setNewWardName("");
        refetch();
      } else {
        toast.error(data?.createMyHospitalWard?.message || "추가 실패");
      }
    } finally {
      setMutationLoading(false);
    }
  };

  const handleEditWard = async (id: number) => {
    if (!editWardName.trim()) return;
    setMutationLoading(true);
    try {
      const { data } = await updateWard({
        variables: { wardId: id, name: editWardName.trim() },
      });
      if (data?.updateHospitalWard?.success) {
        toast.success("병동 정보가 수정되었습니다.");
        setEditWardId(null);
        setEditWardName("");
        refetch();
      } else {
        toast.error(data?.updateHospitalWard?.message || "수정 실패");
      }
    } finally {
      setMutationLoading(false);
    }
  };

  const handleDeleteWard = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setMutationLoading(true);
    try {
      const { data } = await deleteWard({
        variables: { wardId: id },
      });
      if (data?.deleteHospitalWard?.success) {
        toast.success("병동이 삭제되었습니다.");
        refetch();
      } else {
        toast.error(data?.deleteHospitalWard?.message || "삭제 실패");
      }
    } finally {
      setMutationLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-2 py-8 bg-neutral-50 dark:bg-neutral-950">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl text-center">병동 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddWard} className="flex gap-2 mb-4 justify-center">
            <Input
              value={newWardName}
              onChange={e => setNewWardName(e.target.value)}
              placeholder="새 병동명 입력"
              className="w-40"
              disabled={mutationLoading}
            />
            <Button type="submit" disabled={mutationLoading || !newWardName.trim()} className="cursor-pointer">추가</Button>
          </form>
          {queryLoading ? (
            <div className="text-center text-muted-foreground py-8">로딩 중...</div>
          ) : wards.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">병동 정보가 없습니다.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/12 text-center">#</TableHead>
                  <TableHead>병동명</TableHead>
                  <TableHead className="w-32 text-center">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wards.map((item, idx) => {
                  if (!item) return null;
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">{idx + 1}</TableCell>
                      <TableCell>
                        {editWardId === item.id ? (
                          <Input
                            value={editWardName}
                            onChange={e => setEditWardName(e.target.value)}
                            className="w-32"
                            autoFocus
                          />
                        ) : (
                          <Badge variant="secondary" className="text-base px-3 py-1">{item.name}</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {editWardId === item.id ? (
                          <>
                            <Button
                              size="sm"
                              type="button"
                              className="cursor-pointer"
                              onClick={() => handleEditWard(item.id)}
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
                                setEditWardId(null);
                                setEditWardName('');
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
                                setEditWardId(item.id);
                                setEditWardName(item.name);
                              }}
                            >
                              수정
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="cursor-pointer"
                              onClick={() => handleDeleteWard(item.id)}
                              disabled={mutationLoading}
                            >
                              삭제
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
