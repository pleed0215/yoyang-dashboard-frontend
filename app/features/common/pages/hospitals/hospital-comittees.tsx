import { Route } from "./+types/hospital-comittees";
import { gql, useApolloClient } from "@apollo/client";
import { useLoaderData } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { serverApolloClient } from "~/lib/apollo-client-server";
import { RetrieveMyHospitalCommitteesQuery } from "~/graphql/types";
import { contextWithToken } from "~/lib/apollo";
import { useEffect } from "react";

const RETRIEVE_MY_HOSPITAL_COMMITTEES_QUERY = gql`
  query RetrieveMyHospitalCommittees {
    retrieveMyHospitalCommittees {
        success
        message
        data {
            name
        }
    }
  }
`;

export const loader = async ({request}:Route.LoaderArgs) => {
  try {
    const { data } = await serverApolloClient.query<RetrieveMyHospitalCommitteesQuery>({
      query: RETRIEVE_MY_HOSPITAL_COMMITTEES_QUERY,
      context: {
        ...contextWithToken(request)
      }
    });
    return {
      committees: data?.retrieveMyHospitalCommittees?.data ?? [],
      apolloState: serverApolloClient.extract(),
    };
  } catch (e) {
    return {
      committees: [],
      apolloState: serverApolloClient.extract(),
    };
  }
};

export default function HospitalComitteesPage({loaderData}:Route.ComponentProps) {
  const { committees, apolloState } = loaderData ?? {};
  const apolloClient = useApolloClient();
  useEffect(() => {
    apolloClient.restore(apolloState);
  }, [apolloState]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-2 py-8 bg-neutral-50 dark:bg-neutral-950">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl text-center">병원 위원회 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {committees.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">위원회 정보가 없습니다.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/12 text-center">#</TableHead>
                  <TableHead>위원회명</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {committees.map((item, idx) => (
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
