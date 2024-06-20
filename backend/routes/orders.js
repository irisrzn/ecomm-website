const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated } = require('../middlewares/auth');

// Create order
router.post('/', isAuthenticated, orderController.createOrder);

// Get single order by ID
router.get('/:id', isAuthenticated, orderController.getOrder);

// Get all orders
router.get('/', isAuthenticated, orderController.getAllOrders);

module.exports = router;
