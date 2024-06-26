const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated } = require('../middlewares/auth');

router.post('/', isAuthenticated, orderController.createOrder);

router.get('/:id', isAuthenticated, orderController.getOrder);

router.get('/', isAuthenticated, orderController.getAllOrders);

router.put('/:id/status', isAuthenticated, orderController.updateOrderStatus);

module.exports = router;
