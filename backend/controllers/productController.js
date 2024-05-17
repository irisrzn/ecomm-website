const Product = require('../models/Product');

async function getAllProducts() {
    return Product.find();
}

async function getProductById(productId) {
    return Product.findById(productId);
}

async function createProduct(newProduct) {
    return Product.create(newProduct);
}

async function updateProduct(productId, updatedProduct) {
    return Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
}

async function deleteProduct(productId) {
    return Product.findByIdAndDelete(productId);
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
