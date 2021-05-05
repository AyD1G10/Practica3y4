const mongoose = require('mongoose');

const SchemaLanguage = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id:Number,
    code:String,
    description:String,
});

module.exports = new mongoose.model('Language',SchemaLanguage,'Language');