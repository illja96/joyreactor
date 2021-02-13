import { gql } from "apollo-angular";
import { gqlFragmentsConstants } from "./gql-fragments.constants";

export const gqlTopConstants = {
  week: gql`
  query posts($year: Int!, $week: Int!, $nsfw: Boolean!) {
    weekTopPosts(year: $year, week: $week, nsfw: $nsfw) {
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