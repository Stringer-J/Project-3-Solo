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
                        commonName: plant.commonName,
                        thumbNail: plant.thumbNail
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

        addPlant: async (_, { email, commonName, thumbNail }) => {
            console.log('Email:', email);
            console.log('Common Name:', commonName);
            console.log('Thumbnail URL:', thumbNail)
            try {
                const user = await User.findOne({ email });
                console.log(user);
                if (!user) {
                    throw new Error('User not found');
                }
                let existingPlant = await Plant.findOne({ commonName });
                if (!existingPlant) {
                    existingPlant = new Plant({ commonName, thumbNail });
                    await existingPlant.save();
                }
                const isPlantAdded = user.plant.some(plant => plant._id.equals(existingPlant._id));
                if (isPlantAdded) {
                    throw new Error('Plant already added to this user');
                }
                user.plant.push({ _id: existingPlant._id, commonName, thumbNail });
                await user.save();
                await user.populate('plant');
                console.log('Plant added to user:', user);
                return user;
            } catch (error) {
                console.error('Error in addPlant:', error.message);
                throw new Error(error.message);
            }
        },

        deletePlant: async (_, { email, plantId }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('User not found');
                }
                const plantExists = user.plant.some(plant => plant._id.equals(plantId));
                if (!plantExists) {
                    throw new Error('Plant not found');
                }
                user.plant = user.plant.filter(plant => !plant._id.equals(plantId));
                await user.save();
                return { success: true, message: 'Plant removed!'};
            } catch (error) {
                console.error('Error with deletePlant:', error.message);
                throw new Error(error.message);
            }
        },
    },
};

module.exports = resolvers;