const mongoose = require('mongoose');

const { Schema } = mongoose;

const plantSchema = new Schema({
    state: {

    },
    name: {

    },
    startup_id: {

    },
    bug_id: [
        {

        }
    ],
    helpful_id: {

    },
    maintenance_id: {
        
    }
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;


// state varchar
// name varchar
// startup_id BigInt
// bug_id BigInt array
// helpful_id BigInt
// maintenance_id BigInt