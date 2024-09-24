const mongoose = require('mongoose');
const { User, Plant } = require('../models/index');

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

        getUser: async (_, { email }) => {
            try {
                const user = await User.findOne({ email })
                    .populate('plant');

                console.log(user);

                if (!user) {
                    return null;
                }
                
                return {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    plants: user.plant.map(plant => ({
                        _id: plant._id,
                        name: plant.name
                    }))
                };
            } catch (error) {
                throw new Error('Failed to fetch single user');
            }
        },
    },

    Mutation: {
        addUser: async (_, { username, email, password }) => {
            try {
                if (!username || !email || !password) {
                    throw new Error('Username, email and password required');
                }

                const newUser = new User({ username, email, password, plant: [] });
                console.log(newUser);
                const savedUser = await newUser.save();
                return savedUser;

            } catch (error) {
                console.error(error);
                throw new Error('Failed to create new user');
            }
        },
        updateUser: async (_, { _id, username, email, password }) => {
            try {
                const updateData = {};
                if (username) updateData.username = username;
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