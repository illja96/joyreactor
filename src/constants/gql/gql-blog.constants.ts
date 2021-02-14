import { gql } from "apollo-angular";
import { gqlFragmentsConstants } from "./gql-fragments.constants";

export const gqlBlogConstants = {
  blog: gql`
  query blog($id: ID!) {
    blog:node(id: $id) {
      ...BlogFields
    }
  }
  ${gqlFragmentsConstants.blog}`
}