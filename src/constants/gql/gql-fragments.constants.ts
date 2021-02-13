export const gqlFragmentsConstants = {
  profile: `
  fragment ProfileFields on Profile {
    token
    user {
      ...UserFields
    }  
  }`,
  user: `
  fragment UserFields on User {
    id
    username
  }`,
  post: `
  fragment PostCommentsFields on Post {
    ...PostWithoutCommentsFields
    comments {
      ...CommentFields
    }
  }`,
  postWithoutComments: `
  fragment PostWithoutCommentsFields on Post {
    id
    text
    rating
    commentsCount
    createdAt
    nsfw
    user {
      ...UserFields
    }
    attributes {
      ... on PostAttributePicture {
        ... PostAttributePictureFields
      }
      ... on PostAttributeEmbed {
        ...PostAttributeEmbedFields  
      }
    }
    blogs {
      ...BlogFields    
    }
    bestComments {
      ...CommentFields
    }
  }`,  
  image: `
  fragment ImageFields on Image {
    id
    width
    height
    comment
    type
    hasVideo
  }`,
  blog: `
  fragment BlogFields on Blog {
    id
    tag
    name
    synonyms   
  }`,
  comment: `
  fragment CommentFields on Comment {
    id
    text
    createdAt
    rating
    level
    user {
      ...UserFields
    }
    attributes {
      ... on CommentAttributePicture {
        ... CommentAttributePictureFields
      }
      ... on CommentAttributeEmbed {
        ...CommentAttributeEmbedFields  
      }
    }
  }`,
  postAttributePicture: `
  fragment PostAttributePictureFields on PostAttributePicture {
    id
    type
    insertId
    image {
      ...ImageFields
    }
  }`,
  postAttributeEmbed: `
  fragment PostAttributeEmbedFields on PostAttributeEmbed {
    id
    type
    insertId
    image {
      ...ImageFields
    }
    value
  }`,
  commentAttributePicture: `
  fragment CommentAttributePictureFields on CommentAttributePicture {
    id
    type
    insertId
    image {
      ...ImageFields
    }
  }`,
  commentAttributeEmbed: `
  fragment CommentAttributeEmbedFields on CommentAttributeEmbed {
    id
    type
    insertId
    image {
      ...ImageFields
    }
    value
  }`
};