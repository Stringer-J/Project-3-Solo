const { gql } = require('graphql-tag');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type Query {
        getAllUsers: [User]
        getUser(email: String!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        updateUser(_id: ID!, username: String, email: String, password: String): User
    }
`;

module.exports = typeDefs;