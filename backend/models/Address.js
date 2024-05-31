const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    country: { type: String, required: true },
    street1: { type: String, required: true },
    street2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
