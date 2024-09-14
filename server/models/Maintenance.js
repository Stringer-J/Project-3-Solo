const mongoose = require('mongoose');

const { Schema } = mongoose;

const maintenanceSchema = new Schema({
    pesticides: [
        {

        }
    ],
    directSunlight: {

    },
    repot: {

    },
    trimming: {
        
    }
});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;


// pesticides varchar array
// directSunlight Boolean
// repot Boolean
// trimming Boolean