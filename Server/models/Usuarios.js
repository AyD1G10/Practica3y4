const mongoose = require('mongoose');

const SchemaUsuarios = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    lastname:String,
    username:String,
    email:String,
    password:String,
    dpi:String,
    age:Number,
    creditCard:[String],
    History:[mongoose.Schema.Types.ObjectId],
    Rented:[mongoose.Schema.Types.ObjectId],
    type:Number
});

module.exports = new mongoose.model('Usuarios',SchemaUsuarios,'Usuarios');