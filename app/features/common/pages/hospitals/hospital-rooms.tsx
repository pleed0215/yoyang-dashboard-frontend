import { Route } from "./+types/staff-hospital-rooms";
import { useEffect, useState } from "react";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";

const RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY = gql`
  query RetrieveMyHospitalWardsAndRooms {
    retrieveMyHospitalWards {
      success
      message
      data {
        id
        name
        rooms {
          id
          name
          size
        }
      }
    }
  }
`;

const CREATE_HOSPITAL_ROOM_MUTATION = gql`
  mutation CreateMyHospitalRoom($wardId: Int!, $name: String!, $size: Int) {
    createMyHospitalRoom(wardId: $wardId, name: $name, size: $size) {
      success
      message
      data {
        id
        name
        size
      }
    }
  }
`;

const UPDATE_HOSPITAL_ROOM_MUTATION = gql`
  mutation UpdateHospitalRoom($roomId: Int!, $name: String, $wardId: Int, $size: Int) {
    updateHospitalRoom(roomId: $roomId, name: $name, wardId: $wardId, size: $size) {
      success
      message
      data {
        id
        name
        size
      }
    }
  }
`;

const DELETE_HOSPITAL_ROOM_MUTATION = gql`
  mutation DeleteHospitalRoom($roomId: Int!) {
    deleteHospitalRoom(roomId: $roomId) {
      success
      message
    }
  }
`;

// loader는 빈 객체만 반환
export const loader = async () => ({ });

