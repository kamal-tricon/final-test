const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name: String,
    email: String,
    custId: Number,
    }, 
    {
    timestamps: true
});


module.exports = mongoose.model('Customer', CustomerSchema);
