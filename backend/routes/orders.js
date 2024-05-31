const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Adjust the path as needed
const { isAuthenticated } = require('../middlewares/auth'); // Adjust the path as needed

// Route to create an order
router.post('/', isAuthenticated, orderController.createOrder);

// Route to get a single order by ID
router.get('/:id', isAuthenticated, orderController.getOrder);

// Route to get all orders
router.get('/', isAuthenticated, orderController.getAllOrders);

module.exports = router;
