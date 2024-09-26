const { gql } = require('graphql-tag');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        plant: [PlantInfo]
    }

    type PlantInfo {
        commonName: String
        thumbNail: String
        _id: ID
    }

    type Query {
        getAllUsers: [User]
        getUser(email: String!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        updateUser(_id: ID!, username: String, email: String, password: String): User
        addPlant(email: String!, commonName: String!, thumbNail: String): User
    }
`;

module.exports = typeDefs;