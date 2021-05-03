const mongoose = require('mongoose');

const SchemaAvailability = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    serviceDays:Number,
    bonusDays:Number,
    fine:String,
 });

module.exports = new mongoose.model('Availability',SchemaAvailability,'Availability');