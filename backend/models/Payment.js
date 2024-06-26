const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed'],
        default: 'completed'
    },
    amount: {
        type: Number,
        required: true
    },
    card: {
        cardNumber: { type: String, required: true },
        expirationMonth: { type: Number, required: true },
        expirationYear: { type: Number, required: true },
        cvv: { type: String, required: true }
    }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
