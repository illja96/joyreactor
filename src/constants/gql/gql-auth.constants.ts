import { gql } from "apollo-angular";

export const gqlAuthConstants = {
  login: gql`
    mutation login($name: String!, $password: String!) {
      login(name: $name, password: $password) {
        me {
          user {
            id
            username
          }
          token
        }
      }
    }
    `
};