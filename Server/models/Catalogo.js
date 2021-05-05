const mongoose = require('mongoose');

const SchemaCatalogo = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id:String,
    name:String,
    image:String,
    exchangeRate:Number,
    active:Boolean,
    availabilities:[Number],
    languages:[Number]
});

module.exports = new mongoose.model('Catalogo',SchemaCatalogo,'Catalogo');