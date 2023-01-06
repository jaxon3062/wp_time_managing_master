import { gql } from "@apollo/client";

export const FRIENDSTATUSUPDATE = gql`
  subscription FriendStatusUpdate($name: String!) {
    friendStatusUpdate(name: $name) {
      name
      status
      content
    }
  }
`;

export const FRIENDUPDATED = gql`
  subscription FriendUpdate($name: String!) {
    friendUpdate(name: $name) {
      name
      friends {
        name
        status
        content
      }
      friendRequest {
        name
      }
    }
  }
`;

export const MESSAGERECEIVED = gql`
  subscription MessageReceive($name: String!) {
    messageReceived(name: $name) {
      name
      message
    }
  }
`;
