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
    mutation AddPlant($email: String!, $commonName: String!, $thumbNail: String) {
        addPlant(email: $email, commonName: $commonName, thumbNail: $thumbNail) {
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

export const DELETE_USER_PLANT_MUTATION = gql`
    mutation DeletePlant($email: String!, $plantId: ID!) {
        deletePlant(email: $email, plantId: $plantId) {
            success
            message
        }
    }
`;