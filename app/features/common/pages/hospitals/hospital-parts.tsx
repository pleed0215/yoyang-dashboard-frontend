import { useState } from "react";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";

const RETRIEVE_MY_HOSPITAL_PARTS_QUERY = gql`
  query RetrieveMyHospitalParts {
    retrieveMyHospitalParts {
      success
      message
      data {
        id
        name
      }
    }
  }
`;

const CREATE_HOSPITAL_PART_MUTATION = gql`
  mutation CreateMyHospitalPart($name: String!) {
    createMyHospitalPart(name: $name) {
      success
      message
      data {
        id
        name
      }
    }
  }
`;

const UPDATE_HOSPITAL_PART_MUTATION = gql`
  mutation UpdateHospitalPart($partId: Int!, $name: String!) {
    updateHospitalPart(partId: $partId, name: $name) {
      success
      message
      data {
        id
        name
      }
    }
  }
`;

const DELETE_HOSPITAL_PART_MUTATION = gql`
  mutation DeleteHospitalPart($partId: Int!) {
    deleteHospitalPart(partId: $partId) {
      success
      message
    }
  }
`;

export const loader = async () => ({ });

export default function HospitalPartsPage() {
  const apolloClient = useApolloClient();
  const { data, loading: queryLoading, refetch } = useQuery(RETRIEVE_MY_HOSPITAL_PARTS_QUERY, { fetchPolicy: "network-only" });
  const parts = data?.retrieveMyHospitalParts?.data ?? [];

  const [newPartName, setNewPartName] = useState("");
  const [editPartId, setEditPartId] = useState<number|null>(null);
  const [editPartName, setEditPartName] = useState("");
  const [mutationLoading, setMutationLoading] = useState(false);

  const handleAddPart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartName.trim()) return;
    setMutationLoading(true);
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_HOSPITAL_PART_MUTATION,
        variables: { name: newPartName.trim() },
      });
      if (data?.createMyHospitalPart?.success) {
        toast.success("부서가 추가되었습니다.");
        setNewPartName("");
        refetch();
      } else {
        toast.error(data?.createMyHospitalPart?.message || "추가 실패");
      }
    } finally {
      setMutationLoading(false);
    }
  };

  const handleEditPart = async (id: number) => {
    if (!editPartName.trim()) return;
    setMutationLoading(true);
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_HOSPITAL_PART_MUTATION,
        variables: { partId: Number(id), name: editPartName.trim() },
      });
      if (data?.updateHospitalPart?.success) {
        toast.success("부서 정보가 수정되었습니다.");
        setEditPartId(null);
        setEditPartName("");
        refetch();
      } else {
        toast.error(data?.updateHospitalPart?.message || "수정 실패");
      }
    } finally {
      setMutationLoading(false);
    }
  };

  const handleDeletePart = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setMutationLoading(true);
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_HOSPITAL_PART_MUTATION,
        variables: { partId: Number(id) },
      });
      if (data?.deleteHospitalPart?.success) {
        toast.success("부서가 삭제되었습니다.");
        refetch();
      } else {
        toast.error(data?.deleteHospitalPart?.message || "삭제 실패");
      }
    } finally {
      setMutationLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-2 py-8 bg-neutral-50 dark:bg-neutral-950">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl text-center">부서(파트) 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddPart} className="flex gap-2 mb-4 justify-center">
            <Input
              value={newPartName}
              onChange={e => setNewPartName(e.target.value)}
              placeholder="새 부서명 입력"
              className="w-40"
              disabled={mutationLoading}
            />
            <Button type="submit" disabled={mutationLoading || !newPartName.trim()} className="cursor-pointer">추가</Button>
          </form>
          {queryLoading ? (
            <div className="text-center text-muted-foreground py-8">로딩 중...</div>
          ) : parts.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">부서 정보가 없습니다.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/12 text-center">#</TableHead>
                  <TableHead>부서명</TableHead>
                  <TableHead className="w-32 text-center">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parts.map((item: any, idx: number) => (
                  <TableRow key={item.id ?? item.name}>
                    <TableCell className="text-center">{idx + 1}</TableCell>
                    <TableCell>
                      {editPartId === (item.id ?? item.name) ? (
                        <Input
                          value={editPartName}
                          onChange={e => setEditPartName(e.target.value)}
                          className="w-32"
                          autoFocus
                        />
                      ) : (
                        <Badge variant="secondary" className="text-base px-3 py-1">{item.name}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {editPartId === (item.id ?? item.name) ? (
                        <>
                          <Button size="sm" type="button" className="cursor-pointer" onClick={() => handleEditPart(item.id ?? item.name)} disabled={mutationLoading}>저장</Button>
                          <Button size="sm" type="button" variant="secondary" className="cursor-pointer" onClick={() => { setEditPartId(null); setEditPartName(""); }}>취소</Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" className="mr-2 cursor-pointer" onClick={() => { setEditPartId(item.id ?? item.name); setEditPartName(item.name); }}>수정</Button>
                          <Button size="sm" variant="destructive" className="cursor-pointer" onClick={() => handleDeletePart(item.id ?? item.name)} disabled={mutationLoading}>삭제</Button>
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
