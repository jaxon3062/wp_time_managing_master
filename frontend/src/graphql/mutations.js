import { gql } from "@apollo/client";

export const ADD_FRIEND_MUTATION = gql`
  mutation AddFriend($name: String!, $friendName: String!) {
    addFriend(name: $name, friendName: $friendName) {
      name
      status
      friends {
        name
      }
      friendRequest {
        name
      }
    }
  }
`;

export const ACCEPT_FRIEND_MUTATION = gql`
  mutation AcceptFriend($name: String!, $friendName: String!) {
    acceptFriend(name: $name, friendName: $friendName) {
      name
      status
      friends {
        name
      }
      friendRequest {
        name
      }
    }
  }
`;

export const REJECT_FRIEND_MUTATION = gql`
  mutation AcceptFriend($name: String!, $friendName: String!) {
    rejectFriend(name: $name, friendName: $friendName) {
      name
      status
      friends {
        name
      }
      friendRequest {
        name
      }
    }
  }
`;

export const REMOVE_FRIEND_MUTATION = gql`
  mutation RemoveFriend($name: String!, $friendName: String!) {
    removeFriend(name: $name, friendName: $friendName) {
      name
      status
      friends {
        name
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($name: String!, $password: String!) {
    logIn(name: $name, password: $password) {
      name
      status
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $password: String!) {
    register(name: $name, password: $password) {
      name
      status
    }
  }
`;

export const STATUS_UPDATE_MUTATION = gql`
  mutation StatusUpdate($name: String!, $status: String!, $content: String) {
    statusUpdate(name: $name, status: $status, content: $content) {
      name
      status
    }
  }
`;

export const SENDMESSAGE_MUTATION = gql`
  mutation SendMessage($name: String!, $context: String!) {
    sendMessage(name: $name, context: $context) {
      name
      status
    }
  }
`;
