const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String, 
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
