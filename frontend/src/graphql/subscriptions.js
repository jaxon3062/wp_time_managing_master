import { gql } from "@apollo/client";

export const FRIENDSTATUSUPDATE = gql`
    subscription FriendStatusUpdate($name: String!) {
        friendStatusUpdate(name: $name) {
            name
            status
            friends
        }
    }
`;

export const FRIENDUPDATED = gql`
    subscription FriendUpdate($name: String!) {
        friendUpdate(name: $name) {
            name
            status
            content
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
        name
        messages {
            from
            to
            context
        }
    }
`;