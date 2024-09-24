require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Plant = require('./models/Plant');

const users = [
    { username: 'Josh_Stringer', email: 'joshstringer@live.com', password: '123', plant: [] },
    { username: 'Mariah_Young', email: 'mariah@yahoo.com', password: '456', plant: [] },
    { username: 'Alice_Young', email: 'alicehatesemail@google.com', password: '789', plant: [] }
];

const mongoURI = process.env.NODE_ENV === 'production'
    ? 'mongodb+srv://joshstringer:vHwMvfyHljdttfgC@plantcluster.jfen1.mongodb.net/plant_db?retryWrites=true&w=majority&appName=PlantCluster'
    : 'mongodb://localhost:27017/plant_db';

const seedDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await Plant.deleteMany({});
        await User.deleteMany({});

        await User.insertMany(users);
        console.log('User data seeded!!!');

    } catch (error) {
        console.error('Seed failed...', error);
    } finally {
        await mongoose.connection.close();
    }
};

seedDB();