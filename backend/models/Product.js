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
    brand: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
