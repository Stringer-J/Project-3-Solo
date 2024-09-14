const mongoose = require('mongoose');

const { Schema } = mongoose;

const helpfulSchema = new Schema({
    isGoodForPeople: {

    },
    isGoodForPlants: {
        
    }
});

const Helpful = mongoose.model('Helpful', helpfulSchema);

module.exports = Helpful;


// isGoodForPeople Boolean
// isGoodForAnimals Boolean