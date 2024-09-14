const mongoose = require('mongoose');

const { Schema } = mongoose;

const bugSchema = new Schema({
    isGood: {
        
    }
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;


// isGood Boolean