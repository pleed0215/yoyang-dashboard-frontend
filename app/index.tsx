import {Route} from "./+types/index"
import {createServerApolloClient, serverApolloClient} from "~/lib/apollo-client-server";
import {ME_QUERY} from "~/graphql/queries";

export const loader = async ({}: Route.LoaderArgs) => {
    try {
        const data = await serverApolloClient.query({
            query: ME_QUERY,
        })
        return data;
    } catch (e) {
        return null;
    }
}
export default function IndexPage({loaderData}: Route.ComponentProps) {
    console.log(loaderData);
    return <div>This is index page</div>
}