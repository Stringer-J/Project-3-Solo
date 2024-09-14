const mongoose = require('mongoose');

const { Schema } = mongoose;

const plantSchema = new Schema({

});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;


// state varchar
// name varchar
// startup_id BigInt
// bug_id BigInt
// helpful_id BigInt
// maintenance_id BigInt