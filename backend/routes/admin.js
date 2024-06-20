const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware.verifyAdmin);

router.get('/statistics', adminController.getStatistics);
router.get('/users', adminController.getAllUsers);
router.get('/orders', adminController.getAllOrders);
router.get('/products', adminController.getAllProducts);
router.post('/product', adminController.createProduct);
router.put('/product/:id', adminController.updateProduct);
router.delete('/product/:id', adminController.deleteProduct);

module.exports = router;
