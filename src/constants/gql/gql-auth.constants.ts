import { gql } from "apollo-angular";
import { gqlFragmentsConstants } from "./gql-fragments.constants";

export const gqlAuthConstants = {
  login: gql`
  mutation login($name: String!, $password: String!) {
    profile:login(name: $name, password: $password) {
      me {
        ...ProfileFields
      }
    }
  }
  ${gqlFragmentsConstants.profile}
  ${gqlFragmentsConstants.user}`
};