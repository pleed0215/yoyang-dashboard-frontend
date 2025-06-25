import { gql, useApolloClient } from "@apollo/client";
import { Route } from "./+types/staff-hospital-positions";
import { serverApolloClient } from "~/lib/apollo-client-server";
import { contextWithToken } from "~/lib/apollo";
import { RetrieveMyHospitalPositionsQuery } from "~/graphql/types";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";

const RETRIEVE_MY_HOSPITAL_POSITIONS_QUERY = gql`
  query RetrieveMyHospitalPositions {
    retrieveMyHospitalPositions {
      success
      message
      data {
        name
      }
    }
  }
`;

export const loader = async ({request}:Route.LoaderArgs) => {
  try{
    const data = await serverApolloClient.query<RetrieveMyHospitalPositionsQuery >({
      query: RETRIEVE_MY_HOSPITAL_POSITIONS_QUERY,
      context: {
        ...contextWithToken(request)
      }
    });
    return {
      data: data?.data?.retrieveMyHospitalPositions?.data ?? [],
      apolloState: serverApolloClient.extract(),
    }
  } catch(e) {
    return {
      data: [],
      apolloState: serverApolloClient.extract(),
    }
  }
  
}

export default function HospitalPositionsPage({loaderData}:Route.ComponentProps) {
  const {data, apolloState} = loaderData ?? {};
  const apolloClient = useApolloClient();
  useEffect(() => {
    apolloClient.restore(apolloState);
  }, [apolloState]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-2 py-8 bg-neutral-50 dark:bg-neutral-950">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl text-center">내 병원 직책 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">직책 정보가 없습니다.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/12 text-center">#</TableHead>
                  <TableHead>직책명</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item: { name: string }, idx: number) => (
                  <TableRow key={item.name}>
                    <TableCell className="text-center">{idx + 1}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-base px-3 py-1">{item.name}</Badge>
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