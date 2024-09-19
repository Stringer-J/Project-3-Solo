const { gql } = require('graphql-tag');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
    }

    type Query {
        getAllUsers: [User]
        getUser(userId: ID!): User
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): User
        updateUser(_id: ID!, firstName: String, lastName: String, email: String, password: String): User
    }
`;

module.exports = typeDefs;