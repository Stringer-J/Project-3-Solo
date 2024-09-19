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

        getUser: async (_, { userId }) => {
            try {
                const user = await User.findOne({ _id: userId });
                return user;
            } catch (error) {
                throw new Error('Failed to fetch single user');
            }
        },
    },

    Mutation: {
        addUser: async (_, { firstName, lastName, email, password }) => {
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
        updateUser: async (_, { _id, firstName, lastName, email, password }) => {
            try {
                const updateData = {};
                if (firstName) updateData.firstName = firstName;
                if (lastName) updateData.lastName = lastName;
                if (email) updateData.email = email;
                if (password) updateData.password = password;

                if (!_id || Object.keys(updateData).length === 0) {
                    throw new Error('ID and at least one field required to update');
                }

                const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
                    new: true,
                    runValidators: true
                });

                if (!updatedUser) {
                    throw new Error('User not found');
                }

                return updatedUser;
            } catch (error) {
                throw new Error('Failed to update user');
            }
        }
    },
};

module.exports = resolvers;