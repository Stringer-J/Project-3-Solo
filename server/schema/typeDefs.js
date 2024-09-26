const { gql } = require('graphql-tag');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        plant: [Plant]
    }

    type Plant {
        _id: ID
        commonName: String!
        thumbNail: String
    }

    type Query {
        getAllUsers: [User]
        getUser(email: String!): User
        getUserPlants(email: String!): [Plant]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        updateUser(_id: ID!, username: String, email: String, password: String): User
        addPlant(email: String!, commonName: String!, thumbNail: String): User
        deletePlant(email: String!, plantId: ID!): DeletePlantResponse!
    }

    type DeletePlantResponse {
        success: Boolean!
        message: String
    }   
`;

module.exports = typeDefs;