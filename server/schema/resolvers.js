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
                    plant: user.plant.map(plant => ({
                        _id: plant._id,
                        commonName: plant.commonName
                    }))
                };
            } catch (error) {
                throw new Error('Failed to fetch single user');
            }
        },

        getUserPlants: async (_, { email }) => {
            const user = await User.findOne({ email }).populate('plant');
            return user ? user.plant : [];
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
        },

        addPlant: async (_, { email, commonName }) => {
            console.log('Email:', email);
            console.log('Common Name:', commonName);
            try {
                const user = await User.findOne({ email });
                console.log(user);
                if (!user) {
                    throw new Error('User not found');
                }
                const newPlant = new Plant({ commonName });
                await newPlant.save();
                //maybe plant/plants is the issue
                user.plant.push({ _id: newPlant._id, commonName });
                await user.save();
                await user.populate('plant');
                console.log('Plant added to user:', user);
                return user;
            } catch (error) {
                console.error('Error in addPlant:', error.message);
                throw new Error(error.message);
            }
        },
    },
};

module.exports = resolvers;