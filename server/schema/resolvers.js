const mongoose = require('mongoose');
const { Bug, Helpful, Maintenance, Plant, StartUp, State } = require('../models');
const User = require('../models/User');

const resolvers = {
    Query: {
        getAllUsers: async () => {
            try {
                const users = await User.find();
                return users;
            } catch (error) {
                throw new Error('Failed to fetch users');
            }       
        }
    },

    Mutation: {
        hello: () => 'Hello From Mutation!',
    },
};

module.exports = resolvers;