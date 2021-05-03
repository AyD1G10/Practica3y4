const mongoose = require('mongoose');

const SchemaCatalogo = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    image:String,
    exchangeRate:String,
    active:Boolean,
    availabilities:[mongoose.Schema.Types.ObjectId],
    languages:[mongoose.Schema.Types.ObjectId]
});

module.exports = new mongoose.model('Catalogo',SchemaCatalogo,'Catalogo');