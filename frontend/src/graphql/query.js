import { gql } from '@apollo/client';

// havent finish
export const USER_QUERY = gql`
    query findUser($name: String){
        query User(name: $name){
            id
            name
            friends
            messages
            friendRequest
            status
        }

    }
`;

export const GET_FRIENDS_QUERY = gql`
`;