const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    itemName: String, 
    totalPrice: Number,
    custId: Number
    }, 
    {
    timestamps: true
});


module.exports = mongoose.model('Order', OrderSchema);
