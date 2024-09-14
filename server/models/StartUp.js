const mongoose = require('mongoose');

const { Schema } = mongoose;

const startUpSchema = new Schema({

});

const StartUp = mongoose.model('StartUp', startUpSchema);

module.exports = StartUp;


// amountOfWater varchar
// soil varchar
// shade Boolean