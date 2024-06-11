const express = require('express');
const router = express.Router();
const Product = require('../models/Product')

router.get('/products', async (req, res) => {
    try {
        const { category, brand } = req.query;
        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (brand) {
            filter.brand = brand;
        }

        const products = await Product.find(filter);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        res.json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST a new product
router.post('/products', async (req, res) => {
    try {
        const { name, brand, price, category, imageUrl, description } = req.body;
        const product = new Product({ name, brand, price, category, imageUrl, description });
        await product.save();
        res.send(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT (update) a product
router.put('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = req.body;
        const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
        res.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a product
router.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// get product brands
router.get('/brands', async (req, res) => {
    try {
        const brands = await Product.distinct('brand');
        res.json(brands);
    } catch (err) {
        console.error('Error fetching brands:', err); 
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
