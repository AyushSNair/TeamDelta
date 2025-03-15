const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    name: { type: String, required: true },
    symbol: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }  // Added quantity field
});

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
