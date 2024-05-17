const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', async (req, res) => {
    try {
        const products = await productController.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
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
        const newProduct = req.body;
        const product = await Product.create(newProduct);
        res.status(201).json(product);
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

module.exports = router;
