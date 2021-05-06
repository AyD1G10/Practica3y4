const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user:String,
    key:String,
    movieid:[String],
    plan:[String],
    exchangeRate:Number,
    total:Number,
    date:Date
})

module.exports = mongoose.model('Transacciones',Schema,'Transacciones');