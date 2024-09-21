const mongoose = require('mongoose');
const User = require('./models/User');

const users = [
    { username: 'Josh_Stringer', email: 'joshstringer@live.com', password: '123' },
    { username: 'Mariah_Young', email: 'mariah@yahoo.com', password: '456' },
    { username: 'Alice_Young', email: 'alicehatesemail@google.com', password: '789' }
];

const MONGO_URI = 'mongodb://localhost:27017/plant_db';

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

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