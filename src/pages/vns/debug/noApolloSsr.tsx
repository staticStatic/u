import { useQuery /*, useMutation*/ } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "@vulcan/next-apollo";

const NoSsrDebugPage = () => {
  const mortyQuery = gql`
    query {
      character(id: 2) {
        name
      }
    }
  `;

  const { data, loading, error } = useQuery(mortyQuery); //vulcanRepoInfo); //vulcanSiteDataQuery);

  let content = "";
  if (loading) {
    content = "loading";
  } else if (error) {
    content = "error"; // NOTE: when encountering a fatal error in "getDataFromTree", app will be rendered in loading state instead
  } else if (data) {
    content = "data";
  }
  return <div>{content}</div>;
};

// @see https://github.com/APIs-guru/graphql-apis
// @see https://rickandmortyapi.com/documentation/#graphql
// NOTE: will fail client-side, since we don't have CORS
const graphqlUri = "https://rickandmortyapi.com/graphql";
export default withApollo(NoSsrDebugPage, { graphqlUri }); // SSR is not activated
