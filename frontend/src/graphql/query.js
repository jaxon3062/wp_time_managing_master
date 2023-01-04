import { gql } from '@apollo/client';

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