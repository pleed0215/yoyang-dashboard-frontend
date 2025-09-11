import { Route } from "./+types/hospital-rooms";
import { useEffect, useState } from "react";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { LabelInput } from "~/components/common/label-input";
import { CREATE_HOSPITAL_ROOM_MUTATION, RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY, UPDATE_HOSPITAL_ROOM_MUTATION, DELETE_HOSPITAL_ROOM_MUTATION } from "~/graphql/queries";
import { useNavigate, useSearchParams } from 'react-router';
import { RetrieveMyHospitalWardsAndRoomsQuery } from "~/graphql/types";

// loader는 빈 객체만 반환
export const loader = async () => ({ });

export default function HospitalRoomsPage({}:Route.ComponentProps) {
  const apolloClient = useApolloClient();
  const { data, loading: queryLoading, refetch } = useQuery<RetrieveMyHospitalWardsAndRoomsQuery>(RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY);
  const wards = data?.retrieveMyHospitalWards?.data ?? [];
  const wardOptions = wards.map((w: any) => ({ id: w.id ?? w.name, name: w.name, rooms: w.rooms ?? [] }));

  // search param 연동
  const [searchParams, setSearchParams] = useSearchParams();
  const wardParam = searchParams.get('ward') || '';
  const [selectedWardId, setSelectedWardId] = useState(wardParam);
  useEffect(() => {
    // search param이 바뀌면 select도 동기화
    setSelectedWardId(wardParam);
  }, [wardParam]);
  useEffect(() => {
    // select가 바뀌면 search param도 동기화
    if (selectedWardId) {
      searchParams.set('ward', selectedWardId);
      setSearchParams(searchParams, { preventScrollReset: true });
    } else {
      searchParams.delete('ward');
      setSearchParams(searchParams, { preventScrollReset: true });
    }
  }, [selectedWardId]);

  // 병동이 없거나 선택되지 않으면 추가/수정/삭제 불가
  const selectedWard = wardOptions.find(w => w.id === Number(selectedWardId));
  const filteredRooms = selectedWard?.rooms ?? [];

  // 추가/수정 상태 관리
  const [editRoomId, setEditRoomId] = useState<number|null>(null);
  const [editRoomName, setEditRoomName] = useState("");
  const [editRoomSize, setEditRoomSize] = useState("");
  const [mutationLoading, setMutationLoading] = useState(false);
  const [formError, setFormError] = useState<string>("");

  // react-hook-form 세팅
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: { name: "", size: "6" },
  });

  // 병실 추가 (react-hook-form용)
  const onAddRoom = async (values: { name: string; size: string }) => {
    setFormError("");
    if (!selectedWardId) {
      setFormError("병동을 먼저 선택하세요.");
      return;
    }
    if (!values.name.trim()) {
      setFormError("병실명을 입력하세요.");
      return;
    }
    if (!values.size || isNaN(Number(values.size)) || Number(values.size) < 1) {
      setFormError("인원수는 1 이상의 숫자여야 합니다.");
      return;
    }
    setMutationLoading(true);
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_HOSPITAL_ROOM_MUTATION,
        variables: {
          wardId: Number(selectedWardId),
          name: values.name.trim(),
          size: values.size ? Number(values.size) : undefined,
        },
      });
      if (data?.createMyHospitalRoom?.success) {
        toast.success("병실이 추가되었습니다.");
        reset();
        refetch();
      } else {
        setFormError(data?.createMyHospitalRoom?.message || "추가 실패");
      }
    } catch (e: any) {
      setFormError(e?.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setMutationLoading(false);
    }
  };

  // 병실 수정
  const handleEditRoom = async (id: number) => {
    setFormError("");
    if (!editRoomName.trim()) {
      setFormError("병실명을 입력하세요.");
      return;
    }
    if (!editRoomSize || isNaN(Number(editRoomSize)) || Number(editRoomSize) < 1) {
      setFormError("인원수는 1 이상의 숫자여야 합니다.");
      return;
    }
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
        setFormError(data?.updateHospitalRoom?.message || "수정 실패");
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
        setFormError(data?.deleteHospitalRoom?.message || "삭제 실패");
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
              disabled={queryLoading || mutationLoading || wardOptions.length === 0}
            >
              <option value="">병동을 선택하세요</option>
              {wardOptions.map((w: any) => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>
          {/* 병실 추가 폼 */}
          <form onSubmit={handleSubmit(onAddRoom)} className="flex gap-2 mb-4 justify-center items-end">
            <LabelInput
              label="병실명"
              {...register("name")}
              className="w-40"
              disabled={mutationLoading || !selectedWardId}
            />
            <LabelInput
              label="인원수"
              type="number"
              min={1}
              {...register("size")}
              className="w-24"
              disabled={mutationLoading || !selectedWardId}
            />
            <Button type="submit" disabled={mutationLoading || !selectedWardId} className="cursor-pointer">추가</Button>
          </form>
          {/* 오류 메시지 통합 */}
          {formError && <div className="text-center text-red-500 mb-4">{formError}</div>}
          {queryLoading ? (
            <div className="text-center text-muted-foreground py-8">로딩 중...</div>
          ) : !selectedWardId ? (
            <div className="text-center text-muted-foreground py-8">병동을 먼저 선택하세요.</div>
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
