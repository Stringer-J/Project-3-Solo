const mongoose = require('mongoose');

const { Schema } = mongoose;

const maintenanceSchema = new Schema({

});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;


// pesticides varchar
// directSunlight Boolean
// repot Boolean
// trimming Boolean