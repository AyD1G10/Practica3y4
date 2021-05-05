const mongoose = require('mongoose');

const SchemaExchangeRate = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    total:Number
});

module.exports = new mongoose.model('ExchangeRate',SchemaExchangeRate,'ExchangeRate');