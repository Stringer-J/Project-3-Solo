const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    plant: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Plant',
        },
        name: {
            type: String
        }
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;