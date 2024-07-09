import { gql } from 'urql';

export const GET_POSTS = gql`
  query  {
  posts {
    data {
      id,
      title,
      body,
      user{
        id
      }
    }
  }
}
`;


export const GET_POSTS_BY_USER_ID = gql`
  query GetPostByUserId($id: ID!) {
    user(id: $id) {
    id,
    name,
    posts {
      data {
        title,
        body
      }
    } 
  }
}
`;
