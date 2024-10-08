import { gql } from '@apollo/client';

export const GET_SINGLE_USER = gql`
    query GetUser($email: String!) {
        getUser(email: $email) {
            _id
            username
            email
            password
            plant {
                commonName
                thumbNail
                _id
            }
        }
    }
`;