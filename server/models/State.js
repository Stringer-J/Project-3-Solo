const mongoose = require('mongoose');

const { Schema } = mongoose;

const stateSchema = new Schema({
    heat: {

    },
    shade: {

    },
    water: {

    },
    plants: [
        {

        }
    ],
    bugs: [
        {

        }
    ]
});

const State = mongoose.model('State', stateSchema);

module.exports = State;


// heat varchar
// shade varchar
// water varchar
// plants varchar array
// bugs varchar array