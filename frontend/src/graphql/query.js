import { gql } from "@apollo/client";

// havent finish
export const USER_QUERY = gql`
  query GetUser($name: String!) {
    findUser(name: $name) {
      name
      status
      content
      friends {
        name
        status
        content
        message
      }
      message
      friendRequest {
        name
      }
    }
  }
`;

export const GET_FRIENDS_QUERY = gql`
  query GetFriends($name: String!) {
    getFriends(name: $name) {
      name
      status
      content
    }
  }
`;
