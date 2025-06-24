import { Route } from "./+types/staff-hospital-duties";
import { gql, useApolloClient } from "@apollo/client";
import { useLoaderData } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { serverApolloClient } from "~/lib/apollo-client-server";
import { RetrieveMyHospitalDutiesQuery } from "~/graphql/types";
import { contextWithToken } from "~/lib/apollo";
import { useEffect } from "react";

const RETRIEVE_MY_HOSPITAL_DUTIES_QUERY = gql`
  query RetrieveMyHospitalDuties {
    retrieveMyHospitalDuties {
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
    const { data } = await serverApolloClient.query<RetrieveMyHospitalDutiesQuery>({
      query: RETRIEVE_MY_HOSPITAL_DUTIES_QUERY,
      context: {
        ...contextWithToken(request)
      }
    });
    return {
      duties: data?.retrieveMyHospitalDuties?.data ?? [],
      apolloState: serverApolloClient.extract(),
    };
  } catch (e) {
    return {
      duties: [],
      apolloState: serverApolloClient.extract(),
    };
  }
};

export default function HospitalDutiesPage({loaderData}:Route.ComponentProps) {
  const { duties, apolloState } = loaderData ?? {};
  const apolloClient = useApolloClient();
  useEffect(() => {
    apolloClient.restore(apolloState);
  }, [apolloState]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-2 py-8 bg-neutral-50 dark:bg-neutral-950">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl text-center">병원 직무 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {duties.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">직무 정보가 없습니다.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/12 text-center">#</TableHead>
                  <TableHead>직무명</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {duties.map((item, idx) => (
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