import {Route} from "./+types/index"
import {serverApolloClient} from "~/lib/apollo-client-server";
import {ME_QUERY} from "~/graphql/queries";

export const loader = async ({request}: Route.LoaderArgs) => {
    try {
        const data = await serverApolloClient.query({
            query: ME_QUERY,
            context: {
                headers: {
                    cookie: request.headers.get('cookie') || ''
                }
            }
        })
        return {data, apolloState: serverApolloClient.extract()};
    } catch (e) {
        return null;
    }
}
export default function IndexPage({loaderData}: Route.ComponentProps) {
    console.log(loaderData);
    return <div>This is index page</div>
}