export default function HospitalRoomsPage() {
  const apolloClient = useApolloClient();
  const { data, loading: queryLoading, refetch } = useQuery(RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY, { fetchPolicy: "network-only" });
  const wards = data?.retrieveMyHospitalWards?.data ?? [];
  // 병동 id/name 기준으로 상태 관리
  const wardOptions = wards.map((w: any) => ({ id: w.id ?? w.name, name: w.name, rooms: w.rooms ?? [] }));
  const [selectedWardId, setSelectedWardId] = useState(wardOptions[0]?.id ?? "");
  useEffect(() => {
    if (wardOptions.length > 0 && !wardOptions.find(w => w.id === selectedWardId)) {
      setSelectedWardId(wardOptions[0].id);
    }
  }, [data]);
  const selectedWard = wardOptions.find(w => w.id === selectedWardId);
  const filteredRooms = selectedWard?.rooms ?? [];

  // 추가/수정 상태 관리
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomSize, setNewRoomSize] = useState("6");
  const [editRoomId, setEditRoomId] = useState<number|null>(null);
  const [editRoomName, setEditRoomName] = useState("");
  const [editRoomSize, setEditRoomSize] = useState("");
  const [mutationLoading, setMutationLoading] = useState(false);

  // 병실 추가
  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    setMutationLoading(true);
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_HOSPITAL_ROOM_MUTATION,
        variables: {
          wardId: Number(selectedWardId),
          name: newRoomName.trim(),
          size: newRoomSize ? Number(newRoomSize) : undefined,
        },
      });
      if (data?.createMyHospitalRoom?.success) {
        toast.success("병실이 추가되었습니다.");
        setNewRoomName("");
        setNewRoomSize("6");
        refetch();
      } else {
        toast.error(data?.createMyHospitalRoom?.message || "추가 실패");
      }
    } finally {
      setMutationLoading(false);
    }
  };

  // 병실 수정
  const handleEditRoom = async (id: number) => {
    if (!editRoomName.trim()) return;
    setMutationLoading(true);
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_HOSPITAL_ROOM_MUTATION,
        variables: {
          roomId: Number(id),
          name: editRoomName.trim(),
          wardId: Number(selectedWardId),
          size: editRoomSize ? Number(editRoomSize) : undefined,
        },
      });
      if (data?.updateHospitalRoom?.success) {
        toast.success("병실 정보가 수정되었습니다.");
        setEditRoomId(null);
        setEditRoomName("");
        setEditRoomSize("");
        refetch();
      } else {
        toast.error(data?.updateHospitalRoom?.message || "수정 실패");
      }
    } finally {
      setMutationLoading(false);
    }
  };

  // 병실 삭제
  const handleDeleteRoom = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setMutationLoading(true);
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_HOSPITAL_ROOM_MUTATION,
        variables: { roomId: Number(id) },
      });
      if (data?.deleteHospitalRoom?.success) {
        toast.success("병실이 삭제되었습니다.");
        refetch();
      } else {
        toast.error(data?.deleteHospitalRoom?.message || "삭제 실패");
      }
    } finally {
      setMutationLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-2 py-8 bg-neutral-50 dark:bg-neutral-950">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl text-center">병실 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col md:flex-row gap-2 items-center justify-center">
            <label htmlFor="ward-select" className="font-medium">병동 선택:</label>
            <select
              id="ward-select"
              className="border rounded px-2 py-1 min-w-[120px]"
              value={selectedWardId}
              onChange={e => setSelectedWardId(e.target.value)}
              disabled={queryLoading || mutationLoading}
            >
              {wardOptions.map((w: any) => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>
          {/* 병실 추가 폼 */}
          <form onSubmit={handleAddRoom} className="flex gap-2 mb-4 justify-center">
            <Input
              value={newRoomName}
              onChange={e => setNewRoomName(e.target.value)}
              placeholder="새 병실명 입력"
              className="w-40"
              disabled={mutationLoading}
            />
            <input
              type="number"
              value={newRoomSize}
              onChange={e => setNewRoomSize(e.target.value.replace(/[^0-9]/g, ""))}
              min={1}
              className="w-24 border rounded px-2 py-1"
              disabled={mutationLoading}
              step={1}
            />
            <Button type="submit" disabled={mutationLoading || !newRoomName.trim()} className="cursor-pointer">추가</Button>
          </form>
          {queryLoading ? (
            <div className="text-center text-muted-foreground py-8">로딩 중...</div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">병실 정보가 없습니다.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/12 text-center">#</TableHead>
                  <TableHead>병실명</TableHead>
                  <TableHead className="w-32 text-center">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((item: any, idx: number) => (
                  <TableRow key={item.id ?? item.name}>
                    <TableCell className="text-center">{idx + 1}</TableCell>
                    <TableCell>
                      {editRoomId === (item.id ?? item.name) ? (
                        <div className="flex gap-2 items-center">
                          <Input
                            value={editRoomName}
                            onChange={e => setEditRoomName(e.target.value)}
                            className="w-32"
                            autoFocus
                          />
                          <Input
                            value={editRoomSize}
                            onChange={e => setEditRoomSize(e.target.value.replace(/[^0-9]/g, ""))}
                            className="w-20"
                            placeholder="인원수"
                            type="number"
                            min={1}
                          />
                          <Button size="sm" type="button" className="cursor-pointer" onClick={() => handleEditRoom(item.id ?? item.name)} disabled={mutationLoading}>저장</Button>
                          <Button size="sm" type="button" variant="secondary" className="cursor-pointer" onClick={() => { setEditRoomId(null); setEditRoomName(""); setEditRoomSize(""); }}>취소</Button>
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center">
                          <Badge variant="secondary" className="text-base px-3 py-1">{item.name}</Badge>
                          {item.size && <span className="text-xs text-muted-foreground">({item.size}인실)</span>}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {editRoomId === (item.id ?? item.name) ? null : (
                        <>
                          <Button size="sm" variant="outline" className="mr-2 cursor-pointer" onClick={() => { setEditRoomId(item.id ?? item.name); setEditRoomName(item.name); setEditRoomSize(item.size ? String(item.size) : ""); }}>수정</Button>
                          <Button size="sm" variant="destructive" className="cursor-pointer" onClick={() => handleDeleteRoom(item.id ?? item.name)} disabled={mutationLoading}>삭제</Button>
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
