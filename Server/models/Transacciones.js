const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    key:Number,
    movieid:mongoose.Schema.Types.ObjectId,
    plan:mongoose.Schema.Types.ObjectId,
    exchangeRate:Number,
    total:Number,
    date:Date
})

module.exports = mongoose.model('Transacciones',Schema,'Transacciones');