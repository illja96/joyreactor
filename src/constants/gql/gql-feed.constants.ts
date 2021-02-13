import { gql } from "apollo-angular";
import { gqlFragmentsConstants } from "./gql-fragments.constants";

export const gqlFeedConstants = {
  post: gql`
  query post($id: ID!) {
    post:node(id: $id) {
      ...PostFields
    }
  }
  ${gqlFragmentsConstants.postWithoutComments}
  ${gqlFragmentsConstants.user}
  ${gqlFragmentsConstants.blog}
  ${gqlFragmentsConstants.image}
  ${gqlFragmentsConstants.postAttributePicture}
  ${gqlFragmentsConstants.postAttributeEmbed}  
  ${gqlFragmentsConstants.comment}
  ${gqlFragmentsConstants.commentAttributePicture}
  ${gqlFragmentsConstants.commentAttributeEmbed}`,
  postWithoutComments: gql`
  query post($id: ID!) {
    posts:node(id: $id) {
      ...PostWithoutCommentsFields
    }
  }
  ${gqlFragmentsConstants.postWithoutComments}
  ${gqlFragmentsConstants.user}
  ${gqlFragmentsConstants.blog}
  ${gqlFragmentsConstants.image}
  ${gqlFragmentsConstants.postAttributePicture}
  ${gqlFragmentsConstants.postAttributeEmbed}  
  ${gqlFragmentsConstants.comment}
  ${gqlFragmentsConstants.commentAttributePicture}
  ${gqlFragmentsConstants.commentAttributeEmbed}`
};