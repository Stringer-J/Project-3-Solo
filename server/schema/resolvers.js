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
                throw new Error('Failed to fetch all users');
            }       
        },

        getUser: async (parent, { userId }) => {
            try {
                const user = await User.findOne({ _id: userId });
                return user;
            } catch (error) {
                throw new Error('Failed to fetch single user');
            }
        },
    },

    Mutation: {
        hello: () => 'Hello From Mutation!',
        addUser: async (parent, { firstName, lastName, email, password }) => {
            try {
                if (!firstName || !lastName || !email || !password) {
                    throw new Error('First and Last name, as well as email and password required');
                }

                const newUser = new User({ firstName, lastName, email, password });
                const savedUser = await newUser.save();
                return savedUser;
                
            } catch (error) {
                throw new Error('Failed to create new user');
            }
        },
    },
};

module.exports = resolvers;