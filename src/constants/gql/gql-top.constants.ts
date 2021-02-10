import { gql } from "apollo-angular";

export const gqlTopConstants = {
  week: gql`
  query posts($year: Int!, $week: Int!, $nsfw: Boolean!) {
    weekTopPosts(year: $year, week: $week, nsfw: $nsfw) {
      id
      text
      rating
      commentsCount
      createdAt
      nsfw
      user {
        id
        username
      }
      attributes { 
        id
        type
        insertId
        image {
          id
          width
          height
          comment
          type
          hasVideo
        }
      }
      blogs {
        id
        tag
        name
        synonyms      
      }
      bestComments {
        id
        text
        createdAt
        rating
        level
        user {
          id
          username
        }
        attributes {
          id
          type
          insertId
          image {
            id
            width
            height
            comment
            type
            hasVideo
          }
        }
      }
    }
  }`
};