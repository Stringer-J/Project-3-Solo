import { gql } from '@apollo/client';

export const ADD_USER_MUTATION = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            username
            email
            password
        }
    }
`;

export const ADD_USER_PLANT_MUTATION = gql`
    mutation AddPlant($email: String!, $commonName: String!) {
        addPlant(email: $email, commonName: $commonName) {
             _id
            username
            email
            password
            plant {
                _id
                commonName
                thumbNail
            }
        }
    }
`;