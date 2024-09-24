const { gql } = require('graphql-tag');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        plants: [Plant]
    }

    type Plant {
        _id: ID
        commonName: String!
    }

    type Query {
        getAllUsers: [User]
        getUser(email: String!): User
        getUserPlants(email: String!): [Plant]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        updateUser(_id: ID!, username: String, email: String, password: String): User
        addPlant(commonName: String!): Plant
    }
`;

module.exports = typeDefs;