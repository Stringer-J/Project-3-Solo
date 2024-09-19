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
    }

    type Mutation {
        hello: String
    }
`;

module.exports = typeDefs;