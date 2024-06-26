const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const moment = require('moment');

exports.getStatistics = async (req, res) => {
    try {
        // Total Users
        const totalUsers = await User.countDocuments({});

        // Total Orders
        const totalOrders = await Order.countDocuments({});

        // Total Revenue
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);

        // Items Ordered by Category
        const itemsByCategory = await Order.aggregate([
            { $unwind: '$items' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.product',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            { $unwind: '$productDetails' },
            {
                $group: {
                    _id: '$productDetails.category',
                    totalQuantity: { $sum: '$items.quantity' }
                }
            },
            {
                $project: {
                    category: '$_id',
                    totalQuantity: 1
                }
            }
        ]);

        // Items Ordered by Brand
        const itemsByBrand = await Order.aggregate([
            { $unwind: '$items' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.product',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            { $unwind: '$productDetails' },
            {
                $group: {
                    _id: '$productDetails.brand',
                    totalQuantity: { $sum: '$items.quantity' }
                }
            },
            {
                $project: {
                    brand: '$_id',
                    totalQuantity: 1
                }
            }
        ]);

        // Seasonal Trends in Sales
        const salesByMonth = await Order.aggregate([
            {
                $group: {
                    _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
                    totalRevenue: { $sum: '$total' },
                    totalOrders: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            },
            {
                $project: {
                    month: '$_id.month',
                    year: '$_id.year',
                    totalRevenue: 1,
                    totalOrders: 1
                }
            }
        ]);

        res.status(200).json({
            totalUsers,
            totalOrders,
            totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0,
            itemsByCategory,
            itemsByBrand,
            salesByMonth
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const validRoles = ['user', 'admin'];

        if (!validRoles.includes(role)) {
            return res.status(400).send({ error: 'Invalid role' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        );

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send({ message: 'User role updated successfully', user });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('address').populate('user', 'username email').populate('payment').populate('payment.card').populate('items.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    const { name, price, brand, imageUrl, category, description } = req.body;
    try {
        const product = new Product({ name, price, brand, imageUrl, category, description });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
