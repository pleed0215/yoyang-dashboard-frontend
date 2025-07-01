import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { Route } from "./+types/hospital-positions";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import {
  useRetrieveMyHospitalPositionsQuery,
  useCreateMyHospitalPositionMutation,
  useUpdateHospitalPositionMutation,
  useDeleteHospitalPositionMutation,
} from "~/graphql/operations";

export default function HospitalPositionsPage() {
  const apolloClient = useApolloClient();
  const { data, loading: queryLoading, refetch } = useRetrieveMyHospitalPositionsQuery({ fetchPolicy: "network-only" });
  const positions = data?.retrieveMyHospitalPositions?.data ?? [];

  const [newPositionName, setNewPositionName] = useState("");
  const [editPositionId, setEditPositionId] = useState<string | null>(null);
  const [editPositionName, setEditPositionName] = useState("");
  const [mutationLoading, setMutationLoading] = useState(false);

  const [createPosition] = useCreateMyHospitalPositionMutation();
  const [updatePosition] = useUpdateHospitalPositionMutation();
  const [deletePosition] = useDeleteHospitalPositionMutation();

  const handleAddPosition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPositionName.trim()) return;
    setMutationLoading(true);
    try {
      const { data } = await createPosition({
        variables: { name: newPositionName.trim() },
      });
      if (data?.createMyHospitalPosition?.success) {
        toast.success("직책이 추가되었습니다.");
        setNewPositionName("");
        refetch();
      } else {
        toast.error(data?.createMyHospitalPosition?.message || "추가 실패");
      }
    } finally {
      setMutationLoading(false);
    }
  };

  const handleEditPosition = async (id: string) => {
    if (!editPositionName.trim()) return;
    setMutationLoading(true);
    try {
      const { data } = await updatePosition({
        variables: { positionId: Number(id), name: editPositionName.trim() },
      });
      if (data?.updateHospitalPosition?.success) {
        toast.success("직책 정보가 수정되었습니다.");
        setEditPositionId(null);
        setEditPositionName("");
        refetch();
      } else {
        toast.error(data?.updateHospitalPosition?.message || "수정 실패");
      }
    } finally {
      setMutationLoading(false);
    }
  };

  const handleDeletePosition = async (id: string) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setMutationLoading(true);
    try {
      const { data } = await deletePosition({
        variables: { positionId: Number(id) },
      });
      if (data?.deleteHospitalPosition?.success) {
        toast.success("직책이 삭제되었습니다.");
        refetch();
      } else {
        toast.error(data?.deleteHospitalPosition?.message || "삭제 실패");
      }
    } finally {
      setMutationLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-2 py-8 bg-neutral-50 dark:bg-neutral-950">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl text-center">내 병원 직책 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddPosition} className="flex gap-2 mb-4 justify-center">
            <Input
              value={newPositionName}
              onChange={e => setNewPositionName(e.target.value)}
              placeholder="새 직책명 입력"
              className="w-40"
              disabled={mutationLoading}
            />
            <Button type="submit" disabled={mutationLoading || !newPositionName.trim()} className="cursor-pointer">추가</Button>
          </form>
          {queryLoading ? (
            <div className="text-center text-muted-foreground py-8">로딩 중...</div>
          ) : positions.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">직책 정보가 없습니다.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/12 text-center">#</TableHead>
                  <TableHead>직책명</TableHead>
                  <TableHead className="w-32 text-center">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {positions.map((item: { id: string, name: string }, idx: number) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{idx + 1}</TableCell>
                    <TableCell>
                      {editPositionId === item.id ? (
                        <Input
                          value={editPositionName}
                          onChange={e => setEditPositionName(e.target.value)}
                          className="w-32"
                          autoFocus
                        />
                      ) : (
                        <Badge variant="secondary" className="text-base px-3 py-1">{item.name}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {editPositionId === item.id ? (
                        <>
                          <Button size="sm" type="button" className="cursor-pointer" onClick={() => handleEditPosition(item.id)} disabled={mutationLoading}>저장</Button>
                          <Button size="sm" type="button" variant="secondary" className="cursor-pointer" onClick={() => { setEditPositionId(null); setEditPositionName(""); }}>취소</Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" className="mr-2 cursor-pointer" onClick={() => { setEditPositionId(item.id); setEditPositionName(item.name); }}>수정</Button>
                          <Button size="sm" variant="destructive" className="cursor-pointer" onClick={() => handleDeletePosition(item.id)} disabled={mutationLoading}>삭제</Button>
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