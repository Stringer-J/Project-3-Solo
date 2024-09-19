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
        },

        getUser: async (parent, { userId }) => {
            try {
                const user = await User.findOne({ _id: userId });
                return user;
            } catch (error) {
                throw new Error('Failed to fetch user');
            }
        },
    },

    Mutation: {
        hello: () => 'Hello From Mutation!',
    },
};

module.exports = resolvers;