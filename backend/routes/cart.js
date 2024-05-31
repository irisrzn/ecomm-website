const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { isAuthenticated } = require('../middlewares/auth'); // Adjust the path as needed

// Get user's cart
router.get('/', isAuthenticated, cartController.getCart);

// Add item to cart
router.post('/add', isAuthenticated, cartController.addToCart);

// Remove item from cart
router.post('/remove', isAuthenticated, cartController.removeFromCart);

module.exports = router;
